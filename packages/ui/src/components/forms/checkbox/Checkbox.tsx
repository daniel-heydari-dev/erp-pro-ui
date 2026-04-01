import type { CheckboxProps } from "./types";
import { forwardRef, useId } from "react";

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

const colorClasses: Record<NonNullable<CheckboxProps["color"]>, string> = {
  red: "checked:bg-[var(--ds-color-danger)]",
  blue: "checked:bg-[var(--ds-color-info)]",
  green: "checked:bg-[var(--ds-color-success)]",
  yellow: "checked:bg-[var(--ds-color-warning)]",
  teal: "checked:bg-[var(--ds-brand-teal)]",
  primary: "checked:bg-accent",
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className = "",
      label,
      error,
      id,
      extra = "",
      color = "primary",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id || `checkbox-${sanitizeId(generatedId)}`;

    // Custom CheckIcon SVG (stroke-based design)
    const checkmarkIcon = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M5 13l4 4L19 7'/%3e%3c/svg%3e")`;

    // Check if color is a predefined color name or a custom value
    const isPredefinedColor = color in colorClasses;
    const customColorStyle = !isPredefinedColor ? color : undefined;

    return (
      <>
        <style>{`
          .checkbox-custom-${checkboxId}:checked {
            background-image: ${checkmarkIcon};
            background-size: 70%;
            background-position: center;
            background-repeat: no-repeat;
            ${customColorStyle ? `background-color: ${customColorStyle} !important;` : ""}
          }
        `}</style>
        <div className="flex items-center space-x-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={`checkbox-custom-${checkboxId} peer relative flex h-5 min-h-[20px] w-5 min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-300 transition duration-200 outline-none checked:border-none checked:text-white hover:cursor-pointer dark:border-white/30 ${
              isPredefinedColor
                ? colorClasses[color as keyof typeof colorClasses]
                : ""
            } ${error ? "border-destructive" : ""} ${extra} ${className}`}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {label}
            </label>
          )}
          {error && (
            <p className="text-sm font-medium text-destructive mt-1">{error}</p>
          )}
        </div>
      </>
    );
  },
);

Checkbox.displayName = "Checkbox";
