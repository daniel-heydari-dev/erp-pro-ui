"use client";

import type { FC, ReactNode } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { Tooltip } from "../../overlays/tooltip/Tooltip";
import { TruncatedText } from "../../typography/truncated-text";
import { mergeClassNames } from "../../../utils";

// ── Gauge SVG ─────────────────────────────────────────────────────────────────
// Renders a 270° segmented arc gauge from 7:30 (lower-left) to 4:30 (lower-right)
// going clockwise through 12 o'clock. Each dash is a small rounded rect oriented
// radially. Filled dashes render in accent color; empty ones render in border color.

interface GaugeChartProps {
  percentage: number;
  label?: string;
  size?: number;
}

function GaugeChart({
  percentage,
  label = "Completed Task",
  size = 190,
}: GaugeChartProps) {
  const segments = 26;
  const filledCount = Math.round((percentage / 100) * segments);

  const cx = size / 2;
  const cy = size * 0.5;
  const radius = size * 0.4;
  const segW = size * 0.03;
  const segH = size * 0.1;

  const startAngle = 135;
  const totalArc = 270;
  const step = totalArc / segments;

  // Clip bottom of viewBox — arc bottom sits at cy + radius * sin(135°) ≈ cy + r * 0.707
  const viewH = Math.ceil(cy + radius * 0.78 + segH);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${size} ${viewH}`}
      style={{ aspectRatio: `${size} / ${viewH}` }}
      aria-label={`${percentage}% ${label}`}
      role="img"
    >
      {Array.from({ length: segments }, (_, i) => {
        // Center of this segment on the arc
        const angleDeg = startAngle + (i + 0.5) * step;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = cx + radius * Math.cos(angleRad);
        const y = cy + radius * Math.sin(angleRad);
        const filled = i < filledCount;

        return (
          <rect
            key={i}
            // Draw centered at origin then translate + rotate into position
            x={-segW / 2}
            y={-segH / 2}
            width={segW}
            height={segH}
            rx={segW / 2}
            fill={
              filled
                ? "var(--ds-color-accent)"
                : "var(--ds-color-border-3)"
            }
            opacity={filled ? 1 : 0.45}
            // Rotate(θ - 90°) makes the rect's height align radially outward
            transform={`translate(${x}, ${y}) rotate(${angleDeg - 90})`}
          />
        );
      })}

      {/* "Completed Task" label — above center */}
      <text
        x={cx}
        y={cy - size * 0.04}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.085}
        fill="var(--ds-color-fg-muted)"
      >
        {label}
      </text>

      {/* Percentage — large, below label */}
      <text
        x={cx}
        y={cy + size * 0.12}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.22}
        fontWeight="700"
        fill="var(--ds-color-fg)"
      >
        {percentage}%
      </text>
    </svg>
  );
}

// ── Public types ──────────────────────────────────────────────────────────────

export interface SupportItem {
  icon: ReactNode;
  /** CSS color for the icon badge background (rendered at ~15% opacity). */
  iconColor: string;
  label: string;
  value: string;
}

export interface SupportTrackerCardProps {
  title?: string;
  subtitle?: string;
  /** Large headline number (e.g. total ticket count). */
  total: number | string;
  totalLabel?: string;
  /** Up to 4 stat rows shown on the left. */
  items: SupportItem[];
  /** 0–100 — drives the gauge arc fill. */
  percentage: number;
  /** Label inside the gauge below the percentage. */
  completedLabel?: string;
  className?: string;
  onMenuClick?: () => void;
}

// ── SupportTrackerCard ────────────────────────────────────────────────────────

export const SupportTrackerCard: FC<SupportTrackerCardProps> = ({
  title = "Support Tracker",
  subtitle = "Last 7 Days",
  total,
  totalLabel = "Total Tickets",
  items,
  percentage,
  completedLabel = "Completed Task",
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

    {/* ── Body: left stats + right gauge ───────────────────────────────────── */}
    <div className="flex items-center gap-3 px-5 pb-6">
      {/* Left column */}
      <div className="flex flex-[1_1_0] flex-col gap-5 min-w-0">
        {/* Total */}
        <div>
          <p className="text-4xl font-bold tracking-tight text-ds-1">
            {total}
          </p>
          <p className="mt-0.5 text-xs text-ds-3">{totalLabel}</p>
        </div>

        {/* Item list */}
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md"
                style={{
                  backgroundColor: item.iconColor + "22",
                  color: item.iconColor,
                }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <div className="min-w-0">
                <Tooltip content={item.label} position="top" delayShow={400}>
                  <TruncatedText
                    showTitleOnHover
                    className="text-sm font-semibold text-ds-1"
                  >
                    {item.label}
                  </TruncatedText>
                </Tooltip>
                <p className="text-xs text-ds-3">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: gauge — flex-1 so it grows/shrinks with card width */}
      <div className="flex-[1_1_0] min-w-0">
        <GaugeChart
          percentage={percentage}
          label={completedLabel}
          size={190}
        />
      </div>
    </div>
  </div>
);
