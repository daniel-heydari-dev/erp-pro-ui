import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../button";
import { Input } from "../input";
import { StorySurface } from "../../shared/storybook";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Multi-line input for notes, descriptions, and long-form form content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the textarea",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the textarea",
    },
    error: {
      control: "text",
      description:
        "Error message displayed below the textarea (turns input red)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    placeholder: { control: "text", description: "Placeholder text" },
    rows: { control: "number", description: "Visible row count." },
    value: { control: false, description: "Controlled textarea value." },
    onChange: { control: false, description: "Value change callback." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Helper Components for Stories ---

function ControlledTextarea() {
  const [val, setVal] = useState("");
  const maxLength = 240;

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <div className="ui:space-y-2">
        <Textarea
          label="Bio"
          placeholder="Tell us about yourself..."
          value={val}
          onChange={(e) => setVal(e.target.value.slice(0, maxLength))}
          className="ui:w-full"
          rows={4}
        />
        <p className="ui:text-right ui:text-xs ui:text-muted-foreground">
          {val.length}/{maxLength}
        </p>
      </div>
    </StorySurface>
  );
}

// --- Stories ---

/**
 * ## Default
 * Basic multi-line text input field.
 */
export const Default: Story = {
  render: () => <ControlledTextarea />,
};

/**
 * ## With Helper Text
 * Useful for providing instructions or indicating character limits to users.
 */
export const WithHelperText: Story = {
  args: {
    label: "Message",
    placeholder: "Type your message here...",
    helperText: "Maximum 500 characters allowed.",
    className: "ui:w-full",
    rows: 4,
  },
};

/**
 * ## Error State
 * Provides visual feedback when a field fails validation.
 */
export const ErrorState: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description...",
    error: "Description is required.",
    className: "ui:w-full",
    rows: 4,
  },
};

/**
 * ## Disabled State
 * Shows the textarea in a read-only or uneditable state.
 */
export const DisabledState: Story = {
  args: {
    label: "System Notes",
    value:
      "These notes were automatically generated and cannot be modified safely.",
    disabled: true,
    className: "ui:w-full",
    rows: 3,
  },
};

/**
 * ## Form Segment Example
 * Shows how the textarea component looks alongside other form elements.
 */
export const FormSegmentExample: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:w-full ui:flex-col ui:gap-4">
        <h3 className="ui:text-lg ui:font-medium text-foreground">
          Submit Feedback
        </h3>
        <Input label="Subject" placeholder="Issue with login" />
        <Textarea
          label="Detailed Description"
          placeholder="Please describe exactly what happened..."
          rows={5}
          helperText="Include any error codes you saw."
        />
        <div className="ui:mt-2 ui:flex ui:justify-end">
          <Button label="Send Report" primary />
        </div>
      </div>
    </StorySurface>
  ),
};
