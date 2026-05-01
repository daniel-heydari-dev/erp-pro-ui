import { forwardRef, useId } from "react";

import type { SwitchProps } from "./types";

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

function getEffectiveDir(dir: string | undefined): "ltr" | "rtl" {
  if (dir === "rtl" || dir === "ltr") return dir;
  if (typeof document !== "undefined") {
    if (document.documentElement.getAttribute("dir") === "rtl") return "rtl";
  }
  return "ltr";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", label, error, id, checked, dir, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id || `switch-${sanitizeId(generatedId)}`;
    const isRtl = getEffectiveDir(dir) === "rtl";

    const thumbClass = checked
      ? isRtl
        ? "translate-x-1"
        : "translate-x-6"
      : isRtl
        ? "translate-x-6"
        : "translate-x-1";

    return (
      <div
        className={`flex items-center gap-2 ${className}`.trim().replace(/\s+/g, " ")}
        dir={dir}
      >
        <label
          htmlFor={switchId}
          dir="ltr"
          className={`
            relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus focus-visible:ring-offset-2 focus-visible:ring-offset-ds-surface-1
            disabled:cursor-not-allowed disabled:opacity-50
            ${checked ? "bg-ds-accent" : "bg-ds-surface-5 ring-1 ring-ds-border-field"}
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
            className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-md ring-1 ring-ds-border-field transition-all duration-300 ease-in-out ${thumbClass}`}
          />
        </label>
        {label && (
          <label
            htmlFor={switchId}
            className="cursor-pointer text-sm font-medium leading-none text-ds-1 text-start peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
