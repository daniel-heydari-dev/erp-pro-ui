import {
  getUiCatalogDocsRoute,
  type UiCatalogSlug,
  type UiCatalogStatus,
  uiCatalogItems,
} from "./catalog";

export type LibraryDocsCodeLanguage = "bash" | "css" | "json" | "tsx";

export interface LibraryDocsCodeExample {
  readonly title: string;
  readonly language: LibraryDocsCodeLanguage;
  readonly code: string;
  readonly description?: string;
}

export interface LibraryDocsInstallStep {
  readonly title: string;
  readonly description: string;
  readonly examples?: readonly LibraryDocsCodeExample[];
}

export interface LibraryDocsPeerDependency {
  readonly name: string;
  readonly reason: string;
}

export interface LibraryComponentDoc {
  readonly name: string;
  readonly slug: UiCatalogSlug;
  readonly status?: UiCatalogStatus;
  readonly category: string;
  readonly summary: string;
  readonly storybookTitle: string;
  readonly packageExportPath: string;
  readonly exportName?: string;
  readonly aliases: readonly string[];
  readonly rootImport: string;
  readonly subpathImport: string;
  readonly docsRoute: string;
  readonly docsUrl: string;
  readonly related: readonly UiCatalogSlug[];
}

export interface LibraryDocsBundle {
  readonly packageName: "erp-pro-ui";
  readonly docsBaseUrl: string;
  readonly summary: string;
  readonly features: readonly string[];
  readonly installSteps: readonly LibraryDocsInstallStep[];
  readonly peerDependencies: readonly LibraryDocsPeerDependency[];
  readonly quickStartExamples: readonly LibraryDocsCodeExample[];
  readonly components: readonly LibraryComponentDoc[];
}

interface ComponentDocSeed {
  readonly exportName?: string;
  readonly summary: string;
  readonly aliases?: readonly string[];
  readonly related?: readonly UiCatalogSlug[];
  readonly rootImport?: string;
  readonly subpathImport?: string;
}

const DOCS_BASE_URL = "https://daniel-heydari-dev.github.io/erp-pro-ui";

const componentDocSeeds = {
  combobox: {
    exportName: "Combobox",
    summary:
      "Searchable single-select control for long option lists and command-style pickers.",
    aliases: ["autocomplete", "search select"],
    related: ["select", "multiselect-combobox", "input"],
  },
  button: {
    exportName: "Button",
    summary:
      "Primary action trigger with size variants, button attributes, and support for custom children.",
    aliases: ["cta", "action"],
    related: ["dialog", "form", "input"],
  },
  input: {
    exportName: "Input",
    summary:
      "Text field for forms with label, validation state, helper text, and icon support.",
    aliases: ["text field", "field"],
    related: ["label", "textarea", "form"],
  },
  checkbox: {
    exportName: "Checkbox",
    summary:
      "Binary selection control for filters, permissions, and multi-select form fields.",
    aliases: ["boolean"],
    related: ["radio", "switch", "form"],
  },
  radio: {
    exportName: "Radio",
    summary:
      "Single-choice selection control for mutually exclusive form options.",
    aliases: ["radio group"],
    related: ["checkbox", "select", "form"],
  },
  switch: {
    exportName: "Switch",
    summary:
      "Immediate on/off toggle suited to settings panels and preference screens.",
    aliases: ["toggle"],
    related: ["checkbox", "sun-to-moon-button", "form"],
  },
  select: {
    exportName: "Select",
    summary: "Compact dropdown input for short, fixed option sets.",
    aliases: ["dropdown"],
    related: ["combobox", "multiselect-combobox", "form"],
  },
  textarea: {
    exportName: "Textarea",
    summary:
      "Multi-line text input for descriptions, notes, and longer form responses.",
    aliases: ["multiline input"],
    related: ["input", "label", "form"],
  },
  label: {
    exportName: "Label",
    summary:
      "Accessible form label primitive for pairing readable text with inputs and controls.",
    aliases: ["field label"],
    related: ["input", "textarea", "form"],
  },
  dialog: {
    exportName: "Dialog",
    summary:
      "Modal overlay for confirmations, destructive flows, and custom embedded forms.",
    aliases: ["modal"],
    related: ["drawer", "button", "toast"],
  },
  drawer: {
    exportName: "Drawer",
    summary:
      "Slide-in panel for secondary workflows, detail panes, and mobile task flows.",
    aliases: ["sheet", "side panel"],
    related: ["dialog", "card", "tooltip"],
  },
  alert: {
    exportName: "Alert",
    summary:
      "Inline status banner with semantic variants for success, warning, info, and destructive states.",
    aliases: ["message banner"],
    related: ["toast", "loading", "skeleton"],
  },
  toast: {
    exportName: "ToastProvider",
    summary:
      "Transient notification system exposed through ToastProvider and useToast for async feedback.",
    aliases: ["notification"],
    related: ["alert", "dialog", "loading"],
    rootImport: "import { ToastProvider, useToast } from 'erp-pro-ui';",
    subpathImport:
      "import { ToastProvider, useToast } from 'erp-pro-ui/toast';",
  },
  tooltip: {
    exportName: "Tooltip",
    summary:
      "Hover and focus overlay for concise contextual help without leaving the current view.",
    aliases: ["hint"],
    related: ["hover-card", "dialog", "drawer"],
  },
  accordion: {
    exportName: "Accordion",
    summary:
      "Expandable content container for FAQs, settings groups, and disclosure-heavy interfaces.",
    aliases: ["collapse"],
    related: ["card", "stepper", "tooltip"],
  },
  card: {
    exportName: "Card",
    summary:
      "Surface container for grouping content, actions, and stats in dashboards and forms.",
    aliases: ["panel"],
    related: ["accordion", "spotlight-card", "data-table"],
  },
  stepper: {
    exportName: "Stepper",
    summary:
      "Visual progress indicator for guided workflows, checkouts, and multi-step forms.",
    aliases: ["wizard steps"],
    related: ["form", "chip", "loading"],
  },
  chip: {
    exportName: "Chip",
    summary:
      "Compact status and taxonomy token with visual variants for tags, states, and filters.",
    aliases: ["tag", "badge"],
    related: ["alert", "color-palette", "stepper"],
  },
  calendar: {
    exportName: "Calendar",
    summary:
      "Calendar view for scheduling surfaces, date picking UIs, and embedded planners.",
    aliases: ["date calendar"],
    related: ["datepicker", "input", "form"],
  },
  datepicker: {
    exportName: "DatePicker",
    summary:
      "Calendar-backed date input for forms that need controlled value selection and display.",
    aliases: ["date picker"],
    related: ["calendar", "input", "form"],
  },
  "multiselect-combobox": {
    exportName: "MultiSelectCombobox",
    summary:
      "Searchable multi-value selector for filters, assignee pickers, and label assignment flows.",
    aliases: ["multi select", "token select"],
    related: ["combobox", "select", "chip"],
  },
  "hover-card": {
    exportName: "HoverCard",
    summary:
      "Rich hover preview surface for profile cards, metadata popovers, and secondary details.",
    aliases: ["preview card"],
    related: ["tooltip", "card", "dialog"],
  },
  "spotlight-card": {
    exportName: "SpotlightCard",
    summary:
      "Interactive card with a cursor-reactive spotlight effect for premium landing sections.",
    aliases: ["interactive card"],
    related: ["card", "hover-border-gradient", "background-gradient"],
  },
  "splash-cursor": {
    exportName: "SplashCursor",
    summary:
      "Pointer effect that adds an animated splash trail for immersive visual experiences.",
    aliases: ["cursor effect"],
    related: ["chroma-grid", "animated-content", "spotlight-card"],
  },
  "chroma-grid": {
    exportName: "ChromaGrid",
    summary:
      "Animated chromatic grid background for showcase sections, heroes, and immersive canvases.",
    aliases: ["grid effect"],
    related: ["background-gradient", "splash-cursor", "gradual-blur"],
  },
  "color-palette": {
    exportName: "ColorPalette",
    summary:
      "Palette viewer for design tokens, brand colors, and handoff documentation.",
    aliases: ["swatches"],
    related: ["chip", "typography", "icons"],
  },
  "gradual-blur": {
    exportName: "GradualBlur",
    summary:
      "Progressive blur reveal wrapper for staged entrances and atmospheric transitions.",
    aliases: ["blur reveal"],
    related: ["animated-content", "background-gradient", "chroma-grid"],
  },
  "animated-content": {
    exportName: "AnimatedContent",
    summary:
      "Scroll and reveal motion wrapper for staging content entrances without custom animation plumbing.",
    aliases: ["reveal animation"],
    related: ["gradual-blur", "spotlight-card", "splash-cursor"],
  },
  "background-gradient": {
    exportName: "BackgroundGradientAnimation",
    summary:
      "Animated multi-stop gradient backdrop for hero sections and premium product storytelling.",
    aliases: ["gradient background"],
    related: ["chroma-grid", "gradual-blur", "spotlight-card"],
  },
  "hover-border-gradient": {
    exportName: "HoverBorderGradient",
    summary:
      "Gradient-border wrapper that emphasizes cards and feature callouts on hover.",
    aliases: ["gradient border"],
    related: ["button-hover-border-gradient", "card", "spotlight-card"],
  },
  "button-hover-border-gradient": {
    exportName: "ButtonHoverBorderGradient",
    summary:
      "CTA button variant with animated gradient edge treatment for high-emphasis surfaces.",
    aliases: ["gradient button"],
    related: ["button", "hover-border-gradient", "background-gradient"],
  },
  "password-strength-meter": {
    exportName: "PasswordStrengthMeter",
    summary:
      "Password quality indicator for sign-up and reset forms that need immediate feedback.",
    aliases: ["password meter"],
    related: ["input", "form", "alert"],
  },
  "sun-to-moon-button": {
    exportName: "SunToMoonButton",
    summary:
      "Animated theme toggle control for switching between light and dark presentation modes.",
    aliases: ["theme toggle"],
    related: ["switch", "typography", "background-gradient"],
  },
  carousel: {
    exportName: "Carousel",
    summary:
      "Content slider for galleries, testimonials, walkthroughs, and promotional sequences.",
    aliases: ["slider"],
    related: ["card", "animated-content", "spotlight-card"],
  },
  otpinput: {
    exportName: "OTPInput",
    summary:
      "One-time passcode input optimized for verification flows, MFA, and access codes.",
    aliases: ["otp", "verification code"],
    related: ["input", "password-strength-meter", "form"],
  },
  form: {
    exportName: "Form",
    summary:
      "Form composition surface for validation-driven layouts and grouped input sections.",
    aliases: ["form wrapper"],
    related: ["input", "button", "stepper"],
  },
  "data-table": {
    exportName: "DataTable",
    summary:
      "Feature-rich data grid with sorting, filtering, column toggles, and filter profiles.",
    aliases: ["table", "grid"],
    related: ["loading", "skeleton", "chip"],
  },
  loading: {
    exportName: "Loading",
    summary:
      "Unified loading surface exposing spinner, dots, pulse, bars, ring, bounce, wave, and skeleton variants.",
    aliases: ["loader", "progress indicator"],
    related: ["skeleton", "alert", "data-table"],
  },
  skeleton: {
    exportName: "SkeletonComponent",
    summary:
      "Placeholder block for perceived-performance states while structured content is loading.",
    aliases: ["placeholder"],
    related: ["loading", "data-table", "card"],
    rootImport: "import { SkeletonComponent } from 'erp-pro-ui';",
    subpathImport:
      "import { Skeleton as SkeletonComponent } from 'erp-pro-ui/skeleton';",
  },
  "area-chart": {
    exportName: "AreaChart",
    summary:
      "Gradient-filled area chart for trend storytelling and cumulative time-series views.",
    aliases: ["trend chart"],
    related: ["bar-chart", "neon-line-chart", "stacked-bar-chart"],
  },
  "bar-chart": {
    exportName: "BarChart",
    summary:
      "Bar chart for comparisons across categories, teams, or time buckets.",
    aliases: ["column chart"],
    related: ["area-chart", "stacked-bar-chart", "thin-breakdown-bar"],
  },
  "pie-chart": {
    exportName: "PieChart",
    summary:
      "Pie and donut chart visualizations for part-to-whole comparisons with small category sets.",
    aliases: ["donut chart"],
    related: ["bar-chart", "thin-breakdown-bar", "color-palette"],
  },
  "neon-line-chart": {
    exportName: "NeonLineChart",
    summary:
      "High-emphasis glowing line chart for dashboards that need a more stylized analytical treatment.",
    aliases: ["line chart"],
    related: ["area-chart", "bar-chart", "stacked-bar-chart"],
  },
  "stacked-bar-chart": {
    exportName: "StackedBarChart",
    summary:
      "Stacked categorical chart for comparing totals and composition inside each bar.",
    aliases: ["stacked chart"],
    related: ["bar-chart", "thin-breakdown-bar", "area-chart"],
  },
  "thin-breakdown-bar": {
    exportName: "ThinBreakdownBar",
    summary:
      "Compact horizontal breakdown bar for inline composition summaries and KPI cards.",
    aliases: ["breakdown bar"],
    related: ["stacked-bar-chart", "pie-chart", "chip"],
  },
  icons: {
    summary:
      "Collection of custom SVG icons for dashboards, navigation, commerce, and status-heavy product UIs.",
    aliases: ["icon pack", "svg icons"],
    related: ["typography", "color-palette", "button"],
    rootImport:
      "import { IconDashboard, IconSettings, IconUser } from 'erp-pro-ui';",
    subpathImport:
      "import { IconDashboard, IconSettings, IconUser } from 'erp-pro-ui/icons';",
  },
  typography: {
    exportName: "Typography",
    summary:
      "Semantic text component with heading, body, caption, alignment, weight, and gradient options.",
    aliases: ["text"],
    related: ["color-palette", "icons", "button"],
  },
} as const satisfies Record<UiCatalogSlug, ComponentDocSeed>;

function getComponentCategory(storybookTitle: string): string {
  return storybookTitle.split("/")[0] ?? "Components";
}

function getDefaultRootImport(exportName: string): string {
  return `import { ${exportName} } from 'erp-pro-ui';`;
}

function getDefaultSubpathImport(
  exportName: string,
  packageExportPath: string,
): string {
  return `import { ${exportName} } from 'erp-pro-ui/${packageExportPath}';`;
}

export const libraryPeerDependencies = [
  {
    name: "framer-motion",
    reason: "Required by motion-heavy overlays and effects.",
  },
  {
    name: "three",
    reason: "Required for Three.js-based visual components.",
  },
  {
    name: "@react-three/fiber",
    reason: "React renderer used by 3D visual surfaces.",
  },
  {
    name: "@react-three/drei",
    reason: "Helper primitives used by 3D components.",
  },
  {
    name: "@tanstack/react-table",
    reason: "Required for DataTable filtering and column tooling.",
  },
  {
    name: "recharts",
    reason: "Required for chart components.",
  },
  {
    name: "lucide-react",
    reason: "Used by selected UI controls and docs examples.",
  },
] as const satisfies readonly LibraryDocsPeerDependency[];

export const libraryInstallSteps = [
  {
    title: "Install the package",
    description:
      "Add erp-pro-ui to your React application with your preferred package manager.",
    examples: [
      {
        title: "pnpm",
        language: "bash",
        code: "pnpm add erp-pro-ui",
      },
    ],
  },
  {
    title: "Install peer dependencies",
    description:
      "Install only the optional peer packages used by motion, tables, and 3D visuals you actually render.",
    examples: [
      {
        title: "Peers",
        language: "bash",
        code: "pnpm add framer-motion three @tanstack/react-table",
      },
    ],
  },
  {
    title: "Import the shared styles",
    description:
      "Import Tailwind first, then the library stylesheet once at the app entry to load tokens, fonts, foundations, and semantic utilities with no extra Tailwind config.",
    examples: [
      {
        title: "Root stylesheet",
        language: "css",
        code: '@import "tailwindcss";\n@import "erp-pro-ui/styles.css";',
      },
    ],
  },
  {
    title: "Use colors and fonts directly",
    description:
      "Import tokens.css for raw CSS variables without Tailwind utilities, or colors.css when you want the Tailwind v4 utility bridge generated from the shared semantic tokens. Prefer semantic utilities and --ds-* tokens in new code; the legacy --color-* aliases remain for migration.",
    examples: [
      {
        title: "Raw token import",
        language: "css",
        code: '@import "erp-pro-ui/tokens.css";',
      },
      {
        title: "Tailwind bridge import",
        language: "css",
        code: '@import "tailwindcss";\n@import "erp-pro-ui/colors.css";\n@import "erp-pro-ui/fonts.css";',
      },
      {
        title: "Theme token usage",
        language: "tsx",
        code: '<section className="bg-surface text-fg border border-border rounded-2xl p-6">\n  <button className="bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press rounded-lg px-4 py-2">Save</button>\n</section>',
      },
    ],
  },
  {
    title: "Wrap your app with ThemeProvider",
    description:
      "Use ThemeProvider at the root so shared brand and mode attributes are applied as data-brand and data-mode for the token system. The older data-theme attribute is still written for compatibility, but brand and mode are the primary contract.",
    examples: [
      {
        title: "Root provider",
        language: "tsx",
        code: "import { ThemeProvider } from 'erp-pro-ui';\n\ncreateRoot(rootElement).render(\n  <ThemeProvider>\n    <App />\n  </ThemeProvider>,\n);",
      },
      {
        title: "Manual attributes",
        language: "tsx",
        code: '<html data-brand="teal" data-mode="dark"></html>',
      },
    ],
  },
  {
    title: "Choose an import strategy",
    description:
      "Use root imports for convenience or subpath imports for a more explicit public contract per component.",
    examples: [
      {
        title: "Root imports",
        language: "tsx",
        code: "import { Button, Dialog, Input } from 'erp-pro-ui';",
      },
      {
        title: "Subpath imports",
        language: "tsx",
        code: "import { Button } from 'erp-pro-ui/button';\nimport { Dialog } from 'erp-pro-ui/dialog';",
      },
    ],
  },
] as const satisfies readonly LibraryDocsInstallStep[];

export const libraryQuickStartExamples = [
  {
    title: "Basic screen scaffold",
    language: "tsx",
    code: 'import { Button, Input, ThemeProvider, Typography } from \'erp-pro-ui\';\n\nexport function App() {\n  return (\n    <ThemeProvider>\n      <section className="space-y-4 p-6">\n        <Typography variant="h2" gradient="ocean">\n          Welcome to ERP Pro\n        </Typography>\n        <Input label="Email" placeholder="you@company.com" />\n        <Button label="Get Started" primary />\n      </section>\n    </ThemeProvider>\n  );\n}',
  },
  {
    title: "Dialog confirmation pattern",
    language: "tsx",
    code: 'import { Dialog } from \'erp-pro-ui\';\n\n<Dialog\n  open={isOpen}\n  onOpenChange={setIsOpen}\n  title="Confirm delete"\n  description="This action cannot be undone."\n  variant="destructive"\n  preset="confirm"\n  animation="scale"\n  onConfirm={handleDelete}\n/>;',
  },
] as const satisfies readonly LibraryDocsCodeExample[];

export const componentDocs: readonly LibraryComponentDoc[] = uiCatalogItems.map(
  (item): LibraryComponentDoc => {
    const seed: ComponentDocSeed = componentDocSeeds[item.slug];
    const docsRoute = getUiCatalogDocsRoute(item.slug);
    const rootImport =
      seed.rootImport ??
      (seed.exportName
        ? getDefaultRootImport(seed.exportName)
        : `import * as ${item.name.replace(/\s+/g, "")} from 'erp-pro-ui';`);
    const subpathImport =
      seed.subpathImport ??
      (seed.exportName
        ? getDefaultSubpathImport(seed.exportName, item.packageExportPath)
        : `import * as ${item.name.replace(/\s+/g, "")} from 'erp-pro-ui/${item.packageExportPath}';`);

    return {
      name: item.name,
      slug: item.slug,
      status: "status" in item ? item.status : undefined,
      category: getComponentCategory(item.storybookTitle),
      summary: seed.summary,
      storybookTitle: item.storybookTitle,
      packageExportPath: item.packageExportPath,
      exportName: seed.exportName,
      aliases: seed.aliases ?? [],
      rootImport,
      subpathImport,
      docsRoute,
      docsUrl: `${DOCS_BASE_URL}${docsRoute}`,
      related: seed.related ?? [],
    };
  },
);

export const libraryDocs = {
  packageName: "erp-pro-ui",
  docsBaseUrl: DOCS_BASE_URL,
  summary:
    "Reusable React UI library for ERP and SaaS applications with tree-shakeable subpath exports, shared styles, and first-party docs metadata.",
  features: [
    "50+ reusable UI components for forms, data display, overlays, charts, and visual effects.",
    "Root and subpath imports so consumers can choose convenience or explicit package contracts.",
    "Shared Tailwind v4 stylesheet with packaged fonts, tokens, and theme foundations.",
    "Portable docs metadata that can be consumed by other apps, CLIs, and MCP servers.",
  ],
  installSteps: libraryInstallSteps,
  peerDependencies: libraryPeerDependencies,
  quickStartExamples: libraryQuickStartExamples,
  components: componentDocs,
} as const satisfies LibraryDocsBundle;

export function getComponentDocBySlug(
  slug: UiCatalogSlug,
): LibraryComponentDoc | undefined {
  return componentDocs.find((component) => component.slug === slug);
}

export function getComponentDocByName(
  name: string,
): LibraryComponentDoc | undefined {
  const normalizedName = name.trim().toLowerCase();

  return componentDocs.find((component) => {
    if (component.name.toLowerCase() === normalizedName) {
      return true;
    }

    if (component.slug === normalizedName) {
      return true;
    }

    return component.aliases.some(
      (alias) => alias.toLowerCase() === normalizedName,
    );
  });
}

export function searchComponentDocs(query: string): LibraryComponentDoc[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [...componentDocs];
  }

  return componentDocs.filter((component) => {
    const haystack = [
      component.name,
      component.slug,
      component.category,
      component.summary,
      component.storybookTitle,
      ...component.aliases,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
