"use client";

import { useState, type FC } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
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

// ── Public types ──────────────────────────────────────────────────────────────

export type CustomerLifecyclePeriod = "this-week" | "this-month" | "this-year";

export interface CustomerLifecycleDataPoint {
  label: string;
  trials: number;
  converted: number;
  churned: number;
}

export interface CustomerLifecycleMetric {
  label: string;
  value: number;
  change: number;
  color: string;
}

export interface CustomerLifecycleCardProps {
  title?: string;
  metrics?: CustomerLifecycleMetric[];
  data?: Partial<Record<CustomerLifecyclePeriod, CustomerLifecycleDataPoint[]>>;
  defaultPeriod?: CustomerLifecyclePeriod;
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_METRICS: CustomerLifecycleMetric[] = [
  { label: "New Trials",   value: 284,  change: +12.4, color: "#4F46E5" },
  { label: "Converted",    value: 143,  change: +8.7,  color: "#059669" },
  { label: "Churned",      value: 31,   change: -3.2,  color: "#DC2626" },
];

const MONTHLY_DATA: CustomerLifecycleDataPoint[] = [
  { label: "Nov", trials: 210, converted: 98,  churned: 28 },
  { label: "Dec", trials: 185, converted: 112, churned: 19 },
  { label: "Jan", trials: 248, converted: 121, churned: 34 },
  { label: "Feb", trials: 263, converted: 130, churned: 27 },
  { label: "Mar", trials: 271, converted: 138, churned: 25 },
  { label: "Apr", trials: 284, converted: 143, churned: 31 },
];

const PERIOD_OPTS: { value: CustomerLifecyclePeriod; label: string }[] = [
  { value: "this-week",  label: "Week"  },
  { value: "this-month", label: "Month" },
  { value: "this-year",  label: "Year"  },
];

// ── CustomerLifecycleCard ─────────────────────────────────────────────────────

export const CustomerLifecycleCard: FC<CustomerLifecycleCardProps> = ({
  title         = "Customer Lifecycle",
  metrics       = DEFAULT_METRICS,
  data          = { "this-month": MONTHLY_DATA },
  defaultPeriod = "this-month",
  className,
  onMenuClick,
}) => {
  const [period, setPeriod] = useState<CustomerLifecyclePeriod>(defaultPeriod);
  const chartData = data[period] ?? MONTHLY_DATA;

  return (
    <div className={mergeClassNames("rounded-lg border border-ds-border-3/80 bg-ds-surface-1", className)}>
      {/* Header */}
      <div className="flex items-start justify-between px-5 pb-2 pt-5">
        <p className="text-base font-bold text-ds-1">{title}</p>
        <div className="flex items-center gap-1.5">
          {/* Period selector */}
          <div className="flex rounded-md border border-ds-border-2 bg-ds-surface-2 p-0.5">
            {PERIOD_OPTS.map((opt) => (
              <Button
                key={opt.value}
                variant="tertiary"
                onClick={() => setPeriod(opt.value)}
                className={mergeClassNames(
                  "rounded px-2! py-0.5! text-xs font-medium transition-colors",
                  period === opt.value ? "bg-ds-surface-1 text-ds-1 shadow-sm" : "text-ds-3",
                )}
              >
                {opt.label}
              </Button>
            ))}
          </div>
          <Button variant="tertiary" size="small" className="p-0.5! text-ds-3" aria-label="More options" onClick={onMenuClick}>
            <EllipsisVerticalIcon width={18} height={18} />
          </Button>
        </div>
      </div>

      {/* Metric strip */}
      <div className="grid grid-cols-3 divide-x divide-ds-border-3/50 border-b border-ds-border-3/50 px-2 pb-3 pt-1">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-0.5 px-3">
            <div className="h-0.5 w-8 rounded-full mb-1" style={{ backgroundColor: m.color }} />
            <p className="text-lg font-bold text-ds-1">{m.value.toLocaleString()}</p>
            <div className="flex items-center gap-1">
              <span
                className="text-[10px] font-semibold"
                style={{ color: m.change >= 0 ? "#22c55e" : "#ef4444" }}
              >
                {m.change >= 0 ? "+" : ""}{m.change}%
              </span>
            </div>
            <p className="text-center text-[10px] leading-tight text-ds-3">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ height: 200 }} className="px-1 pb-4 pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={8} barGap={2} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--ds-color-border)" strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey="label" axisLine={false} tickLine={false}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 10 }} />
            <YAxis axisLine={false} tickLine={false}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 10 }} />
            <Tooltip
              contentStyle={chartTooltipContentStyle} itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle} wrapperStyle={chartTooltipWrapperStyle}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />
            <Bar dataKey="trials"    name="New Trials" fill={metrics[0]?.color ?? "#4F46E5"} radius={[2, 2, 0, 0]} />
            <Bar dataKey="converted" name="Converted"  fill={metrics[1]?.color ?? "#059669"} radius={[2, 2, 0, 0]} />
            <Bar dataKey="churned"   name="Churned"    fill={metrics[2]?.color ?? "#DC2626"} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 px-5 pb-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: m.color }} aria-hidden="true" />
            <span className="text-xs text-ds-2">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
