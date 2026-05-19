import type { Meta, StoryObj } from "@storybook/react-vite";

import { DeviceSalesCard } from "./DeviceSalesCard";

const meta: Meta<typeof DeviceSalesCard> = {
  title: "Data Display / Dashboard Cards / Sales / DeviceSalesCard",
  component: DeviceSalesCard,
  tags: ["autodocs"],
  argTypes: {
    channels:    { control: false },
    brands:      { control: false },
    onExpand:    { control: false },
    onEdit:      { control: false },
    onMoreClick: { control: false },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sales channel headline metrics (e.g. Retail / Webstore / Wholesale B2B) " +
          "with a horizontal stacked bar chart broken down by product category or brand. " +
          "Helps sales managers understand which channels drive volume in which categories.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeviceSalesCard>;

// ── Nexus Commerce — May 2026 channel performance ─────────────────────────────

export const NexusCommerce: Story = {
  name: "Nexus Commerce — Channel × Category Breakdown",
  render: () => (
    <div className="w-[480px]">
      <DeviceSalesCard
        title="Sales by Channel & Category"
        channels={[
          { key: "retail",     label: "Retail POS",    sales: 2564,  color: "#7367F0" },
          { key: "website",    label: "Webstore",      sales: 3890,  color: "#00CFE8" },
          { key: "thirdParty", label: "Wholesale B2B", sales: 670,   color: "#FF9F43" },
        ]}
        brands={[
          { name: "Audio",      retail: 48200,  website: 72300, thirdParty: 18900 },
          { name: "Accessories", retail: 38600, website: 61400, thirdParty: 22400 },
          { name: "Displays",   retail: 31800,  website: 44700, thirdParty: 31200 },
          { name: "Input Dev.", retail: 24100,  website: 38200, thirdParty: 14800 },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "May MTD: Webstore leads all channels (3,890 orders) driven by Audio and Accessories. " +
          "Displays have the most balanced channel mix — strong Wholesale B2B indicator of B2B demand.",
      },
    },
  },
};

export const SoftwareLicenses: Story = {
  name: "SaaS — Subscription sales by tier",
  render: () => (
    <div className="w-[480px]">
      <DeviceSalesCard
        title="Subscription Revenue by Tier"
        channels={[
          { key: "retail",     label: "Self-Serve",    sales: 1840,  color: "#7367F0" },
          { key: "website",    label: "Sales-Assisted", sales: 620,  color: "#00CFE8" },
          { key: "thirdParty", label: "Enterprise",    sales: 180,   color: "#FF9F43" },
        ]}
        brands={[
          { name: "Starter",    retail: 62000, website:  8400, thirdParty:     0 },
          { name: "Pro",        retail: 48000, website: 34200, thirdParty:  9600 },
          { name: "Business",   retail: 18000, website: 41800, thirdParty: 28400 },
          { name: "Enterprise", retail:     0, website: 24000, thirdParty: 82000 },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "SaaS tier breakdown: Enterprise revenue ($82K) flows exclusively through the Sales-Assisted " +
          "channel — no self-serve. Starter plan is 100% self-serve. Classic land-and-expand shape.",
      },
    },
  },
};

export const GlobalRetail: Story = {
  name: "Global Retail — Region × Channel",
  render: () => (
    <div className="w-[480px]">
      <DeviceSalesCard
        title="Revenue by Region & Channel"
        channels={[
          { key: "retail",     label: "In-Store",   sales: 4210,  color: "#28C76F" },
          { key: "website",    label: "Online",     sales: 6830,  color: "#7367F0" },
          { key: "thirdParty", label: "Partners",   sales: 1940,  color: "#FF9F43" },
        ]}
        brands={[
          { name: "EMEA",   retail: 88400, website: 112600, thirdParty: 42100 },
          { name: "APAC",   retail: 64800, website:  98400, thirdParty: 36800 },
          { name: "NAM",    retail: 74200, website: 126800, thirdParty: 28400 },
          { name: "LATAM",  retail: 18200, website:  34400, thirdParty: 12800 },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multi-region retailer: Online dominates NAM and EMEA. APAC shows strong in-store presence. " +
          "LATAM under-indexed in partners — growth opportunity for channel expansion.",
      },
    },
  },
};
