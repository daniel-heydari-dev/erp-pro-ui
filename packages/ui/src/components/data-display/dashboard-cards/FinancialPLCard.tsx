"use client";

import { useMemo, useState, type FC } from "react";

import { mergeClassNames } from "../../../utils";
import { buildWaterfallData, ComparisonChart, SingleTabChart } from "./_PLCharts";
import { PLCardHeader } from "./_PLCardHeader";
import { PLKpiStrip } from "./_PLKpiStrip";
import { PLOverview } from "./_PLOverview";

import type { DateRangeValue } from "../../forms/date-picker/types";
import type { PLCardLabels } from "./_PLCardHeader";

// ── Types ──────────────────────────────────────────────────────────────────────

export type PLPeriod =
  | "today" | "yesterday" | "this-week" | "this-month" | "this-year" | "custom";

export type PLWaterfallRole = "add" | "subtract" | "total";

export interface PLDataPoint { name: string; value: number; }

type ByPeriod<T> = Partial<Record<Exclude<PLPeriod, "custom">, T>>;

export interface PLMetricTab {
  id: string;
  label: string;
  /** Pre-formatted headline, e.g. "$2.47M". */
  value: string;
  valueByPeriod?: ByPeriod<string>;
  /** Raw number used by waterfall builder. */
  rawValue: number;
  change?: number;
  changeByPeriod?: ByPeriod<number>;
  changeLabel?: string;
  /** Accent color for KPI pill + chart. Falls back to ds-color-accent. */
  color?: string;
  chartType?: "area" | "bar" | "line";
  chartData: PLDataPoint[];
  chartDataByPeriod?: ByPeriod<PLDataPoint[]>;
  comparisonChartData?: PLDataPoint[];
  comparisonChartDataByPeriod?: ByPeriod<PLDataPoint[]>;
  yAxisFormatter?: (v: number) => string;
  /** Label shown for the comparison series in the tooltip. */
  comparisonLabel?: string;
  /** Short description shown in a hover tooltip on the KPI tab. */
  tooltip?: string;
}

export interface PLWaterfallStep {
  /** Reference a PLMetricTab by id to read its rawValue. */
  metricId?: string;
  /** Or provide the value directly (e.g. for OpEx not in the metric list). */
  rawValue?: number;
  label: string;
  role: PLWaterfallRole;
}

export interface FinancialPLCardProps {
  title?: string;
  subtitle?: string;
  metrics: PLMetricTab[];
  selectedMetricId?: string;
  defaultMetricId?: string;
  onMetricChange?: (id: string) => void;
  /** Card-level formatter — used when a tab has no yAxisFormatter. */
  yAxisFormatter?: (v: number) => string;
  /** Defines the overview-mode waterfall. Required to show the Overview button. */
  waterfallSteps?: PLWaterfallStep[];
  showPeriodFilter?: boolean;
  periodFilter?: PLPeriod;
  defaultPeriodFilter?: PLPeriod;
  onPeriodFilterChange?: (v: PLPeriod) => void;
  customDateRange?: DateRangeValue;
  onCustomDateRangeChange?: (r: DateRangeValue) => void;
  showComparison?: boolean;
  comparisonPeriod?: PLPeriod;
  defaultComparisonPeriod?: PLPeriod;
  onComparisonPeriodChange?: (v: PLPeriod) => void;
  comparisonCustomDateRange?: DateRangeValue;
  onComparisonCustomDateRangeChange?: (r: DateRangeValue) => void;
  comparisonActive?: boolean;
  defaultComparisonActive?: boolean;
  onComparisonActiveChange?: (v: boolean) => void;
  overviewActive?: boolean;
  defaultOverviewActive?: boolean;
  onOverviewActiveChange?: (v: boolean) => void;
  labels?: PLCardLabels;
  className?: string;
  onMenuClick?: () => void;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function defaultFmt(v: number): string {
  return v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M`
    : v >= 1_000 ? `$${Math.round(v / 1_000)}k`
    : `$${v}`;
}

// ── FinancialPLCard ────────────────────────────────────────────────────────────

export const FinancialPLCard: FC<FinancialPLCardProps> = ({
  title = "P&L Report",
  subtitle = "Full Financial Overview",
  metrics,
  selectedMetricId,
  defaultMetricId,
  onMetricChange,
  yAxisFormatter = defaultFmt,
  waterfallSteps,
  showPeriodFilter = false,
  periodFilter,
  defaultPeriodFilter = "this-month",
  onPeriodFilterChange,
  customDateRange,
  onCustomDateRangeChange,
  showComparison = false,
  comparisonPeriod,
  defaultComparisonPeriod = "this-year",
  onComparisonPeriodChange,
  comparisonCustomDateRange,
  onComparisonCustomDateRangeChange,
  comparisonActive,
  defaultComparisonActive = false,
  onComparisonActiveChange,
  overviewActive,
  defaultOverviewActive = false,
  onOverviewActiveChange,
  labels,
  className,
  onMenuClick,
}) => {
  const [intMetricId,  setIntMetricId]  = useState(defaultMetricId ?? metrics[0]?.id ?? "");
  const [intPeriod,    setIntPeriod]    = useState<PLPeriod>(defaultPeriodFilter);
  const [intRange,     setIntRange]     = useState<DateRangeValue>({ start: null, end: null });
  const [intCmpPeriod, setIntCmpPeriod] = useState<PLPeriod>(defaultComparisonPeriod);
  const [intCmpRange,  setIntCmpRange]  = useState<DateRangeValue>({ start: null, end: null });
  const [intCmpActive, setIntCmpActive] = useState(defaultComparisonActive);
  const [intOverview,  setIntOverview]  = useState(defaultOverviewActive);

  const activeId        = selectedMetricId        ?? intMetricId;
  const activePeriod    = periodFilter            ?? intPeriod;
  const activeRange     = customDateRange         ?? intRange;
  const activeCmpPeriod = comparisonPeriod        ?? intCmpPeriod;
  const activeCmpRange  = comparisonCustomDateRange ?? intCmpRange;
  const isCompOn        = comparisonActive        ?? intCmpActive;
  const isOverviewOn    = overviewActive          ?? intOverview;

  const activeMetric = metrics.find((m) => m.id === activeId) ?? metrics[0]!;
  const fmt          = activeMetric.yAxisFormatter ?? yAxisFormatter;

  function handleMetricChange(id: string) {
    if (selectedMetricId === undefined) setIntMetricId(id);
    onMetricChange?.(id);
    if (isOverviewOn) toggleOverview();
  }
  function toggleOverview() {
    const next = !isOverviewOn;
    if (overviewActive === undefined) setIntOverview(next);
    onOverviewActiveChange?.(next);
  }
  function toggleComparison() {
    const next = !isCompOn;
    if (comparisonActive === undefined) setIntCmpActive(next);
    onComparisonActiveChange?.(next);
    // Enabling compare exits overview mode
    if (next && isOverviewOn) {
      if (overviewActive === undefined) setIntOverview(false);
      onOverviewActiveChange?.(false);
    }
  }

  const chartData = useMemo((): PLDataPoint[] => {
    if (showPeriodFilter && activePeriod !== "custom") {
      const p = activeMetric.chartDataByPeriod?.[activePeriod as Exclude<PLPeriod, "custom">];
      if (p) return p;
    }
    return activeMetric.chartData;
  }, [activeMetric, activePeriod, showPeriodFilter]);

  const cmpData = useMemo((): PLDataPoint[] => {
    if (!showComparison) return [];
    if (activeCmpPeriod !== "custom") {
      const p = activeMetric.comparisonChartDataByPeriod?.[activeCmpPeriod as Exclude<PLPeriod, "custom">];
      if (p) return p;
    }
    return activeMetric.comparisonChartData ?? [];
  }, [activeMetric, activeCmpPeriod, showComparison]);

  const isComparing  = !isOverviewOn && showComparison && isCompOn && cmpData.length > 0;
  const waterfallData = useMemo(
    () => (waterfallSteps ? buildWaterfallData(waterfallSteps, metrics) : null),
    [waterfallSteps, metrics],
  );
  const canOverview = Boolean(waterfallSteps && waterfallData);

  return (
    <div className={mergeClassNames("rounded-lg border border-ds-border-3/80 bg-ds-surface-1", className)}>

      <PLCardHeader
        title={title}
        subtitle={subtitle}
        showPeriodFilter={showPeriodFilter}
        activePeriod={activePeriod}
        onPeriodChange={(v) => { if (periodFilter === undefined) setIntPeriod(v); onPeriodFilterChange?.(v); }}
        activeRange={activeRange}
        onRangeChange={(r) => { if (customDateRange === undefined) setIntRange(r); onCustomDateRangeChange?.(r); }}
        canOverview={canOverview}
        isOverviewOn={isOverviewOn}
        onToggleOverview={toggleOverview}
        showComparison={showComparison}
        isCompOn={isCompOn}
        onToggleComparison={toggleComparison}
        activeCmpPeriod={activeCmpPeriod}
        onCmpPeriodChange={(v) => { if (comparisonPeriod === undefined) setIntCmpPeriod(v); onComparisonPeriodChange?.(v); }}
        activeCmpRange={activeCmpRange}
        onCmpRangeChange={(r) => { if (comparisonCustomDateRange === undefined) setIntCmpRange(r); onComparisonCustomDateRangeChange?.(r); }}
        onMenuClick={onMenuClick}
        labels={labels}
      />

      <PLKpiStrip
        metrics={metrics}
        activeId={activeId}
        isOverviewOn={isOverviewOn}
        activePeriod={activePeriod}
        onMetricChange={handleMetricChange}
      />

      {isOverviewOn && waterfallData ? (
        <PLOverview data={waterfallData} formatter={yAxisFormatter} />
      ) : (
        <div className="px-2 pb-5 pt-3" style={{ height: 296 }}>
          {isComparing ? (
            <ComparisonChart
              currentData={chartData}
              prevData={cmpData}
              color={activeMetric.color ?? "var(--ds-color-accent)"}
              formatter={fmt}
              currentLabel={activeMetric.label}
              prevLabel={activeMetric.comparisonLabel ?? "prev."}
            />
          ) : (
            <SingleTabChart
              data={chartData}
              chartType={activeMetric.chartType ?? "area"}
              color={activeMetric.color ?? "var(--ds-color-accent)"}
              formatter={fmt}
              label={activeMetric.label}
            />
          )}
        </div>
      )}
    </div>
  );
};
