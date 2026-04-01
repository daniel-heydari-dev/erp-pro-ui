import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { ThinBreakdownBar } from "./ThinBreakdownBar";

const infrastructureSegments = [
  { label: "Compute", value: 45, color: "var(--ds-chart-1)" },
  { label: "Database", value: 25, color: "var(--ds-chart-2)" },
  { label: "Queues", value: 15, color: "var(--ds-chart-3)" },
  { label: "Storage", value: 10, color: "var(--ds-chart-4)" },
  { label: "Other", value: 5, color: "var(--ds-chart-5)" },
];

const capacityRows = [
  {
    title: "Warehouse A",
    segments: [
      { label: "Available", value: 58, color: "var(--ds-chart-3)" },
      { label: "Reserved", value: 27, color: "var(--ds-chart-1)" },
      { label: "Blocked", value: 15, color: "var(--ds-chart-4)" },
    ],
  },
  {
    title: "Warehouse B",
    segments: [
      { label: "Available", value: 36, color: "var(--ds-chart-3)" },
      { label: "Reserved", value: 44, color: "var(--ds-chart-1)" },
      { label: "Blocked", value: 20, color: "var(--ds-chart-4)" },
    ],
  },
];

const meta: Meta<typeof ThinBreakdownBar> = {
  title: "Data Display/ThinBreakdownBar",
  component: ThinBreakdownBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compact proportional indicator for showing how a total is divided across a few segments.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showLabels: { control: "boolean" },
    data: {
      control: false,
      description: "Segments containing label, value, and color.",
    },
    className: {
      control: false,
      description: "Custom classes for the outer container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllocationOverview: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:w-full ui:space-y-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
        <div>
          <p className="ui:text-sm ui:font-medium">
            Infrastructure spend allocation
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Segment widths are derived from their share of the full spend
            profile.
          </p>
        </div>
        <ThinBreakdownBar data={infrastructureSegments} />
      </div>
    </StorySurface>
  ),
};

export const CompactCapacityRows: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:w-full ui:space-y-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
        {capacityRows.map((row) => (
          <div key={row.title} className="ui:space-y-2">
            <div className="ui:flex ui:items-center ui:justify-between ui:gap-3">
              <p className="ui:text-sm ui:font-medium">{row.title}</p>
              <p className="ui:text-xs ui:text-muted-foreground">
                Live capacity mix
              </p>
            </div>
            <ThinBreakdownBar data={row.segments} showLabels={false} />
          </div>
        ))}
      </div>
    </StorySurface>
  ),
};
