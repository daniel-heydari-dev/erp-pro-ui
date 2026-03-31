import type { ReactNode, CSSProperties } from "react";

export interface ChromaGridItem {
  /** Unique identifier */
  id: string;
  /** Item content */
  content?: ReactNode;
  /** Background color or gradient */
  color?: string;
  /** Size multiplier (1 = normal, 2 = double width/height) */
  size?: 1 | 2 | 3;
  /** Custom class name for this item */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Optional title */
  title?: string;
  /** Optional description */
  description?: string;
  /** Optional icon */
  icon?: ReactNode;
}

export interface ChromaGridProps {
  /** Array of grid items */
  items: ChromaGridItem[];
  /** Custom class name */
  className?: string;
  /** Number of columns */
  columns?: number;
  /** Gap between items in pixels */
  gap?: number;
  /** Minimum item height in pixels */
  minHeight?: number;
  /** Animation style */
  animation?: "wave" | "pulse" | "fadeIn" | "scale" | "none";
  /** Animation delay between items in ms */
  staggerDelay?: number;
  /** Hover effect */
  hoverEffect?: "lift" | "glow" | "scale" | "tilt" | "none";
  /** Visual variant */
  variant?: "glass" | "solid" | "gradient";
  /** Border radius */
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Enable spotlight effect on items */
  spotlight?: boolean;
  /** Custom styles */
  style?: CSSProperties;
}

export type ChromaGridAnimation =
  | "wave"
  | "pulse"
  | "fadeIn"
  | "scale"
  | "none";
export type ChromaGridHoverEffect = "lift" | "glow" | "scale" | "tilt" | "none";
