import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";
import { MiniNeonSparkline } from "../charts/MiniNeonSparkline";

import { StatCard } from "./StatCard";

const sparklineData = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 51 },
  { label: "Thu", value: 67 },
  { label: "Fri", value: 74 },
  { label: "Sat", value: 63 },
  { label: "Sun", value: 82 },
];

const meta: Meta<typeof StatCard> = {
  title: "Data Display/Dashboard Cards/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Versatile KPI metric card in three sizes (sm/md/lg). Accepts any chart as a ReactNode child.",
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description:
        "Layout size: sm = metric only, md = metric + compact side chart, lg = metric header + full-width chart below.",
    },
    title: { control: "text", description: "Card heading label." },
    value: { control: false, description: "Hero metric value (ReactNode)." },
    dateRange: { control: "text", description: "Date range caption below the value." },
    badge: { control: false, description: "Trend badge with value and direction." },
    chart: { control: false, description: "Any chart component rendered as ReactNode." },
    chartPosition: {
      control: "radio",
      options: ["side", "bottom"],
      description: 'Controls chart placement in size="md": side or bottom.',
    },
    chartClassName: {
      control: false,
      description: "Override class on the chart container div.",
    },
    legend: {
      control: false,
      description: "Legend items shown in the header (only visible when size=lg).",
    },
    className: { control: false, description: "Custom classes for the outer container." },
    onMenuClick: { control: false, description: "Callback for the ellipsis menu button." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { StatCard } from 'erp-pro-ui';
import { MiniNeonSparkline } from 'erp-pro-ui';

const sparklineData = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 58 },
  { label: 'Wed', value: 51 },
  { label: 'Thu', value: 67 },
  { label: 'Fri', value: 74 },
  { label: 'Sat', value: 63 },
  { label: 'Sun', value: 82 },
];

export function StatCardExample() {
  return (
    <StatCard
      size="md"
      title="Total Revenue"
      badge={{ value: "+12.4%", direction: "up" }}
      value="$84,254"
      dateRange="Jan 2024 – Jun 2024"
      chart={<MiniNeonSparkline data={sparklineData} tone="success" height={46} />}
    />
  );
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <StatCard
        size="md"
        title="Total Revenue"
        badge={{ value: "+12.4%", direction: "up" }}
        value="$84,254"
        dateRange="Jan 2024 – Jun 2024"
        chart={
          <MiniNeonSparkline data={sparklineData} tone="success" height={46} />
        }
      />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const compactSource = `import { StatCard } from 'erp-pro-ui';

export function CompactStatCardExample() {
  return (
    <StatCard
      size="sm"
      title="Active Orders"
      badge={{ value: "-3.1%", direction: "down" }}
      value="1,482"
      dateRange="Last 30 days"
    />
  );
}`;

export const Compact: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xs">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Small — metric only"
          description="Use size=sm for dense dashboard grids where chart space is not available."
        />
        <StatCard
          size="sm"
          title="Active Orders"
          badge={{ value: "-3.1%", direction: "down" }}
          value="1,482"
          dateRange="Last 30 days"
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: compactSource } },
  },
};

const largeSource = `import { StatCard } from 'erp-pro-ui';
import { MiniNeonSparkline } from 'erp-pro-ui';

const sparklineData = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 58 },
  { label: 'Wed', value: 74 },
  { label: 'Sun', value: 82 },
];

export function LargeStatCardExample() {
  return (
    <StatCard
      size="lg"
      title="Monthly Sessions"
      badge={{ value: "+8.7%", direction: "up" }}
      value="248,913"
      dateRange="Apr 2024 – Jun 2024"
      legend={[
        { label: "Desktop", color: "var(--ds-chart-2)" },
        { label: "Mobile", color: "var(--ds-chart-1)" },
      ]}
      chart={<MiniNeonSparkline data={sparklineData} tone="info" height={100} />}
    />
  );
}`;

export const LargeWithChart: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Large — full-width chart"
          description="Use size=lg when the chart deserves its own row below the metric header."
        />
        <StatCard
          size="lg"
          title="Monthly Sessions"
          badge={{ value: "+8.7%", direction: "up" }}
          value="248,913"
          dateRange="Apr 2024 – Jun 2024"
          legend={[
            { label: "Desktop", color: "var(--ds-chart-2)" },
            { label: "Mobile", color: "var(--ds-chart-1)" },
          ]}
          chart={
            <MiniNeonSparkline data={sparklineData} tone="info" height={100} />
          }
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: largeSource } },
  },
};

const sizesSource = `import { StatCard } from 'erp-pro-ui';

export function StatCardSizesExample() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard size="sm" title="Orders" value="1,482" dateRange="Last 30 days" />
      <StatCard size="md" title="Revenue" value="$84,254" dateRange="Last 30 days" />
      <StatCard size="lg" title="Sessions" value="248,913" dateRange="Last 30 days" />
    </div>
  );
}`;

export const AllSizes: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="All three sizes"
          description="sm, md, and lg side-by-side for quick visual comparison."
        />
        <StorySection>
          <div className="ui:grid ui:gap-4 ui:sm:grid-cols-3">
            <StatCard
              size="sm"
              title="Orders"
              value="1,482"
              dateRange="Last 30 days"
            />
            <StatCard
              size="md"
              title="Revenue"
              value="$84,254"
              dateRange="Last 30 days"
              chart={
                <MiniNeonSparkline
                  data={sparklineData}
                  tone="warning"
                  height={46}
                />
              }
            />
            <StatCard
              size="md"
              title="Sessions"
              value="248,913"
              dateRange="Last 30 days"
              badge={{ value: "+5.2%", direction: "up" }}
              chart={
                <MiniNeonSparkline
                  data={sparklineData}
                  tone="danger"
                  height={46}
                />
              }
            />
          </div>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: sizesSource } },
  },
};
