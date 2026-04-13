import type { ReactNode } from "react";
import type { Preview, StoryContext } from "@storybook/react-vite";
import { createElement, useEffect } from "react";

import { ThemeProvider, useThemeContext } from "erp-pro-ui/theme";
import {
  findUiCatalogItemByStorybookTitle,
  getUiCatalogDocsRoute,
} from "erp-pro-ui/catalog";
import type { UiCatalogSlug } from "erp-pro-ui/catalog";

import "../src/index.css";

type StorybookThemeColor = "purple" | "teal" | "yellow" | "green";
type StorybookThemeMode = "light" | "dark";
type StorybookThemeDarkVariant = "default" | "alt";

const STORYBOOK_LAYOUT_TAGS = ["StoryStack", "StoryPanel", "StorySection"];
const REACT_HOOK_IMPORTS = [
  "useState",
  "useEffect",
  "useId",
  "useDeferredValue",
  "useTransition",
  "startTransition",
  "useEffectEvent",
] as const;
const REACT_TYPE_IMPORTS = [
  "ChangeEvent",
  "FormEvent",
  "KeyboardEvent",
  "MouseEvent",
] as const;

function dedentCodeBlock(code: string): string {
  const lines = code.replace(/\t/g, "  ").trim().split("\n");
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const baseIndent = indents.length > 0 ? Math.min(...indents) : 0;

  return lines
    .map((line) => line.slice(baseIndent))
    .join("\n")
    .trim();
}

function unwrapStorySurface(code: string): string {
  let cleaned = code.trim();
  let previous = "";

  while (cleaned !== previous) {
    previous = cleaned;

    const match = cleaned.match(
      /^<StorySurface\b[\s\S]*?>([\s\S]*)<\/StorySurface>$/,
    );

    if (match) {
      cleaned = match[1].trim();
    }
  }

  return cleaned;
}

function replaceStorybookLayoutTags(code: string): string {
  let cleaned = code;

  for (const tag of STORYBOOK_LAYOUT_TAGS) {
    cleaned = cleaned.replace(new RegExp(`<${tag}\\b[^>]*>`, "g"), "<div>");
    cleaned = cleaned.replace(new RegExp(`</${tag}>`, "g"), "</div>");
  }

  cleaned = cleaned.replace(/\s*<StoryIntro\b[\s\S]*?\/?>\s*/g, "\n");

  return cleaned.trim();
}

function getStoryComponentName(storyContext: StoryContext): string | undefined {
  const component = storyContext.component;

  if (typeof component === "function" && component.name) {
    return component.name;
  }

  if (component && typeof component === "object") {
    if (
      "displayName" in component &&
      typeof component.displayName === "string"
    ) {
      return component.displayName;
    }

    if ("name" in component && typeof component.name === "string") {
      return component.name;
    }
  }

  return storyContext.title?.split("/").at(-1);
}

function getExampleFunctionName(storyContext: StoryContext): string {
  const rawName = `${storyContext.name ?? getStoryComponentName(storyContext) ?? "Story"}Example`;
  const sanitized = rawName.replace(/[^A-Za-z0-9]+/g, "");

  return /^[A-Za-z]/.test(sanitized) ? sanitized : `Story${sanitized}`;
}

function getReactImportSpecifiers(code: string): string[] {
  const specifiers: string[] = [];

  for (const identifier of REACT_HOOK_IMPORTS) {
    if (new RegExp(`\\b${identifier}\\b`).test(code)) {
      specifiers.push(identifier);
    }
  }

  for (const identifier of REACT_TYPE_IMPORTS) {
    if (new RegExp(`\\b${identifier}\\b`).test(code)) {
      specifiers.push(`type ${identifier}`);
    }
  }

  return specifiers;
}

function getComponentImportSpecifiers(
  code: string,
  storyContext: StoryContext,
): string[] {
  const names = new Set<string>();
  const componentName = getStoryComponentName(storyContext);

  if (componentName) {
    names.add(componentName);
  }

  for (const match of code.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)) {
    const name = match[1];

    if (
      name !== "StorySurface" &&
      name !== "StoryIntro" &&
      !STORYBOOK_LAYOUT_TAGS.includes(name)
    ) {
      names.add(name);
    }
  }

  if (/\buseToast\b/.test(code)) {
    names.add("useToast");
  }

  return [...names].sort((left, right) => left.localeCompare(right));
}

function indentBlock(code: string, spaces = 2): string {
  const pad = " ".repeat(spaces);
  return code
    .split("\n")
    .map((line) => (line.length > 0 ? `${pad}${line}` : line))
    .join("\n");
}

function toFunctionBody(code: string): string {
  const trimmed = code.trim();

  if (
    trimmed.startsWith("export function") ||
    trimmed.startsWith("function ")
  ) {
    return trimmed;
  }

  const arrowMatch = trimmed.match(/^\(?[\w\s,]*\)?\s*=>\s*([\s\S]+)$/);

  if (arrowMatch) {
    const body = arrowMatch[1].trim();

    if (body.startsWith("{") && body.endsWith("}")) {
      return body.slice(1, -1).trim();
    }

    return `return ${body.endsWith(";") ? body : `${body};`}`;
  }

  if (trimmed.startsWith("<") || trimmed.startsWith("(")) {
    return `return ${trimmed.endsWith(";") ? trimmed : `${trimmed};`}`;
  }

  return trimmed;
}

function buildCompleteStorySource(
  code: string,
  storyContext: StoryContext,
): string {
  const cleaned = replaceStorybookLayoutTags(
    unwrapStorySurface(dedentCodeBlock(code)),
  );

  if (!cleaned || /^import\s/m.test(cleaned)) {
    return cleaned || code;
  }

  const importLines: string[] = [];
  const reactSpecifiers = getReactImportSpecifiers(cleaned);
  const componentSpecifiers = getComponentImportSpecifiers(
    cleaned,
    storyContext,
  );

  if (reactSpecifiers.length > 0) {
    importLines.push(`import { ${reactSpecifiers.join(", ")} } from "react";`);
  }

  if (componentSpecifiers.length > 0) {
    importLines.push(
      `import { ${componentSpecifiers.join(", ")} } from "erp-pro-ui";`,
    );
  }

  if (
    cleaned.startsWith("export function") ||
    cleaned.startsWith("function ")
  ) {
    return `${importLines.join("\n")}\n\n${cleaned}`.trim();
  }

  const functionBody = toFunctionBody(cleaned);
  const exampleName = getExampleFunctionName(storyContext);

  return `${importLines.join("\n")}\n\nexport function ${exampleName}() {\n${indentBlock(functionBody)}\n}`.trim();
}

function StorybookThemeBridge({
  children,
  theme,
  mode,
  darkVariant,
}: {
  children?: ReactNode;
  theme: StorybookThemeColor;
  mode: StorybookThemeMode;
  darkVariant: StorybookThemeDarkVariant;
}) {
  const { setMode, setTheme, setDarkVariant } = useThemeContext();

  useEffect(() => {
    setMode(mode);
    setTheme(theme);
    setDarkVariant(darkVariant);

    const root = document.documentElement;
    const themeValue =
      mode === "dark" && darkVariant === "alt"
        ? `${theme}-dark-alt`
        : `${theme}-${mode}`;

    root.setAttribute("data-brand", theme);
    root.setAttribute("data-mode", mode);
    root.setAttribute("data-dark-variant", darkVariant);
    root.setAttribute("data-theme", themeValue);
  }, [darkVariant, mode, setDarkVariant, setMode, setTheme, theme]);

  return createElement(
    "div",
    {
      className:
        "min-h-screen bg-ds-canvas p-6 text-ds-1 transition-colors duration-200",
      "data-brand": theme,
      "data-mode": mode,
      "data-dark-variant": darkVariant,
      "data-theme":
        mode === "dark" && darkVariant === "alt"
          ? `${theme}-dark-alt`
          : `${theme}-${mode}`,
    },
    children,
  );
}

function StorybookCatalogMeta({
  children,
  storyTitle,
  showCatalogInfo,
}: {
  children?: ReactNode;
  storyTitle?: string;
  showCatalogInfo: boolean;
}) {
  const catalogItem = findUiCatalogItemByStorybookTitle(storyTitle);

  if (!catalogItem) {
    return createElement("div", null, children);
  }

  const docsRoute = getUiCatalogDocsRoute(catalogItem.slug as UiCatalogSlug);
  const packageImport = `erp-pro-ui/${catalogItem.packageExportPath}`;

  return createElement(
    "div",
    {
      "data-catalog-slug": catalogItem.slug,
      "data-catalog-route": docsRoute,
      "data-catalog-import": packageImport,
    },
    showCatalogInfo
      ? createElement(
          "div",
          {
            className:
              "mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-ds-border-2 bg-ds-surface-1 px-3 py-2 text-xs text-ds-2",
          },
          createElement(
            "span",
            { className: "font-semibold text-ds-1" },
            "Catalog",
          ),
          createElement("span", null, docsRoute),
          createElement(
            "span",
            { className: "font-semibold text-ds-1" },
            "Import",
          ),
          createElement("code", { className: "font-mono" }, packageImport),
        )
      : null,
    children,
  );
}

const preview: Preview = {
  initialGlobals: {
    themeMode: "dark",
    themeColor: "purple",
    themeDarkVariant: "default",
  },
  globalTypes: {
    themeColor: {
      name: "Theme brand",
      description: "Global brand preset for Storybook canvas",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "purple", title: "Purple" },
          { value: "teal", title: "Teal" },
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
        ],
      },
    },
    themeMode: {
      name: "Theme mode",
      description: "Global color mode for Storybook canvas",
      toolbar: {
        icon: "mirror",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
    themeDarkVariant: {
      name: "Dark variant",
      description: "Dark foundation variant for Storybook canvas",
      toolbar: {
        icon: "contrast",
        dynamicTitle: true,
        items: [
          { value: "default", title: "Dark: Default" },
          { value: "alt", title: "Dark: Alt" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) =>
      createElement(
        ThemeProvider,
        null,
        createElement(
          StorybookThemeBridge,
          {
            theme: context.globals.themeColor as StorybookThemeColor,
            mode: context.globals.themeMode as StorybookThemeMode,
            darkVariant: context.globals
              .themeDarkVariant as StorybookThemeDarkVariant,
          },
          createElement(
            StorybookCatalogMeta,
            {
              storyTitle: context.title,
              showCatalogInfo: context.viewMode === "docs",
            },
            createElement(Story),
          ),
        ),
      ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      values: [
        { name: "app-light", value: "#ffffff" },
        { name: "app-dark", value: "#09090b" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        excludeDecorators: true,
        language: "tsx",
        transform: (code, storyContext) =>
          buildCompleteStorySource(code, storyContext),
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
