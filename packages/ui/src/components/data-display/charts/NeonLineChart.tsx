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
  lineColorStop1 = "#00f0ff",
  lineColorStop2 = "#ff00e5",
  glowColor = "rgba(255, 0, 229, 0.4)",
  className = "",
}) => {
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
              <stop offset="0%" stopColor={lineColorStop1} />
              <stop offset="100%" stopColor={lineColorStop2} />
            </linearGradient>

            {/* Glowing Drop Shadow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="8"
                floodColor={glowColor}
                floodOpacity="0.8"
              />
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="15"
                floodColor={lineColorStop1}
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* Minimal Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--color-neutral-800, #262626)"
            opacity={0.5}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-neutral-400, #a3a3a3)", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-neutral-400, #a3a3a3)", fontSize: 12 }}
            dx={-10}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(10, 10, 10, 0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
          />

          {/* The Neon Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#neonGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#fff", stroke: lineColorStop2, strokeWidth: 2 }}
            filter="url(#neonGlow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
