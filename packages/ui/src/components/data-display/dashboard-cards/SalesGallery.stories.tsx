import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { UserIcon } from "../../icons/UserIcon";
import { ShoppingCartIcon } from "../../icons/ShoppingCartIcon";
import { DeviceSalesCard } from "./DeviceSalesCard";
import { SalesHeatmapCard } from "./SalesHeatmapCard";
import { SalesOverviewCard } from "./SalesOverviewCard";
import { TopProductsCard } from "./TopProductsCard";
import { TopSellingItemsCard } from "./TopSellingItemsCard";

import type { DeviceSalesChannel, DeviceSalesBrandRow } from "./DeviceSalesCard";
import type { HeatmapPoint } from "./SalesHeatmapCard";
import type { TopProductItem } from "./TopProductsCard";
import type { TopSellingItem } from "./TopSellingItemsCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / Sales / Gallery",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ── Heatmap ────────────────────────────────────────────────────────────────────

function buildHeatmap(): HeatmapPoint[] {
  const days  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const slots = ["08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h"];
  const slotM = [0.18, 0.44, 0.67, 0.86, 0.62, 0.38, 0.72, 0.92, 0.78, 0.55, 0.26, 0.10];
  const dayM  = [0.82, 0.92, 0.88, 1.00, 1.12, 0.54, 0.24];
  const prods = ["Bosch Drill","Hilti TE 6","DeWalt Saw","Wera Set","Bosch Drill","Hilti TE 6","DeWalt Saw","Hilti TE 6","Bosch Drill","DeWalt Saw","Knipex","3M Glasses"];
  return days.flatMap((day, di) =>
    slots.map((slot, si) => {
      const value = Math.round((dayM[di] ?? 1) * (slotM[si] ?? 0.5) * 5840);
      return { day, slot, value, clients: Math.max(1, Math.round(value / 240)), topProduct: prods[si] };
    }),
  );
}

// ── Top sellers ────────────────────────────────────────────────────────────────

const TOP_SELLERS: TopSellingItem[] = [
  { id: "1", name: "Hilti Hammer Drill TE 6",    category: "Power Tools", qty: 94,  revenue: 25192, qtyTrend: 18, revenueTrend: 22 },
  { id: "2", name: "Bosch Drill GSB 18V",        category: "Power Tools", qty: 148, revenue: 13319, qtyTrend: 12, revenueTrend: 14 },
  { id: "3", name: "DeWalt Circular Saw DWE",    category: "Power Tools", qty: 107, revenue: 18083, qtyTrend: 5,  revenueTrend: 7  },
  { id: "4", name: "Wera Screwdriver Set 6pc",   category: "Hand Tools",  qty: 281, revenue: 12631, qtyTrend: 7,  revenueTrend: 9  },
  { id: "5", name: "DeWalt Saw Blade Set 5pc",   category: "Accessories", qty: 198, revenue: 7324,  qtyTrend: 9,  revenueTrend: 11 },
  { id: "6", name: "3M Safety Glasses",          category: "Accessories", qty: 892, revenue: 8022,  qtyTrend: 6,  revenueTrend: 5  },
];

// ── Top products ───────────────────────────────────────────────────────────────

const TOP_PRODUCTS: TopProductItem[] = [
  { id: 1, name: "Hilti Hammer Drill TE 6",    category: "Power Tools", soldCount: 94,  rank: 1 },
  { id: 2, name: "Bosch Drill GSB 18V",        category: "Power Tools", soldCount: 148, rank: 2 },
  { id: 3, name: "DeWalt Circular Saw DWE",    category: "Power Tools", soldCount: 107, rank: 3 },
  { id: 4, name: "Wera Screwdriver Set 6pc",   category: "Hand Tools",  soldCount: 281, rank: 4 },
  { id: 5, name: "3M Safety Glasses",          category: "Accessories", soldCount: 892, rank: 5 },
];

// ── Sales channels ─────────────────────────────────────────────────────────────

const CHANNELS: DeviceSalesChannel[] = [
  { key: "retail",     label: "Walk-In",     sales: 1284, color: "#4361EE" },
  { key: "website",    label: "Website",     sales: 2196, color: "#00CFE8" },
  { key: "thirdParty", label: "B2B Direct",  sales: 876,  color: "#FF9F43" },
];

const BRANDS: DeviceSalesBrandRow[] = [
  { name: "Bosch",  retail: 38000, website: 54000, thirdParty: 22000 },
  { name: "Hilti",  retail: 52000, website: 38000, thirdParty: 18000 },
  { name: "DeWalt", retail: 29000, website: 47000, thirdParty: 15000 },
  { name: "Wera",   retail: 18000, website: 21000, thirdParty: 8000  },
  { name: "3M",     retail: 12000, website: 18000, thirdParty: 6000  },
];

export const Default: Story = {
  name: "All Sales Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Sales Cards"
        description="Sales analytics and performance cards for the tools store. From top-line KPIs and bestsellers to heatmaps and channel breakdowns."
      />

      <StorySection title="KPI Overview">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[300px]">
            <SalesOverviewCard
              title="Sales Split"
              value="€291k"
              badge={{ value: "+14.9%", direction: "up" }}
              leftMetric={{
                icon: <UserIcon width={18} height={18} />,
                label: "Walk-In",
                percentage: "58.4%",
                count: "746 orders",
                color: "#4361EE",
              }}
              rightMetric={{
                icon: <ShoppingCartIcon width={18} height={18} />,
                label: "Online",
                percentage: "41.6%",
                count: "538 orders",
                color: "#00CFE8",
              }}
            />
          </div>
          <div className="w-[300px]">
            <TopProductsCard
              title="Top Products"
              items={TOP_PRODUCTS}
            />
          </div>
          <div className="w-[300px]">
            <TopSellingItemsCard
              title="Top Sellers"
              subtitle="By revenue this month"
              items={TOP_SELLERS}
              showTrend
              defaultMetric="revenue"
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="Channel Breakdown">
        <StoryStack direction="horizontal" wrap>
          <div className="min-w-[380px] flex-1">
            <DeviceSalesCard
              title="Sales by Channel"
              channels={CHANNELS}
              brands={BRANDS}
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="Revenue Heatmap">
        <SalesHeatmapCard
          title="Sales by Day & Hour"
          subtitle="Revenue heatmap — current week"
          data={buildHeatmap()}
          metricLabel="Revenue"
          valueFormatter={(v) => v >= 1_000 ? `€${(v / 1_000).toFixed(1)}k` : `€${v}`}
        />
      </StorySection>
    </StorySurface>
  ),
};
