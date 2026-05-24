"use client";

import type { FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export type AIInsightType =
  | "churn_risk"
  | "upsell_opportunity"
  | "usage_anomaly"
  | "revenue_forecast"
  | "recommendation";

export type AIInsightImpact = "critical" | "high" | "medium" | "low";

export interface AIInsight {
  id: string | number;
  type: AIInsightType;
  title: string;
  description: string;
  /** Number of accounts/users affected. */
  affectedCount: number;
  affectedLabel?: string;
  /** AI confidence 0–100. */
  confidence: number;
  impact: AIInsightImpact;
  /** Suggested action label. */
  actionLabel?: string;
  onAction?: () => void;
}

export interface AIInsightsCardProps {
  title?: string;
  subtitle?: string;
  insights?: AIInsight[];
  /** Total insights generated (may be more than shown). */
  totalInsights?: number;
  onViewAll?: () => void;
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_INSIGHTS: AIInsight[] = [
  {
    id: 1,
    type: "churn_risk",
    title: "23 Pro accounts showing churn signals",
    description: "Login frequency dropped >60% in last 14 days. Typical churn precursor observed 3–5 weeks before cancellation.",
    affectedCount: 23,
    affectedLabel: "accounts",
    confidence: 87,
    impact: "critical",
    actionLabel: "Send re-engagement",
  },
  {
    id: 2,
    type: "upsell_opportunity",
    title: "148 Starter accounts near API limit",
    description: "Hitting 90%+ of monthly API quota. Historically, 34% of these accounts upgrade to Pro within 2 billing cycles.",
    affectedCount: 148,
    affectedLabel: "accounts",
    confidence: 79,
    impact: "high",
    actionLabel: "Show upgrade prompt",
  },
  {
    id: 3,
    type: "revenue_forecast",
    title: "MRR projected to reach $198k next month",
    description: "Based on current trial-to-paid velocity (+12.4%) and low churn (2.3%). 95% confidence interval: $192k–$204k.",
    affectedCount: 0,
    affectedLabel: "forecast",
    confidence: 91,
    impact: "medium",
    actionLabel: "View forecast",
  },
  {
    id: 4,
    type: "usage_anomaly",
    title: "API spike detected in 3 Enterprise workspaces",
    description: "3× normal call volume for 6 consecutive hours. May indicate a runaway script or integration misconfiguration.",
    affectedCount: 3,
    affectedLabel: "workspaces",
    confidence: 96,
    impact: "high",
    actionLabel: "Investigate",
  },
  {
    id: 5,
    type: "recommendation",
    title: "Enable AI Copywriter for 340 inactive accounts",
    description: "Accounts that activate AI Copywriter show 2.4× higher 6-month retention. These accounts have never triggered it.",
    affectedCount: 340,
    affectedLabel: "accounts",
    confidence: 74,
    impact: "medium",
    actionLabel: "Create campaign",
  },
];

// ── Config maps ───────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<AIInsightType, { icon: string; label: string }> = {
  churn_risk:          { icon: "⚠️",  label: "Churn Risk"     },
  upsell_opportunity:  { icon: "⬆️",  label: "Upsell"         },
  usage_anomaly:       { icon: "📡",  label: "Anomaly"        },
  revenue_forecast:    { icon: "📈",  label: "Forecast"       },
  recommendation:      { icon: "💡",  label: "Tip"            },
};

const IMPACT_CONFIG: Record<AIInsightImpact, { label: string; bg: string; text: string }> = {
  critical: { label: "Critical", bg: "#FEF2F2", text: "#DC2626" },
  high:     { label: "High",     bg: "#FFF7ED", text: "#D97706" },
  medium:   { label: "Medium",   bg: "#EFF6FF", text: "#2563EB" },
  low:      { label: "Low",      bg: "#F0FDF4", text: "#16A34A" },
};

// ── InsightRow ────────────────────────────────────────────────────────────────

const InsightRow: FC<{ insight: AIInsight }> = ({ insight }) => {
  const type   = TYPE_CONFIG[insight.type];
  const impact = IMPACT_CONFIG[insight.impact];

  return (
    <li className="py-4 first:pt-3">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span className="mt-0.5 text-xl leading-none" aria-hidden="true">{type.icon}</span>

        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <p className="text-sm font-semibold text-ds-1">{insight.title}</p>
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
              style={{ backgroundColor: impact.bg, color: impact.text }}
            >
              {impact.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed text-ds-3 mb-2">{insight.description}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Confidence */}
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ds-surface-3">
                <div
                  className="h-full rounded-full bg-ds-accent"
                  style={{ width: `${insight.confidence}%` }}
                />
              </div>
              <span className="text-[10px] text-ds-3">{insight.confidence}% confidence</span>
            </div>

            {/* Affected count */}
            {insight.affectedCount > 0 && (
              <span className="text-[10px] text-ds-3">
                {insight.affectedCount.toLocaleString()} {insight.affectedLabel ?? "affected"}
              </span>
            )}

            {/* Type badge */}
            <span className="rounded-full border border-ds-border-2 px-2 py-0.5 text-[10px] font-medium text-ds-3">
              {type.label}
            </span>
          </div>
        </div>

        {/* Action button */}
        {insight.actionLabel && (
          <Button
            variant="tertiary"
            size="small"
            onClick={insight.onAction}
            className="shrink-0 whitespace-nowrap rounded-md border border-ds-border-2 bg-ds-surface-2 px-2.5! py-1! text-xs font-medium text-ds-2 hover:bg-ds-accent-subtle hover:text-ds-accent hover:border-ds-border-accent"
          >
            {insight.actionLabel}
          </Button>
        )}
      </div>
    </li>
  );
};

// ── AIInsightsCard ────────────────────────────────────────────────────────────

export const AIInsightsCard: FC<AIInsightsCardProps> = ({
  title         = "AI Business Insights",
  subtitle      = "Powered by usage patterns · updated hourly",
  insights      = DEFAULT_INSIGHTS,
  totalInsights = 18,
  onViewAll,
  className,
  onMenuClick,
}) => (
  <div className={mergeClassNames("rounded-lg border border-ds-border-3/80 bg-ds-surface-1", className)}>
    {/* Header */}
    <div className="flex items-start justify-between px-5 pb-1 pt-5">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-ds-1">{title}</p>
          {/* AI badge */}
          <span className="rounded-full bg-ds-accent px-2 py-0.5 text-[10px] font-bold text-ds-on-accent">
            AI
          </span>
        </div>
        {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
      </div>
      <Button variant="tertiary" size="small" className="shrink-0 p-0.5! text-ds-3" aria-label="More options" onClick={onMenuClick}>
        <EllipsisVerticalIcon width={18} height={18} />
      </Button>
    </div>

    {/* Summary strip */}
    <div className="mx-5 my-3 flex items-center justify-between rounded-lg bg-ds-surface-2 px-3 py-2">
      <span className="text-xs text-ds-3">
        <strong className="text-ds-1">{totalInsights}</strong> insights generated
      </span>
      <div className="flex items-center gap-3 text-[10px] text-ds-3">
        {(["critical", "high", "medium"] as AIInsightImpact[]).map((impact) => {
          const count = insights.filter((i) => i.impact === impact).length;
          const cfg   = IMPACT_CONFIG[impact];
          return count > 0 ? (
            <span key={impact} className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.text }} />
              {count} {cfg.label}
            </span>
          ) : null;
        })}
      </div>
    </div>

    {/* Insight list */}
    <ul className="divide-y divide-ds-border-3/50 px-5 pb-2" role="list">
      {insights.map((insight) => (
        <InsightRow key={insight.id} insight={insight} />
      ))}
    </ul>

    {/* Footer */}
    {onViewAll && (
      <div className="border-t border-ds-border-3/50 px-5 py-3">
        <Button
          variant="tertiary"
          onClick={onViewAll}
          className="w-full justify-center text-xs font-medium text-ds-3 hover:text-ds-1"
        >
          View all {totalInsights} insights →
        </Button>
      </div>
    )}
  </div>
);
