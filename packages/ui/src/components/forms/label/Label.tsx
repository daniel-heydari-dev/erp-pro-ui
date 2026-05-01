import type { LabelProps } from "./types";
import { forwardRef } from "react";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`
          text-sm
          font-medium
          leading-none
          peer-disabled:cursor-not-allowed
          peer-disabled:opacity-70
          ${className}
        `
          .trim()
          .replace(/\s+/g, " ")}
        {...props}
      >
        {children}
        {required && <span className="text-destructive ms-1">*</span>}
      </label>
    );
  },
);

Label.displayName = "Label";
