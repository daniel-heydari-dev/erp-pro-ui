import { useRef, type ComponentType } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { mergeClassNames } from "../../../utils";
import type { GradualBlurProps } from "./types";

export const GradualBlur = ({
  children,
  duration = 0.5,
  delay = 0,
  blur = 8,
  triggerOnView = true,
  triggerOnce = true,
  threshold = 0.05,
  visible = false,
  direction = "none",
  distance = 20,
  className,
  as = "div",
}: GradualBlurProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const getInitialPosition = () => {
    switch (direction) {
      case "top":
        return { y: -distance };
      case "bottom":
        return { y: distance };
      case "left":
        return { x: -distance };
      case "right":
        return { x: distance };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPosition = getInitialPosition();

  const variants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blur}px)`,
      ...initialPosition,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
    },
  };

  const MotionComponent = motion.create(as as string) as ComponentType<
    HTMLMotionProps<"div">
  >;

  return (
    <MotionComponent
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={!triggerOnView ? (visible ? "visible" : "hidden") : undefined}
      whileInView={triggerOnView ? "visible" : undefined}
      viewport={{
        once: triggerOnce,
        amount: threshold,
        margin: "0px 0px -50px 0px", // Slight bottom margin to trigger earlier
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        filter: { duration: duration },
        opacity: { duration: duration },
      }}
      className={mergeClassNames("relative", className)}
    >
      {children}
    </MotionComponent>
  );
};
