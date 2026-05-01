import type { RadioProps, RadioColor } from "./types";
import { forwardRef, useId } from "react";

import { mergeClassNames } from "../../../utils";

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

const colorMap: Record<RadioColor, string> = {
  red: "var(--ds-color-danger)",
  blue: "var(--ds-color-info)",
  green: "var(--ds-color-success)",
  yellow: "var(--ds-color-warning)",
  teal: "var(--ds-brand-teal)",
  primary: "var(--ds-color-accent)",
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className = "",
      label,
      error,
      id,
      color = "primary",
      bgClassName = "",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const radioId = id || `radio-${sanitizeId(generatedId)}`;

    return (
      <div
        className="flex flex-col"
        style={{ "--radio-accent": colorMap[color] } as React.CSSProperties}
      >
        <div className="flex items-center gap-2">
          {/* Custom radio visual — keeps native input for full a11y */}
          <div className="relative h-5 w-5 shrink-0">
            <input
              ref={ref}
              type="radio"
              id={radioId}
              className={mergeClassNames(
                "peer absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed",
                className,
              )}
              {...props}
            />
            {/* Outer ring: surface-1 bg + border when idle, accent fill when checked */}
            <span
              className={mergeClassNames(
                "pointer-events-none absolute inset-0 rounded-full border-2 transition-colors duration-150",
                "border-ds-border-field bg-ds-surface-1",
                "peer-checked:border-(--radio-accent) peer-checked:bg-(--radio-accent)",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
                "peer-focus-visible:ring-[var(--radio-accent)] peer-focus-visible:ring-offset-ds-surface-1",
                "peer-disabled:opacity-50",
                bgClassName,
              )}
            />
            {/* Inner dot: always white, scales in/out with checked state */}
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white transition-transform duration-150 peer-checked:scale-100 peer-disabled:opacity-50" />
          </div>

          {label && (
            <label
              htmlFor={radioId}
              className="cursor-pointer text-sm font-medium leading-none text-ds-1"
            >
              {label}
            </label>
          )}
        </div>

        {error && (
          <p className="ms-7 mt-1 text-sm font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Radio.displayName = "Radio";
