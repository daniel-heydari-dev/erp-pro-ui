"use client";

import { useMemo, useState, type FC, type ReactNode } from "react";
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

import { DatePicker } from "../../forms/date-picker";
import { Button } from "../../forms/button";
import { Select } from "../../forms/select";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";
import { TabTooltip } from "./_TabTooltip";

import type { DateRangeValue } from "../../forms/date-picker/types";

// ── Public types ──────────────────────────────────────────────────────────────

export type PeriodFilterValue =
  | "today"
  | "yesterday"
  | "this-week"
  | "this-month"
  | "this-year"
  | "custom";

export interface EarningTabBarPoint {
  name: string;
  value: number;
  /** Renders in accent color; others in accent-subtle. */
  highlighted?: boolean;
}

export interface EarningTabSummary {
  /** Pre-formatted headline value, e.g. "$2.47M", "29.1k units", "33.5%". */
  value: string;
  /**
   * Manual % change shown when comparison is off.
   * Auto-overridden by sum/avg ratio when comparison is active.
   */
  change?: number;
  /** Small label after the change badge, e.g. "vs last year". */
  changeLabel?: string;
}

export interface EarningTab {
  id: string;
  icon: ReactNode;
  label: string;
  /** Shown in a tooltip when hovering the tab button. */
  description?: string;
  /** Fallback data (also used for "custom" period and when no period filter). */
  chartData: EarningTabBarPoint[];
  /**
   * Period-specific data. When a non-custom period is active and data is
   * provided here, it overrides chartData in the chart.
   */
  chartDataByPeriod?: Partial<
    Record<Exclude<PeriodFilterValue, "custom">, EarningTabBarPoint[]>
  >;
  /** Comparison fallback data — used when no matching comparisonChartDataByPeriod entry. */
  comparisonChartData?: EarningTabBarPoint[];
  /** Period-specific comparison data. Mirrors chartDataByPeriod for the comparison series. */
  comparisonChartDataByPeriod?: Partial<
    Record<Exclude<PeriodFilterValue, "custom">, EarningTabBarPoint[]>
  >;
  /** Headline metric shown in the card header when this tab is active. */
  summary?: EarningTabSummary;
  /** Period-specific headline metric — overrides summary when period matches. */
  summaryByPeriod?: Partial<
    Record<Exclude<PeriodFilterValue, "custom">, EarningTabSummary>
  >;
  /**
   * How the summary % change is auto-computed when comparison mode is on.
   * - "sum" (default): Σprimary / Σcomparison − 1 — correct for Qty, Revenue, Expenses
   * - "avg": avgPrimary / avgComparison − 1 — correct for rates, margins, %
   * - "none": always use EarningTabSummary.change, never auto-compute
   */
  summaryAggregation?: "sum" | "avg" | "none";
  /**
   * Whether this tab appears in the Overview grouped bar chart.
   * @default true — set to false to exclude (e.g. Margin % alongside $ values)
   */
  includeInOverview?: boolean;
  /** Custom CSS color for this tab's bar in overview chart. Falls back to palette. */
  overviewColor?: string;
  /** Per-tab Y-axis tick formatter. Falls back to card-level yAxisFormatter. */
  yAxisFormatter?: (value: number) => string;
  /** Per-tab bar label formatter. Falls back to tab yAxisFormatter then card-level. */
  barLabelFormatter?: (value: number) => string;
}

/**
 * All hardcoded strings in the card. Pass this prop to override for i18n or
 * custom terminology — every label, aria-label, and placeholder is covered.
 */
export interface EarningReportsTabsCardLabels {
  /** @default "More options" */
  moreOptionsAriaLabel?: string;
  /** @default "Add category" */
  addTabAriaLabel?: string;
  /** @default "Filter by period" */
  periodFilterAriaLabel?: string;
  /** @default "Pick a date range" */
  dateRangePlaceholder?: string;
  /** Override individual period option labels in the select dropdown. */
  periodOptions?: Partial<Record<PeriodFilterValue, string>>;
  /** @default "Compare to" */
  compareToLabel?: string;
  /** @default "Comparison period" */
  comparisonFilterAriaLabel?: string;
  /** @default "Pick comparison range" */
  comparisonDateRangePlaceholder?: string;
  /** Tooltip series name suffix for comparison bar. @default "prev." */
  comparisonSeriesLabel?: string;
  /** @default "Compare" */
  compareButtonLabel?: string;
  /** @default "Overview" */
  overviewButtonLabel?: string;
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
  /** Card-level Y-axis tick formatter. Defaults to "28k" style. */
  yAxisFormatter?: (value: number) => string;
  /** Card-level bar label formatter. Defaults to same as yAxisFormatter. */
  barLabelFormatter?: (value: number) => string;
  /** Show a "+" add-tab button at the end of the tabs row. */
  showAddTab?: boolean;
  onAddTab?: () => void;
  className?: string;
  onMenuClick?: () => void;
  /** Show period filter select aligned to the right of the tab row. */
  showPeriodFilter?: boolean;
  /** Controlled: currently selected period filter value. */
  periodFilter?: PeriodFilterValue;
  /** Default period for uncontrolled usage. Defaults to "this-month". */
  defaultPeriodFilter?: PeriodFilterValue;
  onPeriodFilterChange?: (value: PeriodFilterValue) => void;
  /** Controlled custom date range — active when period is "custom". */
  customDateRange?: DateRangeValue;
  onCustomDateRangeChange?: (range: DateRangeValue) => void;
  /** Show comparison period selector and render dual grouped bars. */
  showComparison?: boolean;
  /** Controlled: currently selected comparison period. */
  comparisonPeriod?: PeriodFilterValue;
  /** Default comparison period for uncontrolled usage. Defaults to "this-year". */
  defaultComparisonPeriod?: PeriodFilterValue;
  onComparisonPeriodChange?: (value: PeriodFilterValue) => void;
  /** Controlled comparison custom date range — active when comparisonPeriod is "custom". */
  comparisonDateRange?: DateRangeValue;
  onComparisonDateRangeChange?: (range: DateRangeValue) => void;
  /** Controlled: whether comparison mode is toggled on. */
  comparisonActive?: boolean;
  /** Default comparison active state for uncontrolled usage. Defaults to false. */
  defaultComparisonActive?: boolean;
  onComparisonActiveChange?: (active: boolean) => void;
  /** Show "Overview" button — renders all tabs (includeInOverview !== false) as grouped bars. */
  showOverview?: boolean;
  /** Controlled: whether overview mode is toggled on. */
  overviewActive?: boolean;
  /** Default overview active state for uncontrolled usage. Defaults to false. */
  defaultOverviewActive?: boolean;
  onOverviewActiveChange?: (active: boolean) => void;
  /** Override any hardcoded string for i18n or custom terminology. */
  labels?: EarningReportsTabsCardLabels;
}

// ── Internal types ────────────────────────────────────────────────────────────

type ChartPoint = EarningTabBarPoint & { primary?: number; comparison?: number };

// ── Constants ─────────────────────────────────────────────────────────────────

const PERIOD_KEYS: PeriodFilterValue[] = [
  "today",
  "yesterday",
  "this-week",
  "this-month",
  "this-year",
  "custom",
];

const DEFAULT_PERIOD_LABELS: Record<PeriodFilterValue, string> = {
  today: "Today",
  yesterday: "Yesterday",
  "this-week": "This Week",
  "this-month": "This Month",
  "this-year": "This Year",
  custom: "Custom",
};

const OVERVIEW_COLORS = [
  "var(--ds-color-accent)",
  "#3b82f6",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

function defaultKFormatter(value: number): string {
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  return String(value);
}

// ── Comparison tooltip ────────────────────────────────────────────────────────

interface ComparisonTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number | string }>;
  label?: string | number;
  formatter: (v: number) => string;
  primaryLabel: string;
  comparisonLabel: string;
  vsLabel: string;
}

const ComparisonTooltipContent: FC<ComparisonTooltipProps> = ({
  active,
  payload,
  label,
  formatter,
  primaryLabel,
  comparisonLabel,
  vsLabel,
}) => {
  if (!active || !payload?.length) return null;
  const primary = Number(payload[0]?.value ?? 0);
  const comparison = Number(payload[1]?.value ?? 0);
  const pct = comparison !== 0 ? ((primary - comparison) / comparison) * 100 : null;

  return (
    <div style={chartTooltipContentStyle}>
      <p style={chartTooltipLabelStyle}>{label}</p>
      <p style={chartTooltipItemStyle}>
        {primaryLabel}:{" "}
        <span style={{ fontWeight: 600 }}>{formatter(primary)}</span>
      </p>
      <p style={chartTooltipItemStyle}>
        {comparisonLabel}:{" "}
        <span style={{ fontWeight: 600 }}>{formatter(comparison)}</span>
      </p>
      {pct !== null && (
        <p
          style={{
            ...chartTooltipItemStyle,
            marginTop: 6,
            fontWeight: 700,
            color: pct >= 0 ? "#22c55e" : "#ef4444",
          }}
        >
          {pct >= 0 ? "▲" : "▼"}&nbsp;
          {pct >= 0 ? "+" : ""}
          {pct.toFixed(1)}%&nbsp;
          <span style={{ fontWeight: 400, opacity: 0.7 }}>vs {vsLabel}</span>
        </p>
      )}
    </div>
  );
};

// ── Overview tooltip ──────────────────────────────────────────────────────────

interface OverviewTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string; dataKey: string }>;
  label?: string | number;
  tabs: EarningTab[];
  fallbackFormatter: (v: number) => string;
}

const OverviewTooltipContent: FC<OverviewTooltipProps> = ({
  active,
  payload,
  label,
  tabs,
  fallbackFormatter,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={chartTooltipContentStyle}>
      <p style={chartTooltipLabelStyle}>{label}</p>
      {payload.map((item) => {
        const tab = tabs.find((t) => t.id === String(item.dataKey));
        const fmt = tab?.yAxisFormatter ?? fallbackFormatter;
        return (
          <p key={String(item.dataKey)} style={chartTooltipItemStyle}>
            <span style={{ color: item.color, marginRight: 4 }}>●</span>
            {item.name}:{" "}
            <span style={{ fontWeight: 600 }}>{fmt(Number(item.value))}</span>
          </p>
        );
      })}
    </div>
  );
};

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
  comparisonDateRange,
  onComparisonDateRangeChange,
  comparisonActive,
  defaultComparisonActive = false,
  onComparisonActiveChange,
  showOverview = false,
  overviewActive,
  defaultOverviewActive = false,
  onOverviewActiveChange,
  labels,
}) => {
  const [internalId, setInternalId] = useState(
    defaultTabId ?? tabs[0]?.id ?? "",
  );
  const [internalPeriod, setInternalPeriod] = useState<PeriodFilterValue>(
    defaultPeriodFilter,
  );
  const [internalRange, setInternalRange] = useState<DateRangeValue>({
    start: null,
    end: null,
  });
  const [internalComparisonPeriod, setInternalComparisonPeriod] =
    useState<PeriodFilterValue>(defaultComparisonPeriod);
  const [internalComparisonRange, setInternalComparisonRange] =
    useState<DateRangeValue>({ start: null, end: null });
  const [internalComparisonActive, setInternalComparisonActive] = useState(
    defaultComparisonActive,
  );
  const [internalOverviewActive, setInternalOverviewActive] = useState(
    defaultOverviewActive,
  );

  const isTabControlled = selectedTabId !== undefined;
  const activeId = isTabControlled ? selectedTabId : internalId;

  const isPeriodControlled = periodFilter !== undefined;
  const activePeriod = isPeriodControlled ? periodFilter : internalPeriod;

  const isRangeControlled = customDateRange !== undefined;
  const activeRange = isRangeControlled ? customDateRange : internalRange;

  const isComparisonPeriodControlled = comparisonPeriod !== undefined;
  const activeComparisonPeriod = isComparisonPeriodControlled
    ? comparisonPeriod
    : internalComparisonPeriod;

  const isComparisonRangeControlled = comparisonDateRange !== undefined;
  const activeComparisonRange = isComparisonRangeControlled
    ? comparisonDateRange
    : internalComparisonRange;

  const isComparisonActiveControlled = comparisonActive !== undefined;
  const isComparisonOn = isComparisonActiveControlled
    ? comparisonActive
    : internalComparisonActive;

  const isOverviewActiveControlled = overviewActive !== undefined;
  const isOverviewOn = isOverviewActiveControlled ? overviewActive : internalOverviewActive;

  // ── Resolved labels ─────────────────────────────────────────────────────────
  const moreOptionsLabel = labels?.moreOptionsAriaLabel ?? "More options";
  const addTabLabel = labels?.addTabAriaLabel ?? "Add category";
  const periodFilterLabel = labels?.periodFilterAriaLabel ?? "Filter by period";
  const dateRangePlaceholder = labels?.dateRangePlaceholder ?? "Pick a date range";
  const compareToLabel = labels?.compareToLabel ?? "Compare to";
  const comparisonFilterLabel = labels?.comparisonFilterAriaLabel ?? "Comparison period";
  const comparisonDateRangePlaceholder =
    labels?.comparisonDateRangePlaceholder ?? "Pick comparison range";
  const comparisonSeriesLabel = labels?.comparisonSeriesLabel ?? "prev.";
  const compareButtonLabel = labels?.compareButtonLabel ?? "Compare";
  const overviewButtonLabel = labels?.overviewButtonLabel ?? "Overview";
  const periodSelectOptions = PERIOD_KEYS.map((k) => ({
    value: k,
    label: labels?.periodOptions?.[k] ?? DEFAULT_PERIOD_LABELS[k],
  }));

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleTabChange = (id: string) => {
    if (!isTabControlled) setInternalId(id);
    onTabChange?.(id);
    // Clicking a specific tab exits overview mode
    if (isOverviewOn) {
      if (!isOverviewActiveControlled) setInternalOverviewActive(false);
      onOverviewActiveChange?.(false);
    }
  };

  const handlePeriodChange = (raw: string) => {
    const next = raw as PeriodFilterValue;
    if (!isPeriodControlled) setInternalPeriod(next);
    onPeriodFilterChange?.(next);
  };

  const handleRangeChange = (range: DateRangeValue) => {
    if (!isRangeControlled) setInternalRange(range);
    onCustomDateRangeChange?.(range);
  };

  const handleComparisonActiveToggle = () => {
    const next = !isComparisonOn;
    if (!isComparisonActiveControlled) setInternalComparisonActive(next);
    onComparisonActiveChange?.(next);
  };

  const handleComparisonPeriodChange = (raw: string) => {
    const next = raw as PeriodFilterValue;
    if (!isComparisonPeriodControlled) setInternalComparisonPeriod(next);
    onComparisonPeriodChange?.(next);
  };

  const handleComparisonRangeChange = (range: DateRangeValue) => {
    if (!isComparisonRangeControlled) setInternalComparisonRange(range);
    onComparisonDateRangeChange?.(range);
  };

  const handleOverviewToggle = () => {
    const next = !isOverviewOn;
    if (!isOverviewActiveControlled) setInternalOverviewActive(next);
    onOverviewActiveChange?.(next);
  };

  // ── Active data + formatters ────────────────────────────────────────────────
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  const activeChartData = useMemo(() => {
    if (showPeriodFilter && activePeriod !== "custom") {
      const periodData =
        activeTab?.chartDataByPeriod?.[
          activePeriod as Exclude<PeriodFilterValue, "custom">
        ];
      if (periodData) return periodData;
    }
    return activeTab?.chartData ?? [];
  }, [activeTab, activePeriod, showPeriodFilter]);

  const activeComparisonData = useMemo(() => {
    if (!showComparison) return [];
    if (activeComparisonPeriod !== "custom") {
      const periodData =
        activeTab?.comparisonChartDataByPeriod?.[
          activeComparisonPeriod as Exclude<PeriodFilterValue, "custom">
        ];
      if (periodData) return periodData;
    }
    return activeTab?.comparisonChartData ?? [];
  }, [activeTab, activeComparisonPeriod, showComparison]);

  // Overview is mutually exclusive with comparison (overview takes precedence)
  const isComparing =
    !isOverviewOn &&
    showComparison &&
    isComparisonOn &&
    activeComparisonData.length > 0;

  // ── Overview chart data (all tabs merged into one dataset) ──────────────────
  const overviewChartData = useMemo((): Record<string, number | string>[] | null => {
    if (!showOverview || !isOverviewOn) return null;
    const included = tabs.filter((t) => t.includeInOverview !== false);
    if (included.length === 0) return null;

    const tabsData = included.map((tab) => {
      if (showPeriodFilter && activePeriod !== "custom") {
        return (
          tab.chartDataByPeriod?.[activePeriod as Exclude<PeriodFilterValue, "custom">] ??
          tab.chartData
        );
      }
      return tab.chartData;
    });

    const refLen = tabsData[0]?.length ?? 0;
    return Array.from({ length: refLen }, (_, i) => {
      const entry: Record<string, number | string> = {
        name: tabsData[0]?.[i]?.name ?? String(i),
      };
      included.forEach((tab, ti) => {
        entry[tab.id] = tabsData[ti]?.[i]?.value ?? 0;
      });
      return entry;
    });
  }, [showOverview, isOverviewOn, tabs, activePeriod, showPeriodFilter]);

  const isOverview = showOverview && isOverviewOn && overviewChartData !== null;

  // ── Summary ─────────────────────────────────────────────────────────────────
  const activeSummary = useMemo((): EarningTabSummary | undefined => {
    if (isOverview) return undefined; // header summary hidden in overview mode
    let base: EarningTabSummary | undefined;
    if (showPeriodFilter && activePeriod !== "custom") {
      base = activeTab?.summaryByPeriod?.[activePeriod as Exclude<PeriodFilterValue, "custom">];
    }
    if (!base) base = activeTab?.summary;
    if (!base) return undefined;
    if (isComparing) {
      const agg = activeTab?.summaryAggregation ?? "sum";
      if (agg !== "none") {
        const n = activeChartData.length || 1;
        const primaryStat =
          agg === "avg"
            ? activeChartData.reduce((s, p) => s + p.value, 0) / n
            : activeChartData.reduce((s, p) => s + p.value, 0);
        const compStat =
          agg === "avg"
            ? activeComparisonData.reduce((s, p) => s + p.value, 0) / n
            : activeComparisonData.reduce((s, p) => s + p.value, 0);
        if (compStat !== 0) {
          return { ...base, change: ((primaryStat - compStat) / compStat) * 100 };
        }
      }
    }
    return base;
  }, [
    isOverview,
    activeTab,
    activePeriod,
    showPeriodFilter,
    isComparing,
    activeChartData,
    activeComparisonData,
  ]);

  const chartPoints = useMemo((): ChartPoint[] => {
    if (!isComparing) return activeChartData as ChartPoint[];
    return activeChartData.map((point, i) => ({
      ...point,
      primary: point.value,
      comparison: activeComparisonData[i]?.value ?? 0,
    }));
  }, [isComparing, activeChartData, activeComparisonData]);

  const axisFormatter = activeTab?.yAxisFormatter ?? yAxisFormatter;
  const labelFormatter =
    activeTab?.barLabelFormatter ??
    activeTab?.yAxisFormatter ??
    barLabelFormatter ??
    yAxisFormatter;

  // ── Adaptive bar sizing ──────────────────────────────────────────────────────
  const dataLen = isOverview
    ? (overviewChartData?.length ?? 0)
    : activeChartData.length;
  const overviewTabCount = tabs.filter((t) => t.includeInOverview !== false).length;
  const basBarSize = dataLen > 20 ? 10 : dataLen > 14 ? 16 : dataLen > 8 ? 22 : 36;
  const barSize = isOverview
    ? Math.max(4, Math.floor(basBarSize / Math.max(overviewTabCount, 1)))
    : basBarSize;
  const xAxisInterval = dataLen > 20 ? 3 : dataLen > 14 ? 1 : 0;
  const showBarLabels = dataLen <= 14 && !isComparing && !isOverview;

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
        <div className="flex items-start gap-3">
          {activeSummary && (
            <div className="text-right">
              <p className="text-xl font-bold leading-tight text-ds-1">
                {activeSummary.value}
              </p>
              {activeSummary.change !== undefined && (
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    marginTop: 2,
                    color: activeSummary.change >= 0 ? "#22c55e" : "#ef4444",
                  }}
                >
                  {activeSummary.change >= 0 ? "▲" : "▼"}&nbsp;
                  {activeSummary.change >= 0 ? "+" : ""}
                  {Math.abs(activeSummary.change).toFixed(1)}%
                  {activeSummary.changeLabel && (
                    <span
                      style={{ fontWeight: 400, color: "var(--ds-color-fg-muted)" }}
                    >
                      {" "}
                      {activeSummary.changeLabel}
                    </span>
                  )}
                </p>
              )}
            </div>
          )}
          <Button
            variant="tertiary"
            size="small"
            className="shrink-0 p-0.5! text-ds-3"
            aria-label={moreOptionsLabel}
            onClick={onMenuClick}
          >
            <EllipsisVerticalIcon width={18} height={18} />
          </Button>
        </div>
      </div>

      {/* ── Tab selector row ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 pb-5">
        <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = !isOverview && tab.id === activeId;
            const btn = (
              <Button
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

            return tab.description ? (
              <TabTooltip key={tab.id} content={tab.description}>
                {btn}
              </TabTooltip>
            ) : (
              <div key={tab.id}>{btn}</div>
            );
          })}

          {showAddTab && (
            <Button
              variant="tertiary"
              onClick={onAddTab}
              className="min-w-[72px] flex-col gap-1.5 rounded-lg border border-dashed border-ds-border-3 p-3 text-ds-3 transition-colors hover:border-ds-border-2 hover:bg-ds-surface-2 hover:text-ds-2 hover:opacity-100"
              aria-label={addTabLabel}
            >
              <span className="flex h-6 w-6 items-center justify-center text-lg font-light">
                +
              </span>
            </Button>
          )}
        </div>

        {showPeriodFilter && (
          <div className="shrink-0">
            <Select
              options={periodSelectOptions}
              value={activePeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              size="compact"
              selectionIndicator="none"
              containerClassName="w-[130px]"
              aria-label={periodFilterLabel}
            />
          </div>
        )}

        {showOverview && (
          <Button
            variant="tertiary"
            size="small"
            onClick={handleOverviewToggle}
            aria-pressed={isOverviewOn}
            className={mergeClassNames(
              "shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:opacity-100",
              isOverviewOn
                ? "border-ds-accent bg-ds-accent-subtle text-ds-accent"
                : "border-ds-border-3 text-ds-3 hover:border-ds-border-2 hover:bg-ds-surface-2 hover:text-ds-2",
            )}
          >
            {overviewButtonLabel}
          </Button>
        )}

        {showComparison && (
          <Button
            variant="tertiary"
            size="small"
            onClick={handleComparisonActiveToggle}
            aria-pressed={isComparisonOn}
            className={mergeClassNames(
              "shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:opacity-100",
              isComparisonOn && !isOverview
                ? "border-ds-accent bg-ds-accent-subtle text-ds-accent"
                : "border-ds-border-3 text-ds-3 hover:border-ds-border-2 hover:bg-ds-surface-2 hover:text-ds-2",
            )}
          >
            {compareButtonLabel}
          </Button>
        )}
      </div>

      {/*
        ── Filter row — primary picker + comparison (same line) ───────────────
        Reserved when showPeriodFilter is true. Primary picker hidden unless
        period="custom". Comparison section hidden unless isComparisonOn.
      */}
      {showPeriodFilter && (
        <div className="flex items-center gap-3 px-5 pb-3" style={{ height: 52 }}>
          <div
            className={mergeClassNames(
              "flex-1 transition-opacity duration-150",
              activePeriod !== "custom" && "invisible pointer-events-none",
            )}
            aria-hidden={activePeriod !== "custom"}
          >
            <DatePicker
              mode="range"
              value={activeRange}
              onChange={(v) => {
                if (v && typeof v === "object" && "start" in v) {
                  handleRangeChange(v as DateRangeValue);
                }
              }}
              placeholder={dateRangePlaceholder}
            />
          </div>

          {showComparison && (
            <div
              className={mergeClassNames(
                "flex flex-1 items-center gap-2 transition-opacity duration-150",
                (!isComparisonOn || isOverview) && "invisible pointer-events-none",
              )}
              aria-hidden={!isComparisonOn || isOverview}
            >
              <span className="shrink-0 text-xs font-medium text-ds-3">
                {compareToLabel}
              </span>
              {activeComparisonPeriod === "custom" ? (
                <DatePicker
                  mode="range"
                  value={activeComparisonRange}
                  onChange={(v) => {
                    if (v && typeof v === "object" && "start" in v) {
                      handleComparisonRangeChange(v as DateRangeValue);
                    }
                  }}
                  placeholder={comparisonDateRangePlaceholder}
                />
              ) : (
                <Select
                  options={periodSelectOptions}
                  value={activeComparisonPeriod}
                  onChange={(e) => handleComparisonPeriodChange(e.target.value)}
                  size="compact"
                  selectionIndicator="none"
                  containerClassName="w-full"
                  aria-label={comparisonFilterLabel}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Bar chart ───────────────────────────────────────────────────────── */}
      <div className="px-2 pb-5" style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={isOverview ? overviewChartData! : (chartPoints as unknown as Record<string, string | number>[])}
            barSize={barSize}
            barCategoryGap="25%"
            margin={{ top: showBarLabels ? 28 : 12, right: 16, left: 0, bottom: 0 }}
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
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 11 }}
              dy={10}
              interval={xAxisInterval}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={axisFormatter}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 11 }}
              dx={-4}
            />
            <Tooltip
              wrapperStyle={chartTooltipWrapperStyle}
              cursor={{ fill: "var(--ds-color-accent)", fillOpacity: 0.06 }}
              content={
                isOverview
                  ? (props) => (
                      <OverviewTooltipContent
                        {...(props as unknown as OverviewTooltipProps)}
                        tabs={tabs}
                        fallbackFormatter={labelFormatter}
                      />
                    )
                  : isComparing
                    ? (props) => (
                        <ComparisonTooltipContent
                          {...(props as unknown as ComparisonTooltipProps)}
                          formatter={labelFormatter}
                          primaryLabel={activeTab?.label ?? ""}
                          comparisonLabel={`${activeTab?.label ?? ""} (${comparisonSeriesLabel})`}
                          vsLabel={comparisonSeriesLabel}
                        />
                      )
                    : undefined
              }
              contentStyle={isOverview || isComparing ? undefined : chartTooltipContentStyle}
              itemStyle={isOverview || isComparing ? undefined : chartTooltipItemStyle}
              labelStyle={isOverview || isComparing ? undefined : chartTooltipLabelStyle}
              formatter={
                isOverview || isComparing
                  ? undefined
                  : (v) => [labelFormatter(Number(v)), activeTab?.label ?? ""]
              }
            />
            {isOverview ? (
              tabs
                .filter((t) => t.includeInOverview !== false)
                .map((tab, i) => (
                  <Bar
                    key={tab.id}
                    dataKey={tab.id}
                    name={tab.label}
                    radius={[4, 4, 0, 0]}
                    fill={tab.overviewColor ?? OVERVIEW_COLORS[i % OVERVIEW_COLORS.length]}
                  />
                ))
            ) : isComparing ? (
              <>
                <Bar dataKey="primary" radius={[4, 4, 0, 0]}>
                  {chartPoints.map((entry, i) => (
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
                <Bar
                  dataKey="comparison"
                  radius={[4, 4, 0, 0]}
                  fill="var(--ds-color-fg-muted)"
                  opacity={0.35}
                />
              </>
            ) : (
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {showBarLabels && (
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
                )}
                {activeChartData.map((entry, i) => (
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
            )}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
