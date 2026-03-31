import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Layout/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compact content card for summary blocks, empty states, and lightweight dashboard callouts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Primary heading displayed at the top of the card.",
    },
    description: {
      control: "text",
      description: "Supporting text displayed under the title.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default
 * Basic card layout with glassmorphism effects built-in.
 */
export const Default: Story = {
  args: {
    title: "Project Update",
    description: "The new UI components have been successfully deployed.",
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <Card {...args} />
    </StorySurface>
  ),
};

/**
 * ## Dashboard Summaries
 * A realistic grid of cards for compact operational highlights.
 */
export const DashboardSummaries: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
        <Card
          title="Orders Reviewed"
          description="124 purchase orders were verified in the last 24 hours."
        />
        <Card
          title="Stock Alerts"
          description="8 SKUs require replenishment before the next delivery wave."
        />
        <Card
          title="Warehouse Health"
          description="Cycle-count completion is currently at 96% across all active zones."
        />
      </div>
    </StorySurface>
  ),
};

/**
 * ## Long-Form Content
 * Demonstrates how the card behaves with longer descriptive copy while keeping a minimal API.
 */
export const LongFormContent: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <Card
        title="Migration Checklist"
        description="Before enabling the new ERP workspace for every branch, confirm role mappings, import the supplier catalog, verify audit retention settings, and schedule a final permission review with operations leadership."
      />
    </StorySurface>
  ),
};
