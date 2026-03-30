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

export interface PieChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
  colors: string[];
  height?: number | string;
  className?: string;
  variant?: "pie" | "donut";
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  colors,
  height = 300,
  className = "",
  variant = "donut",
}) => {
  const innerRadius = variant === "donut" ? "60%" : 0;

  return (
    <div className={`w-full ${className}`} style={{ height }}>
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
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

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

          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", color: "var(--color-neutral-300)" }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
