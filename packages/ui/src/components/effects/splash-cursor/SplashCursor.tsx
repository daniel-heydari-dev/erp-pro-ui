import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mergeClassNames } from "../../../utils";
import type { SplashCursorProps, Particle } from "./types";

const sizeConfig = {
  sm: { base: 20, variance: 10 },
  md: { base: 40, variance: 20 },
  lg: { base: 60, variance: 30 },
  xl: { base: 100, variance: 50 },
};

const defaultColors = [
  "#7367f0",
  "#9b87f5",
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#c4b5fd",
];

export const SplashCursor = ({
  className,
  color,
  secondaryColor,
  size = "md",
  particleCount = 12,
  enabled = true,
  blur = 0,
  opacity = 0.6,
  duration = 800,
  smooth = true,
  smoothFactor = 0.15,
  style,
  children,
  variant = "splash",
}: SplashCursorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const particleIdRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Smooth cursor following
  useEffect(() => {
    if (!smooth || !enabled) return;

    const animate = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * smoothFactor,
        y: prev.y + (mousePos.y - prev.y) * smoothFactor,
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, smooth, smoothFactor, enabled]);

  const getRandomColor = useCallback(() => {
    if (color && secondaryColor) {
      return Math.random() > 0.5 ? color : secondaryColor;
    }
    if (color) return color;
    return defaultColors[Math.floor(Math.random() * defaultColors.length)];
  }, [color, secondaryColor]);

  const createParticles = useCallback(
    (x: number, y: number) => {
      const config = sizeConfig[size];
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance =
          variant === "ripple" ? config.base : Math.random() * config.variance;

        newParticles.push({
          id: particleIdRef.current++,
          x: x + Math.cos(angle) * distance * (variant === "ripple" ? 0 : 1),
          y: y + Math.sin(angle) * distance * (variant === "ripple" ? 0 : 1),
          size: config.base * 0.3 + Math.random() * config.base * 0.4,
          opacity: opacity * (0.5 + Math.random() * 0.5),
          color: getRandomColor(),
        });
      }

      setParticles((prev) => [...prev.slice(-50), ...newParticles]);

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
        );
      }, duration);
    },
    [size, particleCount, opacity, duration, getRandomColor, variant],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      // Create splash effect on movement
      if (variant === "splash" || variant === "trail") {
        if (Math.random() > (variant === "trail" ? 0.7 : 0.85)) {
          createParticles(x, y);
        }
      }
    },
    [enabled, createParticles, variant],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create burst effect on click
      createParticles(x, y);
      if (variant === "ripple") {
        setTimeout(() => createParticles(x, y), 100);
        setTimeout(() => createParticles(x, y), 200);
      }
    },
    [enabled, createParticles, variant],
  );

  const getParticleAnimation = (particle: Particle) => {
    const config = sizeConfig[size];

    switch (variant) {
      case "glow":
        return {
          initial: { scale: 0, opacity: particle.opacity },
          animate: { scale: 2, opacity: 0 },
          exit: { scale: 3, opacity: 0 },
        };
      case "trail":
        return {
          initial: { scale: 1, opacity: particle.opacity, y: 0 },
          animate: { scale: 0.5, opacity: 0, y: 20 },
          exit: { scale: 0, opacity: 0 },
        };
      case "ripple":
        return {
          initial: { scale: 0, opacity: particle.opacity },
          animate: { scale: 4, opacity: 0 },
          exit: { scale: 5, opacity: 0 },
        };
      default: // splash
        const angle = Math.random() * Math.PI * 2;
        const distance = config.base + Math.random() * config.variance;
        return {
          initial: { scale: 0, opacity: particle.opacity, x: 0, y: 0 },
          animate: {
            scale: [0, 1.2, 0.8],
            opacity: [particle.opacity, particle.opacity * 0.8, 0],
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
          },
          exit: { scale: 0, opacity: 0 },
        };
    }
  };

  const cursorPos = smooth ? smoothPos : mousePos;

  return (
    <div
      ref={containerRef}
      className={mergeClassNames("relative overflow-hidden", className)}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onClick={handleClick}
    >
      {/* Cursor glow effect */}
      {enabled && isInside && variant === "glow" && (
        <motion.div
          className="pointer-events-none absolute z-10"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: sizeConfig[size].base * 2,
            height: sizeConfig[size].base * 2,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${color || defaultColors[0]}40 0%, transparent 70%)`,
            filter: blur ? `blur(${blur}px)` : undefined,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        />
      )}

      {/* Particles */}
      <AnimatePresence>
        {enabled &&
          particles.map((particle) => {
            const animation = getParticleAnimation(particle);
            return (
              <motion.div
                key={particle.id}
                className="pointer-events-none absolute rounded-full z-20"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  transform: "translate(-50%, -50%)",
                  filter: blur ? `blur(${blur}px)` : undefined,
                }}
                {...animation}
                transition={{
                  duration: duration / 1000,
                  ease: "easeOut",
                }}
              />
            );
          })}
      </AnimatePresence>

      {/* Children content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
};

SplashCursor.displayName = "SplashCursor";

export default SplashCursor;
