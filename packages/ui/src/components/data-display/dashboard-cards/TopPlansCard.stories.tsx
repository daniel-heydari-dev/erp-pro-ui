import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { TopPlansCard } from "./TopPlansCard";
import type { PlanItem } from "./TopPlansCard";

const meta: Meta<typeof TopPlansCard> = {
  title: "Data Display / Dashboard Cards / SaaS / TopPlansCard",
  component: TopPlansCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Ranked list of subscription plans with a By Accounts / By MRR toggle. Each row shows the plan tier badge, MoM growth, and the active metric value.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default — sorted by MRR",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <TopPlansCard />
    </StorySurface>
  ),
};

const freemiumItems: PlanItem[] = [
  { id: 1, name: "Enterprise Annual",  tier: "enterprise", accounts: 168,  mrr: 84000, growth: +18.4 },
  { id: 2, name: "Pro Monthly",        tier: "pro",        accounts: 431,  mrr: 43100, growth: +12.1 },
  { id: 3, name: "Starter Annual",     tier: "starter",    accounts: 720,  mrr: 21600, growth: +6.8  },
  { id: 4, name: "Starter Monthly",    tier: "starter",    accounts: 506,  mrr: 10120, growth: +3.2  },
  { id: 5, name: "Free (Freemium)",    tier: "free",       accounts: 4200, mrr: 0,     growth: +22.1 },
];

export const WithFreemium: Story = {
  name: "With freemium tier",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="Freemium model"
          description="Free tier shows high account count but zero MRR — great for spotting conversion opportunities."
        />
        <StorySection>
          <StoryStack direction="horizontal" wrap>
            <div className="w-[340px]">
              <TopPlansCard
                title="Plans by Accounts"
                items={freemiumItems}
                defaultMetric="accounts"
              />
            </div>
            <div className="w-[340px]">
              <TopPlansCard
                title="Plans by MRR"
                items={freemiumItems}
                defaultMetric="mrr"
              />
            </div>
          </StoryStack>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
