import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import SunToMoonButton from "./SunToMoonButton";
import ThemeSwitcherButtons from "./ThemeSwitcherButtons";

const meta = {
  title: "Foundations/Theme/SunToMoonButton",
  component: SunToMoonButton,
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Animated theme toggle. Storybook provides ThemeProvider globally so this control behaves like the real app and can be tested in both display modes, brand palettes, and default/alt variants.",
      },
    },
  },
  argTypes: {
    showLabelAndImage: { control: "boolean" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SunToMoonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Advanced Theme Toggle
 * A beautiful animated toggle for light/dark mode.
 */
export const Default: Story = {
  args: {
    showLabelAndImage: true,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <SunToMoonButton {...args} />
    </StorySurface>
  ),
};

export const IconOnly: Story = {
  args: { showLabelAndImage: false },
};

/**
 * ## Toolbar Placement
 * Demonstrates how the control sits alongside other top-bar actions.
 */
export const ToolbarPlacement: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <div className="ui:flex ui:items-center ui:justify-between ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:px-4 ui:py-3">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">
            Workspace header
          </p>
          <p className="ui:text-sm ui:text-ds-2">
            Theme toggle aligned with other global controls.
          </p>
        </div>
        <SunToMoonButton showLabelAndImage={false} />
      </div>
    </StorySurface>
  ),
};

/**
 * ## Full Theme Controls
 * Sun/Moon mode toggle + brand and variant controls in one compact panel.
 */
export const FullThemeControls: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-[220px_1fr]">
        <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-3">
          <SunToMoonButton />
        </div>
        <ThemeSwitcherButtons />
      </div>
    </StorySurface>
  ),
};
