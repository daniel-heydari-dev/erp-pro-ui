import React from "react";

export type ProgressBarSize = "sm" | "md" | "lg";
export type ProgressBarTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: React.ReactNode;
  percentageLabel?: React.ReactNode;
  showPercentage?: boolean;
  size?: ProgressBarSize;
  tone?: ProgressBarTone;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
  ariaLabel?: string;
}

const sizeStyles: Record<
  ProgressBarSize,
  {
    track: string;
    label: string;
    percentage: string;
  }
> = {
  sm: {
    track: "h-1.5",
    label: "text-xs",
    percentage: "text-xs",
  },
  md: {
    track: "h-2.5",
    label: "text-sm",
    percentage: "text-sm",
  },
  lg: {
    track: "h-3.5",
    label: "text-base",
    percentage: "text-base",
  },
};

const toneStyles: Record<
  ProgressBarTone,
  {
    color: string;
    trackBackground: string;
  }
> = {
  default: {
    color: "var(--ds-chart-1)",
    trackBackground:
      "linear-gradient(90deg, rgba(15, 23, 42, 0.08) 0%, rgba(30, 41, 59, 0.14) 100%)",
  },
  success: {
    color: "var(--ds-chart-3)",
    trackBackground:
      "linear-gradient(90deg, rgba(20, 83, 45, 0.12) 0%, rgba(34, 197, 94, 0.18) 100%)",
  },
  warning: {
    color: "var(--ds-chart-4)",
    trackBackground:
      "linear-gradient(90deg, rgba(120, 53, 15, 0.12) 0%, rgba(245, 158, 11, 0.18) 100%)",
  },
  danger: {
    color: "var(--ds-chart-5)",
    trackBackground:
      "linear-gradient(90deg, rgba(127, 29, 29, 0.12) 0%, rgba(239, 68, 68, 0.18) 100%)",
  },
  info: {
    color: "var(--ds-chart-2)",
    trackBackground:
      "linear-gradient(90deg, rgba(30, 64, 175, 0.12) 0%, rgba(59, 130, 246, 0.18) 100%)",
  },
};

function clampValue(value: number, max: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), max);
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  percentageLabel,
  showPercentage = true,
  size = "md",
  tone = "default",
  className = "",
  trackClassName = "",
  fillClassName = "",
  ariaLabel = "Progress",
}: ProgressBarProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const clampedValue = clampValue(value, safeMax);
  const percentage = (clampedValue / safeMax) * 100;
  const roundedPercentage = Math.round(percentage);
  const toneStyle = toneStyles[tone];
  const resolvedPercentageLabel = percentageLabel ?? `${roundedPercentage}%`;

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between gap-4">
          <div
            className={`font-mono font-semibold tracking-[0.08em] text-ds-1 ${sizeStyles[size].label}`}
          >
            {label}
          </div>
          {showPercentage && (
            <div
              className={`font-mono font-medium tracking-[0.08em] text-ds-2 ${sizeStyles[size].percentage}`}
            >
              {resolvedPercentageLabel}
            </div>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.round(clampedValue)}
        aria-valuetext={`${roundedPercentage}%`}
        className={`relative overflow-hidden rounded-full border border-ds-border-2/50 bg-ds-surface-2/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${sizeStyles[size].track} ${trackClassName}`}
        style={{ background: toneStyle.trackBackground }}
      >
        <div
          className={`h-full rounded-full transition-[width,filter,box-shadow] duration-500 ease-out ${fillClassName}`}
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, color-mix(in srgb, ${toneStyle.color} 68%, white 32%) 0%, ${toneStyle.color} 100%)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), 0 0 14px color-mix(in srgb, ${toneStyle.color} 32%, transparent)`,
            filter: percentage > 0 ? "saturate(1.05) brightness(1.02)" : "none",
          }}
        />
      </div>
    </div>
  );
}
