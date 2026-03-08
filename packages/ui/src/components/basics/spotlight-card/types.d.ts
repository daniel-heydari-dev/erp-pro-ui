import type { ReactNode, CSSProperties } from "react";

export interface SpotlightCardProps {
  /** Card content */
  children: ReactNode;
  /** Custom class name */
  className?: string;
  /** Spotlight color */
  spotlightColor?: string;
  /** Spotlight size in pixels */
  spotlightSize?: number;
  /** Whether spotlight is enabled */
  spotlightEnabled?: boolean;
  /** Card variant */
  variant?: "glass" | "solid" | "outlined";
  /** Border radius */
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /** Whether card has hover scale effect */
  hoverScale?: boolean;
  /** Custom styles */
  style?: CSSProperties;
  /** Click handler */
  onClick?: () => void;
}
