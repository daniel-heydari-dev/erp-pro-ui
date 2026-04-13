import { mergeClassNames } from "../../../utils";

export type CircularProgressTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  tone?: CircularProgressTone;
  showValue?: boolean;
  valueLabel?: string;
  className?: string;
  trackClassName?: string;
  progressClassName?: string;
  ariaLabel?: string;
}

const toneColorMap: Record<CircularProgressTone, string> = {
  default: "var(--ds-chart-1)",
  success: "var(--ds-chart-3)",
  warning: "var(--ds-chart-4)",
  danger: "var(--ds-chart-5)",
  info: "var(--ds-chart-2)",
};

function clamp(value: number, max: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), max);
}

export default function CircularProgress({
  value,
  max = 100,
  size = 24,
  strokeWidth = 3,
  tone = "default",
  showValue = false,
  valueLabel,
  className,
  trackClassName,
  progressClassName,
  ariaLabel = "Circular progress",
}: CircularProgressProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = clamp(value, safeMax);
  const percentage = (safeValue / safeMax) * 100;

  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;
  const label = valueLabel ?? `${Math.round(percentage)}%`;

  return (
    <span
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={Math.round(safeValue)}
      aria-valuetext={label}
      className={mergeClassNames(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--ds-border-2)"
          strokeOpacity={0.5}
          strokeWidth={strokeWidth}
          className={trackClassName}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={toneColorMap[tone]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={mergeClassNames(
            "transition-[stroke-dashoffset] duration-500 ease-out",
            progressClassName,
          )}
        />
      </svg>

      {showValue ? (
        <span className="absolute text-[10px] font-semibold leading-none text-ds-1">
          {Math.round(percentage)}
        </span>
      ) : null}
    </span>
  );
}

export { CircularProgress };
