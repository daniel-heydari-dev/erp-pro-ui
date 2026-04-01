import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { BarChart } from "./BarChart";

const monthlyData = [
  { name: "Jan", fulfilled: 420, delayed: 38 },
  { name: "Feb", fulfilled: 465, delayed: 29 },
  { name: "Mar", fulfilled: 510, delayed: 34 },
  { name: "Apr", fulfilled: 548, delayed: 22 },
  { name: "May", fulfilled: 592, delayed: 18 },
  { name: "Jun", fulfilled: 625, delayed: 26 },
];

const monthlyCategories = [
  { key: "fulfilled", color: "var(--ds-chart-2)" },
  { key: "delayed", color: "var(--ds-chart-4)" },
];

const rankingData = [
  { name: "North Distribution Hub", transfers: 128 },
  { name: "Central Returns Team", transfers: 102 },
  { name: "West Picking Zone", transfers: 94 },
  { name: "Airport Forwarding Desk", transfers: 77 },
];

const meta: Meta<typeof BarChart> = {
  title: "Data Display/BarChart",
  component: BarChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Bar chart for comparing distinct buckets rather than continuous change.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "radio", options: ["horizontal", "vertical"] },
    height: { control: "number" },
    data: { control: false, description: "Bucketed chart data." },
    categories: { control: false, description: "Series keys and bar colors." },
    className: {
      control: false,
      description: "Custom classes for the outer container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MonthlyComparison: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <BarChart
        data={monthlyData}
        categories={monthlyCategories}
        height={360}
        className="ui:px-2"
      />
    </StorySurface>
  ),
};

export const RankingLayout: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <BarChart
        data={rankingData}
        categories={[{ key: "transfers", color: "var(--ds-chart-3)" }]}
        height={360}
        layout="vertical"
        className="ui:px-2"
      />
    </StorySurface>
  ),
};
