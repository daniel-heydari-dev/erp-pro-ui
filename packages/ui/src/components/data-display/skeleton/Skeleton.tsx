import { forwardRef } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps {
  /** The variant shape of the skeleton */
  variant?: SkeletonVariant;
  /** The animation type */
  animation?: SkeletonAnimation;
  /** Width of the skeleton */
  width?: number | string;
  /** Height of the skeleton */
  height?: number | string;
  /** Border radius for rounded variant */
  borderRadius?: number | string;
  /** Custom className */
  className?: string;
  /** Number of lines for text variant */
  lines?: number;
  /** Gap between lines */
  lineGap?: number | string;
  /** Whether the last line should be shorter */
  lastLineWidth?: number | string;
}

export interface SkeletonTextProps extends Omit<SkeletonProps, "variant"> {
  /** Number of text lines */
  lines?: number;
}

export interface SkeletonAvatarProps extends Omit<
  SkeletonProps,
  "variant" | "width" | "height"
> {
  /** Size of the avatar */
  size?: number | string;
}

export interface SkeletonCardProps {
  /** Whether to show image placeholder */
  showImage?: boolean;
  /** Image height */
  imageHeight?: number | string;
  /** Number of text lines */
  lines?: number;
  /** Whether to show avatar */
  showAvatar?: boolean;
  /** Whether to show action buttons */
  showActions?: boolean;
  /** Custom className */
  className?: string;
  /** Animation type */
  animation?: SkeletonAnimation;
}

const animationStyles: Record<SkeletonAnimation, string> = {
  pulse: "animate-pulse",
  wave: "animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 bg-[length:200%_100%]",
  none: "",
};

const variantStyles: Record<SkeletonVariant, string> = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-none",
  rounded: "rounded-lg",
};

// Base Skeleton Component
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      animation = "pulse",
      width,
      height,
      borderRadius,
      className = "",
      lines = 1,
      lineGap = 8,
      lastLineWidth = "80%",
    },
    ref,
  ) => {
    const baseStyles = `
      bg-neutral-200 dark:bg-neutral-700
      ${animation !== "wave" ? animationStyles[animation] : ""}
      ${animation === "wave" ? animationStyles.wave : ""}
      ${variantStyles[variant]}
    `;

    const getSize = () => {
      const style: React.CSSProperties = {};

      if (width) {
        style.width = typeof width === "number" ? `${width}px` : width;
      } else if (variant === "text") {
        style.width = "100%";
      }

      if (height) {
        style.height = typeof height === "number" ? `${height}px` : height;
      } else if (variant === "text") {
        style.height = "1em";
      } else if (variant === "circular") {
        style.width = style.width || "40px";
        style.height = style.width;
      }

      if (borderRadius) {
        style.borderRadius =
          typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;
      }

      return style;
    };

    // Render multiple lines for text variant
    if (variant === "text" && lines > 1) {
      return (
        <div
          ref={ref}
          className={`flex flex-col ${className}`}
          style={{
            gap: typeof lineGap === "number" ? `${lineGap}px` : lineGap,
          }}
        >
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={baseStyles}
              style={{
                ...getSize(),
                width: index === lines - 1 ? lastLineWidth : width || "100%",
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${className}`}
        style={getSize()}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

// Skeleton Text Component
const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, ...props }, ref) => {
    return <Skeleton ref={ref} variant="text" lines={lines} {...props} />;
  },
);

SkeletonText.displayName = "SkeletonText";

// Skeleton Avatar Component
const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 40, animation = "pulse", className = "", ...props }, ref) => {
    const sizeValue = typeof size === "number" ? `${size}px` : size;

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={sizeValue}
        height={sizeValue}
        animation={animation}
        className={className}
        {...props}
      />
    );
  },
);

SkeletonAvatar.displayName = "SkeletonAvatar";

// Skeleton Button Component
const SkeletonButton = forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "variant"> & { size?: "sm" | "md" | "lg" }
>(({ size = "md", animation = "pulse", className = "", ...props }, ref) => {
  const sizeStyles = {
    sm: { width: 80, height: 32 },
    md: { width: 100, height: 40 },
    lg: { width: 120, height: 48 },
  };

  return (
    <Skeleton
      ref={ref}
      variant="rounded"
      width={sizeStyles[size].width}
      height={sizeStyles[size].height}
      animation={animation}
      className={className}
      {...props}
    />
  );
});

SkeletonButton.displayName = "SkeletonButton";

// Skeleton Image Component
const SkeletonImage = forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "variant">
>(
  (
    {
      width = "100%",
      height = 200,
      animation = "pulse",
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <Skeleton
        ref={ref}
        variant="rounded"
        width={width}
        height={height}
        animation={animation}
        className={className}
        {...props}
      />
    );
  },
);

SkeletonImage.displayName = "SkeletonImage";

// Skeleton Card Component
const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      showImage = true,
      imageHeight = 200,
      lines = 3,
      showAvatar = false,
      showActions = false,
      className = "",
      animation = "pulse",
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700 ${className}`}
      >
        {showImage && (
          <SkeletonImage
            height={imageHeight}
            animation={animation}
            borderRadius={0}
          />
        )}

        <div className="p-4 flex flex-col gap-4">
          {showAvatar && (
            <div className="flex items-center gap-3">
              <SkeletonAvatar size={40} animation={animation} />
              <div className="flex-1">
                <Skeleton
                  variant="text"
                  width="60%"
                  height={14}
                  animation={animation}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={12}
                  animation={animation}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          <SkeletonText
            lines={lines}
            animation={animation}
            height={14}
            lineGap={10}
          />

          {showActions && (
            <div className="flex gap-3 mt-2">
              <SkeletonButton size="sm" animation={animation} />
              <SkeletonButton size="sm" animation={animation} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

SkeletonCard.displayName = "SkeletonCard";

// Skeleton Table Row Component
const SkeletonTableRow = forwardRef<
  HTMLDivElement,
  { columns?: number; animation?: SkeletonAnimation; className?: string }
>(({ columns = 4, animation = "pulse", className = "" }, ref) => {
  return (
    <div ref={ref} className={`flex items-center gap-4 py-3 ${className}`}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === 0 ? "20%" : `${Math.floor(80 / (columns - 1))}%`}
          height={16}
          animation={animation}
        />
      ))}
    </div>
  );
});

SkeletonTableRow.displayName = "SkeletonTableRow";

// Skeleton List Item Component
const SkeletonListItem = forwardRef<
  HTMLDivElement,
  {
    showAvatar?: boolean;
    showSecondaryText?: boolean;
    showAction?: boolean;
    animation?: SkeletonAnimation;
    className?: string;
  }
>(
  (
    {
      showAvatar = true,
      showSecondaryText = true,
      showAction = false,
      animation = "pulse",
      className = "",
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={`flex items-center gap-3 py-3 ${className}`}>
        {showAvatar && <SkeletonAvatar size={48} animation={animation} />}
        <div className="flex-1">
          <Skeleton
            variant="text"
            width="70%"
            height={16}
            animation={animation}
          />
          {showSecondaryText && (
            <Skeleton
              variant="text"
              width="50%"
              height={14}
              animation={animation}
              className="mt-2"
            />
          )}
        </div>
        {showAction && <SkeletonButton size="sm" animation={animation} />}
      </div>
    );
  },
);

SkeletonListItem.displayName = "SkeletonListItem";

export default Skeleton;
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonImage,
  SkeletonCard,
  SkeletonTableRow,
  SkeletonListItem,
};
