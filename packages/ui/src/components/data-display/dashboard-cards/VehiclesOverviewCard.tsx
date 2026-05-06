"use client";

import type { FC, ReactNode } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface VehiclesOverviewItem {
  /** Column header label, e.g. "On the way". */
  label: string;
  /** Bold time value shown in the row, e.g. "2hr 10min". */
  duration: string;
  /** Width percentage for the stacked bar segment (0–100). */
  percentage: number;
  /** CSS color used for this segment and its icon badge. */
  color: string;
  /** Icon node rendered inside the colored badge circle. */
  icon: ReactNode;
}

export interface VehiclesOverviewCardProps {
  title?: string;
  items: VehiclesOverviewItem[];
  className?: string;
  onMenuClick?: () => void;
}

// ── VehiclesOverviewCard ──────────────────────────────────────────────────────

export const VehiclesOverviewCard: FC<VehiclesOverviewCardProps> = ({
  title = "Vehicles Overview",
  items,
  className,
  onMenuClick,
}) => {
  const totalPct = items.reduce((sum, item) => sum + item.percentage, 0);

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
        className,
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between px-5 pb-2 pt-5">
        <p className="text-base font-bold text-ds-1">{title}</p>
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

      {/* ── Column headers ─────────────────────────────────────────────────── */}
      <div className="flex items-center px-5 pb-3">
        {items.map((item, i) => (
          <div key={item.label} className="flex flex-1 items-center">
            {i > 0 && (
              <div className="me-3 h-8 w-px shrink-0 bg-ds-border-3/60" />
            )}
            <span className="text-xs font-medium text-ds-3">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Stacked bar ────────────────────────────────────────────────────── */}
      <div className="mx-5 mb-5 flex h-3 overflow-hidden rounded-full">
        {items.map((item, i) => {
          const widthPct =
            totalPct > 0 ? (item.percentage / totalPct) * 100 : 0;
          return (
            <div
              key={item.label}
              style={{ width: `${widthPct}%`, backgroundColor: item.color }}
              className={mergeClassNames(
                "h-full transition-all",
                i === 0 && "rounded-s-full",
                i === items.length - 1 && "rounded-e-full",
              )}
              role="presentation"
              aria-label={`${item.label}: ${item.percentage}%`}
            />
          );
        })}
      </div>

      {/* ── Item list ──────────────────────────────────────────────────────── */}
      <div className="divide-y divide-ds-border-3/50 px-5 pb-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-3">
            {/* Icon badge */}
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${item.color}1a` }}
              aria-hidden="true"
            >
              <span style={{ color: item.color }} className="flex items-center">
                {item.icon}
              </span>
            </div>

            {/* Label */}
            <span className="min-w-0 flex-1 text-sm font-medium text-ds-2">
              {item.label}
            </span>

            {/* Duration */}
            <span className="text-sm font-bold text-ds-1">{item.duration}</span>

            {/* Percentage */}
            <span className="w-12 text-end text-xs font-semibold text-ds-3">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
