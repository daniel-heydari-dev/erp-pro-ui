import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { Input } from "../input";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "Forms/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Evaluates password quality against practical security criteria and gives immediate visual feedback during credential setup.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    password: { control: "text", description: "Password value to evaluate." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveExample() {
  const [password, setPassword] = useState("");

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8">
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          label="Enter Password"
          placeholder="Type a new password"
        />
        <PasswordStrengthMeter password={password} />
        <p className="ui:mt-3 ui:text-xs ui:text-muted-foreground">
          Tip: include upper/lower case, numbers, and symbols for a stronger
          score.
        </p>
      </div>
    </StorySurface>
  );
}

function SignUpFlowExample() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8 md:ui:grid-cols-2">
        <div>
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
          />
          <PasswordStrengthMeter password={password} />
        </div>
        <div>
          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
            helperText="Keep both fields aligned before submitting the form."
          />
        </div>
      </div>
    </StorySurface>
  );
}

/**
 * ## Interactive Example
 * Live feedback while typing a new password.
 */
export const InteractiveExampleStory: Story = {
  render: () => <InteractiveExample />,
};

/**
 * ## Sign Up Flow
 * Pair with a confirmation input in account creation forms.
 */
export const SignUpFlow: Story = {
  render: () => <SignUpFlowExample />,
};

/**
 * ## Preset Strength States
 * Quick visual reference for weak and strong passwords.
 */
export const PresetStrengthStates: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:space-y-6 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8">
        <div>
          <p className="ui:mb-2 ui:text-sm ui:font-medium">Weak example</p>
          <PasswordStrengthMeter password="abc" />
        </div>
        <div>
          <p className="ui:mb-2 ui:text-sm ui:font-medium">Strong example</p>
          <PasswordStrengthMeter password="StrongP@ssw0rd!" />
        </div>
      </div>
    </StorySurface>
  ),
};
