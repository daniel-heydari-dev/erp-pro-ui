"use client";

import type { FC, ReactNode } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

// ── TrendBadge ────────────────────────────────────────────────────────────────

const TrendBadge: FC<{ value: string; direction: "up" | "down" }> = ({
  value,
  direction,
}) => {
  const isUp = direction === "up";
  const color = isUp ? "var(--ds-color-success)" : "var(--ds-color-danger)";
  const bg = isUp ? "var(--ds-color-success-subtle)" : "var(--ds-color-danger-subtle)";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[11px] font-semibold leading-none"
      style={{ color, borderColor: color, backgroundColor: bg }}
      aria-label={`${value} ${isUp ? "increase" : "decrease"}`}
    >
      {value}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        {isUp ? (
          <path
            d="M5 8V2M5 2L2 5M5 2L8 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M5 2V8M5 8L2 5M5 8L8 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  );
};

// ── Public types ──────────────────────────────────────────────────────────────

export interface EarningsMetric {
  icon: ReactNode;
  /** CSS color value used for the icon badge background (at 15% opacity) and progress bar. */
  color: string;
  label: string;
  value: string;
  /** Progress bar fill, 0–100. */
  progress: number;
}

export interface WeeklyBarPoint {
  day: string;
  value: number;
  /** When true the bar renders in accent color; others render in accent-subtle. */
  highlighted?: boolean;
}

export type EarningsCardSize = "md" | "lg";

export interface EarningsCardProps {
  title?: string;
  subtitle?: string;
  /** The hero metric value (e.g. "$468"). */
  value: string;
  badge?: { value: string; direction: "up" | "down" };
  /** Small description text below the hero value. */
  description?: string;
  /** 7-point weekly bar data (one entry per day). */
  weeklyData: WeeklyBarPoint[];
  /** Exactly 3 metric items shown in the footer strip. */
  metrics: EarningsMetric[];
  /**
   * Layout size:
   * - "md" — metric + compact chart side-by-side (default)
   * - "lg" — full-width chart below the hero value, taller bars
   */
  size?: EarningsCardSize;
  className?: string;
  onMenuClick?: () => void;
}

// ── EarningsCard ──────────────────────────────────────────────────────────────

// ── Shared sub-components ─────────────────────────────────────────────────────

const BarChartSection: FC<{
  weeklyData: WeeklyBarPoint[];
  barSize?: number;
  height?: number;
}> = ({ weeklyData, barSize = 16, height = 90 }) => (
  <div style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={weeklyData}
        barSize={barSize}
        barCategoryGap="25%"
        margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 10 }}
          dy={6}
        />
        <Tooltip
          contentStyle={chartTooltipContentStyle}
          itemStyle={chartTooltipItemStyle}
          labelStyle={chartTooltipLabelStyle}
          wrapperStyle={chartTooltipWrapperStyle}
          cursor={false}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {weeklyData.map((entry, i) => (
            <Cell
              key={i}
              fill={
                entry.highlighted
                  ? "var(--ds-color-accent)"
                  : "var(--ds-color-accent-subtle)"
              }
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  </div>
);

const MetricsStrip: FC<{ metrics: EarningsMetric[]; large?: boolean }> = ({
  metrics,
  large = false,
}) => (
  <div className="mx-5 mb-5 rounded-lg border border-ds-border-3/60 bg-ds-surface-2/50 px-1 py-3">
    <div className="grid grid-cols-3 divide-x divide-ds-border-3/50">
      {metrics.slice(0, 3).map((metric, i) => (
        <div
          key={i}
          className={mergeClassNames("flex flex-col gap-2 px-4", large && "gap-3 px-5")}
        >
          <div className="flex items-center gap-1.5">
            <span
              className={mergeClassNames(
                "inline-flex shrink-0 items-center justify-center rounded-full",
                large ? "h-6 w-6 text-xs" : "h-5 w-5 text-[10px]",
              )}
              style={{
                backgroundColor: metric.color + "28",
                color: metric.color,
              }}
              aria-hidden="true"
            >
              {metric.icon}
            </span>
            <span className={mergeClassNames("truncate text-ds-2", large ? "text-sm" : "text-xs")}>
              {metric.label}
            </span>
          </div>
          <p className={mergeClassNames("font-bold text-ds-1", large ? "text-base" : "text-sm")}>
            {metric.value}
          </p>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-ds-border-3/50">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(0, metric.progress))}%`,
                backgroundColor: metric.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── EarningsCard ──────────────────────────────────────────────────────────────

export const EarningsCard: FC<EarningsCardProps> = ({
  title = "Earning Reports",
  subtitle = "Weekly Earnings Overview",
  value,
  badge,
  description,
  weeklyData,
  metrics,
  size = "md",
  className,
  onMenuClick,
}) => (
  <div
    className={mergeClassNames(
      "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
      className,
    )}
  >
    {/* ── Header ───────────────────────────────────────────────────────────── */}
    <div className="flex items-start justify-between px-5 pb-3 pt-5">
      <div>
        <p className="text-base font-bold text-ds-1">{title}</p>
        {subtitle && (
          <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>
        )}
      </div>
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

    {size === "md" && (
      <>
        {/* ── md: value + chart side-by-side ─────────────────────────────── */}
        <div className="flex items-start gap-4 px-5 pb-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold tracking-tight text-ds-1">
                {value}
              </span>
              {badge && (
                <TrendBadge value={badge.value} direction={badge.direction} />
              )}
            </div>
            {description && (
              <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-ds-3">
                {description}
              </p>
            )}
          </div>
          <div className="w-[185px] shrink-0">
            <BarChartSection weeklyData={weeklyData} barSize={16} height={90} />
          </div>
        </div>
        <MetricsStrip metrics={metrics} />
      </>
    )}

    {size === "lg" && (
      <>
        {/* ── lg: value + badge stacked, full-width chart below ──────────── */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-bold tracking-tight text-ds-1">
              {value}
            </span>
            {badge && (
              <TrendBadge value={badge.value} direction={badge.direction} />
            )}
          </div>
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-ds-3">
              {description}
            </p>
          )}
        </div>
        <div className="px-5 pb-5">
          <BarChartSection weeklyData={weeklyData} barSize={24} height={160} />
        </div>
        <MetricsStrip metrics={metrics} large />
      </>
    )}
  </div>
);
