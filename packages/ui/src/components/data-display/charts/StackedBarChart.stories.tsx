import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { StackedBarChart } from "./StackedBarChart";

const staffingData = [
  { name: "Mon", picking: 28, packing: 18, quality: 9, dispatch: 12 },
  { name: "Tue", picking: 32, packing: 20, quality: 8, dispatch: 10 },
  { name: "Wed", picking: 35, packing: 24, quality: 10, dispatch: 11 },
  { name: "Thu", picking: 31, packing: 22, quality: 9, dispatch: 13 },
  { name: "Fri", picking: 38, packing: 25, quality: 11, dispatch: 14 },
];

const staffingCategories = [
  { key: "picking", color: "#7367f0", label: "Picking" },
  { key: "packing", color: "#00cfe8", label: "Packing" },
  { key: "quality", color: "#ff9f43", label: "Quality" },
  { key: "dispatch", color: "#28c76f", label: "Dispatch" },
];

const meta: Meta<typeof StackedBarChart> = {
  title: "Data Display/StackedBarChart",
  component: StackedBarChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Stacked bars for comparing totals while preserving the category composition behind each total.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    yAxisDomain: {
      control: false,
      description: "Optional fixed vertical scale.",
    },
    data: { control: false, description: "Stacked series data." },
    categories: {
      control: false,
      description: "Stack definitions, labels, and colors.",
    },
    className: {
      control: false,
      description: "Custom classes for the outer container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DailyTeamMix: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <StackedBarChart
        data={staffingData}
        categories={staffingCategories}
        height={360}
        yAxisDomain={[0, 90]}
        className="ui:px-2"
      />
    </StorySurface>
  ),
};

export const ConsistentScaleAcrossReports: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl" className="ui:block">
      <div className="ui:grid ui:w-full ui:gap-4 md:ui:grid-cols-2">
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-5">
          <p className="ui:text-sm ui:font-medium">With fixed domain</p>
          <StackedBarChart
            data={staffingData.slice(0, 3)}
            categories={staffingCategories}
            height={280}
            yAxisDomain={[0, 90]}
          />
        </div>
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-5">
          <p className="ui:text-sm ui:font-medium">Auto domain</p>
          <StackedBarChart
            data={staffingData.slice(0, 3)}
            categories={staffingCategories}
            height={280}
          />
        </div>
      </div>
    </StorySurface>
  ),
};
