import { forwardRef, useId } from "react";

import type { SwitchProps } from "./types";

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", label, error, id, checked, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id || `switch-${sanitizeId(generatedId)}`;
    const containerClasses = `flex items-center space-x-2 ${className}`
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className={containerClasses}>
        <label
          htmlFor={switchId}
          className={`
            relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
            disabled:cursor-not-allowed disabled:opacity-50
            ${checked ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-600"}
          `
            .trim()
            .replace(/\s+/g, " ")}
        >
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            className="sr-only"
            checked={checked}
            {...props}
          />
          <span
            className={`
              pointer-events-none
              inline-block
              h-4
              w-4
              transform
              rounded-full
              bg-white
              shadow-lg
              ring-0
              transition-transform
              duration-300
              ease-in-out
              ${checked ? "translate-x-6" : "translate-x-1"}
            `
              .trim()
              .replace(/\s+/g, " ")}
          />
        </label>
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {label}
          </label>
        )}
        {error && (
          <p className="text-sm font-medium text-destructive mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
