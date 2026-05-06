import {
  StatCard,
  EarningsCard,
  SupportTrackerCard,
  SalesOverviewCard,
  RevenueGrowthCard,
  TopProductsCard,
  ShipmentStatisticsCard,
  VehicleConditionCard,
  MiniNeonSparkline,
} from "erp-pro-ui";
import type { TopProductItem } from "erp-pro-ui";
import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

// ── Shared sample data ────────────────────────────────────────────────────────

const sparklinePoints = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 410 },
  { label: "Wed", value: 380 },
  { label: "Thu", value: 510 },
  { label: "Fri", value: 470 },
  { label: "Sat", value: 540 },
  { label: "Sun", value: 490 },
];

const earningsWeekly = [
  { day: "Sun", value: 3800 },
  { day: "Mon", value: 5200 },
  { day: "Tue", value: 4600 },
  { day: "Wed", value: 7100, highlighted: true },
  { day: "Thu", value: 6200 },
  { day: "Fri", value: 5800 },
  { day: "Sat", value: 4300 },
];

const earningsMetrics = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    color: "var(--ds-color-accent)",
    label: "Total Revenue",
    value: "$87.2k",
    progress: 82,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      </svg>
    ),
    color: "var(--ds-color-success)",
    label: "New Clients",
    value: "1,248",
    progress: 64,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: "var(--ds-color-warning)",
    label: "Profit Margin",
    value: "34.8%",
    progress: 48,
  },
];

const topProducts: TopProductItem[] = [
  { id: 1, rank: 1, name: "Smart Watch Pro", category: "Electronics", soldCount: 2841 },
  { id: 2, rank: 2, name: "Wireless Earbuds", category: "Electronics", soldCount: 2100 },
  { id: 3, rank: 3, name: "Portable Charger", category: "Accessories", soldCount: 1740 },
  { id: 4, rank: 4, name: "Laptop Stand", category: "Accessories", soldCount: 1320 },
];

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

const vehicleItems = [
  { label: "Incorrect Address", sublabel: "all exceptions", percentage: 83, color: "#28C76F", badge: "+10%" },
  { label: "Good", sublabel: "24 vehicles", percentage: 17, color: "#82868B", badge: "8.1" },
  { label: "Average", sublabel: "14 vehicles", percentage: 8, color: "#7367F0", badge: "-2.5%" },
  { label: "Bad", sublabel: "8 vehicles", percentage: 6, color: "#FF9F43", badge: "-3.4%" },
  { label: "Not Working", sublabel: "4 vehicles", percentage: 2, color: "#EA5455", badge: "+12.6%" },
];

const supportItems = [
  { icon: <span className="text-[11px] font-bold">#</span>, iconColor: "var(--ds-color-accent)", label: "New Tickets", value: "142" },
  { icon: <span className="text-[11px] font-bold">✓</span>, iconColor: "var(--ds-color-info)", label: "Open Tickets", value: "28" },
  { icon: <span className="text-[11px] font-bold">◷</span>, iconColor: "var(--ds-color-warning)", label: "Response Time", value: "1 Day" },
];

const revenueWeekly = [
  { day: "Mon", value: 3200 },
  { day: "Tue", value: 5400 },
  { day: "Wed", value: 4100 },
  { day: "Thu", value: 7800, highlighted: true },
  { day: "Fri", value: 6200 },
  { day: "Sat", value: 4900 },
  { day: "Sun", value: 5700 },
];

// ── Doc page ──────────────────────────────────────────────────────────────────

const DashboardCardsDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Dashboard Cards</h1>
      <p className="docs-paragraph">
        A suite of pre-built KPI and analytics cards for ERP dashboards. Each
        card owns its own layout, chart, and legend — drop any card into a grid
        without extra wiring.
      </p>

      {/* ── StatCard ──────────────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">StatCard</h2>
      <p className="docs-paragraph">
        A versatile metric card available in three sizes. Pass any chart
        component as the <code>chart</code> prop — the card adapts its layout
        based on <code>size</code> and <code>chartPosition</code>.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            size="md"
            title="Total Revenue"
            badge={{ value: "8.2%", direction: "up" }}
            value="$94,280"
            dateRange="Jan 1 – Jan 31, 2025"
            chart={
              <MiniNeonSparkline
                data={sparklinePoints}
                tone="info"
                height={52}
              />
            }
          />
          <StatCard
            size="sm"
            title="New Orders"
            badge={{ value: "3.1%", direction: "up" }}
            value="1,842"
            dateRange="This week"
          />
          <StatCard
            size="sm"
            title="Churn Rate"
            badge={{ value: "1.4%", direction: "down" }}
            value="2.8%"
            dateRange="Last 30 days"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { StatCard, MiniNeonSparkline } from 'erp-pro-ui';

<StatCard
  size="md"
  title="Total Revenue"
  badge={{ value: "8.2%", direction: "up" }}
  value="$94,280"
  dateRange="Jan 1 – Jan 31, 2025"
  chart={<MiniNeonSparkline data={sparklinePoints} tone="info" height={52} />}
/>

// Compact tile (no chart)
<StatCard
  size="sm"
  title="New Orders"
  badge={{ value: "3.1%", direction: "up" }}
  value="1,842"
  dateRange="This week"
/>`}
      />

      {/* ── EarningsCard ──────────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">EarningsCard</h2>
      <p className="docs-paragraph">
        Hero earnings card with a weekly bar chart and a 3-column metrics
        footer showing progress bars for each sub-metric.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <div className="max-w-120">
          <EarningsCard
            title="Earnings"
            subtitle="This week"
            value="$21,459"
            badge={{ value: "+15.6%", direction: "up" }}
            description="Compared to last week's $18,560"
            weeklyData={earningsWeekly}
            metrics={earningsMetrics}
          />
        </div>
      </div>

      <CodeBlock
        code={`import { EarningsCard } from 'erp-pro-ui';

<EarningsCard
  title="Earnings"
  subtitle="This week"
  value="$21,459"
  badge={{ value: "+15.6%", direction: "up" }}
  description="Compared to last week"
  weeklyData={[
    { day: "Mon", value: 5200 },
    { day: "Wed", value: 7100, highlighted: true },
    // ...7 days
  ]}
  metrics={[
    { icon: <RevenueIcon />, color: "var(--ds-color-accent)", label: "Total Revenue", value: "$87.2k", progress: 82 },
    { icon: <UsersIcon />,   color: "var(--ds-color-success)", label: "New Clients",   value: "1,248",  progress: 64 },
    { icon: <DollarIcon />,  color: "var(--ds-color-warning)", label: "Profit Margin", value: "34.8%", progress: 48 },
  ]}
/>`}
      />

      {/* ── SupportTrackerCard ────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">SupportTrackerCard</h2>
      <p className="docs-paragraph">
        Displays support KPIs alongside a segmented arc gauge that fills to the
        completion percentage.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <div className="max-w-105">
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
      </div>

      <CodeBlock
        code={`import { SupportTrackerCard } from 'erp-pro-ui';

<SupportTrackerCard
  title="Support Tracker"
  subtitle="Last 7 Days"
  total={164}
  totalLabel="Total Tickets"
  percentage={85}
  completedLabel="Completed Task"
  items={[
    { icon: <span>#</span>, iconColor: "var(--ds-color-accent)", label: "New Tickets",    value: "142" },
    { icon: <span>✓</span>, iconColor: "var(--ds-color-info)",   label: "Open Tickets",   value: "28" },
    { icon: <span>◷</span>, iconColor: "var(--ds-color-warning)", label: "Response Time", value: "1 Day" },
  ]}
/>`}
      />

      {/* ── SalesOverviewCard ─────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">SalesOverviewCard</h2>
      <p className="docs-paragraph">
        A two-metric card with a VS divider and a dual-color progress bar that
        visualises the split between orders and visitors — or any two competing
        values.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <div className="max-w-100">
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
      </div>

      <CodeBlock
        code={`import { SalesOverviewCard } from 'erp-pro-ui';

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
/>`}
      />

      {/* ── RevenueGrowthCard ─────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">RevenueGrowthCard</h2>
      <p className="docs-paragraph">
        Compact revenue card with a weekly bar chart. The trend badge appears
        below the hero value and inherits the highlight color.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <div className="max-w-90">
          <RevenueGrowthCard
            title="Revenue Growth"
            subtitle="Weekly summary"
            value="$28,450"
            badge={{ value: "+12.4%", direction: "up" }}
            weeklyData={revenueWeekly}
            highlightColor="#05cd99"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { RevenueGrowthCard } from 'erp-pro-ui';

<RevenueGrowthCard
  title="Revenue Growth"
  subtitle="Weekly summary"
  value="$28,450"
  badge={{ value: "+12.4%", direction: "up" }}
  weeklyData={[
    { day: "Mon", value: 3200 },
    { day: "Thu", value: 7800, highlighted: true },
    // ...7 days
  ]}
  highlightColor="#05cd99"
/>`}
      />

      {/* ── TopProductsCard ───────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">TopProductsCard</h2>
      <p className="docs-paragraph">
        A ranked product leaderboard with optional thumbnail images and sold
        count per item.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <div className="max-w-120">
          <TopProductsCard
            title="Top Products"
            items={topProducts}
          />
        </div>
      </div>

      <CodeBlock
        code={`import { TopProductsCard, type TopProductItem } from 'erp-pro-ui';

const items: TopProductItem[] = [
  { id: 1, rank: 1, name: "Smart Watch Pro", category: "Electronics", soldCount: 2841 },
  { id: 2, rank: 2, name: "Wireless Earbuds", category: "Electronics", soldCount: 2100 },
  { id: 3, rank: 3, name: "Portable Charger", category: "Accessories", soldCount: 1740, image: "/img/charger.png" },
];

<TopProductsCard title="Top Products" items={items} />`}
      />

      {/* ── ShipmentStatisticsCard ────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">ShipmentStatisticsCard</h2>
      <p className="docs-paragraph">
        Overlays a bar series (shipment volume) with a line series (delivery
        rate) on a shared axis using a recharts{" "}
        <code>ComposedChart</code>. Includes a month-selector dropdown for
        filtering the visible period.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <div className="max-w-170 w-full">
          <ShipmentStatisticsCard
            title="Shipment statistics"
            subtitle="Total number of deliveries 23.8k"
            data={shipmentData}
          />
        </div>
      </div>

      <CodeBlock
        code={`import { ShipmentStatisticsCard, type ShipmentDataPoint } from 'erp-pro-ui';

const data: ShipmentDataPoint[] = [
  { date: "1 Jan", shipment: 37, delivery: 21 },
  { date: "2 Jan", shipment: 40, delivery: 28 },
  // ...
];

<ShipmentStatisticsCard
  title="Shipment statistics"
  subtitle="Total number of deliveries 23.8k"
  data={data}
  shipmentColor="#FFB400"   // optional
  deliveryColor="#7367F0"   // optional
  // Controlled month selector:
  selectedMonth="January"
  onMonthChange={(m) => setMonth(m)}
/>`}
      />

      {/* ── VehicleConditionCard ──────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">VehicleConditionCard</h2>
      <p className="docs-paragraph">
        A status list where each row shows a mini SVG circular progress gauge,
        a colored label matching the arc, a description, and a right-side badge.
        Works for any categorical breakdown with percentage-based health scores.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <div className="max-w-95">
          <VehicleConditionCard
            title="Vehicle Condition"
            items={vehicleItems}
          />
        </div>
      </div>

      <CodeBlock
        code={`import { VehicleConditionCard, type VehicleConditionItem } from 'erp-pro-ui';

const items: VehicleConditionItem[] = [
  { label: "Incorrect Address", sublabel: "all exceptions", percentage: 83, color: "#28C76F", badge: "+10%" },
  { label: "Good",              sublabel: "24 vehicles",    percentage: 17, color: "#82868B", badge: "8.1"  },
  { label: "Average",           sublabel: "14 vehicles",    percentage: 8,  color: "#7367F0", badge: "-2.5%" },
  { label: "Bad",               sublabel: "8 vehicles",     percentage: 6,  color: "#FF9F43", badge: "-3.4%" },
  { label: "Not Working",       sublabel: "4 vehicles",     percentage: 2,  color: "#EA5455", badge: "+12.6%" },
];

<VehicleConditionCard title="Vehicle Condition" items={items} />`}
      />

      {/* ── Props reference ───────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">Props Reference</h2>

      <h3 className="mt-4 mb-2 text-sm font-semibold text-ds-1">ShipmentStatisticsCard</h3>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">data</td>
              <td><span className="docs-prop-type">ShipmentDataPoint[]</span></td>
              <td>—</td>
              <td>Array of <code>{`{ date, shipment, delivery }`}</code> data points</td>
            </tr>
            <tr>
              <td className="docs-prop-name">title</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>"Shipment statistics"</td>
              <td>Card heading</td>
            </tr>
            <tr>
              <td className="docs-prop-name">subtitle</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>—</td>
              <td>Secondary line shown below the title</td>
            </tr>
            <tr>
              <td className="docs-prop-name">months</td>
              <td><span className="docs-prop-type">string[]</span></td>
              <td>Jan–Dec</td>
              <td>Options shown in the month dropdown</td>
            </tr>
            <tr>
              <td className="docs-prop-name">selectedMonth</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>—</td>
              <td>Controlled selected month</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onMonthChange</td>
              <td><span className="docs-prop-type">(month: string) =&gt; void</span></td>
              <td>—</td>
              <td>Fires when the user selects a different month</td>
            </tr>
            <tr>
              <td className="docs-prop-name">shipmentColor</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>#FFB400</td>
              <td>Bar fill color</td>
            </tr>
            <tr>
              <td className="docs-prop-name">deliveryColor</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>#7367F0</td>
              <td>Line stroke color</td>
            </tr>
            <tr>
              <td className="docs-prop-name">yAxisFormatter</td>
              <td><span className="docs-prop-type">(v: number) =&gt; string</span></td>
              <td>v + "%"</td>
              <td>Formats Y-axis ticks and tooltip values</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 mb-2 text-sm font-semibold text-ds-1">VehicleConditionCard</h3>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">items</td>
              <td><span className="docs-prop-type">VehicleConditionItem[]</span></td>
              <td>—</td>
              <td>List items — each drives one row with a gauge, label, and badge</td>
            </tr>
            <tr>
              <td className="docs-prop-name">title</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>"Vehicle Condition"</td>
              <td>Card heading</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onMenuClick</td>
              <td><span className="docs-prop-type">() =&gt; void</span></td>
              <td>—</td>
              <td>Fires when the ⋯ menu button is clicked</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 mb-2 text-sm font-semibold text-ds-1">VehicleConditionItem fields</h3>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">label</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>Primary label — rendered in the item's color</td>
            </tr>
            <tr>
              <td className="docs-prop-name">sublabel</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>Secondary descriptor below the label</td>
            </tr>
            <tr>
              <td className="docs-prop-name">percentage</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>Arc fill value (0–100)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">color</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>CSS color for the gauge arc and label text</td>
            </tr>
            <tr>
              <td className="docs-prop-name">badge</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>Right-side badge content, e.g. "+10%", "8.1"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        previous={{ route: "/ui-basics/truncated-text", label: "Truncated Text" }}
      />
    </section>
  );
};

export default DashboardCardsDoc;
