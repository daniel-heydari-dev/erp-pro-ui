import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { CheckIcon, ChevronDownIcon } from "../../icons";
import { TruncatedText } from "../../typography/truncated-text";
import { mergeClassNames } from "../../../utils";
import type { SelectProps } from "./types";

export const Select = forwardRef(function SelectComponent(
  {
    className = "",
    containerClassName = "",
    triggerClassName = "",
    dropdownClassName = "",
    optionClassName = "",
    label,
    error,
    helperText,
    options,
    value,
    onChange,
    placeholder = "Select...",
    disabled,
    bgClassName = "bg-background-secondary",
    size = "default",
    selectionIndicator = "check",
    ...props
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenSelectRef = useRef<HTMLSelectElement>(null);
  const selectedOptionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = 100;
  const isCompact = size === "compact";
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (typeof ref === "function") {
      ref(hiddenSelectRef.current);
      return;
    }

    if (ref) {
      ref.current = hiddenSelectRef.current;
    }
  }, [ref]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !selectedOptionRef.current) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      selectedOptionRef.current?.scrollIntoView({ block: "nearest" });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [open, value]);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  const handleSelect = (optionValue: string) => {
    if (onChange && hiddenSelectRef.current) {
      const syntheticEvent = {
        target: { value: optionValue, name: props.name },
        currentTarget: { value: optionValue, name: props.name },
      } as ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }

    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
  };

  return (
    <div
      className={mergeClassNames(
        "w-full",
        isCompact ? "min-w-0" : "min-w-48",
        containerClassName,
      )}
    >
      {label ? (
        <label className="mb-2 block text-sm leading-none font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      ) : null}

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
                    ${visible ? `${radius}px` : "0px"} circle at ${mouseX}px ${mouseY}px,
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
              ? "border-none bg-muted"
              : error
                ? "border-destructive"
                : "border-border",
          )}
        >
          <div
            className={mergeClassNames(
              "flex w-full cursor-pointer items-center justify-between rounded-md border border-input transition duration-400 ease-in-out",
              isCompact ? "h-9 px-2.5 py-2 text-sm" : "h-10 px-3 py-2 text-sm",
              bgClassName,
              disabled ? "cursor-not-allowed opacity-50" : "text-foreground",
              error
                ? "border-destructive text-destructive focus-visible:ring-destructive"
                : "",
              triggerClassName,
            )}
            onClick={() => {
              if (!disabled) {
                setOpen((current) => !current);
              }
            }}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            {selectedOption ? (
              <TruncatedText
                as="span"
                showTitleOnHover
                className="flex-1 text-foreground"
              >
                {selectedOption.label}
              </TruncatedText>
            ) : (
              <TruncatedText as="span" className="flex-1 text-muted-foreground">
                {placeholder}
              </TruncatedText>
            )}

            <span
              className={mergeClassNames(
                "ml-2 shrink-0 text-muted-foreground transition-transform duration-300",
                open ? "rotate-180" : "rotate-0",
              )}
            >
              <ChevronDownIcon
                width={24}
                height={24}
                color="currentColor"
                className={isCompact ? "h-4 w-4" : "h-5 w-5"}
              />
            </span>
          </div>
        </motion.div>

        {open && !disabled ? (
          <div
            className={mergeClassNames(
              "absolute right-0 left-0 z-20 mt-1 flex flex-col overflow-auto rounded-lg border border-border bg-background-secondary shadow-3 backdrop-blur-xl transition",
              isCompact ? "max-h-56" : "max-h-60",
              dropdownClassName,
            )}
          >
            {options.length === 0 ? (
              <div className="px-3 py-2 text-muted-foreground">No options</div>
            ) : null}

            {options.map((option) => (
              <div
                key={option.value}
                ref={option.value === value ? selectedOptionRef : null}
                className={mergeClassNames(
                  "mx-1 my-1 flex cursor-pointer items-center rounded-md text-foreground transition",
                  isCompact
                    ? "gap-1.5 px-2.5 py-2 text-sm"
                    : "gap-2 px-3 py-2 text-sm",
                  option.value === value
                    ? "bg-accent-subtle font-semibold text-accent"
                    : "",
                  "hover:bg-accent hover:text-on-accent",
                  optionClassName,
                )}
                onClick={() => handleSelect(option.value)}
              >
                {selectionIndicator === "check" ? (
                  <span
                    className={mergeClassNames(
                      "flex items-center justify-center",
                      isCompact ? "w-4" : "w-5",
                    )}
                  >
                    {option.value === value ? (
                      <CheckIcon
                        className="text-accent"
                        width={isCompact ? 16 : 18}
                        height={isCompact ? 16 : 18}
                      />
                    ) : null}
                  </span>
                ) : null}
                <TruncatedText as="span" showTitleOnHover className="flex-1">
                  {option.label}
                </TruncatedText>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-1 text-sm font-medium text-destructive">{error}</p>
      ) : null}
      {helperText && !error ? (
        <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = "Select";
