export type LoadingVariant =
  | "spinner"
  | "dots"
  | "pulse"
  | "bars"
  | "ring"
  | "bounce"
  | "wave"
  | "skeleton";

export type LoadingSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface LoadingProps {
  /** The variant/style of the loading indicator */
  variant?: LoadingVariant;
  /** Size of the loading indicator */
  size?: LoadingSize;
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

const sizeMap: Record<LoadingSize, { container: string; text: string }> = {
  xs: { container: "w-4 h-4", text: "text-xs" },
  sm: { container: "w-6 h-6", text: "text-sm" },
  md: { container: "w-8 h-8", text: "text-sm" },
  lg: { container: "w-12 h-12", text: "text-base" },
  xl: { container: "w-16 h-16", text: "text-lg" },
};

// Spinner - Classic rotating circle
function Spinner({
  size = "md",
  color = "currentColor",
}: {
  size?: LoadingSize;
  color?: string;
}) {
  return (
    <svg
      className={`animate-spin ${sizeMap[size].container}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Dots - Three bouncing dots
function Dots({
  size = "md",
  color = "currentColor",
}: {
  size?: LoadingSize;
  color?: string;
}) {
  const dotSize = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize[size]} rounded-full animate-bounce`}
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  );
}

// Pulse - Pulsing circle
function Pulse({
  size = "md",
  color = "currentColor",
}: {
  size?: LoadingSize;
  color?: string;
}) {
  return (
    <div className={`relative ${sizeMap[size].container}`}>
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-75"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute inset-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// Bars - Audio-style animated bars
function Bars({
  size = "md",
  color = "currentColor",
}: {
  size?: LoadingSize;
  color?: string;
}) {
  const barWidth = {
    xs: "w-0.5",
    sm: "w-1",
    md: "w-1.5",
    lg: "w-2",
    xl: "w-2.5",
  };

  return (
    <div className={`flex items-end gap-0.5 ${sizeMap[size].container}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${barWidth[size]} rounded-sm`}
          style={{
            backgroundColor: color,
            animation: "loading-bars 1s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
            height: "40%",
          }}
        />
      ))}
      <style>{`
        @keyframes loading-bars {
          0%, 100% { height: 40%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
}

// Ring - Rotating ring with gradient
function Ring({
  size = "md",
  color = "currentColor",
}: {
  size?: LoadingSize;
  color?: string;
}) {
  const strokeWidth = {
    xs: 3,
    sm: 3,
    md: 4,
    lg: 4,
    xl: 5,
  };

  return (
    <svg
      className={`animate-spin ${sizeMap[size].container}`}
      viewBox="0 0 50 50"
    >
      <circle
        className="opacity-20"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth[size]}
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth[size]}
        strokeLinecap="round"
        strokeDasharray="80, 200"
        strokeDashoffset="0"
      />
    </svg>
  );
}

// Bounce - Three bouncing circles
function Bounce({
  size = "md",
  color = "currentColor",
}: {
  size?: LoadingSize;
  color?: string;
}) {
  const dotSize = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize[size]} rounded-full`}
          style={{
            backgroundColor: color,
            animation: "loading-bounce 1.4s ease-in-out infinite both",
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes loading-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// Wave - Wave animation
function Wave({
  size = "md",
  color = "currentColor",
}: {
  size?: LoadingSize;
  color?: string;
}) {
  const barHeight = {
    xs: "h-3",
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
    xl: "h-10",
  };
  const barWidth = {
    xs: "w-0.5",
    sm: "w-1",
    md: "w-1",
    lg: "w-1.5",
    xl: "w-2",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${barWidth[size]} ${barHeight[size]} rounded-full`}
          style={{
            backgroundColor: color,
            animation: "loading-wave 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes loading-wave {
          0%, 40%, 100% { transform: scaleY(0.4); }
          20% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

// Skeleton - Loading placeholder
function Skeleton({
  width = "100%",
  height = "1rem",
  rounded = "md",
}: {
  width?: string;
  height?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}) {
  const roundedMap = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={`animate-pulse bg-neutral-200 dark:bg-neutral-700 ${roundedMap[rounded]}`}
      style={{ width, height }}
    />
  );
}

export default function Loading({
  variant = "spinner",
  size = "md",
  color = "#7367f0",
  text,
  textPosition = "right",
  fullScreen = false,
  overlay = false,
  className = "",
  skeletonWidth,
  skeletonHeight,
  skeletonRounded = "md",
}: LoadingProps) {
  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return <Spinner size={size} color={color} />;
      case "dots":
        return <Dots size={size} color={color} />;
      case "pulse":
        return <Pulse size={size} color={color} />;
      case "bars":
        return <Bars size={size} color={color} />;
      case "ring":
        return <Ring size={size} color={color} />;
      case "bounce":
        return <Bounce size={size} color={color} />;
      case "wave":
        return <Wave size={size} color={color} />;
      case "skeleton":
        return (
          <Skeleton
            width={skeletonWidth}
            height={skeletonHeight}
            rounded={skeletonRounded}
          />
        );
      default:
        return <Spinner size={size} color={color} />;
    }
  };

  const content = (
    <div
      className={`inline-flex items-center ${
        textPosition === "bottom" ? "flex-col gap-2" : "flex-row gap-3"
      } ${className}`}
    >
      {renderLoader()}
      {text && (
        <span
          className={`${sizeMap[size].text} text-neutral-600 dark:text-neutral-400 font-medium`}
        >
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm rounded-inherit">
        {content}
      </div>
    );
  }

  return content;
}

// Export individual components for direct use
export { Spinner, Dots, Pulse, Bars, Ring, Bounce, Wave, Skeleton };
