import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { AcquisitionChannelCard } from "./AcquisitionChannelCard";
import type { AcquisitionChannel, AcquisitionPlanRow } from "./AcquisitionChannelCard";

const meta: Meta<typeof AcquisitionChannelCard> = {
  title: "Data Display / Dashboard Cards / SaaS / AcquisitionChannelCard",
  component: AcquisitionChannelCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Customer acquisition breakdown by channel — stacked bar chart, channel metric strip, and per-plan conversion matrix.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <AcquisitionChannelCard />
    </StorySurface>
  ),
};

const partnerHeavyChannels: AcquisitionChannel[] = [
  { key: "partner",    label: "Partner Network",   newAccounts: 298, color: "#7C3AED" },
  { key: "direct",     label: "Direct / Organic",  newAccounts: 187, color: "#2563EB" },
  { key: "marketplace",label: "App Marketplace",   newAccounts: 142, color: "#0891B2" },
  { key: "affiliate",  label: "Affiliate",         newAccounts: 73,  color: "#D97706" },
];

const partnerPlanRows: AcquisitionPlanRow[] = [
  { plan: "Enterprise", partner: 61,  direct: 34,  marketplace: 18,  affiliate: 4  },
  { plan: "Pro",        partner: 128, direct: 82,  marketplace: 74,  affiliate: 29 },
  { plan: "Starter",    partner: 109, direct: 71,  marketplace: 50,  affiliate: 40 },
];

export const PartnerHeavy: Story = {
  name: "Partner-led growth",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="Partner-led growth"
          description="When the partner channel dominates — shows how partner investments translate to plan distribution."
        />
        <StorySection>
          <div className="w-[460px]">
            <AcquisitionChannelCard
              title="Acquisition by Channel"
              subtitle="Partner network leading growth this quarter"
              channels={partnerHeavyChannels}
              plans={partnerPlanRows}
            />
          </div>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
