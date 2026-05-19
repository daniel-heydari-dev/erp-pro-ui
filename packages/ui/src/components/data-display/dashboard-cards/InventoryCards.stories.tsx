import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { InventoryCards } from "./InventoryCards";
import type { InventoryCardRow } from "./InventoryCards";

// ── Mock data ─────────────────────────────────────────────────────────────────

interface RawItem {
  id: string; name: string; category: string;
  qty: number; minQty: number; buyPrice: number; sellPrice: number;
  qtyTrend?: number; profitTrend?: number;
}

const RAW: RawItem[] = [
  { id: "1",  name: "Bosch Drill GSB 18V",        category: "Power Tools",  qty: 34,  minQty: 5, buyPrice: 45.00,  sellPrice: 89.99,  qtyTrend: 12,  profitTrend: 8   },
  { id: "2",  name: "DeWalt Circular Saw DWE",     category: "Power Tools",  qty: 12,  minQty: 5, buyPrice: 88.00,  sellPrice: 169.00, qtyTrend: 5,   profitTrend: 3   },
  { id: "3",  name: "Makita Angle Grinder 115mm",  category: "Power Tools",  qty: 18,  minQty: 5, buyPrice: 52.00,  sellPrice: 99.95,  qtyTrend: -4,  profitTrend: -2  },
  { id: "4",  name: "Hilti Hammer Drill TE 6",     category: "Power Tools",  qty: 7,   minQty: 5, buyPrice: 142.00, sellPrice: 268.00, qtyTrend: 18,  profitTrend: 15  },
  { id: "5",  name: "B+D Jigsaw JS10",             category: "Power Tools",  qty: 3,   minQty: 5, buyPrice: 38.00,  sellPrice: 74.99,  qtyTrend: -22, profitTrend: -18 },
  { id: "6",  name: "Stanley Hammer 16oz",         category: "Hand Tools",   qty: 62,  minQty: 5, buyPrice: 12.50,  sellPrice: 24.99,  qtyTrend: 2,   profitTrend: 1   },
  { id: "7",  name: "Knipex Pliers 200mm",         category: "Hand Tools",   qty: 2,   minQty: 5, buyPrice: 18.40,  sellPrice: 34.95,  qtyTrend: -31, profitTrend: -28 },
  { id: "8",  name: "Wera Screwdriver Set 6pc",    category: "Hand Tools",   qty: 29,  minQty: 5, buyPrice: 22.00,  sellPrice: 44.95,  qtyTrend: 7,   profitTrend: 5   },
  { id: "9",  name: "Irwin Adjustable Wrench",     category: "Hand Tools",   qty: 41,  minQty: 5, buyPrice: 9.80,   sellPrice: 19.99,  qtyTrend: 4,   profitTrend: 2   },
  { id: "10", name: "Bahco Hacksaw 300mm",         category: "Hand Tools",   qty: 0,   minQty: 5, buyPrice: 14.20,  sellPrice: 27.50,  qtyTrend: -100,profitTrend: -100},
  { id: "11", name: "DeWalt Saw Blade Set 5pc",    category: "Accessories",  qty: 24,  minQty: 5, buyPrice: 18.60,  sellPrice: 36.99,  qtyTrend: 9,   profitTrend: 6   },
  { id: "12", name: "Bosch Drill Bit Set 32pc",    category: "Accessories",  qty: 4,   minQty: 5, buyPrice: 24.00,  sellPrice: 46.95,  qtyTrend: -15, profitTrend: -12 },
  { id: "13", name: "3M Safety Glasses",           category: "Accessories",  qty: 88,  minQty: 5, buyPrice: 4.20,   sellPrice: 8.99,   qtyTrend: 6,   profitTrend: 4   },
  { id: "14", name: "Milwaukee Work Gloves L",     category: "Accessories",  qty: 55,  minQty: 5, buyPrice: 6.80,   sellPrice: 13.99,  qtyTrend: 3,   profitTrend: 2   },
  { id: "15", name: "DeWalt Toolbox 19\"",         category: "Accessories",  qty: 9,   minQty: 5, buyPrice: 34.00,  sellPrice: 64.95,  qtyTrend: 11,  profitTrend: 8   },
  { id: "16", name: "Würth Screws 6x50 (100pcs)",  category: "Hardware",     qty: 142, minQty: 5, buyPrice: 3.20,   sellPrice: 6.50,   qtyTrend: 1,   profitTrend: 1   },
  { id: "17", name: "Fischer Anchors SX8 (50pcs)", category: "Hardware",     qty: 96,  minQty: 5, buyPrice: 2.80,   sellPrice: 5.75,   qtyTrend: 8,   profitTrend: 5   },
  { id: "18", name: "Hilti Epoxy Adhesive 300ml",  category: "Hardware",     qty: 0,   minQty: 5, buyPrice: 16.50,  sellPrice: 31.95,  qtyTrend: -100,profitTrend: -100},
  { id: "19", name: "3M Masking Tape 48mm×50m",    category: "Hardware",     qty: 78,  minQty: 5, buyPrice: 2.60,   sellPrice: 5.25,   qtyTrend: 5,   profitTrend: 3   },
  { id: "20", name: "Wago Connectors 221 (100pcs)",category: "Hardware",     qty: 61,  minQty: 5, buyPrice: 14.80,  sellPrice: 28.95,  qtyTrend: 14,  profitTrend: 10  },
];

function buildRow(item: RawItem): InventoryCardRow {
  const totalCost        = item.qty * item.buyPrice;
  const potentialRevenue = item.qty * item.sellPrice;
  const potentialProfit  = potentialRevenue - totalCost;
  const status: InventoryCardRow["status"] =
    item.qty === 0 ? "out" : item.qty < item.minQty ? "low" : "ok";
  return {
    id: item.id, name: item.name, category: item.category, qty: item.qty,
    totalCost, potentialRevenue, potentialProfit, status,
    qtyTrend: item.qtyTrend, profitTrend: item.profitTrend,
  };
}

const ROWS = RAW.map(buildRow);

const CAT_LABELS: Record<string, string> = {
  "Power Tools": "Power",
  "Hand Tools":  "Hand",
  Accessories:   "Acc.",
  Hardware:      "HW",
};

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof InventoryCards> = {
  title: "Data Display / Dashboard Cards / Inventory / InventoryCards",
  component: InventoryCards,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InventoryCards>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Inventory Cards"
        description="Four-card summary: stock availability gauge, cost vs revenue by category, stock value per category with income/expense chart, and top items by profit potential — all with green/red trend badges."
      />
      <StorySection title="Tools store — 20 SKUs, 4 categories">
        <StoryStack>
          <InventoryCards
            rows={ROWS}
            categoryLabels={CAT_LABELS}
            revenueChangePct={8.4}
            costChangePct={3.1}
            marginChangePct={2.3}
          />
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};

export const NegativeTrends: Story = {
  render: () => {
    const badRows = ROWS.map((r) => ({
      ...r,
      qtyTrend:    r.qtyTrend    !== undefined ? -Math.abs(r.qtyTrend)    : undefined,
      profitTrend: r.profitTrend !== undefined ? -Math.abs(r.profitTrend) : undefined,
    }));
    return (
      <StorySurface>
        <StorySection title="Declining period — all trends negative">
          <StoryStack>
            <InventoryCards
              rows={badRows}
              categoryLabels={CAT_LABELS}
              revenueChangePct={-6.2}
              costChangePct={4.8}
              marginChangePct={-3.1}
            />
          </StoryStack>
        </StorySection>
      </StorySurface>
    );
  },
};

export const AllHealthy: Story = {
  render: () => {
    const healthyRows = ROWS.map((r) => ({ ...r, status: "ok" as const }));
    return (
      <StorySurface>
        <StorySection title="All items in stock — no low / out">
          <StoryStack>
            <InventoryCards
              rows={healthyRows}
              categoryLabels={CAT_LABELS}
              revenueChangePct={12.1}
              costChangePct={2.4}
              marginChangePct={4.7}
            />
          </StoryStack>
        </StorySection>
      </StorySurface>
    );
  },
};
