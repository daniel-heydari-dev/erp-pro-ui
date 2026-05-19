import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { MiniNeonSparkline } from "../charts/MiniNeonSparkline";
import { ChartCard } from "./ChartCard";
import { StatCard } from "./StatCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / General / Gallery",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const weeklySpark = [
  { label: "Mon", value: 42100 },
  { label: "Tue", value: 48300 },
  { label: "Wed", value: 45180 },
  { label: "Thu", value: 51060 },
  { label: "Fri", value: 57090 },
  { label: "Sat", value: 28400 },
  { label: "Sun", value: 19270 },
];

export const Default: Story = {
  name: "All General Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="General Cards"
        description="Domain-agnostic building blocks. StatCard covers every KPI — pick sm for tight strips, md for featured metrics, lg for hero stats. ChartCard wraps any Recharts or custom chart."
      />

      <StorySection title="StatCard — sm (compact strip)">
        <StoryStack direction="horizontal" wrap>
          {[
            { title: "Revenue",    value: "€2.47M", badge: { value: "+17.6%", direction: "up"   as const }, dateRange: "This year" },
            { title: "Orders",     value: "1,284",  badge: { value: "+12.1%", direction: "up"   as const }, dateRange: "This month" },
            { title: "Avg Order",  value: "€487",   badge: { value: "+5.4%",  direction: "up"   as const }, dateRange: "excl. returns" },
            { title: "Return Rate",value: "2.1%",   badge: { value: "-0.8%",  direction: "down" as const }, dateRange: "of all orders" },
            { title: "Stock Value",value: "€48K",   badge: { value: "+3.1%",  direction: "up"   as const }, dateRange: "at buy price" },
          ].map((p) => (
            <div key={p.title} className="w-[200px]">
              <StatCard size="sm" {...p} />
            </div>
          ))}
        </StoryStack>
      </StorySection>

      <StorySection title="StatCard — md (featured metric)">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[260px]">
            <StatCard
              size="md"
              title="Monthly Revenue"
              value="€558K"
              badge={{ value: "+12.1%", direction: "up" }}
              dateRange="May 2025"
            />
          </div>
          <div className="w-[260px]">
            <StatCard
              size="md"
              title="Active Customers"
              value="342"
              badge={{ value: "+18", direction: "up" }}
              dateRange="New this month"
            />
          </div>
          <div className="w-[260px]">
            <StatCard
              size="md"
              title="Gross Margin"
              value="34.0%"
              badge={{ value: "+2.4%", direction: "up" }}
              dateRange="vs last year"
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="ChartCard — sparkline">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[320px]">
            <ChartCard
              title="Weekly Revenue"
              dateRange="Mon – Sun"
              legend={[{ label: "Revenue", color: "#22c55e" }]}
            >
              <div style={{ height: 120 }}>
                <MiniNeonSparkline data={weeklySpark} color="#22c55e" />
              </div>
            </ChartCard>
          </div>
          <div className="w-[320px]">
            <ChartCard
              title="Weekly Orders"
              dateRange="Mon – Sun"
              legend={[{ label: "Orders", color: "var(--ds-color-accent)" }]}
            >
              <div style={{ height: 120 }}>
                <MiniNeonSparkline
                  data={[
                    { label: "Mon", value: 18 },
                    { label: "Tue", value: 22 },
                    { label: "Wed", value: 19 },
                    { label: "Thu", value: 25 },
                    { label: "Fri", value: 28 },
                    { label: "Sat", value: 14 },
                    { label: "Sun", value: 4  },
                  ]}
                  color="var(--ds-color-accent)"
                />
              </div>
            </ChartCard>
          </div>
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};
