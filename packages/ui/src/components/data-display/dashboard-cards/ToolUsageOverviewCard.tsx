"use client";

import type { FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface ToolUsageSegment {
  label: string;
  /** Value shown in the row (e.g. "48.2M calls"). */
  value: string;
  /** Share of total usage (0–100). */
  percentage: number;
  color: string;
  /** Icon node or emoji. */
  icon: string;
}

export interface ToolUsageOverviewCardProps {
  title?: string;
  subtitle?: string;
  totalLabel?: string;
  totalValue?: string;
  segments?: ToolUsageSegment[];
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_SEGMENTS: ToolUsageSegment[] = [
  {
    label: "API Calls",
    value: "48.2M",
    percentage: 42,
    color: "#4F46E5",
    icon: "⚡",
  },
  {
    label: "Feature Activations",
    value: "21.7M",
    percentage: 19,
    color: "#0891B2",
    icon: "🔧",
  },
  {
    label: "File Storage",
    value: "18.3M",
    percentage: 16,
    color: "#059669",
    icon: "📁",
  },
  {
    label: "AI Completions",
    value: "14.9M",
    percentage: 13,
    color: "#D97706",
    icon: "🤖",
  },
  {
    label: "Webhook Events",
    value: "11.5M",
    percentage: 10,
    color: "#DC2626",
    icon: "🔔",
  },
];

// ── ToolUsageOverviewCard ─────────────────────────────────────────────────────

export const ToolUsageOverviewCard: FC<ToolUsageOverviewCardProps> = ({
  title = "Platform Usage Overview",
  subtitle = "All workspaces · current billing cycle",
  totalLabel = "Total Events",
  totalValue = "114.6M",
  segments = DEFAULT_SEGMENTS,
  className,
  onMenuClick,
}) => {
  const totalPct = segments.reduce((s, seg) => s + seg.percentage, 0);

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 pb-2 pt-5">
        <div>
          <p className="text-base font-bold text-ds-1">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
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

      {/* Total pill */}
      <div className="mx-5 mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-ds-1">{totalValue}</span>
        <span className="text-xs text-ds-3">{totalLabel}</span>
      </div>

      {/* Stacked bar */}
      <div className="mx-5 mb-4 flex h-3 overflow-hidden rounded-full">
        {segments.map((seg, i) => {
          const w = totalPct > 0 ? (seg.percentage / totalPct) * 100 : 0;
          return (
            <div
              key={seg.label}
              style={{ width: `${w}%`, backgroundColor: seg.color }}
              className={mergeClassNames(
                "h-full transition-all",
                i === 0 && "rounded-s-full",
                i === segments.length - 1 && "rounded-e-full",
              )}
              aria-label={`${seg.label}: ${seg.percentage}%`}
            />
          );
        })}
      </div>

      {/* Segment list */}
      <div className="divide-y divide-ds-border-3/50 px-5 pb-4">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-3 py-2.5">
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-base"
              style={{ backgroundColor: `${seg.color}20` }}
            >
              {seg.icon}
            </div>
            <span className="min-w-0 flex-1 text-sm font-medium text-ds-2">
              {seg.label}
            </span>
            <span className="text-sm font-bold text-ds-1">{seg.value}</span>
            <span className="w-10 text-end text-xs font-semibold text-ds-3">
              {seg.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
