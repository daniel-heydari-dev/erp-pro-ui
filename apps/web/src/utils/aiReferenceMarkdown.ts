import {
  libraryDocs,
  type LibraryComponentDoc,
  type LibraryDocsBundle,
  type LibraryDocsCodeExample,
  type LibraryDocsInstallStep,
} from "erp-pro-ui/docs";

type SupplementalDocsSection = {
  title: string;
  route: string;
  scope: "published-library" | "docs-app-only";
  summary: string;
  details: string[];
  codeExamples?: Array<{
    title: string;
    language: string;
    code: string;
  }>;
};

const supplementalDocsSections: SupplementalDocsSection[] = [
  {
    title: "Introduction",
    route: "/get-started/introduction",
    scope: "published-library",
    summary:
      "High-level positioning for erp-pro-ui as a typed React design system aimed at ERP, admin, and data-heavy SaaS interfaces.",
    details: [
      "The library is optimized for business workflows, dense data views, and operational interfaces.",
      "The design direction emphasizes premium UI while keeping the package centered on reusable primitives instead of monolithic screens.",
      "Consumers should treat the package as a shared component system, not as a turnkey application shell.",
    ],
  },
  {
    title: "Installation",
    route: "/get-started/installation",
    scope: "published-library",
    summary:
      "Practical setup guidance for installing the package, importing styles, and enabling the packaged theme and fonts.",
    details: [
      "Import `tailwindcss` before `erp-pro-ui/styles.css` in the app stylesheet.",
      "Wrap the app with `ThemeProvider` so the shared token contract receives `data-brand` and `data-mode`.",
      "Geist is already bundled by the package stylesheet; host apps only need to provide extra fonts if they intentionally want additional display faces.",
    ],
    codeExamples: [
      {
        title: "Root stylesheet",
        language: "css",
        code: `@import "tailwindcss";
@import "erp-pro-ui/styles.css";`,
      },
      {
        title: "ThemeProvider setup",
        language: "tsx",
        code: `import { ThemeProvider } from "erp-pro-ui";

createRoot(rootElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);`,
      },
    ],
  },
  {
    title: "MCP Server",
    route: "/get-started/mcp",
    scope: "published-library",
    summary:
      "AI integration surface for querying the library docs bundle through Model Context Protocol instead of scraping the docs site.",
    details: [
      "The MCP server is published as `erp-pro-ui-mcp-server` and can be run via `npx`.",
      "It exposes tools such as `library-overview`, `list-components`, `search-components`, `get-component-docs`, and `get-installation-guide`.",
      "It also exposes stable resources like `erp-pro-ui://library/overview` and `erp-pro-ui://components/<slug>` for hosts that prefer direct resource reads.",
      "If MCP is not needed, the same structured data can be imported directly from `erp-pro-ui/docs` in local tooling and scripts.",
    ],
    codeExamples: [
      {
        title: "Run the MCP server",
        language: "bash",
        code: "npx -y erp-pro-ui-mcp-server",
      },
      {
        title: "MCP host config",
        language: "json",
        code: `{
  "mcpServers": {
    "erp-pro-ui": {
      "command": "npx",
      "args": ["-y", "erp-pro-ui-mcp-server"]
    }
  }
}`,
      },
      {
        title: "Direct docs import",
        language: "tsx",
        code: `import {
  getComponentDocByName,
  libraryDocs,
  searchComponentDocs,
} from "erp-pro-ui/docs";

const button = getComponentDocByName("Button");
const charts = searchComponentDocs("chart");

console.log(libraryDocs.installSteps);
console.log(button?.subpathImport);
console.log(charts.map((item) => item.name));`,
      },
    ],
  },
  {
    title: "Search",
    route: "/ui-basics/search",
    scope: "docs-app-only",
    summary:
      "Global docs search pattern used by the web app for fast route jumps across components, charts, and reference pages.",
    details: [
      "The docs app exposes a visible search trigger in the header and also registers global keyboard shortcuts: Command+K, Control+K, and `/`.",
      "Results are fuzzy-matched against both category names and component names.",
      "The dialog supports keyboard navigation and navigates directly to the target docs route on selection.",
      "This is a docs-site integration pattern, not a published library export.",
    ],
    codeExamples: [
      {
        title: "Search trigger pattern",
        language: "tsx",
        code: `import { Button } from "erp-pro-ui";
import { useSearch } from "@/hooks/useSearch";

export function SearchTrigger() {
  const { toggleSearch } = useSearch();

  return <Button label="Open component search" onClick={toggleSearch} />;
}`,
      },
      {
        title: "Search behavior summary",
        language: "text",
        code: `- Command/Ctrl + K and / open the dialog
- Results are matched against categories and component names
- Arrow keys, Tab, and Enter support full keyboard selection
- Choosing a result navigates directly to the target docs route`,
      },
    ],
  },
  {
    title: "Stepper",
    route: "/ui-basics/stepper",
    scope: "published-library",
    summary:
      "Stepper guidance for centered workflow progress, inline label layouts, connected step buttons, and wizard-style staged flows.",
    details: [
      'The core `Stepper` centers labels under the circle by default and supports `labelPosition="right"` for denser inline layouts.',
      "Horizontal connectors now begin at the first circle and stop at the last circle instead of extending to the container edges.",
      "Use `StepperSteps` for validation-heavy settings flows and `StepperWizard` when each step owns a content panel with next/back actions.",
    ],
    codeExamples: [
      {
        title: "Inline label layout",
        language: "tsx",
        code: `import { Stepper, type Step } from "erp-pro-ui";

const onboardingSteps: Step[] = [
  { id: "general", title: "General Information", description: "Workspace basics" },
  { id: "billing", title: "Billing Setup", description: "Payment and invoicing" },
  { id: "team", title: "Team Access", description: "Invite collaborators" },
  { id: "review", title: "Review", description: "Confirm and launch" },
];

export function InlineStepperLabelsExample() {
  return (
    <Stepper
      steps={onboardingSteps}
      currentStep={0}
      labelPosition="right"
      variant="glass"
    />
  );
}`,
      },
    ],
  },
  {
    title: "Data Table",
    route: "/ui-basics/data-table",
    scope: "published-library",
    summary:
      "Workspace-grade table guidance for search, filters, pagination, dense row layouts, and richer custom cells.",
    details: [
      "Use the default table for broad admin screens, then move to explicit `filterOptions` when the workflow needs curated controls instead of auto-generated filters.",
      "Pagination now keeps the active page-size value visible and renders the rows-per-page dropdown above the footer so it does not get clipped by the table shell.",
      "Use `columns[].renderCell` for richer row content like progress meters, status composites, or compact dashboards inside a cell.",
    ],
    codeExamples: [
      {
        title: "Workspace table example",
        language: "tsx",
        code: `import { DataTable } from "erp-pro-ui";

<DataTable
  data={data}
  columns={columns}
  pageSize={5}
  searchPlaceholder="Search team members..."
/>`,
      },
    ],
  },
  {
    title: "Scrollbar",
    route: "/ui-basics/scrollbar",
    scope: "published-library",
    summary:
      "Shared scrollbar token and utility guidance for themed scrollbars, hidden-scrollbar mode, and overflow behavior tuning.",
    details: [
      "`erp-pro-ui/styles.css` now ships themed scrollbar foundation rules, so web and Storybook inherit the same default scrollbar treatment automatically.",
      "Use the `scrollbar-none` utility to hide browser scrollbar chrome while still keeping scroll behavior available until overflow is explicitly set to `hidden`.",
      "The first-party docs and Storybook now both expose editable playgrounds so token values and hide/show behavior can be tuned visually in either surface.",
    ],
    codeExamples: [
      {
        title: "Hidden scrollbar utility",
        language: "tsx",
        code: `<div
  className="scrollbar-none"
  style={{ overflowX: "auto", overflowY: "auto" }}
>
  ...scroll content
</div>`,
      },
    ],
  },
  {
    title: "Dialog",
    route: "/ui-basics/dialog",
    scope: "published-library",
    summary:
      "Dialog guidance for app-top modal overlays, preset confirmation flows, and custom content panels.",
    details: [
      "The shared `Dialog` now renders through a portal attached to `document.body`, so it escapes local stacking contexts created by app shells, transforms, or nested layouts.",
      "The overlay root uses a very high z-index to keep the backdrop and panel above the rest of the application when a dialog must cover the entire page.",
      'Use `preset="confirm"` for standard verification flows and `preset="custom"` when the dialog body contains richer layouts or forms.',
    ],
    codeExamples: [
      {
        title: "Top-level dialog pattern",
        language: "tsx",
        code: `import { Dialog } from "erp-pro-ui";

<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Create approval policy"
  description="This dialog renders above the full application shell."
  preset="custom"
>
  <PolicyEditor />
</Dialog>`,
      },
    ],
  },
  {
    title: "Preview Showcase",
    route: "/ui-basics/preview",
    scope: "docs-app-only",
    summary:
      "A local docs composition page that demonstrates how multiple published primitives can be layered into a richer marketing or showcase screen.",
    details: [
      "The Preview page is intentionally not part of the published package surface.",
      "It exists to demonstrate composition patterns like AnimatedContent over Carousel, GradualBlur reveals, and shared glassmorphism across multiple primitives.",
      "AI guidance should not tell consumers to import `Preview`; it should tell them to assemble similar layouts from the published primitives.",
    ],
    codeExamples: [
      {
        title: "Preview composition example",
        language: "tsx",
        code: `import {
  AnimatedContent,
  Button,
  Carousel,
  Dialog,
  GradualBlur,
} from "erp-pro-ui";

function MarketingShowcase() {
  return (
    <>
      <GradualBlur>
        <h1>Design System Showcase</h1>
      </GradualBlur>

      <AnimatedContent preset="scale">
        <Carousel items={items} variant="glass" />
      </AnimatedContent>

      <Button primary label="Open Dialog" onClick={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen} title="Crystal Dialog" />
    </>
  );
}`,
      },
    ],
  },
];

function renderFencedCodeBlock(language: string, code: string) {
  return ["```" + language, code, "```", ""].join("\n");
}

function renderCodeBlock(example: LibraryDocsCodeExample) {
  const lines = [`### ${example.title}`, ""];

  if (example.description) {
    lines.push(example.description, "");
  }

  lines.push(renderFencedCodeBlock(example.language, example.code));

  return lines.join("\n");
}

function renderInstallStep(step: LibraryDocsInstallStep, index: number) {
  const lines = [`## ${index + 1}. ${step.title}`, "", step.description, ""];

  if (step.examples?.length) {
    for (const example of step.examples) {
      lines.push(renderCodeBlock(example));
    }
  }

  return lines.join("\n");
}

function renderPeerDependencyTable(docs: LibraryDocsBundle) {
  return [
    "| Package | Reason |",
    "| --- | --- |",
    ...docs.peerDependencies.map(
      (dependency) => `| ${dependency.name} | ${dependency.reason} |`,
    ),
    "",
  ].join("\n");
}

function renderComponentReference(component: LibraryComponentDoc) {
  const aliases = component.aliases.length
    ? component.aliases.map((alias) => `\`${alias}\``).join(", ")
    : "None";

  const related = component.related.length
    ? component.related.map((slug) => `\`${slug}\``).join(", ")
    : "None";

  const status = component.status ?? "stable";

  return [
    `## ${component.name}`,
    "",
    `- Slug: \`${component.slug}\``,
    `- Category: ${component.category}`,
    `- Status: ${status}`,
    `- Package export path: \`${component.packageExportPath}\``,
    `- Storybook title: \`${component.storybookTitle}\``,
    `- Docs route: \`${component.docsRoute}\``,
    `- Docs URL: ${component.docsUrl}`,
    `- Aliases: ${aliases}`,
    `- Related: ${related}`,
    "",
    component.summary,
    "",
    "### Root import",
    "",
    renderFencedCodeBlock("tsx", component.rootImport),
    "### Subpath import",
    "",
    renderFencedCodeBlock("tsx", component.subpathImport),
  ].join("\n");
}

function renderSupplementalSection(section: SupplementalDocsSection) {
  return [
    `## ${section.title}`,
    "",
    `- Route: \`${section.route}\``,
    `- Scope: ${section.scope === "docs-app-only" ? "docs app only" : "published library guidance"}`,
    "",
    section.summary,
    "",
    ...section.details.map((detail) => `- ${detail}`),
    "",
    ...(section.codeExamples?.flatMap((example) => [
      `### ${example.title}`,
      "",
      renderFencedCodeBlock(example.language, example.code),
    ]) ?? []),
  ].join("\n");
}

export function buildAiReferenceMarkdown() {
  const generatedOn = new Date().toISOString();

  return [
    `# ${libraryDocs.packageName} AI Reference`,
    "",
    `Generated: ${generatedOn}`,
    `Docs base URL: ${libraryDocs.docsBaseUrl}`,
    "",
    "## Purpose",
    "",
    "This markdown file is designed to be dropped into an AI workflow so the model has a complete working reference for installing, importing, theming, and selecting components from the library.",
    "",
    "## Library Summary",
    "",
    libraryDocs.summary,
    "",
    "## Core Features",
    "",
    ...libraryDocs.features.map((feature) => `- ${feature}`),
    "",
    "## Styling And Theme Contract",
    "",
    "- Import `erp-pro-ui/styles.css` once with Tailwind v4 for the full packaged theme surface.",
    "- Prefer semantic utilities in new code: `bg-ds-surface-1`, `bg-ds-canvas`, `text-ds-1`, `text-ds-2`, `border-ds-border-2`, `bg-ds-accent`, `text-ds-on-accent`, `bg-ds-accent-subtle`, `ring-ds-focus`.",
    "- Prefer raw `--ds-*` tokens when you need CSS variables directly.",
    "- Treat `--color-*` aliases and the legacy `primary-*` scale as migration compatibility, not the preferred authoring API.",
    "- `ThemeProvider` writes `data-brand` and `data-mode` as the primary runtime contract and still writes `data-theme` for compatibility.",
    "- Supported brands in the current contract are `purple`, `teal`, `yellow`, and `green`.",
    "",
    "## Installation Steps",
    "",
    ...libraryDocs.installSteps.map(renderInstallStep),
    "## Peer Dependencies",
    "",
    renderPeerDependencyTable(libraryDocs),
    "## Quick Start Examples",
    "",
    ...libraryDocs.quickStartExamples.map(renderCodeBlock),
    "## App-Specific Docs Guidance",
    "",
    "These sections come from the web docs app and explain how the first-party docs environment integrates the library. Pages marked as docs-app-only are reference patterns, not package exports.",
    "",
    ...supplementalDocsSections.map(renderSupplementalSection),
    "## Component Inventory",
    "",
    `Total components documented: ${libraryDocs.components.length}`,
    "",
    ...libraryDocs.components.map(
      (component) =>
        `- ${component.name} (slug: \`${component.slug}\`, category: ${component.category}, export: \`${component.packageExportPath}\`)`,
    ),
    "",
    "## Detailed Component Reference",
    "",
    ...libraryDocs.components.map(renderComponentReference),
  ].join("\n");
}

export function downloadAiReferenceMarkdown() {
  const markdown = buildAiReferenceMarkdown();
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const datePart = new Date().toISOString().slice(0, 10);

  anchor.href = objectUrl;
  anchor.download = `erp-pro-ui-ai-reference-${datePart}.md`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}
