import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "../../forms/button";
import { CheckIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";
import type {
  StepperWizardIndicatorRenderProps,
  StepperWizardIndicatorStatus,
  StepperWizardProps,
  StepperWizardStepProps,
} from "./types";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function clampStep(step: number, totalSteps: number): number {
  return Math.min(Math.max(step, 0), totalSteps);
}

function getIndicatorStatus(
  stepIndex: number,
  currentStep: number,
): StepperWizardIndicatorStatus {
  if (stepIndex === currentStep) {
    return "active";
  }

  if (stepIndex < currentStep) {
    return "complete";
  }

  return "inactive";
}

export function StepperWizard({
  children,
  initialStep = 0,
  currentStep: controlledStep,
  onStepChange,
  onFinalStepCompleted,
  stepCircleContainerClassName,
  stepContainerClassName,
  contentClassName,
  footerClassName,
  backButtonProps,
  nextButtonProps,
  backButtonText = "Back",
  nextButtonText = "Continue",
  completeButtonText = "Complete",
  disableStepIndicators = false,
  renderStepIndicator,
  className,
}: StepperWizardProps) {
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const [internalStep, setInternalStep] = useState(() =>
    clampStep(initialStep, totalSteps),
  );
  const [direction, setDirection] = useState(0);

  const currentStep = clampStep(controlledStep ?? internalStep, totalSteps);
  const isCompleted = currentStep >= totalSteps;
  const isLastStep = totalSteps > 0 && currentStep === totalSteps - 1;

  const commitStep = useCallback(
    (nextStep: number) => {
      const clampedStep = clampStep(nextStep, totalSteps);

      if (controlledStep === undefined) {
        setInternalStep(clampedStep);
      }

      if (clampedStep >= totalSteps) {
        onFinalStepCompleted?.();
        return;
      }

      onStepChange?.(clampedStep);
    },
    [controlledStep, onFinalStepCompleted, onStepChange, totalSteps],
  );

  if (totalSteps === 0) {
    return null;
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      commitStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      commitStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    commitStep(totalSteps);
  };

  const navigateToStep = (stepIndex: number) => {
    if (stepIndex === currentStep || disableStepIndicators) {
      return;
    }

    setDirection(stepIndex > currentStep ? 1 : -1);
    commitStep(stepIndex);
  };

  return (
    <div
      className={mergeClassNames(
        "flex min-h-full w-full flex-1 items-center justify-center p-4",
        className,
      )}
    >
      <div
        className={mergeClassNames(
          "mx-auto w-full max-w-3xl rounded-3xl border border-ds-border-2 bg-ds-canvas shadow-2",
          stepCircleContainerClassName,
        )}
      >
        <div
          className={mergeClassNames(
            "flex w-full items-center gap-3 border-b border-ds-border-2 px-6 py-6 sm:px-8",
            stepContainerClassName,
          )}
        >
          {stepsArray.map((_, index) => {
            const status = getIndicatorStatus(index, currentStep);
            const isClickable = !disableStepIndicators && index !== currentStep;
            const indicatorProps: StepperWizardIndicatorRenderProps = {
              stepIndex: index,
              stepNumber: index + 1,
              currentStep,
              status,
              isClickable,
              onStepClick: navigateToStep,
            };

            return (
              <div
                key={`wizard-step-${index + 1}`}
                className="flex flex-1 items-center"
              >
                {renderStepIndicator ? (
                  renderStepIndicator(indicatorProps)
                ) : (
                  <WizardStepIndicator {...indicatorProps} />
                )}
                {index < totalSteps - 1 ? (
                  <WizardStepConnector isComplete={currentStep > index} />
                ) : null}
              </div>
            );
          })}
        </div>

        <WizardStepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={mergeClassNames("px-6 py-6 sm:px-8", contentClassName)}
        >
          {stepsArray[currentStep]}
        </WizardStepContentWrapper>

        {!isCompleted ? (
          <div
            className={mergeClassNames(
              "px-6 pb-6 sm:px-8 sm:pb-8",
              footerClassName,
            )}
          >
            <div
              className={mergeClassNames(
                "mt-6 flex gap-3",
                currentStep > 0 ? "justify-between" : "justify-end",
              )}
            >
              {currentStep > 0 ? (
                <Button
                  onClick={handleBack}
                  className="rounded-md border-transparent bg-transparent px-3 py-2 text-sm font-medium text-ds-2 shadow-none hover:bg-ds-surface-1 hover:text-ds-1"
                  {...backButtonProps}
                >
                  {backButtonText}
                </Button>
              ) : null}
              <Button
                onClick={isLastStep ? handleComplete : handleNext}
                primary
                className="rounded-full px-4 py-2 text-sm font-semibold shadow-2"
                {...nextButtonProps}
              >
                {isLastStep ? completeButtonText : nextButtonText}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface WizardStepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: React.ReactNode;
  className?: string;
}

function WizardStepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}: WizardStepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState(0);
  const handleHeightReady = useCallback((height: number) => {
    setParentHeight(height);
  }, []);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {!isCompleted ? (
          <WizardSlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={handleHeightReady}
          >
            {children}
          </WizardSlideTransition>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

interface WizardSlideTransitionProps {
  children: React.ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function WizardSlideTransition({
  children,
  direction,
  onHeightReady,
}: WizardSlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={wizardStepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ position: "absolute", inset: 0 }}
    >
      {children}
    </motion.div>
  );
}

const wizardStepVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? "40%" : "-40%",
    opacity: 0,
  }),
};

export function StepperWizardStep({
  children,
  className,
}: StepperWizardStepProps) {
  return (
    <div className={mergeClassNames("space-y-4", className)}>{children}</div>
  );
}

function WizardStepIndicator({
  stepIndex,
  stepNumber,
  status,
  isClickable,
  onStepClick,
}: StepperWizardIndicatorRenderProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onStepClick(stepIndex)}
      className={mergeClassNames(
        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-surface-1",
        isClickable ? "cursor-pointer" : "cursor-default",
      )}
      animate={status}
      initial={false}
      disabled={!isClickable}
      aria-current={status === "active" ? "step" : undefined}
    >
      <motion.span
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: "var(--ds-color-bg-surface)",
            borderColor: "var(--ds-color-border)",
            color: "var(--ds-color-fg-muted)",
          },
          active: {
            scale: 1,
            backgroundColor: "var(--ds-color-accent)",
            borderColor: "var(--ds-color-accent)",
            color: "var(--ds-color-fg-on-accent)",
          },
          complete: {
            scale: 1,
            backgroundColor: "var(--ds-color-accent)",
            borderColor: "var(--ds-color-accent)",
            color: "var(--ds-color-fg-on-accent)",
          },
        }}
        transition={{ duration: 0.25 }}
        className="flex h-full w-full items-center justify-center rounded-full"
      >
        {status === "complete" ? (
          <AnimatedWizardCheckIcon className="h-4 w-4" />
        ) : status === "active" ? (
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
        ) : (
          <span>{stepNumber}</span>
        )}
      </motion.span>
    </motion.button>
  );
}

function WizardStepConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-ds-accent"
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        variants={{
          incomplete: { width: 0 },
          complete: { width: "100%" },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

function AnimatedWizardCheckIcon({ className }: { className?: string }) {
  return (
    <span
      className={mergeClassNames("flex items-center justify-center", className)}
    >
      <CheckIcon className="h-full w-full" aria-hidden="true" />
    </span>
  );
}

export default StepperWizard;
