import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { CustomerLifecycleCard } from "./CustomerLifecycleCard";
import { SubscriptionHealthCard } from "./SubscriptionHealthCard";
import { ToolUsageOverviewCard } from "./ToolUsageOverviewCard";

import type { CustomerLifecycleDataPoint, CustomerLifecycleMetric } from "./CustomerLifecycleCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / Orders / Gallery",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ── Customer lifecycle data ────────────────────────────────────────────────────

const LIFECYCLE_DATA: CustomerLifecycleDataPoint[] = [
  { label: "Jan", trials: 180, converted: 62,  churned: 8  },
  { label: "Feb", trials: 210, converted: 78,  churned: 11 },
  { label: "Mar", trials: 248, converted: 94,  churned: 9  },
  { label: "Apr", trials: 291, converted: 118, churned: 7  },
  { label: "May", trials: 340, converted: 143, churned: 6  },
];

const LIFECYCLE_METRICS: CustomerLifecycleMetric[] = [
  { label: "Trials",     value: 340, change: 16.8,  color: "#4F46E5" },
  { label: "Converted",  value: 143, change: 21.2,  color: "#10B981" },
  { label: "Churned",    value: 6,   change: -14.3, color: "#EF4444" },
  { label: "Conv. Rate", value: 42,  change: 1.8,   color: "#F59E0B" },
];

// ── Story ──────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "All Orders Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Orders & Lifecycle Cards"
        description="Customer lifecycle, subscription health, and platform usage cards for the SaaS Tools Store. Track trial conversion, health by tier, and resource consumption trends."
      />

      <StorySection title="Customer Lifecycle">
        <CustomerLifecycleCard
          title="Trial → Conversion Trend"
          data={{ "this-month": LIFECYCLE_DATA }}
          metrics={LIFECYCLE_METRICS}
          defaultPeriod="this-month"
        />
      </StorySection>

      <StorySection title="Health & Usage">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[340px]">
            <SubscriptionHealthCard />
          </div>
          <div className="w-[360px]">
            <ToolUsageOverviewCard />
          </div>
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};
