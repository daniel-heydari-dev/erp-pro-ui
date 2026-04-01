import type { SelectProps } from "./types";
import { forwardRef, useState, useRef, useEffect } from "react";
import { CheckIcon, ChevronDownIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      options,
      value,
      onChange,
      placeholder = "Select...",
      disabled,
      bgClassName = "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement>(null);

    // Combine refs
    useEffect(() => {
      if (ref && typeof ref === "function") {
        ref(hiddenSelectRef.current);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLSelectElement | null>).current =
          hiddenSelectRef.current;
      }
    }, [ref]);

    // Close dropdown on outside click
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener("mousedown", handleClick);
      }
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optValue: string) => {
      // Trigger onChange with a synthetic event
      if (onChange && hiddenSelectRef.current) {
        const event = {
          target: { value: optValue, name: props.name },
          currentTarget: { value: optValue, name: props.name },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }
      setOpen(false);
    };

    return (
      <div className="w-full min-w-48">
        {label && (
          <label className="text-sm font-medium text-neutral-900 dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
            {label}
          </label>
        )}

        {/* Hidden native select for form compatibility */}
        <select
          ref={hiddenSelectRef}
          className="sr-only"
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom styled dropdown */}
        <div
          ref={containerRef}
          className={mergeClassNames("relative w-full", className)}
        >
          <div
            className={mergeClassNames(
              "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm text-neutral-900 dark:text-white transition shadow-sm",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-300 dark:border-neutral-600",
              disabled
                ? "cursor-not-allowed opacity-50"
                : `${bgClassName} hover:bg-white/60 dark:hover:bg-white/10`,
            )}
            onClick={() => {
              if (!disabled) {
                setOpen((o) => !o);
              }
            }}
          >
            {selectedOption ? (
              <span className="text-neutral-900 dark:text-white flex-1 truncate">
                {selectedOption.label}
              </span>
            ) : (
              <span className="text-neutral-500 dark:text-neutral-400 flex-1">
                {placeholder}
              </span>
            )}
            <span
              className={mergeClassNames(
                "ml-2 transition-transform duration-300",
                open ? "rotate-180" : "rotate-0",
              )}
            >
              <ChevronDownIcon width={24} height={24} color="#a1a1a1" />
            </span>
          </div>

          {open && !disabled && (
            <div
              className={mergeClassNames(
                "absolute right-0 left-0 z-20 mt-1 flex max-h-60 flex-col rounded-md border border-neutral-200 dark:border-neutral-600 shadow-xl transition overflow-auto",
                bgClassName,
              )}
            >
              {options.length === 0 && (
                <div className="px-3 py-2 text-neutral-500 dark:text-neutral-400">
                  No options
                </div>
              )}
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className={mergeClassNames(
                    "mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-900 dark:text-white transition",
                    opt.value === value
                      ? "bg-accent-subtle text-accent font-semibold"
                      : "",
                    "hover:bg-accent hover:text-on-accent",
                  )}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className="flex w-5 items-center justify-center">
                    {opt.value === value && (
                      <CheckIcon
                        className="text-accent"
                        width={18}
                        height={18}
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{opt.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

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
  },
);

Select.displayName = "Select";
