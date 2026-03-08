import type { RadioProps, RadioColor } from "./types";
import { forwardRef, useId } from "react";

import { mergeClassNames } from "../../../utils";

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

const colorValues: Record<RadioColor, string> = {
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  yellow: "#eab308",
  teal: "#14b8a6",
  primary: "var(--color-primary)",
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className = "",
      label,
      error,
      id,
      color = "blue",
      bgClassName = "",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const radioId = id || `radio-${sanitizeId(generatedId)}`;

    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          style={{ accentColor: colorValues[color] }}
          className={mergeClassNames(
            "h-5 w-5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
            bgClassName,
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm font-medium leading-none cursor-pointer text-neutral-900 dark:text-white"
          >
            {label}
          </label>
        )}
        {error && (
          <p className="text-sm font-medium text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
