import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { ChartCard } from "./ChartCard";

const salesData = [
  { month: "Jan", value: 420 },
  { month: "Feb", value: 465 },
  { month: "Mar", value: 510 },
  { month: "Apr", value: 548 },
  { month: "May", value: 592 },
  { month: "Jun", value: 625 },
];

const multiSeriesData = [
  { month: "Jan", online: 280, offline: 140 },
  { month: "Feb", online: 310, offline: 155 },
  { month: "Mar", online: 340, offline: 170 },
  { month: "Apr", online: 370, offline: 178 },
  { month: "May", online: 395, offline: 197 },
  { month: "Jun", online: 420, offline: 205 },
];

const meta: Meta<typeof ChartCard> = {
  title: "Data Display / Dashboard Cards / General / ChartCard",
  component: ChartCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Generic card wrapper for any chart — provides a consistent header with title, date range, legend, and menu button.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    dateRange: { control: "text", description: "Optional date range subtitle." },
    legend: {
      control: false,
      description: "Legend items with label and color dot, shown in the header.",
    },
    children: {
      control: false,
      description: "Any chart component rendered as the card body.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
    onMenuClick: { control: false, description: "Callback for the ellipsis menu button." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { ChartCard } from 'erp-pro-ui';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', value: 420 },
  { month: 'Feb', value: 465 },
  { month: 'Mar', value: 510 },
];

export function ChartCardExample() {
  return (
    <ChartCard title="Monthly Sales" dateRange="Jan 2024 – Jun 2024">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={28} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ds-color-fg-muted)' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--ds-color-fg-muted)' }} />
          <Bar dataKey="value" fill="var(--ds-chart-2)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <ChartCard title="Monthly Sales" dateRange="Jan 2024 – Jun 2024">
        <ResponsiveContainer width="100%" height={260}>
          <RechartsBarChart
            data={salesData}
            barSize={28}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--ds-color-fg-muted)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--ds-color-fg-muted)" }}
            />
            <Bar
              dataKey="value"
              fill="var(--ds-chart-2)"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </ChartCard>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const withLegendSource = `import { ChartCard } from 'erp-pro-ui';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', online: 280, offline: 140 },
  { month: 'Feb', online: 310, offline: 155 },
];

export function ChartCardWithLegendExample() {
  return (
    <ChartCard
      title="Channel Breakdown"
      dateRange="Jan – Jun 2024"
      legend={[
        { label: 'Online', color: 'var(--ds-chart-2)' },
        { label: 'Offline', color: 'var(--ds-chart-4)' },
      ]}
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={20} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ds-color-fg-muted)' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--ds-color-fg-muted)' }} />
          <Bar dataKey="online" fill="var(--ds-chart-2)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="offline" fill="var(--ds-chart-4)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}`;

export const WithLegend: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="With legend"
          description="Pass legend items to display colored dot labels next to the menu button in the card header."
        />
        <StorySection>
          <ChartCard
            title="Channel Breakdown"
            dateRange="Jan – Jun 2024"
            legend={[
              { label: "Online", color: "var(--ds-chart-2)" },
              { label: "Offline", color: "var(--ds-chart-4)" },
            ]}
          >
            <ResponsiveContainer width="100%" height={260}>
              <RechartsBarChart
                data={multiSeriesData}
                barSize={20}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--ds-color-fg-muted)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "var(--ds-color-fg-muted)" }}
                />
                <Bar
                  dataKey="online"
                  fill="var(--ds-chart-2)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="offline"
                  fill="var(--ds-chart-4)"
                  radius={[4, 4, 0, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartCard>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: withLegendSource } },
  },
};
