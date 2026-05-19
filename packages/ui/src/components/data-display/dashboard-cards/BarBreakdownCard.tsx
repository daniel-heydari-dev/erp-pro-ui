"use client";

import { useState, useRef, useEffect, type FC } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "../../forms/button";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

// ── Public types ──────────────────────────────────────────────────────────────

export interface BarBreakdownCategory {
  /** dataKey that matches a field in BarBreakdownDataPoint */
  key: string;
  label: string;
  color: string;
}

export interface BarBreakdownDataPoint {
  /** X-axis label. Pass an empty string for tick marks without a label. */
  name: string;
  [key: string]: string | number;
}

export interface BarBreakdownHeadline {
  flag?: string;
  label: string;
  value: string;
}

export interface BarBreakdownMetric {
  label: string;
  badge?: { value: string; direction: "up" | "down" };
  primary: string;
  secondary?: string;
}

export interface BarBreakdownCardProps {
  title?: string;
  /** full = headlines + chart + right metrics. compact = period + chart only. */
  variant?: "full" | "compact";
  headlines?: BarBreakdownHeadline[];
  categories: BarBreakdownCategory[];
  data: BarBreakdownDataPoint[];
  periodLabel?: string;
  periods?: string[];
  defaultPeriod?: string;
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
  /** Only rendered in variant="full". */
  metrics?: BarBreakdownMetric[];
  onSettingsClick?: () => void;
  className?: string;
}

// ── Sub-components ────────────────────────────────────────────────────────────

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const TrendBadge: FC<{ value: string; direction: "up" | "down" }> = ({ value, direction }) => {
  const isUp = direction === "up";
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold leading-none"
      style={{
        backgroundColor: isUp ? "var(--ds-color-success)" : "var(--ds-color-danger)",
        color: "#fff",
      }}
    >
      {isUp ? "+" : ""}{value}
    </span>
  );
};

const PeriodDropdown: FC<{
  label?: string;
  periods: string[];
  activePeriod: string;
  onSelect: (p: string) => void;
}> = ({ label, periods, activePeriod, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div className="flex flex-col gap-1">
      {label && <p className="text-[10px] font-semibold uppercase tracking-wider text-ds-3">{label}</p>}
      <div ref={ref} className="relative">
        <Button
          variant="tertiary"
          size="small"
          onClick={() => setOpen((o) => !o)}
          className="w-full justify-between gap-2 rounded-md border border-ds-border-2 bg-ds-surface-1 px-3 py-1.5 text-xs font-medium text-ds-2 hover:bg-ds-surface-2 hover:opacity-100"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="truncate">{activePeriod}</span>
          <span className={mergeClassNames("shrink-0 transition-transform duration-150", open ? "rotate-180" : "")}>
            <ChevronIcon />
          </span>
        </Button>
        {open && (
          <div role="listbox" className="absolute end-0 top-full z-20 mt-1 min-w-full overflow-hidden rounded-md border border-ds-border-2 bg-ds-surface-1 py-1 shadow-lg">
            {periods.map((p) => (
              <Button
                key={p}
                variant="tertiary"
                size="small"
                role="option"
                aria-selected={p === activePeriod}
                onClick={() => { onSelect(p); setOpen(false); }}
                className={mergeClassNames(
                  "w-full justify-start rounded-none px-3 py-1.5 text-start text-xs hover:bg-ds-surface-2 hover:opacity-100",
                  p === activePeriod ? "font-semibold text-ds-accent" : "text-ds-2",
                )}
              >
                {p}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BarChartArea: FC<{ categories: BarBreakdownCategory[]; data: BarBreakdownDataPoint[]; height?: number }> = ({
  categories,
  data,
  height = 180,
}) => (
  <div className="flex items-start gap-4">
    <div className="flex flex-col gap-1.5 pt-2 shrink-0">
      {categories.map((cat) => (
        <div key={cat.key} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: cat.color }} aria-hidden="true" />
          <span className="whitespace-nowrap text-xs text-ds-2">{cat.label}</span>
        </div>
      ))}
    </div>
    <div className="flex-1 min-w-0" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} barSize={8} barCategoryGap="30%" margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={{ stroke: "var(--ds-border-2)", strokeWidth: 1 }}
            tick={{ fontSize: 10, fill: "var(--ds-text-3)" }}
            interval="preserveStartEnd"
          />
          <Tooltip
            contentStyle={chartTooltipContentStyle}
            itemStyle={chartTooltipItemStyle}
            labelStyle={chartTooltipLabelStyle}
            wrapperStyle={chartTooltipWrapperStyle}
          />
          {categories.map((cat, i) => (
            <Bar
              key={cat.key}
              dataKey={cat.key}
              stackId="a"
              fill={cat.color}
              radius={i === categories.length - 1 ? [2, 2, 0, 0] : undefined}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// ── BarBreakdownCard ──────────────────────────────────────────────────────────

const DEFAULT_PERIODS = ["Last 30 days", "Last 7 days", "Last 90 days", "This year"];

export const BarBreakdownCard: FC<BarBreakdownCardProps> = ({
  title,
  variant = "full",
  headlines = [],
  categories,
  data,
  periodLabel,
  periods = DEFAULT_PERIODS,
  defaultPeriod,
  selectedPeriod: controlledPeriod,
  onPeriodChange,
  metrics = [],
  onSettingsClick,
  className,
}) => {
  const isControlled = controlledPeriod !== undefined;
  const [internalPeriod, setInternalPeriod] = useState(defaultPeriod ?? periods[0] ?? "");
  const activePeriod = isControlled ? controlledPeriod : internalPeriod;

  const handleSelect = (p: string) => {
    if (!isControlled) setInternalPeriod(p);
    onPeriodChange?.(p);
  };

  const hasHeadlines = headlines.length > 0;
  const hasMetrics = metrics.length > 0 && variant === "full";

  return (
    <div className={mergeClassNames("rounded-xl border border-ds-border-3/80 bg-ds-surface-1", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-3 pt-4">
        {title ? (
          <p className="text-[11px] font-bold uppercase tracking-widest text-ds-3">{title}</p>
        ) : <span />}
        <Button
          variant="tertiary"
          size="small"
          className="shrink-0 p-1! text-ds-3 hover:text-ds-1"
          aria-label="Settings"
          onClick={onSettingsClick}
        >
          <SettingsIcon width={16} height={16} />
        </Button>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-4">
        {/* Headlines + period row */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          {hasHeadlines && (
            <div className="flex flex-wrap gap-6">
              {headlines.map((h) => (
                <div key={h.label} className="flex flex-col gap-0.5">
                  <p className="text-[10px] text-ds-3">{h.label}</p>
                  <p className="text-lg font-bold text-ds-1">
                    {h.flag && <span className="mr-1.5">{h.flag}</span>}
                    {h.value}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className={mergeClassNames(hasHeadlines ? "shrink-0" : "w-full max-w-[200px]")}>
            <PeriodDropdown label={periodLabel} periods={periods} activePeriod={activePeriod} onSelect={handleSelect} />
          </div>
        </div>

        {/* Chart + optional right metrics */}
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <BarChartArea categories={categories} data={data} />
          </div>
          {hasMetrics && (
            <>
              <div className="w-px self-stretch bg-ds-border-3/50" />
              <div className="flex w-[160px] shrink-0 flex-col gap-4 justify-center">
                {metrics.map((m, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-xs text-ds-3">{m.label}</p>
                      {m.badge && <TrendBadge {...m.badge} />}
                    </div>
                    <p className="text-base font-bold text-ds-1">
                      {m.primary}
                      {m.secondary && <span className="ms-1 text-sm font-normal text-ds-3">{m.secondary}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
