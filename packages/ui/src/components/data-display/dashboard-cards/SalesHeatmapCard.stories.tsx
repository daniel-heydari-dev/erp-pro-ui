import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { SalesHeatmapCard } from "./SalesHeatmapCard";
import type { HeatmapPoint } from "./SalesHeatmapCard";

// ── Mock data: tools store revenue by day × hour ──────────────────────────────

const DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h"];

// Realistic tools store pattern:
// - Mon–Fri peak 10h–12h and 15h–17h
// - Friday is best overall
// - Saturday moderate morning rush
// - Sunday nearly dead

const RAW: Record<string, number[]> = {
  Mon: [120, 480, 860,  940,  620, 540, 710,  980,  870,  640, 320, 140],
  Tue: [90,  440, 790,  880,  590, 510, 680,  910,  820,  600, 290, 110],
  Wed: [110, 460, 830,  910,  640, 580, 740,  1020, 940,  680, 340, 160],
  Thu: [130, 500, 880,  970,  670, 610, 780,  1080, 1010, 720, 370, 180],
  Fri: [150, 560, 1020, 1180, 780, 710, 890,  1240, 1190, 880, 480, 220],
  Sat: [80,  620, 940,  880,  760, 680, 590,  520,  440,  310, 180, 60],
  Sun: [40,  160, 240,  280,  220, 190, 170,  150,  120,  90,  50,  20],
};

// Top product per time slot — changes through the day
const SLOT_TOP_PRODUCT: Record<string, string> = {
  "08h": "Measuring Tape 5m",
  "09h": "Stanley Hammer 16oz",
  "10h": "Bosch Drill GSB 18V",
  "11h": "Bosch Drill GSB 18V",
  "12h": "Knipex Pliers 200mm",
  "13h": "Knipex Pliers 200mm",
  "14h": "DeWalt Saw Blade Set",
  "15h": "Bosch Drill GSB 18V",
  "16h": "Bosch Drill GSB 18V",
  "17h": "Makita Grinder 115mm",
  "18h": "Stanley Hammer 16oz",
  "19h": "Measuring Tape 5m",
};

const heatmapData: HeatmapPoint[] = DAYS.flatMap((day) =>
  SLOTS.map((slot, i) => {
    const value = RAW[day]![i] ?? 0;
    return {
      day,
      slot,
      value,
      clients: value > 0 ? Math.max(1, Math.round(value / 148)) : 0,
      topProduct: value > 0 ? SLOT_TOP_PRODUCT[slot] : undefined,
    };
  }),
);

// Order count variant
const orderCountData: HeatmapPoint[] = heatmapData.map((pt) => ({
  ...pt,
  value: Math.round(pt.value / 42),
}));

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SalesHeatmapCard> = {
  title: "Data Display / Dashboard Cards / Sales / SalesHeatmapCard",
  component: SalesHeatmapCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SalesHeatmapCard>;

// ── Stories ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Sales Heatmap Card"
        description="Shows revenue intensity by day of week and hour of day. Darker = higher revenue. Peak cell gets an outline. Hover any cell to inspect exact value. Footer auto-highlights best and slowest slot."
      />
      <StorySection title="Revenue heatmap — tools store">
        <StoryStack>
          <SalesHeatmapCard
            data={heatmapData}
            className="max-w-xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const OrderCount: Story = {
  render: () => (
    <StorySurface>
      <StorySection title="Order count variant">
        <StoryStack>
          <SalesHeatmapCard
            title="Orders Heatmap"
            subtitle="Number of orders by day & hour"
            data={orderCountData}
            metricLabel="Orders"
            valueFormatter={(v) => `${v} orders`}
            className="max-w-xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const CustomTimeSlots: Story = {
  render: () => (
    <StorySurface>
      <StorySection title="Custom time slots (morning only, 06h–13h)">
        <StoryStack>
          <SalesHeatmapCard
            title="Morning Sales"
            subtitle="06h–13h window"
            data={heatmapData.filter((pt) =>
              ["06h","07h","08h","09h","10h","11h","12h","13h"].includes(pt.slot)
            )}
            slots={["06h","07h","08h","09h","10h","11h","12h","13h"]}
            className="max-w-xl"
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};
