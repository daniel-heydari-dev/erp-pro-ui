import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { mergeClassNames } from "../../../utils";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";
export type SkeletonTone =
  | "default"
  | "subtle"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type SkeletonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type SkeletonSpeed = "slow" | "normal" | "fast";

type SkeletonCssVariables = CSSProperties &
  Record<
    "--ui-skeleton-base" | "--ui-skeleton-highlight" | "--ui-skeleton-duration",
    string
  >;

export interface SkeletonProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> {
  /** The variant shape of the skeleton */
  variant?: SkeletonVariant;
  /** The animation type */
  animation?: SkeletonAnimation;
  /** Width of the skeleton */
  width?: number | string;
  /** Height of the skeleton */
  height?: number | string;
  /** Border radius override */
  borderRadius?: number | string;
  /** Semantic radius preset */
  radius?: SkeletonRadius;
  /** Semantic tone preset */
  tone?: SkeletonTone;
  /** Animation speed preset or custom duration */
  speed?: SkeletonSpeed | number | string;
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
  /** Semantic tone preset */
  tone?: SkeletonTone;
}

export interface SkeletonMetricCardProps {
  /** Whether to show a compact trend badge */
  showTrend?: boolean;
  /** Whether to render spark bars */
  showChart?: boolean;
  /** Number of spark bars */
  chartBars?: number;
  /** Width for the value block */
  valueWidth?: number | string;
  /** Custom className */
  className?: string;
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Semantic tone preset */
  tone?: SkeletonTone;
}

const animationStyles: Record<SkeletonAnimation, string> = {
  pulse: "ui-skeleton-pulse",
  wave: "ui-skeleton-wave",
  none: "",
};

const radiusStyles: Record<SkeletonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const variantStyles: Record<SkeletonVariant, SkeletonRadius> = {
  text: "sm",
  circular: "full",
  rectangular: "none",
  rounded: "md",
};

const speedStyles: Record<SkeletonSpeed, string> = {
  slow: "2.4s",
  normal: "1.6s",
  fast: "1.05s",
};

const toneStyles: Record<SkeletonTone, { base: string; highlight: string }> = {
  default: {
    base: "var(--color-muted)",
    highlight:
      "color-mix(in oklch, var(--color-muted) 54%, var(--color-background))",
  },
  subtle: {
    base: "color-mix(in oklch, var(--color-muted) 72%, var(--color-background))",
    highlight:
      "color-mix(in oklch, var(--color-muted) 42%, var(--color-background))",
  },
  accent: {
    base: "var(--color-accent-subtle)",
    highlight:
      "color-mix(in oklch, var(--color-accent-subtle) 48%, var(--color-background))",
  },
  success: {
    base: "var(--color-success-subtle)",
    highlight:
      "color-mix(in oklch, var(--color-success-subtle) 48%, var(--color-background))",
  },
  warning: {
    base: "var(--color-warning-subtle)",
    highlight:
      "color-mix(in oklch, var(--color-warning-subtle) 48%, var(--color-background))",
  },
  danger: {
    base: "var(--color-danger-subtle)",
    highlight:
      "color-mix(in oklch, var(--color-danger-subtle) 48%, var(--color-background))",
  },
  info: {
    base: "var(--color-info-subtle)",
    highlight:
      "color-mix(in oklch, var(--color-info-subtle) 48%, var(--color-background))",
  },
};

function resolveDimension(value?: number | string): string | undefined {
  if (typeof value === "number") {
    return `${value}px`;
  }

  return value;
}

function resolveDuration(value: SkeletonProps["speed"]): string {
  if (typeof value === "number") {
    return `${value}ms`;
  }

  if (typeof value === "string" && value in speedStyles) {
    return speedStyles[value as SkeletonSpeed];
  }

  return value ?? speedStyles.normal;
}

function getDimensionStyle({
  variant,
  width,
  height,
  borderRadius,
}: {
  variant: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
}): CSSProperties {
  const nextStyle: CSSProperties = {};
  const resolvedWidth = resolveDimension(width);
  const resolvedHeight = resolveDimension(height);
  const resolvedBorderRadius = resolveDimension(borderRadius);

  if (resolvedWidth) {
    nextStyle.width = resolvedWidth;
  } else if (variant === "text") {
    nextStyle.width = "100%";
  }

  if (resolvedHeight) {
    nextStyle.height = resolvedHeight;
  } else if (variant === "text") {
    nextStyle.height = "1em";
  } else if (variant === "circular") {
    nextStyle.width = nextStyle.width || "40px";
    nextStyle.height = nextStyle.width;
  }

  if (resolvedBorderRadius) {
    nextStyle.borderRadius = resolvedBorderRadius;
  }

  return nextStyle;
}

// Base Skeleton Component
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      animation = "pulse",
      width,
      height,
      borderRadius,
      radius,
      tone = "default",
      speed = "normal",
      className,
      lines = 1,
      lineGap = 8,
      lastLineWidth = "80%",
      style,
      ["aria-hidden"]: ariaHidden,
      ...rest
    },
    ref,
  ) => {
    const toneStyle = toneStyles[tone];
    const sharedStyle: SkeletonCssVariables = {
      "--ui-skeleton-base": toneStyle.base,
      "--ui-skeleton-highlight": toneStyle.highlight,
      "--ui-skeleton-duration": resolveDuration(speed),
      ...style,
    };
    const effectiveRadius = radius ?? variantStyles[variant];
    const sharedClassName = mergeClassNames(
      "relative overflow-hidden bg-[var(--ui-skeleton-base)] pointer-events-none select-none shrink-0",
      radiusStyles[effectiveRadius],
      animationStyles[animation],
    );

    if (variant === "text" && lines > 1) {
      return (
        <div
          ref={ref}
          className={mergeClassNames("flex flex-col", className)}
          style={{
            ...style,
            gap: resolveDimension(lineGap),
            width: resolveDimension(width) ?? style?.width,
          }}
          aria-hidden={ariaHidden ?? true}
          data-animation={animation}
          data-tone={tone}
          {...rest}
        >
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={sharedClassName}
              style={{
                ...sharedStyle,
                ...getDimensionStyle({
                  variant,
                  width:
                    index === lines - 1 ? lastLineWidth : (width ?? "100%"),
                  height,
                  borderRadius,
                }),
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={mergeClassNames(sharedClassName, className)}
        style={{
          ...sharedStyle,
          ...getDimensionStyle({ variant, width, height, borderRadius }),
        }}
        aria-hidden={ariaHidden ?? true}
        data-animation={animation}
        data-tone={tone}
        {...rest}
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
      className,
      animation = "pulse",
      tone = "default",
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={mergeClassNames(
          "overflow-hidden rounded-md border border-border bg-card shadow-sm",
          className,
        )}
      >
        {showImage && (
          <SkeletonImage
            height={imageHeight}
            animation={animation}
            borderRadius={0}
            tone={tone}
          />
        )}

        <div className="p-4 flex flex-col gap-4">
          {showAvatar && (
            <div className="flex items-center gap-3">
              <SkeletonAvatar size={40} animation={animation} tone={tone} />
              <div className="flex-1">
                <Skeleton
                  variant="text"
                  width="60%"
                  height={14}
                  animation={animation}
                  tone={tone}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={12}
                  animation={animation}
                  tone={tone}
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
            tone={tone}
          />

          {showActions && (
            <div className="flex gap-3 mt-2">
              <SkeletonButton size="sm" animation={animation} tone={tone} />
              <SkeletonButton size="sm" animation={animation} tone={tone} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

SkeletonCard.displayName = "SkeletonCard";

// Skeleton Metric Card Component
const SkeletonMetricCard = forwardRef<HTMLDivElement, SkeletonMetricCardProps>(
  (
    {
      showTrend = true,
      showChart = true,
      chartBars = 7,
      valueWidth = "52%",
      className,
      animation = "wave",
      tone = "accent",
    },
    ref,
  ) => {
    const chartHeights = [36, 52, 46, 72, 64, 84, 68, 78];

    return (
      <div
        ref={ref}
        className={mergeClassNames(
          "rounded-md border border-border bg-card p-4 shadow-sm",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-3">
            <Skeleton
              width="34%"
              height={11}
              animation={animation}
              tone="subtle"
            />
            <Skeleton
              width={valueWidth}
              height={28}
              animation={animation}
              tone={tone}
              radius="md"
            />
            <Skeleton
              width="44%"
              height={12}
              animation={animation}
              tone="subtle"
            />
          </div>

          {showTrend ? (
            <div className="rounded-full border border-border bg-surface px-3 py-2">
              <Skeleton
                width={54}
                height={12}
                animation={animation}
                tone="subtle"
              />
            </div>
          ) : null}
        </div>

        {showChart ? (
          <div className="mt-5 flex h-20 items-end gap-2">
            {Array.from({ length: chartBars }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="100%"
                height={`${chartHeights[index % chartHeights.length]}%`}
                animation={animation}
                tone={tone}
                className="flex-1"
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

SkeletonMetricCard.displayName = "SkeletonMetricCard";

// Skeleton Table Row Component
const SkeletonTableRow = forwardRef<
  HTMLDivElement,
  { columns?: number; animation?: SkeletonAnimation; className?: string }
>(({ columns = 4, animation = "pulse", className = "" }, ref) => {
  const sharedWidth =
    columns <= 1 ? "100%" : `${Math.floor(72 / (columns - 1))}%`;

  return (
    <div ref={ref} className={`flex items-center gap-4 py-3 ${className}`}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === 0 ? "28%" : sharedWidth}
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
  SkeletonMetricCard,
  SkeletonTableRow,
  SkeletonListItem,
};
