"use client";

import type { FC, ReactNode } from "react";

import { mergeClassNames } from "../../../utils";

// ── TrendBadge (inline, no menu needed for this card) ────────────────────────

const TrendBadge: FC<{ value: string; direction: "up" | "down" }> = ({
  value,
  direction,
}) => {
  const isUp = direction === "up";
  const color = isUp ? "var(--ds-color-success)" : "var(--ds-color-danger)";
  const bg = isUp ? "var(--ds-color-success-subtle)" : "var(--ds-color-danger-subtle)";
  return (
    <span
      className="text-sm font-semibold"
      style={{ color, backgroundColor: bg }}
      aria-label={`${value} ${isUp ? "increase" : "decrease"}`}
    >
      {value}
    </span>
  );
};

// ── Public types ──────────────────────────────────────────────────────────────

export interface SalesMetric {
  icon: ReactNode;
  label: string;
  /** Main percentage or rate displayed large (e.g. "62.2%"). */
  percentage: string;
  /** Secondary sub-count displayed small below (e.g. "6,440"). */
  count: string;
  /** CSS color for the metric's segment of the dual progress bar. */
  color: string;
}

export interface SalesOverviewCardProps {
  title?: string;
  badge?: { value: string; direction: "up" | "down" };
  /** Hero value displayed below the title (e.g. "$42.5k"). */
  value: string;
  leftMetric: SalesMetric;
  rightMetric: SalesMetric;
  /**
   * Split point of the dual progress bar (0–100).
   * Defaults to left/(left+right) ratio derived from the percentage strings.
   * Pass explicitly if your percentages don't represent shares of a whole.
   */
  leftProgress?: number;
  /** Label of the center "VS" divider badge. */
  vsLabel?: string;
  className?: string;
}

function parsePercent(s: string): number {
  return parseFloat(s.replace("%", "")) || 0;
}

// ── SalesOverviewCard ─────────────────────────────────────────────────────────

export const SalesOverviewCard: FC<SalesOverviewCardProps> = ({
  title = "Sales Overview",
  badge,
  value,
  leftMetric,
  rightMetric,
  leftProgress,
  vsLabel = "VS",
  className,
}) => {
  const leftPct = parsePercent(leftMetric.percentage);
  const rightPct = parsePercent(rightMetric.percentage);
  const total = leftPct + rightPct;
  const resolvedLeftProgress =
    leftProgress ?? (total > 0 ? (leftPct / total) * 100 : 50);

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5",
        className,
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ds-1">{title}</p>
        {badge && (
          <TrendBadge value={badge.value} direction={badge.direction} />
        )}
      </div>

      {/* ── Hero value ─────────────────────────────────────────────────────── */}
      <p className="mb-5 text-3xl font-bold tracking-tight text-ds-1">
        {value}
      </p>

      {/* ── Metrics row ────────────────────────────────────────────────────── */}
      <div className="relative mb-5 flex items-start">
        {/* Left metric */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-ds-2">
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-md"
              style={{
                backgroundColor: leftMetric.color + "20",
                color: leftMetric.color,
              }}
              aria-hidden="true"
            >
              {leftMetric.icon}
            </span>
            <span className="font-medium">{leftMetric.label}</span>
          </div>
          <p className="text-2xl font-bold text-ds-1">{leftMetric.percentage}</p>
          <p className="text-xs text-ds-3">{leftMetric.count}</p>
        </div>

        {/* VS divider */}
        <div className="relative flex flex-col items-center self-stretch">
          <div className="w-px flex-1 bg-ds-border-3" />
          <span className="my-2 flex h-7 w-7 items-center justify-center rounded-full border border-ds-border-3 bg-ds-surface-1 text-[9px] font-bold text-ds-3">
            {vsLabel}
          </span>
          <div className="w-px flex-1 bg-ds-border-3" />
        </div>

        {/* Right metric */}
        <div className="flex flex-1 flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 text-xs text-ds-2">
            <span className="font-medium">{rightMetric.label}</span>
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-md"
              style={{
                backgroundColor: rightMetric.color + "20",
                color: rightMetric.color,
              }}
              aria-hidden="true"
            >
              {rightMetric.icon}
            </span>
          </div>
          <p className="text-2xl font-bold text-ds-1">{rightMetric.percentage}</p>
          <p className="text-xs text-ds-3">{rightMetric.count}</p>
        </div>
      </div>

      {/* ── Dual progress bar ───────────────────────────────────────────────── */}
      <div className="flex h-2 w-full overflow-hidden rounded-full">
        <div
          className="h-full rounded-l-full transition-all duration-500"
          style={{
            width: `${resolvedLeftProgress}%`,
            backgroundColor: leftMetric.color,
          }}
        />
        <div
          className="h-full flex-1 rounded-r-full transition-all duration-500"
          style={{ backgroundColor: rightMetric.color }}
        />
      </div>
    </div>
  );
};
