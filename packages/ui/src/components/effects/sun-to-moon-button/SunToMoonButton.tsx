import { useThemeContext } from "../../../foundations/theme";
import { motion } from "framer-motion";

export interface SunToMoonButtonProps {
  showLabelAndImage?: boolean;
}

export default function SunToMoonButton({
  showLabelAndImage = true,
}: SunToMoonButtonProps) {
  const { mode, toggleMode } = useThemeContext();

  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rayVariant = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      // Start from center of the circle
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const shineVariant = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: "20, 1000",
      strokeDashoffset: 0,
      filter: "blur(0px)",
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.75,
      },
    },
  };

  const sunPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  const moonPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";
  const fallbackPath = sunPath;

  // Ensure we have valid paths at all times
  // Light mode = sun, Dark mode = moon
  const currentPath = mode === "light" ? sunPath : moonPath;
  const safeCurrentPath = currentPath || fallbackPath;

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl py-3 text-base font-medium transition duration-200"
      onClick={() => toggleMode()}
    >
      <span className="flex items-center">
        {showLabelAndImage && (
          <span className="mr-2 text-ds-1">
            {mode === "light" ? "Light" : "Dark"}
          </span>
        )}

        <motion.svg
          strokeWidth="4"
          strokeLinecap="round"
          width={20}
          height={20}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          {/* Shine effect for moon in dark mode */}
          {moonPath && (
            <motion.path
              variants={shineVariant}
              d={moonPath}
              className="absolute top-0 left-0 stroke-blue-100"
              initial="hidden"
              animate={mode === "light" ? "hidden" : "visible"}
            />
          )}

          {/* Sun rays - visible in light mode */}
          <motion.g
            variants={raysVariants}
            initial="hidden"
            animate={mode === "dark" ? "hidden" : "visible"}
            style={{
              strokeLinecap: "round",
              strokeWidth: 6,
              stroke: "var(--ds-color-warning)",
            }}
          >
            <motion.path
              className="origin-center"
              variants={rayVariant}
              d="M50 2V11"
            />
            <motion.path variants={rayVariant} d="M85 15L78 22" />
            <motion.path variants={rayVariant} d="M98 50H89" />
            <motion.path variants={rayVariant} d="M85 85L78 78" />
            <motion.path variants={rayVariant} d="M50 98V89" />
            <motion.path variants={rayVariant} d="M23 78L16 84" />
            <motion.path variants={rayVariant} d="M11 50H2" />
            <motion.path variants={rayVariant} d="M23 23L16 16" />
          </motion.g>

          {/* Main path - Light=Sun(yellow), Dark=Moon(blue) */}
          <motion.path
            d={safeCurrentPath}
            fill="transparent"
            transition={{ duration: 1, type: "spring" }}
            initial={false}
            animate={
              mode === "light"
                ? {
                    d: sunPath || fallbackPath,
                    rotate: 0,
                    scale: 1,
                    stroke: "var(--ds-color-warning)",
                    fill: "var(--ds-color-warning)",
                    fillOpacity: 0.5,
                    strokeOpacity: 1,
                  }
                : {
                    d: moonPath || fallbackPath,
                    rotate: -360,
                    scale: 2,
                    stroke: "var(--ds-color-info)",
                    fill: "var(--ds-color-info)",
                    fillOpacity: 0.35,
                    strokeOpacity: 1,
                  }
            }
          />
        </motion.svg>
      </span>
      {showLabelAndImage && (
        <span className="mt-2 flex h-[90px] w-[180px] flex-col items-center justify-center rounded-md bg-ds-surface-2">
          <span className="my-4 flex w-[150px] flex-col rounded-md">
            <span className="mb-1 w-[80px] rounded-full bg-ds-surface-3 p-1"></span>
            <span className="mb-1 w-[100px] rounded-full bg-ds-surface-3 p-1"></span>
            <span className="w-[150px] rounded-full bg-ds-surface-3 p-1"></span>
          </span>
          <span className="my-1 flex w-[150px] justify-between">
            <span className="mb-1 w-[80px] rounded-full bg-ds-surface-3 p-1"></span>
            <span className="mb-1 w-[30px] rounded-full bg-ds-accent p-1"></span>
          </span>
        </span>
      )}
    </button>
  );
}
