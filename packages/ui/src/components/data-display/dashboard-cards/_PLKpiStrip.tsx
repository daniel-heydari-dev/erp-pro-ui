"use client";

import { type FC } from "react";

import { mergeClassNames } from "../../../utils";

import type { PLMetricTab, PLPeriod } from "./FinancialPLCard";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface PLKpiStripProps {
  metrics: PLMetricTab[];
  activeId: string;
  isOverviewOn: boolean;
  activePeriod: PLPeriod;
  onMetricChange: (id: string) => void;
}

// ── PLKpiStrip ─────────────────────────────────────────────────────────────────

export const PLKpiStrip: FC<PLKpiStripProps> = ({
  metrics,
  activeId,
  isOverviewOn,
  activePeriod,
  onMetricChange,
}) => (
  <div className="flex border-b border-ds-border-3/60 px-5 pb-0">
    {metrics.map((m, idx) => {
      const isActive = !isOverviewOn && m.id === activeId;
      const key = activePeriod !== "custom"
        ? (activePeriod as Exclude<PLPeriod, "custom">)
        : undefined;
      const val    = (key && m.valueByPeriod?.[key])    ?? m.value;
      const change = (key && m.changeByPeriod?.[key])   ?? m.change;
      const color  = m.color ?? "var(--ds-color-accent)";

      return (
        <div key={m.id} className="group relative flex-1">
          <button
            onClick={() => onMetricChange(m.id)}
            aria-pressed={isActive}
            className={mergeClassNames(
              "flex w-full flex-col gap-0.5 border-b-2 px-1 pb-3 pt-2 text-left transition-colors",
              "first:pl-0 hover:bg-ds-surface-2/60",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ds-accent focus-visible:outline-offset-[-2px]",
              isActive ? "border-b-current" : "border-transparent",
            )}
            style={isActive ? { color } : { color: "transparent" }}
          >
            <span className="flex items-center gap-1 text-[11px] font-medium text-ds-3">
              {m.label}
              {m.tooltip && (
                <span
                  className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-ds-border-2 text-[9px] leading-none text-ds-3"
                  aria-hidden="true"
                >
                  ?
                </span>
              )}
            </span>
            <span className="text-base font-bold leading-tight text-ds-1">{val}</span>
            {change !== undefined && (
              <span
                className="text-[11px] font-semibold"
                style={{ color: change >= 0 ? "#22c55e" : "#ef4444" }}
              >
                {change >= 0 ? "▲" : "▼"} {change >= 0 ? "+" : ""}{change.toFixed(1)}%
                {m.changeLabel && (
                  <span className="ml-1 font-normal text-ds-3">{m.changeLabel}</span>
                )}
              </span>
            )}
          </button>

          {/* Hover tooltip */}
          {m.tooltip && (
            <div
              role="tooltip"
              className={mergeClassNames(
                "pointer-events-none absolute bottom-full z-30 mb-2 hidden w-48",
                "rounded-lg border border-ds-border-2 bg-ds-surface-1 p-3 shadow-lg group-hover:block",
                // edge alignment: first tab flush left, last flush right, rest centered
                idx === 0
                  ? "left-0"
                  : idx === metrics.length - 1
                  ? "right-0"
                  : "left-1/2 -translate-x-1/2",
              )}
            >
              <p className="mb-1 text-xs font-semibold text-ds-1">{m.label}</p>
              <p className="text-[11px] leading-relaxed text-ds-2">{m.tooltip}</p>
            </div>
          )}
        </div>
      );
    })}
  </div>
);
