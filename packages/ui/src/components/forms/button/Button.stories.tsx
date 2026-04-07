import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchIcon } from "../../icons";
import { StoryStack, StorySurface } from "../../shared/storybook";
import { Button } from "./Button";

const variantsSource = `import { Button } from "erp-pro-ui";

export function ButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button label="Save changes" variant="primary" />
      <Button label="Cancel" variant="secondary" />
      <Button label="View details" variant="tertiary" />
    </div>
  );
}`;

const meta = {
  title: "Forms/Button",
  component: Button,
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Button {...args} />
    </StorySurface>
  ),
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Action button with primary, secondary, and tertiary variants, predictable sizing, and support for labels or inline icons.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "tertiary"],
      description:
        "Visual variant for primary, secondary, or tertiary actions.",
    },
    primary: {
      control: false,
      description: 'Legacy alias for `variant="primary"`. Prefer `variant`.',
    },
    backgroundColor: {
      control: "color",
      description: "Custom background color override",
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description: "Button size",
    },
    label: { control: "text", description: "Text label for the button" },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    type: {
      control: "radio",
      options: ["button", "submit", "reset"],
      description: "Native button type attribute.",
    },
    onClick: {
      control: false,
      description: "Click handler callback.",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default Button
 * The default button is a medium-sized secondary (glass) button.
 */
export const Default: Story = {
  args: {
    children: "Click Me",
  },
};

/**
 * ## Primary Variant
 * Used for main actions within the application.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Action",
  },
};

/**
 * ## Variants
 * Use primary for the main CTA, secondary for standard actions, and tertiary for the lightest supporting action.
 */
export const Variants: Story = {
  render: () => (
    <StorySurface widthClassName="ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
        <Button label="Save changes" variant="primary" />
        <Button label="Cancel" variant="secondary" />
        <Button label="View details" variant="tertiary" />
      </div>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: variantsSource } } },
};

/**
 * ## Sizes
 * Buttons come in three sizes: small, medium, and large.
 */
export const Sizes: Story = {
  render: () => (
    <StorySurface widthClassName="ui:max-w-2xl">
      <div className="ui:flex ui:items-center ui:gap-4">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
    </StorySurface>
  ),
};

/**
 * ## States
 * Demonstration of the disabled state, which reduces opacity and updates the cursor.
 */
export const Disabled: Story = {
  render: () => (
    <StorySurface widthClassName="ui:max-w-xl">
      <div className="ui:flex ui:gap-4">
        <Button disabled primary>
          Primary Disabled
        </Button>
        <Button disabled>Secondary Disabled</Button>
        <Button disabled variant="tertiary">
          Tertiary Disabled
        </Button>
      </div>
    </StorySurface>
  ),
};

/**
 * ## With Icon
 * Buttons can contain children alongside text, which is perfect for rendering icons.
 */
export const WithIcon: Story = {
  render: () => (
    <StorySurface widthClassName="ui:max-w-xl">
      <StoryStack className="ui:flex-row ui:flex-wrap ui:items-center ui:gap-4">
        <Button primary>
          <SearchIcon width={16} height={16} /> Search
        </Button>
        <Button>
          Settings <SearchIcon width={16} height={16} />
        </Button>
        <Button variant="tertiary">
          <SearchIcon width={16} height={16} /> Learn more
        </Button>
      </StoryStack>
    </StorySurface>
  ),
};

/**
 * ## Approval Actions
 * A realistic action row pattern for dialogs and drawers.
 */
export const ApprovalActions: Story = {
  render: () => (
    <StorySurface widthClassName="ui:max-w-xl">
      <div className="ui:flex ui:items-center ui:justify-end ui:gap-3">
        <Button size="medium">Cancel</Button>
        <Button primary size="medium">
          Approve transfer
        </Button>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Danger Action
 * Secondary action plus emphasized destructive confirmation.
 */
export const DangerAction: Story = {
  render: () => (
    <StorySurface widthClassName="ui:max-w-xl">
      <div className="ui:flex ui:items-center ui:justify-end ui:gap-3">
        <Button variant="tertiary">Keep record</Button>
        <Button backgroundColor="#dc2626" label="Delete permanently" />
      </div>
    </StorySurface>
  ),
};
