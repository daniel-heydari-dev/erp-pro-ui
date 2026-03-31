import type { ReactNode, CSSProperties } from "react";

export type CarouselAnimation =
  | "slide" // Default horizontal slide
  | "fade" // Crossfade between slides
  | "scale" // Scale up/down transition
  | "flip" // 3D flip effect
  | "cube" // 3D cube rotation
  | "cards"; // Card stack effect

export interface CarouselItem {
  /** Unique identifier */
  id: string;
  /** Item content (optional if image is provided) */
  content?: ReactNode;
  /** Optional image URL */
  image?: string;
  /** Optional alt text for image */
  alt?: string;
  /** Optional title */
  title?: string;
  /** Optional description */
  description?: string;
}

export interface CarouselProps {
  /** Array of carousel items */
  items: CarouselItem[];
  /** Custom class name */
  className?: string;
  /** Auto-play interval in milliseconds (0 to disable) */
  autoPlay?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Enable infinite loop */
  infinite?: boolean;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Gap between slides in pixels */
  gap?: number;
  /** Number of visible slides */
  slidesPerView?: number;
  /** Custom arrow component */
  renderArrow?: (props: {
    direction: "prev" | "next";
    onClick: () => void;
  }) => ReactNode;
  /** Custom dot component */
  renderDot?: (props: {
    index: number;
    active: boolean;
    onClick: () => void;
  }) => ReactNode;
  /** Callback when slide changes */
  onSlideChange?: (index: number) => void;
  /** Visual variant */
  variant?: "default" | "glass" | "minimal";
  /** Height of the carousel */
  height?: string | number;
  /** Custom styles */
  style?: CSSProperties;
  /** Initial slide index */
  initialSlide?: number;
  /** Enable drag to navigate */
  draggable?: boolean;
  /** Animation style for slide transitions */
  animation?: CarouselAnimation;
}
