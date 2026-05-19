import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { EarningsCard } from "./EarningsCard";
import type { EarningsMetric, WeeklyBarPoint } from "./EarningsCard";

const defaultWeeklyData: WeeklyBarPoint[] = [
  { day: "M", value: 60 },
  { day: "T", value: 75 },
  { day: "W", value: 55 },
  { day: "T", value: 90 },
  { day: "F", value: 80, highlighted: true },
  { day: "S", value: 50 },
  { day: "S", value: 40 },
];

const defaultMetrics: EarningsMetric[] = [
  {
    icon: "💰",
    color: "var(--ds-color-success)",
    label: "Net Profit",
    value: "$12.4k",
    progress: 72,
  },
  {
    icon: "🛒",
    color: "var(--ds-color-warning)",
    label: "Total Orders",
    value: "3,842",
    progress: 58,
  },
  {
    icon: "↩️",
    color: "var(--ds-color-danger)",
    label: "Returns",
    value: "186",
    progress: 24,
  },
];

const alternateMetrics: EarningsMetric[] = [
  {
    icon: "📦",
    color: "var(--ds-color-info)",
    label: "Shipments",
    value: "2,910",
    progress: 81,
  },
  {
    icon: "⭐",
    color: "var(--ds-color-warning)",
    label: "Reviews",
    value: "1,204",
    progress: 64,
  },
  {
    icon: "👥",
    color: "var(--ds-color-success)",
    label: "New Customers",
    value: "438",
    progress: 45,
  },
];

const meta: Meta<typeof EarningsCard> = {
  title: "Data Display / Dashboard Cards / Dashboard / EarningsCard",
  component: EarningsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Hero earnings card with weekly bar chart and a 3-column metrics footer with progress bars.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    subtitle: { control: "text", description: "Secondary subtitle beneath the title." },
    value: { control: "text", description: "Hero metric value (e.g. '$468')." },
    badge: {
      control: false,
      description: "Trend badge with value and direction shown next to the hero metric.",
    },
    description: {
      control: "text",
      description: "Small description text below the hero value.",
    },
    weeklyData: {
      control: false,
      description: "7-point weekly bar data (one entry per day).",
    },
    metrics: {
      control: false,
      description: "Exactly 3 metric items shown in the footer strip.",
    },
    size: {
      control: "radio",
      options: ["md", "lg"],
      description: 'Layout size. "md" = side-by-side chart (default). "lg" = full-width chart, larger typography.',
    },
    className: { control: false, description: "Custom classes for the outer container." },
    onMenuClick: { control: false, description: "Callback for the ellipsis menu button." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { EarningsCard } from 'erp-pro-ui';
import type { EarningsMetric, WeeklyBarPoint } from 'erp-pro-ui';

const weeklyData: WeeklyBarPoint[] = [
  { day: 'M', value: 60 },
  { day: 'T', value: 75 },
  { day: 'W', value: 55 },
  { day: 'T', value: 90 },
  { day: 'F', value: 80, highlighted: true },
  { day: 'S', value: 50 },
  { day: 'S', value: 40 },
];

const metrics: EarningsMetric[] = [
  { icon: '💰', color: 'var(--ds-color-success)', label: 'Net Profit', value: '$12.4k', progress: 72 },
  { icon: '🛒', color: 'var(--ds-color-warning)', label: 'Total Orders', value: '3,842', progress: 58 },
  { icon: '↩️', color: 'var(--ds-color-danger)', label: 'Returns', value: '186', progress: 24 },
];

export function EarningsCardExample() {
  return (
    <EarningsCard
      value="$468"
      badge={{ value: "+12.5%", direction: "up" }}
      description="Total earnings this week, compared to last week."
      weeklyData={weeklyData}
      metrics={metrics}
    />
  );
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <EarningsCard
        value="$468"
        badge={{ value: "+12.5%", direction: "up" }}
        description="Total earnings this week, compared to last week."
        weeklyData={defaultWeeklyData}
        metrics={defaultMetrics}
      />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const differentMetricsSource = `import { EarningsCard } from 'erp-pro-ui';

export function EarningsCardShippingExample() {
  return (
    <EarningsCard
      title="Logistics Summary"
      subtitle="Weekly Overview"
      value="2,910"
      badge={{ value: "+5.2%", direction: "up" }}
      weeklyData={weeklyData}
      metrics={[
        { icon: '📦', color: 'var(--ds-color-info)', label: 'Shipments', value: '2,910', progress: 81 },
        { icon: '⭐', color: 'var(--ds-color-warning)', label: 'Reviews', value: '1,204', progress: 64 },
        { icon: '👥', color: 'var(--ds-color-success)', label: 'New Customers', value: '438', progress: 45 },
      ]}
    />
  );
}`;

export const DifferentMetrics: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Custom metrics"
          description="Swap out the three footer metrics to match any business domain — shipments, reviews, customer acquisition, etc."
        />
        <StorySection>
          <EarningsCard
            title="Logistics Summary"
            subtitle="Weekly Overview"
            value="2,910"
            badge={{ value: "+5.2%", direction: "up" }}
            weeklyData={defaultWeeklyData}
            metrics={alternateMetrics}
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: differentMetricsSource } },
  },
};

const largeSource = `import { EarningsCard } from 'erp-pro-ui';

<EarningsCard
  size="lg"
  value="$468"
  badge={{ value: "+12.5%", direction: "up" }}
  description="Total earnings this week, compared to last week."
  weeklyData={weeklyData}
  metrics={metrics}
/>`;

export const Large: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title='size="lg"'
          description="Full-width bar chart below the hero value with larger typography and a roomier metrics strip."
        />
        <StorySection>
          <EarningsCard
            size="lg"
            value="$468"
            badge={{ value: "+12.5%", direction: "up" }}
            description="Total earnings this week, compared to last week."
            weeklyData={defaultWeeklyData}
            metrics={defaultMetrics}
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: largeSource } },
  },
};
