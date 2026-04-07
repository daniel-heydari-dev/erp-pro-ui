import type { ReactNode } from "react";

export type StepStatus = "completed" | "current" | "upcoming" | "error";
export type StepperOrientation = "horizontal" | "vertical";
export type StepperSize = "sm" | "md" | "lg";
export type StepperVariant = "default" | "glass" | "minimal" | "outlined";
export type StepperLabelPosition = "bottom" | "right";
export type StepperStepsState = "untouched" | "valid" | "invalid";
export type ResponsiveStepperOrientation = StepperOrientation | "responsive";

export interface Step {
  /** Unique identifier for the step */
  id: string;
  /** Step title */
  title: string;
  /** Optional description */
  description?: string;
  /** Custom icon for the step */
  icon?: ReactNode;
  /** Whether the step is optional */
  optional?: boolean;
  /** Whether the step is disabled */
  disabled?: boolean;
  /** Custom content to render when step is active */
  content?: ReactNode;
}

export interface StepperProps {
  /** Array of steps */
  steps: Step[];
  /** Current active step index (0-based) */
  currentStep: number;
  /** Callback when step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Orientation of the stepper */
  orientation?: StepperOrientation;
  /** Size variant */
  size?: StepperSize;
  /** Visual variant */
  variant?: StepperVariant;
  /** Horizontal label position relative to the indicator */
  labelPosition?: StepperLabelPosition;
  /** Whether to show step numbers */
  showNumbers?: boolean;
  /** Whether to allow clicking on completed steps */
  clickable?: boolean;
  /** Whether to show the connector line */
  showConnector?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom connector class name */
  connectorClassName?: string;
  /** Custom step class name */
  stepClassName?: string;
  /** Whether errors should show on steps */
  showErrors?: boolean;
  /** Array of step indices with errors */
  errorSteps?: number[];
  /** Completed steps (alternative to auto-calculating from currentStep) */
  completedSteps?: number[];
  /** Whether to animate step transitions */
  animated?: boolean;
  /** Custom colors */
  colors?: {
    completed?: string;
    current?: string;
    upcoming?: string;
    error?: string;
    connector?: string;
  };
}

export interface StepIndicatorProps {
  step: Step;
  index: number;
  status: StepStatus;
  size: StepperSize;
  variant: StepperVariant;
  showNumbers: boolean;
  animated: boolean;
  colors?: StepperProps["colors"];
}

export interface StepConnectorProps {
  status: "completed" | "upcoming";
  orientation: StepperOrientation;
  size: StepperSize;
  variant: StepperVariant;
  animated: boolean;
  className?: string;
  colors?: StepperProps["colors"];
}

export interface StepperStepsItem {
  /** Step label shown inside the step button */
  label: string;
  /** Optional leading icon for the step */
  icon?: ReactNode;
}

export interface StepperStepsProps {
  /** Ordered step labels */
  steps: readonly StepperStepsItem[];
  /** Current active step index (0-based) */
  currentStep: number;
  /** Optional click handler for interactive step navigation */
  onStepClick?: (stepIndex: number) => void;
  /** Optional status for each step */
  stepStates?: readonly StepperStepsState[];
  /** Fixed orientation or responsive mode */
  orientation?: ResponsiveStepperOrientation;
  /** Breakpoint used when orientation is responsive */
  responsiveBreakpoint?: number;
  /** Optional wrapper class name */
  className?: string;
  /** Optional class name applied to each step button */
  stepClassName?: string;
  /** Optional class name applied to connectors */
  connectorClassName?: string;
}

export type StepperWizardIndicatorStatus = "active" | "inactive" | "complete";

export interface StepperWizardIndicatorRenderProps {
  /** Step index (0-based) */
  stepIndex: number;
  /** Step label number (1-based) */
  stepNumber: number;
  /** Current active step index (0-based) */
  currentStep: number;
  /** Visual status for the indicator */
  status: StepperWizardIndicatorStatus;
  /** Whether the indicator can be clicked */
  isClickable: boolean;
  /** Navigate to a different step */
  onStepClick: (stepIndex: number) => void;
}

export interface StepperWizardProps {
  /** Step content panes */
  children: ReactNode;
  /** Initial step index for uncontrolled usage */
  initialStep?: number;
  /** Current step index for controlled usage */
  currentStep?: number;
  /** Called whenever the active step changes */
  onStepChange?: (stepIndex: number) => void;
  /** Called when the final action completes */
  onFinalStepCompleted?: () => void;
  /** Optional class name for the outer indicator shell */
  stepCircleContainerClassName?: string;
  /** Optional class name for the indicator row */
  stepContainerClassName?: string;
  /** Optional class name for the content area */
  contentClassName?: string;
  /** Optional class name for the footer area */
  footerClassName?: string;
  /** Additional props for the back button */
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Additional props for the next button */
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Back button label */
  backButtonText?: string;
  /** Next button label */
  nextButtonText?: string;
  /** Completion button label */
  completeButtonText?: string;
  /** Disable step indicator navigation */
  disableStepIndicators?: boolean;
  /** Custom indicator renderer */
  renderStepIndicator?: (props: StepperWizardIndicatorRenderProps) => ReactNode;
  /** Optional wrapper class name */
  className?: string;
}

export interface StepperWizardStepProps {
  /** Step content */
  children: ReactNode;
  /** Optional class name for the content shell */
  className?: string;
}
