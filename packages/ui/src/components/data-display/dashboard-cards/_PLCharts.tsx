"use client";

import type { FC } from "react";
import {
  AreaChart,
  BarChart,
  ComposedChart,
  LineChart,
  Area,
  Bar,
  CartesianGrid,
  Cell,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

import type { PLDataPoint, PLMetricTab, PLWaterfallRole, PLWaterfallStep } from "./FinancialPLCard";

// ── Waterfall builder ──────────────────────────────────────────────────────────

export interface WFPoint { name: string; base: number; delta: number; role: PLWaterfallRole; }

export function buildWaterfallData(steps: PLWaterfallStep[], metrics: PLMetricTab[]): WFPoint[] {
  let running = 0;
  return steps.map((step) => {
    const raw = step.rawValue ?? metrics.find((m) => m.id === step.metricId)?.rawValue ?? 0;
    if (step.role === "add") {
      const base = running;
      running += raw;
      return { name: step.label, base, delta: raw, role: "add" as const };
    }
    if (step.role === "subtract") {
      running -= raw;
      return { name: step.label, base: running, delta: raw, role: "subtract" as const };
    }
    return { name: step.label, base: 0, delta: running, role: "total" as const };
  });
}

const WF_COLOR: Record<PLWaterfallRole, string> = {
  add:      "#22c55e",
  subtract: "#ef4444",
  total:    "var(--ds-color-accent)",
};

// ── Shared axis config ─────────────────────────────────────────────────────────

function ax(formatter: (v: number) => string) {
  return {
    xProps: { axisLine: false as const, tickLine: false as const, tick: { fill: "var(--ds-color-fg-muted)", fontSize: 11 }, dy: 10 },
    yProps: { axisLine: false as const, tickLine: false as const, tickFormatter: formatter, tick: { fill: "var(--ds-color-fg-muted)", fontSize: 11 }, dx: -4 },
    gridProps: { strokeDasharray: "3 3", vertical: false as const, stroke: "var(--ds-color-border)", opacity: 0.5 },
  };
}

// ── Waterfall tooltip ──────────────────────────────────────────────────────────

interface WFTipProps {
  active?: boolean;
  payload?: Array<{ payload: WFPoint }>;
  formatter: (v: number) => string;
}

const WFTooltip: FC<WFTipProps> = ({ active, payload, formatter }) => {
  if (!active || !payload?.length) return null;
  const { name, delta, role } = payload[0]!.payload;
  const sign = role === "subtract" ? "−" : role === "add" ? "+" : "";
  return (
    <div style={chartTooltipContentStyle}>
      <p style={chartTooltipLabelStyle}>{name}</p>
      <p style={{ ...chartTooltipItemStyle, color: WF_COLOR[role], fontWeight: 700 }}>
        {sign}{formatter(delta)}
      </p>
    </div>
  );
};

// ── Comparison tooltip ─────────────────────────────────────────────────────────

interface CmpTipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  formatter: (v: number) => string;
}

const CmpTooltip: FC<CmpTipProps> = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  const curr = payload.find((p) => p.name === "current") ?? payload[0]!;
  const prev = payload.find((p) => p.name === "prev")    ?? payload[1];
  const delta = prev ? curr.value - prev.value : null;
  const pct   = prev && prev.value !== 0
    ? ((curr.value - prev.value) / Math.abs(prev.value)) * 100
    : null;
  const isUp = delta !== null && delta >= 0;
  const trendColor = delta !== null ? (isUp ? "#22c55e" : "#ef4444") : undefined;
  return (
    <div style={chartTooltipContentStyle}>
      <p style={{ ...chartTooltipLabelStyle, marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ ...chartTooltipItemStyle, color: p.color }}>
          {p.name === "current" ? "Current" : "Previous"}:{" "}
          <span style={{ fontWeight: 700 }}>{formatter(p.value)}</span>
        </p>
      ))}
      {delta !== null && pct !== null && (
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid rgba(128,128,128,0.2)" }}>
          <p style={{ ...chartTooltipItemStyle, fontWeight: 700, color: trendColor }}>
            {isUp ? "▲" : "▼"} {isUp ? "+" : ""}{formatter(Math.abs(delta))}
          </p>
          <p style={{ ...chartTooltipItemStyle, fontWeight: 600, color: trendColor, fontSize: 11 }}>
            {isUp ? "+" : ""}{pct.toFixed(1)}% vs prev
          </p>
        </div>
      )}
    </div>
  );
};

// ── WaterfallChart ─────────────────────────────────────────────────────────────

interface WFChartProps { data: WFPoint[]; formatter: (v: number) => string; }

export const WaterfallChart: FC<WFChartProps> = ({ data, formatter }) => {
  const { xProps, yProps, gridProps } = ax(formatter);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} barSize={46} barCategoryGap="20%" margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...xProps} />
        <YAxis {...yProps} />
        <Tooltip
          wrapperStyle={chartTooltipWrapperStyle}
          cursor={{ fill: "var(--ds-color-accent)", fillOpacity: 0.06 }}
          content={(p) => <WFTooltip {...(p as unknown as WFTipProps)} formatter={formatter} />}
        />
        <Bar dataKey="base" stackId="wf" fill="transparent" legendType="none" />
        <Bar dataKey="delta" stackId="wf" radius={[4, 4, 0, 0]}>
          {data.map((e, i) => <Cell key={i} fill={WF_COLOR[e.role]} fillOpacity={0.9} />)}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

// ── SingleTabChart ─────────────────────────────────────────────────────────────

interface SingleProps {
  data: PLDataPoint[];
  chartType: "area" | "bar" | "line";
  color: string;
  formatter: (v: number) => string;
  label: string;
}

export const SingleTabChart: FC<SingleProps> = ({ data, chartType, color, formatter, label }) => {
  const { xProps, yProps, gridProps } = ax(formatter);
  const tip = (
    <Tooltip
      wrapperStyle={chartTooltipWrapperStyle}
      cursor={{ fill: "var(--ds-color-accent)", fillOpacity: 0.06 }}
      contentStyle={chartTooltipContentStyle}
      itemStyle={chartTooltipItemStyle}
      labelStyle={chartTooltipLabelStyle}
      formatter={(v) => [formatter(Number(v)), label]}
    />
  );

  if (chartType === "area") return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...xProps} />
        <YAxis {...yProps} />
        {tip}
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.12}
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: color, stroke: "var(--ds-color-bg-surface)", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  if (chartType === "line") return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...xProps} />
        <YAxis {...yProps} />
        {tip}
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const barSize = data.length > 20 ? 10 : data.length > 14 ? 16 : data.length > 8 ? 22 : 36;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barSize={barSize} barCategoryGap="25%" margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...xProps} />
        <YAxis {...yProps} />
        {tip}
        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill={color} fillOpacity={0.85} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// ── ComparisonChart ────────────────────────────────────────────────────────────

interface CmpProps {
  currentData: PLDataPoint[];
  prevData: PLDataPoint[];
  color: string;
  formatter: (v: number) => string;
  currentLabel: string;
  prevLabel: string;
}

export const ComparisonChart: FC<CmpProps> = ({ currentData, prevData, color, formatter }) => {
  const merged = currentData.map((pt, i) => ({
    name:    pt.name,
    current: pt.value,
    prev:    prevData[i]?.value ?? 0,
  }));
  const { xProps, yProps, gridProps } = ax(formatter);
  const muted = "var(--ds-color-fg-muted)";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={merged} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="cmp-curr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={color} stopOpacity={0.18} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="cmp-prev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={muted} stopOpacity={0.12} />
            <stop offset="95%" stopColor={muted} stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...xProps} />
        <YAxis {...yProps} />
        <ReferenceLine y={0} stroke="var(--ds-color-border)" strokeOpacity={0.4} />
        <Tooltip
          wrapperStyle={chartTooltipWrapperStyle}
          cursor={{ stroke: "var(--ds-color-border)", strokeWidth: 1, strokeDasharray: "4 2" }}
          content={(p) => <CmpTooltip {...(p as unknown as CmpTipProps)} formatter={formatter} />}
        />
        {/* prev area behind current */}
        <Area
          type="monotone"
          dataKey="prev"
          name="prev"
          stroke={muted}
          strokeWidth={1.5}
          strokeDasharray="5 4"
          fill="url(#cmp-prev)"
          dot={false}
          activeDot={{ r: 4, fill: muted, stroke: "var(--ds-color-bg-surface)", strokeWidth: 2 }}
        />
        {/* current area in front */}
        <Area
          type="monotone"
          dataKey="current"
          name="current"
          stroke={color}
          strokeWidth={2.5}
          fill="url(#cmp-curr)"
          dot={false}
          activeDot={{ r: 5, fill: color, stroke: "var(--ds-color-bg-surface)", strokeWidth: 2 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
