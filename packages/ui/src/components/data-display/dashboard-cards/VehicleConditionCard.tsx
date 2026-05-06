"use client";

import type { FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface VehicleConditionItem {
  label: string;
  /** Secondary descriptor, e.g. "24 vehicles" or "all exceptions". */
  sublabel: string;
  /** Arc fill percentage (0–100). */
  percentage: number;
  /** CSS color for the progress arc and the label text. */
  color: string;
  /** Badge content shown on the right, e.g. "+10%", "8.1", "-2.5%". */
  badge: string;
}

export interface VehicleConditionCardProps {
  title?: string;
  items: VehicleConditionItem[];
  className?: string;
  onMenuClick?: () => void;
}

// ── Mini circular gauge ───────────────────────────────────────────────────────

const MiniGauge: FC<{ percentage: number; color: string; size?: number }> = ({
  percentage,
  color,
  size = 62,
}) => {
  const strokeWidth = 4;
  const r = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percentage));
  const dashOffset = circumference - (clamped / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      {/* Background track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--ds-color-border)"
        strokeWidth={strokeWidth}
      />
      {/* Progress arc */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* Percentage label */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.21}
        fontWeight="700"
        fill="var(--ds-color-fg)"
      >
        {clamped}%
      </text>
    </svg>
  );
};

// ── VehicleConditionCard ──────────────────────────────────────────────────────

export const VehicleConditionCard: FC<VehicleConditionCardProps> = ({
  title = "Vehicle Condition",
  items,
  className,
  onMenuClick,
}) => (
  <div
    className={mergeClassNames(
      "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
      className,
    )}
  >
    {/* ── Header ─────────────────────────────────────────────────────────── */}
    <div className="flex items-start justify-between px-5 pb-2 pt-5">
      <p className="text-base font-bold text-ds-1">{title}</p>
      <Button
        variant="tertiary"
        size="small"
        className="shrink-0 p-0.5! text-ds-3"
        aria-label="More options"
        onClick={onMenuClick}
      >
        <EllipsisVerticalIcon width={18} height={18} />
      </Button>
    </div>

    {/* ── Item list ──────────────────────────────────────────────────────── */}
    <div className="divide-y divide-ds-border-3/50 px-5 pb-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-4 py-3">
          {/* Mini gauge */}
          <div className="shrink-0">
            <MiniGauge percentage={item.percentage} color={item.color} />
          </div>

          {/* Label + sublabel */}
          <div className="min-w-0 flex-1">
            <p
              className="text-sm font-semibold leading-tight"
              style={{ color: item.color }}
            >
              {item.label}
            </p>
            <p className="mt-0.5 text-xs text-ds-3">{item.sublabel}</p>
          </div>

          {/* Badge */}
          <span className="shrink-0 rounded-md bg-ds-surface-2 px-2.5 py-1 text-xs font-semibold text-ds-2">
            {item.badge}
          </span>
        </div>
      ))}
    </div>
  </div>
);
