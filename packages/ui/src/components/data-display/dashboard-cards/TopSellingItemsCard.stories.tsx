import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { TopSellingItemsCard } from "./TopSellingItemsCard";
import type { TopSellingItem, TopSellingMetric } from "./TopSellingItemsCard";

// ── Mock data ─────────────────────────────────────────────────────────────────

const items: TopSellingItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    qty: 1240,
    revenue: 148800,
    qtyTrend: 12.4,
    revenueTrend: 18.2,
  },
  {
    id: "2",
    name: "Running Shoes Pro X",
    category: "Footwear",
    qty: 980,
    revenue: 88200,
    qtyTrend: 5.1,
    revenueTrend: 7.3,
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    qty: 720,
    revenue: 216000,
    qtyTrend: -3.2,
    revenueTrend: -1.8,
  },
  {
    id: "4",
    name: "Smart Watch Series 8",
    category: "Electronics",
    qty: 640,
    revenue: 192000,
    qtyTrend: 21.7,
    revenueTrend: 24.5,
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    qty: 510,
    revenue: 35700,
    qtyTrend: 8.9,
    revenueTrend: 9.4,
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    category: "Sports",
    qty: 430,
    revenue: 17200,
    qtyTrend: -1.1,
    revenueTrend: -0.8,
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    category: "Kitchen",
    qty: 390,
    revenue: 11700,
    qtyTrend: 3.5,
    revenueTrend: 4.2,
  },
];

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TopSellingItemsCard> = {
  title: "Data Display / Dashboard Cards / Sales / TopSellingItemsCard",
  component: TopSellingItemsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Ranked list of top-selling products. Toggle between By Qty and By Revenue. Each row shows a progress bar relative to #1, optional trend badge, and formatted value. Controlled via `metric` + `onMetricChange` or uncontrolled via `defaultMetric`.",
      },
    },
  },
  argTypes: {
    title:           { control: "text" },
    subtitle:        { control: "text" },
    items:           { control: false },
    metric:          { control: false },
    defaultMetric:   { control: false },
    showTrend:       { control: "boolean" },
    maxItems:        { control: { type: "number", min: 1, max: 20 } },
    labels:          { control: false },
    onViewAll:       { control: false },
    onMetricChange:  { control: false },
    className:       { control: false },
    onMenuClick:     { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <TopSellingItemsCard items={items} />
    </StorySurface>
  ),
};

// ── WithSubtitle ──────────────────────────────────────────────────────────────

export const WithSubtitle: Story = {
  name: "With Subtitle & View All",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <TopSellingItemsCard
        title="Top Selling Items"
        subtitle="This month · sorted by units sold"
        items={items}
        onViewAll={() => alert("View all clicked")}
      />
    </StorySurface>
  ),
};

// ── NoTrend ───────────────────────────────────────────────────────────────────

export const NoTrend: Story = {
  name: "Without Trend Badges",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <TopSellingItemsCard
        title="Top Selling Items"
        items={items}
        showTrend={false}
      />
    </StorySurface>
  ),
};

// ── Controlled ────────────────────────────────────────────────────────────────

export const Controlled: Story = {
  name: "Controlled Metric",
  render: () => {
    const [metric, setMetric] = useState<TopSellingMetric>("revenue");
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="Controlled metric toggle"
            description={`Active metric: "${metric}". Drive from parent via metric + onMetricChange.`}
          />
          <StorySection>
            <TopSellingItemsCard
              title="Top Selling Items"
              items={items}
              metric={metric}
              onMetricChange={setMetric}
              onViewAll={() => undefined}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
};

// ── Top3 ──────────────────────────────────────────────────────────────────────

export const Top3: Story = {
  name: "Max 3 Items",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <TopSellingItemsCard
        title="Top 3 Products"
        items={items}
        maxItems={3}
        onViewAll={() => undefined}
      />
    </StorySurface>
  ),
};
