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
  { period: "Jan", trials: 180, converted: 62,  churned: 8  },
  { period: "Feb", trials: 210, converted: 78,  churned: 11 },
  { period: "Mar", trials: 248, converted: 94,  churned: 9  },
  { period: "Apr", trials: 291, converted: 118, churned: 7  },
  { period: "May", trials: 340, converted: 143, churned: 6  },
];

const highGrowthMetrics: CustomerLifecycleMetric[] = [
  { label: "Trials",     value: "340",  badge: { value: "+16.8%", direction: "up"   } },
  { label: "Converted",  value: "143",  badge: { value: "+21.2%", direction: "up"   } },
  { label: "Churned",    value: "6",    badge: { value: "−14.3%", direction: "down" } },
  { label: "Conv. Rate", value: "42%",  badge: { value: "+1.8pp", direction: "up"   } },
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
            subtitle="5-month growth trajectory"
            data={highGrowthData}
            metrics={highGrowthMetrics}
            defaultPeriod="Month"
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
