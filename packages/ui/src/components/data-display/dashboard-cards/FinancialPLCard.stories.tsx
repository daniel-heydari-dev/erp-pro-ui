import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { FinancialPLCard } from "./FinancialPLCard";

import type { PLDataPoint, PLMetricTab, PLWaterfallStep } from "./FinancialPLCard";

// ── Shared data helpers ────────────────────────────────────────────────────────

const MONTHS     = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const HOURS      = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}h`);
const MAY_DAYS   = Array.from({ length: 31 }, (_, i) => String(i + 1));

function pts(names: string[], values: number[]): PLDataPoint[] {
  return names.map((name, i) => ({ name, value: values[i] ?? 0 }));
}

// Annual revenue (monthly) — realistic growth curve
const REV_YEAR  = [157300, 178500, 193800, 165800, 204000, 182800, 221000, 199800, 233800, 246500, 225300, 263500];
const REV_MONTH = [15300, 16580, 15130, 17850, 19130, 12330, 9350, 16320, 17430, 16830, 18280, 19550, 15980, 12920, 10200, 17680, 18700, 18280, 19980, 21250, 14880, 11900, 18020, 19380, 17850, 19720, 21080, 16580, 14280, 11900, 18700];
const REV_WEEK  = [42100, 48300, 45180, 51060, 57090, 28400, 19270];
const REV_TODAY = [0, 0, 0, 0, 180, 510, 1190, 2560, 4080, 4670, 5200, 4770, 4340, 4510, 5540, 5820, 5570, 4960, 3570, 2720, 2040, 1360, 770, 340];

// COGS — 45% of revenue
const cogs  = (arr: number[]) => arr.map((v) => Math.round(v * 0.45));
// Gross Profit — 55% of revenue
const gp    = (arr: number[]) => arr.map((v) => Math.round(v * 0.55));
// Net Profit — 34% of revenue
const np    = (arr: number[]) => arr.map((v) => Math.round(v * 0.34));
// Margin % — net profit margin (constant-ish with variation)
const margin = (arr: number[]) => arr.map((v, i) => Math.round(30 + (v / Math.max(...arr)) * 10 + (i % 3) - 1));
// Prev period — ~83% of current
const prev  = (arr: number[]) => arr.map((v) => Math.round(v * 0.83));

const valFmt = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(2)}M`
    : v >= 1_000 ? `$${Math.round(v / 1_000)}k`
    : `$${v}`;
const pctFmt = (v: number) => `${v}%`;

// ── Metric tabs ────────────────────────────────────────────────────────────────

const metrics: PLMetricTab[] = [
  {
    id: "revenue",
    label: "Revenue",
    tooltip: "Total income from all sales — your top line before any costs are deducted.",
    value: "$2.47M",
    rawValue: 2470000,
    change: 17.6,
    changeLabel: "vs last year",
    color: "#22c55e",
    chartType: "area",
    valueByPeriod: {
      today:        "$62.2k",
      yesterday:    "$72.8k",
      "this-week":  "$291k",
      "this-month": "$558k",
      "this-year":  "$2.47M",
    },
    changeByPeriod: {
      today: 12.4, yesterday: 8.1, "this-week": 14.9, "this-month": 12.1, "this-year": 17.6,
    },
    chartData: pts(MONTHS, REV_YEAR),
    chartDataByPeriod: {
      today:        pts(HOURS,      REV_TODAY),
      "this-week":  pts(DAYS_SHORT, REV_WEEK),
      "this-month": pts(MAY_DAYS,   REV_MONTH),
      "this-year":  pts(MONTHS,     REV_YEAR),
    },
    comparisonChartData: pts(MONTHS, prev(REV_YEAR)),
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(REV_TODAY)),
      "this-week":  pts(DAYS_SHORT, prev(REV_WEEK)),
      "this-month": pts(MAY_DAYS,   prev(REV_MONTH)),
      "this-year":  pts(MONTHS,     prev(REV_YEAR)),
    },
    comparisonLabel: "Prev. period",
    yAxisFormatter: valFmt,
  },
  {
    id: "cogs",
    label: "COGS",
    tooltip: "Cost of Goods Sold — what you paid suppliers for the items that were actually sold.",
    value: "$1.11M",
    rawValue: 1111500,
    change: 2.1,
    changeLabel: "vs last year",
    color: "#f97316",
    chartType: "bar",
    valueByPeriod: {
      today:        "$28.0k",
      yesterday:    "$32.8k",
      "this-week":  "$131k",
      "this-month": "$251k",
      "this-year":  "$1.11M",
    },
    changeByPeriod: {
      today: 1.2, yesterday: 0.8, "this-week": 2.0, "this-month": 1.5, "this-year": 2.1,
    },
    chartData: pts(MONTHS, cogs(REV_YEAR)),
    chartDataByPeriod: {
      today:        pts(HOURS,      cogs(REV_TODAY)),
      "this-week":  pts(DAYS_SHORT, cogs(REV_WEEK)),
      "this-month": pts(MAY_DAYS,   cogs(REV_MONTH)),
      "this-year":  pts(MONTHS,     cogs(REV_YEAR)),
    },
    comparisonChartData: pts(MONTHS, prev(cogs(REV_YEAR))),
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(cogs(REV_TODAY))),
      "this-week":  pts(DAYS_SHORT, prev(cogs(REV_WEEK))),
      "this-month": pts(MAY_DAYS,   prev(cogs(REV_MONTH))),
      "this-year":  pts(MONTHS,     prev(cogs(REV_YEAR))),
    },
    comparisonLabel: "Prev. period",
    yAxisFormatter: valFmt,
  },
  {
    id: "gross-profit",
    label: "Gross Profit",
    tooltip: "Revenue minus COGS. Shows your core trading margin before operating expenses.",
    value: "$1.36M",
    rawValue: 1358500,
    change: 5.8,
    changeLabel: "vs last year",
    color: "#3b82f6",
    chartType: "area",
    valueByPeriod: {
      today:        "$34.2k",
      yesterday:    "$40.0k",
      "this-week":  "$160k",
      "this-month": "$307k",
      "this-year":  "$1.36M",
    },
    changeByPeriod: {
      today: 4.1, yesterday: 3.5, "this-week": 5.2, "this-month": 4.9, "this-year": 5.8,
    },
    chartData: pts(MONTHS, gp(REV_YEAR)),
    chartDataByPeriod: {
      today:        pts(HOURS,      gp(REV_TODAY)),
      "this-week":  pts(DAYS_SHORT, gp(REV_WEEK)),
      "this-month": pts(MAY_DAYS,   gp(REV_MONTH)),
      "this-year":  pts(MONTHS,     gp(REV_YEAR)),
    },
    comparisonChartData: pts(MONTHS, prev(gp(REV_YEAR))),
    comparisonChartDataByPeriod: {
      "this-year": pts(MONTHS, prev(gp(REV_YEAR))),
    },
    comparisonLabel: "Prev. period",
    yAxisFormatter: valFmt,
  },
  {
    id: "net-profit",
    label: "Net Profit",
    tooltip: "What's left after paying all expenses — wages, rent, tax, and other overheads.",
    value: "$840K",
    rawValue: 839900,
    change: 12.3,
    changeLabel: "vs last year",
    color: "var(--ds-color-accent)",
    chartType: "area",
    valueByPeriod: {
      today:        "$21.2k",
      yesterday:    "$24.8k",
      "this-week":  "$99k",
      "this-month": "$190k",
      "this-year":  "$840k",
    },
    changeByPeriod: {
      today: 9.1, yesterday: 7.3, "this-week": 11.0, "this-month": 10.2, "this-year": 12.3,
    },
    chartData: pts(MONTHS, np(REV_YEAR)),
    chartDataByPeriod: {
      today:        pts(HOURS,      np(REV_TODAY)),
      "this-week":  pts(DAYS_SHORT, np(REV_WEEK)),
      "this-month": pts(MAY_DAYS,   np(REV_MONTH)),
      "this-year":  pts(MONTHS,     np(REV_YEAR)),
    },
    comparisonChartData: pts(MONTHS, prev(np(REV_YEAR))),
    comparisonChartDataByPeriod: {
      "this-year": pts(MONTHS, prev(np(REV_YEAR))),
    },
    comparisonLabel: "Prev. period",
    yAxisFormatter: valFmt,
  },
  {
    id: "margin",
    label: "Margin %",
    tooltip: "Net Profit as a % of Revenue. Higher means a more efficient business.",
    value: "34.0%",
    rawValue: 34,
    change: 2.4,
    changeLabel: "vs last year",
    color: "#8b5cf6",
    chartType: "line",
    valueByPeriod: {
      today: "34.1%", yesterday: "34.1%", "this-week": "34.0%", "this-month": "34.0%", "this-year": "34.0%",
    },
    changeByPeriod: {
      today: 1.1, yesterday: 0.9, "this-week": 1.8, "this-month": 2.0, "this-year": 2.4,
    },
    chartData: pts(MONTHS, margin(REV_YEAR)),
    chartDataByPeriod: {
      today:        pts(HOURS,      margin(REV_TODAY)),
      "this-week":  pts(DAYS_SHORT, margin(REV_WEEK)),
      "this-month": pts(MAY_DAYS,   margin(REV_MONTH)),
      "this-year":  pts(MONTHS,     margin(REV_YEAR)),
    },
    yAxisFormatter: pctFmt,
  },
];

// Waterfall steps: Revenue → −COGS → [Gross Profit] → −OpEx → [Net Profit]
const waterfallSteps: PLWaterfallStep[] = [
  { metricId: "revenue",      label: "Revenue",      role: "add"      },
  { metricId: "cogs",         label: "COGS",         role: "subtract" },
  {                           label: "Gross Profit",  role: "total"    },
  { rawValue: 518600,         label: "OpEx",         role: "subtract" },
  {                           label: "Net Profit",    role: "total"    },
];

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta: Meta<typeof FinancialPLCard> = {
  title: "Data Display / Dashboard Cards / Dashboard / FinancialPLCard",
  component: FinancialPLCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FinancialPLCard>;

// ── Stories ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Financial P&L Card"
        description="Full P&L with per-metric chart types: Revenue → area, COGS → bar, Gross Profit → area, Net Profit → area, Margin % → line. Overview mode renders a waterfall showing the full P&L flow."
      />
      <StorySection title="Revenue tab (area chart)">
        <StoryStack>
          <FinancialPLCard
            metrics={metrics}
            defaultMetricId="revenue"
            waterfallSteps={waterfallSteps}
            className="max-w-2xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const WithPeriodFilter: Story = {
  render: () => (
    <StorySurface>
      <StorySection title="Period filter + all metric tabs">
        <StoryStack>
          <FinancialPLCard
            metrics={metrics}
            defaultMetricId="revenue"
            waterfallSteps={waterfallSteps}
            showPeriodFilter
            defaultPeriodFilter="this-year"
            className="max-w-2xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const OverviewWaterfall: Story = {
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Overview — P&L Waterfall"
        description="Click Overview to see the full P&L flow: Revenue → COGS deducted → Gross Profit → OpEx deducted → Net Profit. Green = adds, red = subtracts, accent = totals."
      />
      <StorySection title="Overview active by default">
        <StoryStack>
          <FinancialPLCard
            metrics={metrics}
            waterfallSteps={waterfallSteps}
            showPeriodFilter
            defaultPeriodFilter="this-year"
            defaultOverviewActive
            className="max-w-2xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const ComparisonMode: Story = {
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Comparison Mode"
        description="Compare activates two-line chart: solid = current period, dashed = previous. Tooltip shows delta % between periods."
      />
      <StorySection title="Compare toggled on — Revenue tab">
        <StoryStack>
          <FinancialPLCard
            metrics={metrics}
            defaultMetricId="revenue"
            waterfallSteps={waterfallSteps}
            showPeriodFilter
            defaultPeriodFilter="this-year"
            showComparison
            defaultComparisonActive
            defaultComparisonPeriod="this-year"
            className="max-w-2xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const MarginTab: Story = {
  render: () => (
    <StorySurface>
      <StorySection title="Margin % tab — line chart">
        <StoryStack>
          <FinancialPLCard
            metrics={metrics}
            defaultMetricId="margin"
            waterfallSteps={waterfallSteps}
            showPeriodFilter
            defaultPeriodFilter="this-year"
            className="max-w-2xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const COGSTab: Story = {
  render: () => (
    <StorySurface>
      <StorySection title="COGS tab — bar chart">
        <StoryStack>
          <FinancialPLCard
            metrics={metrics}
            defaultMetricId="cogs"
            waterfallSteps={waterfallSteps}
            showPeriodFilter
            defaultPeriodFilter="this-month"
            className="max-w-2xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const FullFeatures: Story = {
  render: () => (
    <StorySurface>
      <StoryIntro
        title="All features enabled"
        description="Period filter + Overview + Compare all active. Click Overview for the P&L waterfall. Click Compare for two-line comparison. Click any KPI pill to switch metrics."
      />
      <StorySection title="Full P&L card">
        <StoryStack>
          <FinancialPLCard
            metrics={metrics}
            defaultMetricId="revenue"
            waterfallSteps={waterfallSteps}
            showPeriodFilter
            defaultPeriodFilter="this-year"
            showComparison
            defaultComparisonPeriod="this-year"
            className="max-w-2xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};
