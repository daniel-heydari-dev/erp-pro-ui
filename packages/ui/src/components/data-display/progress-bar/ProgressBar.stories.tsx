import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { ProgressBar } from "./index";

const meta: Meta<typeof ProgressBar> = {
  title: "Data Display/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compact progress indicator for quotas, capacity, completion, and throughput summaries.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "number", min: 0 } },
    max: { control: { type: "number", min: 1 } },
    label: { control: "text" },
    percentageLabel: { control: "text" },
    showPercentage: { control: "boolean" },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    tone: {
      control: "radio",
      options: ["default", "success", "warning", "danger", "info"],
    },
    className: { control: false },
    trackClassName: { control: false },
    fillClassName: { control: false },
    ariaLabel: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const QuotaProgress: Story = {
  args: {
    value: 142,
    max: 200,
    label: "142 units",
    size: "md",
    tone: "default",
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <div className="ui:rounded-[20px] ui:bg-slate-950 ui:p-8 ui:shadow-[0_20px_50px_rgba(15,23,42,0.4)]">
        <ProgressBar {...args} />
      </div>
    </StorySurface>
  ),
};

export const CapacityList: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <div className="ui:space-y-5 ui:rounded-[24px] ui:border ui:border-border ui:bg-card ui:p-6">
        <ProgressBar value={142} max={200} label="142 units" tone="default" />
        <ProgressBar value={84} max={120} label="84 reserved" tone="info" />
        <ProgressBar value={37} max={80} label="37 queued" tone="warning" />
      </div>
    </StorySurface>
  ),
};
