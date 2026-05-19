import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { PackageIcon } from "../../icons/PackageIcon";
import { ShoppingCartIcon } from "../../icons/ShoppingCartIcon";
import { ActivityIcon } from "../../icons/ActivityIcon";
import { EarningsCard } from "./EarningsCard";
import { EarningReportsTabsCard } from "./EarningReportsTabsCard";
import { FinancialPLCard } from "./FinancialPLCard";
import { RevenueGrowthCard } from "./RevenueGrowthCard";
import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { ExpensesCard } from "./ExpensesCard";
import { IncomeExpenseCard } from "./IncomeExpenseCard";

import type { EarningsMetric, WeeklyBarPoint } from "./EarningsCard";
import type { RevenueGrowthBarPoint } from "./RevenueGrowthCard";
import type { EarningTab } from "./EarningReportsTabsCard";
import type { PLDataPoint, PLMetricTab, PLWaterfallStep } from "./FinancialPLCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / Dashboard / Gallery",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ── EarningsCard ───────────────────────────────────────────────────────────────

const WEEKLY_BARS: WeeklyBarPoint[] = [
  { day: "M", value: 52 },
  { day: "T", value: 68 },
  { day: "W", value: 61 },
  { day: "T", value: 79 },
  { day: "F", value: 87, highlighted: true },
  { day: "S", value: 44 },
  { day: "S", value: 31 },
];

const EARNINGS_METRICS: EarningsMetric[] = [
  { icon: <ActivityIcon width={16} height={16} />,      color: "#22c55e", label: "Net Profit", value: "€18.4k", progress: 74 },
  { icon: <ShoppingCartIcon width={16} height={16} />,  color: "#f97316", label: "Orders",    value: "1,284",  progress: 61 },
  { icon: <PackageIcon width={16} height={16} />,       color: "#6366f1", label: "Returns",   value: "28",     progress: 12 },
];

// ── RevenueGrowthCard ──────────────────────────────────────────────────────────

const GROWTH_BARS: RevenueGrowthBarPoint[] = [
  { day: "M", value: 45 },
  { day: "T", value: 61 },
  { day: "W", value: 54 },
  { day: "T", value: 70 },
  { day: "F", value: 78, highlighted: true },
  { day: "S", value: 49 },
  { day: "S", value: 36 },
];

// ── EarningReportsTabsCard ─────────────────────────────────────────────────────

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTHLY_REV = [157300, 178500, 193800, 165800, 204000, 182800, 221000, 199800, 233800, 246500, 225300, 263500];

const EARNING_TABS: EarningTab[] = [
  {
    id:        "revenue",
    icon:      "💰",
    label:     "Revenue",
    chartData: MONTHS.map((name, i) => ({ name, value: MONTHLY_REV[i] ?? 0, highlighted: i === 4 })),
  },
  {
    id:        "cogs",
    icon:      "📦",
    label:     "COGS",
    chartData: MONTHS.map((name, i) => ({ name, value: Math.round((MONTHLY_REV[i] ?? 0) * 0.45), highlighted: i === 4 })),
  },
  {
    id:        "profit",
    icon:      "📈",
    label:     "Net Profit",
    chartData: MONTHS.map((name, i) => ({ name, value: Math.round((MONTHLY_REV[i] ?? 0) * 0.34), highlighted: i === 4 })),
  },
  {
    id:        "margin",
    icon:      "🎯",
    label:     "Margin %",
    chartData: MONTHS.map((name, i) => ({ name, value: Math.round(30 + ((MONTHLY_REV[i] ?? 0) / 263500) * 8), highlighted: i === 4 })),
  },
];

// ── FinancialPLCard ────────────────────────────────────────────────────────────

const DAYS_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const REV_WEEK   = [42100, 48300, 45180, 51060, 57090, 28400, 19270];

function pts(names: string[], values: number[]): PLDataPoint[] {
  return names.map((name, i) => ({ name, value: values[i] ?? 0 }));
}

const PL_METRICS: PLMetricTab[] = [
  {
    id:                "revenue",
    label:             "Revenue",
    value:             "€2.47M",
    rawValue:          2471800,
    chartData:         pts(DAYS_SHORT, REV_WEEK),
    chartDataByPeriod: { "this-year": pts(MONTHS, MONTHLY_REV) },
    color:             "#6366f1",
  },
  {
    id:                "cogs",
    label:             "COGS",
    value:             "€1.11M",
    rawValue:          1112310,
    chartData:         pts(DAYS_SHORT, REV_WEEK.map((v) => Math.round(v * 0.45))),
    chartDataByPeriod: { "this-year": pts(MONTHS, MONTHLY_REV.map((v) => Math.round(v * 0.45))) },
    color:             "#f97316",
  },
  {
    id:                "gross-profit",
    label:             "Gross Profit",
    value:             "€1.36M",
    rawValue:          1359490,
    chartData:         pts(DAYS_SHORT, REV_WEEK.map((v) => Math.round(v * 0.55))),
    chartDataByPeriod: { "this-year": pts(MONTHS, MONTHLY_REV.map((v) => Math.round(v * 0.55))) },
    color:             "#22c55e",
  },
  {
    id:                "net-profit",
    label:             "Net Profit",
    value:             "€839K",
    rawValue:          839000,
    chartData:         pts(DAYS_SHORT, REV_WEEK.map((v) => Math.round(v * 0.34))),
    chartDataByPeriod: { "this-year": pts(MONTHS, MONTHLY_REV.map((v) => Math.round(v * 0.34))) },
    color:             "#00CFE8",
  },
];

const PL_WATERFALL: PLWaterfallStep[] = [
  { label: "Revenue",      rawValue: 2471800, role: "add"      },
  { label: "COGS",         rawValue: 1112310, role: "subtract" },
  { label: "Gross Profit", rawValue: 1359490, role: "total"    },
  { label: "Payroll",      rawValue: 428400,  role: "subtract" },
  { label: "Rent & Lease", rawValue: 108000,  role: "subtract" },
  { label: "Marketing",    rawValue: 64800,   role: "subtract" },
  { label: "Logistics",    rawValue: 54000,   role: "subtract" },
  { label: "Other Ops",    rawValue: 43200,   role: "subtract" },
  { label: "Net Profit",   rawValue: 661090,  role: "total"    },
];

// ── Story ──────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "All Dashboard Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Dashboard Cards"
        description="Core financial analytics cards for the tools store. Weekly earnings snapshots, full P&L with period filters, income vs. expense trends, operating cost breakdowns, and payment method analysis."
      />

      <StorySection title="Weekly Snapshot">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[380px]">
            <EarningsCard
              title="Weekly Earnings"
              subtitle="May 2025"
              value="€558K"
              badge={{ value: "+12.1%", direction: "up" }}
              description="Total revenue this week vs. last week."
              weeklyData={WEEKLY_BARS}
              metrics={EARNINGS_METRICS}
            />
          </div>
          <div className="w-[240px]">
            <RevenueGrowthCard
              title="Revenue Growth"
              subtitle="Week-on-week"
              value="€57.1K"
              badge={{ value: "+8.4%", direction: "up" }}
              weeklyData={GROWTH_BARS}
              highlightColor="#22c55e"
            />
          </div>
          <div className="w-[240px]">
            <RevenueGrowthCard
              title="COGS This Week"
              subtitle="Buy cost"
              value="€25.7K"
              badge={{ value: "+5.1%", direction: "up" }}
              weeklyData={GROWTH_BARS.map((d) => ({ ...d, value: Math.round(d.value * 0.45) }))}
              highlightColor="#f97316"
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="P&L — Full Year">
        <FinancialPLCard
          title="Profit & Loss"
          metrics={PL_METRICS}
          waterfallSteps={PL_WATERFALL}
          defaultPeriodFilter="this-year"
        />
      </StorySection>

      <StorySection title="Monthly Reports by Tab">
        <EarningReportsTabsCard
          title="Earning Reports"
          tabs={EARNING_TABS}
          yAxisFormatter={(v) => v >= 1000 ? `€${Math.round(v / 1000)}k` : `€${v}`}
          defaultPeriodFilter="this-year"
        />
      </StorySection>

      <StorySection title="Income vs. Expenses">
        <StoryStack direction="horizontal" wrap>
          <div className="min-w-[440px] flex-1">
            <IncomeExpenseCard
              title="Revenue vs. Operating Costs"
              totalIncome="€487K"
              incomeBadge={{ value: "18.3%", direction: "up" }}
              totalExpenses="€142K"
              expensesBadge={{ value: "8.0%", direction: "up" }}
              data={[
                { month: "Dec", income: 382000, expense: 118000 },
                { month: "Jan", income: 348000, expense: 109000 },
                { month: "Feb", income: 421000, expense: 124000 },
                { month: "Mar", income: 456000, expense: 131000 },
                { month: "Apr", income: 389000, expense: 121000 },
                { month: "May", income: 204000, expense: 68200,  highlighted: true },
              ]}
              defaultPeriod="Last 6 months"
            />
          </div>
          <div className="w-[400px]">
            <ExpensesCard
              title="Operating Expenses"
              totalExpense="€142K"
              expenses={[
                { label: "Payroll",        percentage: 52, color: "#6366f1" },
                { label: "Rent & Lease",   percentage: 18, color: "#00CFE8" },
                { label: "Inventory Cost", percentage: 12, color: "#22c55e" },
                { label: "Marketing",      percentage:  9, color: "#f97316" },
                { label: "Logistics",      percentage:  6, color: "#f59e0b" },
                { label: "Software & IT",  percentage:  3, color: "#94a3b8" },
              ]}
              topExpenses={[
                { label: "Payroll",        value: "€73.8K", color: "#6366f1" },
                { label: "Rent & Lease",   value: "€25.6K", color: "#00CFE8" },
                { label: "Inventory Cost", value: "€17.0K", color: "#22c55e" },
                { label: "Marketing",      value: "€12.8K", color: "#f97316" },
              ]}
              defaultPeriod="May 2025"
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="Payment Methods">
        <StoryStack direction="horizontal" wrap>
          <div className="min-w-[420px] flex-1">
            <PaymentSummaryCard
              title="Payment Breakdown"
              variant="full"
              valueLabel="Revenue in period"
              valueBadge={{ value: "14.9%", direction: "up" }}
              value="€291K"
              periodLabel="Period"
              periods={["This month", "Last month", "Last 3 months", "This year"]}
              defaultPeriod="This month"
              data={[
                { name: "Card",          value: 54, color: "#6366f1" },
                { name: "Bank Transfer", value: 28, color: "#22c55e" },
                { name: "Cash",          value: 12, color: "#f97316" },
                { name: "Other",         value:  6, color: "#94a3b8" },
              ]}
              metrics={[
                { label: "Avg Order Value", badge: { value: "5.4%",  direction: "up" }, primary: "€227",   secondary: "/ €215"  },
                { label: "Payment Success", badge: { value: "1.2%",  direction: "up" }, primary: "97.8%",  secondary: "/ 96.6%" },
              ]}
            />
          </div>
          <div className="w-[260px]">
            <PaymentSummaryCard
              title="Channel Split"
              variant="compact"
              periodLabel="Period"
              defaultPeriod="This month"
              data={[
                { name: "Walk-In",    value: 46, color: "#4361EE" },
                { name: "Website",    value: 38, color: "#00CFE8" },
                { name: "B2B Direct", value: 16, color: "#FF9F43" },
              ]}
            />
          </div>
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};
