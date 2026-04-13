import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySurface } from "../../shared/storybook";
import { Chip } from "./Chip";
import { SplitChip, StatusDotChip } from "./SpecialChip";

const meta: Meta<typeof Chip> = {
  title: "Data Display/Chip",
  component: Chip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compact token for statuses, filters, assignments, and removable selections.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "soft", "glass"],
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    dot: {
      control: "boolean",
      description: "Shows a pulsing status dot.",
    },
    dotColor: { control: "text" },
    startIcon: { control: false, description: "Optional leading icon." },
    endIcon: { control: false, description: "Optional trailing icon." },
    onClick: {
      control: false,
      description: "Click handler for interactive chips.",
    },
    onRemove: {
      control: false,
      description: "Remove handler to show a dismiss button.",
    },
    maxWidth: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default
 * Basic informative chip, often used for status tagging.
 */
export const Default: Story = {
  args: {
    children: "Pending Review",
    variant: "soft",
    color: "warning",
    dot: true,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Chip {...args} />
    </StorySurface>
  ),
};

/**
 * ## Variants
 * Shows different material styles available for Chips.
 */
export const Variants: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        <Chip variant="filled" color="primary">
          Filled
        </Chip>
        <Chip variant="outlined" color="primary">
          Outlined
        </Chip>
        <Chip variant="soft" color="primary">
          Soft
        </Chip>
        <Chip variant="glass" color="primary">
          Glass
        </Chip>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Status Board
 * A practical status cluster for dashboards or row metadata.
 */
export const StatusBoard: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <div className="ui:flex ui:flex-wrap ui:gap-3">
        <Chip variant="soft" color="success" dot>
          In Stock
        </Chip>
        <Chip variant="soft" color="warning" dot>
          Pending Approval
        </Chip>
        <Chip variant="soft" color="info">
          Synced 2m ago
        </Chip>
        <Chip variant="outlined" color="error">
          Audit Required
        </Chip>
      </div>
    </StorySurface>
  ),
};

function InteractiveFiltersExample() {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "review">(
    "all",
  );

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:gap-3">
        <Chip
          variant={activeFilter === "all" ? "filled" : "outlined"}
          color="primary"
          onClick={() => setActiveFilter("all")}
          startIcon={<span>🔍</span>}
        >
          All orders
        </Chip>
        <Chip
          variant={activeFilter === "active" ? "filled" : "outlined"}
          color="success"
          onClick={() => setActiveFilter("active")}
          startIcon={<span>●</span>}
        >
          Active only
        </Chip>
        <Chip
          variant={activeFilter === "review" ? "filled" : "outlined"}
          color="warning"
          onClick={() => setActiveFilter("review")}
          startIcon={<span>⏳</span>}
        >
          Pending review
        </Chip>
      </div>
    </StorySurface>
  );
}

/**
 * ## Interactive Filters
 * Chips can act as compact toggles for table filters and quick segment switches.
 */
export const InteractiveFilters: Story = {
  render: () => <InteractiveFiltersExample />,
};

function RemovableFiltersExample() {
  const [filters, setFilters] = useState(["Active", "Enterprise", "Berlin"]);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:gap-3">
        {filters.map((filter) => (
          <Chip
            key={filter}
            variant="soft"
            color="info"
            onRemove={() =>
              setFilters((current) => current.filter((item) => item !== filter))
            }
          >
            {filter}
          </Chip>
        ))}
      </div>
    </StorySurface>
  );
}

/**
 * ## Removable Configuration
 * Supplying an `onRemove` handler renders a removable filter token.
 */
export const Removable: Story = {
  render: () => <RemovableFiltersExample />,
};

/**
 * ## Table Chips
 * Compact split-chip and status-chip styles for dense table cells.
 */
export const TableChips: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <div className="ui:flex ui:flex-col ui:gap-4">
        <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
          <SplitChip
            leftLabel="SKU"
            rightLabel="ABC-001234-BL-SUPER-LONG-VARIANT"
            truncateRight
            rightMaxWidth="8rem"
          />
          <SplitChip leftLabel="ID" rightLabel="USR-00291" />
        </div>
        <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
          <StatusDotChip tone="danger" label="Out of Stock" />
          <StatusDotChip tone="success" label="In Stock" />
          <StatusDotChip tone="warning" label="Low Stock" />
        </div>
        <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
          <SplitChip
            dir="rtl"
            leftLabel="رمز"
            rightLabel="ABC-001234-BL-SUPER-LONG-VARIANT"
            truncateRight
            rightMaxWidth="8rem"
          />
        </div>
      </div>
    </StorySurface>
  ),
};
