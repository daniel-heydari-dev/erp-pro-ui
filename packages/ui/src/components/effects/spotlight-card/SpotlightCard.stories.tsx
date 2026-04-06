import type { Meta, StoryObj } from "@storybook/react-vite";

import { ZapIcon } from "../../icons";
import { StorySurface } from "../../shared/storybook";
import { SpotlightCard } from "./SpotlightCard";

const meta: Meta<typeof SpotlightCard> = {
  title: "Visuals/SpotlightCard",
  component: SpotlightCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Interactive spotlight surface for premium feature highlights, pricing cards, or dashboard callouts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spotlightColor: { control: "color" },
    spotlightSize: { control: "number" },
    spotlightEnabled: { control: "boolean" },
    variant: {
      control: "select",
      options: ["glass", "solid", "outlined"],
    },
    hoverScale: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const spotlightDefaultSource = `import { SpotlightCard } from 'erp-pro-ui';

export function DefaultSpotlightCardExample() {
  return (
    <SpotlightCard className="w-full">
      <div className="flex h-[200px] flex-col items-center justify-center gap-4">
        <h3 className="text-xl font-bold text-white">Lightning Fast</h3>
        <p className="text-center text-sm text-neutral-400">
          Optimized for performance with hardware accelerated animations.
        </p>
      </div>
    </SpotlightCard>
  );
}`;

const spotlightSolidSource = `import { SpotlightCard } from 'erp-pro-ui';

export function SolidSpotlightCardExample() {
  return (
    <SpotlightCard variant="solid" spotlightColor="rgba(59, 130, 246, 0.15)">
      Solid spotlight surface
    </SpotlightCard>
  );
}`;

const spotlightGridSource = `import { SpotlightCard } from 'erp-pro-ui';

export function SpotlightFeatureGridExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {['Smart routing', 'Live approvals', 'Inventory insight'].map((title) => (
        <SpotlightCard key={title} className="w-full">
          <div className="flex min-h-44 flex-col justify-between gap-3">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-sm text-neutral-400">Designed for high-signal operational workflows with premium interaction feedback.</p>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}`;

/**
 * ## Basic Spotlight
 * A glassmorphic card that reveals a subtle, glowing radial gradient under the user's mouse cursor.
 */
export const Default: Story = {
  render: (args) => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-lg"
      className="ui:bg-neutral-950"
    >
      <SpotlightCard className="ui:w-full" {...args}>
        <div className="ui:flex ui:h-[200px] ui:flex-col ui:items-center ui:justify-center ui:gap-4">
          <div className="ui:flex ui:h-16 ui:w-16 ui:items-center ui:justify-center ui:rounded-full ui:bg-accent-subtle">
            <ZapIcon
              className="ui:h-8 ui:w-8 ui:text-accent"
              aria-hidden="true"
            />
          </div>
          <h3 className="ui:text-xl ui:font-bold ui:text-white">
            Lightning Fast
          </h3>
          <p className="ui:text-center ui:text-sm ui:text-neutral-400">
            Optimized for performance with hardware accelerated animations.
          </p>
        </div>
      </SpotlightCard>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: spotlightDefaultSource } } },
};

export const SolidVariant: Story = {
  args: { variant: "solid", spotlightColor: "rgba(59, 130, 246, 0.15)" },
  render: Default.render,
  parameters: { docs: { source: { code: spotlightSolidSource } } },
};

/**
 * ## Feature Grid
 * A realistic layout with multiple spotlight cards working together in one section.
 */
export const FeatureGrid: Story = {
  render: () => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-5xl"
      className="ui:bg-neutral-950"
    >
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
        {["Smart routing", "Live approvals", "Inventory insight"].map(
          (title) => (
            <SpotlightCard key={title} className="ui:w-full">
              <div className="ui:flex ui:min-h-44 ui:flex-col ui:justify-between ui:gap-3">
                <p className="ui:text-sm ui:font-semibold ui:text-white">
                  {title}
                </p>
                <p className="ui:text-sm ui:text-neutral-400">
                  Designed for high-signal operational workflows with premium
                  interaction feedback.
                </p>
              </div>
            </SpotlightCard>
          ),
        )}
      </div>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: spotlightGridSource } } },
};
