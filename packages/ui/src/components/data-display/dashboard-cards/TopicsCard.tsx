"use client";

import type { FC } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { TruncatedText } from "../../typography/truncated-text";
import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

// ── Bar label ─────────────────────────────────────────────────────────────────
// foreignObject lets us use TruncatedText (HTML) inside the Recharts SVG canvas.

interface BarLabelProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: string;
}

function BarLabel({ x = 0, y = 0, width = 0, height = 0, value = "" }: BarLabelProps) {
  const pad = 10;
  const availW = width - pad * 2;
  if (availW < 24) return null;

  return (
    <foreignObject x={x + pad} y={y} width={availW} height={height}>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <TruncatedText
          showTitleOnHover
          style={{ color: "#fff", fontSize: 12, fontWeight: 600, lineHeight: 1 }}
        >
          {value}
        </TruncatedText>
      </div>
    </foreignObject>
  );
}

// ── Public types ──────────────────────────────────────────────────────────────

export interface TopicItem {
  label: string;
  /** 0–100 — drives both the bar width and the legend percentage. */
  percentage: number;
  /** CSS color for the bar and the legend dot. */
  color: string;
}

export interface TopicsCardProps {
  title?: string;
  items: TopicItem[];
  /** X-axis tick formatter. Defaults to "N%" format. */
  xTickFormatter?: (value: number) => string;
  className?: string;
  onMenuClick?: () => void;
}

// ── TopicsCard ────────────────────────────────────────────────────────────────

export const TopicsCard: FC<TopicsCardProps> = ({
  title = "Topic you are interested in",
  items,
  xTickFormatter = (v: number) => `${v}%`,
  className,
  onMenuClick,
}) => {
  // Recharts vertical layout: data renders top→bottom, so reverse to put
  // the highest-value item at the top.
  const chartData = [...items]
    .sort((a, b) => b.percentage - a.percentage)
    .map((item, i) => ({
      ...item,
      rank: items.length - i,
    }));

  const maxValue = Math.max(...items.map((it) => it.percentage), 1);
  // Round up to next multiple of 7 for clean percentage gridlines
  const xMax = Math.ceil(maxValue / 7) * 7;
  const xTicks = Array.from(
    { length: Math.floor(xMax / 7) + 1 },
    (_, i) => i * 7,
  );

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
        className,
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between px-5 pb-4 pt-5">
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

      {/* ── Body: chart + legend ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-5 pb-6">
        {/* Horizontal bar chart */}
        <div className="min-w-0 flex-1" style={{ height: items.length * 42 + 32 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={chartData}
              layout="vertical"
              barSize={28}
              barCategoryGap="20%"
              margin={{ top: 0, right: 16, left: 8, bottom: 24 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="var(--ds-color-border)"
                opacity={0.5}
              />
              <XAxis
                type="number"
                domain={[0, xMax]}
                ticks={xTicks}
                tickFormatter={xTickFormatter}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 11 }}
                dy={10}
              />
              <YAxis
                type="category"
                dataKey="rank"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 11 }}
                dx={-4}
                width={16}
              />
              <Tooltip
                contentStyle={chartTooltipContentStyle}
                itemStyle={chartTooltipItemStyle}
                labelStyle={chartTooltipLabelStyle}
                wrapperStyle={chartTooltipWrapperStyle}
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                formatter={(v, _name, props) => [
                  `${Number(v)}%`,
                  (props as { payload?: { label?: string } }).payload?.label ?? "",
                ]}
                labelFormatter={() => ""}
              />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey="label"
                  content={(props) => <BarLabel {...(props as BarLabelProps)} />}
                />
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend: 2-column grid */}
        <div className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="text-xs text-ds-2">{item.label}</span>
              </div>
              <p className="ps-4 text-sm font-bold text-ds-1">
                {item.percentage}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
