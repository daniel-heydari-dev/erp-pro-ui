// =============================================================================
// erp-pro-ui - Main Entry Point
// =============================================================================
// This file exports all components with named exports for optimal tree-shaking.
// Import usage: import { Button, Input, Dialog } from 'erp-pro-ui'
// Or use subpath imports: import { Button } from 'erp-pro-ui/button'
// =============================================================================

// -----------------------------------------------------------------------------
// Contexts
// -----------------------------------------------------------------------------
export { ThemeProvider, useThemeContext } from './contexts';
export type { ThemeModeType, ThemeColorType, UseThemeType } from './contexts';

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------
export * from './utils';

// -----------------------------------------------------------------------------
// Basic Components
// -----------------------------------------------------------------------------
export { NeonLineChart } from './components/basics/charts/NeonLineChart';
export { StackedBarChart } from './components/basics/charts/StackedBarChart';
export type { StackedBarData } from './components/basics/charts/StackedBarChart';
export { ThinBreakdownBar } from './components/basics/charts/ThinBreakdownBar';
export type { BreakdownSegment } from './components/basics/charts/ThinBreakdownBar';

export { AreaChart } from './components/basics/charts/AreaChart';
export type { AreaChartData } from './components/basics/charts/AreaChart';
export { BarChart } from './components/basics/charts/BarChart';
export type { BarChartData } from './components/basics/charts/BarChart';
export { PieChart } from './components/basics/charts/PieChart';
export type { PieChartData } from './components/basics/charts/PieChart';

export { Accordion } from './components/basics/accordion/Accordion';
export type {
  AccordionProps,
  AccordionItemConfig,
} from './components/basics/accordion/types.d';

export { Alert } from './components/basics/alert/Alert';

export { AnimatedContent } from './components/basics/animated-content/AnimatedContent';

export { BackgroundGradientAnimation } from './components/basics/background-gradient-animation/BackgroundGradientAnimation';

export { Button } from './components/basics/Button/Button';
export type { ButtonProps } from './components/basics/Button/types';

export { ButtonHoverBorderGradient } from './components/basics/button-hover-border-gradient/ButtonHoverBorderGradient';

export { Calendar } from './components/basics/calendar/Calendar';

export { Card } from './components/basics/card/Card';

export { Carousel } from './components/basics/carousel/Carousel';

export { Checkbox } from './components/basics/checkbox/Checkbox';

export { default as Chip } from './components/basics/chip/Chip';
export type {
  ChipProps,
  ChipVariant,
  ChipColor,
  ChipSize,
} from './components/basics/chip/Chip';

export { default as ChromaGrid } from './components/basics/chroma-grid/ChromaGrid';

// ColorPalette - default export
export { default as ColorPalette } from './components/basics/colo-palette/ColorPalette';
export type {
  ColorPaletteProps,
  ColorGroup,
  ColorSwatch,
} from './components/basics/colo-palette/ColorPalette';

// Combobox - default export
export { default as Combobox } from './components/basics/combobox/Combobox';
export type { ComboboxOption } from './components/basics/combobox/Combobox';

// DataTable - default export
export { default as DataTable } from './components/basics/data-table/DataTable';
export {
  FilterDropdown,
  FilterButton,
  ColumnToggle,
  FilterProfile,
} from './components/basics/data-table/DataTable';
export type {
  DataTableProps,
  FilterOption,
  FilterValue,
  FilterValues,
} from './components/basics/data-table/DataTable';

export { DatePicker } from './components/basics/date-picker/DatePicker';
export type { DatePickerValue } from './components/basics/date-picker/types';

export { Dialog } from './components/basics/dialog/Dialog';

export { Drawer } from './components/basics/drawer/Drawer';

export { Form } from './components/basics/form/Form';

export { GradualBlur } from './components/basics/gradual-blur/GradualBlur';

export { HoverBorderGradient } from './components/basics/hover-border-gradient/HoverBorderGradient';

export { default as HoverCard } from './components/basics/hover-card/HoverCard';

export { Input } from './components/basics/input/Input';
export type { InputProps } from './components/basics/input/types';
export { InputState } from './components/basics/input/types';

export { Label } from './components/basics/label/Label';

// Loading - default export
export { default as Loading } from './components/basics/loading/Loading';
export {
  Spinner,
  Dots,
  Pulse,
  Bars,
  Ring,
  Bounce,
  Wave,
  Skeleton,
} from './components/basics/loading/Loading';
export type {
  LoadingProps,
  LoadingVariant,
  LoadingSize,
} from './components/basics/loading/Loading';

// MultiSelectCombobox - default export
export { default as MultiSelectCombobox } from './components/basics/multi-select-combobox/MultiSelectCombobox';

export { default as OTPInput } from './components/basics/otp-Input/OTPInput';

export { PasswordStrengthMeter } from './components/basics/password-strength-meter/PasswordStrengthMeter';

export { Preview } from './components/basics/preview/Preview';

export { Radio } from './components/basics/radio/Radio';

export { Select } from './components/basics/select/Select';

export { Skeleton as SkeletonComponent } from './components/basics/skeleton/Skeleton';

export { default as SplashCursor } from './components/basics/splashCursor/SplashCursor';

export { default as SpotlightCard } from './components/basics/spotlight-card/SpotlightCard';

export { default as Stepper } from './components/basics/stepper/Stepper';
export type {
  StepperProps,
  Step,
  StepperOrientation,
  StepperVariant,
  StepperSize,
} from './components/basics/stepper/types';

// SunToMoonButton - default export
export { default as SunToMoonButton } from './components/basics/sun-to-moon-button/SunToMoonButton';

export { Switch } from './components/basics/switch/Switch';

export { Textarea } from './components/basics/textarea/Textarea';

export {
  default as ToastProvider,
  ToastItem,
  useToast,
} from './components/basics/toast/Toast';
export type {
  Toast,
  ToastType,
  ToastPosition,
} from './components/basics/toast/Toast';

export { default as Tooltip } from './components/basics/tooltip/Tooltip';
export type {
  TooltipProps,
  TooltipPosition,
  TooltipTrigger,
} from './components/basics/tooltip/Tooltip';
export { Typography } from './components/basics/typography/Typography';
export type {
  TypographyProps,
  TypographyVariant,
  TypographyAlign,
  TypographyWeight,
  TypographyTracking,
  TypographyGradient,
} from './components/basics/typography/Typography';
export type { AlertProps, AlertVariant } from './components/basics/alert/types';
export type {
  DialogProps,
  DialogVariant,
  DialogAnimation,
} from './components/basics/dialog/types';
export type {
  DrawerProps,
  DrawerPosition,
} from './components/basics/drawer/types';

// -----------------------------------------------------------------------------
// Text Animation Components
// -----------------------------------------------------------------------------
export { default as ASCIIText } from './components/text-animations/ASCIIText/ASCIIText';
export type { ASCIITextProps } from './components/text-animations/ASCIIText/ASCIIText';

// -----------------------------------------------------------------------------
// Icons - Re-export from barrel file
// -----------------------------------------------------------------------------
export * from './components/icons';

// -----------------------------------------------------------------------------
// Spinners
// -----------------------------------------------------------------------------
export { Audio } from './components/spinners/Audio';
