import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";
import { AreaChart } from "./AreaChart";

const financeData = [
  { name: "Jan", revenue: 4200, expenses: 2500 },
  { name: "Feb", revenue: 3950, expenses: 2200 },
  { name: "Mar", revenue: 4600, expenses: 2800 },
  { name: "Apr", revenue: 5100, expenses: 3000 },
  { name: "May", revenue: 5450, expenses: 3250 },
  { name: "Jun", revenue: 5900, expenses: 3480 },
  { name: "Jul", revenue: 6400, expenses: 3700 },
];

const financeCategories = [
  { key: "revenue", color: "var(--ds-chart-1)" },
  { key: "expenses", color: "var(--ds-chart-5)" },
];

const demandData = [
  { name: "Week 1", inbound: 120, outbound: 90, returns: 22 },
  { name: "Week 2", inbound: 148, outbound: 106, returns: 26 },
  { name: "Week 3", inbound: 166, outbound: 124, returns: 20 },
  { name: "Week 4", inbound: 154, outbound: 132, returns: 18 },
  { name: "Week 5", inbound: 182, outbound: 148, returns: 24 },
];

const demandCategories = [
  { key: "inbound", color: "var(--ds-chart-2)" },
  { key: "outbound", color: "var(--ds-chart-3)" },
  { key: "returns", color: "var(--ds-chart-4)" },
];

const weeklyOpsData = [
  { name: "Mon", orders: 128, shipped: 110 },
  { name: "Tue", orders: 144, shipped: 119 },
  { name: "Wed", orders: 162, shipped: 141 },
  { name: "Thu", orders: 158, shipped: 148 },
  { name: "Fri", orders: 176, shipped: 163 },
  { name: "Sat", orders: 118, shipped: 104 },
  { name: "Sun", orders: 96, shipped: 89 },
];

const weeklyOpsCategories = [
  { key: "orders", color: "var(--ds-chart-2)" },
  { key: "shipped", color: "var(--ds-chart-3)" },
];

const monthlyRunRateData = [
  { name: "Jan", planned: 4200, actual: 3980 },
  { name: "Feb", planned: 4350, actual: 4260 },
  { name: "Mar", planned: 4520, actual: 4460 },
  { name: "Apr", planned: 4680, actual: 4540 },
  { name: "May", planned: 4850, actual: 4790 },
  { name: "Jun", planned: 5010, actual: 5120 },
  { name: "Jul", planned: 5200, actual: 5280 },
  { name: "Aug", planned: 5420, actual: 5370 },
  { name: "Sep", planned: 5610, actual: 5490 },
  { name: "Oct", planned: 5820, actual: 5710 },
  { name: "Nov", planned: 5980, actual: 6030 },
  { name: "Dec", planned: 6240, actual: 6320 },
];

const monthlyRunRateCategories = [
  { key: "planned", color: "var(--ds-chart-15)" },
  { key: "actual", color: "var(--ds-chart-1)" },
];

const yearlyGrowthData = [
  { name: "2021", recurring: 2.8, services: 1.3 },
  { name: "2022", recurring: 3.5, services: 1.5 },
  { name: "2023", recurring: 4.3, services: 1.8 },
  { name: "2024", recurring: 5.1, services: 2.0 },
  { name: "2025", recurring: 6.0, services: 2.3 },
];

const yearlyGrowthCategories = [
  { key: "recurring", color: "var(--ds-chart-2)" },
  { key: "services", color: "var(--ds-chart-4)" },
];

const meta: Meta<typeof AreaChart> = {
  title: "Data Display/AreaChart",
  component: AreaChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Area chart for trend readability with extra emphasis on volume over time.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    data: {
      control: false,
      description: "Timeline data with one or more numeric series.",
    },
    categories: {
      control: false,
      description: "Series keys and their colors.",
    },
    className: {
      control: false,
      description: "Custom classes for the outer container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RevenueVsExpenses: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <AreaChart
        data={financeData}
        categories={financeCategories}
        height={360}
        className="ui:px-2"
      />
    </StorySurface>
  ),
};

export const MultiSeriesDemandTracking: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <AreaChart
        data={demandData}
        categories={demandCategories}
        height={360}
        className="ui:px-2"
      />
    </StorySurface>
  ),
};

export const MinimalPresentation: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <AreaChart
        data={financeData}
        categories={[{ key: "revenue", color: "var(--ds-chart-1)" }]}
        height={320}
        showGrid={false}
        className="ui:px-2"
      />
    </StorySurface>
  ),
};

export const WeeklyFlowComparison: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Weekly orders versus shipped volume"
          description="Short-range comparison works well for operational pacing where the gap between planned and completed work matters each day."
        />
        <AreaChart
          data={weeklyOpsData}
          categories={weeklyOpsCategories}
          height={360}
          className="ui:px-2"
        />
      </StoryStack>
    </StorySurface>
  ),
};

export const ComparativeTimeRanges: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <StoryStack className="ui:gap-6">
        <StoryIntro
          title="Weekly, monthly, and yearly trend comparisons"
          description="Area charts stay readable across time scales when the comparison is about direction and distance between related series."
        />
        <div className="ui:grid ui:gap-4 xl:ui:grid-cols-3">
          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Weekly"
                description="Daily throughput rhythm for the current week."
              />
              <AreaChart
                data={weeklyOpsData}
                categories={weeklyOpsCategories}
                height={250}
                className="ui:px-1"
              />
            </StorySection>
          </StoryPanel>

          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Monthly"
                description="Planned versus actual run rate across the year."
              />
              <AreaChart
                data={monthlyRunRateData}
                categories={monthlyRunRateCategories}
                height={250}
                className="ui:px-1"
              />
            </StorySection>
          </StoryPanel>

          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Yearly"
                description="Long-range growth split by revenue stream."
              />
              <AreaChart
                data={yearlyGrowthData}
                categories={yearlyGrowthCategories}
                height={250}
                className="ui:px-1"
              />
            </StorySection>
          </StoryPanel>
        </div>
      </StoryStack>
    </StorySurface>
  ),
};
