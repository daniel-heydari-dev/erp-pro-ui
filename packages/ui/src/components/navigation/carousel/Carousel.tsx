import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";
import type { CarouselProps, CarouselAnimation } from "./types";

const variantStyles = {
  default: "ui:bg-ds-surface-1 ui:shadow-xl",
  glass:
    "ui:bg-ds-surface-1/70 ui:backdrop-blur-2xl ui:border ui:border-ds-border-2",
  minimal: "ui:bg-transparent",
};

// Animation variants for different carousel transitions
const getAnimationVariants = (animation: CarouselAnimation) => {
  const variants = {
    slide: {
      enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      }),
      center: { x: 0, opacity: 1 },
      exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      }),
    },
    fade: {
      enter: () => ({ opacity: 0 }),
      center: { opacity: 1 },
      exit: () => ({ opacity: 0 }),
    },
    scale: {
      enter: (direction: number) => ({
        scale: 0.8,
        opacity: 0,
        x: direction > 0 ? 50 : -50,
      }),
      center: { scale: 1, opacity: 1, x: 0 },
      exit: (direction: number) => ({
        scale: 0.8,
        opacity: 0,
        x: direction < 0 ? 50 : -50,
      }),
    },
    flip: {
      enter: (direction: number) => ({
        rotateY: direction > 0 ? 90 : -90,
        opacity: 0,
      }),
      center: { rotateY: 0, opacity: 1 },
      exit: (direction: number) => ({
        rotateY: direction < 0 ? 90 : -90,
        opacity: 0,
      }),
    },
    cube: {
      enter: (direction: number) => ({
        rotateY: direction > 0 ? 90 : -90,
        x: direction > 0 ? "50%" : "-50%",
        opacity: 0,
        scale: 0.8,
      }),
      center: { rotateY: 0, x: 0, opacity: 1, scale: 1 },
      exit: (direction: number) => ({
        rotateY: direction < 0 ? 90 : -90,
        x: direction < 0 ? "50%" : "-50%",
        opacity: 0,
        scale: 0.8,
      }),
    },
    cards: {
      enter: (direction: number) => ({
        scale: 0.9,
        opacity: 0,
        y: direction > 0 ? 100 : -100,
        rotateZ: direction > 0 ? 5 : -5,
      }),
      center: { scale: 1, opacity: 1, y: 0, rotateZ: 0 },
      exit: (direction: number) => ({
        scale: 0.9,
        opacity: 0,
        y: direction < 0 ? 100 : -100,
        rotateZ: direction < 0 ? 5 : -5,
      }),
    },
  };
  return variants[animation];
};

// Transition configs for each animation
const getTransitionConfig = (
  animation: CarouselAnimation,
  duration: number,
) => {
  const durationSec = duration / 1000;
  const configs: Record<CarouselAnimation, object> = {
    slide: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: durationSec },
    },
    fade: {
      opacity: { duration: durationSec, ease: "easeInOut" },
    },
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      opacity: { duration: durationSec },
    },
    flip: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      opacity: { duration: durationSec * 0.5 },
    },
    cube: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      opacity: { duration: durationSec * 0.5 },
    },
    cards: {
      type: "spring",
      stiffness: 150,
      damping: 20,
      opacity: { duration: durationSec },
    },
  };
  return configs[animation];
};

export const Carousel = ({
  items,
  className,
  autoPlay = 0,
  showArrows = true,
  showDots = true,
  infinite = true,
  pauseOnHover = true,
  animationDuration = 500,
  // gap and slidesPerView reserved for future multi-slide support
  gap: _gap = 0,
  slidesPerView: _slidesPerView = 1,
  renderArrow,
  renderDot,
  onSlideChange,
  variant = "glass",
  height = 400,
  style,
  initialSlide = 0,
  draggable = true,
  animation = "slide",
}: CarouselProps) => {
  const animationVariants = getAnimationVariants(animation);
  const transitionConfig = getTransitionConfig(animation, animationDuration);
  const [[currentIndex, direction], setSlide] = useState([initialSlide, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSlides = items.length;

  const goToSlide = useCallback(
    (index: number, dir?: number) => {
      let newIndex = index;
      if (infinite) {
        if (index < 0) newIndex = totalSlides - 1;
        else if (index >= totalSlides) newIndex = 0;
      } else {
        if (index < 0) newIndex = 0;
        else if (index >= totalSlides) newIndex = totalSlides - 1;
      }
      const newDirection = dir ?? (newIndex > currentIndex ? 1 : -1);
      setSlide([newIndex, newDirection]);
      onSlideChange?.(newIndex);
    },
    [currentIndex, infinite, totalSlides, onSlideChange],
  );

  const goNext = useCallback(
    () => goToSlide(currentIndex + 1, 1),
    [currentIndex, goToSlide],
  );
  const goPrev = useCallback(
    () => goToSlide(currentIndex - 1, -1),
    [currentIndex, goToSlide],
  );

  // Auto-play
  useEffect(() => {
    if (autoPlay > 0 && !isPaused) {
      intervalRef.current = setInterval(goNext, autoPlay);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, isPaused, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Drag handling
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: {
      offset: { x: number; y: number };
      velocity: { x: number; y: number };
    },
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold) goNext();
    else if (info.offset.x > threshold) goPrev();
  };

  const currentItem = items[currentIndex];

  return (
    <div
      className={mergeClassNames(
        "ui:relative ui:overflow-hidden ui:rounded-2xl ui:w-full",
        variantStyles[variant],
        className,
      )}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={animationVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transitionConfig}
          drag={draggable ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="ui:absolute ui:inset-0 ui:flex ui:items-center ui:justify-center ui:cursor-grab active:ui:cursor-grabbing"
          style={{
            perspective:
              animation === "flip" || animation === "cube" ? 1000 : undefined,
          }}
        >
          {currentItem.image ? (
            <div className="ui:relative ui:w-full ui:h-full">
              <img
                src={currentItem.image}
                alt={currentItem.alt || currentItem.title || "Carousel slide"}
                className="ui:w-full ui:h-full ui:object-cover"
              />
              {(currentItem.title || currentItem.description) && (
                <div className="ui:absolute ui:bottom-0 ui:left-0 ui:right-0 ui:p-6 ui:bg-gradient-to-t ui:from-black/70 ui:to-transparent">
                  {currentItem.title && (
                    <h3 className="ui:text-2xl ui:font-bold ui:text-ds-on-accent ui:mb-2">
                      {currentItem.title}
                    </h3>
                  )}
                  {currentItem.description && (
                    <p className="ui:text-ds-on-accent/80">
                      {currentItem.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="ui:w-full ui:h-full ui:flex ui:items-center ui:justify-center ui:p-6">
              {currentItem.content}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          {renderArrow ? (
            <>
              {renderArrow({ direction: "prev", onClick: goPrev })}
              {renderArrow({ direction: "next", onClick: goNext })}
            </>
          ) : (
            <>
              <motion.button
                type="button"
                onClick={goPrev}
                className="ui:absolute ui:left-4 ui:top-1/2 ui:-translate-y-1/2 ui:z-20 ui:p-2 ui:rounded-full ui:bg-ds-surface-1/85 ui:backdrop-blur-sm ui:text-ds-1 ui:shadow-lg ui:transition-all hover:ui:bg-ds-surface-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="ui:w-6 ui:h-6" aria-hidden="true" />
              </motion.button>
              <motion.button
                type="button"
                onClick={goNext}
                className="ui:absolute ui:right-4 ui:top-1/2 ui:-translate-y-1/2 ui:z-20 ui:p-2 ui:rounded-full ui:bg-ds-surface-1/85 ui:backdrop-blur-sm ui:text-ds-1 ui:shadow-lg ui:transition-all hover:ui:bg-ds-surface-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next slide"
              >
                <ChevronRightIcon
                  className="ui:w-6 ui:h-6"
                  aria-hidden="true"
                />
              </motion.button>
            </>
          )}
        </>
      )}

      {/* Dot Indicators */}
      {showDots && totalSlides > 1 && (
        <div className="ui:absolute ui:bottom-4 ui:left-1/2 ui:-translate-x-1/2 ui:z-20 ui:flex ui:gap-2 ui:rounded-full ui:bg-ds-surface-1/30 ui:p-2 ui:backdrop-blur-sm">
          {items.map((_, index) =>
            renderDot ? (
              renderDot({
                index,
                active: index === currentIndex,
                onClick: () => goToSlide(index),
              })
            ) : (
              <motion.button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={mergeClassNames(
                  "ui:rounded-full ui:transition-all ui:duration-300",
                  index === currentIndex
                    ? "ui:h-2.5 ui:w-8 ui:bg-ds-accent ui:shadow-lg"
                    : "ui:h-2.5 ui:w-2.5 ui:bg-ds-surface-3 hover:ui:bg-ds-border-3",
                )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ),
          )}
        </div>
      )}

      {/* Progress indicator */}
      {autoPlay > 0 && !isPaused && (
        <motion.div
          className="ui:absolute ui:bottom-0 ui:left-0 ui:h-1 ui:bg-ds-accent/80 ui:rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoPlay / 1000, ease: "linear" }}
          key={currentIndex}
        />
      )}
    </div>
  );
};

Carousel.displayName = "Carousel";

export default Carousel;
