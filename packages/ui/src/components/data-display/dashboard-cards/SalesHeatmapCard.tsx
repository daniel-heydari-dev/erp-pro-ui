"use client";

import { useMemo, useState, type FC } from "react";

import { mergeClassNames } from "../../../utils";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface HeatmapPoint {
  /** Day label, e.g. "Mon" */
  day: string;
  /** Time slot label, e.g. "09h" */
  slot: string;
  /** Numeric value (revenue, order count, units, etc.) */
  value: number;
  /** Number of unique customers in this slot. */
  clients?: number;
  /** Best-selling product name in this slot. */
  topProduct?: string;
}

export interface SalesHeatmapCardLabels {
  low?: string;
  high?: string;
  peak?: string;
  slowest?: string;
  clients?: string;
}

export interface SalesHeatmapCardProps {
  title?: string;
  subtitle?: string;
  data: HeatmapPoint[];
  /** Ordered list of day row labels. Defaults to Mon–Sun. */
  days?: string[];
  /** Ordered list of time-slot column labels. Defaults to 08h–19h. */
  slots?: string[];
  valueFormatter?: (v: number) => string;
  /** Label shown in the tooltip before the value, e.g. "Revenue". */
  metricLabel?: string;
  labels?: SalesHeatmapCardLabels;
  className?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const DEFAULT_DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_SLOTS = ["08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h"];

function defaultFmt(v: number): string {
  return v >= 1_000 ? `€${(v / 1_000).toFixed(1)}k` : `€${v}`;
}

// ── SalesHeatmapCard ───────────────────────────────────────────────────────────

export const SalesHeatmapCard: FC<SalesHeatmapCardProps> = ({
  title = "Sales Heatmap",
  subtitle = "Revenue by day & hour",
  data,
  days = DEFAULT_DAYS,
  slots = DEFAULT_SLOTS,
  valueFormatter = defaultFmt,
  metricLabel = "Revenue",
  labels,
  className,
}) => {
  const [hovered, setHovered] = useState<HeatmapPoint | null>(null);

  const { grid, maxValue, bestDay, bestSlot, bestValue, worstDay, worstSlot } = useMemo(() => {
    const lookup = new Map<string, Map<string, number>>();
    for (const pt of data) {
      if (!lookup.has(pt.day)) lookup.set(pt.day, new Map());
      lookup.get(pt.day)!.set(pt.slot, pt.value);
    }

    let maxValue = 0;
    let bestDay = ""; let bestSlot = ""; let bestValue = 0;
    let worstDay = ""; let worstSlot = ""; let worstValue = Infinity;

    const grid = days.map((day) => {
      const dayMap = lookup.get(day) ?? new Map<string, number>();
      return slots.map((slot) => {
        const value = dayMap.get(slot) ?? 0;
        if (value > maxValue) maxValue = value;
        if (value > bestValue) { bestValue = value; bestDay = day; bestSlot = slot; }
        if (value > 0 && value < worstValue) { worstValue = value; worstDay = day; worstSlot = slot; }
        return { day, slot, value };
      });
    });

    return { grid, maxValue, bestDay, bestSlot, bestValue, worstDay, worstSlot };
  }, [data, days, slots]);

  return (
    <div className={mergeClassNames("rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5", className)}>
      {/* Header */}
      <div className="mb-4">
        <p className="text-base font-bold text-ds-1">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: 320 }}>
          {/* Column headers */}
          <div
            className="mb-1"
            style={{ display: "grid", gridTemplateColumns: `2.5rem repeat(${slots.length}, 1fr)` }}
          >
            <div />
            {slots.map((slot) => (
              <div key={slot} className="text-center text-[9px] leading-none text-ds-3">
                {slot}
              </div>
            ))}
          </div>

          {/* Rows */}
          {grid.map((row, di) => (
            <div
              key={days[di]}
              style={{ display: "grid", gridTemplateColumns: `2.5rem repeat(${slots.length}, 1fr)` }}
            >
              <div className="flex items-center text-[11px] font-medium text-ds-3 pr-1.5">
                {days[di]}
              </div>
              {row.map((cell) => {
                const intensity = maxValue > 0 ? cell.value / maxValue : 0;
                const pct = Math.max(3, Math.round(Math.pow(intensity, 0.65) * 88));
                const isBest = cell.day === bestDay && cell.slot === bestSlot;
                const isHovered = hovered?.day === cell.day && hovered?.slot === cell.slot;
                return (
                  <div
                    key={cell.slot}
                    role="gridcell"
                    aria-label={`${cell.day} ${cell.slot}: ${metricLabel} ${valueFormatter(cell.value)}`}
                    className="m-[1.5px] h-6 cursor-default rounded-[3px] transition-transform hover:scale-110"
                    style={{
                      backgroundColor: cell.value === 0
                        ? "color-mix(in srgb, var(--ds-color-fg) 5%, transparent)"
                        : `color-mix(in srgb, var(--ds-color-accent) ${pct}%, transparent)`,
                      outline: isBest ? "2px solid var(--ds-color-accent)" : "none",
                      outlineOffset: 1,
                      boxShadow: isHovered ? "0 0 0 1.5px var(--ds-color-accent)" : undefined,
                    }}
                    onMouseEnter={() => setHovered(cell)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend bar */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[10px] text-ds-3">{labels?.low ?? "Low"}</span>
        <div
          className="h-1.5 flex-1 rounded-full"
          style={{
            background: "linear-gradient(to right, color-mix(in srgb, var(--ds-color-accent) 5%, transparent), var(--ds-color-accent))",
          }}
        />
        <span className="text-[10px] text-ds-3">{labels?.high ?? "High"}</span>
      </div>

      {/* Footer insight */}
      <div className="mt-3 border-t border-ds-border-3/50 pt-3">
        {hovered ? (
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-ds-1">
              {hovered.day} {hovered.slot}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
              <span className="text-xs font-bold" style={{ color: "var(--ds-color-accent)" }}>
                {valueFormatter(hovered.value)}
              </span>
              {hovered.clients !== undefined && (
                <span className="text-xs text-ds-3">
                  👥 <span className="font-semibold text-ds-2">{hovered.clients}</span> {labels?.clients ?? "clients"}
                </span>
              )}
              {hovered.topProduct && (
                <span className="text-xs text-ds-3">
                  🏷️ <span className="font-semibold text-ds-2">{hovered.topProduct}</span>
                </span>
              )}
            </div>
          </div>
        ) : bestValue > 0 ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-ds-1">
              <span className="mr-1">🔥</span>
              <span className="font-medium text-ds-3">{labels?.peak ?? "Peak"}: </span>
              <span className="font-bold" style={{ color: "var(--ds-color-accent)" }}>
                {bestDay} {bestSlot}
              </span>
              <span className="text-ds-3"> — {valueFormatter(bestValue)}</span>
            </p>
            {worstDay && (
              <p className="text-xs text-ds-3">
                <span className="mr-1">💤</span>
                <span>{labels?.slowest ?? "Slowest"}: {worstDay} {worstSlot}</span>
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
