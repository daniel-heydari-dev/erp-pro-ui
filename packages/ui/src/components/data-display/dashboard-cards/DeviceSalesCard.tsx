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

export interface DeviceSalesChannel {
  key: string;
  label: string;
  /** Number shown as headline metric. */
  sales: number;
  color: string;
}

export interface DeviceSalesBrandRow {
  name: string;
  retail: number;
  website: number;
  thirdParty: number;
}

export interface DeviceSalesCardProps {
  title?: string;
  channels?: DeviceSalesChannel[];
  brands?: DeviceSalesBrandRow[];
  className?: string;
  onExpand?: () => void;
  onEdit?: () => void;
  onMoreClick?: () => void;
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_CHANNELS: DeviceSalesChannel[] = [
  { key: "retail",     label: "Retail",       sales: 310,   color: "#4361EE" },
  { key: "website",    label: "Website",      sales: 1420,  color: "#00CFE8" },
  { key: "thirdParty", label: "Third Party",  sales: 1920,  color: "#FF9F43" },
];

const DEFAULT_BRANDS: DeviceSalesBrandRow[] = [
  { name: "Apple",  retail: 35000, website: 40000, thirdParty: 45000 },
  { name: "Lenovo", retail: 20000, website: 35000, thirdParty: 30000 },
  { name: "Asus",   retail: 15000, website: 25000, thirdParty: 20000 },
];

// ── Icons ─────────────────────────────────────────────────────────────────────

const InfoIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

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

const EditIcon = () => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const EllipsisHIcon = () => (
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
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

// ── DeviceSalesCard ───────────────────────────────────────────────────────────

const xTickFormatter = (v: number) =>
  v === 0 ? "0" : `${Math.round(v / 1000)}K`;

export const DeviceSalesCard: FC<DeviceSalesCardProps> = ({
  title = "Device Sales",
  channels = DEFAULT_CHANNELS,
  brands = DEFAULT_BRANDS,
  className,
  onExpand,
  onEdit,
  onMoreClick,
}) => {
  const channelMap = Object.fromEntries(channels.map((c) => [c.key, c]));
  const maxValue =
    Math.ceil(
      brands.reduce(
        (max, b) =>
          Math.max(max, b.retail + b.website + b.thirdParty),
        0,
      ) / 20000,
    ) * 20000;

  const xDomain: [number, number] = [0, Math.max(maxValue, 100000)];
  const xTicks = Array.from(
    { length: Math.floor(xDomain[1] / 20000) + 1 },
    (_, i) => i * 20000,
  );

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
        className,
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-ds-1">{title}</p>
          <span className="text-ds-3" aria-hidden="true">
            <InfoIcon />
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            variant="tertiary"
            size="small"
            className="p-1! text-ds-3"
            aria-label="Expand"
            onClick={onExpand}
          >
            <ExpandIcon />
          </Button>
          <Button
            variant="tertiary"
            size="small"
            className="p-1! text-ds-3"
            aria-label="Edit"
            onClick={onEdit}
          >
            <EditIcon />
          </Button>
          <Button
            variant="tertiary"
            size="small"
            className="p-1! text-ds-3"
            aria-label="More options"
            onClick={onMoreClick}
          >
            <EllipsisHIcon />
          </Button>
        </div>
      </div>

      {/* ── Channel metrics ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 divide-x divide-ds-border-3/50 border-b border-ds-border-3/50 pb-4">
        {channels.map((channel) => (
          <div
            key={channel.key}
            className="flex flex-col items-center gap-1 px-3 pt-1"
          >
            <div
              className="mb-1 h-1 w-8 rounded-full"
              style={{ backgroundColor: channel.color }}
              aria-hidden="true"
            />
            <p className="text-lg font-bold text-ds-1">
              {channel.sales.toLocaleString()}
            </p>
            <p className="text-center text-[11px] leading-tight text-ds-3">
              {channel.label} Sales
            </p>
          </div>
        ))}
      </div>

      {/* ── Horizontal stacked bar chart ───────────────────────────────────── */}
      <div style={{ height: brands.length * 64 + 56 }} className="px-2 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={brands}
            layout="vertical"
            barSize={18}
            barCategoryGap="35%"
            margin={{ top: 4, right: 12, left: 0, bottom: 4 }}
          >
            <XAxis
              type="number"
              domain={xDomain}
              ticks={xTicks}
              axisLine={false}
              tickLine={false}
              tickFormatter={xTickFormatter}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 10 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 12 }}
              width={52}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              wrapperStyle={chartTooltipWrapperStyle}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              formatter={(v, name) => [
                Number(v).toLocaleString(),
                channelMap[name as string]?.label ?? String(name),
              ]}
            />
            <Bar
              dataKey="retail"
              stackId="stack"
              fill={channelMap.retail?.color ?? "#4361EE"}
              radius={[2, 0, 0, 2]}
            />
            <Bar
              dataKey="website"
              stackId="stack"
              fill={channelMap.website?.color ?? "#00CFE8"}
            />
            <Bar
              dataKey="thirdParty"
              stackId="stack"
              fill={channelMap.thirdParty?.color ?? "#FF9F43"}
              radius={[0, 2, 2, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Legend ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-4 px-5 pb-4 pt-1">
        {channels.map((channel) => (
          <div key={channel.key} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: channel.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-ds-2">{channel.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
