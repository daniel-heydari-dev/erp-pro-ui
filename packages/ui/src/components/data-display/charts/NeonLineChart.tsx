"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getChartColorVar,
  normalizeChartColorValue,
  normalizeChartColors,
} from "./chartPalette";

interface DataPoint {
  name: string;
  value: number;
}

interface NeonLineChartProps {
  data: DataPoint[];
  height?: number | string;
  lineColorStop1?: string;
  lineColorStop2?: string;
  className?: string;
  glowColor?: string;
}

export const NeonLineChart: React.FC<NeonLineChartProps> = ({
  data,
  height = 300,
  lineColorStop1 = getChartColorVar(2),
  lineColorStop2 = getChartColorVar(1),
  glowColor = getChartColorVar(1),
  className = "",
}) => {
  const [normalizedStop1, normalizedStop2] = React.useMemo(
    () => normalizeChartColors([lineColorStop1, lineColorStop2]),
    [lineColorStop1, lineColorStop2],
  );
  const normalizedGlowColor = React.useMemo(
    () => normalizeChartColorValue(glowColor) ?? getChartColorVar(1),
    [glowColor],
  );

  return (
    <div className={`w-full relative ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <defs>
            {/* Linear Gradient for the Line */}
            <linearGradient id="neonGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={normalizedStop1} />
              <stop offset="100%" stopColor={normalizedStop2} />
            </linearGradient>

            {/* Glowing Drop Shadow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="8"
                floodColor={normalizedGlowColor}
                floodOpacity="0.8"
              />
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="15"
                floodColor={normalizedStop1}
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* Minimal Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--ds-color-border)"
            opacity={0.5}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 12 }}
            dx={-10}
          />

          <Tooltip
            contentStyle={{
              backgroundColor:
                "color-mix(in srgb, var(--ds-color-surface) 92%, transparent)",
              border: "1px solid var(--ds-color-border)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              color: "var(--ds-color-fg)",
            }}
            itemStyle={{ color: "var(--ds-color-fg)" }}
          />

          {/* The Neon Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#neonGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: "var(--ds-color-surface)",
              stroke: normalizedStop2,
              strokeWidth: 2,
            }}
            filter="url(#neonGlow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
