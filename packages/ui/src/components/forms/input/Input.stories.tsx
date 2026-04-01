import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../button";
import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";
import { MailIcon, SearchIcon } from "../../icons";
import { Input } from "./Input";
import { InputState, type InputProps } from "./types";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  render: (args: InputProps) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Input {...args} className="ui:w-full" />
    </StorySurface>
  ),
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Form input with helper, validation, and icon states. Stories use a shared StorySurface so controls stay visually consistent.",
      },
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: [
        InputState.DEFAULT,
        InputState.SUCCESS,
        InputState.ERROR,
        InputState.DISABLED,
      ],
      description: "Visual state of the input",
    },
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    message: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: "radio",
      options: ["text", "email", "password", "number"],
      description: "Native input type attribute.",
    },
    bgClassName: {
      control: "text",
      description: "Custom utility classes for the input background surface.",
    },
    icon: { control: false },
    onChange: { control: false },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledInput() {
  const [value, setValue] = useState("");
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
    label: "Username",
    placeholder: "johndoe",
    helperText: "This is your public display name.",
    className: "ui:w-full",
  },
};

/**
 * ## With Icon
 * Render an icon inside the input for better visual context.
 */
export const WithIcon: Story = {
  args: {
    label: "Search tickets",
    placeholder: "Find by ticket ID, title, or owner",
    helperText: "Search runs client-side as you type.",
    icon: <SearchIcon width={18} height={18} color="currentColor" />,
    className: "ui:w-full",
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
        <StoryIntro
          title="Validation states"
          description="Pair visual state with helper, success, or error messaging so users can recover without losing context."
        />
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
      <StorySection>
        <StoryIntro
          title="Common field patterns"
          description="Show search, email, and secure-entry fields in realistic surfaces instead of isolated control samples."
        />
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
          <Input
            label="Search"
            placeholder="Search projects"
            icon={<SearchIcon width={18} height={18} color="currentColor" />}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Email address"
            icon={
              <MailIcon
                width={16}
                height={16}
                className="ui:text-muted-foreground"
              />
            }
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            bgClassName="bg-neutral-100 dark:bg-neutral-800"
          />
        </div>
      </StorySection>
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
    const [value, setValue] = useState("");
    const isValid = value.length >= 6;
    const hasValue = value.length > 0;

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Input
          label="Branch code"
          placeholder="Enter at least 6 characters"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          state={
            hasValue
              ? isValid
                ? InputState.SUCCESS
                : InputState.ERROR
              : InputState.DEFAULT
          }
          message={isValid ? "Code format looks valid." : undefined}
          error={
            hasValue && !isValid
              ? "Code must be at least 6 characters."
              : undefined
          }
        />
      </StorySurface>
    );
  },
};
