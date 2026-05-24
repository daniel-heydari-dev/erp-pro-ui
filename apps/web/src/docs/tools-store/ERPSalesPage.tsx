import {
  AcquisitionChannelCard,
  DataTable,
  FinancialPLCard,
  SalesHeatmapCard,
  StatCard,
} from "erp-pro-ui";
import type {
  AcquisitionChannel,
  AcquisitionPlanRow,
  DataTableColumn,
  DataTableRowAction,
  HeatmapPoint,
  PLDataPoint,
  PLMetricTab,
  PLWaterfallStep,
} from "erp-pro-ui";

// ── Types ──────────────────────────────────────────────────────────────────────

interface SubscriptionOrder {
  id: string;
  orderNo: string;
  date: string;
  company: string;
  plan: "enterprise" | "pro" | "starter" | "trial";
  seats: number;
  mrr: number;
  status: "active" | "trial" | "renewal" | "upgraded" | "churned";
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
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(2)}M` : v >= 1_000 ? `$${Math.round(v / 1_000)}k` : `$${v}`;
const pctFmt = (v: number) => `${v}%`;

// ── P&L metrics ───────────────────────────────────────────────────────────────

const PL_METRICS: PLMetricTab[] = [
  {
    id: "revenue", label: "Revenue",
    tooltip: "Total subscription revenue — your top line before any costs.",
    value: "$2.47M", rawValue: 2470000, change: 17.6, changeLabel: "vs last year",
    color: "#22c55e", chartType: "area",
    valueByPeriod: { "this-week": "$291k", "this-month": "$558k", "this-year": "$2.47M" },
    changeByPeriod: { "this-week": 14.9, "this-month": 12.1, "this-year": 17.6 },
    chartData: pts(MONTHS, REV_YEAR),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, REV_WEEK), "this-month": pts(MAY_DAYS, REV_MONTH), "this-year": pts(MONTHS, REV_YEAR) },
    comparisonChartData: pts(MONTHS, prev(REV_YEAR)),
    comparisonChartDataByPeriod: { "this-week": pts(DAYS_SHORT, prev(REV_WEEK)), "this-month": pts(MAY_DAYS, prev(REV_MONTH)), "this-year": pts(MONTHS, prev(REV_YEAR)) },
    comparisonLabel: "Prev. period", yAxisFormatter: valFmt,
  },
  {
    id: "cogs", label: "COGS",
    tooltip: "Cost of Revenue — infrastructure, support, and delivery costs.",
    value: "$1.11M", rawValue: 1111500, change: 2.1, changeLabel: "vs last year",
    color: "#f97316", chartType: "bar",
    chartData: pts(MONTHS, cogs(REV_YEAR)),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, cogs(REV_WEEK)), "this-month": pts(MAY_DAYS, cogs(REV_MONTH)), "this-year": pts(MONTHS, cogs(REV_YEAR)) },
    yAxisFormatter: valFmt,
  },
  {
    id: "gross-profit", label: "Gross Profit",
    tooltip: "Revenue minus COGS — your core margin before operating expenses.",
    value: "$1.36M", rawValue: 1358500, change: 5.8, changeLabel: "vs last year",
    color: "#3b82f6", chartType: "area",
    chartData: pts(MONTHS, gp(REV_YEAR)),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, gp(REV_WEEK)), "this-month": pts(MAY_DAYS, gp(REV_MONTH)), "this-year": pts(MONTHS, gp(REV_YEAR)) },
    yAxisFormatter: valFmt,
  },
  {
    id: "net-profit", label: "Net Profit",
    tooltip: "What remains after all expenses — payroll, infrastructure, and overhead.",
    value: "$840k", rawValue: 839900, change: 12.3, changeLabel: "vs last year",
    color: "var(--ds-color-accent)", chartType: "area",
    chartData: pts(MONTHS, np(REV_YEAR)),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, np(REV_WEEK)), "this-month": pts(MAY_DAYS, np(REV_MONTH)), "this-year": pts(MONTHS, np(REV_YEAR)) },
    yAxisFormatter: valFmt,
  },
  {
    id: "margin", label: "Margin %",
    tooltip: "Net Profit as a % of Revenue — higher means a more capital-efficient SaaS.",
    value: "34.0%", rawValue: 34, change: 2.4, changeLabel: "vs last year",
    color: "#8b5cf6", chartType: "line",
    chartData: pts(MONTHS, mgn(REV_YEAR)),
    chartDataByPeriod: { "this-week": pts(DAYS_SHORT, mgn(REV_WEEK)), "this-month": pts(MAY_DAYS, mgn(REV_MONTH)), "this-year": pts(MONTHS, mgn(REV_YEAR)) },
    yAxisFormatter: pctFmt,
  },
];

const WATERFALL_STEPS: PLWaterfallStep[] = [
  { metricId: "revenue",    label: "Revenue",     role: "add"      },
  { metricId: "cogs",       label: "COGS",        role: "subtract" },
  {                         label: "Gross Profit", role: "total"    },
  { rawValue: 518600,       label: "OpEx",        role: "subtract" },
  {                         label: "Net Profit",   role: "total"    },
];

// ── Acquisition channels ──────────────────────────────────────────────────────

const ACQ_CHANNELS: AcquisitionChannel[] = [
  { key: "direct",      label: "Direct / Organic", newSubs: 312, color: "#2563EB" },
  { key: "marketplace", label: "App Marketplace",  newSubs: 198, color: "#0891B2" },
  { key: "affiliate",   label: "Affiliate",        newSubs: 147, color: "#D97706" },
  { key: "partner",     label: "Partner Network",  newSubs: 89,  color: "#7C3AED" },
];

const ACQ_PLANS: AcquisitionPlanRow[] = [
  { name: "Enterprise", direct: 48,  marketplace: 22,  affiliate: 14, partner: 31 },
  { name: "Pro",        direct: 142, marketplace: 98,  affiliate: 72, partner: 38 },
  { name: "Starter",    direct: 122, marketplace: 78,  affiliate: 61, partner: 20 },
];

// ── Heatmap ────────────────────────────────────────────────────────────────────

function buildHeatmap(): HeatmapPoint[] {
  const days  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const slots = ["08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h"];
  const slotMult = [0.18, 0.44, 0.67, 0.86, 0.62, 0.38, 0.72, 0.92, 0.78, 0.55, 0.26, 0.10];
  const dayMult  = [0.82, 0.92, 0.88, 1.00, 1.12, 0.54, 0.24];
  const tools    = [
    "AI Copywriter","Analytics Pro","Invoice Manager","Analytics Pro",
    "AI Copywriter","Team Scheduler","Invoice Manager","Analytics Pro",
    "AI Copywriter","Support Desk","AI Copywriter","Team Scheduler",
  ];
  return days.flatMap((day, di) =>
    slots.map((slot, si) => {
      const value = Math.round((dayMult[di] ?? 1) * (slotMult[si] ?? 0.5) * 5840);
      return { day, slot, value, clients: Math.max(1, Math.round(value / 18)), topProduct: tools[si] };
    }),
  );
}

const HEATMAP_DATA: HeatmapPoint[] = buildHeatmap();

// ── Subscription orders ───────────────────────────────────────────────────────

const ORDERS: SubscriptionOrder[] = [
  { id: "1",  orderNo: "SUB-2025-0087", date: "2025-05-17", company: "Acme Corp",        plan: "enterprise", seats: 42,  mrr: 499,  status: "active"   },
  { id: "2",  orderNo: "SUB-2025-0086", date: "2025-05-17", company: "Bright Media",     plan: "pro",        seats: 8,   mrr: 99,   status: "upgraded"  },
  { id: "3",  orderNo: "SUB-2025-0085", date: "2025-05-16", company: "NexaFlow",         plan: "trial",      seats: 5,   mrr: 0,    status: "trial"     },
  { id: "4",  orderNo: "SUB-2025-0084", date: "2025-05-16", company: "TechVault Ltd",    plan: "pro",        seats: 12,  mrr: 99,   status: "renewal"   },
  { id: "5",  orderNo: "SUB-2025-0083", date: "2025-05-15", company: "DevStream Inc",    plan: "starter",    seats: 3,   mrr: 29,   status: "active"    },
  { id: "6",  orderNo: "SUB-2025-0082", date: "2025-05-15", company: "CloudPeak",        plan: "enterprise", seats: 68,  mrr: 499,  status: "active"    },
  { id: "7",  orderNo: "SUB-2025-0081", date: "2025-05-14", company: "Pixel Studio",     plan: "pro",        seats: 6,   mrr: 99,   status: "trial"     },
  { id: "8",  orderNo: "SUB-2025-0080", date: "2025-05-14", company: "RedSpark Agency",  plan: "starter",    seats: 4,   mrr: 29,   status: "churned"   },
  { id: "9",  orderNo: "SUB-2025-0079", date: "2025-05-13", company: "Orbit Analytics",  plan: "pro",        seats: 15,  mrr: 99,   status: "renewal"   },
  { id: "10", orderNo: "SUB-2025-0078", date: "2025-05-13", company: "SynthoLabs",       plan: "starter",    seats: 2,   mrr: 29,   status: "active"    },
  { id: "11", orderNo: "SUB-2025-0077", date: "2025-05-12", company: "Apex Systems",     plan: "enterprise", seats: 120, mrr: 499,  status: "upgraded"  },
  { id: "12", orderNo: "SUB-2025-0076", date: "2025-05-12", company: "Veridian Co",      plan: "pro",        seats: 9,   mrr: 99,   status: "active"    },
  { id: "13", orderNo: "SUB-2025-0075", date: "2025-05-11", company: "ClearPath SaaS",   plan: "trial",      seats: 23,  mrr: 0,    status: "trial"     },
  { id: "14", orderNo: "SUB-2025-0074", date: "2025-05-11", company: "Acme Corp",        plan: "enterprise", seats: 42,  mrr: 499,  status: "renewal"   },
  { id: "15", orderNo: "SUB-2025-0073", date: "2025-05-10", company: "Monolith Digital", plan: "starter",    seats: 1,   mrr: 29,   status: "churned"   },
  { id: "16", orderNo: "SUB-2025-0072", date: "2025-05-10", company: "Nimbus Works",     plan: "pro",        seats: 7,   mrr: 99,   status: "active"    },
  { id: "17", orderNo: "SUB-2025-0071", date: "2025-05-09", company: "Quasar Tech",      plan: "pro",        seats: 11,  mrr: 99,   status: "renewal"   },
  { id: "18", orderNo: "SUB-2025-0070", date: "2025-05-09", company: "BlueSky Labs",     plan: "enterprise", seats: 55,  mrr: 499,  status: "active"    },
  { id: "19", orderNo: "SUB-2025-0069", date: "2025-05-08", company: "TechVault Ltd",    plan: "pro",        seats: 12,  mrr: 99,   status: "active"    },
  { id: "20", orderNo: "SUB-2025-0068", date: "2025-05-08", company: "Pixel Studio",     plan: "pro",        seats: 6,   mrr: 99,   status: "upgraded"  },
];

const PLAN_COLORS: Record<SubscriptionOrder["plan"], string> = {
  enterprise: "#7C3AED", pro: "#2563EB", starter: "#0891B2", trial: "#64748B",
};

const STATUS_LABEL: Record<SubscriptionOrder["status"], string> = {
  active: "Active", trial: "Trial", renewal: "Renewal", upgraded: "Upgraded", churned: "Churned",
};
const STATUS_CLS: Record<SubscriptionOrder["status"], string> = {
  active:   "bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-400",
  trial:    "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
  renewal:  "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
  upgraded: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  churned:  "bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400",
};

// ── Columns ───────────────────────────────────────────────────────────────────

const COLUMNS: DataTableColumn<SubscriptionOrder>[] = [
  {
    id: "orderNo", label: "Order",
    renderCell: ({ row }) => <span className="font-mono text-xs font-semibold text-ds-1">{row.orderNo}</span>,
  },
  {
    id: "date", label: "Date",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{row.date}</span>,
  },
  {
    id: "company", label: "Company",
    renderCell: ({ row }) => <span className="text-sm font-medium text-ds-1">{row.company}</span>,
  },
  {
    id: "plan", label: "Plan",
    renderCell: ({ row }) => (
      <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase" style={{ color: PLAN_COLORS[row.plan], backgroundColor: `${PLAN_COLORS[row.plan]}18` }}>
        {row.plan}
      </span>
    ),
  },
  {
    id: "seats", label: "Seats",
    renderCell: ({ row }) => <span className="text-sm text-ds-3">{row.seats}</span>,
  },
  {
    id: "mrr", label: "MRR",
    renderCell: ({ row }) => (
      <span className="text-sm font-bold text-ds-1">{row.mrr > 0 ? `$${row.mrr}/mo` : "–"}</span>
    ),
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

const ROW_ACTIONS: DataTableRowAction<SubscriptionOrder>[] = [
  { id: "view",    label: "View account"       },
  { id: "invoice", label: "Download invoice"   },
  { id: "cancel",  label: "Cancel", variant: "destructive" },
];

// ── Derived KPIs ──────────────────────────────────────────────────────────────

const activeOrders  = ORDERS.filter((o) => o.status !== "churned" && o.status !== "trial");
const newMrr        = activeOrders.filter((o) => o.status === "active" || o.status === "upgraded").reduce((s, o) => s + o.mrr, 0);
const upgrades      = ORDERS.filter((o) => o.status === "upgraded").length;
const churns        = ORDERS.filter((o) => o.status === "churned").length;

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ERPSalesPage() {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="text-2xl font-bold text-ds-1">Sales & Subscriptions</h1>
        <p className="mt-1 text-sm text-ds-3">Revenue, acquisition &amp; subscription performance</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard size="sm" title="New MRR"     value={`$${Math.round(newMrr / 1_000)}K`}  dateRange="shown orders"    badge={{ value: "+14.9%", direction: "up"   }} />
        <StatCard size="sm" title="Signups"     value={String(activeOrders.length)}          dateRange="excl. churns"    badge={{ value: "+12.1%", direction: "up"   }} />
        <StatCard size="sm" title="Upgrades"    value={String(upgrades)}                     dateRange="plan expansions" badge={{ value: "+5.4%",  direction: "up"   }} />
        <StatCard size="sm" title="Churns"      value={String(churns)}                       dateRange="of shown orders" badge={{ value: "-0.8%",  direction: "up"   }} />
      </div>

      {/* P&L + Acquisition channels */}
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
        <AcquisitionChannelCard
          title="Acquisition Channels"
          channels={ACQ_CHANNELS}
          plans={ACQ_PLANS}
        />
      </div>

      {/* Activity heatmap */}
      <SalesHeatmapCard
        title="User Activity by Day & Hour"
        subtitle="Active sessions heatmap — current week"
        data={HEATMAP_DATA}
        metricLabel="Sessions"
      />

      {/* Subscriptions table */}
      <DataTable<SubscriptionOrder>
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
