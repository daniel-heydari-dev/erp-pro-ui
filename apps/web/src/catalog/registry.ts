import type { ComponentType } from "react";
import { uiCatalogItems } from "erp-pro-ui/catalog";
import type { UiCatalogSlug } from "erp-pro-ui/catalog";

export type ComponentModule = {
  default: ComponentType<unknown>;
};

export type ComponentLoader = () => Promise<ComponentModule>;

export interface CatalogItem {
  name: string;
  slug: string;
  loader: ComponentLoader;
  status?: "new" | "updated";
}

export interface CatalogCategory {
  name: string;
  slug: string;
  items: CatalogItem[];
}

export interface CatalogCategorySummary {
  name: string;
  subcategories: string[];
}

const getStartedItems: CatalogItem[] = [
  {
    name: "Introduction",
    slug: "introduction",
    loader: () => import("@/docs/get-started/Introduction"),
  },
  {
    name: "Installation",
    slug: "installation",
    loader: () => import("@/docs/get-started/Installation"),
  },
  {
    name: "MCP",
    slug: "mcp",
    loader: () => import("@/docs/get-started/McpServer"),
  },
];

const uiDocsLoaders: Record<UiCatalogSlug, ComponentLoader> = {
  combobox: () => import("@/docs/ui-basics/ComboboxDoc"),
  button: () => import("@/docs/ui-basics/ButtonDoc"),
  input: () => import("@/docs/ui-basics/InputDoc"),
  checkbox: () => import("@/docs/ui-basics/CheckboxDoc"),
  radio: () => import("@/docs/ui-basics/RadioDoc"),
  switch: () => import("@/docs/ui-basics/SwitchDoc"),
  select: () => import("@/docs/ui-basics/SelectDoc"),
  textarea: () => import("@/docs/ui-basics/TextareaDoc"),
  label: () => import("@/docs/ui-basics/LabelDoc"),
  dialog: () => import("@/docs/ui-basics/DialogDoc"),
  drawer: () => import("@/docs/ui-basics/DrawerDoc"),
  alert: () => import("@/docs/ui-basics/AlertDoc"),
  toast: () => import("@/docs/ui-basics/ToastDoc"),
  tooltip: () => import("@/docs/ui-basics/TooltipDoc"),
  accordion: () => import("@/docs/ui-basics/AccordionDoc"),
  card: () => import("@/docs/ui-basics/CardDoc"),
  stepper: () => import("@/docs/ui-basics/StepperDoc"),
  chip: () => import("@/docs/ui-basics/ChipDoc"),
  "progress-bar": () => import("@/docs/ui-basics/ProgressBarDoc"),
  calendar: () => import("@/docs/ui-basics/CalendarDoc"),
  datepicker: () => import("@/docs/ui-basics/DatePickerDoc"),
  "multiselect-combobox": () =>
    import("@/docs/ui-basics/MultiSelectComboboxDoc"),
  "hover-card": () => import("@/docs/ui-basics/HoverCardDoc"),
  "spotlight-card": () => import("@/docs/ui-basics/SpotlightCardDoc"),
  "splash-cursor": () => import("@/docs/ui-basics/SplashCursorDoc"),
  "chroma-grid": () => import("@/docs/ui-basics/ChromaGridDoc"),
  "color-palette": () => import("@/docs/ui-basics/ColorPaletteDoc"),
  "gradual-blur": () => import("@/docs/ui-basics/GradualBlurDoc"),
  "animated-content": () => import("@/docs/ui-basics/AnimatedContentDoc"),
  "background-gradient": () =>
    import("@/docs/ui-basics/BackgroundGradientAnimationDoc"),
  "hover-border-gradient": () =>
    import("@/docs/ui-basics/HoverBorderGradientDoc"),
  "button-hover-border-gradient": () =>
    import("@/docs/ui-basics/ButtonHoverBorderGradientDoc"),
  "password-strength-meter": () =>
    import("@/docs/ui-basics/PasswordStrengthMeterDoc"),
  "sun-to-moon-button": () => import("@/docs/ui-basics/SunToMoonButtonDoc"),
  carousel: () => import("@/docs/ui-basics/CarouselDoc"),
  otpinput: () => import("@/docs/ui-basics/OTPInputDoc"),
  form: () => import("@/docs/ui-basics/FormDoc"),
  "data-table": () => import("@/docs/ui-basics/DataTableDoc"),
  loading: () => import("@/docs/ui-basics/LoadingDoc"),
  skeleton: () => import("@/docs/ui-basics/SkeletonDoc"),
  "area-chart": () => import("@/docs/ui-basics/AreaChartDoc"),
  "bar-chart": () => import("@/docs/ui-basics/BarChartDoc"),
  "pie-chart": () => import("@/docs/ui-basics/PieChartDoc"),
  "neon-line-chart": () => import("@/docs/ui-basics/NeonLineChartDoc"),
  "stacked-bar-chart": () => import("@/docs/ui-basics/StackedBarChartDoc"),
  "thin-breakdown-bar": () => import("@/docs/ui-basics/ThinBreakdownBarDoc"),
  icons: () => import("@/docs/ui-basics/IconsDoc"),
  typography: () => import("@/docs/ui-basics/TypographyDoc"),
};

type SharedUiCatalogItem = (typeof uiCatalogItems)[number];

function createCatalogItem(item: SharedUiCatalogItem): CatalogItem {
  return {
    name: item.name,
    slug: item.slug,
    status: "status" in item ? item.status : undefined,
    loader: uiDocsLoaders[item.slug],
  };
}

export const catalogCategories: CatalogCategory[] = [
  {
    name: "Get Started",
    slug: "get-started",
    items: getStartedItems,
  },
  {
    name: "UI Basics",
    slug: "ui-basics",
    items: [
      {
        name: "Search",
        slug: "search",
        loader: () => import("@/docs/ui-basics/SearchDoc"),
      },
      ...uiCatalogItems.map(createCatalogItem),
      {
        name: "Preview",
        slug: "preview",
        loader: () => import("@/docs/ui-basics/PreviewDoc"),
      },
    ],
  },
];

export const catalogItems = catalogCategories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryName: category.name,
    categorySlug: category.slug,
  })),
);

export const componentMap = Object.fromEntries(
  catalogItems.map((item) => [item.slug, item.loader]),
) as Record<string, ComponentLoader>;

export const CATEGORIES: CatalogCategorySummary[] = catalogCategories.map(
  (category) => ({
    name: category.name,
    subcategories: category.items.map((item) => item.name),
  }),
);

export const NEW = catalogItems
  .filter((item) => item.status === "new")
  .map((item) => item.name);

export const UPDATED = catalogItems
  .filter((item) => item.status === "updated")
  .map((item) => item.name);

export function findCatalogCategory(categorySlug?: string) {
  if (!categorySlug) {
    return undefined;
  }

  return catalogCategories.find((category) => category.slug === categorySlug);
}

export function findCatalogItem(itemSlug?: string) {
  if (!itemSlug) {
    return undefined;
  }

  return catalogItems.find((item) => item.slug === itemSlug);
}

export function findCatalogItemByRoute(
  categorySlug?: string,
  itemSlug?: string,
) {
  const category = findCatalogCategory(categorySlug);

  if (!category || !itemSlug) {
    return undefined;
  }

  return category.items.find((item) => item.slug === itemSlug);
}
