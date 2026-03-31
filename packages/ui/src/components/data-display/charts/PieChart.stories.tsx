import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { PieChart } from "./PieChart";

const productMixData = [
  { name: "Software", value: 420 },
  { name: "Hardware", value: 260 },
  { name: "Services", value: 210 },
  { name: "Cloud", value: 160 },
];

const resolutionData = [
  { name: "Resolved", value: 68 },
  { name: "Escalated", value: 18 },
  { name: "Pending", value: 14 },
];

const meta: Meta<typeof PieChart> = {
  title: "Data Display/PieChart",
  component: PieChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pie and donut charts for distribution summaries and share-of-total views.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["pie", "donut"] },
    height: { control: "number" },
    data: { control: false, description: "Slice data as name/value pairs." },
    colors: {
      control: false,
      description: "Color palette used for slice rendering.",
    },
    className: {
      control: false,
      description: "Custom classes for the outer container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DonutDistribution: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <PieChart
        data={productMixData}
        colors={["#7367f0", "#00cfe8", "#28c76f", "#ff9f43"]}
        variant="donut"
        height={320}
      />
    </StorySurface>
  ),
};

export const CompactStatusSplit: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <PieChart
        data={resolutionData}
        colors={["#28c76f", "#ff9f43", "#ff4c51"]}
        variant="pie"
        height={320}
      />
    </StorySurface>
  ),
};
