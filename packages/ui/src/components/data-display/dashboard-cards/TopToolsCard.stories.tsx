import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { TopToolsCard } from "./TopToolsCard";
import type { TopToolItem } from "./TopToolsCard";

const meta: Meta<typeof TopToolsCard> = {
  title: "Data Display / Dashboard Cards / SaaS / TopToolsCard",
  component: TopToolsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Ranked list of tools by Monthly Active Users. Each row shows the tool icon, category, MAU count with MoM growth, and an accent-colored rank badge.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default — 5 tools",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <TopToolsCard />
    </StorySurface>
  ),
};

const extendedItems: TopToolItem[] = [
  { id: 1,  name: "AI Copywriter",     category: "Content",     mau: 18420, growth: +24.3, icon: "✍️",  rank: 1 },
  { id: 2,  name: "Analytics Pro",     category: "Analytics",   mau: 14890, growth: +11.7, icon: "📊",  rank: 2 },
  { id: 3,  name: "Invoice Manager",   category: "Finance",     mau: 12340, growth: +8.2,  icon: "🧾",  rank: 3 },
  { id: 4,  name: "Team Scheduler",    category: "HR",          mau: 9870,  growth: +5.6,  icon: "📅",  rank: 4 },
  { id: 5,  name: "Support Desk",      category: "Support",     mau: 8210,  growth: -2.1,  icon: "🎫",  rank: 5 },
  { id: 6,  name: "Email Campaigns",   category: "Marketing",   mau: 6480,  growth: +14.8, icon: "📧",  rank: 6 },
  { id: 7,  name: "Code Review Bot",   category: "Dev Tools",   mau: 4210,  growth: +31.2, icon: "🤖",  rank: 7 },
];

export const Extended: Story = {
  name: "Extended — 7 tools",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="Extended list"
          description="Pass more items to show additional tools beyond the default 5."
        />
        <StorySection>
          <div className="w-[380px]">
            <TopToolsCard
              title="All Tools by MAU"
              subtitle="Full platform · last 30 days"
              items={extendedItems}
            />
          </div>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
