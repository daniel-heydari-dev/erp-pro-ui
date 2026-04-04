"use client";

import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { normalizeChartColors } from "./chartPalette";
import {
  chartLegendTextStyle,
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "./chartStyles";

export interface PieChartData {
  name: string;
  value: number;
}

export interface PieChartCenterContentContext {
  activeColor?: string;
  activeIndex: number | null;
  activeSlice: PieChartData | null;
  data: PieChartData[];
  displayLabel: string;
  displayPercentageLabel: string;
  displayValue: number;
  normalizedColors: string[];
  totalValue: number;
  valueFormatter: (value: number) => string;
  variant: "pie" | "donut";
}

export interface PieChartProps {
  data: PieChartData[];
  colors: string[];
  height?: number | string;
  className?: string;
  variant?: "pie" | "donut";
  showCenterSummary?: boolean;
  centerLabel?: string;
  valueFormatter?: (value: number) => string;
  renderCenterContent?: (
    context: PieChartCenterContentContext,
  ) => React.ReactNode;
}

const defaultValueFormatter = (value: number): string =>
  new Intl.NumberFormat().format(value);

export const PieChart: React.FC<PieChartProps> = ({
  data,
  colors,
  height = 300,
  className = "",
  variant = "donut",
  showCenterSummary = variant === "donut",
  centerLabel = "Total",
  valueFormatter = defaultValueFormatter,
  renderCenterContent,
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const innerRadius = variant === "donut" ? "60%" : 0;
  const normalizedColors = React.useMemo(
    () => normalizeChartColors(colors),
    [colors],
  );
  const totalValue = React.useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data],
  );
  const activeSlice =
    activeIndex !== null && activeIndex >= 0 && activeIndex < data.length
      ? data[activeIndex]
      : null;
  const activePercentage =
    activeSlice && totalValue > 0
      ? `${Math.round((activeSlice.value / totalValue) * 100)}% of total`
      : `${data.length} categories`;
  const displayLabel = activeSlice?.name ?? centerLabel;
  const displayValue = activeSlice?.value ?? totalValue;
  const activeColor =
    activeIndex !== null
      ? normalizedColors[activeIndex % normalizedColors.length]
      : undefined;
  const centerContentContext: PieChartCenterContentContext = {
    activeColor,
    activeIndex,
    activeSlice,
    data,
    displayLabel,
    displayPercentageLabel: activePercentage,
    displayValue,
    normalizedColors,
    totalValue,
    valueFormatter,
    variant,
  };
  const shouldRenderCenterContent =
    variant === "donut" && (showCenterSummary || Boolean(renderCenterContent));

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="80%"
            paddingAngle={variant === "donut" ? 2 : 0}
            dataKey="value"
            stroke="none"
            onMouseEnter={(_data: unknown, index: number) =>
              setActiveIndex(index)
            }
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={normalizedColors[index % normalizedColors.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={chartTooltipContentStyle}
            itemStyle={chartTooltipItemStyle}
            labelStyle={chartTooltipLabelStyle}
            wrapperStyle={chartTooltipWrapperStyle}
          />

          <Legend iconType="circle" wrapperStyle={chartLegendTextStyle} />
        </RechartsPieChart>
      </ResponsiveContainer>

      {shouldRenderCenterContent ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {renderCenterContent ? (
            renderCenterContent(centerContentContext)
          ) : (
            <div className="flex max-w-[42%] flex-col items-center text-center">
              <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                {displayLabel}
              </p>
              <p className="mt-1 text-2xl font-semibold leading-none text-foreground sm:text-3xl">
                {valueFormatter(displayValue)}
              </p>
              <p className="mt-2 text-xs leading-tight text-muted-foreground">
                {activePercentage}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
