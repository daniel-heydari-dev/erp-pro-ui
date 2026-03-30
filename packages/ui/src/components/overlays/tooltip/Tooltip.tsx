import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click" | "focus";

export interface TooltipProps {
  /** The content to display in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Position of the tooltip relative to the trigger */
  position?: TooltipPosition;
  /** How the tooltip is triggered */
  trigger?: TooltipTrigger;
  /** Delay before showing tooltip (ms) */
  delayShow?: number;
  /** Delay before hiding tooltip (ms) */
  delayHide?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Custom className for the tooltip */
  className?: string;
  /** Whether to show an arrow pointing to the trigger */
  arrow?: boolean;
  /** Maximum width of the tooltip */
  maxWidth?: number;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-neutral-800 dark:border-t-neutral-700 border-x-transparent border-b-transparent border-t-[6px] border-x-[6px] border-b-0",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-b-neutral-800 dark:border-b-neutral-700 border-x-transparent border-t-transparent border-b-[6px] border-x-[6px] border-t-0",
  left: "left-full top-1/2 -translate-y-1/2 border-l-neutral-800 dark:border-l-neutral-700 border-y-transparent border-r-transparent border-l-[6px] border-y-[6px] border-r-0",
  right:
    "right-full top-1/2 -translate-y-1/2 border-r-neutral-800 dark:border-r-neutral-700 border-y-transparent border-l-transparent border-r-[6px] border-y-[6px] border-l-0",
};

const motionVariants = {
  top: {
    initial: { opacity: 0, y: 4, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 4, scale: 0.95 },
  },
  bottom: {
    initial: { opacity: 0, y: -4, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -4, scale: 0.95 },
  },
  left: {
    initial: { opacity: 0, x: 4, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 4, scale: 0.95 },
  },
  right: {
    initial: { opacity: 0, x: -4, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -4, scale: 0.95 },
  },
} as const;

export default function Tooltip({
  content,
  children,
  position = "top",
  trigger = "hover",
  delayShow = 200,
  delayHide = 0,
  disabled = false,
  className = "",
  arrow = true,
  maxWidth = 250,
  open: controlledOpen,
  onOpenChange,
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setInternalOpen(value);
      }
    },
    [isControlled, onOpenChange]
  );

  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const showTooltip = useCallback(() => {
    if (disabled) return;
    clearTimeouts();
    if (delayShow > 0) {
      showTimeoutRef.current = setTimeout(() => setOpen(true), delayShow);
    } else {
      setOpen(true);
    }
  }, [disabled, delayShow, setOpen, clearTimeouts]);

  const hideTooltip = useCallback(() => {
    clearTimeouts();
    if (delayHide > 0) {
      hideTimeoutRef.current = setTimeout(() => setOpen(false), delayHide);
    } else {
      setOpen(false);
    }
  }, [delayHide, setOpen, clearTimeouts]);

  const toggleTooltip = useCallback(() => {
    if (disabled) return;
    setOpen(!isOpen);
  }, [disabled, isOpen, setOpen]);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  // Close on click outside for click trigger
  useEffect(() => {
    if (trigger !== "click" || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [trigger, isOpen, setOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, setOpen]);

  const triggerProps = {
    ...(trigger === "hover" && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
    }),
    ...(trigger === "click" && {
      onClick: toggleTooltip,
    }),
    ...(trigger === "focus" && {
      onFocus: showTooltip,
      onBlur: hideTooltip,
    }),
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      {...triggerProps}
    >
      {children}
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            role="tooltip"
            initial={motionVariants[position].initial}
            animate={motionVariants[position].animate}
            exit={motionVariants[position].exit}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`
              absolute z-50 ${positionStyles[position]}
              px-3 py-2 text-sm font-medium
              bg-neutral-800 dark:bg-neutral-700
              text-white rounded-lg shadow-lg
              whitespace-normal break-words
              ${className}
            `}
            style={{ maxWidth }}
          >
            {content}
            {arrow && (
              <span
                className={`absolute w-0 h-0 ${arrowStyles[position]}`}
                aria-hidden="true"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { Tooltip };
