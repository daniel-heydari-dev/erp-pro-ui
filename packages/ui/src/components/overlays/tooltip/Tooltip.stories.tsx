import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../../forms/button";
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

const basicTooltipSource = `import { Button, Tooltip } from 'erp-pro-ui';

export function BasicTooltipExample() {
  return (
    <Tooltip content="Tooltip helper text">
      <Button label="Hover over me" />
    </Tooltip>
  );
}`;

const tooltipPositionsSource = `import { Button, Tooltip } from 'erp-pro-ui';

export function TooltipPositionsExample() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Tooltip content="Tooltip on top" position="top"><Button label="Top" /></Tooltip>
      <Tooltip content="Tooltip on right" position="right"><Button label="Right" /></Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom"><Button label="Bottom" /></Tooltip>
      <Tooltip content="Tooltip on left" position="left"><Button label="Left" /></Tooltip>
    </div>
  );
}`;

const clickTriggerSource = `import { Button, Tooltip } from 'erp-pro-ui';

export function ClickTooltipExample() {
  return (
    <Tooltip
      content="The approval policy blocks shipment until both finance and operations approve the order."
      trigger="click"
      position="bottom"
    >
      <Button label="Why is this locked?" />
    </Tooltip>
  );
}`;

const formHintSource = `import { Button, Tooltip } from 'erp-pro-ui';

export function TooltipFormHintExample() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Reorder threshold</span>
        <Tooltip content="When stock drops below this count, the SKU appears in the replenishment queue.">
          <Button aria-label="Threshold help" className="h-6 w-6 rounded-full px-0 py-0 text-xs font-semibold">?</Button>
        </Tooltip>
      </div>
      <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">24 units</div>
    </div>
  );
}`;

const controlledTooltipSource = `import { useState } from 'react';
import { Button, Tooltip } from 'erp-pro-ui';

export function ControlledTooltipExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Button onClick={() => setOpen((previous) => !previous)} primary>
        {open ? 'Hide tooltip' : 'Show tooltip'}
      </Button>
      <Tooltip
        content="Controlled tooltips are helpful when visibility follows external workflow state."
        open={open}
        onOpenChange={setOpen}
        trigger="click"
        position="right"
      >
        <Button label="Controlled target" />
      </Tooltip>
    </div>
  );
}`;

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
        <Button label="Hover over me" />
      </Tooltip>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: basicTooltipSource,
      },
    },
  },
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
          <Button label="Top" />
        </Tooltip>
        <Tooltip content="Tooltip on right" position="right">
          <Button label="Right" />
        </Tooltip>
        <Tooltip content="Tooltip on bottom" position="bottom">
          <Button label="Bottom" />
        </Tooltip>
        <Tooltip content="Tooltip on left" position="left">
          <Button label="Left" />
        </Tooltip>
      </div>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: tooltipPositionsSource,
      },
    },
  },
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
        <Button label="Why is this locked?" />
      </Tooltip>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: clickTriggerSource,
      },
    },
  },
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
            <Button
              aria-label="Threshold help"
              className="ui:h-6 ui:w-6 ui:rounded-full ui:px-0 ui:py-0 ui:text-xs ui:font-semibold"
            >
              ?
            </Button>
          </Tooltip>
        </div>
        <div className="ui:rounded-md ui:border ui:border-border ui:px-3 ui:py-2 ui:text-sm ui:text-muted-foreground">
          24 units
        </div>
      </div>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: formHintSource,
      },
    },
  },
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
          <Button onClick={() => setOpen((prev) => !prev)} primary>
            {open ? "Hide tooltip" : "Show tooltip"}
          </Button>

          <Tooltip
            content="Controlled tooltips are helpful when visibility follows external workflow state."
            open={open}
            onOpenChange={setOpen}
            trigger="click"
            position="right"
          >
            <Button label="Controlled target" />
          </Tooltip>
        </div>
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: controlledTooltipSource,
      },
    },
  },
};
