import { useSyncExternalStore } from "react";

import { Button } from "../../forms/button";
import { AlertTriangleIcon, CheckIcon } from "../../icons";
import { TruncatedText } from "../../typography/truncated-text";
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
        "border-ds-border-accent bg-ds-accent/12 text-ds-1 shadow-sm shadow-ds-accent/10",
      connectorClassName: "bg-ds-accent",
      badgeClassName: "border-ds-border-accent bg-ds-accent text-ds-on-accent",
    };
  }

  if (state === "valid") {
    return {
      buttonClassName:
        "border-ds-state-success-border bg-ds-state-success-surface text-ds-state-success-text shadow-sm",
      connectorClassName: "bg-ds-state-success",
      badgeClassName:
        "border-ds-state-success-border bg-ds-state-success text-ds-on-accent",
    };
  }

  if (state === "invalid") {
    return {
      buttonClassName:
        "border-ds-state-error-border bg-ds-state-error-surface text-ds-state-error-text",
      connectorClassName: "bg-ds-state-danger",
      badgeClassName:
        "border-ds-state-error-border bg-ds-state-danger text-ds-on-accent",
    };
  }

  return {
    buttonClassName:
      "border-ds-border-2 bg-ds-surface-1 text-ds-2 hover:border-ds-border-1 hover:bg-ds-canvas",
    connectorClassName: "bg-ds-border-3/70",
    badgeClassName: "border-ds-border-2 bg-ds-canvas text-ds-2",
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
      <span className="flex min-w-0 items-center gap-2">
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
        <TruncatedText as="span" showTitleOnHover className="flex-1">
          {label}
        </TruncatedText>
      </span>
    );
  }

  if (state === "invalid") {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <AlertTriangleIcon className="h-5 w-5" aria-hidden="true" />
        <TruncatedText as="span" showTitleOnHover className="flex-1">
          {label}
        </TruncatedText>
      </span>
    );
  }

  if (icon) {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <span className="shrink-0">{icon}</span>
        <TruncatedText as="span" showTitleOnHover className="flex-1">
          {label}
        </TruncatedText>
      </span>
    );
  }

  return (
    <span className="flex min-w-0 items-center gap-2">
      <span
        className={mergeClassNames(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
          badgeClassName,
        )}
        aria-hidden="true"
      >
        {stepNumber}
      </span>
      <TruncatedText as="span" showTitleOnHover className="flex-1">
        {label}
      </TruncatedText>
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
                "relative z-10 flex min-h-11 items-center justify-center rounded-md border px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-surface-1 disabled:cursor-default disabled:opacity-100",
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
