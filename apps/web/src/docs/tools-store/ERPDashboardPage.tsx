import {
  StatCard,
  MiniNeonSparkline,
  TopPlansCard,
  TopToolsCard,
  AIInsightsCard,
  SalesHeatmapCard,
  FinancialPLCard,
  ExpensesCard,
} from "erp-pro-ui";
import type {
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
  v >= 1_000_000 ? `$${(v/1_000_000).toFixed(2)}M` : v >= 1_000 ? `$${Math.round(v/1_000)}k` : `$${v}`;
const pctFmt = (v: number) => `${v}%`;

// ── KPI sparklines ─────────────────────────────────────────────────────────────

const mrrWeek = [
  { label: "Mon", value: 195200 },
  { label: "Tue", value: 196100 },
  { label: "Wed", value: 196800 },
  { label: "Thu", value: 197400 },
  { label: "Fri", value: 198400 },
  { label: "Sat", value: 198400 },
  { label: "Sun", value: 198400 },
];
const trialsWeek = [
  { label: "Mon", value: 11 },
  { label: "Tue", value: 14 },
  { label: "Wed", value: 9  },
  { label: "Thu", value: 18 },
  { label: "Fri", value: 16 },
  { label: "Sat", value: 8  },
  { label: "Sun", value: 5  },
];
const seatsWeek = [
  { label: "Mon", value: 13820 },
  { label: "Tue", value: 13856 },
  { label: "Wed", value: 13891 },
  { label: "Thu", value: 13905 },
  { label: "Fri", value: 13933 },
  { label: "Sat", value: 13933 },
  { label: "Sun", value: 13933 },
];
const churnsWeek = [
  { label: "Mon", value: 3 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 0 },
  { label: "Fri", value: 1 },
  { label: "Sat", value: 0 },
  { label: "Sun", value: 0 },
];

// ── P&L metrics ────────────────────────────────────────────────────────────────

const plMetrics: PLMetricTab[] = [
  {
    id: "revenue", label: "Revenue", value: "$2.47M", rawValue: 2470000,
    change: 17.6, changeLabel: "vs last year", color: "#22c55e", chartType: "area",
    chartData: pts(MONTHS, REV_YEAR),
    comparisonChartData: pts(MONTHS, prev(REV_YEAR)),
    comparisonLabel: "Prev. year",
    yAxisFormatter: valFmt,
  },
  {
    id: "cogs", label: "COGS", value: "$1.11M", rawValue: 1111500,
    change: 2.1, changeLabel: "vs last year", color: "#f97316", chartType: "bar",
    chartData: pts(MONTHS, cogs(REV_YEAR)),
    yAxisFormatter: valFmt,
  },
  {
    id: "gross-profit", label: "Gross Profit", value: "$1.36M", rawValue: 1358500,
    change: 5.8, changeLabel: "vs last year", color: "#3b82f6", chartType: "area",
    chartData: pts(MONTHS, gp(REV_YEAR)),
    yAxisFormatter: valFmt,
  },
  {
    id: "net-profit", label: "Net Profit", value: "$840K", rawValue: 839900,
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
  { metricId: "revenue",      label: "Revenue",     role: "add"      },
  { metricId: "cogs",         label: "COGS",        role: "subtract" },
  {                           label: "Gross Profit", role: "total"    },
  { rawValue: 518600,         label: "OpEx",        role: "subtract" },
  {                           label: "Net Profit",   role: "total"    },
];

// ── User activity heatmap ──────────────────────────────────────────────────────

const ACTIVITY_BASE: Record<string, number[]> = {
  Mon: [120, 480, 860,  940,  620, 540, 710,  980,  870,  640, 320, 140],
  Tue: [90,  440, 790,  880,  590, 510, 680,  910,  820,  600, 290, 110],
  Wed: [110, 460, 830,  910,  640, 580, 740,  1020, 940,  680, 340, 160],
  Thu: [130, 500, 880,  970,  670, 610, 780,  1080, 1010, 720, 370, 180],
  Fri: [150, 560, 1020, 1180, 780, 710, 890,  1240, 1190, 880, 480, 220],
  Sat: [80,  620, 940,  880,  760, 680, 590,  520,  440,  310, 180, 60 ],
  Sun: [40,  160, 240,  280,  220, 190, 170,  150,  120,  90,  50,  20 ],
};

const SLOT_TOOL: Record<string, string> = {
  "08h": "AI Copywriter",    "09h": "Analytics Pro",
  "10h": "Invoice Manager",  "11h": "Analytics Pro",
  "12h": "AI Copywriter",    "13h": "Team Scheduler",
  "14h": "Invoice Manager",  "15h": "Analytics Pro",
  "16h": "AI Copywriter",    "17h": "Support Desk",
  "18h": "AI Copywriter",    "19h": "Team Scheduler",
};

const heatmapData: HeatmapPoint[] = DAYS.flatMap((day) =>
  SLOTS.map((slot, i) => {
    const value = ACTIVITY_BASE[day]![i] ?? 0;
    return {
      day, slot, value,
      clients: value > 0 ? Math.max(1, Math.round(value / 18)) : 0,
      topProduct: value > 0 ? SLOT_TOOL[slot] : undefined,
    };
  }),
);

// ── Expenses ───────────────────────────────────────────────────────────────────

const expenses: ExpenseItem[] = [
  { label: "Payroll",        percentage: 42, color: "#7367F0" },
  { label: "Infrastructure", percentage: 22, color: "#00CFE8" },
  { label: "Marketing",      percentage: 16, color: "#28C76F" },
  { label: "R&D",            percentage: 12, color: "#FF9F43" },
  { label: "Support & CS",   percentage:  5, color: "#EA5455" },
  { label: "Admin & Legal",  percentage:  2, color: "#82868B" },
  { label: "Other",          percentage:  1, color: "#BABFC7" },
];

const topExpenses: TopExpenseItem[] = [
  { label: "Payroll",        value: "$112K",  color: "#7367F0" },
  { label: "Infrastructure", value: "$58.7K", color: "#00CFE8" },
  { label: "Marketing",      value: "$42.7K", color: "#28C76F" },
];

// ── Recent signups / activity ──────────────────────────────────────────────────

interface RecentSignup {
  id: string; company: string; plan: "enterprise" | "pro" | "starter" | "trial";
  mrr: number; status: "active" | "trial" | "renewal" | "upgrade" | "churn";
  date: string;
}

const recentSignups: RecentSignup[] = [
  { id: "#ACC-2841", company: "Acme Corp",       plan: "enterprise", mrr: 499, status: "active",  date: "Today 14:32" },
  { id: "#ACC-2840", company: "Bright Media",    plan: "pro",        mrr: 99,  status: "upgrade", date: "Today 11:18" },
  { id: "#ACC-2839", company: "NexaFlow",        plan: "trial",      mrr: 0,   status: "trial",   date: "Today 09:05" },
  { id: "#ACC-2838", company: "TechVault Ltd",   plan: "pro",        mrr: 99,  status: "renewal", date: "Yesterday"   },
  { id: "#ACC-2837", company: "RedSpark Agency", plan: "starter",    mrr: 29,  status: "churn",   date: "Yesterday"   },
];

const SIGNUP_STATUS_STYLES: Record<RecentSignup["status"], string> = {
  active:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  trial:   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  upgrade: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  renewal: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  churn:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const PLAN_COLORS: Record<RecentSignup["plan"], string> = {
  enterprise: "#7C3AED", pro: "#2563EB", starter: "#0891B2", trial: "#64748B",
};

// ── Trial expiry alerts ────────────────────────────────────────────────────────

interface TrialAlert { company: string; daysLeft: number; seats: number; }

const trialAlerts: TrialAlert[] = [
  { company: "NexaFlow",       daysLeft: 1, seats: 12 },
  { company: "DevStream Inc",  daysLeft: 2, seats: 5  },
  { company: "Pixel Studio",   daysLeft: 3, seats: 8  },
  { company: "ClearPath SaaS", daysLeft: 5, seats: 23 },
];

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function ERPDashboardPage() {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="text-2xl font-bold text-ds-1">Dashboard</h1>
        <p className="mt-1 text-sm text-ds-3">SaaS Tools Store — Full business overview</p>
      </div>

      {/* ── KPI strip ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="MRR"
          value="$198.4K"
          dateRange="vs last month $194.2K"
          badge={{ value: "+2.1%", direction: "up" }}
          chart={<MiniNeonSparkline data={mrrWeek} tone="default" />}
        />
        <StatCard
          title="New Trials"
          value="81"
          dateRange="this week · 284 total active"
          badge={{ value: "+12.4%", direction: "up" }}
          chart={<MiniNeonSparkline data={trialsWeek} tone="default" />}
        />
        <StatCard
          title="Active Seats"
          value="13,933"
          dateRange="of 15,951 total (87.4%)"
          badge={{ value: "+0.9%", direction: "up" }}
          chart={<MiniNeonSparkline data={seatsWeek} tone="default" />}
        />
        <StatCard
          title="Churns This Week"
          value="7"
          dateRange="vs 12 last week"
          badge={{ value: "−41.7%", direction: "down" }}
          chart={<MiniNeonSparkline data={churnsWeek} tone="default" />}
        />
      </div>

      {/* ── P&L + Activity heatmap ─────────────────────────────────────────── */}
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
          title="User Activity"
          subtitle="Active sessions by day & hour"
          data={heatmapData}
          metricLabel="Sessions"
        />
      </div>

      {/* ── Top plans + Recent activity + Trial alerts ─────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TopPlansCard
          title="Top Subscription Plans"
          subtitle="This month"
        />

        {/* Recent signups / renewals */}
        <div className="rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5">
          <p className="text-base font-bold text-ds-1">Recent Activity</p>
          <p className="mt-0.5 text-xs text-ds-3">Latest signups, upgrades &amp; renewals</p>
          <div className="mt-4 space-y-2">
            {recentSignups.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-md border border-ds-border-3/60 px-3 py-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: PLAN_COLORS[s.plan] }}>
                      {s.plan}
                    </span>
                    <span className="text-xs font-semibold text-ds-1">{s.id}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ds-3">{s.company} · {s.date}</p>
                </div>
                <div className="ml-3 flex flex-col items-end gap-1 shrink-0">
                  <span className="text-sm font-bold text-ds-1">{s.mrr > 0 ? `$${s.mrr}/mo` : "–"}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${SIGNUP_STATUS_STYLES[s.status]}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trial expiry alerts */}
        <div className="rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-bold text-ds-1">Trial Expiry Alerts</p>
              <p className="mt-0.5 text-xs text-ds-3">Trials expiring within 5 days</p>
            </div>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              {trialAlerts.length} accounts
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {trialAlerts.map((item) => (
              <div key={item.company}>
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-ds-1">{item.company}</p>
                    <p className="text-[10px] text-ds-3">{item.seats} seats · trial period</p>
                  </div>
                  <span className={`ml-2 shrink-0 text-sm font-bold ${item.daysLeft <= 1 ? "text-red-500" : item.daysLeft <= 3 ? "text-amber-500" : "text-yellow-500"}`}>
                    {item.daysLeft}d left
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ds-border-3/40">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.round((item.daysLeft / 14) * 100)}%`,
                      backgroundColor: item.daysLeft <= 1 ? "#ef4444" : item.daysLeft <= 3 ? "#f97316" : "#eab308",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Top tools + AI insights ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <TopToolsCard />
        </div>
        <div className="lg:col-span-3">
          <AIInsightsCard />
        </div>
      </div>

      {/* ── Expenses breakdown ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ExpensesCard
          title="Operating Expenses"
          totalExpense="$267.5K"
          expenses={expenses}
          topExpenses={topExpenses}
        />
        <div className="rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5">
          <p className="text-base font-bold text-ds-1">Money Flow Summary</p>
          <p className="mt-0.5 text-xs text-ds-3">This year · all amounts in USD</p>
          <div className="mt-5 space-y-3">
            {[
              { label: "Gross Revenue",       value: 2470000, color: "#22c55e", sign: "+" },
              { label: "Tax (21%)",            value: 518700,  color: "#ef4444", sign: "−" },
              { label: "Revenue After Tax",    value: 1951300, color: "#3b82f6", sign: "=" },
              { label: "Cost of Revenue",      value: 1111500, color: "#ef4444", sign: "−" },
              { label: "Gross Profit",         value: 839800,  color: "#3b82f6", sign: "=" },
              { label: "Operating Expenses",   value: 267500,  color: "#ef4444", sign: "−" },
              { label: "Net Profit",           value: 572300,  color: "#22c55e", sign: "=" },
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
