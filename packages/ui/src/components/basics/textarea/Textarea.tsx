import type { TextareaProps } from "./types";
import { forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, helperText, ...props }, ref) => {
    const textareaClasses = `
      flex
      min-h-[80px]
      w-full
      rounded-md
      border
      border-neutral-300
      dark:border-neutral-600
      bg-white
      dark:bg-neutral-700
      px-3
      py-2
      text-sm
      text-neutral-900
      dark:text-white
      transition-all
      duration-200
      placeholder:text-neutral-500
      dark:placeholder:text-neutral-400
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-primary
      disabled:cursor-not-allowed
      disabled:opacity-50
      resize-none
      ${error ? "border-red-500 focus-visible:ring-red-500" : ""}
      ${className}
    `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
            {label}
          </label>
        )}
        <textarea ref={ref} className={textareaClasses} {...props} />
        {error && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400 mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
