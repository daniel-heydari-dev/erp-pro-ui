"use client";

import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface AreaChartData {
  name: string;
  [key: string]: string | number;
}

interface AreaChartProps {
  data: AreaChartData[];
  categories: { key: string; color: string }[];
  height?: number | string;
  className?: string;
  showGrid?: boolean;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  categories,
  height = 300,
  className = "",
  showGrid = true,
}) => {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {categories.map((cat) => (
              <linearGradient
                key={`gradient-${cat.key}`}
                id={`color-${cat.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={cat.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={cat.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-neutral-800, #262626)"
              opacity={0.5}
            />
          )}

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
              backgroundColor: "rgba(10, 10, 10, 0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
          />

          {categories.map((cat) => (
            <Area
              key={cat.key}
              type="monotone"
              dataKey={cat.key}
              stroke={cat.color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#color-${cat.key})`}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};
