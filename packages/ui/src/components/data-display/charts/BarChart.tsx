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

import { normalizeChartColors } from "./chartPalette";
import {
  chartBandHoverCursorStyle,
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "./chartStyles";

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
  maxBarSize?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  categories,
  height = 300,
  className = "",
  layout = "horizontal",
  maxBarSize,
}) => {
  const resolvedMaxBarSize = maxBarSize ?? (layout === "horizontal" ? 40 : 22);

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
          layout={layout}
          barCategoryGap={data.length <= 4 ? "28%" : "18%"}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={layout === "horizontal"}
            vertical={layout === "vertical"}
            stroke="var(--ds-color-border)"
            opacity={0.4}
          />

          {layout === "horizontal" ? (
            <>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--ds-color-fg-muted)",
                  fontSize: 12,
                }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--ds-color-fg-muted)",
                  fontSize: 12,
                }}
                dx={-10}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--ds-color-fg-muted)",
                  fontSize: 12,
                }}
                dy={10}
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--ds-color-fg-muted)",
                  fontSize: 12,
                }}
                dx={-10}
              />
            </>
          )}

          <Tooltip
            contentStyle={chartTooltipContentStyle}
            cursor={chartBandHoverCursorStyle}
            itemStyle={chartTooltipItemStyle}
            labelStyle={chartTooltipLabelStyle}
            wrapperStyle={chartTooltipWrapperStyle}
          />

          {normalizedCategories.map((cat) => (
            <Bar
              key={cat.key}
              dataKey={cat.key}
              fill={cat.color}
              maxBarSize={resolvedMaxBarSize}
              radius={layout === "horizontal" ? [4, 4, 0, 0] : [0, 4, 4, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
