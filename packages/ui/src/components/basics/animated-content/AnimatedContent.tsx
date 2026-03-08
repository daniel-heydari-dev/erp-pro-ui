import { useEffect, useRef, useState } from "react";
import { motion, useInView, type TargetAndTransition } from "framer-motion";
import type { AnimatedContentProps, AnimationPreset, AnimationEase } from "./types";

// Easing function mappings
const easingMap: Record<AnimationEase, number[] | string> = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  circIn: [0.55, 0, 1, 0.45],
  circOut: [0, 0.55, 0.45, 1],
  circInOut: [0.85, 0, 0.15, 1],
  backIn: [0.36, 0, 0.66, -0.56],
  backOut: [0.34, 1.56, 0.64, 1],
  backInOut: [0.68, -0.6, 0.32, 1.6],
  anticipate: "anticipate",
  bounce: "easeOut",
  elastic: "easeOut",
};

// Get spring config for bouncy/elastic animations
const getSpringConfig = (ease: AnimationEase) => {
  switch (ease) {
    case "bounce":
      return { type: "spring" as const, damping: 8, stiffness: 200, bounce: 0.5 };
    case "elastic":
      return { type: "spring" as const, damping: 10, stiffness: 100 };
    default:
      return null;
  }
};

// Preset animation configurations
const getPresetAnimation = (
  preset: AnimationPreset,
  distance: number,
  initialOpacity: number,
  initialScale: number,
  reverse: boolean
): { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition } => {
  const dir = reverse ? -1 : 1;

  const presets: Record<AnimationPreset, { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition }> = {
    fade: {
      initial: { opacity: initialOpacity },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      initial: { opacity: initialOpacity, scale: initialScale },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: initialScale },
    },
    slideUp: {
      initial: { opacity: initialOpacity, y: distance * dir },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: (distance / 2) * dir },
    },
    slideDown: {
      initial: { opacity: initialOpacity, y: -distance * dir },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: (-distance / 2) * dir },
    },
    slideLeft: {
      initial: { opacity: initialOpacity, x: distance * dir },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: (distance / 2) * dir },
    },
    slideRight: {
      initial: { opacity: initialOpacity, x: -distance * dir },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: (-distance / 2) * dir },
    },
    elastic: {
      initial: { opacity: initialOpacity, scale: initialScale, y: distance / 2 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.8, y: distance / 4 },
    },
    bounce: {
      initial: { opacity: initialOpacity, scale: initialScale, y: -distance },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.5, y: -distance / 2 },
    },
    flip: {
      initial: { opacity: initialOpacity, rotateX: -90 * dir, scale: 0.9 },
      animate: { opacity: 1, rotateX: 0, scale: 1 },
      exit: { opacity: 0, rotateX: 90 * dir, scale: 0.9 },
    },
    zoom: {
      initial: { opacity: initialOpacity, scale: 0, rotate: -10 * dir },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      exit: { opacity: 0, scale: 0.5, rotate: 5 * dir },
    },
    custom: {
      initial: { opacity: initialOpacity },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  return presets[preset];
};

export const AnimatedContent = ({
  children,
  preset = "fade",
  direction = "vertical",
  ease = "easeOut",
  exitEase,
  reverse = false,
  animateOpacity = true,
  distance = 50,
  duration = 0.5,
  delay = 0,
  initialOpacity = 0,
  initialScale = 0.9,
  threshold = 0.1,
  disappearAfter = 0,
  disappearDuration = 0.3,
  triggerOnView = false,
  triggerOnce = true,
  className = "",
  as = "div",
}: AnimatedContentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold
  });
  const [isVisible, setIsVisible] = useState(!triggerOnView);
  const [hasDisappeared, setHasDisappeared] = useState(false);

  // Handle view-triggered animation
  useEffect(() => {
    if (triggerOnView && isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, triggerOnView, isVisible]);

  // Handle disappear after timeout
  useEffect(() => {
    if (disappearAfter > 0 && isVisible && !hasDisappeared) {
      const timer = setTimeout(() => {
        setHasDisappeared(true);
      }, disappearAfter * 1000);
      return () => clearTimeout(timer);
    }
  }, [disappearAfter, isVisible, hasDisappeared]);

  // Get animation config
  const opacity = animateOpacity ? initialOpacity : 1;
  const animation = getPresetAnimation(preset, distance, opacity, initialScale, reverse);

  // Get transition config
  const springConfig = getSpringConfig(ease);
  const easingValue = easingMap[ease];

  const transition = springConfig || {
    duration,
    delay,
    ease: (typeof easingValue === "string" ? easingValue : easingValue) as any,
  };

  const exitTransition = exitEase
    ? { duration: disappearDuration, ease: easingMap[exitEase] }
    : { duration: disappearDuration };

  // Determine current animation state
  const shouldAnimate = triggerOnView ? isVisible : true;
  const currentState = hasDisappeared ? "exit" : shouldAnimate ? "animate" : "initial";

  const MotionComponent = (motion as any)[as] || motion.div;

  return (
    <MotionComponent
      ref={ref as any}
      className={className}
      initial={animation.initial}
      animate={currentState === "animate" ? animation.animate : currentState === "exit" ? animation.exit : animation.initial}
      transition={(currentState === "exit" ? exitTransition : transition) as any}
      style={{ perspective: preset === "flip" ? 1000 : undefined }}
    >
      {children}
    </MotionComponent>
  );
};
