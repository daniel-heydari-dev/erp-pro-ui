import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySurface } from "../../shared/storybook";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Layout/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Expandable content sections for FAQs, operational notes, and compact settings disclosures.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["single", "multiple"] },
    separated: { control: "boolean" },
    defaultOpenIds: {
      control: false,
      description: "Initial open item ids for uncontrolled usage.",
    },
    value: {
      control: false,
      description: "Controlled open item ids.",
    },
    onValueChange: {
      control: false,
      description: "Called when open item ids change.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: "1",
    title: "What is this framework?",
    description: "A fast overview of our ecosystem.",
    content:
      "This is a custom accordion built with React and styled with Tailwind CSS and Framer Motion transitions.",
  },
  {
    id: "2",
    title: "Can I use it for commercial projects?",
    content:
      "Yes, the entire UI kit is MIT licensed and can be used in commercial products.",
  },
  {
    id: "3",
    title: "Is this item disabled?",
    disabled: true,
    content: "This section is intentionally disabled.",
  },
];

/**
 * ## Default Accordion
 * Displays an interactive list of items. By default, it operates in 'single' mode (only one section open at a time).
 */
export const Default: Story = {
  args: {
    items: sampleItems,
  },
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-lg">
        <StoryFn />
      </StorySurface>
    ),
  ],
};

/**
 * ## Separated Styles
 * Renders accordion items as explicitly separated, distinct blocks rather than a uniform stack.
 */
export const SeparatedStyles: Story = {
  args: {
    items: sampleItems,
    separated: true,
  },
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-lg">
        <StoryFn />
      </StorySurface>
    ),
  ],
};

/**
 * ## Controlled Multi Open
 * Parent state controls which sections stay open, useful for synchronized navigation.
 */
export const ControlledMultiOpen: Story = {
  render: () => {
    const [openIds, setOpenIds] = useState<string[]>(["1"]);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-lg">
        <Accordion
          items={sampleItems}
          type="multiple"
          value={openIds}
          onValueChange={setOpenIds}
        />
      </StorySurface>
    );
  },
};
