import { z } from "zod";

import type {
  CallToolResult,
  GetPromptResult,
  ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import { completable } from "@modelcontextprotocol/sdk/server/completable.js";
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  getComponentDocByName,
  getComponentDocBySlug,
  libraryDocs,
  searchComponentDocs,
  type LibraryComponentDoc,
  type LibraryDocsInstallStep,
} from "erp-pro-ui/docs";

const RESOURCE_URIS = {
  docsBundle: "erp-pro-ui://library/docs-bundle",
  installation: "erp-pro-ui://library/installation",
  overview: "erp-pro-ui://library/overview",
} as const;

const INSTALLATION_TOPICS = [
  "all",
  "install",
  "styles",
  "providers",
  "imports",
] as const;

type InstallationTopic = (typeof INSTALLATION_TOPICS)[number];

function formatCodeFence(language: string, code: string): string {
  return ["```" + language, code, "```"].join("\n");
}

function formatInstallSteps(steps: readonly LibraryDocsInstallStep[]): string {
  return steps
    .map((step, index) => {
      const lines = [`${index + 1}. ${step.title}`, step.description];

      for (const example of step.examples ?? []) {
        lines.push("");
        lines.push(`${example.title}:`);
        lines.push(formatCodeFence(example.language, example.code));
      }

      return lines.join("\n");
    })
    .join("\n\n");
}

function formatInstallGuide(topic: InstallationTopic): string {
  const steps = filterInstallationSteps(topic);
  const peerLines = libraryDocs.peerDependencies.map(
    (dependency) => `- ${dependency.name}: ${dependency.reason}`,
  );

  return [
    `Installation topic: ${topic}`,
    "",
    formatInstallSteps(steps),
    "",
    "Peer dependencies:",
    ...peerLines,
  ].join("\n");
}

function formatComponentDoc(component: LibraryComponentDoc): string {
  const relatedNames = component.related
    .map(
      (slug) => libraryDocs.components.find((item) => item.slug === slug)?.name,
    )
    .filter((value): value is string => Boolean(value));

  const lines = [
    `${component.name}`,
    "",
    component.summary,
    "",
    `Category: ${component.category}`,
    `Slug: ${component.slug}`,
    `Storybook: ${component.storybookTitle}`,
    `Docs: ${component.docsUrl}`,
  ];

  if (component.status) {
    lines.push(`Status: ${component.status}`);
  }

  lines.push("");
  lines.push("Root import:");
  lines.push(formatCodeFence("tsx", component.rootImport));
  lines.push("");
  lines.push("Subpath import:");
  lines.push(formatCodeFence("tsx", component.subpathImport));

  if (component.aliases.length > 0) {
    lines.push("");
    lines.push(`Aliases: ${component.aliases.join(", ")}`);
  }

  if (relatedNames.length > 0) {
    lines.push("");
    lines.push(`Related: ${relatedNames.join(", ")}`);
  }

  return lines.join("\n");
}

function formatComponentList(
  components: readonly LibraryComponentDoc[],
): string {
  if (components.length === 0) {
    return "No components matched the current filter.";
  }

  const groups = new Map<string, LibraryComponentDoc[]>();

  for (const component of components) {
    const group = groups.get(component.category) ?? [];
    group.push(component);
    groups.set(component.category, group);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([category, items]) => {
      const lines = [`${category} (${items.length})`];

      for (const item of items.sort((left, right) =>
        left.name.localeCompare(right.name),
      )) {
        lines.push(`- ${item.name} (${item.slug}): ${item.summary}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");
}

function formatLibraryOverview(): string {
  const groupedCounts = new Map<string, number>();

  for (const component of libraryDocs.components) {
    groupedCounts.set(
      component.category,
      (groupedCounts.get(component.category) ?? 0) + 1,
    );
  }

  return [
    "erp-pro-ui",
    "",
    libraryDocs.summary,
    "",
    `Documentation base URL: ${libraryDocs.docsBaseUrl}`,
    `Component count: ${libraryDocs.components.length}`,
    "",
    "Core features:",
    ...libraryDocs.features.map((feature) => `- ${feature}`),
    "",
    "Categories:",
    ...[...groupedCounts.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([category, count]) => `- ${category}: ${count}`),
    "",
    "Use get-component-docs for an exact component, search-components for capability lookup, and get-installation-guide for project setup.",
  ].join("\n");
}

function formatResourceUri(slug: string): string {
  return `erp-pro-ui://components/${slug}`;
}

function getRelatedComponentNames(component: LibraryComponentDoc): string[] {
  return component.related
    .map((slug) => getComponentDocBySlug(slug)?.name)
    .filter((value): value is string => Boolean(value));
}

function getComponentResourcePayload(component: LibraryComponentDoc) {
  return {
    ...component,
    relatedComponentNames: getRelatedComponentNames(component),
  };
}

function toJsonResource(
  uri: string,
  value: unknown,
  mimeType = "application/json",
): ReadResourceResult {
  return {
    contents: [
      {
        uri,
        mimeType,
        text: JSON.stringify(value, null, 2),
      },
    ],
  };
}

function toTextResource(
  uri: string,
  text: string,
  mimeType = "text/markdown",
): ReadResourceResult {
  return {
    contents: [
      {
        uri,
        mimeType,
        text,
      },
    ],
  };
}

function getComponentCompletions(query: string): string[] {
  const normalizedQuery = query.trim().toLowerCase();

  return libraryDocs.components
    .filter((component) => {
      if (!normalizedQuery) {
        return true;
      }

      return (
        component.slug.includes(normalizedQuery) ||
        component.name.toLowerCase().includes(normalizedQuery)
      );
    })
    .map((component) => component.slug)
    .slice(0, 12);
}

function getInstallationTopicCompletions(query: string): InstallationTopic[] {
  const normalizedQuery = query.trim().toLowerCase();

  return INSTALLATION_TOPICS.filter((topic) => topic.includes(normalizedQuery));
}

function buildComponentSelectionPrompt(
  goal: string,
  constraints?: string,
): GetPromptResult {
  const query = [goal, constraints].filter(Boolean).join(" ");
  const matches = searchComponentDocs(query).slice(0, 8);
  const candidateList =
    matches.length > 0
      ? matches
          .map(
            (component) =>
              `- ${component.name} (${component.slug}): ${component.summary}`,
          )
          .join("\n")
      : "No direct match found. Use the full library overview and installation guide to choose a fallback.";

  return {
    description:
      "Prompt for selecting the most appropriate erp-pro-ui component for a product requirement.",
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: [
            "Choose the best erp-pro-ui component for the following need.",
            "",
            `Goal: ${goal}`,
            constraints ? `Constraints: ${constraints}` : undefined,
            "",
            "Candidate components:",
            candidateList,
            "",
            "Return the best match, explain why it fits, mention one fallback, and include the recommended root and subpath imports.",
          ]
            .filter((value): value is string => Boolean(value))
            .join("\n"),
        },
      },
    ],
  };
}

function buildComponentIntegrationPrompt(
  component: LibraryComponentDoc,
  task?: string,
): GetPromptResult {
  return {
    description:
      "Prompt for integrating a specific erp-pro-ui component into a product surface.",
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: [
            `Help me integrate the ${component.name} component from erp-pro-ui.`,
            task ? `Task: ${task}` : undefined,
            "",
            `Summary: ${component.summary}`,
            `Docs URL: ${component.docsUrl}`,
            "",
            "Root import:",
            component.rootImport,
            "",
            "Subpath import:",
            component.subpathImport,
            "",
            "Explain the recommended usage pattern, any nearby related components, and provide a concise integration example.",
          ]
            .filter((value): value is string => Boolean(value))
            .join("\n"),
        },
      },
      {
        role: "user",
        content: {
          type: "resource",
          resource: {
            uri: formatResourceUri(component.slug),
            mimeType: "application/json",
            text: JSON.stringify(
              getComponentResourcePayload(component),
              null,
              2,
            ),
          },
        },
      },
    ],
  };
}

function buildLibrarySetupPrompt(topic: InstallationTopic): GetPromptResult {
  return {
    description:
      "Prompt for setting up erp-pro-ui in a new or existing React application.",
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: [
            "Provide an erp-pro-ui setup plan for the target project.",
            "",
            formatInstallGuide(topic),
            "",
            "Summarize the exact commands, stylesheet imports, provider wiring, and import strategy that should be used.",
          ].join("\n"),
        },
      },
      {
        role: "user",
        content: {
          type: "resource",
          resource: {
            uri: RESOURCE_URIS.installation,
            mimeType: "text/markdown",
            text: formatInstallGuide(topic),
          },
        },
      },
    ],
  };
}

function readUriVariable(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return undefined;
}

function resolveComponent(input: {
  readonly name?: string;
  readonly slug?: string;
}): LibraryComponentDoc | undefined {
  const slug = input.slug?.trim().toLowerCase();

  if (slug) {
    const bySlug = libraryDocs.components.find(
      (component) => component.slug === slug,
    );

    if (bySlug) {
      return bySlug;
    }
  }

  const name = input.name?.trim();

  if (!name) {
    return undefined;
  }

  return getComponentDocByName(name);
}

function filterInstallationSteps(
  topic: InstallationTopic,
): readonly LibraryDocsInstallStep[] {
  if (topic === "all") {
    return libraryDocs.installSteps;
  }

  const mapping: Record<
    "install" | "styles" | "providers" | "imports",
    readonly string[]
  > = {
    install: ["Install the package", "Install peer dependencies"],
    styles: ["Import the shared styles"],
    providers: ["Wrap your app with ThemeProvider"],
    imports: ["Choose an import strategy"],
  };

  const allowedTitles = new Set(mapping[topic]);

  return libraryDocs.installSteps.filter((step) =>
    allowedTitles.has(step.title),
  );
}

function toTextResult(text: string): CallToolResult {
  return {
    content: [
      {
        type: "text",
        text,
      },
    ],
  };
}

export function createErpProUiMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: "erp-pro-ui-mcp-server",
      version: "0.1.0",
    },
    {
      instructions:
        "Use this server to discover erp-pro-ui components, installation steps, import paths, prompt templates, and readable resources. Prefer get-component-docs for exact usage, search-components for discovery, resources/read for structured docs payloads, and prompts/get when an MCP client wants a ready-to-use integration prompt.",
      capabilities: {
        logging: {},
      },
    },
  );

  server.registerTool(
    "library-overview",
    {
      description:
        "Return a high-level overview of erp-pro-ui, including feature highlights and component categories.",
    },
    async (): Promise<CallToolResult> => toTextResult(formatLibraryOverview()),
  );

  server.registerTool(
    "list-components",
    {
      description:
        "List erp-pro-ui components, optionally filtered by category, status, or a text query.",
      inputSchema: z.object({
        category: z.string().optional(),
        query: z.string().optional(),
        status: z.enum(["new", "updated"]).optional(),
      }),
    },
    async ({ category, query, status }): Promise<CallToolResult> => {
      const normalizedCategory = category?.trim().toLowerCase();
      const filtered = searchComponentDocs(query ?? "").filter((component) => {
        if (
          normalizedCategory &&
          component.category.toLowerCase() !== normalizedCategory
        ) {
          return false;
        }

        if (status && component.status !== status) {
          return false;
        }

        return true;
      });

      return toTextResult(formatComponentList(filtered));
    },
  );

  server.registerTool(
    "search-components",
    {
      description:
        "Search erp-pro-ui components by keyword, capability, alias, or summary text.",
      inputSchema: z.object({
        query: z.string().min(1),
      }),
    },
    async ({ query }): Promise<CallToolResult> => {
      const matches = searchComponentDocs(query);

      if (matches.length === 0) {
        return toTextResult(`No erp-pro-ui components matched "${query}".`);
      }

      return toTextResult(formatComponentList(matches));
    },
  );

  server.registerTool(
    "get-component-docs",
    {
      description:
        "Return detailed docs for one erp-pro-ui component, including imports, related components, and documentation links.",
      inputSchema: z.object({
        slug: z.string().optional(),
        name: z.string().optional(),
      }),
    },
    async ({ name, slug }): Promise<CallToolResult> => {
      const component = resolveComponent({ name, slug });

      if (!component) {
        return toTextResult(
          'Component not found. Pass a known slug like "button" or a component name like "Button".',
        );
      }

      return toTextResult(formatComponentDoc(component));
    },
  );

  server.registerTool(
    "get-installation-guide",
    {
      description:
        "Return setup guidance for installing erp-pro-ui, importing styles, using ThemeProvider, and choosing import paths.",
      inputSchema: z.object({
        topic: z
          .enum(["all", "install", "styles", "providers", "imports"])
          .optional(),
      }),
    },
    async ({ topic }): Promise<CallToolResult> => {
      const selectedTopic = topic ?? "all";
      return toTextResult(formatInstallGuide(selectedTopic));
    },
  );

  server.registerResource(
    "library-overview",
    RESOURCE_URIS.overview,
    {
      title: "erp-pro-ui Library Overview",
      description:
        "High-level package overview, feature summary, and component category counts.",
      mimeType: "text/markdown",
    },
    async (): Promise<ReadResourceResult> =>
      toTextResource(RESOURCE_URIS.overview, formatLibraryOverview()),
  );

  server.registerResource(
    "installation-guide",
    RESOURCE_URIS.installation,
    {
      title: "erp-pro-ui Installation Guide",
      description:
        "Shared install guidance covering package install, peers, styles, providers, and imports.",
      mimeType: "text/markdown",
    },
    async (): Promise<ReadResourceResult> =>
      toTextResource(RESOURCE_URIS.installation, formatInstallGuide("all")),
  );

  server.registerResource(
    "docs-bundle",
    RESOURCE_URIS.docsBundle,
    {
      title: "erp-pro-ui Docs Bundle",
      description:
        "Structured package docs payload exported from erp-pro-ui/docs.",
      mimeType: "application/json",
    },
    async (): Promise<ReadResourceResult> =>
      toJsonResource(RESOURCE_URIS.docsBundle, libraryDocs),
  );

  server.registerResource(
    "component-doc",
    new ResourceTemplate("erp-pro-ui://components/{slug}", {
      list: async () => ({
        resources: libraryDocs.components.map((component) => ({
          uri: formatResourceUri(component.slug),
          name: component.name,
          title: component.name,
          description: component.summary,
          mimeType: "application/json",
        })),
      }),
      complete: {
        slug: (value) => getComponentCompletions(String(value ?? "")),
      },
    }),
    {
      title: "erp-pro-ui Component Doc",
      description:
        "Structured docs payload for a single erp-pro-ui component identified by slug.",
      mimeType: "application/json",
    },
    async (uri, variables): Promise<ReadResourceResult> => {
      const slug = readUriVariable(variables.slug);
      const component = resolveComponent({ slug });

      if (!component) {
        return toJsonResource(uri.href, {
          error: "component_not_found",
          slug,
        });
      }

      return toJsonResource(uri.href, getComponentResourcePayload(component));
    },
  );

  server.registerPrompt(
    "choose-component",
    {
      title: "Choose Component",
      description:
        "Generate a prompt that helps an AI assistant choose the best erp-pro-ui component for a product requirement.",
      argsSchema: {
        goal: z.string().describe("What the product UI needs to accomplish."),
        constraints: z
          .string()
          .optional()
          .describe(
            "Optional constraints such as layout, density, or interaction details.",
          ),
      },
    },
    async ({ goal, constraints }): Promise<GetPromptResult> =>
      buildComponentSelectionPrompt(goal, constraints),
  );

  server.registerPrompt(
    "integrate-component",
    {
      title: "Integrate Component",
      description:
        "Generate an integration-focused prompt for a specific erp-pro-ui component.",
      argsSchema: {
        component: completable(
          z
            .string()
            .describe(
              "Component slug or name, for example button or data-table.",
            ),
          (value) => getComponentCompletions(String(value ?? "")),
        ),
        task: z
          .string()
          .optional()
          .describe("Optional implementation task or screen context."),
      },
    },
    async ({ component, task }): Promise<GetPromptResult> => {
      const resolvedComponent = resolveComponent({
        slug: component,
        name: component,
      });

      if (!resolvedComponent) {
        return {
          description:
            "Fallback prompt returned when the requested component could not be resolved.",
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: `The component "${component}" could not be resolved. Ask for a valid erp-pro-ui component slug and then generate the integration guidance again.`,
              },
            },
          ],
        };
      }

      return buildComponentIntegrationPrompt(resolvedComponent, task);
    },
  );

  server.registerPrompt(
    "setup-library",
    {
      title: "Setup Library",
      description:
        "Generate a setup prompt for installing and wiring erp-pro-ui into a project.",
      argsSchema: {
        topic: completable(
          z
            .string()
            .describe(
              "Setup area: all, install, styles, providers, or imports.",
            ),
          (value) => getInstallationTopicCompletions(String(value ?? "")),
        ),
      },
    },
    async ({ topic }): Promise<GetPromptResult> => {
      const selectedTopic = INSTALLATION_TOPICS.includes(
        topic as InstallationTopic,
      )
        ? (topic as InstallationTopic)
        : "all";

      return buildLibrarySetupPrompt(selectedTopic);
    },
  );

  return server;
}

export async function startErpProUiMcpServer(): Promise<void> {
  const server = createErpProUiMcpServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
}
