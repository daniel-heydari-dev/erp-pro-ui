"use client";

import type { FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface TopToolItem {
  id: string | number;
  name: string;
  category: string;
  /** Monthly Active Users. */
  mau: number;
  /** MoM growth percentage. */
  growth: number;
  /** Emoji or short icon string. */
  icon: string;
  rank: number;
}

export interface TopToolsCardProps {
  title?: string;
  subtitle?: string;
  items?: TopToolItem[];
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_ITEMS: TopToolItem[] = [
  { id: 1, name: "AI Copywriter",     category: "Content",    mau: 18420, growth: +24.3, icon: "✍️",  rank: 1 },
  { id: 2, name: "Analytics Pro",     category: "Analytics",  mau: 14890, growth: +11.7, icon: "📊",  rank: 2 },
  { id: 3, name: "Invoice Manager",   category: "Finance",    mau: 12340, growth: +8.2,  icon: "🧾",  rank: 3 },
  { id: 4, name: "Team Scheduler",    category: "HR",         mau: 9870,  growth: +5.6,  icon: "📅",  rank: 4 },
  { id: 5, name: "Support Desk",      category: "Support",    mau: 8210,  growth: -2.1,  icon: "🎫",  rank: 5 },
];

// ── RankBadge ─────────────────────────────────────────────────────────────────

const RankBadge: FC<{ rank: number }> = ({ rank }) => (
  <span
    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold"
    style={{ borderColor: "var(--ds-color-accent)", color: "var(--ds-color-accent)" }}
    aria-label={`Rank ${rank}`}
  >
    {rank}
  </span>
);

// ── TopToolsCard ──────────────────────────────────────────────────────────────

export const TopToolsCard: FC<TopToolsCardProps> = ({
  title    = "Top Tools by Usage",
  subtitle = "Monthly Active Users · last 30 days",
  items    = DEFAULT_ITEMS,
  className,
  onMenuClick,
}) => (
  <div className={mergeClassNames("flex flex-col rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5", className)}>
    <div className="mb-4 flex items-start justify-between">
      <div>
        <p className="text-base font-bold text-ds-1">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
      </div>
      <Button variant="tertiary" size="small" className="shrink-0 p-0.5! text-ds-3" aria-label="More options" onClick={onMenuClick}>
        <EllipsisVerticalIcon width={18} height={18} />
      </Button>
    </div>

    <ul className="flex flex-col divide-y divide-ds-border-2" role="list">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
          {/* Tool icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ds-surface-2 text-lg">
            {item.icon}
          </div>

          {/* Name + category */}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-sm font-semibold text-ds-1">{item.name}</span>
            <span className="flex items-center gap-1.5 text-xs text-ds-3">
              {item.category}
              <span className="text-ds-border-3">·</span>
              <span className="font-medium text-ds-2">{item.mau.toLocaleString()} MAU</span>
              <span
                className="font-semibold"
                style={{ color: item.growth >= 0 ? "#22c55e" : "#ef4444" }}
              >
                {item.growth >= 0 ? "+" : ""}{item.growth}%
              </span>
            </span>
          </div>

          <RankBadge rank={item.rank} />
        </li>
      ))}
    </ul>
  </div>
);
