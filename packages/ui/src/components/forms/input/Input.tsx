import { forwardRef, useState } from "react";
import { type InputProps, InputState } from "./types";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { mergeClassNames } from "../../../utils";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      labelHint,
      error,
      helperText,
      id,
      extra,
      placeholder,
      state = InputState.DEFAULT,
      disabled,
      message,
      leftIcon,
      leftIconClassName,
      rightIcon,
      rightIconClassName,
      icon,
      iconClassName,
      bgClassName = "bg-background-secondary",
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
      [InputState.DISABLED]: "border border-input bg-muted",
      [InputState.ERROR]: "border-destructive ",
      [InputState.SUCCESS]: "border-success-border ",
      [InputState.DEFAULT]: "border-border ",
    };

    const inputStateStyles: Record<InputState, string> = {
      [InputState.DISABLED]:
        "border-transparent bg-transparent text-muted-foreground placeholder:!text-muted-foreground",
      [InputState.ERROR]: "text-destructive placeholder:text-destructive",
      [InputState.SUCCESS]: "text-success placeholder:text-success",
      [InputState.DEFAULT]: "text-foreground",
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
                className="block text-sm leading-none font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            ) : null}
            {labelHint ? (
              <div className="shrink-0 text-xs text-muted-foreground">
                {labelHint}
              </div>
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
            isDisabled ? "p-px" : "p-[2px] hover:border-accent",
            wrapperStateStyles[resolvedState],
            extra,
          )}
        >
          <div className="relative flex items-center">
            {leftIcon ? (
              <div
                className={mergeClassNames(
                  "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground",
                  leftIconClassName,
                )}
              >
                {leftIcon}
              </div>
            ) : null}
            {trailingIcon ? (
              <div
                className={mergeClassNames(
                  "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground",
                  trailingIconClassName,
                )}
              >
                {trailingIcon}
              </div>
            ) : null}
            <input
              ref={ref}
              id={id}
              placeholder={placeholder}
              disabled={isDisabled}
              className={mergeClassNames(
                "flex h-10 w-full rounded-md border border-input py-2 text-sm text-foreground transition duration-400 ease-in-out file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                leftIcon ? "pl-10" : "pl-3",
                trailingIcon ? "pr-10" : "pr-3",
                bgClassName,
                inputStateStyles[resolvedState],
                className,
              )}
              {...props}
              autoComplete="off"
            />
          </div>
        </motion.div>

        {(error || message) && (
          <p
            className={mergeClassNames(
              "text-sm font-medium mt-1",
              error ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {error || message}
          </p>
        )}
        {helperText && !error && !message && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
