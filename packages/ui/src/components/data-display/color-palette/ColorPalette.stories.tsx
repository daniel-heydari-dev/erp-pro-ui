import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import ColorPalette from "./ColorPalette";

const brands = ["purple", "teal", "yellow", "green"] as const;
const modes = ["light", "dark"] as const;

// Core token checkpoints shown per brand/mode in the verification matrix.
const TOKEN_KEYS = [
  { label: "Canvas", cssVar: "--ds-surface-canvas" },
  { label: "Surface", cssVar: "--ds-surface-1" },
  { label: "Text", cssVar: "--ds-text-1" },
  { label: "Border", cssVar: "--ds-border-1" },
  { label: "Accent", cssVar: "--ds-accent" },
] as const;

function ThemeTokenReadout({
  brand,
  mode,
}: {
  brand: (typeof brands)[number];
  mode: (typeof modes)[number];
}) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [values, setValues] = React.useState<Record<string, string>>({});

  // Read computed values from the card context (`data-brand` + `data-mode`)
  // so Storybook shows the actual resolved token output.
  React.useLayoutEffect(() => {
    if (!cardRef.current) {
      return;
    }

    const computed = getComputedStyle(cardRef.current);
    const nextValues = TOKEN_KEYS.reduce<Record<string, string>>((acc, token) => {
      acc[token.cssVar] = computed.getPropertyValue(token.cssVar).trim();
      return acc;
    }, {});
    setValues(nextValues);
  }, [brand, mode]);

  return (
    <div
      ref={cardRef}
      data-brand={brand}
      data-mode={mode}
      className="ui:rounded-xl ui:border ui:border-border ui:bg-surface ui:p-3"
    >
      <div className="ui:mb-2 ui:flex ui:items-center ui:justify-between">
        <span className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-[0.16em] ui:text-fg-muted">
          {mode}
        </span>
        <span className="ui:rounded-full ui:bg-accent-subtle ui:px-2 ui:py-0.5 ui:text-[10px] ui:font-medium ui:text-accent">
          live tokens
        </span>
      </div>

      <div className="ui:grid ui:grid-cols-1 ui:gap-2">
        {TOKEN_KEYS.map((token) => (
          <div
            key={`${brand}-${mode}-${token.cssVar}`}
            className="ui:flex ui:items-center ui:justify-between ui:rounded-md ui:border ui:border-border ui:bg-elevated ui:px-2 ui:py-1.5"
          >
            <div className="ui:flex ui:items-center ui:gap-2">
              <span
                className="ui:h-3 ui:w-3 ui:rounded-full ui:border ui:border-border"
                style={{ backgroundColor: `var(${token.cssVar})` }}
              />
              <span className="ui:text-[11px] ui:font-medium ui:text-fg">
                {token.label}
              </span>
            </div>
            <span className="ui:text-[10px] ui:font-mono ui:text-fg-muted">
              {values[token.cssVar] ?? "…"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof ColorPalette> = {
  title: "Data Display/ColorPalette",
  component: ColorPalette,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organized color reference for semantic tokens, brand palettes, and practical implementation usage.",
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
 * ## 1) Quick Reference
 * Start here to see the full semantic token set.
 */
export const QuickReference: Story = {
  args: {
    theme: "all",
    showGradients: false,
    showUsageExamples: false,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl" className="ui:block ui:p-6">
      <ColorPalette {...args} />
    </StorySurface>
  ),
};

/**
 * ## 2) Semantic + Gradients
 * Includes semantic colors plus gradient and opacity tokens.
 */
export const SemanticAndGradients: Story = {
  args: {
    theme: "all",
    showUsageExamples: false,
    showGradients: true,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl" className="ui:block ui:p-6">
      <ColorPalette {...args} />
    </StorySurface>
  ),
};

/**
 * ## 3) Implementation Guide
 * Focuses on usage guidance and copy-ready token examples.
 */
export const ImplementationGuide: Story = {
  args: {
    groups: [],
    showUsageExamples: true,
    showGradients: false,
  },
  render: (args) => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-6xl"
      className="ui:block ui:p-6"
    >
      <ColorPalette {...args} />
    </StorySurface>
  ),
};

/**
 * ## 4) Brand Override Example
 * Demonstrates replacing the default palette groups with custom groups.
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
 * ## 5) Brand and Mode Matrix
 * Verifies semantic token behavior across every shipped brand and mode pair.
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
            Brand and mode matrix
          </h2>
          <p className="ui:text-sm ui:text-fg-muted">
            One section per brand with compact light and dark previews.{" "}
            This keeps comparison clear without repeating full content blocks.
          </p>
        </div>

        <div className="ui:grid ui:grid-cols-1 ui:gap-4 lg:ui:grid-cols-2">
          {brands.map((brand) => (
            <section
              key={brand}
              className="ui:rounded-2xl ui:border ui:border-border ui:bg-canvas ui:p-4 ui:shadow-sm"
            >
              <p className="ui:mb-3 ui:text-sm ui:font-semibold ui:uppercase ui:tracking-[0.12em] ui:text-fg">
                {brand}
              </p>

              <div className="ui:grid ui:grid-cols-1 ui:gap-3 md:ui:grid-cols-2">
                {modes.map((mode) => (
                  <ThemeTokenReadout
                    key={`${brand}-${mode}`}
                    brand={brand}
                    mode={mode}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </StorySurface>
  ),
};
