import { forwardRef, useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type HoverCardPosition = "top" | "bottom" | "left" | "right";
export type HoverCardAlign = "start" | "center" | "end";

export interface HoverCardProps {
  /** The trigger element */
  children: React.ReactNode;
  /** The content to display in the hover card */
  content: React.ReactNode;
  /** Position of the hover card relative to trigger */
  position?: HoverCardPosition;
  /** Alignment of the hover card */
  align?: HoverCardAlign;
  /** Delay before showing the card (ms) */
  openDelay?: number;
  /** Delay before hiding the card (ms) */
  closeDelay?: number;
  /** Whether the hover card is disabled */
  disabled?: boolean;
  /** Custom className for the card */
  className?: string;
  /** Custom className for the trigger wrapper */
  triggerClassName?: string;
  /** Whether to show an arrow */
  arrow?: boolean;
  /** Custom width for the card */
  width?: number | string;
  /** Max width for the card */
  maxWidth?: number | string;
}

const positionStyles: Record<
  HoverCardPosition,
  Record<HoverCardAlign, string>
> = {
  top: {
    start: "bottom-full left-0 mb-2",
    center: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    end: "bottom-full right-0 mb-2",
  },
  bottom: {
    start: "top-full left-0 mt-2",
    center: "top-full left-1/2 -translate-x-1/2 mt-2",
    end: "top-full right-0 mt-2",
  },
  left: {
    start: "right-full top-0 mr-2",
    center: "right-full top-1/2 -translate-y-1/2 mr-2",
    end: "right-full bottom-0 mr-2",
  },
  right: {
    start: "left-full top-0 ml-2",
    center: "left-full top-1/2 -translate-y-1/2 ml-2",
    end: "left-full bottom-0 ml-2",
  },
};

const arrowStyles: Record<HoverCardPosition, string> = {
  top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-white/70 dark:border-t-neutral-900/70",
  bottom:
    "top-[-6px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-white/70 dark:border-b-neutral-900/70",
  left: "right-[-6px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-white/70 dark:border-l-neutral-900/70",
  right:
    "left-[-6px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-white/70 dark:border-r-neutral-900/70",
};

const motionVariants = {
  top: {
    initial: { opacity: 0, y: 5, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 5, scale: 0.98 },
  },
  bottom: {
    initial: { opacity: 0, y: -5, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -5, scale: 0.98 },
  },
  left: {
    initial: { opacity: 0, x: 5, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 5, scale: 0.98 },
  },
  right: {
    initial: { opacity: 0, x: -5, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -5, scale: 0.98 },
  },
} as const;

const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  (
    {
      children,
      content,
      position = "bottom",
      align = "center",
      openDelay = 200,
      closeDelay = 150,
      disabled = false,
      className = "",
      triggerClassName = "",
      arrow = true,
      width,
      maxWidth = 320,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const openTimeoutRef = useRef<any>(null);
    const closeTimeoutRef = useRef<any>(null);

    const clearTimeouts = useCallback(() => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
        openTimeoutRef.current = null;
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }, []);

    const handleMouseEnter = useCallback(() => {
      if (disabled) return;
      clearTimeouts();
      openTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, openDelay);
    }, [disabled, openDelay, clearTimeouts]);

    const handleMouseLeave = useCallback(() => {
      clearTimeouts();
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, closeDelay);
    }, [closeDelay, clearTimeouts]);

    useEffect(() => {
      return () => clearTimeouts();
    }, [clearTimeouts]);

    const resolvedWidth = width
      ? typeof width === "number"
        ? `${width}px`
        : width
      : "max-content";

    const resolvedMaxWidth =
      typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;

    const cardContainerStyle: React.CSSProperties = {
      width: resolvedWidth,
      maxWidth: resolvedMaxWidth
        ? `min(calc(100vw - 2rem), ${resolvedMaxWidth})`
        : "calc(100vw - 2rem)",
    };

    const cardStyle: React.CSSProperties = {
      width: width
        ? typeof width === "number"
          ? `${width}px`
          : width
        : "100%",
    };

    return (
      <div
        ref={ref}
        className={`relative inline-block ${triggerClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`
                absolute z-50
                ${positionStyles[position][align]}
              `}
              style={cardContainerStyle}
              initial={motionVariants[position].initial}
              animate={motionVariants[position].animate}
              exit={motionVariants[position].exit}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div
                className={`
                  w-full
                  bg-white/70 dark:bg-neutral-900/70
                  backdrop-blur-xl
                  rounded-xl shadow-2xl dark:shadow-neutral-950/50
                  border border-white/40 dark:border-white/10
                  p-4
                  ${className}
                `}
                style={cardStyle}
              >
                {content}
              </div>
              {arrow && (
                <span
                  className={`
                    absolute w-0 h-0 border-[6px]
                    ${arrowStyles[position]}
                  `}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

HoverCard.displayName = "HoverCard";

export default HoverCard;
export { HoverCard };
