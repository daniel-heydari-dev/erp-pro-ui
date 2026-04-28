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
  const color = isUp ? "#05cd99" : "#e31d1c";
  const bg = isUp ? "rgba(5,205,153,0.10)" : "rgba(227,29,28,0.08)";

  return (
    <span
      className="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold leading-none"
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
    className="shrink-0 p-0.5! text-ds-color-fg-subtle"
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
      <span key={item.label} className="flex items-center gap-1.5 text-xs text-ds-color-fg-muted">
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
   *  For "md" the chart is placed in a fixed 68 × 130 px side zone — use
   *  compact charts (MiniNeonSparkline, small BarChart, AreaChart, etc.).
   *  For "lg" the chart spans full card width — set height via the chart prop. */
  chart?: ReactNode;
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
  legend,
  className,
  onMenuClick,
}) => {
  const base = mergeClassNames(
    "rounded-2xl border border-ds-border-2 bg-ds-surface-1",
    className,
  );

  // ── sm: 2-col, metric only ───────────────────────────────────────────────
  if (size === "sm") {
    return (
      <div className={mergeClassNames(base, "flex flex-col gap-3 p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ds-color-fg">{title}</span>
            {badge && <TrendBadge value={badge.value} direction={badge.direction} />}
          </div>
          <MenuButton onClick={onMenuClick} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-extrabold tracking-tight text-ds-color-fg leading-none">
            {value}
          </p>
          <p className="text-xs text-ds-color-fg-subtle mt-1">{dateRange}</p>
        </div>
      </div>
    );
  }

  // ── md: 4-col, metric + side chart ──────────────────────────────────────
  if (size === "md") {
    return (
      <div className={mergeClassNames(base, "flex flex-col gap-3 p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ds-color-fg">{title}</span>
            {badge && <TrendBadge value={badge.value} direction={badge.direction} />}
          </div>
          <MenuButton onClick={onMenuClick} />
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-3xl font-extrabold tracking-tight text-ds-color-fg leading-none">
              {value}
            </p>
            <p className="text-xs text-ds-color-fg-subtle mt-1">{dateRange}</p>
          </div>
          {chart && (
            <div className="h-[68px] w-[130px] shrink-0 overflow-hidden">
              {chart}
            </div>
          )}
        </div>
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
            <span className="text-sm font-semibold text-ds-color-fg">{title}</span>
            {badge && <TrendBadge value={badge.value} direction={badge.direction} />}
          </div>
          <p className="text-3xl font-extrabold tracking-tight text-ds-color-fg leading-none">
            {value}
          </p>
          <p className="text-xs text-ds-color-fg-subtle">{dateRange}</p>
        </div>
        <div className="flex items-center gap-4 ms-auto">
          {legend && legend.length > 0 && <LegendDots items={legend} />}
          <MenuButton onClick={onMenuClick} />
        </div>
      </div>

      {/* Chart area */}
      {chart && (
        <div className="border-t border-ds-border-2 pt-4 w-full">
          {chart}
        </div>
      )}
    </div>
  );
};
