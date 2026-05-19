import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { EarningReportsTabsCard } from "./EarningReportsTabsCard";
import type {
  EarningReportsTabsCardLabels,
  EarningTab,
  EarningTabBarPoint,
  EarningTabSummary,
  PeriodFilterValue,
} from "./EarningReportsTabsCard";
import type { DateRangeValue } from "../../forms/date-picker/types";

// ── Generic tabs for Default / Controlled ─────────────────────────────────────

const yearlyData = [
  { name: "Jan", value: 16000 },
  { name: "Feb", value: 21000 },
  { name: "Mar", value: 25000 },
  { name: "Apr", value: 19000 },
  { name: "May", value: 32000, highlighted: true },
  { name: "Jun", value: 27000 },
  { name: "Jul", value: 34000 },
  { name: "Aug", value: 29000 },
  { name: "Sep", value: 38000 },
  { name: "Oct", value: 41000 },
  { name: "Nov", value: 36000 },
  { name: "Dec", value: 44000, highlighted: true },
];

const tabs: EarningTab[] = [
  { id: "orders", icon: "📦", label: "Orders", chartData: yearlyData },
  { id: "sales",  icon: "💰", label: "Sales",  chartData: yearlyData.map((d) => ({ ...d, value: Math.round(d.value * 0.7) })) },
  { id: "profit", icon: "📈", label: "Profit", chartData: yearlyData.map((d) => ({ ...d, value: Math.round(d.value * 0.3) })) },
  { id: "income", icon: "🏦", label: "Income", chartData: yearlyData.map((d) => ({ ...d, value: Math.round(d.value * 1.2) })) },
];

const kFormat = (v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v));

// ── Period-specific mock data (sales-focused tabs) ────────────────────────────

const MONTHS     = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const HOURS      = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}h`);
const MAY_DAYS   = Array.from({ length: 31 }, (_, i) => String(i + 1));

function pts(names: string[], values: number[], peakIdx: number): EarningTabBarPoint[] {
  return names.map((name, i) => ({
    name,
    value: values[i] ?? 0,
    highlighted: i === peakIdx,
  }));
}

/** Scale an array of numbers to simulate a previous-period comparison (~85%). */
const prev = (arr: number[]) => arr.map((v) => Math.round(v * 0.85));

// By Quantity — units sold
const QTY_TODAY     = [2,1,1,1,2,5,12,28,45,52,58,54,48,50,62,71,68,55,40,30,22,15,8,3];
const QTY_YESTERDAY = [3,1,1,1,3,6,14,30,48,55,61,56,51,53,65,68,64,58,42,32,24,16,9,4];
const QTY_WEEK      = [142,168,155,189,201,87,62];
const QTY_MONTH     = [180,195,178,210,225,145,110,192,205,198,215,230,188,152,120,208,220,215,235,250,175,140,212,228,210,232,248,195,168,140,220];
const QTY_YEAR      = [1850,2100,2280,1950,2400,2150,2600,2350,2750,2900,2650,3100];

// By Value — revenue ($)
const VAL_TODAY     = [180,90,90,90,180,425,1020,2380,3820,4420,4920,4580,4050,4230,5250,6020,5780,4680,3390,2540,1860,1260,680,250];
const VAL_YESTERDAY = [250,90,90,90,250,510,1190,2560,4080,4670,5200,4770,4340,4510,5540,5820,5570,4960,3570,2720,2040,1360,770,340];
const VAL_WEEK      = [12100,14300,13180,16060,17090,7400,5270];
const VAL_MONTH     = [15300,16580,15130,17850,19130,12330,9350,16320,17430,16830,18280,19550,15980,12920,10200,17680,18700,18280,19980,21250,14880,11900,18020,19380,17850,19720,21080,16580,14280,11900,18700];
const VAL_YEAR      = [157300,178500,193800,165800,204000,182800,221000,199800,233800,246500,225300,263500];

// Expenses — operating costs ($), ~75% of revenue
const EXP_TODAY     = VAL_TODAY.map((v) => Math.round(v * 0.75));
const EXP_YESTERDAY = VAL_YESTERDAY.map((v) => Math.round(v * 0.75));
const EXP_WEEK      = VAL_WEEK.map((v) => Math.round(v * 0.75));
const EXP_MONTH     = VAL_MONTH.map((v) => Math.round(v * 0.75));
const EXP_YEAR      = VAL_YEAR.map((v) => Math.round(v * 0.75));

// COGS — cost of goods sold, ~60% of revenue
const COGS_TODAY     = VAL_TODAY.map((v) => Math.round(v * 0.60));
const COGS_YESTERDAY = VAL_YESTERDAY.map((v) => Math.round(v * 0.60));
const COGS_WEEK      = VAL_WEEK.map((v) => Math.round(v * 0.60));
const COGS_MONTH     = VAL_MONTH.map((v) => Math.round(v * 0.60));
const COGS_YEAR      = VAL_YEAR.map((v) => Math.round(v * 0.60));

// Gross Profit — revenue minus COGS, ~40% of revenue
const GP_TODAY     = VAL_TODAY.map((v) => Math.round(v * 0.40));
const GP_YESTERDAY = VAL_YESTERDAY.map((v) => Math.round(v * 0.40));
const GP_WEEK      = VAL_WEEK.map((v) => Math.round(v * 0.40));
const GP_MONTH     = VAL_MONTH.map((v) => Math.round(v * 0.40));
const GP_YEAR      = VAL_YEAR.map((v) => Math.round(v * 0.40));

// Net Profit — after operating expenses, ~28% of revenue
const NP_TODAY     = VAL_TODAY.map((v) => Math.round(v * 0.28));
const NP_YESTERDAY = VAL_YESTERDAY.map((v) => Math.round(v * 0.28));
const NP_WEEK      = VAL_WEEK.map((v) => Math.round(v * 0.28));
const NP_MONTH     = VAL_MONTH.map((v) => Math.round(v * 0.28));
const NP_YEAR      = VAL_YEAR.map((v) => Math.round(v * 0.28));

// Margin — net profit %
const MGN_TODAY     = [22,20,20,20,22,25,28,30,32,34,35,33,30,31,34,36,35,33,30,28,26,25,23,21];
const MGN_YESTERDAY = [23,20,20,20,23,26,29,31,33,35,36,34,31,32,35,35,34,33,29,27,25,24,22,20];
const MGN_WEEK      = [29,31,30,33,34,27,24];
const MGN_MONTH     = [31,32,30,33,34,27,24,32,33,32,34,35,31,28,25,33,34,33,35,36,30,27,33,34,32,34,35,31,28,25,33];
const MGN_YEAR      = [28,30,32,29,34,31,35,33,37,38,36,39];

const qtyFmt = (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v));
const valFmt = (v: number) => (v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`);
const mgnFmt = (v: number) => `${v}%`;

const salesTabs: EarningTab[] = [
  {
    id: "qty",
    icon: "📦",
    label: "By Qty",
    description: "Total units sold in the selected period.",
    chartData: pts(MONTHS, QTY_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      QTY_TODAY,     14),
      yesterday:    pts(HOURS,      QTY_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, QTY_WEEK,       4),
      "this-month": pts(MAY_DAYS,   QTY_MONTH,     19),
      "this-year":  pts(MONTHS,     QTY_YEAR,      11),
    },
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(QTY_TODAY),     14),
      yesterday:    pts(HOURS,      prev(QTY_YESTERDAY), 14),
      "this-week":  pts(DAYS_SHORT, prev(QTY_WEEK),       4),
      "this-month": pts(MAY_DAYS,   prev(QTY_MONTH),     19),
      "this-year":  pts(MONTHS,     prev(QTY_YEAR),      11),
    },
    summary: { value: "29.1k units", change: 8.5, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "733 units",   change: 17.6, changeLabel: "vs yesterday" },
      yesterday:    { value: "857 units",   change: 12.3, changeLabel: "vs 2 days ago" },
      "this-week":  { value: "1,004 units", change: 15.0, changeLabel: "vs last week" },
      "this-month": { value: "6.0k units",  change:  8.3, changeLabel: "vs last month" },
      "this-year":  { value: "29.1k units", change:  8.5, changeLabel: "vs last year" },
    },
    yAxisFormatter: qtyFmt,
  },
  {
    id: "value",
    icon: "💰",
    label: "By Value",
    description: "Total revenue (gross sales amount) in the selected period.",
    chartData: pts(MONTHS, VAL_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      VAL_TODAY,     14),
      yesterday:    pts(HOURS,      VAL_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, VAL_WEEK,       4),
      "this-month": pts(MAY_DAYS,   VAL_MONTH,     19),
      "this-year":  pts(MONTHS,     VAL_YEAR,      11),
    },
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(VAL_TODAY),     14),
      yesterday:    pts(HOURS,      prev(VAL_YESTERDAY), 14),
      "this-week":  pts(DAYS_SHORT, prev(VAL_WEEK),       4),
      "this-month": pts(MAY_DAYS,   prev(VAL_MONTH),     19),
      "this-year":  pts(MONTHS,     prev(VAL_YEAR),      11),
    },
    summary: { value: "$2.47M", change: 17.6, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "$62.2k",  change: 17.6, changeLabel: "vs yesterday" },
      yesterday:    { value: "$72.8k",  change: 11.4, changeLabel: "vs 2 days ago" },
      "this-week":  { value: "$85.4k",  change: 14.9, changeLabel: "vs last week" },
      "this-month": { value: "$558k",   change: 12.1, changeLabel: "vs last month" },
      "this-year":  { value: "$2.47M",  change: 17.6, changeLabel: "vs last year" },
    },
    yAxisFormatter: valFmt,
  },
  {
    id: "margin",
    icon: "📈",
    label: "Margin",
    description: "Net profit margin — revenue minus COGS, expressed as a percentage.",
    chartData: pts(MONTHS, MGN_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      MGN_TODAY,     14),
      yesterday:    pts(HOURS,      MGN_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, MGN_WEEK,       4),
      "this-month": pts(MAY_DAYS,   MGN_MONTH,     19),
      "this-year":  pts(MONTHS,     MGN_YEAR,      11),
    },
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(MGN_TODAY),     14),
      yesterday:    pts(HOURS,      prev(MGN_YESTERDAY), 14),
      "this-week":  pts(DAYS_SHORT, prev(MGN_WEEK),       4),
      "this-month": pts(MAY_DAYS,   prev(MGN_MONTH),     19),
      "this-year":  pts(MONTHS,     prev(MGN_YEAR),      11),
    },
    summary: { value: "33.5%", change: 2.1, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "28.0%", change:  1.4, changeLabel: "vs yesterday" },
      yesterday:    { value: "28.8%", change:  0.9, changeLabel: "vs 2 days ago" },
      "this-week":  { value: "29.7%", change:  1.8, changeLabel: "vs last week" },
      "this-month": { value: "31.5%", change:  2.1, changeLabel: "vs last month" },
      "this-year":  { value: "33.5%", change:  2.1, changeLabel: "vs last year" },
    },
    summaryAggregation: "avg",
    yAxisFormatter: mgnFmt,
    barLabelFormatter: mgnFmt,
  },
  {
    id: "expenses",
    icon: "💸",
    label: "Expenses",
    description: "Total operating expenses (COGS + overhead) in the selected period.",
    chartData: pts(MONTHS, EXP_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      EXP_TODAY,     14),
      yesterday:    pts(HOURS,      EXP_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, EXP_WEEK,       4),
      "this-month": pts(MAY_DAYS,   EXP_MONTH,     19),
      "this-year":  pts(MONTHS,     EXP_YEAR,      11),
    },
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(EXP_TODAY),     14),
      yesterday:    pts(HOURS,      prev(EXP_YESTERDAY), 14),
      "this-week":  pts(DAYS_SHORT, prev(EXP_WEEK),       4),
      "this-month": pts(MAY_DAYS,   prev(EXP_MONTH),     19),
      "this-year":  pts(MONTHS,     prev(EXP_YEAR),      11),
    },
    summary: { value: "$1.85M", change: 6.2, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "$46.6k", change:  6.2, changeLabel: "vs yesterday" },
      yesterday:    { value: "$54.6k", change:  5.8, changeLabel: "vs 2 days ago" },
      "this-week":  { value: "$64.1k", change:  7.1, changeLabel: "vs last week" },
      "this-month": { value: "$418k",  change:  6.5, changeLabel: "vs last month" },
      "this-year":  { value: "$1.85M", change:  6.2, changeLabel: "vs last year" },
    },
    yAxisFormatter: valFmt,
  },
];

// ── Financial P&L tabs (Revenue / COGS / Gross Profit / Net Profit / Margin) ──

const financialTabs: EarningTab[] = [
  {
    id: "revenue",
    icon: "💰",
    label: "Revenue",
    description: "Total gross revenue in the selected period.",
    chartData: pts(MONTHS, VAL_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      VAL_TODAY,     14),
      yesterday:    pts(HOURS,      VAL_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, VAL_WEEK,       4),
      "this-month": pts(MAY_DAYS,   VAL_MONTH,     19),
      "this-year":  pts(MONTHS,     VAL_YEAR,      11),
    },
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(VAL_TODAY),     14),
      yesterday:    pts(HOURS,      prev(VAL_YESTERDAY), 14),
      "this-week":  pts(DAYS_SHORT, prev(VAL_WEEK),       4),
      "this-month": pts(MAY_DAYS,   prev(VAL_MONTH),     19),
      "this-year":  pts(MONTHS,     prev(VAL_YEAR),      11),
    },
    summary: { value: "$2.47M", change: 17.6, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "$62.2k",  change: 17.6, changeLabel: "vs yesterday" },
      yesterday:    { value: "$72.8k",  change: 11.4, changeLabel: "vs 2 days ago" },
      "this-week":  { value: "$85.4k",  change: 14.9, changeLabel: "vs last week" },
      "this-month": { value: "$558k",   change: 12.1, changeLabel: "vs last month" },
      "this-year":  { value: "$2.47M",  change: 17.6, changeLabel: "vs last year" },
    },
    yAxisFormatter: valFmt,
    overviewColor: "var(--ds-color-accent)",
    includeInOverview: true,
  },
  {
    id: "cogs",
    icon: "🏭",
    label: "COGS",
    description: "Cost of Goods Sold — direct costs of producing items sold.",
    chartData: pts(MONTHS, COGS_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      COGS_TODAY,     14),
      yesterday:    pts(HOURS,      COGS_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, COGS_WEEK,       4),
      "this-month": pts(MAY_DAYS,   COGS_MONTH,     19),
      "this-year":  pts(MONTHS,     COGS_YEAR,      11),
    },
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(COGS_TODAY),     14),
      yesterday:    pts(HOURS,      prev(COGS_YESTERDAY), 14),
      "this-week":  pts(DAYS_SHORT, prev(COGS_WEEK),       4),
      "this-month": pts(MAY_DAYS,   prev(COGS_MONTH),     19),
      "this-year":  pts(MONTHS,     prev(COGS_YEAR),      11),
    },
    summary: { value: "$1.48M", change: 5.4, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "$37.3k", change:  5.4, changeLabel: "vs yesterday" },
      yesterday:    { value: "$43.7k", change:  4.9, changeLabel: "vs 2 days ago" },
      "this-week":  { value: "$51.2k", change:  6.1, changeLabel: "vs last week" },
      "this-month": { value: "$335k",  change:  5.8, changeLabel: "vs last month" },
      "this-year":  { value: "$1.48M", change:  5.4, changeLabel: "vs last year" },
    },
    yAxisFormatter: valFmt,
    overviewColor: "#ef4444",
    includeInOverview: true,
  },
  {
    id: "gross-profit",
    icon: "📊",
    label: "Gross Profit",
    description: "Revenue minus COGS — profit before operating expenses.",
    chartData: pts(MONTHS, GP_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      GP_TODAY,     14),
      yesterday:    pts(HOURS,      GP_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, GP_WEEK,       4),
      "this-month": pts(MAY_DAYS,   GP_MONTH,     19),
      "this-year":  pts(MONTHS,     GP_YEAR,      11),
    },
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(GP_TODAY),     14),
      yesterday:    pts(HOURS,      prev(GP_YESTERDAY), 14),
      "this-week":  pts(DAYS_SHORT, prev(GP_WEEK),       4),
      "this-month": pts(MAY_DAYS,   prev(GP_MONTH),     19),
      "this-year":  pts(MONTHS,     prev(GP_YEAR),      11),
    },
    summary: { value: "$988k", change: 22.1, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "$24.9k", change: 22.1, changeLabel: "vs yesterday" },
      yesterday:    { value: "$29.1k", change: 16.8, changeLabel: "vs 2 days ago" },
      "this-week":  { value: "$34.2k", change: 19.7, changeLabel: "vs last week" },
      "this-month": { value: "$223k",  change: 18.4, changeLabel: "vs last month" },
      "this-year":  { value: "$988k",  change: 22.1, changeLabel: "vs last year" },
    },
    yAxisFormatter: valFmt,
    overviewColor: "#22c55e",
    includeInOverview: true,
  },
  {
    id: "net-profit",
    icon: "📈",
    label: "Net Profit",
    description: "Gross profit minus all operating expenses — the bottom line.",
    chartData: pts(MONTHS, NP_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      NP_TODAY,     14),
      yesterday:    pts(HOURS,      NP_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, NP_WEEK,       4),
      "this-month": pts(MAY_DAYS,   NP_MONTH,     19),
      "this-year":  pts(MONTHS,     NP_YEAR,      11),
    },
    comparisonChartDataByPeriod: {
      today:        pts(HOURS,      prev(NP_TODAY),     14),
      yesterday:    pts(HOURS,      prev(NP_YESTERDAY), 14),
      "this-week":  pts(DAYS_SHORT, prev(NP_WEEK),       4),
      "this-month": pts(MAY_DAYS,   prev(NP_MONTH),     19),
      "this-year":  pts(MONTHS,     prev(NP_YEAR),      11),
    },
    summary: { value: "$692k", change: 19.3, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "$17.4k", change: 19.3, changeLabel: "vs yesterday" },
      yesterday:    { value: "$20.4k", change: 13.1, changeLabel: "vs 2 days ago" },
      "this-week":  { value: "$23.9k", change: 16.4, changeLabel: "vs last week" },
      "this-month": { value: "$156k",  change: 15.2, changeLabel: "vs last month" },
      "this-year":  { value: "$692k",  change: 19.3, changeLabel: "vs last year" },
    },
    yAxisFormatter: valFmt,
    overviewColor: "#3b82f6",
    includeInOverview: true,
  },
  {
    id: "margin",
    icon: "📉",
    label: "Margin %",
    description: "Net profit margin — net profit as a percentage of revenue.",
    chartData: pts(MONTHS, MGN_YEAR, 11),
    chartDataByPeriod: {
      today:        pts(HOURS,      MGN_TODAY,     14),
      yesterday:    pts(HOURS,      MGN_YESTERDAY, 14),
      "this-week":  pts(DAYS_SHORT, MGN_WEEK,       4),
      "this-month": pts(MAY_DAYS,   MGN_MONTH,     19),
      "this-year":  pts(MONTHS,     MGN_YEAR,      11),
    },
    summary: { value: "28.0%", change: 1.4, changeLabel: "vs last year" } satisfies EarningTabSummary,
    summaryByPeriod: {
      today:        { value: "28.0%", change:  1.4, changeLabel: "vs yesterday" },
      "this-month": { value: "31.5%", change:  2.1, changeLabel: "vs last month" },
      "this-year":  { value: "28.0%", change:  1.4, changeLabel: "vs last year" },
    },
    summaryAggregation: "avg",
    yAxisFormatter: mgnFmt,
    barLabelFormatter: mgnFmt,
    includeInOverview: false,
  },
];

// ── i18n variant ──────────────────────────────────────────────────────────────

const salesTabsEs: EarningTab[] = salesTabs.map((tab) => ({
  ...tab,
  label:       ({ qty: "Por Cant.", value: "Por Valor", margin: "Margen" } as Record<string, string>)[tab.id] ?? tab.label,
  description: ({
    qty:    "Total de unidades vendidas en el período seleccionado.",
    value:  "Ingresos totales (ventas brutas) en el período seleccionado.",
    margin: "Margen de beneficio neto (ingresos menos COGS) en porcentaje.",
  } as Record<string, string>)[tab.id],
}));

const esLabels: EarningReportsTabsCardLabels = {
  moreOptionsAriaLabel:  "Más opciones",
  addTabAriaLabel:       "Añadir categoría",
  periodFilterAriaLabel: "Filtrar por período",
  dateRangePlaceholder:  "Seleccionar rango de fechas",
  periodOptions: {
    today:        "Hoy",
    yesterday:    "Ayer",
    "this-week":  "Esta semana",
    "this-month": "Este mes",
    "this-year":  "Este año",
    custom:       "Personalizado",
  },
};

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta<typeof EarningReportsTabsCard> = {
  title: "Data Display / Dashboard Cards / Dashboard / EarningReportsTabsCard",
  component: EarningReportsTabsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Earnings bar chart with icon tab switcher. `EarningTab.description` shows a portal tooltip on hover. `chartDataByPeriod` swaps chart data by period (24 h / 7 days / days-of-month / 12 months). `labels` prop overrides every hardcoded string for i18n.",
      },
    },
  },
  argTypes: {
    title:                    { control: "text" },
    subtitle:                 { control: "text" },
    tabs:                     { control: false },
    selectedTabId:            { control: false },
    onTabChange:              { control: false },
    defaultTabId:             { control: "text" },
    showAddTab:               { control: "boolean" },
    showPeriodFilter:         { control: "boolean" },
    periodFilter:             { control: false },
    defaultPeriodFilter:      { control: false },
    showComparison:           { control: "boolean" },
    comparisonPeriod:         { control: false },
    defaultComparisonPeriod:  { control: false },
    showOverview:             { control: "boolean" },
    overviewActive:           { control: false },
    defaultOverviewActive:    { control: false },
    labels:                   { control: false },
    yAxisFormatter:           { control: false },
    barLabelFormatter:        { control: false },
    className:                { control: false },
    onMenuClick:              { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <EarningReportsTabsCard tabs={tabs} defaultTabId="orders" yAxisFormatter={kFormat} />
    </StorySurface>
  ),
};

// ── WithPeriodFilter (Sales) ──────────────────────────────────────────────────

export const WithPeriodFilter: Story = {
  name: "With Period Filter (Sales)",
  render: () => {
    const [period, setPeriod] = useState<PeriodFilterValue>("this-month");
    const [range, setRange] = useState<DateRangeValue>({ start: null, end: null });

    const hint: Record<PeriodFilterValue, string> = {
      today:        "24 hourly bars",
      yesterday:    "24 hourly bars",
      "this-week":  "Mon–Sun bars",
      "this-month": "one bar per day (May = 31 bars)",
      "this-year":  "Jan–Dec bars",
      custom:       range.start
        ? `${range.start.toLocaleDateString()} → ${range.end?.toLocaleDateString() ?? "…"}`
        : "pick a date range below",
    };

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="Sales reports with period filter"
            description={`Tabs: By Qty · By Value · Margin — hover a tab for its tooltip. Period: ${hint[period]}. Card height is fixed; Custom just reveals the date picker in reserved space.`}
          />
          <StorySection>
            <EarningReportsTabsCard
              title="Sales Reports"
              subtitle="Business Sales Overview"
              tabs={salesTabs}
              defaultTabId="qty"
              showAddTab={false}
              showPeriodFilter
              periodFilter={period}
              onPeriodFilterChange={setPeriod}
              customDateRange={range}
              onCustomDateRangeChange={setRange}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
};

// ── WithI18nLabels ────────────────────────────────────────────────────────────

export const WithI18nLabels: Story = {
  name: "Custom Labels (i18n — Spanish)",
  render: () => {
    const [period, setPeriod] = useState<PeriodFilterValue>("this-month");
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="labels prop — full i18n"
            description="Pass labels to override every hardcoded string: aria-labels, period option text, date-range placeholder. Tab label and description come from EarningTab itself."
          />
          <StorySection>
            <EarningReportsTabsCard
              title="Informes de Ventas"
              subtitle="Resumen de ventas comerciales"
              tabs={salesTabsEs}
              defaultTabId="qty"
              showAddTab={false}
              showPeriodFilter
              periodFilter={period}
              onPeriodFilterChange={setPeriod}
              labels={esLabels}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
};

// ── Controlled ────────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("sales");
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="Controlled tab selection"
            description={`Active tab: "${activeTab}". Drive the tab from a parent via selectedTabId + onTabChange.`}
          />
          <StorySection>
            <EarningReportsTabsCard
              tabs={tabs}
              selectedTabId={activeTab}
              onTabChange={setActiveTab}
              showAddTab={false}
              yAxisFormatter={kFormat}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
};

// ── WithOverview ──────────────────────────────────────────────────────────────

export const WithOverview: Story = {
  name: "Overview Mode (all metrics)",
  render: () => {
    const [period, setPeriod] = useState<PeriodFilterValue>("this-year");
    const [overviewActive, setOverviewActive] = useState(true);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="Overview — all metrics side-by-side"
            description="Click Overview to toggle grouped bars. Revenue, COGS, Gross Profit, Net Profit render simultaneously. Margin % is excluded (different unit). Hover a bar group to see all values."
          />
          <StorySection>
            <EarningReportsTabsCard
              title="Financial Overview"
              subtitle="Revenue · COGS · Gross Profit · Net Profit"
              tabs={financialTabs}
              defaultTabId="revenue"
              showAddTab={false}
              showPeriodFilter
              periodFilter={period}
              onPeriodFilterChange={setPeriod}
              showOverview
              overviewActive={overviewActive}
              onOverviewActiveChange={setOverviewActive}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
};

// ── FinancialPnL (full-featured) ──────────────────────────────────────────────

export const FinancialPnL: Story = {
  name: "Financial P&L (Overview + Comparison)",
  render: () => {
    const [period, setPeriod] = useState<PeriodFilterValue>("this-year");
    const [compPeriod, setCompPeriod] = useState<PeriodFilterValue>("this-year");
    const [compActive, setCompActive] = useState(false);
    const [overviewActive, setOverviewActive] = useState(false);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="Full financial P&L card"
            description="Revenue / COGS / Gross Profit / Net Profit tabs with period filter, comparison mode, and overview mode. Overview shows all $ metrics as grouped bars; Margin % tab is excluded from overview."
          />
          <StorySection>
            <EarningReportsTabsCard
              title="P&L Report"
              subtitle="Full Financial Overview"
              tabs={financialTabs}
              defaultTabId="revenue"
              showAddTab={false}
              showPeriodFilter
              periodFilter={period}
              onPeriodFilterChange={setPeriod}
              showComparison
              comparisonPeriod={compPeriod}
              onComparisonPeriodChange={setCompPeriod}
              comparisonActive={compActive}
              onComparisonActiveChange={setCompActive}
              showOverview
              overviewActive={overviewActive}
              onOverviewActiveChange={setOverviewActive}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
};

// ── WithComparison ────────────────────────────────────────────────────────────

export const WithComparison: Story = {
  name: "With Period Comparison",
  render: () => {
    const [period, setPeriod] = useState<PeriodFilterValue>("this-month");
    const [compPeriod, setCompPeriod] = useState<PeriodFilterValue>("this-year");
    const [compActive, setCompActive] = useState(false);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="Period comparison — dual bars"
            description={`Click "Compare" to overlay a second series. Primary: ${period} · Compare to: ${compPeriod}. Comparison data is ~85% of current to simulate a prior period.`}
          />
          <StorySection>
            <EarningReportsTabsCard
              title="Sales Reports"
              subtitle="Period vs Period Comparison"
              tabs={salesTabs}
              defaultTabId="qty"
              showAddTab={false}
              showPeriodFilter
              periodFilter={period}
              onPeriodFilterChange={setPeriod}
              showComparison
              comparisonPeriod={compPeriod}
              onComparisonPeriodChange={setCompPeriod}
              comparisonActive={compActive}
              onComparisonActiveChange={setCompActive}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
};
