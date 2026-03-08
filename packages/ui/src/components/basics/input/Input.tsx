import { forwardRef, useState } from "react";
import { type InputProps, InputState } from "./types";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { mergeClassNames } from "../../../utils";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      id,
      extra,
      placeholder,
      state = InputState.DEFAULT,
      disabled,
      message,
      icon,
      iconClassName,
      // bgClassName = "bg-zinc-950/40",
      bgClassName = "bg-secondary",
      // bgClassName = "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl",
      ...props
    },
    ref
  ) => {
    const radius = 100; // Radius for the hover effect
    const [visible, setVisible] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };

    const wrapperStateStyles: Record<InputState, string> = {
      [InputState.DISABLED]: "bg-muted border-none",
      [InputState.ERROR]: "border-destructive ",
      [InputState.SUCCESS]: "border-green-500 dark:border-green-400 ",
      [InputState.DEFAULT]: "border-border ",
    };

    const inputStateStyles: Record<InputState, string> = {
      [InputState.DISABLED]: "placeholder:!text-muted-foreground",
      [InputState.ERROR]:
        "text-destructive placeholder:text-destructive",
      [InputState.SUCCESS]:
        "text-green-500 placeholder:text-green-500 dark:text-green-400 dark:placeholder:text-green-400",
      [InputState.DEFAULT]: "text-foreground",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
            {label}
          </label>
        )}

        <motion.div
          style={{
            backgroundImage: disabled
              ? "none"
              : useMotionTemplate`
                  radial-gradient(
                    ${visible ? `${radius}px` : "0px"
                } circle at ${mouseX}px ${mouseY}px,
                    #3b82f6,
                    transparent 70%
                  )
                `,
          }}
          onMouseMove={!disabled ? handleMouseMove : undefined}
          onMouseEnter={!disabled ? () => setVisible(true) : undefined}
          onMouseLeave={!disabled ? () => setVisible(false) : undefined}
          className={mergeClassNames(
            "group/input rounded-lg p-[2px] transition duration-300 hover:border-blue-500 dark:hover:border-blue-500",
            wrapperStateStyles[state],
            extra
          )}
        >
          <div className="relative flex items-center ">
            {icon && (
              <div className={mergeClassNames("pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3", iconClassName)}>
                {icon}
              </div>
            )}
            <input
              ref={ref}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              className={mergeClassNames(
                "shadow-input flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm text-foreground transition duration-400 ease-in-out group-hover/input:shadow-none file:border-0  file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-[2px] focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                bgClassName,
                inputStateStyles[state],
                className
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
              error
                ? "text-destructive"
                : "text-muted-foreground"
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
  }
);

Input.displayName = "Input";
