import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { ToolUsageOverviewCard } from "./ToolUsageOverviewCard";
import type { ToolUsageSegment } from "./ToolUsageOverviewCard";

const meta: Meta<typeof ToolUsageOverviewCard> = {
  title: "Data Display / Dashboard Cards / SaaS / ToolUsageOverviewCard",
  component: ToolUsageOverviewCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Platform usage breakdown by resource type — stacked bar chart with segment list showing percentages, raw values, and emoji icons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <ToolUsageOverviewCard />
    </StorySurface>
  ),
};

const heavyAiSegments: ToolUsageSegment[] = [
  { label: "AI Completions",    value: 8_240_000, percentage: 54, color: "#7C3AED", icon: "🤖" },
  { label: "API Calls",         value: 3_120_000, percentage: 21, color: "#2563EB", icon: "⚡" },
  { label: "File Storage (GB)", value: 2_180_000, percentage: 14, color: "#0891B2", icon: "🗄️" },
  { label: "Webhook Events",    value: 1_370_000, percentage:  9, color: "#059669", icon: "🔔" },
  { label: "Exports",           value:   310_000, percentage:  2, color: "#D97706", icon: "📤" },
];

export const AIHeavy: Story = {
  name: "AI-heavy workload",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="AI-heavy usage"
          description="Platforms with high AI completion usage — useful for capacity planning and pricing signals."
        />
        <StorySection>
          <div className="w-[360px]">
            <ToolUsageOverviewCard
              title="Platform Resource Usage"
              subtitle="AI completions dominate this month"
              segments={heavyAiSegments}
            />
          </div>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
