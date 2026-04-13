import { mergeClassNames } from "../../../utils";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

type HoverBorderGradientProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
    children?: React.ReactNode;
  };

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(50.7% 50% at 50% 0%, var(--ds-gradient-accent-hover) 0%, transparent 100%)",
  LEFT: "radial-gradient(25.6% 43.1% at 0% 50%, var(--ds-gradient-accent-hover) 0%, transparent 100%)",
  BOTTOM:
    "radial-gradient(50.7% 50% at 50% 100%, var(--ds-gradient-accent-hover) 0%, transparent 100%)",
  RIGHT:
    "radial-gradient(25.2% 41% at 100% 50%, var(--ds-gradient-accent-hover) 0%, transparent 100%)",
};

const highlight = `radial-gradient(85% 181% at 50% 50%, var(--ds-gradient-accent-hover) 0%, transparent 100%)`;

export function HoverBorderGradient({
  containerClassName,
  className,
  duration = 1,
  clockwise = true,
  children,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = useCallback(
    (current: Direction): Direction => {
      const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const index = directions.indexOf(current);
      const nextIndex = clockwise
        ? (index - 1 + directions.length) % directions.length
        : (index + 1) % directions.length;
      return directions[nextIndex];
    },
    [clockwise],
  );

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, rotateDirection]);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={mergeClassNames(
        "relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-lg border border-ds-border-2 p-px transition duration-500",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={mergeClassNames(
          "bg-ds-surface-1 text-ds-1 z-10 w-auto rounded-[inherit] px-4 py-2",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className={mergeClassNames(
          "absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]",
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
    </button>
  );
}
