// =============================================================================
// erp-pro-ui - Main Entry Point
// =============================================================================
// This file exports all components with named exports for optimal tree-shaking.
// Import usage: import { Button, Input, Dialog } from 'erp-pro-ui'
// Or use subpath imports: import { Button } from 'erp-pro-ui/button'
// =============================================================================

// -----------------------------------------------------------------------------
// Foundations
// -----------------------------------------------------------------------------
export { ThemeProvider, useThemeContext } from "./foundations/theme";
export type {
  ThemeModeType,
  ThemeColorType,
  UseThemeType,
} from "./foundations/theme";

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------
export * from "./utils";

// -----------------------------------------------------------------------------
// Basic Components
// -----------------------------------------------------------------------------
export {
  NeonLineChart,
  StackedBarChart,
  ThinBreakdownBar,
  AreaChart,
  BarChart,
  PositiveNegativeBarChart,
  PieChart,
  chartColorTokens,
  getChartColorVar,
  getChartPalette,
} from "./components/data-display/charts";
export type {
  StackedBarData,
  BreakdownSegment,
  AreaChartData,
  BarChartData,
  PositiveNegativeBarChartData,
  PieChartData,
  ChartColorSlot,
  ChartColorToken,
} from "./components/data-display/charts";

export { Accordion } from "./components/navigation/accordion";
export type {
  AccordionProps,
  AccordionItemConfig,
} from "./components/navigation/accordion";

export { Alert } from "./components/feedback/alert";

export { AnimatedContent } from "./components/effects/animated-content";

export { BackgroundGradientAnimation } from "./components/effects/background-gradient-animation";

export { BorderBeam } from "./components/effects/border-beam";
export type { BorderBeamProps } from "./components/effects/border-beam";

export { Button } from "./components/forms/button";
export type { ButtonProps } from "./components/forms/button";

export { ButtonHoverBorderGradient } from "./components/effects/button-hover-border-gradient";

export { Calendar } from "./components/forms/calendar";

export { Card } from "./components/data-display/card";

export { Carousel } from "./components/navigation/carousel";

export { Checkbox } from "./components/forms/checkbox";

export { Chip } from "./components/data-display/chip";
export type {
  ChipProps,
  ChipVariant,
  ChipColor,
  ChipSize,
} from "./components/data-display/chip";

export { ProgressBar } from "./components/data-display/progress-bar";
export type {
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarTone,
} from "./components/data-display/progress-bar";

export { ChromaGrid } from "./components/effects/chroma-grid";

export { ColorPalette } from "./components/data-display/color-palette";
export type {
  ColorPaletteProps,
  ColorGroup,
  ColorSwatch,
} from "./components/data-display/color-palette";

export { Combobox } from "./components/forms/combobox";
export type {
  ComboboxOption,
  ComboboxProps,
} from "./components/forms/combobox";

export { DataTable } from "./components/data-display/data-table";
export {
  FilterDropdown,
  FilterButton,
  ColumnToggle,
  FilterProfile,
} from "./components/data-display/data-table";
export type {
  DataTableCellRenderContext,
  DataTableColumn,
  DataTableProps,
  FilterOption,
  FilterValue,
  FilterValues,
} from "./components/data-display/data-table";

export { DatePicker } from "./components/forms/date-picker";
export type { DatePickerValue } from "./components/forms/date-picker";

export { Dialog } from "./components/overlays/dialog";

export { Drawer } from "./components/overlays/drawer";

export {
  Form,
  FormActions,
  FormField,
  FormSection,
  InputGroup,
} from "./components/forms/form";
export type {
  FormActionsProps,
  FormFieldProps,
  FormProps,
  FormSectionProps,
  InputGroupProps,
} from "./components/forms/form";

export { GradualBlur } from "./components/effects/gradual-blur";

export { HoverBorderGradient } from "./components/effects/hover-border-gradient";

export { HoverCard } from "./components/overlays/hover-card";

export { Input } from "./components/forms/input";
export type { InputProps } from "./components/forms/input";
export { InputState } from "./components/forms/input";

export { Label } from "./components/forms/label";

export { Loading } from "./components/data-display/loading";
export {
  Spinner,
  Dots,
  Pulse,
  Bars,
  Ring,
  Bounce,
  Wave,
  Skeleton,
} from "./components/data-display/loading";
export type {
  LoadingProps,
  LoadingVariant,
  LoadingSize,
} from "./components/data-display/loading";

export { MultiSelectCombobox } from "./components/forms/multi-select-combobox";
export type {
  MultiSelectComboboxProps,
  MultiSelectOption,
} from "./components/forms/multi-select-combobox";

export { OTPInput } from "./components/forms/otp-input";
export type { OTPInputProps } from "./components/forms/otp-input";

export { PasswordStrengthMeter } from "./components/forms/password-strength-meter";
export type { PasswordStrengthMeterProps } from "./components/forms/password-strength-meter";

export { Radio } from "./components/forms/radio";

export { Select } from "./components/forms/select";

export {
  Skeleton as SkeletonComponent,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonImage,
  SkeletonListItem,
  SkeletonMetricCard,
  SkeletonTableRow,
  SkeletonText,
} from "./components/data-display/skeleton";
export type {
  SkeletonAnimation,
  SkeletonAvatarProps,
  SkeletonCardProps,
  SkeletonMetricCardProps,
  SkeletonProps as SkeletonComponentProps,
  SkeletonRadius,
  SkeletonSpeed,
  SkeletonTextProps,
  SkeletonTone,
  SkeletonVariant,
} from "./components/data-display/skeleton";

export { SplashCursor } from "./components/effects/splash-cursor";

export { SpotlightCard } from "./components/effects/spotlight-card";

export { Stepper } from "./components/navigation/stepper";
export type {
  StepperProps,
  Step,
  ResponsiveStepperOrientation,
  StepperOrientation,
  StepperVariant,
  StepperSize,
} from "./components/navigation/stepper";
export {
  StepperSteps,
  StepperStepsNavigation,
  StepperWizard,
  StepperWizardStep,
} from "./components/navigation/stepper";
export type {
  StepperStepsItem,
  StepperStepsProps,
  StepperStepsState,
  StepperWizardIndicatorRenderProps,
  StepperWizardIndicatorStatus,
  StepperWizardProps,
  StepperWizardStepProps,
} from "./components/navigation/stepper";

export { SunToMoonButton } from "./components/effects/sun-to-moon-button";
export type { SunToMoonButtonProps } from "./components/effects/sun-to-moon-button";

export { Switch } from "./components/forms/switch";

export { Textarea } from "./components/forms/textarea";

export {
  ToastProvider,
  ToastItem,
  useToast,
} from "./components/overlays/toast";
export type {
  Toast,
  ToastType,
  ToastPosition,
} from "./components/overlays/toast";

export { Tooltip } from "./components/overlays/tooltip";
export type {
  TooltipProps,
  TooltipPosition,
  TooltipTrigger,
} from "./components/overlays/tooltip";
export { Typography } from "./components/typography";
export { TruncatedText } from "./components/typography/truncated-text";
export type {
  TypographyProps,
  TypographyVariant,
  TypographyAlign,
  TypographyWeight,
  TypographyTracking,
  TypographyGradient,
} from "./components/typography";
export type { TruncatedTextProps } from "./components/typography/truncated-text";
export type { AlertProps, AlertVariant } from "./components/feedback/alert";
export type {
  DialogProps,
  DialogVariant,
  DialogAnimation,
} from "./components/overlays/dialog";
export type { DrawerProps, DrawerPosition } from "./components/overlays/drawer";

// -----------------------------------------------------------------------------
// Text Animation Components
// -----------------------------------------------------------------------------
export { ASCIIText } from "./components/effects/ascii-text";
export type { ASCIITextProps } from "./components/effects/ascii-text";

// -----------------------------------------------------------------------------
// Icons - Re-export from barrel file
// -----------------------------------------------------------------------------
export * from "./components/icons";

// -----------------------------------------------------------------------------
// Spinners
// -----------------------------------------------------------------------------
export { Audio } from "./components/spinners";
