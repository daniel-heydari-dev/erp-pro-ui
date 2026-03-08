import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default Switch
 *
 * A basic toggle switch component.
 *
 * ### Import
 *
 * ```tsx
 * import { Switch } from 'design-system.lib';
 * import 'design-system.lib/styles.css';
 * ```
 *
 * ### Usage
 *
 * ```tsx
 * import { Switch } from 'design-system.lib';
 * import { useState } from 'react';
 *
 * function ToggleFeature() {
 *   const [enabled, setEnabled] = useState(false);
 *
 *   return (
 *     <Switch
 *       checked={enabled}
 *       onChange={(e) => setEnabled(e.target.checked)}
 *     />
 *   );
 * }
 * ```
 */
export const Default: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

/**
 * ## Switch with Label
 *
 * A switch with an associated text label.
 *
 * ### Import
 *
 * ```tsx
 * import { Switch } from 'design-system.lib';
 * ```
 *
 * ### Usage
 *
 * ```tsx
 * import { Switch } from 'design-system.lib';
 * import { useState } from 'react';
 *
 * function NotificationToggle() {
 *   const [enabled, setEnabled] = useState(false);
 *
 *   return (
 *     <Switch
 *       label="Enable notifications"
 *       checked={enabled}
 *       onChange={(e) => setEnabled(e.target.checked)}
 *     />
 *   );
 * }
 * ```
 */
export const WithLabel: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        label="Enable notifications"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

/**
 * ## Checked Switch
 *
 * A switch in the enabled/checked state.
 *
 * ### Import
 *
 * ```tsx
 * import { Switch } from 'design-system.lib';
 * ```
 *
 * ### Usage
 *
 * ```tsx
 * import { Switch } from 'design-system.lib';
 * import { useState } from 'react';
 *
 * function AirplaneMode() {
 *   const [enabled, setEnabled] = useState(true);
 *
 *   return (
 *     <Switch
 *       label="Airplane mode"
 *       checked={enabled}
 *       onChange={(e) => setEnabled(e.target.checked)}
 *     />
 *   );
 * }
 * ```
 */
export const Checked: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true);
    return (
      <Switch
        label="Airplane mode"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

/**
 * ## Disabled Switch
 *
 * A switch in a disabled state.
 *
 * ### Import
 *
 * ```tsx
 * import { Switch } from 'design-system.lib';
 * ```
 *
 * ### Usage
 *
 * ```tsx
 * import { Switch } from 'design-system.lib';
 *
 * function LockedSetting() {
 *   return (
 *     <Switch
 *       label="Premium feature"
 *       disabled
 *     />
 *   );
 * }
 * ```
 */
export const Disabled: Story = {
  args: {
    label: "Disabled switch",
    disabled: true,
  },
};
