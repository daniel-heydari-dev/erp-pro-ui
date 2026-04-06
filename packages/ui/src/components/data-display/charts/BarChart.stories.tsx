import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";
import { BarChart } from "./BarChart";

const monthlyData = [
  { name: "Jan", fulfilled: 420, delayed: 38 },
  { name: "Feb", fulfilled: 465, delayed: 29 },
  { name: "Mar", fulfilled: 510, delayed: 34 },
  { name: "Apr", fulfilled: 548, delayed: 22 },
  { name: "May", fulfilled: 592, delayed: 18 },
  { name: "Jun", fulfilled: 625, delayed: 26 },
];

const monthlyCategories = [
  { key: "fulfilled", color: "var(--ds-chart-2)" },
  { key: "delayed", color: "var(--ds-chart-4)" },
];

const rankingData = [
  { name: "North Distribution Hub", transfers: 128 },
  { name: "Central Returns Team", transfers: 102 },
  { name: "West Picking Zone", transfers: 94 },
  { name: "Airport Forwarding Desk", transfers: 77 },
];

const weeklyTrafficData = [
  { name: "Mon", desktop: 224, mobile: 198 },
  { name: "Tue", desktop: 246, mobile: 214 },
  { name: "Wed", desktop: 268, mobile: 229 },
  { name: "Thu", desktop: 258, mobile: 241 },
  { name: "Fri", desktop: 284, mobile: 256 },
  { name: "Sat", desktop: 198, mobile: 188 },
  { name: "Sun", desktop: 176, mobile: 169 },
];

const weeklyTrafficCategories = [
  { key: "desktop", color: "var(--ds-chart-2)" },
  { key: "mobile", color: "var(--ds-chart-1)" },
];

const monthlyEfficiencyData = [
  { name: "Jan", actual: 82, target: 76 },
  { name: "Feb", actual: 88, target: 79 },
  { name: "Mar", actual: 91, target: 83 },
  { name: "Apr", actual: 87, target: 84 },
  { name: "May", actual: 94, target: 86 },
  { name: "Jun", actual: 97, target: 89 },
  { name: "Jul", actual: 96, target: 90 },
  { name: "Aug", actual: 101, target: 92 },
  { name: "Sep", actual: 98, target: 93 },
  { name: "Oct", actual: 104, target: 95 },
  { name: "Nov", actual: 109, target: 97 },
  { name: "Dec", actual: 112, target: 100 },
];

const monthlyEfficiencyCategories = [
  { key: "actual", color: "var(--ds-chart-3)" },
  { key: "target", color: "var(--ds-chart-15)" },
];

const yearlyPortfolioData = [
  { name: "2021", enterprise: 62, smb: 41 },
  { name: "2022", enterprise: 71, smb: 48 },
  { name: "2023", enterprise: 83, smb: 57 },
  { name: "2024", enterprise: 94, smb: 64 },
  { name: "2025", enterprise: 108, smb: 73 },
];

const yearlyPortfolioCategories = [
  { key: "enterprise", color: "var(--ds-chart-2)" },
  { key: "smb", color: "var(--ds-chart-4)" },
];

const meta: Meta<typeof BarChart> = {
  title: "Data Display/BarChart",
  component: BarChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Bar chart for comparing distinct buckets rather than continuous change.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "radio", options: ["horizontal", "vertical"] },
    height: { control: "number" },
    data: { control: false, description: "Bucketed chart data." },
    categories: { control: false, description: "Series keys and bar colors." },
    className: {
      control: false,
      description: "Custom classes for the outer container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const monthlyBarSource = `import { BarChart, type BarChartData } from 'erp-pro-ui';

const data: BarChartData[] = [
  { name: 'Jan', fulfilled: 420, delayed: 38 },
  { name: 'Feb', fulfilled: 465, delayed: 29 },
  { name: 'Mar', fulfilled: 510, delayed: 34 },
];

export function MonthlyBarChartExample() {
  return (
    <BarChart
      data={data}
      categories={[
        { key: 'fulfilled', color: 'var(--ds-chart-2)' },
        { key: 'delayed', color: 'var(--ds-chart-4)' },
      ]}
      height={360}
    />
  );
}`;

const rankingBarSource = `import { BarChart, type BarChartData } from 'erp-pro-ui';

const data: BarChartData[] = [
  { name: 'North Distribution Hub', transfers: 128 },
  { name: 'Central Returns Team', transfers: 102 },
  { name: 'West Picking Zone', transfers: 94 },
];

export function RankingBarChartExample() {
  return (
    <BarChart
      data={data}
      categories={[{ key: 'transfers', color: 'var(--ds-chart-3)' }]}
      height={360}
      layout="vertical"
    />
  );
}`;

const weeklyDeviceSource = `import { BarChart, type BarChartData } from 'erp-pro-ui';

const data: BarChartData[] = [
  { name: 'Mon', desktop: 224, mobile: 198 },
  { name: 'Tue', desktop: 246, mobile: 214 },
  { name: 'Wed', desktop: 268, mobile: 229 },
];

export function WeeklyDeviceBarChartExample() {
  return (
    <BarChart
      data={data}
      categories={[
        { key: 'desktop', color: 'var(--ds-chart-2)' },
        { key: 'mobile', color: 'var(--ds-chart-1)' },
      ]}
      height={360}
    />
  );
}`;

const yearlyPortfolioSource = `import { BarChart, type BarChartData } from 'erp-pro-ui';

const data: BarChartData[] = [
  { name: '2023', enterprise: 83, smb: 57 },
  { name: '2024', enterprise: 94, smb: 64 },
  { name: '2025', enterprise: 108, smb: 73 },
];

export function YearlyPortfolioBarChartExample() {
  return (
    <BarChart
      data={data}
      categories={[
        { key: 'enterprise', color: 'var(--ds-chart-2)' },
        { key: 'smb', color: 'var(--ds-chart-4)' },
      ]}
      height={360}
    />
  );
}`;

const comparativeBarSource = `import { BarChart, type BarChartData } from 'erp-pro-ui';

const weeklyData: BarChartData[] = [
  { name: 'Mon', desktop: 224, mobile: 198 },
  { name: 'Tue', desktop: 246, mobile: 214 },
  { name: 'Wed', desktop: 268, mobile: 229 },
];

const monthlyData: BarChartData[] = [
  { name: 'Jan', actual: 82, target: 76 },
  { name: 'Feb', actual: 88, target: 79 },
  { name: 'Mar', actual: 91, target: 83 },
];

const yearlyData: BarChartData[] = [
  { name: '2023', enterprise: 83, smb: 57 },
  { name: '2024', enterprise: 94, smb: 64 },
  { name: '2025', enterprise: 108, smb: 73 },
];

export function ComparativeBarChartsExample() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <BarChart data={weeklyData} categories={[{ key: 'desktop', color: 'var(--ds-chart-2)' }, { key: 'mobile', color: 'var(--ds-chart-1)' }]} height={260} />
      <BarChart data={monthlyData} categories={[{ key: 'actual', color: 'var(--ds-chart-3)' }, { key: 'target', color: 'var(--ds-chart-15)' }]} height={260} />
      <BarChart data={yearlyData} categories={[{ key: 'enterprise', color: 'var(--ds-chart-2)' }, { key: 'smb', color: 'var(--ds-chart-4)' }]} height={260} />
    </div>
  );
}`;

export const MonthlyComparison: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <BarChart
        data={monthlyData}
        categories={monthlyCategories}
        height={360}
        className="ui:px-2"
      />
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: monthlyBarSource,
      },
    },
  },
};

export const RankingLayout: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <BarChart
        data={rankingData}
        categories={[{ key: "transfers", color: "var(--ds-chart-3)" }]}
        height={360}
        layout="vertical"
        className="ui:px-2"
      />
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: rankingBarSource,
      },
    },
  },
};

export const WeeklyDeviceComparison: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Weekly desktop vs mobile traffic"
          description="A short time horizon works well for day-over-day comparison between two channels or teams."
        />
        <BarChart
          data={weeklyTrafficData}
          categories={weeklyTrafficCategories}
          height={360}
          className="ui:px-2"
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: weeklyDeviceSource,
      },
    },
  },
};

export const YearlyPortfolioComparison: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Yearly enterprise vs SMB rollup"
          description="Longer time ranges read best when the bars compare two persistent segments with the same definition each year."
        />
        <BarChart
          data={yearlyPortfolioData}
          categories={yearlyPortfolioCategories}
          height={360}
          className="ui:px-2"
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: yearlyPortfolioSource,
      },
    },
  },
};

export const ComparativeTimeRanges: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <StoryStack className="ui:gap-6">
        <StoryIntro
          title="Comparative patterns across week, month, and year"
          description="Use the same chart primitive across different time scales by keeping the series meaning stable and only changing the bucket size."
        />
        <div className="ui:grid ui:gap-4 xl:ui:grid-cols-3">
          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Weekly"
                description="Daily channel comparison for the current week."
              />
              <BarChart
                data={weeklyTrafficData}
                categories={weeklyTrafficCategories}
                height={260}
                className="ui:px-1"
              />
            </StorySection>
          </StoryPanel>

          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Monthly"
                description="Actual versus target over the full operating year."
              />
              <BarChart
                data={monthlyEfficiencyData}
                categories={monthlyEfficiencyCategories}
                height={260}
                className="ui:px-1"
              />
            </StorySection>
          </StoryPanel>

          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Yearly"
                description="Segment comparison across annual planning cycles."
              />
              <BarChart
                data={yearlyPortfolioData}
                categories={yearlyPortfolioCategories}
                height={260}
                className="ui:px-1"
              />
            </StorySection>
          </StoryPanel>
        </div>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: comparativeBarSource,
      },
    },
  },
};
