import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import ASCIIText from "./ASCIIText";

const meta: Meta<typeof ASCIIText> = {
  title: "Effects/ASCIIText",
  component: ASCIIText,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "WebGL-driven ASCII text effect for hero moments and branded display screens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    asciiFontSize: { control: "number" },
    textFontSize: { control: "number" },
    textColor: { control: "text" },
    planeBaseHeight: { control: "number" },
    enableWaves: { control: "boolean" },
    className: { control: "text" },
    style: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HeroDisplay: Story = {
  args: {
    text: "ERP",
    asciiFontSize: 8,
    textFontSize: 200,
    textColor: "var(--ds-color-fg)",
    planeBaseHeight: 8,
    enableWaves: true,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-0">
      <div className="ui:relative ui:h-[28rem] ui:overflow-hidden ui:rounded-none ui:bg-neutral-950">
        <ASCIIText {...args} style={{ position: "absolute", inset: 0 }} />
      </div>
    </StorySurface>
  ),
};

export const StaticDisplay: Story = {
  args: {
    text: "OPS",
    asciiFontSize: 10,
    textFontSize: 180,
    textColor: "var(--ds-color-fg)",
    planeBaseHeight: 7,
    enableWaves: false,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:relative ui:h-80 ui:overflow-hidden ui:rounded-3xl ui:bg-black">
        <ASCIIText {...args} style={{ position: "absolute", inset: 0 }} />
      </div>
    </StorySurface>
  ),
};
