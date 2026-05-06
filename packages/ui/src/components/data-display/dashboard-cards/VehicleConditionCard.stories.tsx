import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { VehicleConditionCard } from "./VehicleConditionCard";
import type { VehicleConditionItem } from "./VehicleConditionCard";

const fiveItems: VehicleConditionItem[] = [
  {
    label: "Excellent",
    sublabel: "24 vehicles",
    percentage: 92,
    color: "var(--ds-color-success)",
    badge: "+10%",
  },
  {
    label: "Good",
    sublabel: "18 vehicles",
    percentage: 74,
    color: "var(--ds-color-info)",
    badge: "8.1",
  },
  {
    label: "Fair",
    sublabel: "9 vehicles",
    percentage: 55,
    color: "var(--ds-color-warning)",
    badge: "-2.5%",
  },
  {
    label: "Poor",
    sublabel: "5 vehicles",
    percentage: 32,
    color: "var(--ds-color-danger)",
    badge: "5",
  },
  {
    label: "Critical",
    sublabel: "all exceptions",
    percentage: 12,
    color: "var(--ds-chart-15)",
    badge: "!",
  },
];

const threeItems: VehicleConditionItem[] = [
  {
    label: "Operational",
    sublabel: "41 vehicles",
    percentage: 84,
    color: "var(--ds-color-success)",
    badge: "+6%",
  },
  {
    label: "In Maintenance",
    sublabel: "7 vehicles",
    percentage: 48,
    color: "var(--ds-color-warning)",
    badge: "7",
  },
  {
    label: "Out of Service",
    sublabel: "3 vehicles",
    percentage: 18,
    color: "var(--ds-color-danger)",
    badge: "-1",
  },
];

const meta: Meta<typeof VehicleConditionCard> = {
  title: "Data Display/Dashboard Cards/VehicleConditionCard",
  component: VehicleConditionCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Status list with SVG circular progress gauges, colored labels, and right-aligned badges — for categorical health/condition breakdowns.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    items: {
      control: false,
      description:
        "Array of VehicleConditionItem: { label, sublabel, percentage (0–100), color, badge }.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
    onMenuClick: { control: false, description: "Callback for the ellipsis menu button." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { VehicleConditionCard } from 'erp-pro-ui';
import type { VehicleConditionItem } from 'erp-pro-ui';

const items: VehicleConditionItem[] = [
  { label: 'Excellent', sublabel: '24 vehicles', percentage: 92, color: 'var(--ds-color-success)', badge: '+10%' },
  { label: 'Good', sublabel: '18 vehicles', percentage: 74, color: 'var(--ds-color-info)', badge: '8.1' },
  { label: 'Fair', sublabel: '9 vehicles', percentage: 55, color: 'var(--ds-color-warning)', badge: '-2.5%' },
  { label: 'Poor', sublabel: '5 vehicles', percentage: 32, color: 'var(--ds-color-danger)', badge: '5' },
  { label: 'Critical', sublabel: 'all exceptions', percentage: 12, color: 'var(--ds-chart-15)', badge: '!' },
];

export function VehicleConditionCardExample() {
  return <VehicleConditionCard items={items} />;
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <VehicleConditionCard items={fiveItems} />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const condensedSource = `import { VehicleConditionCard } from 'erp-pro-ui';
import type { VehicleConditionItem } from 'erp-pro-ui';

const items: VehicleConditionItem[] = [
  { label: 'Operational', sublabel: '41 vehicles', percentage: 84, color: 'var(--ds-color-success)', badge: '+6%' },
  { label: 'In Maintenance', sublabel: '7 vehicles', percentage: 48, color: 'var(--ds-color-warning)', badge: '7' },
  { label: 'Out of Service', sublabel: '3 vehicles', percentage: 18, color: 'var(--ds-color-danger)', badge: '-1' },
];

export function VehicleConditionCardCondensedExample() {
  return <VehicleConditionCard title="Fleet Status" items={items} />;
}`;

export const Condensed: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Three items — condensed"
          description="Fewer rows keep the card compact for dashboards that show multiple status cards side by side."
        />
        <StorySection>
          <VehicleConditionCard title="Fleet Status" items={threeItems} />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: condensedSource } },
  },
};
