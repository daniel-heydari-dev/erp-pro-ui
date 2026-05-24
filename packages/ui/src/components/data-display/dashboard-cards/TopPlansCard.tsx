"use client";

import { useState, type FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export type TopPlansMetric = "accounts" | "mrr";

export interface PlanItem {
  id: string | number;
  name: string;
  tier: "free" | "starter" | "pro" | "enterprise";
  accounts: number;
  mrr: number;
  /** MoM growth % for active metric. */
  growth: number;
}

export interface TopPlansCardProps {
  title?: string;
  subtitle?: string;
  items?: PlanItem[];
  defaultMetric?: TopPlansMetric;
  byAccountsLabel?: string;
  byMrrLabel?: string;
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_ITEMS: PlanItem[] = [
  { id: 1, name: "Enterprise Annual",   tier: "enterprise", accounts: 168,  mrr: 84000, growth: +18.4 },
  { id: 2, name: "Pro Monthly",         tier: "pro",        accounts: 431,  mrr: 43100, growth: +12.1 },
  { id: 3, name: "Starter Annual",      tier: "starter",    accounts: 720,  mrr: 21600, growth: +6.8  },
  { id: 4, name: "Pro Annual",          tier: "pro",        accounts: 214,  mrr: 18190, growth: +9.3  },
  { id: 5, name: "Starter Monthly",     tier: "starter",    accounts: 506,  mrr: 10120, growth: +3.2  },
];

const TIER_COLORS: Record<PlanItem["tier"], string> = {
  enterprise: "#7C3AED",
  pro:        "#2563EB",
  starter:    "#0891B2",
  free:       "#64748B",
};

// ── TopPlansCard ──────────────────────────────────────────────────────────────

export const TopPlansCard: FC<TopPlansCardProps> = ({
  title           = "Top Subscription Plans",
  subtitle        = "Ranked by performance · this month",
  items           = DEFAULT_ITEMS,
  defaultMetric   = "mrr",
  byAccountsLabel = "By Accounts",
  byMrrLabel      = "By MRR",
  className,
  onMenuClick,
}) => {
  const [metric, setMetric] = useState<TopPlansMetric>(defaultMetric);

  const sorted = [...items].sort((a, b) =>
    metric === "mrr" ? b.mrr - a.mrr : b.accounts - a.accounts,
  );

  return (
    <div className={mergeClassNames("flex flex-col rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5", className)}>
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-base font-bold text-ds-1">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {/* Toggle */}
          <div className="flex rounded-md border border-ds-border-2 bg-ds-surface-2 p-0.5">
            {(["accounts", "mrr"] as TopPlansMetric[]).map((m) => (
              <Button
                key={m}
                variant="tertiary"
                onClick={() => setMetric(m)}
                className={mergeClassNames(
                  "rounded px-2! py-0.5! text-xs font-medium transition-colors",
                  metric === m ? "bg-ds-surface-1 text-ds-1 shadow-sm" : "text-ds-3 hover:text-ds-2",
                )}
                aria-pressed={metric === m}
              >
                {m === "accounts" ? byAccountsLabel : byMrrLabel}
              </Button>
            ))}
          </div>
          <Button variant="tertiary" size="small" className="p-0.5! text-ds-3" aria-label="More options" onClick={onMenuClick}>
            <EllipsisVerticalIcon width={18} height={18} />
          </Button>
        </div>
      </div>

      {/* Plan list */}
      <ul className="flex flex-col divide-y divide-ds-border-2" role="list">
        {sorted.map((plan, idx) => (
          <li key={plan.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            {/* Rank */}
            <span
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold"
              style={{ borderColor: TIER_COLORS[plan.tier], color: TIER_COLORS[plan.tier] }}
            >
              {idx + 1}
            </span>

            {/* Name + tier badge */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-sm font-semibold text-ds-1">{plan.name}</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase"
                  style={{ backgroundColor: `${TIER_COLORS[plan.tier]}18`, color: TIER_COLORS[plan.tier] }}
                >
                  {plan.tier}
                </span>
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: plan.growth >= 0 ? "#22c55e" : "#ef4444" }}
                >
                  {plan.growth >= 0 ? "+" : ""}{plan.growth}%
                </span>
              </div>
            </div>

            {/* Primary metric */}
            <div className="text-end">
              <p className="text-sm font-bold text-ds-1">
                {metric === "mrr"
                  ? `$${(plan.mrr / 1000).toFixed(1)}k`
                  : plan.accounts.toLocaleString()}
              </p>
              <p className="text-[10px] text-ds-3">
                {metric === "mrr" ? "MRR" : "accounts"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
