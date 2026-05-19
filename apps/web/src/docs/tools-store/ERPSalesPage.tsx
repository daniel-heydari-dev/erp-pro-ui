import {
  DataTable,
  FinancialPLCard,
  SalesHeatmapCard,
  StatCard,
  TopSellingItemsCard,
} from "erp-pro-ui";
import type {
  DataTableColumn,
  DataTableRowAction,
  HeatmapPoint,
  PLDataPoint,
  PLMetricTab,
  PLWaterfallStep,
  TopSellingItem,
} from "erp-pro-ui";

// ── Types ──────────────────────────────────────────────────────────────────────

interface SalesOrder {
  id: string;
  orderNo: string;
  date: string;
  customer: string;
  itemCount: number;
  total: number;
  status: "pending" | "paid" | "shipped" | "returned";
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const MONTHS     = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MAY_DAYS   = Array.from({ length: 31 }, (_, i) => String(i + 1));

function pts(names: string[], values: number[]): PLDataPoint[] {
  return names.map((name, i) => ({ name, value: values[i] ?? 0 }));
}

const REV_YEAR  = [157300,178500,193800,165800,204000,182800,221000,199800,233800,246500,225300,263500];
const REV_MONTH = [15300,16580,15130,17850,19130,12330,9350,16320,17430,16830,18280,19550,15980,12920,10200,17680,18700,18280,19980,21250,14880,11900,18020,19380,17850,19720,21080,16580,14280,11900,18700];
const REV_WEEK  = [42100,48300,45180,51060,57090,28400,19270];
const cogs = (a: number[]) => a.map((v) => Math.round(v * 0.45));
const gp   = (a: number[]) => a.map((v) => Math.round(v * 0.55));
const np   = (a: number[]) => a.map((v) => Math.round(v * 0.34));
const mgn  = (a: number[]) => a.map((v, i) => Math.round(30 + (v / Math.max(...a)) * 10 + (i % 3) - 1));
const prev = (a: number[]) => a.map((v) => Math.round(v * 0.83));
const valFmt = (v: number) =>
  v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(2)}M` : v >= 1_000 ? `€${Math.round(v / 1_000)}k` : `€${v}`;
const pctFmt = (v: number) => `${v}%`;
const orderFmt = (v: number) =>
  `€${v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ── P&L metrics ───────────────────────────────────────────────────────────────

const PL_METRICS: PLMetricTab[] = [
  {
    id: "revenue", label: "Revenue",
    tooltip: "Total income from all sales — your top line before any costs are deducted.",
    value: "€2.47M", rawValue: 2470000, change: 17.6, changeLabel: "vs last year",
    color: "#22c55e", chartType: "area",
    valueByPeriod: { "this-week": "€291k", "this-month": "€558k", "this-year": "€2.47M" },
    changeByPeriod: { "this-week": 14.9, "this-month": 12.1, "this-year": 17.6 },
    chartData: pts(MONTHS, REV_YEAR),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, REV_WEEK), "this-month": pts(MAY_DAYS, REV_MONTH), "this-year": pts(MONTHS, REV_YEAR) },
    comparisonChartData: pts(MONTHS, prev(REV_YEAR)),
    comparisonChartDataByPeriod: { "this-week": pts(DAYS_SHORT, prev(REV_WEEK)), "this-month": pts(MAY_DAYS, prev(REV_MONTH)), "this-year": pts(MONTHS, prev(REV_YEAR)) },
    comparisonLabel: "Prev. period", yAxisFormatter: valFmt,
  },
  {
    id: "cogs", label: "COGS",
    tooltip: "Cost of Goods Sold — what you paid suppliers for the items that were actually sold.",
    value: "€1.11M", rawValue: 1111500, change: 2.1, changeLabel: "vs last year",
    color: "#f97316", chartType: "bar",
    chartData: pts(MONTHS, cogs(REV_YEAR)),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, cogs(REV_WEEK)), "this-month": pts(MAY_DAYS, cogs(REV_MONTH)), "this-year": pts(MONTHS, cogs(REV_YEAR)) },
    yAxisFormatter: valFmt,
  },
  {
    id: "gross-profit", label: "Gross Profit",
    tooltip: "Revenue minus COGS — your core trading margin before operating expenses.",
    value: "€1.36M", rawValue: 1358500, change: 5.8, changeLabel: "vs last year",
    color: "#3b82f6", chartType: "area",
    chartData: pts(MONTHS, gp(REV_YEAR)),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, gp(REV_WEEK)), "this-month": pts(MAY_DAYS, gp(REV_MONTH)), "this-year": pts(MONTHS, gp(REV_YEAR)) },
    yAxisFormatter: valFmt,
  },
  {
    id: "net-profit", label: "Net Profit",
    tooltip: "What's left after paying all expenses — wages, rent, tax, and other overheads.",
    value: "€840k", rawValue: 839900, change: 12.3, changeLabel: "vs last year",
    color: "var(--ds-color-accent)", chartType: "area",
    chartData: pts(MONTHS, np(REV_YEAR)),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, np(REV_WEEK)), "this-month": pts(MAY_DAYS, np(REV_MONTH)), "this-year": pts(MONTHS, np(REV_YEAR)) },
    yAxisFormatter: valFmt,
  },
  {
    id: "margin", label: "Margin %",
    tooltip: "Net Profit as a % of Revenue — higher means a more efficient business.",
    value: "34.0%", rawValue: 34, change: 2.4, changeLabel: "vs last year",
    color: "#8b5cf6", chartType: "line",
    chartData: pts(MONTHS, mgn(REV_YEAR)),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, mgn(REV_WEEK)), "this-month": pts(MAY_DAYS, mgn(REV_MONTH)), "this-year": pts(MONTHS, mgn(REV_YEAR)) },
    yAxisFormatter: pctFmt,
  },
];

const WATERFALL_STEPS: PLWaterfallStep[] = [
  { metricId: "revenue",    label: "Revenue",      role: "add"      },
  { metricId: "cogs",       label: "COGS",         role: "subtract" },
  {                         label: "Gross Profit",  role: "total"    },
  { rawValue: 518600,       label: "OpEx",         role: "subtract" },
  {                         label: "Net Profit",    role: "total"    },
];

// ── Top sellers ───────────────────────────────────────────────────────────────

const TOP_ITEMS: TopSellingItem[] = [
  { id: "1", name: "Hilti Hammer Drill TE 6",    category: "Power Tools", qty: 94,  revenue: 25191, qtyTrend: 18, revenueTrend: 22 },
  { id: "2", name: "Bosch Drill GSB 18V",        category: "Power Tools", qty: 148, revenue: 13318, qtyTrend: 12, revenueTrend: 14 },
  { id: "3", name: "DeWalt Circular Saw DWE",    category: "Power Tools", qty: 107, revenue: 18082, qtyTrend: 5,  revenueTrend: 7  },
  { id: "4", name: "Wera Screwdriver Set 6pc",   category: "Hand Tools",  qty: 281, revenue: 12630, qtyTrend: 7,  revenueTrend: 9  },
  { id: "5", name: "DeWalt Saw Blade Set 5pc",   category: "Accessories", qty: 198, revenue: 7324,  qtyTrend: 9,  revenueTrend: 11 },
  { id: "6", name: "3M Safety Glasses",          category: "Accessories", qty: 892, revenue: 8022,  qtyTrend: 6,  revenueTrend: 5  },
  { id: "7", name: "Knipex Pliers 200mm",        category: "Hand Tools",  qty: 312, revenue: 10904, qtyTrend: -4, revenueTrend: -3 },
  { id: "8", name: "Würth Screws 6x50 (100pcs)", category: "Hardware",    qty: 538, revenue: 3497,  qtyTrend: 1,  revenueTrend: 2  },
];

// ── Heatmap ────────────────────────────────────────────────────────────────────

function buildHeatmap(): HeatmapPoint[] {
  const days  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const slots = ["08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h"];
  const slotMult = [0.18, 0.44, 0.67, 0.86, 0.62, 0.38, 0.72, 0.92, 0.78, 0.55, 0.26, 0.10];
  const dayMult  = [0.82, 0.92, 0.88, 1.00, 1.12, 0.54, 0.24];
  const prods    = ["Bosch Drill","Hilti TE 6","DeWalt Saw","Wera Set","Bosch Drill","Hilti TE 6","DeWalt Saw","Hilti TE 6","Bosch Drill","DeWalt Saw","Knipex","3M Glasses"];
  return days.flatMap((day, di) =>
    slots.map((slot, si) => {
      const value = Math.round((dayMult[di] ?? 1) * (slotMult[si] ?? 0.5) * 5840);
      return { day, slot, value, clients: Math.max(1, Math.round(value / 240)), topProduct: prods[si] };
    }),
  );
}

const HEATMAP_DATA: HeatmapPoint[] = buildHeatmap();

// ── Sales orders ──────────────────────────────────────────────────────────────

const ORDERS: SalesOrder[] = [
  { id: "1",  orderNo: "ORD-2025-0087", date: "2025-05-17", customer: "Müller Bau GmbH",      itemCount: 4,  total: 1248.60, status: "shipped"  },
  { id: "2",  orderNo: "ORD-2025-0086", date: "2025-05-17", customer: "Schmidt Renovierung",  itemCount: 2,  total: 437.80,  status: "paid"     },
  { id: "3",  orderNo: "ORD-2025-0085", date: "2025-05-16", customer: "Baumarkt Express",     itemCount: 8,  total: 3812.40, status: "shipped"  },
  { id: "4",  orderNo: "ORD-2025-0084", date: "2025-05-16", customer: "Werkzeug Pro OHG",     itemCount: 3,  total: 782.55,  status: "paid"     },
  { id: "5",  orderNo: "ORD-2025-0083", date: "2025-05-15", customer: "Fischer Handwerk",     itemCount: 1,  total: 268.00,  status: "shipped"  },
  { id: "6",  orderNo: "ORD-2025-0082", date: "2025-05-15", customer: "TechBuild Solutions",  itemCount: 12, total: 5492.00, status: "shipped"  },
  { id: "7",  orderNo: "ORD-2025-0081", date: "2025-05-14", customer: "Heizung & Sanitär KG", itemCount: 5,  total: 1124.75, status: "paid"     },
  { id: "8",  orderNo: "ORD-2025-0080", date: "2025-05-14", customer: "Elektro Maier",        itemCount: 3,  total: 649.85,  status: "pending"  },
  { id: "9",  orderNo: "ORD-2025-0079", date: "2025-05-13", customer: "Dachdecker Braun",     itemCount: 6,  total: 2187.30, status: "shipped"  },
  { id: "10", orderNo: "ORD-2025-0078", date: "2025-05-13", customer: "Weber Installationen", itemCount: 2,  total: 358.90,  status: "paid"     },
  { id: "11", orderNo: "ORD-2025-0077", date: "2025-05-12", customer: "KFZ-Werkstatt Vogel",  itemCount: 7,  total: 1876.45, status: "shipped"  },
  { id: "12", orderNo: "ORD-2025-0076", date: "2025-05-12", customer: "Stahl & Metall AG",    itemCount: 9,  total: 4231.80, status: "shipped"  },
  { id: "13", orderNo: "ORD-2025-0075", date: "2025-05-11", customer: "Schreinerei Hofmann",  itemCount: 4,  total: 1089.60, status: "returned" },
  { id: "14", orderNo: "ORD-2025-0074", date: "2025-05-11", customer: "Müller Bau GmbH",      itemCount: 2,  total: 537.00,  status: "paid"     },
  { id: "15", orderNo: "ORD-2025-0073", date: "2025-05-10", customer: "Baumschulen Nord",     itemCount: 1,  total: 89.99,   status: "returned" },
  { id: "16", orderNo: "ORD-2025-0072", date: "2025-05-10", customer: "Elektro Maier",        itemCount: 5,  total: 1445.95, status: "shipped"  },
  { id: "17", orderNo: "ORD-2025-0071", date: "2025-05-09", customer: "Baumarkt Express",     itemCount: 3,  total: 614.70,  status: "paid"     },
  { id: "18", orderNo: "ORD-2025-0070", date: "2025-05-09", customer: "Fischer Handwerk",     itemCount: 6,  total: 2348.90, status: "shipped"  },
  { id: "19", orderNo: "ORD-2025-0069", date: "2025-05-08", customer: "TechBuild Solutions",  itemCount: 4,  total: 1872.00, status: "paid"     },
  { id: "20", orderNo: "ORD-2025-0068", date: "2025-05-08", customer: "Werkzeug Pro OHG",     itemCount: 2,  total: 338.90,  status: "pending"  },
];

const STATUS_LABEL = { pending: "Pending", paid: "Paid", shipped: "Shipped", returned: "Returned" } as const;
const STATUS_CLS   = {
  pending:  "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
  paid:     "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
  shipped:  "bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-400",
  returned: "bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400",
} as const;

// ── Columns ───────────────────────────────────────────────────────────────────

const COLUMNS: DataTableColumn<SalesOrder>[] = [
  {
    id: "orderNo", label: "Order",
    renderCell: ({ row }) => <span className="font-mono text-xs font-semibold text-ds-1">{row.orderNo}</span>,
  },
  {
    id: "date", label: "Date",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{row.date}</span>,
  },
  {
    id: "customer", label: "Customer",
    renderCell: ({ row }) => <span className="text-sm font-medium text-ds-1">{row.customer}</span>,
  },
  {
    id: "itemCount", label: "Items",
    renderCell: ({ row }) => (
      <span className="text-sm text-ds-3">{row.itemCount} item{row.itemCount !== 1 ? "s" : ""}</span>
    ),
  },
  {
    id: "total", label: "Total",
    renderCell: ({ row }) => <span className="text-sm font-bold text-ds-1">{orderFmt(row.total)}</span>,
  },
  {
    id: "status", label: "Status",
    filterable: true,
    renderCell: ({ row }) => (
      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_CLS[row.status]}`}>
        {STATUS_LABEL[row.status]}
      </span>
    ),
  },
];

const ROW_ACTIONS: DataTableRowAction<SalesOrder>[] = [
  { id: "view",    label: "View order"        },
  { id: "invoice", label: "Download invoice"  },
  { id: "refund",  label: "Refund", variant: "destructive" },
];

// ── Page ───────────────────────────────────────────────────────────────────────

const totalRevenue  = ORDERS.reduce((s, o) => s + (o.status !== "returned" ? o.total : 0), 0);
const paidOrders    = ORDERS.filter((o) => o.status !== "returned").length;
const returnCount   = ORDERS.filter((o) => o.status === "returned").length;

export default function ERPSalesPage() {
  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ds-1">Sales</h1>
        <p className="mt-1 text-sm text-ds-3">Revenue, orders &amp; performance</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard size="sm" title="Revenue"         value={`€${Math.round(totalRevenue / 1_000)}K`}        dateRange="shown orders"  badge={{ value: "+17.6%", direction: "up"   }} />
        <StatCard size="sm" title="Orders"          value={String(paidOrders)}                              dateRange="excl. returns" badge={{ value: "+12.1%", direction: "up"   }} />
        <StatCard size="sm" title="Avg Order Value" value={`€${Math.round(totalRevenue / paidOrders)}`}    dateRange="excl. returns" badge={{ value: "+5.4%",  direction: "up"   }} />
        <StatCard size="sm" title="Return Rate"     value={`${Math.round((returnCount / ORDERS.length) * 100)}%`} dateRange="of all orders" badge={{ value: "-0.8%",  direction: "up"   }} />
      </div>

      {/* P&L card + top sellers */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FinancialPLCard
            title="Revenue & P&L"
            subtitle="Financials by period"
            metrics={PL_METRICS}
            waterfallSteps={WATERFALL_STEPS}
            showPeriodFilter
            defaultPeriodFilter="this-year"
            showComparison
            defaultComparisonPeriod="this-year"
          />
        </div>
        <TopSellingItemsCard
          title="Top Sellers"
          subtitle="Ranked by revenue"
          items={TOP_ITEMS}
          showTrend
          defaultMetric="revenue"
        />
      </div>

      {/* Revenue heatmap */}
      <SalesHeatmapCard
        title="Sales by Day & Hour"
        subtitle="Revenue heatmap — current week"
        data={HEATMAP_DATA}
        metricLabel="Revenue"
        valueFormatter={(v) => v >= 1_000 ? `€${(v / 1_000).toFixed(1)}k` : `€${v}`}
      />

      {/* Orders table */}
      <DataTable<SalesOrder>
        columns={COLUMNS}
        data={ORDERS}
        pageSize={10}
        rowActions={ROW_ACTIONS}
        showExportButton
        showRefreshButton
      />
    </div>
  );
}
