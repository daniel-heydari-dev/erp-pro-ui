import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { SeatUtilizationCard } from "./SeatUtilizationCard";
import type { SeatTierRow, SeatSummaryItem } from "./SeatUtilizationCard";

const meta: Meta<typeof SeatUtilizationCard> = {
  title: "Data Display / Dashboard Cards / SaaS / SeatUtilizationCard",
  component: SeatUtilizationCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Seat allocation and utilization per tier with progress bars, a summary strip showing total/active/available seats, and upsell opportunity indicators.",
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
      <SeatUtilizationCard />
    </StorySurface>
  ),
};

const highUtilTiers: SeatTierRow[] = [
  { tier: "Enterprise", color: "#7C3AED", totalSeats: 2400,  usedSeats: 2381, accounts: 168 },
  { tier: "Pro",        color: "#2563EB", totalSeats: 6450,  usedSeats: 6302, accounts: 645 },
  { tier: "Starter",    color: "#0891B2", totalSeats: 6100,  usedSeats: 5250, accounts: 1220 },
  { tier: "Free",       color: "#64748B", totalSeats: 4200,  usedSeats: 1890, accounts: 4200 },
];

const highUtilSummary: SeatSummaryItem[] = [
  { label: "Total Seats",   value: "19,150" },
  { label: "Active",        value: "15,823" },
  { label: "Available",     value: "3,327"  },
  { label: "Utilization",   value: "82.6%"  },
];

export const HighUtilization: Story = {
  name: "High utilization — upsell signals",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="High utilization"
          description="Enterprise and Pro tiers near capacity — strong upsell signal for seat expansion."
        />
        <StorySection>
          <div className="w-[360px]">
            <SeatUtilizationCard
              title="Seat Utilization"
              subtitle="Near capacity — upsell opportunity"
              tiers={highUtilTiers}
              summary={highUtilSummary}
            />
          </div>
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
