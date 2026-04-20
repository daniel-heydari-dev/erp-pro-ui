import { forwardRef, useId } from "react";

import type { SwitchProps } from "./types";

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");
const rtlLanguages = /^(ar|fa|ur|he)(-|$)/i;

function resolveDirection(
  direction: string | undefined,
): "ltr" | "rtl" {
  if (direction === "rtl" || direction === "ltr") {
    return direction;
  }

  if (typeof document !== "undefined") {
    const explicitDirection =
      document.documentElement.getAttribute("dir") ?? undefined;

    if (explicitDirection === "rtl" || explicitDirection === "ltr") {
      return explicitDirection;
    }
  }

  if (
    typeof navigator !== "undefined" &&
    rtlLanguages.test(navigator.language)
  ) {
    return "rtl";
  }

  return "ltr";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", label, error, id, checked, dir, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id || `switch-${sanitizeId(generatedId)}`;
    const isRtl = resolveDirection(dir) === "rtl";
    const containerClasses = `flex items-center gap-2 ${className}`
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className={containerClasses} dir={dir}>
        <label
          htmlFor={switchId}
          style={{
            borderRadius: "var(--border-radius-full, 9999px)",
            ...(checked ? {} : { background: "#E0E5F2" }),
          }}
          className={`
            relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus focus-visible:ring-offset-2 focus-visible:ring-offset-ds-surface-1
            disabled:cursor-not-allowed disabled:opacity-50
            ${checked ? "bg-ds-accent" : ""}
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
              bg-ds-surface-1
              shadow-lg
              ring-0
              transition-transform
              duration-300
              ease-in-out
              ${checked
      ? isRtl
        ? "translate-x-1"
        : "translate-x-6"
      : isRtl
        ? "translate-x-6"
        : "translate-x-1"}
            `
              .trim()
              .replace(/\s+/g, " ")}
          />
        </label>
        {label && (
          <label
            htmlFor={switchId}
            className={`cursor-pointer text-sm font-medium leading-none text-ds-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            {label}
          </label>
        )}
        {error && (
          <p className="text-sm font-medium text-destructive mt-1">{error}</p>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";
