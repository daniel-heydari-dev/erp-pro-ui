import type { JSX, ReactNode } from 'react';

export interface GradualBlurProps {
  /** Content to animate */
  children: ReactNode;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Delay before starting animation in seconds */
  delay?: number;
  /** Initial blur amount in pixels */
  blur?: number;
  /** Whether to animate when entering viewport */
  triggerOnView?: boolean;
  /** Whether to trigger only once */
  triggerOnce?: boolean;
  /** Intersection threshold (0-1) */
  threshold?: number;
  /** Start visible? (if false, waits for trigger) */
  visible?: boolean;
  /** Direction of reveal (optional slide effect) */
  direction?: 'none' | 'top' | 'bottom' | 'left' | 'right';
  /** Distance for slide effect in pixels */
  distance?: number;
  /** Custom class name */
  className?: string;
  /** HTML tag to render as */
  as?: keyof JSX.IntrinsicElements;
}
