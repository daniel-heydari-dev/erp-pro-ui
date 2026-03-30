import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryStack, StorySurface } from '../../shared/storybook';
import { Button } from './Button';

const meta = {
  title: 'Forms/Button',
  component: Button,
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Button {...args} />
    </StorySurface>
  ),
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Primary action button with predictable sizing and content slots for labels or inline icons.',
      },
    },
  },
  argTypes: {
    primary: {
      control: 'boolean',
      description: 'Use primary style (filled) or secondary (glass)',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color override',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    label: { control: 'text', description: 'Text label for the button' },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'Native button type attribute.',
    },
    onClick: {
      control: false,
      description: 'Click handler callback.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default Button
 * The default button is a medium-sized secondary (glass) button.
 */
export const Default: Story = {
  args: {
    children: 'Click Me',
  },
};

/**
 * ## Primary Variant
 * Used for main actions within the application.
 */
export const Primary: Story = {
  args: {
    primary: true,
    children: 'Primary Action',
  },
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
      </div>
    </StorySurface>
  ),
};

// Simple SVG icon for demonstration purposes without external dependencies
function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/**
 * ## With Icon
 * Buttons can contain children alongside text, which is perfect for rendering icons.
 */
export const WithIcon: Story = {
  render: () => (
    <StorySurface widthClassName="ui:max-w-xl">
      <StoryStack className="ui:flex-row ui:flex-wrap ui:items-center ui:gap-4">
        <Button primary>
          <SearchIcon /> Search
        </Button>
        <Button>
          Settings <SearchIcon />
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
        <Button>Keep record</Button>
        <Button backgroundColor="#dc2626" label="Delete permanently" />
      </div>
    </StorySurface>
  ),
};
