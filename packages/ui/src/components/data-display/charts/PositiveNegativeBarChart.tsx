"use client";

import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getChartColorVar, normalizeChartColorValue } from "./chartPalette";
import {
  chartBandHoverCursorStyle,
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "./chartStyles";

export interface PositiveNegativeBarChartData {
  name: string;
  value: number;
}

interface PositiveNegativeBarChartProps {
  data: PositiveNegativeBarChartData[];
  height?: number | string;
  className?: string;
  layout?: "horizontal" | "vertical";
  positiveColor?: string;
  negativeColor?: string;
  neutralColor?: string;
  showGrid?: boolean;
  seriesLabel?: string;
  valueFormatter?: (value: number) => string;
  tickFormatter?: (value: number) => string;
}

const defaultValueFormatter = (value: number): string =>
  new Intl.NumberFormat().format(value);

const getBarRadius = (
  value: number,
  layout: "horizontal" | "vertical",
): [number, number, number, number] => {
  if (value === 0) {
    return [6, 6, 6, 6];
  }

  if (layout === "horizontal") {
    return value > 0 ? [6, 6, 0, 0] : [0, 0, 6, 6];
  }

  return value > 0 ? [0, 6, 6, 0] : [6, 0, 0, 6];
};

export const PositiveNegativeBarChart: React.FC<
  PositiveNegativeBarChartProps
> = ({
  data,
  height = 320,
  className = "",
  layout = "horizontal",
  positiveColor = getChartColorVar(3),
  negativeColor = getChartColorVar(5),
  neutralColor = getChartColorVar(15),
  showGrid = true,
  seriesLabel = "Variance",
  valueFormatter = defaultValueFormatter,
  tickFormatter,
}) => {
  const resolvedPositiveColor = React.useMemo(
    () => normalizeChartColorValue(positiveColor) ?? getChartColorVar(3),
    [positiveColor],
  );
  const resolvedNegativeColor = React.useMemo(
    () => normalizeChartColorValue(negativeColor) ?? getChartColorVar(5),
    [negativeColor],
  );
  const resolvedNeutralColor = React.useMemo(
    () => normalizeChartColorValue(neutralColor) ?? getChartColorVar(15),
    [neutralColor],
  );

  const resolvedTickFormatter = React.useCallback(
    (value: number) => tickFormatter?.(value) ?? valueFormatter(value),
    [tickFormatter, valueFormatter],
  );

  const getBarFill = React.useCallback(
    (value: number) => {
      if (value > 0) {
        return resolvedPositiveColor;
      }

      if (value < 0) {
        return resolvedNegativeColor;
      }

      return resolvedNeutralColor;
    },
    [resolvedNegativeColor, resolvedNeutralColor, resolvedPositiveColor],
  );

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid ? (
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={layout === "horizontal"}
              vertical={layout === "vertical"}
              stroke="var(--ds-color-border)"
              opacity={0.35}
            />
          ) : null}

          {layout === "horizontal" ? (
            <>
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
                tickFormatter={resolvedTickFormatter}
                dx={-10}
              />
              <ReferenceLine
                y={0}
                stroke="var(--ds-color-border-strong)"
                strokeOpacity={0.95}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 12 }}
                tickFormatter={resolvedTickFormatter}
                dy={10}
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 12 }}
                width={96}
                dx={-6}
              />
              <ReferenceLine
                x={0}
                stroke="var(--ds-color-border-strong)"
                strokeOpacity={0.95}
              />
            </>
          )}

          <Tooltip
            contentStyle={chartTooltipContentStyle}
            cursor={chartBandHoverCursorStyle}
            itemStyle={chartTooltipItemStyle}
            labelStyle={chartTooltipLabelStyle}
            wrapperStyle={chartTooltipWrapperStyle}
            formatter={(value) => [
              valueFormatter(Number(value ?? 0)),
              seriesLabel,
            ]}
          />

          <Bar
            dataKey="value"
            radius={6}
            barSize={layout === "horizontal" ? 30 : 22}
            shape={(props) => {
              const barValue = Array.isArray(props.value)
                ? props.value[1] - props.value[0]
                : props.value;

              return (
                <Rectangle {...props} radius={getBarRadius(barValue, layout)} />
              );
            }}
          >
            {data.map((entry) => (
              <Cell
                key={`${entry.name}-${entry.value}`}
                fill={getBarFill(entry.value)}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
