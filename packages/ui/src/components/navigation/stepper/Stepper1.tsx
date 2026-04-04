import { useSyncExternalStore } from "react";

import { Button } from "../../forms/button";
import { AlertTriangleIcon, CheckIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";
import type { StepperStepsProps, StepperStepsState } from "./types";

const DEFAULT_BREAKPOINT = 1080;

function subscribeToMediaQuery(
  query: string,
  onStoreChange: () => void,
): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getMediaQuerySnapshot(query: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(query).matches;
}

function getStepColors(
  state: StepperStepsState,
  isActive: boolean,
): {
  buttonClassName: string;
  connectorClassName: string;
  badgeClassName: string;
} {
  if (isActive) {
    return {
      buttonClassName:
        "border-accent bg-accent/12 text-accent shadow-sm shadow-accent/10",
      connectorClassName: "bg-accent",
      badgeClassName: "border-accent bg-accent text-on-accent",
    };
  }

  if (state === "valid") {
    return {
      buttonClassName:
        "border-success bg-success/10 text-success shadow-sm shadow-success/10",
      connectorClassName: "bg-success",
      badgeClassName: "border-success bg-success text-on-accent",
    };
  }

  if (state === "invalid") {
    return {
      buttonClassName:
        "border-red-500 bg-red-500/10 text-red-600 dark:text-red-300",
      connectorClassName: "bg-red-500",
      badgeClassName: "border-red-500 bg-red-500 text-white",
    };
  }

  return {
    buttonClassName:
      "border-border bg-surface text-muted-foreground hover:border-border-strong hover:bg-canvas",
    connectorClassName: "bg-border-strong/70",
    badgeClassName: "border-border bg-background text-muted-foreground",
  };
}

function renderStepContent(
  label: string,
  icon: StepperStepsProps["steps"][number]["icon"],
  state: StepperStepsState,
  stepNumber: number,
  badgeClassName: string,
) {
  if (state === "valid") {
    return (
      <span className="flex items-center gap-2">
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
        <span className="truncate">{label}</span>
      </span>
    );
  }

  if (state === "invalid") {
    return (
      <span className="flex items-center gap-2">
        <AlertTriangleIcon className="h-5 w-5" aria-hidden="true" />
        <span className="truncate">{label}</span>
      </span>
    );
  }

  if (icon) {
    return (
      <span className="flex items-center gap-2">
        <span className="shrink-0">{icon}</span>
        <span className="truncate">{label}</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <span
        className={mergeClassNames(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
          badgeClassName,
        )}
        aria-hidden="true"
      >
        {stepNumber}
      </span>
      <span className="truncate">{label}</span>
    </span>
  );
}

export function StepperSteps({
  steps,
  currentStep,
  onStepClick,
  stepStates = [],
  orientation = "responsive",
  responsiveBreakpoint = DEFAULT_BREAKPOINT,
  className,
  stepClassName,
  connectorClassName,
}: StepperStepsProps) {
  const responsiveQuery = `(max-width: ${responsiveBreakpoint}px)`;
  const isCompact = useSyncExternalStore(
    (onStoreChange) => {
      if (orientation !== "responsive") {
        return () => undefined;
      }

      return subscribeToMediaQuery(responsiveQuery, onStoreChange);
    },
    () =>
      orientation === "responsive"
        ? getMediaQuerySnapshot(responsiveQuery)
        : false,
    () => false,
  );

  const isVertical =
    orientation === "vertical" || (orientation === "responsive" && isCompact);

  return (
    <div
      className={mergeClassNames(
        isVertical
          ? "flex w-full flex-col items-start"
          : "flex w-full items-center",
        className,
      )}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const state = stepStates[index] ?? "untouched";
        const isActive = index === currentStep;
        const isClickable = typeof onStepClick === "function" && !isActive;
        const colors = getStepColors(state, isActive);

        return (
          <div
            key={`${step.label}-${stepNumber}`}
            className={mergeClassNames(
              isVertical ? "w-full" : "flex min-w-0 flex-1 items-center",
            )}
          >
            <Button
              disabled={!isClickable}
              onClick={() => onStepClick?.(index)}
              className={mergeClassNames(
                "relative z-10 flex min-h-11 items-center justify-center rounded-md border px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default disabled:opacity-100",
                isVertical ? "w-full" : "w-full min-w-0",
                colors.buttonClassName,
                stepClassName,
              )}
              aria-current={isActive ? "step" : undefined}
              aria-invalid={state === "invalid" ? true : undefined}
            >
              {renderStepContent(
                step.label,
                step.icon,
                state,
                stepNumber,
                colors.badgeClassName,
              )}
            </Button>

            {index < steps.length - 1 ? (
              isVertical ? (
                <div
                  className={mergeClassNames(
                    "mx-auto my-2 h-8 w-px rounded-full",
                    colors.connectorClassName,
                    connectorClassName,
                  )}
                  aria-hidden="true"
                />
              ) : (
                <div
                  className={mergeClassNames(
                    "mx-3 h-px min-w-6 flex-1 rounded-full",
                    colors.connectorClassName,
                    connectorClassName,
                  )}
                  aria-hidden="true"
                />
              )
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default StepperSteps;
