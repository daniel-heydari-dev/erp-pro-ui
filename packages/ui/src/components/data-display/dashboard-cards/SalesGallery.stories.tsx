import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { UserIcon } from "../../icons/UserIcon";
import { ShoppingCartIcon } from "../../icons/ShoppingCartIcon";
import { AcquisitionChannelCard } from "./AcquisitionChannelCard";
import { SalesHeatmapCard } from "./SalesHeatmapCard";
import { SalesOverviewCard } from "./SalesOverviewCard";
import { TopToolsCard } from "./TopToolsCard";
import { TopPlansCard } from "./TopPlansCard";

import type { HeatmapPoint } from "./SalesHeatmapCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / Sales / Gallery",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ── Activity heatmap ───────────────────────────────────────────────────────────

function buildHeatmap(): HeatmapPoint[] {
  const days  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const slots = ["08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h"];
  const slotM = [0.18, 0.44, 0.67, 0.86, 0.62, 0.38, 0.72, 0.92, 0.78, 0.55, 0.26, 0.10];
  const dayM  = [0.82, 0.92, 0.88, 1.00, 1.12, 0.54, 0.24];
  const tools = [
    "AI Copywriter","Analytics Pro","Invoice Manager","Analytics Pro",
    "AI Copywriter","Team Scheduler","Invoice Manager","Analytics Pro",
    "AI Copywriter","Support Desk","AI Copywriter","Team Scheduler",
  ];
  return days.flatMap((day, di) =>
    slots.map((slot, si) => {
      const value = Math.round((dayM[di] ?? 1) * (slotM[si] ?? 0.5) * 5840);
      return { day, slot, value, clients: Math.max(1, Math.round(value / 18)), topProduct: tools[si] };
    }),
  );
}

// ── Story ──────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "All Sales Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Sales Cards"
        description="Sales analytics and performance cards for the SaaS Tools Store. Top-line KPIs, tool and plan rankings, acquisition channel breakdown, and user activity heatmap."
      />

      <StorySection title="KPI Overview">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[300px]">
            <SalesOverviewCard
              title="Revenue Split"
              value="$198k MRR"
              badge={{ value: "+2.1%", direction: "up" }}
              leftMetric={{
                icon: <UserIcon width={18} height={18} />,
                label: "Self-Serve",
                percentage: "63.2%",
                count: "1,012 accounts",
                color: "#4361EE",
              }}
              rightMetric={{
                icon: <ShoppingCartIcon width={18} height={18} />,
                label: "Sales-Assisted",
                percentage: "36.8%",
                count: "235 accounts",
                color: "#00CFE8",
              }}
            />
          </div>
          <div className="w-[300px]">
            <TopToolsCard
              title="Top Tools"
              subtitle="By MAU · last 30 days"
            />
          </div>
          <div className="w-[300px]">
            <TopPlansCard
              title="Top Plans"
              subtitle="By MRR this month"
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="Acquisition Channels">
        <StoryStack direction="horizontal" wrap>
          <div className="min-w-[380px] flex-1">
            <AcquisitionChannelCard />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="User Activity Heatmap">
        <SalesHeatmapCard
          title="User Activity by Day & Hour"
          subtitle="Active sessions heatmap — current week"
          data={buildHeatmap()}
          metricLabel="Sessions"
        />
      </StorySection>
    </StorySurface>
  ),
};
