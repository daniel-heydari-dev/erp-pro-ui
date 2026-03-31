import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySurface } from "../../shared/storybook";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Layout/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compact contextual hint for controls, validation support, and secondary actions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "radio",
      options: ["top", "bottom", "left", "right"],
      description:
        "Controls where the tooltip pops up relative to the element.",
    },
    trigger: {
      control: "radio",
      options: ["hover", "click", "focus"],
      description: "What action invokes the tooltip.",
    },
    delayShow: { control: "number" },
    delayHide: { control: "number" },
    disabled: { control: "boolean" },
    arrow: { control: "boolean" },
    maxWidth: { control: "number" },
    open: {
      control: false,
      description:
        "Controlled visibility state, usually managed by parent state.",
    },
    onOpenChange: {
      control: false,
      description: "Callback fired when open state changes.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default
 * Useful for conveying small supplementary descriptions.
 */
export const Default: Story = {
  render: (args) => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-lg"
      className="ui:min-h-56"
    >
      <Tooltip content="Tooltip helper text" {...args}>
        <button className="ui:px-4 ui:py-2 ui:border ui:border-border ui:rounded-md bg-white dark:bg-neutral-800 text-foreground cursor-default">
          Hover over me
        </button>
      </Tooltip>
    </StorySurface>
  ),
};

/**
 * ## Positions
 * You can place tooltips all around an element.
 */
export const Positions: Story = {
  render: () => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-2xl"
      className="ui:min-h-56"
    >
      <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-8">
        <Tooltip content="Tooltip on top" position="top">
          <button className="ui:px-4 ui:py-2 ui:border ui:border-border ui:rounded-md cursor-default">
            Top
          </button>
        </Tooltip>
        <Tooltip content="Tooltip on right" position="right">
          <button className="ui:px-4 ui:py-2 ui:border ui:border-border ui:rounded-md cursor-default">
            Right
          </button>
        </Tooltip>
        <Tooltip content="Tooltip on bottom" position="bottom">
          <button className="ui:px-4 ui:py-2 ui:border ui:border-border ui:rounded-md cursor-default">
            Bottom
          </button>
        </Tooltip>
        <Tooltip content="Tooltip on left" position="left">
          <button className="ui:px-4 ui:py-2 ui:border ui:border-border ui:rounded-md cursor-default">
            Left
          </button>
        </Tooltip>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Click Trigger
 * Useful when the tooltip should stay open long enough to read a richer sentence.
 */
export const ClickTrigger: Story = {
  render: () => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-lg"
      className="ui:min-h-56"
    >
      <Tooltip
        content="The approval policy blocks shipment until both finance and operations approve the order."
        trigger="click"
        position="bottom"
      >
        <button className="ui:rounded-md ui:border ui:border-border ui:px-4 ui:py-2 ui:text-sm ui:font-medium">
          Why is this locked?
        </button>
      </Tooltip>
    </StorySurface>
  ),
};

/**
 * ## Form Hint
 * Small guidance next to a field label without forcing the full form to be visually noisy.
 */
export const FormHint: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <div className="ui:space-y-3">
        <div className="ui:flex ui:items-center ui:gap-2">
          <span className="ui:text-sm ui:font-medium">Reorder threshold</span>
          <Tooltip content="When stock drops below this count, the SKU appears in the replenishment queue.">
            <button
              aria-label="Threshold help"
              className="ui:flex ui:h-6 ui:w-6 ui:items-center ui:justify-center ui:rounded-full ui:border ui:border-border ui:text-xs ui:font-semibold"
            >
              ?
            </button>
          </Tooltip>
        </div>
        <div className="ui:rounded-md ui:border ui:border-border ui:px-3 ui:py-2 ui:text-sm ui:text-muted-foreground">
          24 units
        </div>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Controlled Visibility
 * Useful for onboarding tips or guided workflows that toggle from parent state.
 */
export const ControlledVisibility: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <StorySurface
        widthClassName="ui:w-full ui:max-w-lg"
        className="ui:min-h-56"
      >
        <div className="ui:flex ui:items-center ui:gap-3">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="ui:rounded-md ui:bg-neutral-900 ui:px-4 ui:py-2 ui:text-sm ui:font-medium ui:text-white dark:ui:bg-white dark:ui:text-neutral-900"
          >
            {open ? "Hide tooltip" : "Show tooltip"}
          </button>

          <Tooltip
            content="Controlled tooltips are helpful when visibility follows external workflow state."
            open={open}
            onOpenChange={setOpen}
            trigger="click"
            position="right"
          >
            <button className="ui:rounded-md ui:border ui:border-border ui:px-4 ui:py-2 ui:text-sm ui:font-medium">
              Controlled target
            </button>
          </Tooltip>
        </div>
      </StorySurface>
    );
  },
};
