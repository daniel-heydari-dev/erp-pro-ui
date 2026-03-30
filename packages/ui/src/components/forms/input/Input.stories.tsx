import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { ComponentProps } from 'react';

import { Button } from '../button';
import { StoryStack, StorySurface } from '../../shared/storybook';
import { SearchIcon } from '../../icons';
import { Input } from './Input';
import { InputState } from './types';

const meta = {
  title: 'Forms/Input',
  component: Input,
  render: (args: ComponentProps<typeof Input>) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Input {...args} className="ui:w-full" />
    </StorySurface>
  ),
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Form input with helper, validation, and icon states. Stories use a shared StorySurface so controls stay visually consistent.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: [
        InputState.DEFAULT,
        InputState.SUCCESS,
        InputState.ERROR,
        InputState.DISABLED,
      ],
      description: 'Visual state of the input',
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    message: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: {
      control: 'radio',
      options: ['text', 'email', 'password', 'number'],
      description: 'Native input type attribute.',
    },
    bgClassName: {
      control: 'text',
      description: 'Custom utility classes for the input background surface.',
    },
    icon: { control: false },
    onChange: { control: false },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Helper Components for Stories ---

function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Input
        label="Email Address"
        placeholder="hello@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="ui:w-full"
      />
    </StorySurface>
  );
}

function MailIcon() {
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
      className="ui:text-muted-foreground"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// --- Stories ---

/**
 * ## Default
 * Basic interactive input field. It features a dynamic radial gradient hover effect.
 */
export const Default: Story = {
  render: () => <ControlledInput />,
};

/**
 * ## With Helper Text
 * Provides additional context or instructions below the input.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'This is your public display name.',
    className: 'ui:w-full',
  },
};

/**
 * ## With Icon
 * Render an icon inside the input for better visual context.
 */
export const WithIcon: Story = {
  args: {
    label: 'Search tickets',
    placeholder: 'Find by ticket ID, title, or owner',
    helperText: 'Search runs client-side as you type.',
    icon: <SearchIcon width={18} height={18} color="currentColor" />,
    className: 'ui:w-full',
  },
};

/**
 * ## Validation States
 * Showcases the different validation states available for the input.
 */
export const States: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <StoryStack className="ui:w-full">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">Validation states</p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Pair visual state with helper, success, or error messaging so users can recover without losing context.
          </p>
        </div>
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
          <Input
            label="Work email"
            placeholder="name@company.com"
            state={InputState.ERROR}
            error="Use a valid company email address."
          />
          <Input
            label="Environment name"
            state={InputState.SUCCESS}
            placeholder="production"
            message="Environment is available."
          />
          <Input
            label="Workspace slug"
            state={InputState.DISABLED}
            disabled
            placeholder="locked-workspace"
            helperText="Slug updates are restricted after first deployment."
          />
        </div>
      </StoryStack>
    </StorySurface>
  ),
};

export const CommonFieldPatterns: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:space-y-4">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Common field patterns
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Show search, email, and secure-entry fields in realistic surfaces instead of isolated control samples.
          </p>
        </div>
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
          <Input
            label="Search"
            placeholder="Search projects"
            icon={<SearchIcon width={18} height={18} color="currentColor" />}
          />
          <Input label="Email" type="email" placeholder="Email address" icon={<MailIcon />} />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            bgClassName="bg-neutral-100 dark:bg-neutral-800"
          />
        </div>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Login Form Example
 * A small composition of components mimicking a standard login form.
 */
export const LoginFormExample: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <form className="ui:flex ui:w-full ui:flex-col ui:gap-4">
        <h3 className="ui:mb-2 ui:text-xl ui:font-semibold ui:text-foreground">
          Sign In
        </h3>
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Button primary className="ui:mt-2">
          Submit
        </Button>
      </form>
    </StorySurface>
  ),
};

/**
 * ## Validation Feedback Flow
 * Controlled field showing inline validation based on entered length.
 */
export const ValidationFeedbackFlow: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const isValid = value.length >= 6;
    const hasValue = value.length > 0;

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Input
          label="Branch code"
          placeholder="Enter at least 6 characters"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          state={hasValue ? (isValid ? InputState.SUCCESS : InputState.ERROR) : InputState.DEFAULT}
          message={isValid ? 'Code format looks valid.' : undefined}
          error={hasValue && !isValid ? 'Code must be at least 6 characters.' : undefined}
        />
      </StorySurface>
    );
  },
};
