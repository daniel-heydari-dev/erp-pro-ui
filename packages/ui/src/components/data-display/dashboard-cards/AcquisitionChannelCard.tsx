"use client";

import type { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "../../forms/button";
import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

// ── Public types ──────────────────────────────────────────────────────────────

export interface AcquisitionChannel {
  key: string;
  label: string;
  /** New subscriptions this period. */
  newSubs: number;
  color: string;
}

export interface AcquisitionPlanRow {
  name: string;
  direct: number;
  marketplace: number;
  affiliate: number;
  partner: number;
}

export interface AcquisitionChannelCardProps {
  title?: string;
  channels?: AcquisitionChannel[];
  plans?: AcquisitionPlanRow[];
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_CHANNELS: AcquisitionChannel[] = [
  { key: "direct", label: "Direct", newSubs: 312, color: "#4F46E5" },
  { key: "marketplace", label: "Marketplace", newSubs: 198, color: "#0891B2" },
  { key: "affiliate", label: "Affiliate", newSubs: 147, color: "#D97706" },
  { key: "partner", label: "Partner", newSubs: 89, color: "#059669" },
];

const DEFAULT_PLANS: AcquisitionPlanRow[] = [
  {
    name: "Enterprise",
    direct: 42,
    marketplace: 18,
    affiliate: 8,
    partner: 31,
  },
  { name: "Pro", direct: 124, marketplace: 76, affiliate: 54, partner: 38 },
  {
    name: "Starter",
    direct: 146,
    marketplace: 104,
    affiliate: 85,
    partner: 20,
  },
];

const fmtK = (v: number) =>
  v === 0 ? "0" : v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v);

// ── Icons ─────────────────────────────────────────────────────────────────────

const ExpandIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

// ── AcquisitionChannelCard ────────────────────────────────────────────────────

export const AcquisitionChannelCard: FC<AcquisitionChannelCardProps> = ({
  title = "Acquisition by Channel",
  channels = DEFAULT_CHANNELS,
  plans = DEFAULT_PLANS,
  className,
  onMenuClick,
}) => {
  const channelMap = Object.fromEntries(channels.map((c) => [c.key, c]));
  const maxSubs = plans.reduce(
    (m, p) => Math.max(m, p.direct + p.marketplace + p.affiliate + p.partner),
    0,
  );
  const xMax = Math.ceil(maxSubs / 50) * 50;

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <p className="text-base font-bold text-ds-1">{title}</p>
        <div className="flex items-center gap-0.5">
          <Button
            variant="tertiary"
            size="small"
            className="p-1! text-ds-3"
            aria-label="Expand"
            onClick={onMenuClick}
          >
            <ExpandIcon />
          </Button>
        </div>
      </div>

      {/* Channel metrics */}
      <div className="grid grid-cols-4 divide-x divide-ds-border-3/50 border-b border-ds-border-3/50 pb-3">
        {channels.map((ch) => (
          <div
            key={ch.key}
            className="flex flex-col items-center gap-0.5 px-2 pt-1"
          >
            <div
              className="mb-1 h-1 w-6 rounded-full"
              style={{ backgroundColor: ch.color }}
              aria-hidden="true"
            />
            <p className="text-base font-bold text-ds-1">{ch.newSubs}</p>
            <p className="text-center text-[10px] leading-tight text-ds-3">
              {ch.label}
            </p>
          </div>
        ))}
      </div>

      {/* Horizontal stacked bar by plan */}
      <div style={{ height: plans.length * 58 + 44 }} className="px-2 pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={plans}
            layout="vertical"
            barSize={16}
            barCategoryGap="35%"
            margin={{ top: 4, right: 12, left: 0, bottom: 4 }}
          >
            <XAxis
              type="number"
              domain={[0, xMax]}
              axisLine={false}
              tickLine={false}
              tickFormatter={fmtK}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 10 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 11 }}
              width={60}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              wrapperStyle={chartTooltipWrapperStyle}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              formatter={(v, name) => [
                Number(v).toLocaleString() + " new subs",
                channelMap[name as string]?.label ?? String(name),
              ]}
            />
            <Bar
              dataKey="direct"
              stackId="s"
              fill={channelMap.direct?.color ?? "#4F46E5"}
              radius={[2, 0, 0, 2]}
            />
            <Bar
              dataKey="marketplace"
              stackId="s"
              fill={channelMap.marketplace?.color ?? "#0891B2"}
            />
            <Bar
              dataKey="affiliate"
              stackId="s"
              fill={channelMap.affiliate?.color ?? "#D97706"}
            />
            <Bar
              dataKey="partner"
              stackId="s"
              fill={channelMap.partner?.color ?? "#059669"}
              radius={[0, 2, 2, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 px-5 pb-4 pt-1">
        {channels.map((ch) => (
          <div key={ch.key} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: ch.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-ds-2">{ch.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
