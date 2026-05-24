import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { CustomerLifecycleCard } from "./CustomerLifecycleCard";
import type { CustomerLifecycleDataPoint, CustomerLifecycleMetric } from "./CustomerLifecycleCard";

const meta: Meta<typeof CustomerLifecycleCard> = {
  title: "Data Display / Dashboard Cards / SaaS / CustomerLifecycleCard",
  component: CustomerLifecycleCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grouped bar chart tracking trials, conversions, and churn across time periods (week / month / year) with a KPI summary strip.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default — monthly view",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <CustomerLifecycleCard />
    </StorySurface>
  ),
};

const highGrowthData: CustomerLifecycleDataPoint[] = [
  { label: "Jan", trials: 180, converted: 62,  churned: 8  },
  { label: "Feb", trials: 210, converted: 78,  churned: 11 },
  { label: "Mar", trials: 248, converted: 94,  churned: 9  },
  { label: "Apr", trials: 291, converted: 118, churned: 7  },
  { label: "May", trials: 340, converted: 143, churned: 6  },
];

const highGrowthMetrics: CustomerLifecycleMetric[] = [
  { label: "Trials",     value: 340, change: 16.8,  color: "#4F46E5" },
  { label: "Converted",  value: 143, change: 21.2,  color: "#10B981" },
  { label: "Churned",    value: 6,   change: -14.3, color: "#EF4444" },
  { label: "Conv. Rate", value: 42,  change: 1.8,   color: "#F59E0B" },
];

export const HighGrowth: Story = {
  name: "High-growth scenario",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="High-growth scenario"
          description="Rising trials and conversions with declining churn — the ideal growth curve."
        />
        <StorySection>
          <CustomerLifecycleCard
            title="Customer Lifecycle"
            data={{ "this-month": highGrowthData }}
            metrics={highGrowthMetrics}
            defaultPeriod="this-month"
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
