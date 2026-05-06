import type { Meta, StoryObj } from "@storybook/react-vite";

import { VehiclesOverviewCard } from "./VehiclesOverviewCard";

const meta: Meta<typeof VehiclesOverviewCard> = {
  title: "Data Display/Dashboard Cards/VehiclesOverviewCard",
  component: VehiclesOverviewCard,
  tags: ["autodocs"],
  argTypes: {
    items:       { control: false },
    onMenuClick: { control: false },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Stacked horizontal bar segmented by fleet or logistics status, " +
          "with a breakdown list showing icon, label, duration, and percentage per segment. " +
          "Used by warehouse and logistics managers to monitor delivery fleet utilisation in real time.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VehiclesOverviewCard>;

// ── Icon helpers ──────────────────────────────────────────────────────────────

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const UnloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const LoadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

// ── Stories ───────────────────────────────────────────────────────────────────

export const DeliveryFleet: Story = {
  name: "Nexus Commerce — Delivery fleet status",
  args: {
    title: "Delivery Fleet Status",
    items: [
      { label: "In Transit",  duration: "2hr 18min", percentage: 42.1, color: "#28C76F", icon: <TruckIcon /> },
      { label: "Unloading",   duration: "1hr 45min", percentage: 26.8, color: "#7367F0", icon: <UnloadIcon /> },
      { label: "Loading",     duration: "0hr 52min", percentage: 18.4, color: "#00CFE8", icon: <LoadIcon /> },
      { label: "Awaiting",    duration: "4hr 07min", percentage: 12.7, color: "#FF9F43", icon: <ClockIcon /> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Real-time fleet snapshot: 42% of vehicles are actively in transit. " +
          "'Awaiting' at 12.7% with 4hr average idle time — investigate dock scheduling to reduce wait.",
      },
    },
  },
  render: (args) => (
    <div className="w-96">
      <VehiclesOverviewCard {...args} />
    </div>
  ),
};

export const WarehouseOps: Story = {
  name: "Warehouse operations (last-mile focus)",
  args: {
    title: "Last-Mile Operations",
    items: [
      { label: "Out for Delivery", duration: "3hr 05min", percentage: 51.2, color: "#28C76F", icon: <TruckIcon /> },
      { label: "Sorting",          duration: "0hr 38min", percentage: 22.4, color: "#00CFE8", icon: <LoadIcon /> },
      { label: "Driver Break",     duration: "1hr 12min", percentage: 14.8, color: "#FF9F43", icon: <ClockIcon /> },
      { label: "Return Pickup",    duration: "2hr 20min", percentage: 11.6, color: "#EA5455", icon: <UnloadIcon /> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Last-mile carrier view: 51% are out for delivery (healthy). " +
          "Return pickups at 11.6% — worth tracking against the 3% return rate KPI.",
      },
    },
  },
  render: (args) => (
    <div className="w-96">
      <VehiclesOverviewCard {...args} />
    </div>
  ),
};
