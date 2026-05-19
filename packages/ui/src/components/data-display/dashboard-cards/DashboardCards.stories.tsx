import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StoryStack,
} from "../../shared/storybook";
import { AreaChart } from "../charts/AreaChart";
import { BarChart } from "../charts/BarChart";
import { MiniNeonSparkline } from "../charts/MiniNeonSparkline";
import { NeonLineChart } from "../charts/NeonLineChart";
import { ChartCard } from "./ChartCard";
import { EarningReportsTabsCard } from "./EarningReportsTabsCard";
import type { PeriodFilterValue } from "./EarningReportsTabsCard";
import { EarningsCard } from "./EarningsCard";
import { RevenueGrowthCard } from "./RevenueGrowthCard";
import { SalesOverviewCard } from "./SalesOverviewCard";
import { ShipmentStatisticsCard } from "./ShipmentStatisticsCard";
import { StatCard } from "./StatCard";
import { SupportTrackerCard } from "./SupportTrackerCard";
import { TopicsCard } from "./TopicsCard";
import { TopProductsCard } from "./TopProductsCard";
import { VehicleConditionCard } from "./VehicleConditionCard";
import { VehiclesOverviewCard } from "./VehiclesOverviewCard";
import { StockAvailabilityCard } from "./StockAvailabilityCard";
import { ExpensesCard } from "./ExpensesCard";
import { IncomeExpenseCard } from "./IncomeExpenseCard";
import { DeviceSalesCard } from "./DeviceSalesCard";

// ── Nexus Commerce ERP — shared data ─────────────────────────────────────────
// A fictional mid-market electronics & accessories retailer running on our SaaS.
// MTD = May 1–20, 2026 | Daily avg orders ≈ 356 | 12 warehouse staff on shift.
// ─────────────────────────────────────────────────────────────────────────────

// Inventory
const inventorySparkline = [
  { label: "Mon", value: 2791 }, { label: "Tue", value: 2803 },
  { label: "Wed", value: 2819 }, { label: "Thu", value: 2835 },
  { label: "Fri", value: 2840 }, { label: "Sat", value: 2845 },
  { label: "Sun", value: 2847 },
];

const lowStockItems = [
  { id: 1, name: "USB-C Fast Charger 65W",    qty: 3 },
  { id: 2, name: "Wireless Earbuds Pro X",     qty: 5 },
  { id: 3, name: "Laptop Stand Aluminum",      qty: 2 },
  { id: 4, name: "HDMI 2.1 Cable 2m",          qty: 7 },
];

// Orders / Shipments
const fulfillmentSparkline = [
  { label: "Mon", value: 341 }, { label: "Tue", value: 378 },
  { label: "Wed", value: 362 }, { label: "Thu", value: 395 },
  { label: "Fri", value: 412 }, { label: "Sat", value: 289 },
  { label: "Sun", value: 247 },
];

const shipmentDataMay = [
  { date: "11 May", shipment: 341, delivery: 312 },
  { date: "12 May", shipment: 378, delivery: 346 },
  { date: "13 May", shipment: 362, delivery: 334 },
  { date: "14 May", shipment: 395, delivery: 371 },
  { date: "15 May", shipment: 412, delivery: 387 },
  { date: "16 May", shipment: 289, delivery: 274 },
  { date: "17 May", shipment: 247, delivery: 231 },
  { date: "18 May", shipment: 358, delivery: 342 },
  { date: "19 May", shipment: 371, delivery: 355 },
  { date: "20 May", shipment: 156, delivery: 141 },
];

// Sales & Revenue
const revenueChannelData = [
  { name: "Week 1", webstore: 68420, retail: 52180, wholesale: 14300 },
  { name: "Week 2", webstore: 74810, retail: 55940, wholesale: 18200 },
  { name: "Week 3", webstore: 71250, retail: 48700, wholesale: 21400 },
  { name: "MTD",    webstore: 214480, retail: 156820, wholesale: 53950 },
];

const revenueChannelCategories = [
  { key: "webstore",  color: "var(--ds-color-accent)" },
  { key: "retail",    color: "var(--ds-color-info)" },
  { key: "wholesale", color: "var(--ds-color-warning)" },
];

const revenueChannelLegend = [
  { label: "Webstore",  color: "var(--ds-color-accent)" },
  { label: "Retail POS", color: "var(--ds-color-info)" },
  { label: "Wholesale B2B", color: "var(--ds-color-warning)" },
];

const revenueTrend = [
  { label: "W1", value: 134900 }, { label: "W2", value: 148950 },
  { label: "W3", value: 141350 }, { label: "W4", value: 62050 },
];

const revenueTrendDown = [
  { label: "W1", value: 58200 }, { label: "W2", value: 54100 },
  { label: "W3", value: 49800 }, { label: "W4", value: 31700 },
];

// Earnings weekly
const earningsWeekly = [
  { day: "Mo", value: 22400, highlighted: false },
  { day: "Tu", value: 31800, highlighted: false },
  { day: "We", value: 28600, highlighted: false },
  { day: "Th", value: 35900, highlighted: false },
  { day: "Fr", value: 48200, highlighted: true },
  { day: "Sa", value: 29400, highlighted: false },
  { day: "Su", value: 18900, highlighted: false },
];

const earningsMetrics = [
  {
    icon: <span className="font-bold text-[9px]">$</span>,
    color: "var(--ds-color-accent)",
    label: "Net Revenue",
    value: "$215,200",
    progress: 78,
  },
  {
    icon: <span className="font-bold text-[9px]">▲</span>,
    color: "var(--ds-color-success)",
    label: "Gross Profit",
    value: "$82,617",
    progress: 52,
  },
  {
    icon: <span className="font-bold text-[9px]">↓</span>,
    color: "var(--ds-color-danger)",
    label: "COGS",
    value: "$132,583",
    progress: 35,
  },
];

// Earning reports tabs — yearly
const monthLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function yearBar(vals: number[], hiIdx: number) {
  return monthLabels.map((name, i) => ({
    name, value: vals[i] ?? 0, highlighted: i === hiIdx,
  }));
}

const ShoppingBagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const TrendUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const DollarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const BoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const salesEarningsTabs = [
  {
    id: "revenue",
    icon: <TrendUpIcon />,
    label: "Revenue",
    chartData: yearBar([382000,348000,421000,456000,215200,0,0,0,0,0,0,0], 4),
  },
  {
    id: "orders",
    icon: <ShoppingBagIcon />,
    label: "Orders",
    chartData: yearBar([5820,5240,6340,6910,3210,0,0,0,0,0,0,0], 4),
  },
  {
    id: "profit",
    icon: <DollarIcon />,
    label: "Profit",
    chartData: yearBar([146500,133500,161500,175000,82617,0,0,0,0,0,0,0], 4),
  },
  {
    id: "inventory",
    icon: <BoxIcon />,
    label: "Inventory",
    chartData: yearBar([2610,2680,2720,2790,2847,0,0,0,0,0,0,0], 4),
  },
];

// Finance
const operatingExpenses = [
  { label: "Payroll",        percentage: 52, color: "#7367F0" },
  { label: "Rent & Lease",   percentage: 18, color: "#00CFE8" },
  { label: "Inventory Cost", percentage: 12, color: "#28C76F" },
  { label: "Marketing",      percentage:  9, color: "#FF9F43" },
  { label: "Utilities",      percentage:  6, color: "#EA5455" },
  { label: "Software & IT",  percentage:  3, color: "#82868B" },
];

const topOperatingExpenses = [
  { label: "Payroll",        value: "$74,036",  color: "#7367F0" },
  { label: "Rent & Lease",   value: "$25,614",  color: "#00CFE8" },
  { label: "Inventory Cost", value: "$17,076",  color: "#28C76F" },
  { label: "Marketing",      value: "$12,807",  color: "#FF9F43" },
];

const incomeExpenseData = [
  { month: "Dec", income: 382000, expense: 291300 },
  { month: "Jan", income: 348000, expense: 280200 },
  { month: "Feb", income: 421000, expense: 308700 },
  { month: "Mar", income: 456000, expense: 321400 },
  { month: "Apr", income: 389000, expense: 299100 },
  { month: "May", income: 215200, expense: 142533, highlighted: true },
];

const revenueGrowthWeekly = [
  { day: "W48", value: 98400,  highlighted: false },
  { day: "W49", value: 104700, highlighted: false },
  { day: "W50", value: 112300, highlighted: false },
  { day: "W51", value: 109800, highlighted: false },
  { day: "W1",  value: 134900, highlighted: false },
  { day: "W2",  value: 148950, highlighted: false },
  { day: "W3",  value: 141350, highlighted: true },
];

// CRM / Contacts
const crmSparklineUp = [
  { label: "1", value: 3042 }, { label: "2", value: 3091 },
  { label: "3", value: 3118 }, { label: "4", value: 3155 },
  { label: "5", value: 3198 }, { label: "6", value: 3224 },
  { label: "7", value: 3247 },
];

const dealStageItems = [
  { label: "New Prospects",    percentage: 33, color: "#82868B" },
  { label: "Qualified Leads",  percentage: 24, color: "#00CFE8" },
  { label: "In Negotiation",   percentage: 18, color: "#7367F0" },
  { label: "Ready to Close",   percentage: 12, color: "#28C76F" },
  { label: "Won (This Month)", percentage: 13, color: "#FF9F43" },
];

// Top products
const topProductsByRevenue = [
  { id: 1, rank: 1, name: "Wireless Earbuds Pro X",   category: "Audio",         soldCount: 3840, image: "https://placehold.co/44x44/7367f0/ffffff?text=EP" },
  { id: 2, rank: 2, name: "USB-C Hub 7-in-1",          category: "Accessories",   soldCount: 2910, image: "https://placehold.co/44x44/00cfe8/ffffff?text=UH" },
  { id: 3, rank: 3, name: "Mechanical Keyboard TKL",   category: "Input Devices", soldCount: 2140, image: "https://placehold.co/44x44/28c76f/ffffff?text=KB" },
  { id: 4, rank: 4, name: "27\" 4K IPS Monitor",       category: "Displays",      soldCount: 1370, image: "https://placehold.co/44x44/ff9f43/ffffff?text=4K" },
  { id: 5, rank: 5, name: "Ergonomic Mesh Chair",      category: "Furniture",     soldCount: 980,  image: "https://placehold.co/44x44/ea5455/ffffff?text=EC" },
];

// Vehicle / Delivery fleet
const deliveryFleetItems = [
  { label: "In Transit",  duration: "2hr 18min", percentage: 42.1, color: "#28C76F", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { label: "Unloading",   duration: "1hr 45min", percentage: 26.8, color: "#7367F0", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
  { label: "Loading",     duration: "0hr 52min", percentage: 18.4, color: "#00CFE8", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
  { label: "Awaiting",    duration: "4hr 07min", percentage: 12.7, color: "#FF9F43", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

const fleetConditionItems = [
  { label: "Operational",    sublabel: "18 vehicles",  percentage: 75, color: "#28C76F", badge: "75%" },
  { label: "Maintenance Due", sublabel: "4 vehicles",  percentage: 17, color: "#FF9F43", badge: "-1" },
  { label: "In Repair",       sublabel: "2 vehicles",  percentage:  8, color: "#EA5455", badge: "+2" },
];

// Device / Channel sales
const channelSalesChannels = [
  { key: "retail",     label: "Retail POS",   sales: 2564,  color: "#7367F0" },
  { key: "website",    label: "Webstore",     sales: 3890,  color: "#00CFE8" },
  { key: "thirdParty", label: "Wholesale B2B", sales: 670,  color: "#FF9F43" },
];

const channelSalesBrands = [
  { name: "Audio",       retail: 48200, website: 72300, thirdParty: 18900 },
  { name: "Accessories", retail: 38600, website: 61400, thirdParty: 22400 },
  { name: "Displays",    retail: 31800, website: 44700, thirdParty: 31200 },
  { name: "Input Dev.",  retail: 24100, website: 38200, thirdParty: 14800 },
];

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const ONLINE_COLOR = "#05cd99";
const OFFLINE_COLOR = "rgba(5,205,153,0.28)";

const salesLegend = [
  { label: "Online Sales", color: ONLINE_COLOR },
  { label: "Offline Sales", color: OFFLINE_COLOR },
];

const salesBarData = [
  { name: "26 Jan", online: 22000, offline: 5000 },
  { name: "27 Jan", online: 22000, offline: 13500 },
  { name: "28 Jan", online: 11200, offline: 7400 },
  { name: "29 Jan", online: 6200, offline: 10500 },
  { name: "30 Jan", online: 18500, offline: 5700 },
  { name: "31 Jan", online: 22000, offline: 11800 },
  { name: "01 Feb", online: 19500, offline: 8800 },
];

const salesBarCategories = [
  { key: "online", color: ONLINE_COLOR },
  { key: "offline", color: OFFLINE_COLOR },
];

const revenueLineData = [
  { name: "26 Jan", revenue: 18000 },
  { name: "27 Jan", revenue: 22000 },
  { name: "28 Jan", revenue: 15000 },
  { name: "29 Jan", revenue: 28000 },
  { name: "30 Jan", revenue: 24000 },
  { name: "31 Jan", revenue: 32000 },
  { name: "01 Feb", revenue: 29000 },
];

const revenueLineCategories = [{ key: "revenue", color: ONLINE_COLOR }];

const areaData = [
  { name: "26 Jan", orders: 120 },
  { name: "27 Jan", orders: 180 },
  { name: "28 Jan", orders: 140 },
  { name: "29 Jan", orders: 220 },
  { name: "30 Jan", orders: 190 },
  { name: "31 Jan", orders: 260 },
  { name: "01 Feb", orders: 230 },
];

const areaCategories = [{ key: "orders", color: ONLINE_COLOR }];

const sparklineUp = [
  { label: "1", value: 35 },
  { label: "2", value: 48 },
  { label: "3", value: 30 },
  { label: "4", value: 55 },
  { label: "5", value: 42 },
  { label: "6", value: 68 },
  { label: "7", value: 90 },
];

const sparklineDown = [
  { label: "1", value: 88 },
  { label: "2", value: 72 },
  { label: "3", value: 80 },
  { label: "4", value: 60 },
  { label: "5", value: 50 },
  { label: "6", value: 42 },
  { label: "7", value: 35 },
];

const topProducts = [
  { id: 1, rank: 1, name: "GSB 18V-60 C", category: "Cordless Combi", soldCount: 1672 },
  { id: 2, rank: 2, name: "GDS 18V-1000", category: "Cordless Impact", soldCount: 853 },
  { id: 3, rank: 3, name: "GET 75-150", category: "Random Orbit", soldCount: 612 },
  { id: 4, rank: 4, name: "GHE 18V-60", category: "Cordless Hedge", soldCount: 252 },
  { id: 5, rank: 5, name: "GAS 35 M AFC", category: "Corded Dust", soldCount: 170 },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: "Data Display / Dashboard Cards / Gallery",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A suite of 11 pre-built KPI and analytics cards for ERP dashboards. " +
          "This gallery shows them together in realistic combinations. " +
          "Each card also has its own dedicated Docs entry under 'Data Display/Dashboard Cards/'.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// sm — 2-col: metric only
// ---------------------------------------------------------------------------

export const Size_SM: Story = {
  name: 'size="sm" — 2 columns, metric only',
  render: () => (
    <StoryPanel>
      <StoryIntro
        title='StatCard size="sm"'
        description="Compact metric card. No chart — title, badge, value, and date range only. Fits a 2-column slot."
      />
      <StorySection title="Variants">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[220px]">
            <StatCard
              size="sm"
              title="Offline Sales"
              badge={{ value: "5.32%", direction: "up" }}
              value="$99,291.12"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            />
          </div>
          <div className="w-[220px]">
            <StatCard
              size="sm"
              title="Online Sales"
              badge={{ value: "5.32%", direction: "up" }}
              value="$331,832.00"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            />
          </div>
          <div className="w-[220px]">
            <StatCard
              size="sm"
              title="Invoices"
              badge={{ value: "12.45%", direction: "up" }}
              value={
                <span>
                  100/
                  <span className="text-ds-color-fg-subtle font-semibold text-2xl">
                    {" "}132 paid
                  </span>
                </span>
              }
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            />
          </div>
          <div className="w-[220px]">
            <StatCard
              size="sm"
              title="Orders"
              badge={{ value: "4.76%", direction: "up" }}
              value="1,431"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            />
          </div>
          <div className="w-[220px]">
            <StatCard
              size="sm"
              title="Returns"
              badge={{ value: "3.12%", direction: "down" }}
              value="284"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            />
          </div>
        </StoryStack>
      </StorySection>
    </StoryPanel>
  ),
};

// ---------------------------------------------------------------------------
// md — 4-col: metric + compact side chart
// ---------------------------------------------------------------------------

export const Size_MD: Story = {
  name: 'size="md" — 4 columns, metric + side chart',
  render: () => (
    <StoryPanel>
      <StoryIntro
        title='StatCard size="md"'
        description="Medium metric card with a compact chart zone on the right. Pass any chart component — the zone is 130 × 68 px. Works well with MiniNeonSparkline, a small BarChart, or AreaChart."
      />

      <StorySection title="With MiniNeonSparkline (success tone)">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[300px]">
            <StatCard
              size="md"
              title="Sales"
              badge={{ value: "5.32%", direction: "up" }}
              value="$431,123.12"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
              chart={
                <MiniNeonSparkline
                  data={sparklineUp}
                  height={68}
                  tone="success"
                  showTooltip={false}
                />
              }
            />
          </div>
          <div className="w-[300px]">
            <StatCard
              size="md"
              title="Customers"
              badge={{ value: "2.18%", direction: "up" }}
              value="5,541"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
              chart={
                <MiniNeonSparkline
                  data={sparklineUp}
                  height={68}
                  tone="success"
                  showTooltip={false}
                />
              }
            />
          </div>
          <div className="w-[300px]">
            <StatCard
              size="md"
              title="Items sold"
              badge={{ value: "3.12%", direction: "down" }}
              value="7,634"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
              chart={
                <MiniNeonSparkline
                  data={sparklineDown}
                  height={68}
                  tone="danger"
                  showTooltip={false}
                />
              }
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="With compact BarChart">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[300px]">
            <StatCard
              size="md"
              title="Revenue"
              badge={{ value: "8.14%", direction: "up" }}
              value="$218,400"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
              chart={
                <BarChart
                  data={salesBarData}
                  categories={salesBarCategories}
                  height={68}
                  compact
                />
              }
            />
          </div>
          <div className="w-[300px]">
            <StatCard
              size="md"
              title="Orders"
              badge={{ value: "4.76%", direction: "up" }}
              value="1,431"
              dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
              chart={
                <AreaChart
                  data={areaData}
                  categories={areaCategories}
                  height={68}
                />
              }
            />
          </div>
        </StoryStack>
      </StorySection>
    </StoryPanel>
  ),
};

// ---------------------------------------------------------------------------
// lg — 12-col: metric header + full-width chart
// ---------------------------------------------------------------------------

export const Size_LG: Story = {
  name: 'size="lg" — 12 columns, metric + full chart',
  render: () => (
    <StoryPanel>
      <StoryIntro
        title='StatCard size="lg"'
        description="Full-width card. Stats and legend sit in the header; any chart component fills the body below. The chart controls its own height."
      />

      <StorySection title="With BarChart (grouped)">
        <StatCard
          size="lg"
          title="Sales"
          badge={{ value: "5.32%", direction: "up" }}
          value="$431,123.12"
          dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
          legend={salesLegend}
          chart={
            <BarChart
              data={salesBarData}
              categories={salesBarCategories}
              height={280}
              maxBarSize={28}
            />
          }
        />
      </StorySection>

      <StorySection title="With NeonLineChart">
        <StatCard
          size="lg"
          title="Revenue"
          badge={{ value: "8.14%", direction: "up" }}
          value="$218,400"
          dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
          legend={[{ label: "Revenue", color: ONLINE_COLOR }]}
          chart={
            <NeonLineChart
              data={revenueLineData}
              categories={revenueLineCategories}
              height={260}
            />
          }
        />
      </StorySection>

      <StorySection title="With AreaChart">
        <StatCard
          size="lg"
          title="Orders"
          badge={{ value: "4.76%", direction: "up" }}
          value="1,431"
          dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
          legend={[{ label: "Orders", color: ONLINE_COLOR }]}
          chart={
            <AreaChart
              data={areaData}
              categories={areaCategories}
              height={260}
            />
          }
        />
      </StorySection>
    </StoryPanel>
  ),
};

// ---------------------------------------------------------------------------
// Full dashboard layout
// ---------------------------------------------------------------------------

export const DashboardLayout: Story = {
  name: "Full dashboard layout preview",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="Dashboard Layout"
        description="All three StatCard sizes, ChartCard, and TopProductsCard composed into a realistic 12-column dashboard grid."
      />

      <div className="grid grid-cols-12 gap-4">
        {/* Row 1: three 4-col stat cards */}
        <div className="col-span-4">
          <StatCard
            size="md"
            title="Sales"
            badge={{ value: "5.32%", direction: "up" }}
            value="$431,123.12"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            chart={
              <MiniNeonSparkline
                data={sparklineUp}
                height={68}
                tone="success"
                showTooltip={false}
              />
            }
          />
        </div>
        <div className="col-span-4">
          <StatCard
            size="md"
            title="Customers"
            badge={{ value: "2.18%", direction: "up" }}
            value="5,541"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            chart={
              <MiniNeonSparkline
                data={sparklineUp}
                height={68}
                tone="success"
                showTooltip={false}
              />
            }
          />
        </div>
        <div className="col-span-4">
          <StatCard
            size="md"
            title="Items sold"
            badge={{ value: "3.12%", direction: "down" }}
            value="7,634"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            chart={
              <MiniNeonSparkline
                data={sparklineDown}
                height={68}
                tone="danger"
                showTooltip={false}
              />
            }
          />
        </div>

        {/* Row 2: four 2-col stat cards */}
        <div className="col-span-3">
          <StatCard
            size="sm"
            title="Offline Sales"
            badge={{ value: "5.32%", direction: "up" }}
            value="$99,291.12"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
          />
        </div>
        <div className="col-span-3">
          <StatCard
            size="sm"
            title="Online Sales"
            badge={{ value: "5.32%", direction: "up" }}
            value="$331,832.00"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
          />
        </div>
        <div className="col-span-3">
          <StatCard
            size="sm"
            title="Invoices"
            badge={{ value: "12.45%", direction: "up" }}
            value={
              <span>
                100/
                <span className="text-ds-color-fg-subtle font-semibold text-2xl">
                  {" "}132 paid
                </span>
              </span>
            }
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
          />
        </div>
        <div className="col-span-3">
          <StatCard
            size="sm"
            title="Orders"
            badge={{ value: "4.76%", direction: "up" }}
            value="1,431"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
          />
        </div>

        {/* Row 3: lg chart card + top products */}
        <div className="col-span-9">
          <StatCard
            size="lg"
            title="Sales"
            badge={{ value: "5.32%", direction: "up" }}
            value="$431,123.12"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            legend={salesLegend}
            chart={
              <BarChart
                data={salesBarData}
                categories={salesBarCategories}
                height={280}
                maxBarSize={28}
              />
            }
          />
        </div>
        <div className="col-span-3">
          <TopProductsCard items={topProducts} />
        </div>
      </div>
    </StoryPanel>
  ),
};

// ---------------------------------------------------------------------------
// Business Dashboard — dark canvas
// ---------------------------------------------------------------------------

// ── Sales data ───────────────────────────────────────────────────────────────

const revenueTrendData = [
  { name: "Dec", inStore: 52000, invoice: 28000 },
  { name: "Jan", inStore: 61000, invoice: 32000 },
  { name: "Feb", inStore: 55000, invoice: 25000 },
  { name: "Mar", inStore: 73000, invoice: 36000 },
  { name: "Apr", inStore: 88000, invoice: 41000 },
  { name: "May", inStore: 84320, invoice: 39000 },
];

const revenueTrendCategories = [
  { key: "inStore", color: "var(--ds-color-accent)" },
  { key: "invoice", color: "var(--ds-color-info)" },
];

const revenueTrendLegend = [
  { label: "In-store", color: "var(--ds-color-accent)" },
  { label: "Invoice", color: "var(--ds-color-info)" },
];

const sparklineRevenue = [
  { label: "1", value: 52000 },
  { label: "2", value: 61000 },
  { label: "3", value: 55000 },
  { label: "4", value: 73000 },
  { label: "5", value: 88000 },
  { label: "6", value: 84320 },
];

// ── Inventory / orders data ───────────────────────────────────────────────────

const sparklineOrders = [
  { label: "Mon", value: 168 },
  { label: "Tue", value: 204 },
  { label: "Wed", value: 187 },
  { label: "Thu", value: 221 },
  { label: "Fri", value: 249 },
  { label: "Sat", value: 218 },
];

const inventoryStockData = [
  { name: "Audio",       may: 840,  dec: 920  },
  { name: "Displays",   may: 310,  dec: 480  },
  { name: "Input",      may: 670,  dec: 710  },
  { name: "Access.",    may: 1240, dec: 1050 },
  { name: "Network",    may: 190,  dec: 340  },
];

const inventoryStockCategories = [
  { key: "may", color: "var(--ds-color-accent)" },
  { key: "dec", color: "var(--ds-color-info)" },
];

const inventoryStockLegend = [
  { label: "May 1–20, 2026", color: "var(--ds-color-accent)" },
  { label: "Dec 20, 2025",   color: "var(--ds-color-info)" },
];

// ── AI forecast data ──────────────────────────────────────────────────────────

const aiForecastData = [
  { name: "Dec", actual: 80000, forecast: 76000 },
  { name: "Jan", actual: 93000, forecast: 90000 },
  { name: "Feb", actual: 80000, forecast: 88000 },
  { name: "Mar", actual: 109000, forecast: 104000 },
  { name: "Apr", actual: 129000, forecast: 118000 },
  { name: "May", actual: 123320, forecast: 135000 },
];

const aiForecastCategories = [
  { key: "actual", color: "var(--ds-color-accent)" },
  { key: "forecast", color: "var(--ds-color-warning)" },
];

const aiForecastLegend = [
  { label: "Actual", color: "var(--ds-color-accent)" },
  { label: "AI Forecast", color: "var(--ds-color-warning)" },
];

// ── Top products ──────────────────────────────────────────────────────────────

const evalProducts = [
  {
    id: 1,
    rank: 1,
    name: "Wireless Pro Headset",
    category: "Audio",
    soldCount: 3840,
    image: "https://placehold.co/44x44/6366f1/ffffff?text=WH",
  },
  {
    id: 2,
    rank: 2,
    name: "USB-C Hub 7-in-1",
    category: "Accessories",
    soldCount: 2910,
    image: "https://placehold.co/44x44/06b6d4/ffffff?text=UH",
  },
  {
    id: 3,
    rank: 3,
    name: "Mechanical Keyboard TKL",
    category: "Input Devices",
    soldCount: 2140,
    image: "https://placehold.co/44x44/10b981/ffffff?text=KB",
  },
  {
    id: 4,
    rank: 4,
    name: '27″ 4K Monitor',
    category: "Displays",
    soldCount: 1370,
    image: "https://placehold.co/44x44/f59e0b/ffffff?text=4K",
  },
  {
    id: 5,
    rank: 5,
    name: "Ergonomic Mouse",
    category: "Input Devices",
    soldCount: 980,
    image: "https://placehold.co/44x44/ef4444/ffffff?text=EM",
  },
];

export const NexusCommerceDashboard: Story = {
  name: "Nexus Commerce ERP — Full Operations Dashboard",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Nexus Commerce — a mid-market electronics & accessories retailer. " +
          "Six domain sections: Morning Pulse, Inventory & Warehouse, Sales & Revenue, " +
          "Order Fulfillment, Finance & Expenses, CRM & Pipeline.",
      },
    },
  },
  render: () => (
    <div data-mode="dark" className="min-h-screen bg-ds-canvas p-8">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">

        {/* ── Dashboard Header ──────────────────────────────────────────────── */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-bold text-ds-1">Nexus Commerce ERP</p>
            <p className="mt-1 text-sm text-ds-3">
              Operations Dashboard — May 20, 2026 &nbsp;·&nbsp; 08:14 AM &nbsp;·&nbsp; May MTD
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-ds-success-subtle px-3 py-1 text-xs font-semibold text-ds-success">
              ● All systems operational
            </span>
          </div>
        </div>

        {/* ── MORNING PULSE — 4 critical KPIs ──────────────────────────────── */}
        <section>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-ds-accent">
            Morning Pulse
          </p>
          <p className="mb-4 text-[11px] text-ds-3">
            The four numbers every operator checks first thing — inventory health, order intake, SLA risk, and margin
          </p>
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              size="sm"
              title="Active SKUs In Stock"
              value="2,847"
              dateRange="↑ 56 restocked overnight"
              badge={{ value: "+2.0%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Orders Today"
              value="156"
              dateRange="Daily avg 356 · 44% of avg"
              badge={{ value: "+8.3%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="SLA At-Risk Orders"
              value="7"
              dateRange="Ship within 2 hrs to stay on-time"
              badge={{ value: "-3", direction: "down" }}
            />
            <StatCard
              size="sm"
              title="Gross Margin (MTD)"
              value="38.4%"
              dateRange="May 1–20, 2026"
              badge={{ value: "+1.2%", direction: "up" }}
            />
          </div>
        </section>

        {/* ── INVENTORY & WAREHOUSE ─────────────────────────────────────────── */}
        <section>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-ds-accent">
            Inventory &amp; Warehouse
          </p>
          <p className="mb-4 text-[11px] text-ds-3">
            Stock health, reorder urgency, delivery fleet status, and warehouse vehicle condition
          </p>

          <div className="grid grid-cols-4 gap-4">
            <StatCard
              size="sm"
              title="Low-Stock Alerts"
              value="34"
              dateRange="Below reorder point"
              badge={{ value: "+8", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Stockout Risk (7-day)"
              value="12 SKUs"
              dateRange="Forecast based on velocity"
              badge={{ value: "Urgent", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Warehouse Utilisation"
              value="76%"
              dateRange="Zone A–D combined"
              badge={{ value: "+5%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Inventory Turnover"
              value="3.2×"
              dateRange="Rolling 30 days"
              badge={{ value: "+0.4×", direction: "up" }}
            />
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <StockAvailabilityCard
                title="Stock Availability"
                totalAsset="$1.84M"
                totalProduct={2847}
                availability={{ available: 65, lowStock: 24, outOfStock: 11 }}
                lowStockItems={lowStockItems}
                onViewAll={() => undefined}
              />
            </div>
            <div className="col-span-4">
              <VehiclesOverviewCard
                title="Delivery Fleet Status"
                items={deliveryFleetItems}
              />
            </div>
            <div className="col-span-4">
              <VehicleConditionCard
                title="Fleet Condition"
                items={fleetConditionItems}
              />
            </div>
          </div>
        </section>

        {/* ── SALES & REVENUE ───────────────────────────────────────────────── */}
        <section>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-ds-accent">
            Sales &amp; Revenue
          </p>
          <p className="mb-4 text-[11px] text-ds-3">
            MTD revenue by channel, weekly earnings vs. COGS, yearly trend by category, and device-level channel breakdown
          </p>

          <div className="grid grid-cols-4 gap-4">
            <StatCard
              size="sm"
              title="MTD Revenue"
              value="$487,250"
              dateRange="May 1–20, 2026"
              badge={{ value: "+18.3%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Avg Order Value"
              value="$68.40"
              dateRange="↑ $2.15 vs 30-day avg"
              badge={{ value: "+3.2%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Conversion Rate"
              value="3.2%"
              dateRange="Web store only"
              badge={{ value: "-0.1%", direction: "down" }}
            />
            <StatCard
              size="sm"
              title="Repeat Customer Rate"
              value="34%"
              dateRange="Last 30 days"
              badge={{ value: "+2%", direction: "up" }}
            />
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <StatCard
                size="lg"
                title="Revenue by Channel (Weekly)"
                value="$487,250"
                dateRange="May 1–20, 2026"
                badge={{ value: "+18.3%", direction: "up" }}
                legend={revenueChannelLegend}
                chart={
                  <BarChart
                    data={revenueChannelData}
                    categories={revenueChannelCategories}
                    height={220}
                    maxBarSize={24}
                  />
                }
              />
            </div>
            <div className="col-span-5">
              <EarningsCard
                size="lg"
                title="Weekly Earnings"
                subtitle="Revenue vs. COGS · Current Week"
                value="$215,200"
                badge={{ value: "+14.8%", direction: "up" }}
                description="Friday peak reflects B2B wholesale batch invoicing"
                weeklyData={earningsWeekly}
                metrics={earningsMetrics}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <EarningReportsTabsCard
                title="Annual Performance"
                subtitle="Jan–May 2026 · YTD by category"
                tabs={salesEarningsTabs}
                showAddTab={false}
                defaultTabId="revenue"
                showPeriodFilter
                defaultPeriodFilter="this-year"
              />
            </div>
            <div className="col-span-6">
              <DeviceSalesCard
                title="Sales by Channel & Category"
                channels={channelSalesChannels}
                brands={channelSalesBrands}
              />
            </div>
          </div>
        </section>

        {/* ── ORDER FULFILLMENT ─────────────────────────────────────────────── */}
        <section>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-ds-accent">
            Order Fulfillment
          </p>
          <p className="mb-4 text-[11px] text-ds-3">
            10-day shipment vs. delivery throughput, SLA adherence, return rate, and top revenue-generating products
          </p>

          <div className="grid grid-cols-4 gap-4">
            <StatCard
              size="sm"
              title="On-Time Fulfillment"
              value="96.8%"
              dateRange="Rolling 7 days"
              badge={{ value: "+0.5%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Avg Fulfillment Time"
              value="14.3 hrs"
              dateRange="Picking → shipped"
              badge={{ value: "-1.2h", direction: "down" }}
            />
            <StatCard
              size="sm"
              title="Return Rate (7-day)"
              value="2.3%"
              dateRange="Below 3% target ✓"
              badge={{ value: "+0.1%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Orders In Transit"
              value="247"
              dateRange="Across 3 carriers"
              badge={{ value: "Normal", direction: "up" }}
            />
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <ShipmentStatisticsCard
                title="Shipments vs. Deliveries"
                subtitle="May 11–20, 2026 · 10-day window"
                data={shipmentDataMay}
                shipmentLabel="Dispatched"
                deliveryLabel="Delivered"
                shipmentColor="var(--ds-color-accent)"
                deliveryColor="var(--ds-color-success)"
                defaultMonth="May"
              />
            </div>
            <div className="col-span-5">
              <TopProductsCard
                title="Top Products by Revenue"
                items={topProductsByRevenue}
              />
            </div>
          </div>
        </section>

        {/* ── FINANCE & EXPENSES ────────────────────────────────────────────── */}
        <section>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-ds-accent">
            Finance &amp; Expenses
          </p>
          <p className="mb-4 text-[11px] text-ds-3">
            Operating expense breakdown, 6-month income vs. expenses trend, and weekly revenue growth tracker
          </p>

          <div className="grid grid-cols-4 gap-4">
            <StatCard
              size="sm"
              title="Net Profit (MTD)"
              value="$44,800"
              dateRange="May 1–20, 2026"
              badge={{ value: "+9.2%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Operating Expenses"
              value="$142,300"
              dateRange="MTD · +8% vs April"
              badge={{ value: "+8%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Cash on Hand"
              value="$225,400"
              dateRange="~90 days operating"
              badge={{ value: "Healthy", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Accounts Payable (30d)"
              value="$67,200"
              dateRange="Due within 30 days"
              badge={{ value: "-$4k", direction: "down" }}
            />
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <ExpensesCard
                title="Operating Expenses"
                totalExpense="$142,300"
                expenses={operatingExpenses}
                topExpenses={topOperatingExpenses}
                defaultPeriod="Last 6 months"
              />
            </div>
            <div className="col-span-5">
              <IncomeExpenseCard
                title="Income vs. Expenses"
                totalIncome="$487,250"
                incomeBadge={{ value: "18.3%", direction: "up" }}
                totalExpenses="$142,300"
                expensesBadge={{ value: "8.0%", direction: "up" }}
                data={incomeExpenseData}
                defaultPeriod="Last 6 months"
              />
            </div>
            <div className="col-span-3">
              <RevenueGrowthCard
                title="Weekly Revenue"
                subtitle="Rolling 7 weeks"
                value="$141,350"
                badge={{ value: "-5.1%", direction: "down" }}
                weeklyData={revenueGrowthWeekly}
                highlightColor="var(--ds-color-accent)"
              />
            </div>
          </div>
        </section>

        {/* ── CRM & PIPELINE ────────────────────────────────────────────────── */}
        <section>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-ds-accent">
            CRM &amp; Pipeline
          </p>
          <p className="mb-4 text-[11px] text-ds-3">
            Customer base growth, open deal stages, overdue follow-ups, and acquisition vs. churn balance
          </p>

          <div className="grid grid-cols-4 gap-4">
            <StatCard
              size="sm"
              title="Active Customers"
              value="3,247"
              dateRange="+156 new this month"
              badge={{ value: "+5.1%", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Leads In Pipeline"
              value="234"
              dateRange="Across all stages"
              badge={{ value: "+18", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Overdue Follow-ups"
              value="12"
              dateRange="Action required today"
              badge={{ value: "Urgent", direction: "up" }}
            />
            <StatCard
              size="sm"
              title="Churn Rate (30-day)"
              value="1.8%"
              dateRange="Below 2% target ✓"
              badge={{ value: "+0.2%", direction: "up" }}
            />
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <TopicsCard
                title="Deal Stage Distribution"
                items={dealStageItems}
              />
            </div>
            <div className="col-span-4">
              <SalesOverviewCard
                title="Acquisition vs. Retention"
                badge={{ value: "+18.2%", direction: "up" }}
                value="$487,250"
                vsLabel="VS"
                leftMetric={{
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  ),
                  label: "3,090 Returning",
                  percentage: "70.1%",
                  count: "3,090",
                  color: "var(--ds-color-accent)",
                }}
                rightMetric={{
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  ),
                  label: "1,316 New",
                  percentage: "29.9%",
                  count: "1,316",
                  color: "var(--ds-color-info)",
                }}
              />
            </div>
            <div className="col-span-3">
              <SupportTrackerCard
                title="Support Queue"
                subtitle="Last 7 Days"
                total={164}
                totalLabel="Total Tickets"
                items={[
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.5 2h-19A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18H8l4 4 4-4h5.5A1.5 1.5 0 0 0 23 16.5v-13A1.5 1.5 0 0 0 21.5 2z"/>
                      </svg>
                    ),
                    iconColor: "var(--ds-color-accent)",
                    label: "New Tickets",
                    value: "142",
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    ),
                    iconColor: "var(--ds-color-warning)",
                    label: "Escalated",
                    value: "8",
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    ),
                    iconColor: "var(--ds-color-info)",
                    label: "Response Time",
                    value: "2.4 hrs",
                  },
                ]}
                percentage={86}
                completedLabel="Resolved"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ChartCard standalone
// ---------------------------------------------------------------------------

export const ChartCardStory: Story = {
  name: "ChartCard — standalone",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="ChartCard"
        description="Standalone chart wrapper card with header (title, dateRange, legend, menu) and any chart as children."
      />
      <StorySection title="BarChart">
        <div className="max-w-[640px]">
          <ChartCard
            title="Sales"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            legend={salesLegend}
          >
            <BarChart
              data={salesBarData}
              categories={salesBarCategories}
              height={280}
              maxBarSize={28}
            />
          </ChartCard>
        </div>
      </StorySection>
      <StorySection title="NeonLineChart">
        <div className="max-w-[640px]">
          <ChartCard
            title="Revenue"
            dateRange="From 01 Jan , 2023 - 01 Feb, 2023"
            legend={[{ label: "Revenue", color: ONLINE_COLOR }]}
          >
            <NeonLineChart
              data={revenueLineData}
              categories={revenueLineCategories}
              height={260}
            />
          </ChartCard>
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ---------------------------------------------------------------------------
// EarningsCard
// ---------------------------------------------------------------------------


export const EarningsCardStory: Story = {
  name: "EarningsCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="EarningsCard"
        description="Weekly earnings overview with a highlighted bar chart and three footer metrics with progress bars."
      />
      <StorySection title='size="md" (default)'>
        <div className="max-w-[480px]">
          <EarningsCard
            title="Earning Reports"
            subtitle="Weekly Earnings Overview"
            value="$468"
            badge={{ value: "+4.2%", direction: "up" }}
            description="You informed of this week compared to last week"
            weeklyData={earningsWeekly}
            metrics={earningsMetrics}
          />
        </div>
      </StorySection>
      <StorySection title='size="lg"'>
        <div className="max-w-xl">
          <EarningsCard
            size="lg"
            title="Earning Reports"
            subtitle="Weekly Earnings Overview"
            value="$468"
            badge={{ value: "+4.2%", direction: "up" }}
            description="You informed of this week compared to last week"
            weeklyData={earningsWeekly}
            metrics={earningsMetrics}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ---------------------------------------------------------------------------
// SupportTrackerCard
// ---------------------------------------------------------------------------

const supportItems = [
  {
    icon: <span className="text-[11px] font-bold">#</span>,
    iconColor: "var(--ds-color-accent)",
    label: "New Tickets",
    value: "142",
  },
  {
    icon: <span className="text-[11px] font-bold">✓</span>,
    iconColor: "var(--ds-color-info)",
    label: "Open Tickets",
    value: "28",
  },
  {
    icon: <span className="text-[11px] font-bold">◷</span>,
    iconColor: "var(--ds-color-warning)",
    label: "Response Time",
    value: "1 Day",
  },
];

export const SupportTrackerCardStory: Story = {
  name: "SupportTrackerCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="SupportTrackerCard"
        description="Support KPIs with a segmented gauge arc showing completion percentage."
      />
      <StorySection title="Default">
        <div className="max-w-[480px]">
          <SupportTrackerCard
            title="Support Tracker"
            subtitle="Last 7 Days"
            total={164}
            totalLabel="Total Tickets"
            items={supportItems}
            percentage={85}
            completedLabel="Completed Task"
          />
        </div>
      </StorySection>
      <StorySection title="Different percentage">
        <div className="grid max-w-[960px] grid-cols-2 gap-4">
          <SupportTrackerCard
            title="Support Tracker"
            subtitle="Last 30 Days"
            total={512}
            totalLabel="Total Tickets"
            items={[
              { icon: <span className="text-[11px] font-bold">#</span>, iconColor: "var(--ds-color-accent)", label: "New Tickets", value: "389" },
              { icon: <span className="text-[11px] font-bold">✓</span>, iconColor: "var(--ds-color-info)", label: "Open Tickets", value: "91" },
              { icon: <span className="text-[11px] font-bold">◷</span>, iconColor: "var(--ds-color-warning)", label: "Response Time", value: "4 Hours" },
            ]}
            percentage={62}
            completedLabel="Resolved"
          />
          <SupportTrackerCard
            title="Support Tracker"
            subtitle="Last 7 Days"
            total={164}
            totalLabel="Total Tickets"
            items={supportItems}
            percentage={95}
            completedLabel="Completed Task"
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── SalesOverviewCard ─────────────────────────────────────────────────────────

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const SalesOverviewCardStory: Story = {
  name: "SalesOverviewCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="SalesOverviewCard"
        description="Sales funnel overview with two competing metrics and a split progress bar."
      />
      <StorySection title="Default">
        <div className="max-w-[420px]">
          <SalesOverviewCard
            title="Sales Overview"
            badge={{ value: "+18.2%", direction: "up" }}
            value="$42,580"
            vsLabel="VS"
            leftMetric={{
              icon: <CartIcon />,
              label: "2,856 Orders",
              percentage: "42.9%",
              count: "2,856",
              color: "var(--ds-color-info)",
            }}
            rightMetric={{
              icon: <LinkIcon />,
              label: "3,741 Visitors",
              percentage: "57.1%",
              count: "3,741",
              color: "var(--ds-color-accent)",
            }}
          />
        </div>
      </StorySection>
      <StorySection title="Grid">
        <div className="grid max-w-[860px] grid-cols-2 gap-4">
          <SalesOverviewCard
            title="Q1 Sales"
            badge={{ value: "+5.4%", direction: "up" }}
            value="$18,940"
            vsLabel="VS"
            leftMetric={{
              icon: <CartIcon />,
              label: "1,102 Orders",
              percentage: "38.0%",
              count: "1,102",
              color: "var(--ds-color-success)",
            }}
            rightMetric={{
              icon: <LinkIcon />,
              label: "1,797 Visitors",
              percentage: "62.0%",
              count: "1,797",
              color: "var(--ds-color-accent)",
            }}
          />
          <SalesOverviewCard
            title="Q2 Sales"
            badge={{ value: "-2.1%", direction: "down" }}
            value="$23,640"
            vsLabel="VS"
            leftMetric={{
              icon: <CartIcon />,
              label: "1,754 Orders",
              percentage: "47.6%",
              count: "1,754",
              color: "var(--ds-color-warning)",
            }}
            rightMetric={{
              icon: <LinkIcon />,
              label: "1,944 Visitors",
              percentage: "52.4%",
              count: "1,944",
              color: "var(--ds-color-accent)",
            }}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── RevenueGrowthCard ─────────────────────────────────────────────────────────

const revenueWeekly = [
  { day: "Mon", value: 3200, highlighted: false },
  { day: "Tue", value: 5400, highlighted: false },
  { day: "Wed", value: 4100, highlighted: false },
  { day: "Thu", value: 7800, highlighted: true },
  { day: "Fri", value: 6200, highlighted: false },
  { day: "Sat", value: 4900, highlighted: false },
  { day: "Sun", value: 5700, highlighted: false },
];

export const RevenueGrowthCardStory: Story = {
  name: "RevenueGrowthCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="RevenueGrowthCard"
        description="Revenue metric card with weekly bar chart and a trend badge below the value."
      />
      <StorySection title="Default">
        <div className="max-w-[360px]">
          <RevenueGrowthCard
            title="Revenue Growth"
            subtitle="Weekly summary"
            value="$28,450"
            badge={{ value: "+12.4%", direction: "up" }}
            weeklyData={revenueWeekly}
            highlightColor="#05cd99"
          />
        </div>
      </StorySection>
      <StorySection title="Variants">
        <div className="grid max-w-[740px] grid-cols-2 gap-4">
          <RevenueGrowthCard
            title="Net Revenue"
            subtitle="This week"
            value="$14,200"
            badge={{ value: "+6.8%", direction: "up" }}
            weeklyData={revenueWeekly}
            highlightColor="var(--ds-color-accent)"
          />
          <RevenueGrowthCard
            title="Gross Revenue"
            subtitle="This week"
            value="$31,900"
            badge={{ value: "-3.2%", direction: "down" }}
            weeklyData={revenueWeekly}
            highlightColor="var(--ds-color-warning)"
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── EarningReportsTabsCard ────────────────────────────────────────────────────

function yearlyBarData(values: number[], highlightIdx: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((name, i) => ({
    name,
    value: values[i] ?? 0,
    highlighted: i === highlightIdx,
  }));
}

const earningTabs = [
  {
    id: "orders",
    icon: <ShoppingBagIcon />,
    label: "Orders",
    chartData: yearlyBarData([12000,18000,14000,22000,19000,28000,24000,31000,27000,35000,30000,38000], 7),
  },
  {
    id: "sales",
    icon: <TrendUpIcon />,
    label: "Sales",
    chartData: yearlyBarData([8000,12000,10000,15000,13000,20000,17000,23000,19000,27000,22000,29000], 9),
  },
  {
    id: "profit",
    icon: <DollarIcon />,
    label: "Profit",
    chartData: yearlyBarData([3000,5000,4000,7000,6000,9000,8000,11000,9500,13000,11000,15000], 11),
  },
  {
    id: "income",
    icon: <WalletIcon />,
    label: "Income",
    chartData: yearlyBarData([20000,28000,24000,32000,29000,40000,36000,45000,41000,52000,47000,58000], 5),
  },
];

function EarningReportsTabsCardWithFilter() {
  const [period, setPeriod] = useState<PeriodFilterValue>("this-month");
  return (
    <EarningReportsTabsCard
      title="Sales Reports"
      subtitle="Business Sales Overview"
      tabs={earningTabs}
      defaultTabId="sales"
      showAddTab={false}
      showPeriodFilter
      periodFilter={period}
      onPeriodFilterChange={setPeriod}
    />
  );
}

export const EarningReportsTabsCardStory: Story = {
  name: "EarningReportsTabsCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="EarningReportsTabsCard"
        description="Yearly earnings bar chart with icon tab switcher. Optional period filter select (Today → Custom) aligns to the right of the tab row; selecting Custom reveals an inline date-range picker."
      />
      <StorySection title="Default">
        <div className="max-w-[560px]">
          <EarningReportsTabsCard
            title="Earning Reports"
            subtitle="Yearly Earnings Overview"
            tabs={earningTabs}
            showAddTab
          />
        </div>
      </StorySection>
      <StorySection title="No add tab">
        <div className="max-w-[560px]">
          <EarningReportsTabsCard
            title="Revenue Reports"
            subtitle="Annual Summary"
            tabs={earningTabs.slice(0, 3)}
            showAddTab={false}
            defaultTabId="sales"
          />
        </div>
      </StorySection>
      <StorySection title="With period filter">
        <div className="max-w-[560px]">
          <EarningReportsTabsCardWithFilter />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── TopicsCard ────────────────────────────────────────────────────────────────

const topicItems = [
  { label: "UI Design", percentage: 35, color: "#7367f0" },
  { label: "UX Design", percentage: 20, color: "#05cd99" },
  { label: "Music", percentage: 14, color: "#00cfe8" },
  { label: "Animation", percentage: 12, color: "#a8aaae" },
  { label: "Vue", percentage: 10, color: "#ea5455" },
  { label: "SEO", percentage: 9, color: "#ff9f43" },
];

export const TopicsCardStory: Story = {
  name: "TopicsCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="TopicsCard"
        description="Horizontal bar chart with color-coded bars and a 2-column legend grid."
      />
      <StorySection title="Default">
        <div className="max-w-[680px]">
          <TopicsCard
            title="Topic you are interested in"
            items={topicItems}
          />
        </div>
      </StorySection>
      <StorySection title="Fewer items">
        <div className="max-w-[680px]">
          <TopicsCard
            title="Top Skills"
            items={topicItems.slice(0, 4)}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── ShipmentStatisticsCard ────────────────────────────────────────────────────

const shipmentData = [
  { date: "1 Jan", shipment: 37, delivery: 21 },
  { date: "2 Jan", shipment: 40, delivery: 28 },
  { date: "3 Jan", shipment: 35, delivery: 22 },
  { date: "4 Jan", shipment: 36, delivery: 32 },
  { date: "5 Jan", shipment: 33, delivery: 25 },
  { date: "6 Jan", shipment: 46, delivery: 38 },
  { date: "7 Jan", shipment: 38, delivery: 34 },
  { date: "8 Jan", shipment: 34, delivery: 36 },
  { date: "9 Jan", shipment: 36, delivery: 27 },
  { date: "10 Jan", shipment: 37, delivery: 24 },
];

export const ShipmentStatisticsCardStory: Story = {
  name: "ShipmentStatisticsCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="ShipmentStatisticsCard"
        description="Shipment vs delivery comparison using a ComposedChart (bars + line) with a month selector dropdown."
      />
      <StorySection title="Default">
        <div className="max-w-[680px]">
          <ShipmentStatisticsCard
            title="Shipment statistics"
            subtitle="Total number of deliveries 23.8k"
            data={shipmentData}
          />
        </div>
      </StorySection>
      <StorySection title="Custom colors">
        <div className="max-w-[680px]">
          <ShipmentStatisticsCard
            title="Order Fulfillment"
            subtitle="Jan 2025 — 18.4k orders processed"
            data={shipmentData}
            shipmentColor="var(--ds-color-success)"
            deliveryColor="var(--ds-color-info)"
            shipmentLabel="Fulfilled"
            deliveryLabel="Returned"
            defaultMonth="February"
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── VehicleConditionCard ──────────────────────────────────────────────────────

const vehicleItems = [
  {
    label: "Incorrect Address",
    sublabel: "all exceptions",
    percentage: 83,
    color: "#28C76F",
    badge: "+10%",
  },
  {
    label: "Good",
    sublabel: "24 vehicles",
    percentage: 17,
    color: "#82868B",
    badge: "8.1",
  },
  {
    label: "Average",
    sublabel: "14 vehicles",
    percentage: 8,
    color: "#7367F0",
    badge: "-2.5%",
  },
  {
    label: "Bad",
    sublabel: "8 vehicles",
    percentage: 6,
    color: "#FF9F43",
    badge: "-3.4%",
  },
  {
    label: "Not Working",
    sublabel: "4 vehicles",
    percentage: 2,
    color: "#EA5455",
    badge: "+12.6%",
  },
];

export const VehicleConditionCardStory: Story = {
  name: "VehicleConditionCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="VehicleConditionCard"
        description="Status list with mini circular progress gauges, colored labels, and right-aligned badges."
      />
      <StorySection title="Default">
        <div className="max-w-[380px]">
          <VehicleConditionCard
            title="Vehicle Condition"
            items={vehicleItems}
          />
        </div>
      </StorySection>
      <StorySection title="Fewer items">
        <div className="max-w-[380px]">
          <VehicleConditionCard
            title="Delivery Status"
            items={vehicleItems.slice(0, 3)}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── VehiclesOverviewCard ──────────────────────────────────────────────────────

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const vehiclesOverviewItems = [
  { label: "On the way",  duration: "2hr 10min", percentage: 39.7, color: "#82868B", icon: <TruckIcon /> },
  { label: "Unloading",   duration: "3hr 15min", percentage: 28.3, color: "#7367F0", icon: <DownloadIcon /> },
  { label: "Loading",     duration: "1hr 24min", percentage: 17.4, color: "#00CFE8", icon: <UploadIcon /> },
  { label: "Waiting",     duration: "5hr 19min", percentage: 14.6, color: "#4B4B4B", icon: <ClockIcon /> },
];

export const VehiclesOverviewCardStory: Story = {
  name: "VehiclesOverviewCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="VehiclesOverviewCard"
        description="Stacked horizontal bar segmented by vehicle status with a breakdown list showing duration and percentage per segment."
      />
      <StorySection title="Default">
        <div className="max-w-96">
          <VehiclesOverviewCard
            title="Vehicles Overview"
            items={vehiclesOverviewItems}
          />
        </div>
      </StorySection>
      <StorySection title="Fewer items">
        <div className="max-w-96">
          <VehiclesOverviewCard
            title="Fleet Status"
            items={vehiclesOverviewItems.slice(0, 3)}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── StockAvailabilityCard ─────────────────────────────────────────────────────

const stockItems = [
  { id: 1, name: "Wireless Headset Pro",  qty: 3 },
  { id: 2, name: "USB-C Hub 7-in-1",      qty: 5 },
  { id: 3, name: "Mechanical Keyboard",   qty: 2 },
];

export const StockAvailabilityCardStory: Story = {
  name: "StockAvailabilityCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="StockAvailabilityCard"
        description="Asset/product metrics with a 3-segment thin bar showing stock health and a low-stock item list with Order buttons."
      />
      <StorySection title="Default">
        <div className="max-w-[380px]">
          <StockAvailabilityCard
            totalAsset="$53,000"
            totalProduct={442}
            availability={{ available: 62, lowStock: 28, outOfStock: 10 }}
            lowStockItems={stockItems}
            onViewAll={() => undefined}
          />
        </div>
      </StorySection>
      <StorySection title="No low-stock items">
        <div className="max-w-[380px]">
          <StockAvailabilityCard
            totalAsset="$127,400"
            totalProduct={891}
            availability={{ available: 84, lowStock: 12, outOfStock: 4 }}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── ExpensesCard ──────────────────────────────────────────────────────────────

export const ExpensesCardStory: Story = {
  name: "ExpensesCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="ExpensesCard"
        description="Donut chart showing expense distribution by category with a legend and a top-expense 2×2 grid."
      />
      <StorySection title="Default">
        <div className="max-w-[420px]">
          <ExpensesCard />
        </div>
      </StorySection>
      <StorySection title="Custom data">
        <div className="max-w-[420px]">
          <ExpensesCard
            title="Monthly Costs"
            totalExpense="$840.00"
            expenses={[
              { label: "Salaries",    percentage: 55, color: "#7367F0" },
              { label: "Cloud Infra", percentage: 22, color: "#00CFE8" },
              { label: "Marketing",   percentage: 13, color: "#28C76F" },
              { label: "Software",    percentage: 10, color: "#FF9F43" },
            ]}
            topExpenses={[
              { label: "Salaries",    value: "$462.00", color: "#7367F0" },
              { label: "Cloud Infra", value: "$184.80", color: "#00CFE8" },
              { label: "Marketing",   value: "$109.20", color: "#28C76F" },
              { label: "Software",    value: "$84.00",  color: "#FF9F43" },
            ]}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── IncomeExpenseCard ─────────────────────────────────────────────────────────

export const IncomeExpenseCardStory: Story = {
  name: "IncomeExpenseCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="IncomeExpenseCard"
        description="Paired income/expense metric headers with a grouped monthly bar chart and period selector."
      />
      <StorySection title="Default">
        <div className="max-w-[480px]">
          <IncomeExpenseCard />
        </div>
      </StorySection>
      <StorySection title="Custom colors">
        <div className="max-w-[480px]">
          <IncomeExpenseCard
            title="Revenue vs Costs"
            totalIncome="$8,240"
            incomeBadge={{ value: "12.3%", direction: "up" }}
            totalExpenses="$3,190"
            expensesBadge={{ value: "5.2%", direction: "up" }}
            incomeColor="var(--ds-color-accent)"
            expenseColor="var(--ds-color-danger)"
            data={[
              { month: "JAN", income: 5200, expense: 2100 },
              { month: "FEB", income: 6800, expense: 2500 },
              { month: "MAR", income: 8240, expense: 3190, highlighted: true },
              { month: "APR", income: 7100, expense: 2800 },
              { month: "MAY", income: 7600, expense: 2950 },
              { month: "JUN", income: 6900, expense: 2700 },
            ]}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

// ── DeviceSalesCard ───────────────────────────────────────────────────────────

export const DeviceSalesCardStory: Story = {
  name: "DeviceSalesCard",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="DeviceSalesCard"
        description="Three sales-channel headline metrics with a horizontal stacked bar chart broken down by brand."
      />
      <StorySection title="Default">
        <div className="max-w-[460px]">
          <DeviceSalesCard />
        </div>
      </StorySection>
      <StorySection title="Custom brands & channels">
        <div className="max-w-[460px]">
          <DeviceSalesCard
            title="Software Licenses"
            channels={[
              { key: "direct",    label: "Direct",    sales: 520,  color: "#7367F0" },
              { key: "partner",   label: "Partner",   sales: 1840, color: "#28C76F" },
              { key: "reseller",  label: "Reseller",  sales: 960,  color: "#FF9F43" },
            ]}
            brands={[
              { name: "Enterprise", retail: 28000, website: 42000, thirdParty: 18000 },
              { name: "Pro",        retail: 16000, website: 24000, thirdParty: 14000 },
              { name: "Starter",    retail:  8000, website: 12000, thirdParty:  8000 },
            ]}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};
