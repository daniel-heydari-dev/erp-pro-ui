"use client";

import type { FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface SeatTierRow {
  tier: string;
  totalSeats: number;
  usedSeats: number;
  color: string;
}

export interface SeatSummaryItem {
  label: string;
  count: number;
  color: string;
}

export interface SeatUtilizationCardProps {
  title?: string;
  subtitle?: string;
  tiers?: SeatTierRow[];
  summary?: SeatSummaryItem[];
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_TIERS: SeatTierRow[] = [
  { tier: "Enterprise", totalSeats: 8400,  usedSeats: 7980,  color: "#7C3AED" },
  { tier: "Pro",        totalSeats: 4310,  usedSeats: 3748,  color: "#2563EB" },
  { tier: "Starter",    totalSeats: 2160,  usedSeats: 1584,  color: "#0891B2" },
  { tier: "Free",       totalSeats: 1081,  usedSeats: 621,   color: "#64748B" },
];

const DEFAULT_SUMMARY: SeatSummaryItem[] = [
  { label: "Total Seats",      count: 15951, color: "var(--ds-color-fg)"       },
  { label: "Active Seats",     count: 13933, color: "#22c55e"                  },
  { label: "Available Seats",  count: 2018,  color: "var(--ds-color-fg-muted)" },
];

// ── SeatUtilizationCard ───────────────────────────────────────────────────────

export const SeatUtilizationCard: FC<SeatUtilizationCardProps> = ({
  title   = "Seat Utilization",
  subtitle = "Allocated vs. active seats across all accounts",
  tiers   = DEFAULT_TIERS,
  summary = DEFAULT_SUMMARY,
  className,
  onMenuClick,
}) => (
  <div className={mergeClassNames("rounded-lg border border-ds-border-3/80 bg-ds-surface-1", className)}>
    {/* Header */}
    <div className="flex items-start justify-between px-5 pb-1 pt-5">
      <div>
        <p className="text-base font-bold text-ds-1">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
      </div>
      <Button variant="tertiary" size="small" className="shrink-0 p-0.5! text-ds-3" aria-label="More options" onClick={onMenuClick}>
        <EllipsisVerticalIcon width={18} height={18} />
      </Button>
    </div>

    {/* Summary pills */}
    <div className="grid grid-cols-3 divide-x divide-ds-border-3/50 border-b border-ds-border-3/50 px-2 py-3">
      {summary.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-0.5 px-3">
          <p className="text-base font-bold text-ds-1" style={{ color: s.color }}>
            {s.count.toLocaleString()}
          </p>
          <p className="text-center text-[10px] leading-tight text-ds-3">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Tier progress rows */}
    <div className="divide-y divide-ds-border-3/50 px-5 pb-4">
      {tiers.map((t) => {
        const pct = Math.round((t.usedSeats / t.totalSeats) * 100);
        return (
          <div key={t.tier} className="py-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-ds-2">{t.tier}</span>
              <span className="text-xs font-semibold text-ds-3">
                {t.usedSeats.toLocaleString()} / {t.totalSeats.toLocaleString()} · {pct}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ds-surface-3">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: t.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
