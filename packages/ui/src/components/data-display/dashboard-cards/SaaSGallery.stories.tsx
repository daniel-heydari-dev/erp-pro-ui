import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { SubscriptionHealthCard } from "./SubscriptionHealthCard";
import { ToolUsageOverviewCard } from "./ToolUsageOverviewCard";
import { AcquisitionChannelCard } from "./AcquisitionChannelCard";
import { CustomerLifecycleCard } from "./CustomerLifecycleCard";
import { SeatUtilizationCard } from "./SeatUtilizationCard";
import { TopToolsCard } from "./TopToolsCard";
import { TopPlansCard } from "./TopPlansCard";
import { AIInsightsCard } from "./AIInsightsCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / SaaS / Gallery",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Eight purpose-built cards for SaaS tools store dashboards — subscription health, tool usage, acquisition, customer lifecycle, seat utilization, top tools, top plans, and AI business insights.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "All SaaS Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="SaaS Tools Store — Dashboard Cards"
        description="A complete set of analytics cards for managing a SaaS platform. Covers subscription health, resource usage, acquisition channels, customer lifecycle, seat capacity, tool performance, plan performance, and AI-powered insights."
      />

      {/* ── Subscription health + Seat utilization ─────────────────────────── */}
      <StorySection title="Subscription Health & Capacity">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[340px]">
            <SubscriptionHealthCard />
          </div>
          <div className="w-[360px]">
            <SeatUtilizationCard />
          </div>
        </StoryStack>
      </StorySection>

      {/* ── Tool & plan performance ─────────────────────────────────────────── */}
      <StorySection title="Tool & Plan Performance">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[340px]">
            <TopToolsCard />
          </div>
          <div className="w-[340px]">
            <TopPlansCard />
          </div>
        </StoryStack>
      </StorySection>

      {/* ── Growth & acquisition ────────────────────────────────────────────── */}
      <StorySection title="Growth & Acquisition">
        <StoryStack direction="horizontal" wrap>
          <div className="min-w-[380px] flex-1">
            <CustomerLifecycleCard />
          </div>
          <div className="w-[460px]">
            <AcquisitionChannelCard />
          </div>
        </StoryStack>
      </StorySection>

      {/* ── Platform usage ──────────────────────────────────────────────────── */}
      <StorySection title="Platform Usage">
        <div className="w-[380px]">
          <ToolUsageOverviewCard />
        </div>
      </StorySection>

      {/* ── AI insights (full width) ────────────────────────────────────────── */}
      <StorySection title="AI Business Insights">
        <AIInsightsCard onViewAll={() => undefined} />
      </StorySection>
    </StorySurface>
  ),
};
