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

import { normalizeChartColors } from "./chartPalette";

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
  const normalizedCategories = React.useMemo(() => {
    const normalizedColors = normalizeChartColors(
      categories.map((category) => category.color),
    );

    return categories.map((category, index) => ({
      ...category,
      color: normalizedColors[index] ?? category.color,
    }));
  }, [categories]);

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {normalizedCategories.map((cat) => (
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
              stroke="var(--ds-color-border)"
              opacity={0.5}
            />
          )}

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

          {normalizedCategories.map((cat) => (
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
