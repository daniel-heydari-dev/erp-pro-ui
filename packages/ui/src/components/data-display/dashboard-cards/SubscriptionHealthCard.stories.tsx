import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { SubscriptionHealthCard } from "./SubscriptionHealthCard";
import type { SubscriptionTierHealth } from "./SubscriptionHealthCard";

const meta: Meta<typeof SubscriptionHealthCard> = {
  title: "Data Display / Dashboard Cards / SaaS / SubscriptionHealthCard",
  component: SubscriptionHealthCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Health score breakdown per subscription tier with circular SVG gauges, churn rate, and MoM trend. Surfaces at-risk tiers at a glance.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default — 4 tiers",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <SubscriptionHealthCard />
    </StorySurface>
  ),
};

const atRiskTiers: SubscriptionTierHealth[] = [
  { tier: "Enterprise", accounts: 168, healthScore: 91, churnRate: 0.3, trend: +2.1, color: "#7C3AED" },
  { tier: "Pro",        accounts: 645, healthScore: 74, churnRate: 1.8, trend: -0.4, color: "#2563EB" },
  { tier: "Starter",    accounts: 1226,healthScore: 58, churnRate: 4.1, trend: -1.9, color: "#0891B2" },
  { tier: "Free",       accounts: 4200,healthScore: 31, churnRate: 12.4,trend: -3.2, color: "#64748B" },
];

export const AtRisk: Story = {
  name: "At-risk scenario",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="At-risk scenario"
          description="Starter and Free tiers in decline — useful for spotting retention problems early."
        />
        <StorySection>
          <div className="w-[340px]">
            <SubscriptionHealthCard
              title="Subscription Health"
              subtitle="Current period — attention needed"
              tiers={atRiskTiers}
            />
          </div>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
