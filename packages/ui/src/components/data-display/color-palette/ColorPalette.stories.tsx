import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../forms/button";
import { StorySurface } from "../../shared/storybook";
import ColorPalette from "./ColorPalette";

const brands = ["purple", "teal", "yellow", "green"] as const;
const modes = ["light", "dark"] as const;

const meta: Meta<typeof ColorPalette> = {
  title: "Data Display/ColorPalette",
  component: ColorPalette,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Reference palette for the design system color tokens, gradients, and implementation examples.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    theme: { control: "radio", options: ["light", "dark", "all"] },
    showGradients: { control: "boolean" },
    showUsageExamples: { control: "boolean" },
    groups: { control: false, description: "Optional custom color groups." },
    className: {
      control: false,
      description: "Custom class for the root palette.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## System Palette
 * Shows the full theme token set.
 */
export const SystemPalette: Story = {
  args: {
    theme: "all",
    showGradients: true,
    showUsageExamples: false,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <ColorPalette {...args} />
    </StorySurface>
  ),
};

/**
 * ## Implementation Guide
 * Focuses on usage guidance rather than the full palette display.
 */
export const ImplementationGuide: Story = {
  args: {
    groups: [],
    showUsageExamples: true,
    showGradients: false,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <ColorPalette {...args} />
    </StorySurface>
  ),
};

/**
 * ## Brand Override Example
 * Demonstrates replacing the defaults with custom groups.
 */
export const BrandOverrideExample: Story = {
  args: {
    groups: [
      {
        name: "Brand Colors",
        colors: [
          { name: "brand-pink", value: "#FF0077" },
          { name: "brand-cyan", value: "#00E0FF" },
        ],
      },
    ],
    showGradients: false,
    showUsageExamples: false,
  },
  render: (args) => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-4xl"
      className="ui:block ui:p-6"
    >
      <ColorPalette {...args} />
    </StorySurface>
  ),
};

/**
 * ## Brand And Mode Matrix
 * Verifies the semantic token contract across every shipped brand and mode pair.
 */
export const BrandAndModeMatrix: Story = {
  args: {
    showGradients: false,
    showUsageExamples: false,
  },
  render: () => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <div className="ui:space-y-6">
        <div className="ui:max-w-3xl ui:space-y-2">
          <h2 className="ui:text-2xl ui:font-semibold ui:text-fg">
            Brand and mode verification
          </h2>
          <p className="ui:text-sm ui:text-fg-muted">
            Each card applies data-brand and data-mode directly so Storybook can
            verify accent, surface, border, and foreground semantics for every
            supported combination.
          </p>
        </div>

        <div className="ui:grid ui:grid-cols-1 ui:gap-4 lg:ui:grid-cols-2 xl:ui:grid-cols-4">
          {brands.flatMap((brand) =>
            modes.map((mode) => (
              <section
                key={`${brand}-${mode}`}
                data-brand={brand}
                data-mode={mode}
                className="ui:rounded-2xl ui:border ui:border-border ui:bg-canvas ui:p-4 ui:shadow-sm"
              >
                <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between">
                  <div>
                    <p className="ui:text-sm ui:font-semibold ui:text-fg">
                      {brand}
                    </p>
                    <p className="ui:text-xs ui:uppercase ui:tracking-[0.16em] ui:text-fg-muted">
                      {mode}
                    </p>
                  </div>
                  <span className="ui:rounded-full ui:bg-accent-subtle ui:px-3 ui:py-1 ui:text-xs ui:font-medium ui:text-accent">
                    accent
                  </span>
                </div>

                <div className="ui:space-y-3 ui:rounded-xl ui:border ui:border-border ui:bg-surface ui:p-4">
                  <div className="ui:flex ui:items-center ui:gap-2">
                    <Button label="Primary action" primary />
                    <span className="ui:rounded-full ui:border ui:border-border ui:bg-surface ui:px-3 ui:py-1 ui:text-xs ui:text-fg-muted">
                      Surface token
                    </span>
                  </div>

                  <div className="ui:grid ui:grid-cols-3 ui:gap-2">
                    <div className="ui:rounded-lg ui:bg-accent-subtle ui:p-3 ui:text-center ui:text-xs ui:font-medium ui:text-accent">
                      Accent subtle
                    </div>
                    <div className="ui:rounded-lg ui:bg-success-subtle ui:p-3 ui:text-center ui:text-xs ui:font-medium ui:text-success">
                      Success
                    </div>
                    <div className="ui:rounded-lg ui:bg-danger-subtle ui:p-3 ui:text-center ui:text-xs ui:font-medium ui:text-danger">
                      Danger
                    </div>
                  </div>

                  <div className="ui:rounded-lg ui:border ui:border-border ui:bg-elevated ui:p-3">
                    <p className="ui:text-sm ui:font-medium ui:text-fg">
                      Semantic text and borders
                    </p>
                    <p className="ui:mt-1 ui:text-xs ui:text-fg-muted">
                      Brand-specific accent plus mode-specific canvas, surface,
                      and foreground values.
                    </p>
                  </div>
                </div>
              </section>
            )),
          )}
        </div>
      </div>
    </StorySurface>
  ),
};
