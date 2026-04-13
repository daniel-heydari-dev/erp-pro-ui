"use client";

import React from "react";
import { Area, AreaChart, Line, ResponsiveContainer, Tooltip } from "recharts";

import { getChartColorVar, normalizeChartColorValue } from "./chartPalette";

export interface MiniNeonSparklinePoint {
  label: string;
  value: number;
}

export type MiniNeonSparklineTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface MiniNeonSparklineProps {
  data: MiniNeonSparklinePoint[];
  height?: number;
  strokeWidth?: number;
  className?: string;
  showArea?: boolean;
  showTooltip?: boolean;
  tone?: MiniNeonSparklineTone;
}

const toneColorMap: Record<MiniNeonSparklineTone, string> = {
  default: getChartColorVar(1),
  success: "var(--ds-color-success)",
  warning: "var(--ds-color-warning)",
  danger: "var(--ds-color-danger)",
  info: "var(--ds-color-info)",
};

const tooltipContentStyle: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid var(--ds-border-2)",
  background: "var(--ds-surface-1)",
  color: "var(--ds-text-1)",
  fontSize: "12px",
};

export const MiniNeonSparkline: React.FC<MiniNeonSparklineProps> = ({
  data,
  height = 46,
  strokeWidth = 2,
  className = "",
  showArea = true,
  showTooltip = true,
  tone = "default",
}) => {
  const resolvedTone = React.useMemo(
    () => normalizeChartColorValue(toneColorMap[tone]) ?? toneColorMap.default,
    [tone],
  );

  const chartGradientId = React.useId();
  const chartGlowId = React.useId();

  return (
    <div className={`ui:relative ui:w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 4, right: 2, left: 2, bottom: 4 }}
        >
          <defs>
            <linearGradient id={chartGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={resolvedTone} stopOpacity={0.35} />
              <stop offset="100%" stopColor={resolvedTone} stopOpacity={0.02} />
            </linearGradient>
            <filter
              id={chartGlowId}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor={resolvedTone}
                floodOpacity="0.45"
              />
            </filter>
          </defs>

          {showArea ? (
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill={`url(#${chartGradientId})`}
            />
          ) : null}

          <Line
            type="monotone"
            dataKey="value"
            stroke={resolvedTone}
            strokeWidth={strokeWidth}
            dot={false}
            isAnimationActive={false}
            filter={`url(#${chartGlowId})`}
          />

          {showTooltip ? (
            <Tooltip
              contentStyle={tooltipContentStyle}
              labelStyle={{ color: "var(--ds-text-2)", marginBottom: "4px" }}
              itemStyle={{ color: "var(--ds-text-1)", fontWeight: 600 }}
              formatter={(value) => [String(value ?? ""), "Value"]}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
