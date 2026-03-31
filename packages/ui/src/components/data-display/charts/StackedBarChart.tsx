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
            stroke="var(--color-neutral-800, #262626)"
            opacity={0.4}
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
            domain={yAxisDomain}
          />
          <Tooltip
            cursor={{ fill: "var(--color-neutral-800, rgba(38, 38, 38, 0.4))" }}
            contentStyle={{
              backgroundColor: "rgba(10, 10, 10, 0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              color: "#fff",
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

          {categories.map((cat, index) => {
            // Apply rounded radius only to the top bar in the stack
            const isTop = index === categories.length - 1;
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
