import { motion, AnimatePresence } from "framer-motion";

import { CheckIcon, CloseIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";
import type {
  StepperProps,
  StepIndicatorProps,
  StepStatus,
  StepperLabelPosition,
  StepperSize,
  StepperVariant,
} from "./types";

// Size configurations for indicators and icons
const sizeConfig: Record<
  StepperSize,
  {
    indicator: string;
    indicatorPx: number;
    icon: string;
    text: string;
    connectorThickness: string;
    connectorThicknessPx: number;
  }
> = {
  sm: {
    indicator: "w-8 h-8",
    indicatorPx: 32,
    icon: "w-4 h-4",
    text: "text-xs",
    connectorThickness: "2px",
    connectorThicknessPx: 2,
  },
  md: {
    indicator: "w-10 h-10",
    indicatorPx: 40,
    icon: "w-5 h-5",
    text: "text-sm",
    connectorThickness: "2px",
    connectorThicknessPx: 2,
  },
  lg: {
    indicator: "w-12 h-12",
    indicatorPx: 48,
    icon: "w-6 h-6",
    text: "text-base",
    connectorThickness: "4px",
    connectorThicknessPx: 4,
  },
};

// Variant styles for the indicator
const getVariantStyles = (variant: StepperVariant, status: StepStatus) => {
  const baseStyles = {
    default: {
      completed: "bg-accent text-on-accent shadow-md shadow-accent/25",
      current:
        "bg-accent text-on-accent ring-4 ring-focus/40 shadow-lg shadow-accent/30",
      upcoming:
        "bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400",
      error: "bg-red-500 text-white ring-4 ring-red-500/30",
    },
    glass: {
      completed:
        "bg-accent/85 text-on-accent backdrop-blur-xl border border-accent/30 shadow-lg shadow-accent/20",
      current:
        "bg-accent/90 text-on-accent backdrop-blur-xl border-2 border-accent ring-4 ring-focus/30 shadow-xl shadow-accent/30",
      upcoming:
        "bg-white/60 text-neutral-500 backdrop-blur-xl border border-white/40 dark:bg-neutral-800/60 dark:text-neutral-400 dark:border-white/10",
      error:
        "bg-red-500/80 text-white backdrop-blur-xl border border-red-400/30 ring-4 ring-red-500/20",
    },
    minimal: {
      completed: "bg-accent-subtle text-accent",
      current: "bg-accent text-on-accent shadow-sm",
      upcoming:
        "bg-transparent text-neutral-400 border-2 border-neutral-300 dark:border-neutral-600",
      error: "bg-red-100 text-red-500 dark:bg-red-900/30",
    },
    outlined: {
      completed: "bg-transparent text-accent border-2 border-accent",
      current: "bg-accent text-on-accent border-2 border-accent shadow-lg",
      upcoming:
        "bg-transparent text-neutral-400 border-2 border-neutral-300 dark:border-neutral-600",
      error: "bg-transparent text-red-500 border-2 border-red-500",
    },
  };

  return baseStyles[variant][status];
};

const getConnectorTrackClassName = (variant: StepperVariant) =>
  variant === "glass"
    ? "bg-white/30 backdrop-blur-sm dark:bg-white/10"
    : "bg-neutral-200 dark:bg-neutral-700";

const getResolvedLabelPosition = (
  orientation: StepperProps["orientation"],
  labelPosition: StepperLabelPosition,
) => (orientation === "vertical" ? "right" : labelPosition);

// Step Indicator Component
const StepIndicator = ({
  step,
  index,
  status,
  size,
  variant,
  showNumbers,
  animated,
  colors,
}: StepIndicatorProps) => {
  const config = sizeConfig[size];
  const variantStyles = getVariantStyles(variant, status);

  // Custom color overrides
  const customColorStyle = colors?.[status]
    ? { backgroundColor: colors[status], borderColor: colors[status] }
    : undefined;

  const renderContent = () => {
    if (step.icon) {
      return <span className={config.icon}>{step.icon}</span>;
    }

    if (status === "completed") {
      return <CheckIcon className={config.icon} aria-hidden="true" />;
    }

    if (status === "error") {
      return <CloseIcon className={config.icon} aria-hidden="true" />;
    }

    if (showNumbers) {
      return <span className="font-semibold">{index + 1}</span>;
    }

    return (
      <span
        className={mergeClassNames(
          "rounded-full bg-current",
          size === "sm" ? "w-2 h-2" : "w-3 h-3",
        )}
      />
    );
  };

  return (
    <motion.div
      className={mergeClassNames(
        "rounded-full flex items-center justify-center transition-all duration-300",
        config.indicator,
        variantStyles,
      )}
      style={customColorStyle}
      initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animated ? { scale: 1, opacity: 1 } : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={status}
          initial={animated ? { scale: 0, rotate: -180 } : undefined}
          animate={animated ? { scale: 1, rotate: 0 } : undefined}
          exit={animated ? { scale: 0, rotate: 180 } : undefined}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

// Main Stepper Component
export const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  size = "md",
  variant = "glass",
  labelPosition = "bottom",
  showNumbers = true,
  clickable = true,
  showConnector = true,
  className,
  connectorClassName,
  stepClassName,
  showErrors = false,
  errorSteps = [],
  completedSteps,
  animated = true,
  colors,
}: StepperProps) => {
  const isVertical = orientation === "vertical";
  const resolvedLabelPosition = getResolvedLabelPosition(
    orientation,
    labelPosition,
  );
  const isHorizontalInline =
    orientation === "horizontal" && resolvedLabelPosition === "right";
  const config = sizeConfig[size];
  const indicatorPaddingPx =
    variant === "glass" || variant === "outlined" || variant === "minimal"
      ? 4
      : 2;
  const indicatorShellSizePx = config.indicatorPx + indicatorPaddingPx * 2;
  const connectorInsetPx = indicatorShellSizePx / 2;
  const connectorCenterOffsetPx =
    connectorInsetPx - config.connectorThicknessPx / 2;

  const getStepStatus = (index: number): StepStatus => {
    if (showErrors && errorSteps.includes(index)) return "error";
    if (completedSteps) {
      if (completedSteps.includes(index)) return "completed";
      if (index === currentStep) return "current";
      return "upcoming";
    }
    if (index < currentStep) return "completed";
    if (index === currentStep) return "current";
    return "upcoming";
  };

  const handleStepClick = (index: number) => {
    if (!clickable || !onStepClick) return;
    const step = steps[index];
    if (step.disabled) return;

    // Allow clicking on completed or current steps
    const status = getStepStatus(index);
    if (status === "completed" || status === "current") {
      onStepClick(index);
    }
  };

  return (
    <div
      className={mergeClassNames(
        "w-full relative",
        isVertical
          ? "flex flex-col"
          : isHorizontalInline
            ? "flex items-center"
            : "flex items-start justify-between",
        className,
      )}
    >
      {/* Global Background Continuous Connector */}
      {showConnector &&
        isVertical &&
        (() => {
          return (
            <div
              className={mergeClassNames(
                "absolute rounded-full",
                getConnectorTrackClassName(variant),
                connectorClassName,
              )}
              style={{
                ...(isVertical
                  ? {
                      top: `${connectorInsetPx}px`,
                      bottom: `${connectorInsetPx}px`,
                      left: `${connectorCenterOffsetPx}px`,
                      width: config.connectorThickness,
                    }
                  : {
                      left: `${connectorInsetPx}px`,
                      right: `${connectorInsetPx}px`,
                      top: `${connectorCenterOffsetPx}px`,
                      height: config.connectorThickness,
                    }),
              }}
            >
              {/* Animated fill connector */}
              {animated ? (
                <motion.div
                  className="absolute top-0 left-0 bg-accent rounded-full"
                  initial={{ [isVertical ? "height" : "width"]: 0 }}
                  animate={{
                    [isVertical ? "height" : "width"]:
                      `${steps.length > 1 ? (Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100 : 0}%`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    ...(isVertical ? { width: "100%" } : { height: "100%" }),
                    backgroundColor: colors?.connector || colors?.completed,
                  }}
                />
              ) : (
                <div
                  className="absolute top-0 left-0 bg-accent rounded-full"
                  style={{
                    ...(isVertical
                      ? {
                          width: "100%",
                          height: `${steps.length > 1 ? (Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100 : 0}%`,
                        }
                      : {
                          height: "100%",
                          width: `${steps.length > 1 ? (Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100 : 0}%`,
                        }),
                    backgroundColor: colors?.connector || colors?.completed,
                  }}
                />
              )}
            </div>
          );
        })()}

      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;
        const isClickable = clickable && !step.disabled;
        const isConnectorCompleted = getStepStatus(index) === "completed";
        const textBlock = (
          <motion.div
            className={mergeClassNames(
              resolvedLabelPosition === "right"
                ? "min-w-0 text-left"
                : "w-full px-2 text-center",
              isVertical && "flex-1 pb-6",
              isVertical && isLast && "pb-0",
            )}
            style={isVertical ? { marginTop: "-4px" } : undefined}
            initial={animated ? { opacity: 0, y: 10 } : undefined}
            animate={animated ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: index * 0.1 }}
          >
            <p
              className={mergeClassNames(
                "font-medium transition-colors duration-200",
                config.text,
                status === "current"
                  ? "text-accent"
                  : status === "completed"
                    ? "text-neutral-700 dark:text-neutral-200"
                    : status === "error"
                      ? "text-red-500"
                      : "text-neutral-500 dark:text-neutral-400",
              )}
            >
              {step.title}
              {step.optional && (
                <span className="ml-1 font-normal text-neutral-400 dark:text-neutral-500">
                  (Optional)
                </span>
              )}
            </p>
            {step.description && (
              <p
                className={mergeClassNames(
                  "mt-0.5 text-xs text-neutral-500 dark:text-neutral-400",
                  resolvedLabelPosition === "right" && "text-left",
                )}
              >
                {step.description}
              </p>
            )}
          </motion.div>
        );

        return (
          <>
            <div
              key={step.id}
              className={mergeClassNames(
                "relative z-10 min-w-0",
                isVertical
                  ? "flex gap-4 pb-8"
                  : isHorizontalInline
                    ? "flex items-center gap-3"
                    : "flex flex-1 flex-col items-center text-center",
                !isLast && isVertical && "mb-2",
                isVertical && isLast && "pb-0",
                stepClassName,
              )}
              style={
                !isVertical && !isHorizontalInline
                  ? { flexBasis: 0, flexGrow: 1 }
                  : undefined
              }
            >
              {!isVertical && index > 0 ? (
                <div
                  className={mergeClassNames(
                    "pointer-events-none absolute z-0 rounded-full",
                    getConnectorTrackClassName(variant),
                    connectorClassName,
                  )}
                  style={{
                    top: `${connectorCenterOffsetPx}px`,
                    left: 0,
                    right: "50%",
                    height: config.connectorThickness,
                  }}
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-y-0 right-0 rounded-full bg-accent"
                    style={{
                      left: 0,
                      backgroundColor: colors?.connector || colors?.completed,
                      opacity:
                        status === "completed" || status === "current" ? 1 : 0,
                    }}
                  />
                </div>
              ) : null}

              {!isVertical && !isHorizontalInline && !isLast ? (
                <div
                  className={mergeClassNames(
                    "pointer-events-none absolute z-0 rounded-full",
                    getConnectorTrackClassName(variant),
                    connectorClassName,
                  )}
                  style={{
                    top: `${connectorCenterOffsetPx}px`,
                    left: "50%",
                    right: 0,
                    height: config.connectorThickness,
                  }}
                  aria-hidden="true"
                >
                  {animated ? (
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          status === "completed" || status === "current"
                            ? "100%"
                            : "0%",
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      style={{
                        backgroundColor: colors?.connector || colors?.completed,
                      }}
                    />
                  ) : (
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      style={{
                        width:
                          status === "completed" || status === "current"
                            ? "100%"
                            : "0%",
                        backgroundColor: colors?.connector || colors?.completed,
                      }}
                    />
                  )}
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => handleStepClick(index)}
                disabled={!isClickable}
                className={mergeClassNames(
                  "relative z-10 shrink-0 rounded-full bg-white dark:bg-neutral-900",
                  isClickable ? "cursor-pointer" : "cursor-default",
                  resolvedLabelPosition === "right"
                    ? "flex items-center justify-center"
                    : "flex items-center justify-center",
                )}
                style={{
                  padding: `${indicatorPaddingPx}px`,
                }}
                aria-current={status === "current" ? "step" : undefined}
              >
                <StepIndicator
                  step={step}
                  index={index}
                  status={status}
                  size={size}
                  variant={variant}
                  showNumbers={showNumbers}
                  animated={animated}
                  colors={colors}
                />
              </button>

              {textBlock}

              {isVertical && step.content && status === "current" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full pb-4 pl-14"
                >
                  {step.content}
                </motion.div>
              )}
            </div>

            {isHorizontalInline && showConnector && !isLast ? (
              <div
                className={mergeClassNames(
                  "relative mx-4 min-w-8 flex-1 shrink-0 overflow-hidden rounded-full",
                  getConnectorTrackClassName(variant),
                  connectorClassName,
                )}
                style={{ height: config.connectorThickness }}
                aria-hidden="true"
              >
                {animated ? (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{
                      width: isConnectorCompleted ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{
                      backgroundColor: colors?.connector || colors?.completed,
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                    style={{
                      width: isConnectorCompleted ? "100%" : "0%",
                      backgroundColor: colors?.connector || colors?.completed,
                    }}
                  />
                )}
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

Stepper.displayName = "Stepper";

export default Stepper;
