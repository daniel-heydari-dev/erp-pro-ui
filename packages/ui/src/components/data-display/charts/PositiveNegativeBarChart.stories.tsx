import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";
import { PositiveNegativeBarChart } from "./PositiveNegativeBarChart";

const formatCurrencyDelta = (value: number): string => {
  const absValue = Math.abs(value);
  const compact =
    absValue >= 1000 ? `${(absValue / 1000).toFixed(1)}k` : absValue.toString();
  return `${value >= 0 ? "+" : "-"}$${compact}`;
};

const formatPercentDelta = (value: number): string =>
  `${value >= 0 ? "+" : ""}${value}%`;

const monthlyNetContribution = [
  { name: "Jan", value: 14_800 },
  { name: "Feb", value: 9_600 },
  { name: "Mar", value: -4_200 },
  { name: "Apr", value: 12_500 },
  { name: "May", value: -2_600 },
  { name: "Jun", value: 18_200 },
  { name: "Jul", value: 7_400 },
  { name: "Aug", value: -1_900 },
];

const squadVariance = [
  { name: "Support", value: 8 },
  { name: "Growth", value: -3 },
  { name: "Finance", value: 5 },
  { name: "Ops", value: -7 },
  { name: "Platform", value: 11 },
];

const rolloutImpact = [
  { name: "Search", value: 3200 },
  { name: "Checkout", value: -1800 },
  { name: "Billing", value: 2400 },
  { name: "Inventory", value: -2600 },
  { name: "Reports", value: 1400 },
  { name: "Audit", value: 0 },
];

const meta: Meta<typeof PositiveNegativeBarChart> = {
  title: "Data Display/PositiveNegativeBarChart",
  component: PositiveNegativeBarChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Single-series bar chart for deltas, profit/loss swings, variance views, and any metric that crosses the zero baseline.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "radio", options: ["horizontal", "vertical"] },
    height: { control: "number" },
    showGrid: { control: "boolean" },
    positiveColor: { control: "text" },
    negativeColor: { control: "text" },
    neutralColor: { control: "text" },
    seriesLabel: { control: "text" },
    valueFormatter: { control: false },
    tickFormatter: { control: false },
    data: {
      control: false,
      description: "Category rows with a signed numeric value.",
    },
    className: {
      control: false,
      description: "Custom classes for the outer container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const monthlyProfitLossSource = `import { PositiveNegativeBarChart, type PositiveNegativeBarChartData } from 'erp-pro-ui';

const data: PositiveNegativeBarChartData[] = [
  { name: 'Jan', value: 14800 },
  { name: 'Feb', value: 9600 },
  { name: 'Mar', value: -4200 },
  { name: 'Apr', value: 12500 },
  { name: 'May', value: -2600 },
];

const formatCurrencyDelta = (value: number) => {
  const absValue = Math.abs(value);
  const compact = absValue >= 1000 ? String((absValue / 1000).toFixed(1)) + 'k' : String(absValue);
  return \`\${value >= 0 ? '+' : '-'}$\${compact}\`;
};

export function MonthlyProfitLossExample() {
  return (
    <PositiveNegativeBarChart
      data={data}
      height={360}
      valueFormatter={formatCurrencyDelta}
      tickFormatter={formatCurrencyDelta}
      seriesLabel="Net contribution"
    />
  );
}`;

const verticalVarianceSource = `import { PositiveNegativeBarChart, type PositiveNegativeBarChartData } from 'erp-pro-ui';

const data: PositiveNegativeBarChartData[] = [
  { name: 'Support', value: 8 },
  { name: 'Growth', value: -3 },
  { name: 'Finance', value: 5 },
  { name: 'Ops', value: -7 },
  { name: 'Platform', value: 11 },
];

const formatPercentDelta = (value: number) => \`\${value >= 0 ? '+' : ''}\${value}%\`;

export function VerticalVarianceExample() {
  return (
    <PositiveNegativeBarChart
      data={data}
      height={330}
      layout="vertical"
      valueFormatter={formatPercentDelta}
      tickFormatter={formatPercentDelta}
      seriesLabel="Target variance"
      positiveColor="var(--ds-chart-2)"
      negativeColor="var(--ds-chart-5)"
    />
  );
}`;

const releaseImpactSource = `import { PositiveNegativeBarChart, type PositiveNegativeBarChartData } from 'erp-pro-ui';

const data: PositiveNegativeBarChartData[] = [
  { name: 'Search', value: 3200 },
  { name: 'Checkout', value: -1800 },
  { name: 'Billing', value: 2400 },
  { name: 'Inventory', value: -2600 },
  { name: 'Reports', value: 1400 },
  { name: 'Audit', value: 0 },
];

const formatCurrencyDelta = (value: number) => {
  const absValue = Math.abs(value);
  const compact = absValue >= 1000 ? String((absValue / 1000).toFixed(1)) + 'k' : String(absValue);
  return \`\${value >= 0 ? '+' : '-'}$\${compact}\`;
};

export function CompactReleaseImpactExample() {
  return (
    <PositiveNegativeBarChart
      data={data}
      height={290}
      showGrid={false}
      valueFormatter={formatCurrencyDelta}
      tickFormatter={formatCurrencyDelta}
      seriesLabel="Release delta"
      positiveColor="var(--ds-chart-3)"
      negativeColor="var(--ds-chart-4)"
      neutralColor="var(--ds-chart-15)"
    />
  );
}`;

export const MonthlyProfitLoss: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Monthly contribution swing"
          description="Use this pattern when the story is about gains and losses around a true zero baseline, not total volume."
        />
        <PositiveNegativeBarChart
          data={monthlyNetContribution}
          height={360}
          valueFormatter={formatCurrencyDelta}
          tickFormatter={formatCurrencyDelta}
          seriesLabel="Net contribution"
          className="ui:px-2"
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: monthlyProfitLossSource } } },
};

export const VerticalVarianceRanking: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Team variance ranking"
          description="Vertical layout works better for score deltas and department rankings where label length matters more than chronology."
        />
        <PositiveNegativeBarChart
          data={squadVariance}
          height={330}
          layout="vertical"
          valueFormatter={formatPercentDelta}
          tickFormatter={formatPercentDelta}
          seriesLabel="Target variance"
          positiveColor="var(--ds-chart-2)"
          negativeColor="var(--ds-chart-5)"
          className="ui:px-2"
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: verticalVarianceSource } } },
};

export const CompactReleaseImpact: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:grid ui:gap-5 ui:md:grid-cols-[0.82fr_1.18fr]">
        <StoryPanel className="ui:p-5">
          <StorySection>
            <StoryIntro
              title="Release impact snapshot"
              description="A tighter card treatment still reads clearly when some modules are neutral and others move in opposite directions."
            />
            <div className="ui:grid ui:grid-cols-3 ui:gap-3">
              {[
                { label: "Positive modules", value: "3" },
                { label: "Negative modules", value: "2" },
                { label: "Net change", value: "+2.6k" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="ui:rounded-xl ui:border ui:border-border ui:bg-muted/35 ui:px-3 ui:py-3"
                >
                  <p className="ui:text-[11px] ui:font-medium ui:uppercase ui:tracking-[0.14em] ui:text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="ui:mt-2 ui:text-lg ui:font-semibold ui:text-foreground">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </StorySection>
        </StoryPanel>
        <StoryPanel className="ui:p-4">
          <PositiveNegativeBarChart
            data={rolloutImpact}
            height={290}
            showGrid={false}
            valueFormatter={formatCurrencyDelta}
            tickFormatter={formatCurrencyDelta}
            seriesLabel="Release delta"
            positiveColor="var(--ds-chart-3)"
            negativeColor="var(--ds-chart-4)"
            neutralColor="var(--ds-chart-15)"
            className="ui:px-1"
          />
        </StoryPanel>
      </div>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: releaseImpactSource } } },
};
