import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { mergeClassNames } from "../../../utils";
import type { ChromaGridProps, ChromaGridItem } from "./types";

const borderRadiusMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

const defaultColors = [
  "linear-gradient(135deg, var(--ds-color-accent) 0%, var(--ds-color-accent-hover) 100%)",
  "linear-gradient(135deg, var(--ds-color-accent) 0%, var(--ds-color-info) 100%)",
  "linear-gradient(135deg, var(--ds-color-info) 0%, var(--ds-color-accent-hover) 100%)",
  "linear-gradient(135deg, var(--ds-color-success) 0%, var(--ds-color-accent) 100%)",
  "linear-gradient(135deg, var(--ds-color-warning) 0%, var(--ds-color-accent) 100%)",
  "linear-gradient(135deg, var(--ds-color-danger) 0%, var(--ds-color-warning) 100%)",
  "linear-gradient(135deg, var(--ds-color-accent-hover) 0%, var(--ds-color-success) 100%)",
  "linear-gradient(135deg, var(--ds-color-info) 0%, var(--ds-color-success) 100%)",
];

const getAnimation = (
  animation: string,
  index: number,
  staggerDelay: number,
) => {
  const delay = (index * staggerDelay) / 1000;

  switch (animation) {
    case "wave":
      return {
        initial: { opacity: 0, y: 30, rotateX: -15 },
        animate: { opacity: 1, y: 0, rotateX: 0 },
        transition: { delay, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
      };
    case "pulse":
      return {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: {
          delay,
          duration: 0.5,
          type: "spring" as const,
          stiffness: 200,
        },
      };
    case "fadeIn":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay, duration: 0.4 },
      };
    case "scale":
      return {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: {
          delay,
          duration: 0.5,
          type: "spring" as const,
          stiffness: 300,
          damping: 20,
        },
      };
    default:
      return {};
  }
};

const getHoverEffect = (effect: string) => {
  switch (effect) {
    case "lift":
      return { y: -8, transition: { duration: 0.3 } };
    case "glow":
      return {
        boxShadow:
          "0 0 30px color-mix(in srgb, var(--ds-color-accent) 45%, transparent)",
        transition: { duration: 0.3 },
      };
    case "scale":
      return { scale: 1.05, transition: { duration: 0.3 } };
    case "tilt":
      return { rotateY: 5, rotateX: 5, transition: { duration: 0.3 } };
    default:
      return {};
  }
};

interface GridItemProps {
  item: ChromaGridItem;
  index: number;
  animation: string;
  staggerDelay: number;
  hoverEffect: string;
  variant: string;
  borderRadius: string;
  minHeight: number;
  spotlight: boolean;
}

const GridItem = ({
  item,
  index,
  animation,
  staggerDelay,
  hoverEffect,
  variant,
  borderRadius,
  minHeight,
  spotlight,
}: GridItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const color = item.color || defaultColors[index % defaultColors.length];
  const animationProps = getAnimation(animation, index, staggerDelay);
  const hoverProps = getHoverEffect(hoverEffect);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current || !spotlight) return;
    const rect = itemRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const gridSpan =
    item.size && item.size > 1
      ? { gridColumn: `span ${item.size}`, gridRow: `span ${item.size}` }
      : {};

  const variantStyles = {
    glass: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    },
    solid: {},
    gradient: { background: color },
  };

  return (
    <motion.div
      ref={itemRef}
      className={mergeClassNames(
        "relative overflow-hidden cursor-pointer transition-shadow",
        borderRadiusMap[borderRadius as keyof typeof borderRadiusMap],
        variant === "glass" && "border border-white/20 dark:border-white/10",
        item.className,
      )}
      style={{
        minHeight:
          item.size && item.size > 1 ? minHeight * item.size : minHeight,
        ...gridSpan,
        ...variantStyles[variant as keyof typeof variantStyles],
        ...(variant !== "glass" && { background: color }),
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={item.onClick}
      {...animationProps}
      whileHover={hoverProps}
    >
      {/* Spotlight effect */}
      {spotlight && isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Glass overlay for gradient variant */}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center">
        {item.icon && (
          <div className="text-4xl text-white mb-3 drop-shadow-lg">
            {item.icon}
          </div>
        )}
        {item.title && (
          <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">
            {item.title}
          </h3>
        )}
        {item.description && (
          <p className="text-sm text-white/80 drop-shadow-sm">
            {item.description}
          </p>
        )}
        {item.content}
      </div>
    </motion.div>
  );
};

export const ChromaGrid = ({
  items,
  className,
  columns = 3,
  gap = 16,
  minHeight = 200,
  animation = "wave",
  staggerDelay = 100,
  hoverEffect = "lift",
  variant = "gradient",
  borderRadius = "xl",
  spotlight = true,
  style,
}: ChromaGridProps) => {
  return (
    <div
      className={mergeClassNames("grid w-full", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        ...style,
      }}
    >
      {items.map((item, index) => (
        <GridItem
          key={item.id}
          item={item}
          index={index}
          animation={animation}
          staggerDelay={staggerDelay}
          hoverEffect={hoverEffect}
          variant={variant}
          borderRadius={borderRadius}
          minHeight={minHeight}
          spotlight={spotlight}
        />
      ))}
    </div>
  );
};

ChromaGrid.displayName = "ChromaGrid";

export default ChromaGrid;
