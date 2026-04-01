import type { Meta, StoryObj } from "@storybook/react-vite";

import { PlayIcon } from "../../icons";
import { StorySurface } from "../../shared/storybook";
import { ButtonHoverBorderGradient } from "./ButtonHoverBorderGradient";

const meta: Meta<typeof ButtonHoverBorderGradient> = {
  title: "Visuals/ButtonHoverBorderGradient",
  component: ButtonHoverBorderGradient,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Prebuilt CTA button with animated border emphasis for marketing or media-trigger actions.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Prefabricated Implementation
 * An implementation of HoverBorderGradient built specifically for text CTA buttons.
 */
export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div
        style={
          {
            "--color-hover-gradient": "rgba(236, 72, 153, 0.8)",
          } as React.CSSProperties
        }
      >
        <ButtonHoverBorderGradient>
          <PlayIcon className="ui:h-5 ui:w-5" aria-hidden="true" />
          <span className="ui:font-bold">Play Video</span>
        </ButtonHoverBorderGradient>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Action Set
 * Useful when a page needs multiple emphasized CTAs with different visual intent.
 */
export const ActionSet: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        <div
          style={
            {
              "--color-hover-gradient": "rgba(59, 130, 246, 0.8)",
            } as React.CSSProperties
          }
        >
          <ButtonHoverBorderGradient>
            <span className="ui:font-semibold">Watch Demo</span>
          </ButtonHoverBorderGradient>
        </div>
        <div
          style={
            {
              "--color-hover-gradient": "rgba(16, 185, 129, 0.8)",
            } as React.CSSProperties
          }
        >
          <ButtonHoverBorderGradient>
            <span className="ui:font-semibold">Start Trial</span>
          </ButtonHoverBorderGradient>
        </div>
      </div>
    </StorySurface>
  ),
};
