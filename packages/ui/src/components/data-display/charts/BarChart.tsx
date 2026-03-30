"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface BarChartData {
  name: string;
  [key: string]: string | number;
}

interface BarChartProps {
  data: BarChartData[];
  categories: { key: string; color: string }[];
  height?: number | string;
  className?: string;
  layout?: "horizontal" | "vertical";
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  categories,
  height = 300,
  className = "",
  layout = "horizontal",
}) => {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={layout === "horizontal"}
            vertical={layout === "vertical"}
            stroke="var(--color-neutral-800, #262626)"
            opacity={0.4}
          />

          {layout === "horizontal" ? (
            <>
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
            </>
          ) : (
            <>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-neutral-400, #a3a3a3)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-neutral-400, #a3a3a3)", fontSize: 12 }}
                dx={-10}
              />
            </>
          )}

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

          {categories.map((cat) => (
            <Bar
              key={cat.key}
              dataKey={cat.key}
              fill={cat.color}
              radius={layout === "horizontal" ? [4, 4, 0, 0] : [0, 4, 4, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
