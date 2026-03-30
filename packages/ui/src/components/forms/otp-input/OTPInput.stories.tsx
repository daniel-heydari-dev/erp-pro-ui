import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Forms/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Focused multi-cell input for one-time passcodes, PIN verification, and step-up authentication flows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    length: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'underlined'],
    },
    type: { control: 'radio', options: ['number', 'text'] },
    autoFocus: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    mask: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: false, description: 'Controlled OTP value.' },
    onChange: {
      control: false,
      description: 'Called whenever any digit changes.',
    },
    onComplete: {
      control: false,
      description: 'Called when all cells are filled.',
    },
    defaultValue: {
      control: false,
      description: 'Initial value for uncontrolled usage.',
    },
    separator: { control: false, description: 'Custom separator element.' },
    separatorPositions: {
      control: false,
      description: 'Positions where separators should be inserted.',
    },
    inputClassName: {
      control: false,
      description: 'Custom class for each input cell.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledOTPExample() {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('Waiting for complete code...');

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8">
        <OTPInput
          length={6}
          value={value}
          onChange={setValue}
          autoFocus
          onComplete={(code) => setStatus(`Code complete: ${code}`)}
        />
        <p className="ui:text-sm ui:text-muted-foreground">
          Entered Code:{' '}
          <span className="ui:font-mono ui:font-bold ui:text-primary">
            {value || '------'}
          </span>
        </p>
        <p className="ui:text-xs ui:text-muted-foreground">{status}</p>
      </div>
    </StorySurface>
  );
}

/**
 * ## Basic Usage
 * Controlled OTP input with completion feedback.
 */
export const BasicUsage: Story = {
  render: () => <ControlledOTPExample />,
};

/**
 * ## Masked And Grouped
 * Useful for split verification codes like 3-3 or 2-2-2 patterns.
 */
export const MaskedAndGrouped: Story = {
  args: {
    length: 6,
    mask: true,
    placeholder: '•',
    variant: 'filled',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-lg">
        <div className="ui:flex ui:flex-col ui:items-center ui:gap-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8">
          <OTPInput
            {...args}
            value={value}
            onChange={setValue}
            separatorPositions={[3]}
          />
          <p className="ui:text-xs ui:text-muted-foreground">
            Paste a full code to auto-fill all slots.
          </p>
        </div>
      </StorySurface>
    );
  },
};

/**
 * ## Error State
 * Use to communicate expired or invalid verification attempts.
 */
export const ErrorState: Story = {
  args: {
    length: 6,
    value: '12',
    error: true,
    errorMessage: 'The code is invalid or expired. Request a new one.',
  },
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-lg">
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8">
          <StoryFn />
        </div>
      </StorySurface>
    ),
  ],
};
