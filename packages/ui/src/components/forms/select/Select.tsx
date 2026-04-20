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
import { DropdownMenu } from "../../overlays/dropdown-menu";
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
    noOptionsText = "No options",
    disabled,
    bgClassName = "bg-ds-surface-1",
    size = "default",
    selectionIndicator = "check",
    ...props
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
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
        <label className="mb-2 block text-sm leading-none font-medium text-ds-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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

      <DropdownMenu
        className={mergeClassNames("w-full", className)}
        open={open}
        onOpenChange={(nextOpen) => {
          if (disabled) {
            setOpen(false);
            return;
          }

          setOpen(nextOpen);
        }}
        panelClassName={mergeClassNames(
          " left-0 top-[40px] z-20 mt-1 flex flex-col overflow-auto rounded-lg border border-ds-border-2 bg-ds-surface-1 shadow-3 backdrop-blur-xl transition",
          isCompact ? "max-h-56" : "max-h-60",
          dropdownClassName,
        )}
        animationClassName="origin-top-left"
        trigger={
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
              "group/select w-full rounded-lg p-[2px] transition duration-300 hover:border-ds-border-accent",
              disabled
                ? "border-none bg-ds-surface-1"
                : error
                  ? "border-ds-state-error-border"
                  : "border-ds-border-2",
            )}
          >
            <div
              className={mergeClassNames(
                "flex w-full cursor-pointer items-center justify-between rounded-md border border-ds-border-field transition duration-400 ease-in-out",
                isCompact
                  ? "h-9 px-2.5 py-2 text-sm"
                  : "h-10 px-3 py-2 text-sm",
                bgClassName,
                disabled ? "cursor-not-allowed opacity-50" : "text-ds-1",
                error
                  ? "border-ds-state-error-border text-ds-state-error-text focus-visible:ring-ds-state-error-border"
                  : "",
                triggerClassName,
              )}
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
                  className="flex-1 text-ds-1"
                >
                  {selectedOption.label}
                </TruncatedText>
              ) : (
                <TruncatedText as="span" className="flex-1 text-ds-2">
                  {placeholder}
                </TruncatedText>
              )}

              <span
                className={mergeClassNames(
                  "ml-2 shrink-0 text-ds-2 transition-transform duration-300",
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
        }
      >
        {!disabled ? (
          <>
            {options.length === 0 ? (
              <div className="px-3 py-2 text-ds-2">{noOptionsText}</div>
            ) : null}

            {options.map((option) => (
              <div
                key={option.value}
                ref={option.value === value ? selectedOptionRef : null}
                className={mergeClassNames(
                  "mx-1 my-1 flex cursor-pointer items-center rounded-md text-ds-1 transition",
                  isCompact
                    ? "gap-1.5 px-2.5 py-2 text-sm"
                    : "gap-2 px-3 py-2 text-sm",
                  option.value === value
                    ? "bg-ds-accent-subtle font-semibold text-ds-1"
                    : "",
                  "hover:bg-ds-accent hover:text-ds-on-accent",
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
                        className="text-ds-1"
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
          </>
        ) : null}
      </DropdownMenu>

      {error ? (
        <p className="mt-1 text-sm font-medium text-ds-state-error-text">
          {error}
        </p>
      ) : null}
      {helperText && !error ? (
        <p className="mt-1 text-sm text-ds-2">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = "Select";
