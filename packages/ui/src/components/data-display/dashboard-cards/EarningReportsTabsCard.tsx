"use client";

import { useState, type FC, type ReactNode } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

// ── Public types ──────────────────────────────────────────────────────────────

export interface EarningTabBarPoint {
  name: string;
  value: number;
  /** Renders in accent color; others in accent-subtle. */
  highlighted?: boolean;
}

export interface EarningTab {
  id: string;
  icon: ReactNode;
  label: string;
  chartData: EarningTabBarPoint[];
}

export interface EarningReportsTabsCardProps {
  title?: string;
  subtitle?: string;
  tabs: EarningTab[];
  /** Controlled: currently selected tab id. */
  selectedTabId?: string;
  onTabChange?: (id: string) => void;
  /** Default selected tab id for uncontrolled usage. Defaults to first tab. */
  defaultTabId?: string;
  /** Format Y-axis tick labels. Defaults to "28k" style. */
  yAxisFormatter?: (value: number) => string;
  /** Format bar labels above bars. Defaults to same as yAxisFormatter. */
  barLabelFormatter?: (value: number) => string;
  /** Show a "+" add-tab button at the end of the tabs row. */
  showAddTab?: boolean;
  onAddTab?: () => void;
  className?: string;
  onMenuClick?: () => void;
}

function defaultKFormatter(value: number): string {
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  return String(value);
}

// ── EarningReportsTabsCard ────────────────────────────────────────────────────

export const EarningReportsTabsCard: FC<EarningReportsTabsCardProps> = ({
  title = "Earning Reports",
  subtitle = "Yearly Earnings Overview",
  tabs,
  selectedTabId,
  onTabChange,
  defaultTabId,
  yAxisFormatter = defaultKFormatter,
  barLabelFormatter,
  showAddTab = true,
  onAddTab,
  className,
  onMenuClick,
}) => {
  const [internalId, setInternalId] = useState(
    defaultTabId ?? tabs[0]?.id ?? "",
  );

  const isControlled = selectedTabId !== undefined;
  const activeId = isControlled ? selectedTabId : internalId;

  const handleTabChange = (id: string) => {
    if (!isControlled) setInternalId(id);
    onTabChange?.(id);
  };

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const labelFormatter = barLabelFormatter ?? yAxisFormatter;

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
        className,
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between px-5 pb-4 pt-5">
        <div>
          <p className="text-base font-bold text-ds-1">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
        </div>
        <Button
          variant="tertiary"
          size="small"
          className="shrink-0 p-0.5! text-ds-3"
          aria-label="More options"
          onClick={onMenuClick}
        >
          <EllipsisVerticalIcon width={18} height={18} />
        </Button>
      </div>

      {/* ── Tab selector ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 overflow-x-auto px-5 pb-5">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <Button
              key={tab.id}
              variant="tertiary"
              onClick={() => handleTabChange(tab.id)}
              className={mergeClassNames(
                "min-w-[72px] flex-col gap-1.5 rounded-lg border p-3 transition-colors hover:opacity-100",
                isActive
                  ? "border-ds-accent bg-ds-accent-subtle text-ds-accent"
                  : "border-ds-border-3 bg-ds-surface-1 text-ds-2 hover:border-ds-border-accent/30 hover:bg-ds-surface-2",
              )}
              aria-pressed={isActive}
              aria-label={tab.label}
            >
              <span className="flex h-6 w-6 items-center justify-center">
                {tab.icon}
              </span>
              <span className="text-xs font-semibold">{tab.label}</span>
            </Button>
          );
        })}

        {showAddTab && (
          <Button
            variant="tertiary"
            onClick={onAddTab}
            className="min-w-[72px] flex-col gap-1.5 rounded-lg border border-dashed border-ds-border-3 p-3 text-ds-3 transition-colors hover:border-ds-border-2 hover:bg-ds-surface-2 hover:text-ds-2 hover:opacity-100"
            aria-label="Add category"
          >
            <span className="flex h-6 w-6 items-center justify-center text-lg font-light">
              +
            </span>
          </Button>
        )}
      </div>

      {/* ── Bar chart ───────────────────────────────────────────────────────── */}
      <div className="px-2 pb-5" style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={activeTab?.chartData ?? []}
            barSize={36}
            barCategoryGap="25%"
            margin={{ top: 28, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--ds-color-border)"
              opacity={0.5}
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
              tickFormatter={yAxisFormatter}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 11 }}
              dx={-4}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              wrapperStyle={chartTooltipWrapperStyle}
              cursor={{ fill: "var(--ds-color-accent)", fillOpacity: 0.06 }}
              formatter={(v) => [labelFormatter(Number(v)), activeTab?.label]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="value"
                position="top"
                formatter={(v) => labelFormatter(Number(v))}
                style={{
                  fontSize: 11,
                  fill: "var(--ds-color-fg-muted)",
                  fontWeight: 600,
                }}
              />
              {(activeTab?.chartData ?? []).map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.highlighted
                      ? "var(--ds-color-accent)"
                      : "var(--ds-color-accent-subtle)"
                  }
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
