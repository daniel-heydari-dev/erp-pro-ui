import type { ReactNode } from "react";

export type AnimationDirection = "horizontal" | "vertical";
export type AnimationEase = 
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"
  | "bounce"
  | "elastic";

export type AnimationPreset =
  | "fade"
  | "scale"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "elastic"
  | "bounce"
  | "flip"
  | "zoom"
  | "custom";

export interface AnimatedContentProps {
  /** Content to animate */
  children?: ReactNode;
  /** Animation preset (or 'custom' to use custom values) */
  preset?: AnimationPreset;
  /** Direction for slide animations */
  direction?: AnimationDirection;
  /** Easing function for entrance animation */
  ease?: AnimationEase;
  /** Easing function for exit animation */
  exitEase?: AnimationEase;
  /** Whether to reverse the animation direction */
  reverse?: boolean;
  /** Whether to animate opacity */
  animateOpacity?: boolean;
  /** Distance in pixels for slide animations */
  distance?: number;
  /** Duration of entrance animation in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Initial opacity (0-1) */
  initialOpacity?: number;
  /** Initial scale (e.g., 0.5 = 50%) */
  initialScale?: number;
  /** Intersection observer threshold (0-1) for triggering animation */
  threshold?: number;
  /** Duration before disappearing (0 = don't disappear) */
  disappearAfter?: number;
  /** Duration of exit animation in seconds */
  disappearDuration?: number;
  /** Whether animation should trigger when element enters viewport */
  triggerOnView?: boolean;
  /** Whether animation should only trigger once */
  triggerOnce?: boolean;
  /** Additional CSS class */
  className?: string;
  /** HTML tag to render as */
  as?: keyof JSX.IntrinsicElements;
}
