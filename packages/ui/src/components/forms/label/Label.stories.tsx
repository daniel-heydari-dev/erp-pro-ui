import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { Checkbox } from '../checkbox';
import { Input } from '../input';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Forms/Label',
  component: Label,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible label element for connecting descriptive text to form controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Label text.' },
    required: {
      control: 'boolean',
      description: 'Appends a required asterisk marker.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default
 * A standard label styling, often coupled with inputs.
 */
export const Default: Story = {
  args: {
    children: 'Email Address',
  },
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryFn />
      </StorySurface>
    ),
  ],
};

/**
 * ## Required State
 * Visually hints that the connected field is mandatory.
 */
export const Required: Story = {
  args: {
    children: 'Password',
    required: true,
  },
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryFn />
      </StorySurface>
    ),
  ],
};

/**
 * ## Label + Input Pair
 * Typical form usage with htmlFor/id linkage for accessibility.
 */
export const LabelInputPair: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:space-y-2">
        <Label htmlFor="contact-email" required>
          Contact email
        </Label>
        <Input id="contact-email" type="email" placeholder="ops@company.com" />
      </div>
    </StorySurface>
  ),
};

/**
 * ## Common Patterns
 * Labels work across text fields and checkboxes with shared accessibility linkage.
 */
export const CommonPatterns: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:flex ui:w-full ui:flex-col ui:gap-6">
        <div className="ui:grid ui:gap-1.5">
          <Label htmlFor="req-field" required>
            Required Field
          </Label>
          <Input id="req-field" placeholder="Project name" />
        </div>
        <div className="ui:flex ui:items-center ui:space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </div>
    </StorySurface>
  ),
};
