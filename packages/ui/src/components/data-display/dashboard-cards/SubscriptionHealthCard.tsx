"use client";

import type { FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface SubscriptionTierHealth {
  tier: string;
  /** Number of active accounts on this tier. */
  accounts: number;
  /** Health score 0–100 (engagement + payment + retention composite). */
  healthScore: number;
  /** Churn rate % for this tier in the current period. */
  churnRate: number;
  /** Trend direction for health score. */
  trend: "up" | "down" | "flat";
  /** CSS color for gauge and label. */
  color: string;
}

export interface SubscriptionHealthCardProps {
  title?: string;
  subtitle?: string;
  tiers?: SubscriptionTierHealth[];
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_TIERS: SubscriptionTierHealth[] = [
  {
    tier: "Enterprise",
    accounts: 168,
    healthScore: 94,
    churnRate: 0.4,
    trend: "up",
    color: "#7C3AED",
  },
  {
    tier: "Pro",
    accounts: 431,
    healthScore: 81,
    churnRate: 1.2,
    trend: "up",
    color: "#2563EB",
  },
  {
    tier: "Starter",
    accounts: 720,
    healthScore: 67,
    churnRate: 2.8,
    trend: "flat",
    color: "#0891B2",
  },
  {
    tier: "Free",
    accounts: 1081,
    healthScore: 44,
    churnRate: 8.1,
    trend: "down",
    color: "#64748B",
  },
];

// ── Mini circular gauge ───────────────────────────────────────────────────────

const MiniGauge: FC<{ score: number; color: string; size?: number }> = ({
  score,
  color,
  size = 58,
}) => {
  const sw = 4;
  const r = (size - sw * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.max(0, Math.min(100, score)) / 100) * circ;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--ds-color-border)"
        strokeWidth={sw}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.22}
        fontWeight="700"
        fill="var(--ds-color-fg)"
      >
        {score}
      </text>
    </svg>
  );
};

// ── Trend icon ────────────────────────────────────────────────────────────────

const TrendIcon: FC<{ trend: "up" | "down" | "flat" }> = ({ trend }) => {
  if (trend === "up")
    return <span className="text-[10px] font-bold text-emerald-500">↑</span>;
  if (trend === "down")
    return <span className="text-[10px] font-bold text-red-500">↓</span>;
  return <span className="text-[10px] font-bold text-ds-3">→</span>;
};

// ── SubscriptionHealthCard ────────────────────────────────────────────────────

export const SubscriptionHealthCard: FC<SubscriptionHealthCardProps> = ({
  title = "Subscription Health",
  subtitle = "Health score by tier · lower churn = higher score",
  tiers = DEFAULT_TIERS,
  className,
  onMenuClick,
}) => (
  <div
    className={mergeClassNames(
      "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
      className,
    )}
  >
    {/* Header */}
    <div className="flex items-start justify-between px-5 pb-1 pt-5">
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

    {/* Tier list */}
    <div className="divide-y divide-ds-border-3/50 px-5 pb-4">
      {tiers.map((t) => (
        <div key={t.tier} className="flex items-center gap-4 py-3">
          <div className="shrink-0">
            <MiniGauge score={t.healthScore} color={t.color} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold" style={{ color: t.color }}>
                {t.tier}
              </p>
              <TrendIcon trend={t.trend} />
            </div>
            <p className="mt-0.5 text-xs text-ds-3">
              {t.accounts.toLocaleString()} accounts · {t.churnRate}% churn
            </p>
          </div>

          <span className="shrink-0 rounded-md bg-ds-surface-2 px-2 py-1 text-xs font-semibold text-ds-2">
            {t.healthScore}/100
          </span>
        </div>
      ))}
    </div>
  </div>
);
