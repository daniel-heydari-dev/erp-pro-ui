import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { MiniNeonSparkline } from "./MiniNeonSparkline";

const sparkData = [
  { label: "M", value: 28 },
  { label: "T", value: 24 },
  { label: "W", value: 32 },
  { label: "T", value: 30 },
  { label: "F", value: 37 },
  { label: "S", value: 33 },
  { label: "S", value: 35 },
];

const meta: Meta<typeof MiniNeonSparkline> = {
  title: "Data Display/MiniNeonSparkline",
  component: MiniNeonSparkline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compact neon sparkline for KPI cards and dense table cells where a full chart would be too large.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallCards: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:sm:grid-cols-3">
        <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-3">
          <p className="ui:text-xs ui:uppercase ui:tracking-[0.14em] ui:text-ds-2">
            Revenue
          </p>
          <p className="ui:mt-1 ui:text-lg ui:font-semibold ui:text-ds-1">
            $48.2k
          </p>
          <MiniNeonSparkline
            className="ui:mt-2"
            data={sparkData}
            tone="default"
          />
        </div>
        <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-3">
          <p className="ui:text-xs ui:uppercase ui:tracking-[0.14em] ui:text-ds-2">
            Conversion
          </p>
          <p className="ui:mt-1 ui:text-lg ui:font-semibold ui:text-ds-1">
            6.4%
          </p>
          <MiniNeonSparkline
            className="ui:mt-2"
            data={sparkData}
            tone="success"
          />
        </div>
        <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-3">
          <p className="ui:text-xs ui:uppercase ui:tracking-[0.14em] ui:text-ds-2">
            Risk
          </p>
          <p className="ui:mt-1 ui:text-lg ui:font-semibold ui:text-ds-1">
            Medium
          </p>
          <MiniNeonSparkline
            className="ui:mt-2"
            data={sparkData}
            tone="warning"
          />
        </div>
      </div>
    </StorySurface>
  ),
};
