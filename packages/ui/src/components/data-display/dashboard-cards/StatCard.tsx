"use client";

import type { FC, ReactNode } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ---------------------------------------------------------------------------
// Internal: TrendBadge
// ---------------------------------------------------------------------------

interface TrendBadgeProps {
  value: string;
  direction: "up" | "down";
}

const TrendBadge: FC<TrendBadgeProps> = ({ value, direction }) => {
  const isUp = direction === "up";
  const color = isUp ? "var(--ds-color-success)" : "var(--ds-color-danger)";
  const bg = isUp ? "var(--ds-color-success-subtle)" : "var(--ds-color-danger-subtle)";

  return (
    <span
      className="inline-flex items-center gap-1 rounded-sm border px-1 py-0.5 text-[11px] font-semibold leading-none"
      style={{ color, borderColor: color, backgroundColor: bg }}
      aria-label={`${value} ${isUp ? "increase" : "decrease"}`}
    >
      {value}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        {isUp ? (
          <path d="M5 8V2M5 2L2 5M5 2L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M5 2V8M5 8L2 5M5 8L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
   
    </span>
  );
};

// ---------------------------------------------------------------------------
// Internal: MenuButton
// ---------------------------------------------------------------------------

const MenuButton: FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Button
    variant="tertiary"
    size="small"
    className="shrink-0 p-0.5! text-ds-3"
    aria-label="More options"
    onClick={onClick}
  >
    <EllipsisVerticalIcon width={18} height={18} />
  </Button>
);

// ---------------------------------------------------------------------------
// Internal: LegendDot
// ---------------------------------------------------------------------------

const LegendDots: FC<{ items: { label: string; color: string }[] }> = ({ items }) => (
  <div className="flex items-center gap-3">
    {items.map((item) => (
      <span key={item.label} className="flex items-center gap-1.5 text-xs text-ds-2">
        <span
          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: item.color }}
          aria-hidden="true"
        />
        {item.label}
      </span>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type StatCardSize = "sm" | "md" | "lg";

export interface StatCardLegendItem {
  label: string;
  color: string;
}

export interface StatCardProps {
  /** Layout size:
   *  - "sm"  → 2-col  — metric only, no chart
   *  - "md"  → 4-col  — metric + compact chart on the right (default)
   *  - "lg"  → 12-col — metric header + full-width chart below
   */
  size?: StatCardSize;
  title: string;
  badge?: TrendBadgeProps;
  value: ReactNode;
  dateRange: string;
  /** Chart content (any chart component). Ignored when size="sm".
   *  For "md" position is controlled by chartPosition.
   *  For "lg" the chart spans full card width below a divider. */
  chart?: ReactNode;
  /** Controls where the chart renders in size="md".
   *  - "side"   (default) — compact chart to the right of the metric.
   *  - "bottom" — full-width chart below the metric (good for bar/line/area charts). */
  chartPosition?: "side" | "bottom";
  /** Override the chart container's size/style.
   *  "md" side:   overrides the side-zone div (default: h-[68px] w-[180px] shrink-0 overflow-hidden).
   *  "md" bottom: overrides the bottom chart div (default: w-full pt-3).
   *  "lg":        overrides the chart wrapper div (default: border-t border-ds-border-2 pt-4 w-full). */
  chartClassName?: string;
  /** Legend items shown in the header. Only visible when size="lg". */
  legend?: StatCardLegendItem[];
  className?: string;
  onMenuClick?: () => void;
}

// ---------------------------------------------------------------------------
// StatCard
// ---------------------------------------------------------------------------

export const StatCard: FC<StatCardProps> = ({
  size = "md",
  title,
  badge,
  value,
  dateRange,
  chart,
  chartPosition = "side",
  chartClassName,
  legend,
  className,
  onMenuClick,
}) => {
  const base = mergeClassNames(
    "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
    className,
  );

  // ── sm: 2-col, metric only ───────────────────────────────────────────────
  if (size === "sm") {
    return (
      <div className={mergeClassNames(base, "flex flex-col gap-7 p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ds-1">{title}</span>
            {badge && <TrendBadge value={badge.value} direction={badge.direction} />}
          </div>
          <MenuButton onClick={onMenuClick} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold tracking-tight text-ds-1 leading-none">
            {value}
          </p>
          <p className="text-[10px] text-ds-3 mt-1">{dateRange}</p>
        </div>
      </div>
    );
  }

  // ── md: 4-col, metric + chart ────────────────────────────────────────────
  if (size === "md") {
    const metricBlock = (
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-3xl font-bold tracking-tight text-ds-1 leading-none">
          {value}
        </p>
        <p className="text-[10px] text-ds-3 mt-1">{dateRange}</p>
      </div>
    );

    return (
      <div className={mergeClassNames(base, "flex flex-col gap-3 p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ds-1">{title}</span>
            {badge && <TrendBadge value={badge.value} direction={badge.direction} />}
          </div>
          <MenuButton onClick={onMenuClick} />
        </div>

        {chartPosition === "bottom" ? (
          <>
            {metricBlock}
            {chart && (
              <div className={mergeClassNames("w-full pt-3", chartClassName)}>
                {chart}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-end justify-between gap-3">
            {metricBlock}
            {chart && (
              <div className={mergeClassNames("h-[46px] w-[155px] shrink-0 overflow-hidden", chartClassName)}>
                {chart}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── lg: 12-col, header + full-width chart ────────────────────────────────
  return (
    <div className={mergeClassNames(base, "flex flex-col p-5")}>
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 mb-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ds-1">{title}</span>
            {badge && <TrendBadge value={badge.value} direction={badge.direction} />}
          </div>
          <p className="text-3xl font-bold tracking-tight text-ds-1 leading-none">
            {value}
          </p>
          <p className="text-xs text-ds-3">{dateRange}</p>
        </div>
        <div className="flex items-center gap-4 ms-auto">
          {legend && legend.length > 0 && <LegendDots items={legend} />}
          <MenuButton onClick={onMenuClick} />
        </div>
      </div>

      {/* Chart area */}
      {chart && (
        <div className={mergeClassNames("border-t border-ds-border-2 pt-4 w-full", chartClassName)}>
          {chart}
        </div>
      )}
    </div>
  );
};
