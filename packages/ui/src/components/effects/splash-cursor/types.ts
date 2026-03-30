import type { CSSProperties } from "react";

export interface SplashCursorProps {
  /** Custom class name for the container */
  className?: string;
  /** Splash color */
  color?: string;
  /** Secondary splash color (for gradient effect) */
  secondaryColor?: string;
  /** Size of the splash effect */
  size?: "sm" | "md" | "lg" | "xl";
  /** Number of splash particles */
  particleCount?: number;
  /** Enable/disable the effect */
  enabled?: boolean;
  /** Blur amount for the splash */
  blur?: number;
  /** Opacity of the splash */
  opacity?: number;
  /** Duration of splash animation in ms */
  duration?: number;
  /** Whether splash follows cursor smoothly or with delay */
  smooth?: boolean;
  /** Smoothing factor (higher = more lag) */
  smoothFactor?: number;
  /** Custom styles */
  style?: CSSProperties;
  /** Children to wrap */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: "splash" | "glow" | "trail" | "ripple";
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}
