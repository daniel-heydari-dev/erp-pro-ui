import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { BarBreakdownCard } from "./BarBreakdownCard";
import { InventoryCards } from "./InventoryCards";
import { StockAvailabilityCard } from "./StockAvailabilityCard";

import type { InventoryCardRow } from "./InventoryCards";
import type { StockItem } from "./StockAvailabilityCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / Inventory / Gallery",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const ROWS: InventoryCardRow[] = [
  { id: "1",  name: "Bosch Drill GSB 18V",       category: "Power Tools", qty: 34,  totalCost: 1530,  potentialRevenue: 3059,  potentialProfit: 1529, status: "ok",  qtyTrend: 12, profitTrend: 8   },
  { id: "2",  name: "DeWalt Circular Saw",        category: "Power Tools", qty: 12,  totalCost: 1056,  potentialRevenue: 2028,  potentialProfit: 972,  status: "ok",  qtyTrend: 5,  profitTrend: 3   },
  { id: "3",  name: "Hilti Hammer Drill TE 6",    category: "Power Tools", qty: 7,   totalCost: 994,   potentialRevenue: 1876,  potentialProfit: 882,  status: "low", qtyTrend: 18, profitTrend: 15  },
  { id: "4",  name: "Makita Angle Grinder",       category: "Power Tools", qty: 18,  totalCost: 936,   potentialRevenue: 1799,  potentialProfit: 863,  status: "ok",  qtyTrend: -4, profitTrend: -2  },
  { id: "5",  name: "B+D Jigsaw JS10",            category: "Power Tools", qty: 3,   totalCost: 114,   potentialRevenue: 224,   potentialProfit: 110,  status: "low", qtyTrend: -22,profitTrend: -18 },
  { id: "6",  name: "Stanley Hammer 16oz",        category: "Hand Tools",  qty: 62,  totalCost: 775,   potentialRevenue: 1549,  potentialProfit: 774,  status: "ok",  qtyTrend: 2,  profitTrend: 1   },
  { id: "7",  name: "Knipex Pliers 200mm",        category: "Hand Tools",  qty: 2,   totalCost: 36,    potentialRevenue: 69,    potentialProfit: 33,   status: "low", qtyTrend: -31,profitTrend: -28 },
  { id: "8",  name: "Wera Screwdriver Set 6pc",   category: "Hand Tools",  qty: 29,  totalCost: 638,   potentialRevenue: 1303,  potentialProfit: 665,  status: "ok",  qtyTrend: 7,  profitTrend: 5   },
  { id: "9",  name: "Irwin Adjustable Wrench",    category: "Hand Tools",  qty: 41,  totalCost: 401,   potentialRevenue: 819,   potentialProfit: 418,  status: "ok",  qtyTrend: 4,  profitTrend: 2   },
  { id: "10", name: "Bahco Hacksaw 300mm",        category: "Hand Tools",  qty: 0,   totalCost: 0,     potentialRevenue: 0,     potentialProfit: 0,    status: "out", qtyTrend:-100,profitTrend:-100 },
  { id: "11", name: "DeWalt Saw Blade Set 5pc",   category: "Accessories", qty: 24,  totalCost: 446,   potentialRevenue: 887,   potentialProfit: 441,  status: "ok",  qtyTrend: 9,  profitTrend: 6   },
  { id: "12", name: "Bosch Drill Bit Set 32pc",   category: "Accessories", qty: 4,   totalCost: 96,    potentialRevenue: 187,   potentialProfit: 91,   status: "low", qtyTrend:-15, profitTrend:-12  },
  { id: "13", name: "3M Safety Glasses",          category: "Accessories", qty: 88,  totalCost: 369,   potentialRevenue: 791,   potentialProfit: 422,  status: "ok",  qtyTrend: 6,  profitTrend: 4   },
  { id: "14", name: "Milwaukee Work Gloves L",    category: "Accessories", qty: 55,  totalCost: 374,   potentialRevenue: 769,   potentialProfit: 395,  status: "ok",  qtyTrend: 3,  profitTrend: 2   },
  { id: "15", name: "DeWalt Toolbox 19\"",        category: "Accessories", qty: 9,   totalCost: 306,   potentialRevenue: 584,   potentialProfit: 278,  status: "ok",  qtyTrend: 11, profitTrend: 8   },
  { id: "16", name: "Würth Screws 6x50",          category: "Hardware",    qty: 142, totalCost: 454,   potentialRevenue: 923,   potentialProfit: 469,  status: "ok",  qtyTrend: 1,  profitTrend: 1   },
  { id: "17", name: "Fischer Anchors SX8",        category: "Hardware",    qty: 96,  totalCost: 268,   potentialRevenue: 552,   potentialProfit: 284,  status: "ok",  qtyTrend: 8,  profitTrend: 5   },
  { id: "18", name: "Hilti Epoxy Adhesive",       category: "Hardware",    qty: 0,   totalCost: 0,     potentialRevenue: 0,     potentialProfit: 0,    status: "out", qtyTrend:-100,profitTrend:-100 },
  { id: "19", name: "3M Masking Tape 48mm",       category: "Hardware",    qty: 78,  totalCost: 202,   potentialRevenue: 409,   potentialProfit: 207,  status: "ok",  qtyTrend: 5,  profitTrend: 3   },
  { id: "20", name: "Wago Connectors 221",        category: "Hardware",    qty: 61,  totalCost: 902,   potentialRevenue: 1765,  potentialProfit: 863,  status: "ok",  qtyTrend: 14, profitTrend: 10  },
];

const STOCK_ITEMS: StockItem[] = [
  { id: "1", name: "Bosch Drill GSB 18V",     qty: 34 },
  { id: "2", name: "Hilti Hammer Drill TE 6", qty: 7  },
  { id: "3", name: "Knipex Pliers 200mm",     qty: 2  },
  { id: "4", name: "Bahco Hacksaw 300mm",     qty: 0  },
  { id: "5", name: "Hilti Epoxy Adhesive",    qty: 0  },
];

export const Default: Story = {
  name: "All Inventory Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Inventory Cards"
        description="Stock management cards for the tools store. InventoryCards is a composite card that bundles availability, category breakdowns, and top-profit items into a single section."
      />

      <StorySection title="Stock Availability (standalone)">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[300px]">
            <StockAvailabilityCard
              totalAsset="€48K"
              totalProduct={762}
              availability={{ available: 76, lowStock: 16, outOfStock: 8 }}
              lowStockItems={STOCK_ITEMS}
            />
          </div>
          <div className="flex-1 min-w-[320px]">
            <BarBreakdownCard
              title="Cost vs Revenue by Category"
              variant="full"
              headlines={[
                { label: "Total Cost",    value: "€8.4K" },
                { label: "Potential Rev", value: "€18.6K" },
              ]}
              metrics={[
                { label: "Gross Margin", primary: "55%", badge: { value: "+2.3%", direction: "up" } },
                { label: "Needs Reorder", primary: "7" },
              ]}
              categories={[
                { key: "cost",    label: "Buy Cost",     color: "#6366f1" },
                { key: "revenue", label: "Sell Revenue", color: "#22c55e" },
              ]}
              data={[
                { name: "Power",  cost: 4630, revenue: 8986  },
                { name: "Hand",   cost: 1850, revenue: 3740  },
                { name: "Acc.",   cost: 1591, revenue: 3218  },
                { name: "HW",     cost: 1826, revenue: 3649  },
              ]}
              periods={["Current Stock"]}
              defaultPeriod="Current Stock"
            />
          </div>
        </StoryStack>
      </StorySection>

      <StorySection title="InventoryCards (composite)">
        <InventoryCards
          rows={ROWS}
          categoryLabels={{ "Power Tools": "Power", "Hand Tools": "Hand", Accessories: "Acc.", Hardware: "HW" }}
          revenueChangePct={8.4}
          costChangePct={3.1}
          marginChangePct={2.3}
        />
      </StorySection>
    </StorySurface>
  ),
};
