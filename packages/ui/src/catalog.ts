export type UiCatalogStatus = "new" | "updated";

export interface UiCatalogItem {
  readonly name: string;
  readonly slug: string;
  readonly packageExportPath: string;
  readonly storybookTitle: string;
  readonly status?: UiCatalogStatus;
}

export const uiCatalogItems = [
  {
    name: "Combobox",
    slug: "combobox",
    packageExportPath: "combobox",
    storybookTitle: "Forms/Combobox",
  },
  {
    name: "Button",
    slug: "button",
    packageExportPath: "button",
    storybookTitle: "Forms/Button",
  },
  {
    name: "Input",
    slug: "input",
    packageExportPath: "input",
    storybookTitle: "Forms/Input",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    packageExportPath: "checkbox",
    storybookTitle: "Forms/Checkbox",
  },
  {
    name: "Radio",
    slug: "radio",
    packageExportPath: "radio",
    storybookTitle: "Forms/Radio",
  },
  {
    name: "Switch",
    slug: "switch",
    packageExportPath: "switch",
    storybookTitle: "Forms/Switch",
  },
  {
    name: "Select",
    slug: "select",
    packageExportPath: "select",
    storybookTitle: "Forms/Select",
  },
  {
    name: "Textarea",
    slug: "textarea",
    packageExportPath: "textarea",
    storybookTitle: "Forms/Textarea",
  },
  {
    name: "Label",
    slug: "label",
    packageExportPath: "label",
    storybookTitle: "Forms/Label",
  },
  {
    name: "Dialog",
    slug: "dialog",
    packageExportPath: "dialog",
    storybookTitle: "Overlays/Dialog",
  },
  {
    name: "Drawer",
    slug: "drawer",
    packageExportPath: "drawer",
    storybookTitle: "Layout/Drawer",
  },
  {
    name: "Alert",
    slug: "alert",
    packageExportPath: "alert",
    storybookTitle: "Data Display/Alert",
  },
  {
    name: "Toast",
    slug: "toast",
    packageExportPath: "toast",
    storybookTitle: "Data Display/Toast",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    packageExportPath: "tooltip",
    storybookTitle: "Layout/Tooltip",
  },
  {
    name: "Accordion",
    slug: "accordion",
    packageExportPath: "accordion",
    storybookTitle: "Layout/Accordion",
  },
  {
    name: "Card",
    slug: "card",
    packageExportPath: "card",
    storybookTitle: "Layout/Card",
  },
  {
    name: "Stepper",
    slug: "stepper",
    packageExportPath: "stepper",
    storybookTitle: "Layout/Stepper",
  },
  {
    name: "Chip",
    slug: "chip",
    packageExportPath: "chip",
    storybookTitle: "Data Display/Chip",
  },
  {
    name: "Progress Bar",
    slug: "progress-bar",
    packageExportPath: "progress-bar",
    storybookTitle: "Data Display/ProgressBar",
  },
  {
    name: "Calendar",
    slug: "calendar",
    packageExportPath: "calendar",
    storybookTitle: "Forms/Calendar",
  },
  {
    name: "DatePicker",
    slug: "datepicker",
    packageExportPath: "date-picker",
    storybookTitle: "Forms/DatePicker",
  },
  {
    name: "MultiSelect Combobox",
    slug: "multiselect-combobox",
    packageExportPath: "multi-select-combobox",
    storybookTitle: "Forms/MultiSelectCombobox",
  },
  {
    name: "Hover Card",
    slug: "hover-card",
    packageExportPath: "hover-card",
    storybookTitle: "Layout/HoverCard",
  },
  {
    name: "Spotlight Card",
    slug: "spotlight-card",
    packageExportPath: "spotlight-card",
    storybookTitle: "Visuals/SpotlightCard",
  },
  {
    name: "Splash Cursor",
    slug: "splash-cursor",
    packageExportPath: "splash-cursor",
    storybookTitle: "Visuals/SplashCursor",
  },
  {
    name: "Chroma Grid",
    slug: "chroma-grid",
    packageExportPath: "chroma-grid",
    storybookTitle: "Visuals/ChromaGrid",
  },
  {
    name: "Color Palette",
    slug: "color-palette",
    packageExportPath: "color-palette",
    storybookTitle: "Data Display/ColorPalette",
  },
  {
    name: "Gradual Blur",
    slug: "gradual-blur",
    packageExportPath: "gradual-blur",
    storybookTitle: "Visuals/GradualBlur",
  },
  {
    name: "Animated Content",
    slug: "animated-content",
    packageExportPath: "animated-content",
    storybookTitle: "Visuals/AnimatedContent",
    status: "updated",
  },
  {
    name: "Background Gradient",
    slug: "background-gradient",
    packageExportPath: "background-gradient-animation",
    storybookTitle: "Visuals/BackgroundGradientAnimation",
  },
  {
    name: "Hover Border Gradient",
    slug: "hover-border-gradient",
    packageExportPath: "hover-border-gradient",
    storybookTitle: "Visuals/HoverBorderGradient",
  },
  {
    name: "Button Hover Border Gradient",
    slug: "button-hover-border-gradient",
    packageExportPath: "button-hover-border-gradient",
    storybookTitle: "Visuals/ButtonHoverBorderGradient",
  },
  {
    name: "Password Strength Meter",
    slug: "password-strength-meter",
    packageExportPath: "password-strength-meter",
    storybookTitle: "Forms/PasswordStrengthMeter",
  },
  {
    name: "Sun To Moon Button",
    slug: "sun-to-moon-button",
    packageExportPath: "sun-to-moon-button",
    storybookTitle: "Foundations/Theme/SunToMoonButton",
  },
  {
    name: "Carousel",
    slug: "carousel",
    packageExportPath: "carousel",
    storybookTitle: "Layout/Carousel",
  },
  {
    name: "OTPInput",
    slug: "otpinput",
    packageExportPath: "otp-input",
    storybookTitle: "Forms/OTPInput",
  },
  {
    name: "Form",
    slug: "form",
    packageExportPath: "form",
    storybookTitle: "Layout/Form",
  },
  {
    name: "Data Table",
    slug: "data-table",
    packageExportPath: "data-table",
    storybookTitle: "Data Display/DataTable",
  },
  {
    name: "Loading",
    slug: "loading",
    packageExportPath: "loading",
    storybookTitle: "Data Display/Loading",
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    packageExportPath: "skeleton",
    storybookTitle: "Data Display/Skeleton",
  },
  {
    name: "Area Chart",
    slug: "area-chart",
    packageExportPath: "charts",
    storybookTitle: "Data Display/AreaChart",
  },
  {
    name: "Bar Chart",
    slug: "bar-chart",
    packageExportPath: "charts",
    storybookTitle: "Data Display/BarChart",
  },
  {
    name: "Positive Negative Bar Chart",
    slug: "positive-negative-bar-chart",
    packageExportPath: "charts",
    storybookTitle: "Data Display/PositiveNegativeBarChart",
  },
  {
    name: "Pie Chart",
    slug: "pie-chart",
    packageExportPath: "charts",
    storybookTitle: "Data Display/PieChart",
  },
  {
    name: "Neon Line Chart",
    slug: "neon-line-chart",
    packageExportPath: "charts",
    storybookTitle: "Data Display/NeonLineChart",
  },
  {
    name: "Stacked Bar Chart",
    slug: "stacked-bar-chart",
    packageExportPath: "charts",
    storybookTitle: "Data Display/StackedBarChart",
  },
  {
    name: "Thin Breakdown Bar",
    slug: "thin-breakdown-bar",
    packageExportPath: "charts",
    storybookTitle: "Data Display/ThinBreakdownBar",
  },
  {
    name: "Icons",
    slug: "icons",
    packageExportPath: "icons",
    storybookTitle: "Foundations/Icons",
  },
  {
    name: "Typography",
    slug: "typography",
    packageExportPath: "typography",
    storybookTitle: "Foundations/Typography",
  },
] as const satisfies readonly UiCatalogItem[];

export type UiCatalogSlug = (typeof uiCatalogItems)[number]["slug"];
export const uiCatalogStorybookTitles = uiCatalogItems.map(
  (item) => item.storybookTitle,
);

export function findUiCatalogItemByStorybookTitle(storybookTitle?: string) {
  if (!storybookTitle) {
    return undefined;
  }

  return uiCatalogItems.find((item) => item.storybookTitle === storybookTitle);
}

export function getUiCatalogDocsRoute(slug: UiCatalogSlug): string {
  return `/ui-basics/${slug}`;
}
