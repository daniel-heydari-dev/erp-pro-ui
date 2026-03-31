import { motion, AnimatePresence } from "framer-motion";

import { CheckIcon, CloseIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";
import type {
  StepperProps,
  StepIndicatorProps,
  StepStatus,
  StepperSize,
  StepperVariant,
} from "./types";

// Size configurations for indicators and icons
const sizeConfig: Record<
  StepperSize,
  { indicator: string; icon: string; text: string; connectorThickness: string }
> = {
  sm: {
    indicator: "w-8 h-8",
    icon: "w-4 h-4",
    text: "text-xs",
    connectorThickness: "2px",
  },
  md: {
    indicator: "w-10 h-10",
    icon: "w-5 h-5",
    text: "text-sm",
    connectorThickness: "2px",
  },
  lg: {
    indicator: "w-12 h-12",
    icon: "w-6 h-6",
    text: "text-base",
    connectorThickness: "4px",
  },
};

// Variant styles for the indicator
const getVariantStyles = (variant: StepperVariant, status: StepStatus) => {
  const baseStyles = {
    default: {
      completed: "bg-primary text-white shadow-md shadow-primary/30",
      current:
        "bg-primary text-white ring-4 ring-primary/30 shadow-lg shadow-primary/40",
      upcoming:
        "bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400",
      error: "bg-red-500 text-white ring-4 ring-red-500/30",
    },
    glass: {
      completed:
        "bg-primary/80 text-white backdrop-blur-xl border border-primary/30 shadow-lg shadow-primary/20",
      current:
        "bg-primary/90 text-white backdrop-blur-xl border-2 border-primary ring-4 ring-primary/20 shadow-xl shadow-primary/30",
      upcoming:
        "bg-white/60 text-neutral-500 backdrop-blur-xl border border-white/40 dark:bg-neutral-800/60 dark:text-neutral-400 dark:border-white/10",
      error:
        "bg-red-500/80 text-white backdrop-blur-xl border border-red-400/30 ring-4 ring-red-500/20",
    },
    minimal: {
      completed: "bg-primary/10 text-primary dark:bg-primary/20",
      current: "bg-primary text-white shadow-sm",
      upcoming:
        "bg-transparent text-neutral-400 border-2 border-neutral-300 dark:border-neutral-600",
      error: "bg-red-100 text-red-500 dark:bg-red-900/30",
    },
    outlined: {
      completed: "bg-transparent text-primary border-2 border-primary",
      current: "bg-primary text-white border-2 border-primary shadow-lg",
      upcoming:
        "bg-transparent text-neutral-400 border-2 border-neutral-300 dark:border-neutral-600",
      error: "bg-transparent text-red-500 border-2 border-red-500",
    },
  };

  return baseStyles[variant][status];
};

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
  const config = sizeConfig[size];

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
        isVertical ? "flex flex-col" : "flex items-start justify-between",
        className,
      )}
    >
      {/* Global Background Continuous Connector */}
      {showConnector &&
        (() => {
          const paddingValue =
            variant === "glass" ||
            variant === "outlined" ||
            variant === "minimal"
              ? 4
              : 2;
          return (
            <div
              className={mergeClassNames(
                "absolute rounded-full",
                variant === "glass"
                  ? "bg-white/30 dark:bg-white/10 backdrop-blur-sm"
                  : "bg-neutral-200 dark:bg-neutral-700",
                connectorClassName,
              )}
              style={{
                ...(isVertical
                  ? {
                      // Vertical background line
                      top: "0",
                      bottom: "0",
                      left: `calc(${paddingValue}px + 1px + ${config.indicator.split(" ")[0].replace("w-", "")} * 0.125rem - ${config.connectorThickness} / 2)`,
                      width: config.connectorThickness,
                    }
                  : {
                      // Horizontal background line
                      left: "0",
                      right: "0",
                      top: `calc(${paddingValue}px + 1px + ${config.indicator.split(" ")[1].replace("h-", "")} * 0.125rem - ${config.connectorThickness} / 2)`,
                      height: config.connectorThickness,
                    }),
              }}
            >
              {/* Animated fill connector */}
              {animated ? (
                <motion.div
                  className="absolute top-0 left-0 bg-primary rounded-full"
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
                  className="absolute top-0 left-0 bg-primary rounded-full"
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
        const isClickable = clickable && !step.disabled; // Keep steps clickable unconditionally for navigation
        const paddingValue =
          variant === "glass" || variant === "outlined" || variant === "minimal"
            ? 4
            : 2;

        return (
          <div
            key={step.id}
            className={mergeClassNames(
              "relative z-10",
              isVertical
                ? "flex gap-4 pb-8" // spacing between vertical elements
                : "flex flex-1 flex-col items-center",
              !isLast && isVertical && "mb-2",
              isVertical && isLast && "pb-0",
              stepClassName,
            )}
            style={{
              // Ensure perfect horizontal distribution
              ...(!isVertical
                ? {
                    flexBasis: 0,
                    flexGrow: 1,
                    // Keep first item aligned left, last aligned right, others centered
                    alignItems:
                      index === 0
                        ? "flex-start"
                        : isLast
                          ? "flex-end"
                          : "center",
                  }
                : {}),
            }}
          >
            {/* Step Indicator */}
            <button
              type="button"
              onClick={() => handleStepClick(index)}
              disabled={!isClickable}
              className={mergeClassNames(
                "relative z-10 flex-shrink-0 flex items-center justify-center bg-white dark:bg-neutral-900 rounded-full", // Mask background line
                isClickable ? "cursor-pointer" : "cursor-default",
                // Horizontal offset logic for end items to align with text
                !isVertical && index === 0 && "mx-0",
                !isVertical && isLast && "mx-0",
              )}
              style={{
                // Adjust the background masking size depending on variant so the line doesn't peek through the edges
                padding: `${paddingValue}px`,
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

            {/* Step text content */}
            <motion.div
              className={mergeClassNames(
                "mt-2",
                isVertical ? "flex-1 pb-6" : "text-center px-2",
                !isVertical && index === 0 && "text-left px-0",
                !isVertical && isLast && "text-right px-0",
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
                    ? "text-primary dark:text-primary-400"
                    : status === "completed"
                      ? "text-neutral-700 dark:text-neutral-200"
                      : status === "error"
                        ? "text-red-500"
                        : "text-neutral-500 dark:text-neutral-400",
                )}
              >
                {step.title}
                {step.optional && (
                  <span className="ml-1 text-neutral-400 dark:text-neutral-500 font-normal">
                    (Optional)
                  </span>
                )}
              </p>
              {step.description && (
                <p
                  className={mergeClassNames(
                    "mt-0.5 text-neutral-500 dark:text-neutral-400",
                    size === "sm" ? "text-xs" : "text-xs",
                  )}
                >
                  {step.description}
                </p>
              )}
            </motion.div>

            {/* Step content (for vertical with content) */}
            {isVertical && step.content && status === "current" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pl-14 pb-4 w-full"
              >
                {step.content}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

Stepper.displayName = "Stepper";

export default Stepper;
