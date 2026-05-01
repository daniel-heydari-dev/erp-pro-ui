import { forwardRef, useState } from "react";
import { type InputProps, InputState } from "./types";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { mergeClassNames } from "../../../utils";
import { Tooltip } from "../../overlays/tooltip/Tooltip";
import { InfoCircleIcon } from "../../icons";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      labelTooltip,
      labelHint,
      error,
      helperText,
      id,
      extra,
      placeholder,
      state = InputState.DEFAULT,
      disabled,
      required,
      message,
      leftIcon,
      leftIconClassName,
      rightIcon,
      rightIconClassName,
      icon,
      iconClassName,
      bgClassName = "bg-ds-surface-1",
      ...props
    },
    ref,
  ) => {
    const radius = 100;
    const [visible, setVisible] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const resolvedState = disabled
      ? InputState.DISABLED
      : error
        ? InputState.ERROR
        : state;
    const isDisabled = resolvedState === InputState.DISABLED;
    const trailingIcon = rightIcon ?? icon;
    const trailingIconClassName = rightIcon
      ? rightIconClassName
      : (rightIconClassName ?? iconClassName);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };

    const wrapperStateStyles: Record<InputState, string> = {
      [InputState.DISABLED]: "border border-ds-border-field bg-ds-surface-1",
      [InputState.ERROR]: "border-ds-state-danger",
      [InputState.SUCCESS]: "border-ds-state-success",
      [InputState.DEFAULT]: "border-ds-border-2",
    };

    const inputStateStyles: Record<InputState, string> = {
      [InputState.DISABLED]:
        "border-transparent bg-transparent text-ds-2 placeholder:!text-ds-3 placeholder:opacity-60",
      [InputState.ERROR]: "border-ds-state-danger! text-ds-1",
      [InputState.SUCCESS]: "border-ds-state-success! text-ds-1",
      [InputState.DEFAULT]: "border-ds-border-field text-ds-1",
    };

    return (
      <div className="w-full">
        {label || labelHint ? (
          <div
            className={mergeClassNames(
              "mb-2 flex items-center gap-3",
              label ? "justify-between" : "justify-end",
            )}
          >
            {label ? (
              <label
                htmlFor={id}
                className="inline-flex items-center gap-1.5 text-sm leading-none font-medium text-ds-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
                {required && (
                  <sup className="ms-0.5 text-ds-state-danger">*</sup>
                )}
                {labelTooltip && (
                  <Tooltip content={labelTooltip} position="top">
                    <span className="cursor-help text-ds-3 hover:text-ds-2 transition-colors">
                      <InfoCircleIcon width={14} height={14} color="currentColor" />
                    </span>
                  </Tooltip>
                )}
              </label>
            ) : null}
            {labelHint ? (
              <div className="shrink-0 text-xs text-ds-2">{labelHint}</div>
            ) : null}
          </div>
        ) : null}

        <motion.div
          style={{
            backgroundImage: isDisabled
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
          onMouseMove={!isDisabled ? handleMouseMove : undefined}
          onMouseEnter={!isDisabled ? () => setVisible(true) : undefined}
          onMouseLeave={!isDisabled ? () => setVisible(false) : undefined}
          className={mergeClassNames(
            "group/input rounded-lg transition duration-300",
            isDisabled ? "p-px" : "p-[2px] hover:border-ds-border-accent",
            wrapperStateStyles[resolvedState],
            extra,
          )}
        >
          <div className="relative flex items-center">
            {leftIcon ? (
              <div
                className={mergeClassNames(
                  "pointer-events-none absolute inset-y-0 flex items-center text-ds-2",
                  leftIconClassName,
                )}
                style={{ insetInlineStart: 0, paddingInlineStart: "0.75rem" }}
              >
                {leftIcon}
              </div>
            ) : null}
            {trailingIcon ? (
              <div
                className={mergeClassNames(
                  "pointer-events-none absolute inset-y-0 flex items-center text-ds-2",
                  trailingIconClassName,
                )}
                style={{ insetInlineEnd: 0, paddingInlineEnd: "0.75rem" }}
              >
                {trailingIcon}
              </div>
            ) : null}
            <input
              ref={ref}
              id={id}
              placeholder={placeholder}
              disabled={isDisabled}
              required={required}
              className={mergeClassNames(
                "flex h-10 w-full rounded-md border border-ds-border-field py-2 text-sm text-ds-1 transition duration-400 ease-in-out file:border-0 file:text-sm file:font-medium placeholder:text-ds-3 placeholder:opacity-70 focus-visible:ring-1 focus-visible:ring-ds-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                bgClassName,
                inputStateStyles[resolvedState],
                className,
              )}
              style={{
                paddingInlineStart: leftIcon ? "2.5rem" : "0.75rem",
                paddingInlineEnd: trailingIcon ? "2.5rem" : "0.75rem",
              }}
              {...props}
              autoComplete="off"
            />
          </div>
        </motion.div>

        {(error || message) && (
          <p
            className={mergeClassNames(
              "text-sm font-medium mt-1",
              error ? "text-ds-state-danger" : "text-ds-2",
            )}
          >
            {error || message}
          </p>
        )}
        {helperText && !error && !message && (
          <p className="text-sm text-ds-2 mt-1">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
