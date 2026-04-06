import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoryIntro, StoryStack, StorySurface } from "../../shared/storybook";
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

const weeklyTrafficMix = [
  { label: "Desktop", value: 7324, color: "var(--ds-chart-1)" },
  { label: "Mobile", value: 7250, color: "var(--ds-chart-2)" },
  { label: "Tablet", value: 1180, color: "var(--ds-chart-4)" },
  { label: "Other", value: 420, color: "var(--ds-chart-15)" },
];

const formatCompactValue = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return new Intl.NumberFormat().format(value);
};

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
    showSummary: { control: "boolean" },
    summaryLabel: { control: "text" },
    valueFormatter: { control: false },
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

const allocationOverviewSource = `import { ThinBreakdownBar, type BreakdownSegment } from 'erp-pro-ui';

const data: BreakdownSegment[] = [
  { label: 'Compute', value: 45, color: 'var(--ds-chart-1)' },
  { label: 'Database', value: 25, color: 'var(--ds-chart-2)' },
  { label: 'Queues', value: 15, color: 'var(--ds-chart-3)' },
  { label: 'Storage', value: 10, color: 'var(--ds-chart-4)' },
  { label: 'Other', value: 5, color: 'var(--ds-chart-5)' },
];

export function AllocationOverviewExample() {
  return <ThinBreakdownBar data={data} />;
}`;

const compactCapacitySource = `import { ThinBreakdownBar, type BreakdownSegment } from 'erp-pro-ui';

const warehouseA: BreakdownSegment[] = [
  { label: 'Available', value: 58, color: 'var(--ds-chart-3)' },
  { label: 'Reserved', value: 27, color: 'var(--ds-chart-1)' },
  { label: 'Blocked', value: 15, color: 'var(--ds-chart-4)' },
];

const warehouseB: BreakdownSegment[] = [
  { label: 'Available', value: 36, color: 'var(--ds-chart-3)' },
  { label: 'Reserved', value: 44, color: 'var(--ds-chart-1)' },
  { label: 'Blocked', value: 20, color: 'var(--ds-chart-4)' },
];

export function CapacityRowsExample() {
  return (
    <div className="space-y-4">
      <ThinBreakdownBar data={warehouseA} showLabels={false} />
      <ThinBreakdownBar data={warehouseB} showLabels={false} />
    </div>
  );
}`;

const interactiveSummarySource = `import { ThinBreakdownBar, type BreakdownSegment } from 'erp-pro-ui';

const trafficMix: BreakdownSegment[] = [
  { label: 'Desktop', value: 7324, color: 'var(--ds-chart-1)' },
  { label: 'Mobile', value: 7250, color: 'var(--ds-chart-2)' },
  { label: 'Tablet', value: 1180, color: 'var(--ds-chart-4)' },
  { label: 'Other', value: 420, color: 'var(--ds-chart-15)' },
];

export function InteractiveBreakdownSummaryExample() {
  return (
    <ThinBreakdownBar
      data={trafficMix}
      showSummary
      summaryLabel="Weekly sessions"
      valueFormatter={(value) => (value >= 1000 ? String((value / 1000).toFixed(1)) + 'k' : String(value))}
    />
  );
}`;

export const AllocationOverview: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <StoryStack className="ui:w-full ui:gap-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
        <StoryIntro
          title="Infrastructure spend allocation"
          description="Segment widths are derived from their share of the full spend profile."
        />
        <ThinBreakdownBar data={infrastructureSegments} />
      </StoryStack>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: allocationOverviewSource } } },
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
  parameters: { docs: { source: { code: compactCapacitySource } } },
};

export const InteractiveSummary: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <StoryStack className="ui:w-full ui:gap-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
        <StoryIntro
          title="Traffic mix with live summary"
          description="The bar shows the total by default, then switches to segment-specific value and share when you hover a slice."
        />
        <ThinBreakdownBar
          data={weeklyTrafficMix}
          showSummary
          summaryLabel="Weekly sessions"
          valueFormatter={formatCompactValue}
        />
      </StoryStack>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: interactiveSummarySource } } },
};
