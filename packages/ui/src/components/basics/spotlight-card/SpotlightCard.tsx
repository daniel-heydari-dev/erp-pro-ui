import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { mergeClassNames } from "../../../utils";
import type { SpotlightCardProps } from "./types";

const borderRadiusMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
  xl: "p-10",
};

const variantStyles = {
  glass: `
    bg-white/60 dark:bg-neutral-900/50
    backdrop-blur-2xl
    border border-white/40 dark:border-white/10
    shadow-xl shadow-neutral-200/30 dark:shadow-neutral-950/50
  `,
  solid: `
    bg-white dark:bg-neutral-900
    border border-neutral-200 dark:border-neutral-800
    shadow-lg shadow-neutral-200/50 dark:shadow-neutral-950/50
  `,
  outlined: `
    bg-transparent
    border-2 border-neutral-200 dark:border-neutral-700
  `,
};

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = "rgba(115, 103, 240, 0.15)",
  spotlightSize = 350,
  spotlightEnabled = true,
  variant = "glass",
  borderRadius = "xl",
  padding = "md",
  hoverScale = true,
  style,
  onClick,
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !spotlightEnabled) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const spotlightStyle = spotlightEnabled && isHovered
    ? {
      background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
    }
    : {};

  return (
    <motion.div
      ref={containerRef}
      className={mergeClassNames(
        "relative overflow-hidden transition-all duration-300",
        borderRadiusMap[borderRadius],
        paddingMap[padding],
        variantStyles[variant],
        onClick && "cursor-pointer",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={hoverScale ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Spotlight overlay */}
      {spotlightEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={spotlightStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Border glow effect */}
      {spotlightEnabled && isHovered && (
        <motion.div
          className={mergeClassNames(
            "pointer-events-none absolute inset-0 z-0",
            borderRadiusMap[borderRadius]
          )}
          style={{
            background: `radial-gradient(${spotlightSize * 0.6}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor.replace("0.15", "0.3")}, transparent 70%)`,
            filter: "blur(20px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
