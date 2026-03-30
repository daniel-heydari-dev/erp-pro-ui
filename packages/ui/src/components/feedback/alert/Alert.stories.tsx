import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Data Display/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    variant: { 
      control: "select", 
      options: ["info", "success", "warning", "destructive"] 
    },
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## General Information
 * Neutral feedback for the user.
 */
export const Default: Story = {
  args: {
    title: "System Update",
    description: "A new software update is available for installation.",
    variant: "info",
  },
};

/**
 * ## Success
 * Positive feedback.
 */
export const Success: Story = {
  args: {
    title: "Upload Finished",
    description: "Your files have been successfully uploaded to the server.",
    variant: "success",
  },
};

/**
 * ## Alert Validation
 * Explicit warning states.
 */
export const Warning: Story = {
  args: {
    title: "Action Required",
    description: "Your password will expire in 3 days. Please change it soon.",
    variant: "warning",
  },
};

/**
 * ## Destructive
 * Explicitly critical and blocking warnings.
 */
export const Destructive: Story = {
  args: {
    title: "Payment Failed",
    description: "Your recent subscription payment could not be processed. Please update your billing info.",
    variant: "destructive",
  },
};
