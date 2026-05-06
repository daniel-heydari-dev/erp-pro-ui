"use client";

import type { FC } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

// ── Public types ──────────────────────────────────────────────────────────────

export interface RevenueGrowthBarPoint {
  day: string;
  value: number;
  /** Renders in highlightColor; others render in barColor. */
  highlighted?: boolean;
}

export interface RevenueGrowthCardProps {
  title?: string;
  subtitle?: string;
  /** Hero metric value (e.g. "$4,673"). */
  value: string;
  badge?: { value: string; direction: "up" | "down" };
  /** 7-point weekly bar data. */
  weeklyData: RevenueGrowthBarPoint[];
  /** CSS color for the highlighted bar. Defaults to ds-color-success. */
  highlightColor?: string;
  /** CSS color for non-highlighted bars. Defaults to a subtle tint of highlightColor. */
  barColor?: string;
  className?: string;
}

const TrendBadge: FC<{ value: string; direction: "up" | "down"; color?: string; bg?: string }> = ({
  value,
  direction,
  color,
  bg,
}) => {
  const isUp = direction === "up";
  const resolvedColor = color ?? (isUp ? "var(--ds-color-success)" : "var(--ds-color-danger)");
  const resolvedBg = bg ?? (isUp ? "var(--ds-color-success-subtle)" : "var(--ds-color-danger-subtle)");
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold"
      style={{ color: resolvedColor, backgroundColor: resolvedBg }}
      aria-label={`${value} ${isUp ? "increase" : "decrease"}`}
    >
      {value}
    </span>
  );
};

// ── RevenueGrowthCard ─────────────────────────────────────────────────────────

export const RevenueGrowthCard: FC<RevenueGrowthCardProps> = ({
  title = "Revenue Growth",
  subtitle = "Weekly Report",
  value,
  badge,
  weeklyData,
  highlightColor = "var(--ds-color-success)",
  barColor,
  className,
}) => {
  const resolvedBarColor = barColor ?? highlightColor + "38";

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5",
        className,
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="mb-4">
        <p className="text-base font-bold text-ds-1">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
      </div>

      {/* ── Body: value + chart ─────────────────────────────────────────────── */}
      <div className="flex items-end gap-4">
        {/* Left: value + badge */}
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold tracking-tight text-ds-1">{value}</p>
          {badge && (
            <TrendBadge
              value={badge.value}
              direction={badge.direction}
              color={highlightColor}
              bg={highlightColor + "22"}
            />
          )}
        </div>

        {/* Right: bar chart */}
        <div className="min-w-0 flex-1 pb-1" style={{ height: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={weeklyData}
              barSize={14}
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
                    fill={entry.highlighted ? highlightColor : resolvedBarColor}
                  />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
