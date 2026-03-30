import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StorySurface } from '../../shared/storybook';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Binary control for toggling preferences and feature flags in forms and settings panels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: false, description: 'Controlled checked state.' },
    onChange: { control: false, description: 'Checked state change callback.' },
    label: { control: 'text', description: 'Optional text label.' },
    disabled: { control: 'boolean', description: 'Disables interaction.' },
    error: { control: 'text', description: 'Validation feedback message.' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default Switch
 * A simple controlled toggle.
 */
export const Default: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </StorySurface>
    );
  },
};

/**
 * ## Switch with Label
 * A common pattern for settings rows.
 */
export const WithLabel: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Switch
          label="Enable notifications"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </StorySurface>
    );
  },
};

/**
 * ## Checked Switch
 * Useful when defaults are enabled on first load.
 */
export const Checked: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true);
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Switch
          label="Airplane mode"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </StorySurface>
    );
  },
};

/**
 * ## Disabled Switch
 * Read-only state for unavailable features.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
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
 * ## Settings Group
 * Practical settings section with multiple related toggles.
 */
export const SettingsGroup: Story = {
  render: function Render() {
    const [emailDigest, setEmailDigest] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(false);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-lg">
        <div className="ui:space-y-4">
          <Switch
            label="Daily email digest"
            checked={emailDigest}
            onChange={(e) => setEmailDigest(e.target.checked)}
          />
          <Switch
            label="SMS critical alerts"
            checked={smsAlerts}
            onChange={(e) => setSmsAlerts(e.target.checked)}
          />
          <Switch label="Audit lock" checked disabled />
        </div>
      </StorySurface>
    );
  },
};
