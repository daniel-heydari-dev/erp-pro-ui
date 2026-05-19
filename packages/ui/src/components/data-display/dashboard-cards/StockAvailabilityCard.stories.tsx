import type { Meta, StoryObj } from "@storybook/react-vite";

import { StockAvailabilityCard } from "./StockAvailabilityCard";

const meta: Meta<typeof StockAvailabilityCard> = {
  title: "Data Display / Dashboard Cards / Inventory / StockAvailabilityCard",
  component: StockAvailabilityCard,
  tags: ["autodocs"],
  argTypes: {
    lowStockItems: { control: false },
    onViewAll:     { control: false },
    onMenuClick:   { control: false },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Total asset value and SKU count with a thin 3-segment availability bar " +
          "(Available / Low Stock / Out of Stock) and a low-stock action list. " +
          "Designed for warehouse managers who need at-a-glance inventory health every morning.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StockAvailabilityCard>;

// Nexus Commerce — Electronics & Accessories warehouse, May 2026
const lowStockItems = [
  { id: 1, name: "USB-C Fast Charger 65W",    qty: 3 },
  { id: 2, name: "Wireless Earbuds Pro X",     qty: 5 },
  { id: 3, name: "Laptop Stand Aluminum",      qty: 2 },
  { id: 4, name: "HDMI 2.1 Cable 2m",          qty: 7 },
];

export const NexusCommerce: Story = {
  name: "Nexus Commerce — Electronics warehouse",
  args: {
    title:        "Stock Availability",
    totalAsset:   "$1.84M",
    totalProduct: 2847,
    availability: { available: 65, lowStock: 24, outOfStock: 11 },
    lowStockItems,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mid-May snapshot: 65% of 2,847 SKUs are healthy, 24% need reorder, 11% are fully out. " +
          "The four low-stock items need purchase orders raised today to avoid stockouts.",
      },
    },
  },
  render: (args) => (
    <div className="w-[380px]">
      <StockAvailabilityCard {...args} />
    </div>
  ),
};

export const HealthyWarehouse: Story = {
  name: "Healthy warehouse (post-restock)",
  args: {
    title:        "Stock Availability",
    totalAsset:   "$2.31M",
    totalProduct: 3104,
    availability: { available: 88, lowStock: 9, outOfStock: 3 },
  },
  parameters: {
    docs: {
      description: {
        story:
          "After the weekly restock run: 88% availability with only 3% fully out. " +
          "No low-stock action list shown when inventory is healthy.",
      },
    },
  },
  render: (args) => (
    <div className="w-[380px]">
      <StockAvailabilityCard {...args} />
    </div>
  ),
};

export const CriticalShortage: Story = {
  name: "Critical shortage (Q4 peak demand)",
  args: {
    title:        "Stock Availability",
    totalAsset:   "$940,200",
    totalProduct: 1820,
    availability: { available: 38, lowStock: 35, outOfStock: 27 },
    lowStockItems: [
      { id: 1, name: 'Smart TV 55" QLED',         qty: 1 },
      { id: 2, name: "Gaming Console Bundle",      qty: 0 },
      { id: 3, name: "Noise-Cancelling Headset",   qty: 4 },
      { id: 4, name: "Portable Bluetooth Speaker", qty: 2 },
      { id: 5, name: "4K Webcam Pro",              qty: 3 },
    ],
    onViewAll: () => undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Black Friday scenario: inventory depleted to 38% availability. " +
          "27% of SKUs are fully out of stock — emergency supplier calls required.",
      },
    },
  },
  render: (args) => (
    <div className="w-[380px]">
      <StockAvailabilityCard {...args} />
    </div>
  ),
};
