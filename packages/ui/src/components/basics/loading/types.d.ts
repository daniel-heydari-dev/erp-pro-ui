export interface LoadingProps {
  /** The variant/style of the loading indicator */
  variant?:
    | "spinner"
    | "dots"
    | "pulse"
    | "bars"
    | "ring"
    | "bounce"
    | "wave"
    | "skeleton";
  /** Size of the loading indicator */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Custom color for the loading indicator */
  color?: string;
  /** Text to display alongside the loading indicator */
  text?: string;
  /** Position of the text relative to the indicator */
  textPosition?: "right" | "bottom";
  /** Whether to show as a full-screen overlay */
  fullScreen?: boolean;
  /** Whether to show as an overlay within parent container */
  overlay?: boolean;
  /** Custom className */
  className?: string;
  /** Skeleton specific: width */
  skeletonWidth?: string;
  /** Skeleton specific: height */
  skeletonHeight?: string;
  /** Skeleton specific: rounded style */
  skeletonRounded?: "none" | "sm" | "md" | "lg" | "full";
}
