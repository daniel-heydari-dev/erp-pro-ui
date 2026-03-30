import type { ReactNode } from "react";

export type StepStatus = "completed" | "current" | "upcoming" | "error";
export type StepperOrientation = "horizontal" | "vertical";
export type StepperSize = "sm" | "md" | "lg";
export type StepperVariant = "default" | "glass" | "minimal" | "outlined";

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
