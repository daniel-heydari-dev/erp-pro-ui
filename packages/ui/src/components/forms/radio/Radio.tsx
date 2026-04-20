import type { RadioProps, RadioColor } from "./types";
import { forwardRef, useId } from "react";

import { mergeClassNames } from "../../../utils";

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

const colorValues: Record<RadioColor, string> = {
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
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          style={{ accentColor: colorValues[color] }}
          className={mergeClassNames(
            "h-5 w-5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
            bgClassName,
            className,
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm font-medium leading-none cursor-pointer text-ds-1"
          >
            {label}
          </label>
        )}
        {error && (
          <p className="mt-1 text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

Radio.displayName = "Radio";
