"use client";

import { useState, useRef, useEffect, type FC } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

export interface PaymentSummarySlice {
  name: string;
  value: number;
  color: string;
}

export interface PaymentSummaryMetric {
  label: string;
  badge?: { value: string; direction: "up" | "down" };
  /** Primary display value, e.g. "€ 237,20". */
  primary: string;
  /** Optional secondary/comparison value, e.g. "/ € 135,00". */
  secondary?: string;
}

export interface PaymentSummaryCardProps {
  /** Section label rendered in uppercase above the card (e.g. "SICUREZZA"). */
  title?: string;
  /** Compact mode omits the value headline and metrics column. */
  variant?: "full" | "compact";
  /** Label above the main value, e.g. "Entrate nel periodo". */
  valueLabel?: string;
  valueBadge?: { value: string; direction: "up" | "down" };
  /** Large headline number, e.g. "€ 925.470,20". */
  value?: string;
  /** Label above the period selector, e.g. "Date". */
  periodLabel?: string;
  periods?: string[];
  defaultPeriod?: string;
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
  /** Donut chart slices. */
  data: PaymentSummarySlice[];
  /** Metric rows rendered in the right column (full variant only). */
  metrics?: PaymentSummaryMetric[];
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

interface PeriodDropdownProps {
  label?: string;
  periods: string[];
  activePeriod: string;
  onSelect: (p: string) => void;
}

const PeriodDropdown: FC<PeriodDropdownProps> = ({ label, periods, activePeriod, onSelect }) => {
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
      {label && (
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ds-3">{label}</p>
      )}
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
          <div
            role="listbox"
            className="absolute end-0 top-full z-20 mt-1 min-w-full overflow-hidden rounded-md border border-ds-border-2 bg-ds-surface-1 py-1 shadow-lg"
          >
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

// ── Donut + legend ────────────────────────────────────────────────────────────

interface DonutWithLegendProps {
  data: PaymentSummarySlice[];
  size?: number;
}

const DonutWithLegend: FC<DonutWithLegendProps> = ({ data, size = 120 }) => {
  const innerR = Math.round(size * 0.3);
  const outerR = Math.round(size * 0.48);

  return (
    <div className="flex items-center gap-4">
      {/* Legend */}
      <div className="flex flex-col gap-1.5">
        {data.map((slice) => (
          <div key={slice.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: slice.color }}
              aria-hidden="true"
            />
            <span className="whitespace-nowrap text-xs text-ds-2">{slice.name}</span>
          </div>
        ))}
      </div>
      {/* Donut */}
      <div style={{ width: size, height: size, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerR}
              outerRadius={outerR}
              dataKey="value"
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((slice, i) => (
                <Cell key={i} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              wrapperStyle={chartTooltipWrapperStyle}
              formatter={(v, _n, props) => [
                `${String(v)}%`,
                (props.payload as PaymentSummarySlice).name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ── PaymentSummaryCard ────────────────────────────────────────────────────────

const DEFAULT_PERIODS = ["Ultimi 30 giorni", "Ultimi 7 giorni", "Ultimi 90 giorni", "Quest'anno"];

export const PaymentSummaryCard: FC<PaymentSummaryCardProps> = ({
  title,
  variant = "full",
  valueLabel,
  valueBadge,
  value,
  periodLabel,
  periods = DEFAULT_PERIODS,
  defaultPeriod,
  selectedPeriod: controlledPeriod,
  onPeriodChange,
  data,
  metrics = [],
  onSettingsClick,
  className,
}) => {
  const isControlled = controlledPeriod !== undefined;
  const [internalPeriod, setInternalPeriod] = useState(defaultPeriod ?? periods[0] ?? "");
  const activePeriod = isControlled ? controlledPeriod : internalPeriod;

  const handlePeriodSelect = (p: string) => {
    if (!isControlled) setInternalPeriod(p);
    onPeriodChange?.(p);
  };

  return (
    <div className={mergeClassNames("rounded-xl border border-ds-border-3/80 bg-ds-surface-1", className)}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pb-3 pt-4">
        {title ? (
          <p className="text-[11px] font-bold uppercase tracking-widest text-ds-3">{title}</p>
        ) : (
          <span />
        )}
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

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      {variant === "full" ? (
        /* Full variant: left col (value + donut) | right col (period + metrics) */
        <div className="flex gap-4 px-5 pb-5">
          {/* Left */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {(valueLabel ?? value) && (
              <div>
                {valueLabel && (
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-ds-3">{valueLabel}</p>
                    {valueBadge && <TrendBadge {...valueBadge} />}
                  </div>
                )}
                {value && (
                  <p className="mt-1 text-xl font-bold tracking-tight text-ds-1">{value}</p>
                )}
              </div>
            )}
            <DonutWithLegend data={data} size={130} />
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-ds-border-3/50" />

          {/* Right */}
          <div className="flex w-[180px] shrink-0 flex-col gap-4">
            <PeriodDropdown
              label={periodLabel}
              periods={periods}
              activePeriod={activePeriod}
              onSelect={handlePeriodSelect}
            />
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="text-xs text-ds-3">{m.label}</p>
                  {m.badge && <TrendBadge {...m.badge} />}
                </div>
                <p className="text-base font-bold text-ds-1">
                  {m.primary}
                  {m.secondary && (
                    <span className="ms-1 text-sm font-normal text-ds-3">{m.secondary}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Compact variant: period selector + legend + donut */
        <div className="flex flex-col gap-4 px-5 pb-5">
          <PeriodDropdown
            label={periodLabel}
            periods={periods}
            activePeriod={activePeriod}
            onSelect={handlePeriodSelect}
          />
          <DonutWithLegend data={data} size={130} />
        </div>
      )}
    </div>
  );
};
