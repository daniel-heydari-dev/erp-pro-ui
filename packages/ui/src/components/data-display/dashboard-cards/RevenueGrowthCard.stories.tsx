import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { RevenueGrowthCard } from "./RevenueGrowthCard";
import type { RevenueGrowthBarPoint } from "./RevenueGrowthCard";

const weeklyData: RevenueGrowthBarPoint[] = [
  { day: "M", value: 42 },
  { day: "T", value: 58 },
  { day: "W", value: 51 },
  { day: "T", value: 67 },
  { day: "F", value: 74, highlighted: true },
  { day: "S", value: 55 },
  { day: "S", value: 39 },
];

const meta: Meta<typeof RevenueGrowthCard> = {
  title: "Data Display / Dashboard Cards / Dashboard / RevenueGrowthCard",
  component: RevenueGrowthCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compact revenue card with a 7-day bar chart. Trend badge inherits the highlight color.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    subtitle: { control: "text", description: "Secondary subtitle beneath the title." },
    value: { control: "text", description: "Hero metric value (e.g. '$4,673')." },
    badge: {
      control: false,
      description: "Trend badge. Its color is derived from highlightColor automatically.",
    },
    weeklyData: {
      control: false,
      description: "7-point weekly bar data array. Set highlighted=true on the peak day.",
    },
    highlightColor: {
      control: "text",
      description: "CSS color for the highlighted bar and badge background.",
    },
    barColor: {
      control: "text",
      description:
        "CSS color for non-highlighted bars. Defaults to a 22% opacity tint of highlightColor.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { RevenueGrowthCard } from 'erp-pro-ui';
import type { RevenueGrowthBarPoint } from 'erp-pro-ui';

const weeklyData: RevenueGrowthBarPoint[] = [
  { day: 'M', value: 42 },
  { day: 'T', value: 58 },
  { day: 'W', value: 51 },
  { day: 'T', value: 67 },
  { day: 'F', value: 74, highlighted: true },
  { day: 'S', value: 55 },
  { day: 'S', value: 39 },
];

export function RevenueGrowthCardExample() {
  return (
    <RevenueGrowthCard
      value="$4,673"
      badge={{ value: "+8.3%", direction: "up" }}
      weeklyData={weeklyData}
    />
  );
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <RevenueGrowthCard
        value="$4,673"
        badge={{ value: "+8.3%", direction: "up" }}
        weeklyData={weeklyData}
      />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const variantsSource = `import { RevenueGrowthCard } from 'erp-pro-ui';

export function RevenueGrowthVariantsExample() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <RevenueGrowthCard
        title="Revenue Growth"
        value="$4,673"
        badge={{ value: "+8.3%", direction: "up" }}
        weeklyData={weeklyData}
        highlightColor="var(--ds-color-success)"
      />
      <RevenueGrowthCard
        title="Cost Reduction"
        value="$1,892"
        badge={{ value: "-4.1%", direction: "down" }}
        weeklyData={weeklyData}
        highlightColor="var(--ds-color-danger)"
      />
    </div>
  );
}`;

export const Variants: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Color variants"
          description="Pass a different highlightColor to match the metric's semantic meaning — green for growth, red for costs."
        />
        <StorySection>
          <div className="ui:grid ui:gap-4 ui:sm:grid-cols-2">
            <RevenueGrowthCard
              title="Revenue Growth"
              value="$4,673"
              badge={{ value: "+8.3%", direction: "up" }}
              weeklyData={weeklyData}
              highlightColor="var(--ds-color-success)"
            />
            <RevenueGrowthCard
              title="Cost Reduction"
              value="$1,892"
              badge={{ value: "-4.1%", direction: "down" }}
              weeklyData={weeklyData}
              highlightColor="var(--ds-color-danger)"
            />
          </div>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: variantsSource } },
  },
};
