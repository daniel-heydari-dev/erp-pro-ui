import type { SelectProps } from "./types";
import { forwardRef, useState, useRef, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { CheckIcon, ChevronDownIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = "",
      containerClassName = "",
      triggerClassName = "",
      label,
      error,
      helperText,
      options,
      value,
      onChange,
      placeholder = "Select...",
      disabled,
      bgClassName = "bg-background-secondary",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const radius = 100;

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

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };

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
      <div className={mergeClassNames("w-full min-w-48", containerClassName)}>
        {label && (
          <label className="mb-2 block text-sm leading-none font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
          <motion.div
            style={{
              backgroundImage: disabled
                ? "none"
                : useMotionTemplate`
                    radial-gradient(
                      ${
                        visible ? `${radius}px` : "0px"
                      } circle at ${mouseX}px ${mouseY}px,
                      var(--ds-color-accent),
                      transparent 90%
                    )
                  `,
            }}
            onMouseMove={!disabled ? handleMouseMove : undefined}
            onMouseEnter={!disabled ? () => setVisible(true) : undefined}
            onMouseLeave={!disabled ? () => setVisible(false) : undefined}
            className={mergeClassNames(
              "group/select rounded-lg p-[2px] transition duration-300 hover:border-accent",
              disabled
                ? "bg-muted border-none"
                : error
                  ? "border-destructive"
                  : "border-border",
            )}
          >
            <div
              className={mergeClassNames(
                "shadow-input flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input px-3 py-2 text-sm transition duration-400 ease-in-out group-hover/select:shadow-none",
                bgClassName,
                disabled ? "cursor-not-allowed opacity-50" : "text-foreground",
                error &&
                  "border-destructive text-destructive focus-visible:ring-destructive",
                triggerClassName,
              )}
              onClick={() => {
                if (!disabled) {
                  setOpen((o) => !o);
                }
              }}
              onKeyDown={(event) => {
                if (disabled) {
                  return;
                }

                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setOpen((current) => !current);
                }

                if (event.key === "Escape") {
                  setOpen(false);
                }
              }}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              {selectedOption ? (
                <span className="flex-1 truncate text-foreground">
                  {selectedOption.label}
                </span>
              ) : (
                <span className="flex-1 text-muted-foreground">
                  {placeholder}
                </span>
              )}
              <span
                className={mergeClassNames(
                  "ml-2 text-muted-foreground transition-transform duration-300",
                  open ? "rotate-180" : "rotate-0",
                )}
              >
                <ChevronDownIcon
                  width={24}
                  height={24}
                  color="currentColor"
                  className="h-5 w-5"
                />
              </span>
            </div>
          </motion.div>

          {open && !disabled && (
            <div
              className={mergeClassNames(
                "absolute right-0 left-0 z-20 mt-1 flex max-h-60 flex-col overflow-auto rounded-lg border border-border bg-background-secondary shadow-3 backdrop-blur-xl transition",
              )}
            >
              {options.length === 0 && (
                <div className="px-3 py-2 text-muted-foreground">
                  No options
                </div>
              )}
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className={mergeClassNames(
                    "mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition",
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
          <p className="mt-1 text-sm font-medium text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
