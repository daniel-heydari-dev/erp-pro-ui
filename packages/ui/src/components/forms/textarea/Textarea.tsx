import type { TextareaProps } from "./types";
import { forwardRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { mergeClassNames } from "../../../utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, helperText, disabled, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm leading-none font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}

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
            "group/textarea rounded-lg p-[2px] transition duration-300 hover:border-accent",
            error ? "border-destructive" : "border-border",
          )}
        >
          <textarea
            ref={ref}
            disabled={disabled}
            className={mergeClassNames(
              "flex min-h-[80px] w-full rounded-md border border-input bg-background-secondary px-3 py-2 text-sm text-foreground transition duration-400 ease-in-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 resize-none",
              error &&
                "border-destructive text-destructive placeholder:text-destructive focus-visible:ring-destructive",
              className,
            )}
            {...props}
          />
        </motion.div>

        {error && (
          <p className="text-sm font-medium text-destructive mt-1">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
