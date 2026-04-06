import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";
import { PieChart } from "./PieChart";

const productMixData = [
  { name: "Software", value: 420 },
  { name: "Hardware", value: 260 },
  { name: "Services", value: 210 },
  { name: "Cloud", value: 160 },
];

const resolutionData = [
  { name: "Resolved", value: 68 },
  { name: "Escalated", value: 18 },
  { name: "Pending", value: 14 },
];

const weeklyChannelMix = [
  { name: "Desktop", value: 312 },
  { name: "Mobile", value: 284 },
  { name: "Tablet", value: 61 },
  { name: "Partner", value: 47 },
];

const monthlyDemandMix = [
  { name: "Retail", value: 428 },
  { name: "Marketplace", value: 316 },
  { name: "Wholesale", value: 218 },
  { name: "Direct", value: 164 },
];

const yearlyPortfolioMix = [
  { name: "Subscriptions", value: 52 },
  { name: "Services", value: 21 },
  { name: "Support", value: 15 },
  { name: "Training", value: 12 },
];

const weeklyColors = [
  "var(--ds-chart-1)",
  "var(--ds-chart-2)",
  "var(--ds-chart-3)",
  "var(--ds-chart-4)",
];

const monthlyColors = [
  "var(--ds-chart-2)",
  "var(--ds-chart-4)",
  "var(--ds-chart-1)",
  "var(--ds-chart-15)",
];

const yearlyColors = [
  "var(--ds-chart-3)",
  "var(--ds-chart-2)",
  "var(--ds-chart-4)",
  "var(--ds-chart-15)",
];

const formatCompactValue = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return new Intl.NumberFormat().format(value);
};

const meta: Meta<typeof PieChart> = {
  title: "Data Display/PieChart",
  component: PieChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pie and donut charts for distribution summaries and share-of-total views.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["pie", "donut"] },
    height: { control: "number" },
    showCenterSummary: { control: "boolean" },
    centerLabel: { control: "text" },
    valueFormatter: { control: false },
    data: { control: false, description: "Slice data as name/value pairs." },
    colors: {
      control: false,
      description: "Color palette used for slice rendering.",
    },
    className: {
      control: false,
      description: "Custom classes for the outer container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const donutDistributionSource = `import { PieChart, type PieChartData } from 'erp-pro-ui';

const data: PieChartData[] = [
  { name: 'Software', value: 420 },
  { name: 'Hardware', value: 260 },
  { name: 'Services', value: 210 },
  { name: 'Cloud', value: 160 },
];

export function DonutDistributionExample() {
  return (
    <PieChart
      data={data}
      colors={['var(--ds-chart-1)', 'var(--ds-chart-2)', 'var(--ds-chart-3)', 'var(--ds-chart-4)']}
      variant="donut"
      height={320}
      centerLabel="Visitors"
    />
  );
}`;

const compactStatusSplitSource = `import { PieChart, type PieChartData } from 'erp-pro-ui';

const data: PieChartData[] = [
  { name: 'Resolved', value: 68 },
  { name: 'Escalated', value: 18 },
  { name: 'Pending', value: 14 },
];

export function CompactStatusSplitExample() {
  return (
    <PieChart
      data={data}
      colors={['var(--ds-chart-3)', 'var(--ds-chart-4)', 'var(--ds-chart-5)']}
      variant="pie"
      height={320}
    />
  );
}`;

const weeklyChannelDistributionSource = `import { PieChart, type PieChartData } from 'erp-pro-ui';

const data: PieChartData[] = [
  { name: 'Desktop', value: 312 },
  { name: 'Mobile', value: 284 },
  { name: 'Tablet', value: 61 },
  { name: 'Partner', value: 47 },
];

export function WeeklyChannelDistributionExample() {
  return (
    <PieChart
      data={data}
      colors={['var(--ds-chart-1)', 'var(--ds-chart-2)', 'var(--ds-chart-3)', 'var(--ds-chart-4)']}
      variant="donut"
      height={320}
      centerLabel="Sessions"
    />
  );
}`;

const comparativePieSource = `import { PieChart, type PieChartData } from 'erp-pro-ui';

const weeklyData: PieChartData[] = [
  { name: 'Desktop', value: 312 },
  { name: 'Mobile', value: 284 },
  { name: 'Tablet', value: 61 },
];

const monthlyData: PieChartData[] = [
  { name: 'Retail', value: 428 },
  { name: 'Marketplace', value: 316 },
  { name: 'Wholesale', value: 218 },
];

const yearlyData: PieChartData[] = [
  { name: 'Subscriptions', value: 52 },
  { name: 'Services', value: 21 },
  { name: 'Support', value: 15 },
];

export function ComparativePieChartsExample() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <PieChart data={weeklyData} colors={['var(--ds-chart-1)', 'var(--ds-chart-2)', 'var(--ds-chart-4)']} variant="donut" height={250} centerLabel="Weekly" />
      <PieChart data={monthlyData} colors={['var(--ds-chart-2)', 'var(--ds-chart-4)', 'var(--ds-chart-1)']} variant="donut" height={250} centerLabel="Monthly" />
      <PieChart data={yearlyData} colors={['var(--ds-chart-3)', 'var(--ds-chart-2)', 'var(--ds-chart-4)']} variant="pie" height={250} />
    </div>
  );
}`;

const centerSummarySource = `import { PieChart, type PieChartData } from 'erp-pro-ui';

const data: PieChartData[] = [
  { name: 'Retail', value: 428 },
  { name: 'Marketplace', value: 316 },
  { name: 'Wholesale', value: 218 },
  { name: 'Direct', value: 164 },
];

export function PieChartCenterSummaryExample() {
  return (
    <PieChart
      data={data}
      colors={['var(--ds-chart-2)', 'var(--ds-chart-4)', 'var(--ds-chart-1)', 'var(--ds-chart-15)']}
      variant="donut"
      height={340}
      centerLabel="Demand"
    />
  );
}`;

const customCenterSource = `import { PieChart, type PieChartData } from 'erp-pro-ui';

const data: PieChartData[] = [
  { name: 'Software', value: 420 },
  { name: 'Hardware', value: 260 },
  { name: 'Services', value: 210 },
  { name: 'Cloud', value: 160 },
];

export function CustomPieChartCenterExample() {
  return (
    <PieChart
      data={data}
      colors={['var(--ds-chart-1)', 'var(--ds-chart-2)', 'var(--ds-chart-3)', 'var(--ds-chart-4)']}
      variant="donut"
      height={340}
      centerLabel="Mix"
      renderCenterContent={({ displayLabel, displayValue, valueFormatter }) => (
        <div className="flex min-w-32 flex-col items-center rounded-2xl border px-4 py-3 text-center backdrop-blur-md">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{displayLabel}</p>
          <p className="mt-1 text-2xl font-semibold">{valueFormatter(displayValue)}</p>
        </div>
      )}
    />
  );
}`;

export const DonutDistribution: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <PieChart
        data={productMixData}
        colors={[
          "var(--ds-chart-1)",
          "var(--ds-chart-2)",
          "var(--ds-chart-3)",
          "var(--ds-chart-4)",
        ]}
        variant="donut"
        height={320}
        centerLabel="Visitors"
        valueFormatter={formatCompactValue}
      />
    </StorySurface>
  ),
  parameters: { docs: { source: { code: donutDistributionSource } } },
};

export const CompactStatusSplit: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <PieChart
        data={resolutionData}
        colors={["var(--ds-chart-3)", "var(--ds-chart-4)", "var(--ds-chart-5)"]}
        variant="pie"
        height={320}
      />
    </StorySurface>
  ),
  parameters: { docs: { source: { code: compactStatusSplitSource } } },
};

export const WeeklyChannelDistribution: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Weekly acquisition mix"
          description="Use a donut snapshot when the comparison is share-of-total for a single period rather than change over time."
        />
        <PieChart
          data={weeklyChannelMix}
          colors={weeklyColors}
          variant="donut"
          height={320}
          centerLabel="Sessions"
          valueFormatter={formatCompactValue}
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: weeklyChannelDistributionSource } } },
};

export const ComparativeTimeRanges: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <StoryStack className="ui:gap-6">
        <StoryIntro
          title="Weekly, monthly, and yearly composition snapshots"
          description="Pie and donut charts work best as point-in-time composition views, so each panel represents a different reporting window."
        />
        <div className="ui:grid ui:gap-4 xl:ui:grid-cols-3">
          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Weekly"
                description="Channel mix for the current week."
              />
              <PieChart
                data={weeklyChannelMix}
                colors={weeklyColors}
                variant="donut"
                height={250}
                centerLabel="Weekly"
                valueFormatter={formatCompactValue}
              />
            </StorySection>
          </StoryPanel>

          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Monthly"
                description="Demand-source mix across the current month."
              />
              <PieChart
                data={monthlyDemandMix}
                colors={monthlyColors}
                variant="donut"
                height={250}
                centerLabel="Monthly"
                valueFormatter={formatCompactValue}
              />
            </StorySection>
          </StoryPanel>

          <StoryPanel className="ui:p-4">
            <StorySection>
              <StoryIntro
                title="Yearly"
                description="Revenue portfolio share for the annual summary."
              />
              <PieChart
                data={yearlyPortfolioMix}
                colors={yearlyColors}
                variant="pie"
                height={250}
              />
            </StorySection>
          </StoryPanel>
        </div>
      </StoryStack>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: comparativePieSource } } },
};

export const CenterInsightSummary: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Donut chart with inside summary"
          description="The center now shows the total by default, then switches to slice-specific value and percent on hover for richer in-chart context."
        />
        <PieChart
          data={monthlyDemandMix}
          colors={monthlyColors}
          variant="donut"
          height={340}
          centerLabel="Demand"
          valueFormatter={formatCompactValue}
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: centerSummarySource } } },
};

export const CustomCenterContent: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Donut chart with custom center content"
          description="Use renderCenterContent when the chart center needs product-specific KPIs, labels, or richer status framing."
        />
        <PieChart
          data={productMixData}
          colors={[
            "var(--ds-chart-1)",
            "var(--ds-chart-2)",
            "var(--ds-chart-3)",
            "var(--ds-chart-4)",
          ]}
          variant="donut"
          height={340}
          centerLabel="Mix"
          valueFormatter={formatCompactValue}
          renderCenterContent={({
            activeColor,
            displayLabel,
            displayPercentageLabel,
            displayValue,
            totalValue,
            valueFormatter,
          }) => (
            <div className="ui:flex ui:min-w-32 ui:flex-col ui:items-center ui:rounded-2xl ui:border ui:border-border/70 ui:bg-background/70 ui:px-4 ui:py-3 ui:text-center ui:backdrop-blur-md">
              <span
                className="ui:h-2.5 ui:w-2.5 ui:rounded-full"
                style={{ backgroundColor: activeColor ?? "var(--ds-chart-1)" }}
              />
              <p className="ui:mt-2 ui:text-[11px] ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
                {displayLabel}
              </p>
              <p className="ui:mt-1 ui:text-2xl ui:font-semibold ui:leading-none ui:text-foreground">
                {valueFormatter(displayValue)}
              </p>
              <p className="ui:mt-2 ui:text-xs ui:text-muted-foreground">
                {displayPercentageLabel}
              </p>
              <div className="ui:mt-3 ui:w-full ui:border-t ui:border-border/70 ui:pt-3">
                <p className="ui:text-[11px] ui:font-medium ui:uppercase ui:tracking-[0.14em] ui:text-muted-foreground">
                  Total portfolio
                </p>
                <p className="ui:mt-1 ui:text-sm ui:font-semibold ui:text-foreground">
                  {valueFormatter(totalValue)}
                </p>
              </div>
            </div>
          )}
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: customCenterSource } } },
};
