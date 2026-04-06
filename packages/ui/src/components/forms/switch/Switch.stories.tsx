import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySection, StorySurface } from "../../shared/storybook";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Binary control for toggling preferences and feature flags in forms and settings panels.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: false, description: "Controlled checked state." },
    onChange: { control: false, description: "Checked state change callback." },
    label: { control: "text", description: "Optional text label." },
    disabled: { control: "boolean", description: "Disables interaction." },
    error: { control: "text", description: "Validation feedback message." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSwitchSource = `import { useState } from 'react';
import { Switch } from 'erp-pro-ui';

export function DefaultSwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}`;

const labeledSwitchSource = `import { useState } from 'react';
import { Switch } from 'erp-pro-ui';

export function LabeledSwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      label="Enable notifications"
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}`;

const settingsGroupSource = `import { useState } from 'react';
import { Switch } from 'erp-pro-ui';

export function SettingsGroupExample() {
  const [emailDigest, setEmailDigest] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        label="Daily email digest"
        checked={emailDigest}
        onChange={(event) => setEmailDigest(event.target.checked)}
      />
      <Switch
        label="SMS critical alerts"
        checked={smsAlerts}
        onChange={(event) => setSmsAlerts(event.target.checked)}
      />
      <Switch label="Audit lock" checked disabled />
    </div>
  );
}`;

const switchValidationSource = `import { Switch } from 'erp-pro-ui';

export function RequiredSwitchExample() {
  return (
    <Switch
      label="Confirm maintenance window"
      error="You must confirm before scheduling downtime."
    />
  );
}`;

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
  parameters: {
    docs: {
      source: {
        code: defaultSwitchSource,
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: labeledSwitchSource,
      },
    },
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
 * ## Required Validation
 * Shows the validation state used when a confirmation toggle is required.
 */
export const RequiredValidation: Story = {
  args: {
    label: "Confirm maintenance window",
    error: "You must confirm before scheduling downtime.",
  },
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryFn />
      </StorySurface>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: switchValidationSource,
      },
    },
  },
};

/**
 * ## Disabled Switch
 * Read-only state for unavailable features.
 */
export const Disabled: Story = {
  args: {
    label: "Disabled switch",
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
        <StorySection>
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
        </StorySection>
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: settingsGroupSource,
      },
    },
  },
};
