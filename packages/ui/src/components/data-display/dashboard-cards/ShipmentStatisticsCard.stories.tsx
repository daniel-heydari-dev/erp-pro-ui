import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { ShipmentStatisticsCard } from "./ShipmentStatisticsCard";
import type { ShipmentDataPoint } from "./ShipmentStatisticsCard";

const januaryData: ShipmentDataPoint[] = [
  { date: "1 Jan", shipment: 40, delivery: 55 },
  { date: "5 Jan", shipment: 60, delivery: 72 },
  { date: "9 Jan", shipment: 35, delivery: 48 },
  { date: "13 Jan", shipment: 80, delivery: 90 },
  { date: "17 Jan", shipment: 65, delivery: 78 },
  { date: "21 Jan", shipment: 45, delivery: 60 },
  { date: "25 Jan", shipment: 70, delivery: 82 },
  { date: "29 Jan", shipment: 50, delivery: 64 },
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const meta: Meta<typeof ShipmentStatisticsCard> = {
  title: "Data Display/Dashboard Cards/ShipmentStatisticsCard",
  component: ShipmentStatisticsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shipment vs delivery ComposedChart (bars + line) with a month-selector dropdown for period filtering.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    subtitle: { control: "text", description: "Optional subtitle beneath the title." },
    data: {
      control: false,
      description: "Array of ShipmentDataPoint: { date, shipment, delivery }.",
    },
    months: {
      control: false,
      description: "Month names shown in the dropdown.",
    },
    selectedMonth: {
      control: false,
      description: "Controlled selected month string.",
    },
    onMonthChange: {
      control: false,
      description: "Callback fired when the user selects a month.",
    },
    defaultMonth: {
      control: "text",
      description: "Default month for uncontrolled usage. Defaults to months[0].",
    },
    yAxisFormatter: {
      control: false,
      description: "Y-axis tick formatter. Defaults to '${v}%' style.",
    },
    shipmentColor: {
      control: "text",
      description: "Bar fill color for shipments.",
    },
    deliveryColor: {
      control: "text",
      description: "Line stroke color for deliveries.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { ShipmentStatisticsCard } from 'erp-pro-ui';
import type { ShipmentDataPoint } from 'erp-pro-ui';

const data: ShipmentDataPoint[] = [
  { date: '1 Jan', shipment: 40, delivery: 55 },
  { date: '5 Jan', shipment: 60, delivery: 72 },
  { date: '9 Jan', shipment: 35, delivery: 48 },
];

export function ShipmentStatisticsExample() {
  return (
    <ShipmentStatisticsCard
      data={data}
      defaultMonth="January"
      yAxisFormatter={(v) => \`\${v}%\`}
    />
  );
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <ShipmentStatisticsCard
        data={januaryData}
        months={months}
        defaultMonth="January"
        yAxisFormatter={(v) => `${v}%`}
      />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const customColorsSource = `import { ShipmentStatisticsCard } from 'erp-pro-ui';

export function ShipmentStatisticsCustomColorsExample() {
  return (
    <ShipmentStatisticsCard
      data={data}
      shipmentColor="var(--ds-chart-3)"
      deliveryColor="var(--ds-chart-1)"
      shipmentLabel="Dispatched"
      deliveryLabel="Arrived"
    />
  );
}`;

export const CustomColors: Story = {
  render: () => {
    const [selectedMonth, setSelectedMonth] = useState("March");
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="Custom colors + controlled month"
            description="Override shipmentColor and deliveryColor with any CSS color value. The month selector is controlled externally."
          />
          <StorySection>
            <ShipmentStatisticsCard
              data={januaryData}
              months={months}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              shipmentColor="var(--ds-chart-3)"
              deliveryColor="var(--ds-chart-1)"
              shipmentLabel="Dispatched"
              deliveryLabel="Arrived"
              yAxisFormatter={(v) => `${v}%`}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
  parameters: {
    docs: { source: { code: customColorsSource } },
  },
};
