import {
  StatCard,
  MiniNeonSparkline,
  TopSellingItemsCard,
  SalesHeatmapCard,
  FinancialPLCard,
  ExpensesCard,
} from "erp-pro-ui";
import type {
  TopSellingItem,
  HeatmapPoint,
  PLMetricTab,
  PLDataPoint,
  PLWaterfallStep,
  ExpenseItem,
  TopExpenseItem,
} from "erp-pro-ui";

// ── Shared data ───────────────────────────────────────────────────────────────

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const SLOTS  = ["08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h"];

function pts(names: string[], values: number[]): PLDataPoint[] {
  return names.map((name, i) => ({ name, value: values[i] ?? 0 }));
}
const REV_YEAR  = [157300,178500,193800,165800,204000,182800,221000,199800,233800,246500,225300,263500];
const cogs = (a: number[]) => a.map((v) => Math.round(v * 0.45));
const gp   = (a: number[]) => a.map((v) => Math.round(v * 0.55));
const np   = (a: number[]) => a.map((v) => Math.round(v * 0.34));
const mgn  = (a: number[]) => a.map((v, i) => Math.round(30 + (v / Math.max(...a)) * 10 + (i % 3)));
const prev = (a: number[]) => a.map((v) => Math.round(v * 0.83));
const valFmt = (v: number) =>
  v >= 1_000_000 ? `€${(v/1_000_000).toFixed(2)}M` : v >= 1_000 ? `€${Math.round(v/1_000)}k` : `€${v}`;
const pctFmt = (v: number) => `${v}%`;

// ── KPI sparklines ─────────────────────────────────────────────────────────────

const revenueWeek = [
  { label: "Mon", value: 3820 },
  { label: "Tue", value: 4210 },
  { label: "Wed", value: 3980 },
  { label: "Thu", value: 4540 },
  { label: "Fri", value: 5120 },
  { label: "Sat", value: 3640 },
  { label: "Sun", value: 820  },
];
const ordersWeek = [
  { label: "Mon", value: 18 },
  { label: "Tue", value: 22 },
  { label: "Wed", value: 19 },
  { label: "Thu", value: 25 },
  { label: "Fri", value: 28 },
  { label: "Sat", value: 14 },
  { label: "Sun", value: 4  },
];
const inventoryWeek = [
  { label: "Mon", value: 144000 },
  { label: "Tue", value: 141800 },
  { label: "Wed", value: 139400 },
  { label: "Thu", value: 142100 },
  { label: "Fri", value: 138900 },
  { label: "Sat", value: 143200 },
  { label: "Sun", value: 142300 },
];
const arWeek = [
  { label: "Mon", value: 31200 },
  { label: "Tue", value: 29800 },
  { label: "Wed", value: 27400 },
  { label: "Thu", value: 28900 },
  { label: "Fri", value: 28500 },
  { label: "Sat", value: 28500 },
  { label: "Sun", value: 28500 },
];

// ── P&L metrics ────────────────────────────────────────────────────────────────

const plMetrics: PLMetricTab[] = [
  {
    id: "revenue", label: "Revenue", value: "€2.47M", rawValue: 2470000,
    change: 17.6, changeLabel: "vs last year", color: "#22c55e", chartType: "area",
    chartData: pts(MONTHS, REV_YEAR),
    comparisonChartData: pts(MONTHS, prev(REV_YEAR)),
    comparisonLabel: "Prev. year",
    yAxisFormatter: valFmt,
  },
  {
    id: "cogs", label: "COGS", value: "€1.11M", rawValue: 1111500,
    change: 2.1, changeLabel: "vs last year", color: "#f97316", chartType: "bar",
    chartData: pts(MONTHS, cogs(REV_YEAR)),
    yAxisFormatter: valFmt,
  },
  {
    id: "gross-profit", label: "Gross Profit", value: "€1.36M", rawValue: 1358500,
    change: 5.8, changeLabel: "vs last year", color: "#3b82f6", chartType: "area",
    chartData: pts(MONTHS, gp(REV_YEAR)),
    yAxisFormatter: valFmt,
  },
  {
    id: "net-profit", label: "Net Profit", value: "€840K", rawValue: 839900,
    change: 12.3, changeLabel: "vs last year", color: "var(--ds-color-accent)", chartType: "area",
    chartData: pts(MONTHS, np(REV_YEAR)),
    yAxisFormatter: valFmt,
  },
  {
    id: "margin", label: "Margin %", value: "34.0%", rawValue: 34,
    change: 2.4, changeLabel: "vs last year", color: "#8b5cf6", chartType: "line",
    chartData: pts(MONTHS, mgn(REV_YEAR)),
    yAxisFormatter: pctFmt,
  },
];

const waterfallSteps: PLWaterfallStep[] = [
  { metricId: "revenue",      label: "Revenue",      role: "add"      },
  { metricId: "cogs",         label: "COGS",         role: "subtract" },
  {                           label: "Gross Profit",  role: "total"    },
  { rawValue: 518600,         label: "OpEx",         role: "subtract" },
  {                           label: "Net Profit",    role: "total"    },
];

// ── Sales heatmap ──────────────────────────────────────────────────────────────

const RAW_HEATMAP: Record<string, number[]> = {
  Mon: [120, 480, 860,  940,  620, 540, 710,  980,  870,  640, 320, 140],
  Tue: [90,  440, 790,  880,  590, 510, 680,  910,  820,  600, 290, 110],
  Wed: [110, 460, 830,  910,  640, 580, 740,  1020, 940,  680, 340, 160],
  Thu: [130, 500, 880,  970,  670, 610, 780,  1080, 1010, 720, 370, 180],
  Fri: [150, 560, 1020, 1180, 780, 710, 890,  1240, 1190, 880, 480, 220],
  Sat: [80,  620, 940,  880,  760, 680, 590,  520,  440,  310, 180, 60],
  Sun: [40,  160, 240,  280,  220, 190, 170,  150,  120,  90,  50,  20],
};

const SLOT_TOP: Record<string, string> = {
  "08h": "Measuring Tape 5m",   "09h": "Stanley Hammer 16oz",
  "10h": "Bosch Drill GSB 18V", "11h": "Bosch Drill GSB 18V",
  "12h": "Knipex Pliers 200mm", "13h": "Knipex Pliers 200mm",
  "14h": "DeWalt Saw Blade Set", "15h": "Bosch Drill GSB 18V",
  "16h": "Bosch Drill GSB 18V", "17h": "Makita Grinder 115mm",
  "18h": "Stanley Hammer 16oz", "19h": "Measuring Tape 5m",
};

const heatmapData: HeatmapPoint[] = DAYS.flatMap((day) =>
  SLOTS.map((slot, i) => {
    const value = RAW_HEATMAP[day]![i] ?? 0;
    return {
      day, slot, value,
      clients: value > 0 ? Math.max(1, Math.round(value / 148)) : 0,
      topProduct: value > 0 ? SLOT_TOP[slot] : undefined,
    };
  }),
);

// ── Top selling items ──────────────────────────────────────────────────────────

const topItems: TopSellingItem[] = [
  { id: 1, name: "Bosch Drill GSB 18V", category: "Power Tools", qty: 184, revenue: 16561, qtyTrend: 12, revenueTrend: 15 },
  { id: 2, name: "Stanley Hammer 16oz", category: "Hand Tools",  qty: 312, revenue: 7787,  qtyTrend: -3, revenueTrend: -2 },
  { id: 3, name: "DeWalt Saw Blade Set", category: "Accessories", qty: 97,  revenue: 5819,  qtyTrend: 28, revenueTrend: 31 },
  { id: 4, name: "Makita Grinder 115mm", category: "Power Tools", qty: 68,  revenue: 9384,  qtyTrend: 8,  revenueTrend: 9  },
  { id: 5, name: "Knipex Pliers 200mm", category: "Hand Tools",  qty: 145, revenue: 5074,  qtyTrend: 5,  revenueTrend: 6  },
];

// ── Expenses ───────────────────────────────────────────────────────────────────

const expenses: ExpenseItem[] = [
  { label: "Employees",       percentage: 36, color: "#7367F0" },
  { label: "Supplier orders", percentage: 28, color: "#00CFE8" },
  { label: "Rent",            percentage: 18, color: "#28C76F" },
  { label: "Tax (biz)",       percentage: 12, color: "#FF9F43" },
  { label: "Electricity",     percentage:  3, color: "#EA5455" },
  { label: "Phone & IT",      percentage:  2, color: "#82868B" },
  { label: "Other",           percentage:  1, color: "#BABFC7" },
];

const topExpenses: TopExpenseItem[] = [
  { label: "Employees",       value: "€96,000", color: "#7367F0" },
  { label: "Supplier orders", value: "€74,000", color: "#00CFE8" },
  { label: "Rent",            value: "€48,000", color: "#28C76F" },
];

// ── Recent orders (inline mini-list) ──────────────────────────────────────────

interface RecentOrder {
  id: string; customer: string; type: "sale" | "purchase";
  amount: number; status: "pending" | "processing" | "shipped" | "delivered" | "partial";
  date: string;
}

const recentOrders: RecentOrder[] = [
  { id: "#SO-1042", customer: "Ahmed K.",     type: "sale",     amount: 218,  status: "pending",    date: "Today 14:32" },
  { id: "#SO-1041", customer: "Sara M.",      type: "sale",     amount: 89,   status: "shipped",    date: "Today 11:18" },
  { id: "#PO-0214", customer: "Bosch Supply", type: "purchase", amount: 2840, status: "partial",    date: "Today 09:05" },
  { id: "#SO-1040", customer: "Tools Co.",    type: "sale",     amount: 1240, status: "delivered",  date: "Yesterday"   },
  { id: "#PO-0213", customer: "Stanley Dist.",type: "purchase", amount: 1280, status: "processing", date: "Yesterday"   },
];

const STATUS_STYLES: Record<RecentOrder["status"], string> = {
  pending:    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  shipped:    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  delivered:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  partial:    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

// ── Low stock alerts (inline mini-list) ───────────────────────────────────────

interface LowStockItem { name: string; sku: string; qty: number; min: number; }

const lowStock: LowStockItem[] = [
  { name: "Knipex Pliers 200mm", sku: "KN-2001", qty: 2, min: 5 },
  { name: "DeWalt Blade 185mm",  sku: "DW-B185", qty: 0, min: 5 },
  { name: "Bosch Bits Set 32pc", sku: "BS-3200", qty: 3, min: 5 },
  { name: "Stanley Tape 5m",     sku: "ST-T500", qty: 4, min: 5 },
];

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function ERPDashboardPage() {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="text-2xl font-bold text-ds-1">Dashboard</h1>
        <p className="mt-1 text-sm text-ds-3">Tools Store — Full business overview</p>
      </div>

      {/* ── KPI strip ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Revenue Today"
          value="€4,820"
          dateRange="vs yesterday €4,290"
          badge={{ value: "+12.4%", direction: "up" }}
          chart={<MiniNeonSparkline data={revenueWeek} tone="default" />}
        />
        <StatCard
          title="Active Orders"
          value="23"
          dateRange="purchase + sales combined"
          badge={{ value: "+3 new", direction: "up" }}
          chart={<MiniNeonSparkline data={ordersWeek} tone="default" />}
        />
        <StatCard
          title="Inventory Value"
          value="€142.3K"
          dateRange="at cost price"
          badge={{ value: "−1.8%", direction: "down" }}
          chart={<MiniNeonSparkline data={inventoryWeek} tone="default" />}
        />
        <StatCard
          title="Customers Owe Me"
          value="€28.5K"
          dateRange="accounts receivable"
          badge={{ value: "−8.2%", direction: "down" }}
          chart={<MiniNeonSparkline data={arWeek} tone="default" />}
        />
      </div>

      {/* ── P&L + Heatmap ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <FinancialPLCard
            title="P&L Report"
            subtitle="Full Financial Overview"
            metrics={plMetrics}
            defaultMetricId="revenue"
            waterfallSteps={waterfallSteps}
            showPeriodFilter
            defaultPeriodFilter="this-year"
            showComparison
          />
        </div>
        <SalesHeatmapCard
          title="Best Sales Times"
          subtitle="Revenue intensity by day & hour"
          data={heatmapData}
          metricLabel="Revenue"
        />
      </div>

      {/* ── Top items + Recent orders + Low stock ─────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Top selling items */}
        <TopSellingItemsCard
          title="Top Selling Items"
          subtitle="This year"
          items={topItems}
          showTrend
          maxItems={5}
        />

        {/* Recent orders */}
        <div className="rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5">
          <p className="text-base font-bold text-ds-1">Recent Orders</p>
          <p className="mt-0.5 text-xs text-ds-3">Latest purchase &amp; sales orders</p>
          <div className="mt-4 space-y-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-md border border-ds-border-3/60 px-3 py-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: order.type === "sale" ? "#22c55e" : "#f97316" }}>
                      {order.type === "sale" ? "SALE" : "BUY"}
                    </span>
                    <span className="text-xs font-semibold text-ds-1">{order.id}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ds-3">{order.customer} · {order.date}</p>
                </div>
                <div className="ml-3 flex flex-col items-end gap-1 shrink-0">
                  <span className="text-sm font-bold text-ds-1">€{order.amount.toLocaleString()}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock alerts */}
        <div className="rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-bold text-ds-1">Low Stock Alerts</p>
              <p className="mt-0.5 text-xs text-ds-3">Items below minimum threshold (5 units)</p>
            </div>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {lowStock.length} items
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {lowStock.map((item) => (
              <div key={item.sku}>
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-ds-1">{item.name}</p>
                    <p className="text-[10px] text-ds-3">{item.sku}</p>
                  </div>
                  <span className={`ml-2 shrink-0 text-sm font-bold ${item.qty === 0 ? "text-red-500" : "text-amber-500"}`}>
                    {item.qty === 0 ? "OUT" : `${item.qty} left`}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ds-border-3/40">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.round((item.qty / item.min) * 100)}%`,
                      backgroundColor: item.qty === 0 ? "#ef4444" : item.qty <= 2 ? "#f97316" : "#eab308",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Expenses breakdown ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ExpensesCard
          title="Operating Expenses"
          totalExpense="€270.2K"
          expenses={expenses}
          topExpenses={topExpenses}
        />
        <div className="rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5">
          <p className="text-base font-bold text-ds-1">Money Flow Summary</p>
          <p className="mt-0.5 text-xs text-ds-3">This year · all amounts in EUR</p>
          <div className="mt-5 space-y-3">
            {[
              { label: "Gross Revenue",        value: 2470000, color: "#22c55e", sign: "+"  },
              { label: "Tax (21%)",             value: 518700,  color: "#ef4444", sign: "−"  },
              { label: "Revenue After Tax",     value: 1951300, color: "#3b82f6", sign: "="  },
              { label: "Cost of Goods (COGS)",  value: 1111500, color: "#ef4444", sign: "−"  },
              { label: "Gross Profit",          value: 839800,  color: "#3b82f6", sign: "="  },
              { label: "Operating Expenses",    value: 270200,  color: "#ef4444", sign: "−"  },
              { label: "Net Profit",            value: 569600,  color: "#22c55e", sign: "="  },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-ds-border-3/40 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="w-4 text-center text-sm font-bold" style={{ color: row.color }}>{row.sign}</span>
                  <span className="text-sm text-ds-2">{row.label}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: row.color }}>
                  {valFmt(row.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
