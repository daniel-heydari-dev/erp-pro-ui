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
import { StatCard } from "./StatCard";
import { TopProductsCard } from "./TopProductsCard";

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
  title: "Data Display/Dashboard Cards",
  parameters: { layout: "padded" },
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
