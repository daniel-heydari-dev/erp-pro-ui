"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { normalizeChartColors } from "./chartPalette";

export interface StackedBarData {
  name: string;
  [key: string]: string | number;
}

interface StackedBarChartProps {
  data: StackedBarData[];
  categories: { key: string; color: string; label: string }[];
  height?: number | string;
  yAxisDomain?: [number, number];
  className?: string;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  categories,
  height = 300,
  yAxisDomain,
  className = "",
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
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--ds-color-border)"
            opacity={0.4}
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
            domain={yAxisDomain}
          />
          <Tooltip
            cursor={{
              fill: "color-mix(in srgb, var(--ds-color-accent) 10%, transparent)",
            }}
            contentStyle={{
              backgroundColor:
                "color-mix(in srgb, var(--ds-color-surface) 92%, transparent)",
              border: "1px solid var(--ds-color-border)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              color: "var(--ds-color-fg)",
            }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "12px",
              color: "var(--color-neutral-300)",
            }}
          />

          {normalizedCategories.map((cat, index) => {
            // Apply rounded radius only to the top bar in the stack
            const isTop = index === normalizedCategories.length - 1;
            const radius: [number, number, number, number] = isTop
              ? [6, 6, 0, 0]
              : [0, 0, 0, 0];

            return (
              <Bar
                key={cat.key}
                dataKey={cat.key}
                name={cat.label}
                stackId="a"
                fill={cat.color}
                radius={radius}
                barSize={32}
              />
            );
          })}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
