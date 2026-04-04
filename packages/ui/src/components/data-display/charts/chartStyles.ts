import React from "react";

export const chartTooltipContentStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--ds-color-bg-surface) 88%, transparent), color-mix(in srgb, var(--ds-color-bg-elevated) 74%, transparent))",
  border:
    "1px solid color-mix(in srgb, var(--ds-color-border-strong) 72%, transparent)",
  borderRadius: "12px",
  backdropFilter: "blur(18px) saturate(180%)",
  WebkitBackdropFilter: "blur(18px) saturate(180%)",
  boxShadow:
    "0 18px 40px color-mix(in srgb, var(--ds-color-fg) 14%, transparent), inset 0 1px 0 color-mix(in srgb, var(--ds-color-bg-surface) 36%, transparent)",
  color: "var(--ds-color-fg)",
  padding: "0.75rem 0.875rem",
};

export const chartTooltipLabelStyle: React.CSSProperties = {
  color: "var(--ds-color-fg)",
  fontSize: "0.8125rem",
  fontWeight: 600,
  marginBottom: "0.375rem",
};

export const chartTooltipItemStyle: React.CSSProperties = {
  color: "var(--ds-color-fg)",
  fontSize: "0.8125rem",
  fontWeight: 500,
  padding: 0,
};

export const chartTooltipWrapperStyle: React.CSSProperties = {
  outline: "none",
};

export const chartLegendTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "var(--ds-color-fg-muted)",
};

export const chartBandHoverCursorStyle = {
  fill: "color-mix(in srgb, var(--ds-color-accent) 12%, transparent)",
  stroke:
    "color-mix(in srgb, var(--ds-color-accent) 34%, var(--ds-color-border-strong))",
  strokeWidth: 1,
};

export const chartLineHoverCursorStyle = {
  stroke:
    "color-mix(in srgb, var(--ds-color-accent) 42%, var(--ds-color-border-strong))",
  strokeWidth: 1.25,
  strokeDasharray: "4 4",
};

export const getChartActiveDotStyle = (
  strokeColor: string,
): {
  fill: string;
  r: number;
  stroke: string;
  strokeWidth: number;
} => ({
  r: 6,
  fill: "color-mix(in srgb, var(--ds-color-bg-surface) 90%, transparent)",
  stroke: strokeColor,
  strokeWidth: 2.5,
});

export const chartPillTooltipStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--ds-color-bg-surface) 90%, transparent), color-mix(in srgb, var(--ds-color-bg-elevated) 76%, transparent))",
  border:
    "1px solid color-mix(in srgb, var(--ds-color-border-strong) 70%, transparent)",
  boxShadow:
    "0 14px 32px color-mix(in srgb, var(--ds-color-fg) 14%, transparent), inset 0 1px 0 color-mix(in srgb, var(--ds-color-bg-surface) 34%, transparent)",
  backdropFilter: "blur(16px) saturate(170%)",
  WebkitBackdropFilter: "blur(16px) saturate(170%)",
};
