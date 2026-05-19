import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoryIntro, StoryPanel, StorySection } from "../../shared/storybook";
import { BarChart } from "../../data-display/charts";
import { StatCard } from "../../data-display/dashboard-cards/StatCard";

import { DraggableGrid, type DraggableGridItem } from "./DraggableGrid";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof DraggableGrid> = {
  title: "Layout/DraggableGrid",
  component: DraggableGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Drag-and-drop card grid powered by dnd-kit. Supports S/M/L size chips, localStorage order persistence, " +
          "and two item variants: `default` (wrapped in a titled shell) or `bare` (renders the component as-is). " +
          "Activate edit mode to expose drag handles and size controls.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DraggableGrid>;

// ── Shared data ───────────────────────────────────────────────────────────────

const barData = [
  { name: "Mon", sales: 40 },
  { name: "Tue", sales: 60 },
  { name: "Wed", sales: 35 },
  { name: "Thu", sales: 80 },
  { name: "Fri", sales: 55 },
  { name: "Sat", sales: 20 },
  { name: "Sun", sales: 45 },
];

const barCategories = [{ key: "sales", color: "var(--ds-color-accent)" }];

const ITEMS: DraggableGridItem[] = [
  {
    id: "revenue",
    title: "Revenue",
    variant: "default",
    size: "small",
    component: (
      <StatCard
        title="Total Revenue"
        value="$84,320"
        dateRange="Last 30 days"
        badge={{ value: "12%", direction: "up" }}
        size="sm"
      />
    ),
  },
  {
    id: "orders",
    title: "Orders",
    variant: "default",
    size: "small",
    component: (
      <StatCard
        title="New Orders"
        value="1,240"
        dateRange="Last 30 days"
        badge={{ value: "4%", direction: "up" }}
        size="sm"
      />
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    variant: "default",
    size: "small",
    component: (
      <StatCard
        title="Refunds"
        value="$3,180"
        dateRange="Last 30 days"
        badge={{ value: "2%", direction: "down" }}
        size="sm"
      />
    ),
  },
  {
    id: "weekly-sales",
    title: "Weekly Sales",
    variant: "default",
    size: "medium",
    component: (
      <BarChart data={barData} categories={barCategories} height={200} />
    ),
  },
  {
    id: "weekly-orders",
    title: "Weekly Orders",
    variant: "default",
    size: "medium",
    component: (
      <BarChart
        data={barData.map((d) => ({ ...d, sales: Math.round(d.sales * 0.7) }))}
        categories={barCategories}
        height={200}
      />
    ),
  },
];

// ── Bare items (use Card so they look finished without a shell) ───────────────

const BARE_ITEMS: DraggableGridItem[] = [
  {
    id: "bare-a",
    variant: "bare",
    size: "small",
    component: (
      <div className="h-full rounded-md border border-ds-border-2 bg-ds-surface-1 p-4 flex flex-col gap-2 justify-center">
        <p className="text-xs text-ds-3 uppercase tracking-wider">Revenue</p>
        <p className="text-2xl font-bold text-ds-1">$84,320</p>
        <p className="text-xs" style={{ color: "var(--ds-color-success)" }}>↑ 12% vs last period</p>
      </div>
    ),
  },
  {
    id: "bare-b",
    variant: "bare",
    size: "small",
    component: (
      <div className="h-full rounded-md border border-ds-border-2 bg-ds-surface-1 p-4 flex flex-col gap-2 justify-center">
        <p className="text-xs text-ds-3 uppercase tracking-wider">Orders</p>
        <p className="text-2xl font-bold text-ds-1">1,240</p>
        <p className="text-xs" style={{ color: "var(--ds-color-success)" }}>↑ 4% vs last period</p>
      </div>
    ),
  },
  {
    id: "bare-c",
    variant: "bare",
    size: "medium",
    component: (
      <div className="h-full rounded-md border border-ds-border-2 bg-ds-surface-1 p-4">
        <p className="text-sm font-semibold text-ds-1 mb-4">Weekly Sales</p>
        <BarChart data={barData} categories={barCategories} height={160} />
      </div>
    ),
  },
];

// ── Stories ───────────────────────────────────────────────────────────────────

export const ViewMode: Story = {
  name: "View mode — drag disabled",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="DraggableGrid — view mode"
        description="editMode=false (default). Cards render in their positions; no handles or size chips shown."
      />
      <StorySection title="Grid">
        <DraggableGrid items={ITEMS} />
      </StorySection>
    </StoryPanel>
  ),
};

export const EditMode: Story = {
  name: "Edit mode — drag handles + size chips",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="DraggableGrid — edit mode"
        description="editMode=true + showItemMenu=true. Drag-handle button and S/M/L size chip buttons appear on each card. Drag to reorder."
      />
      <StorySection title="Editable grid">
        <DraggableGrid items={ITEMS} editMode showItemMenu />
      </StorySection>
    </StoryPanel>
  ),
};

export const WithPersistence: Story = {
  name: "With localStorage persistence",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="DraggableGrid — with persistence"
        description="storageKey prop saves card order to localStorage. Reorder and reload — order is preserved."
      />
      <StorySection title="Persistent grid">
        <DraggableGrid
          items={ITEMS}
          editMode
          showItemMenu
          storageKey="storybook-draggable-grid-demo"
        />
      </StorySection>
    </StoryPanel>
  ),
};

export const BareVariant: Story = {
  name: 'Bare variant — variant="bare"',
  render: () => (
    <StoryPanel>
      <StoryIntro
        title='DraggableGrid — variant="bare"'
        description='Items render their component directly without the white shell wrapper. Use when your component already has its own card styling.'
      />
      <StorySection title="Bare grid">
        <DraggableGrid items={BARE_ITEMS} editMode showItemMenu />
      </StorySection>
    </StoryPanel>
  ),
};
