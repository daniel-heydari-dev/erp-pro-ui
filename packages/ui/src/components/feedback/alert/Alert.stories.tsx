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
      options: ["info", "success", "warning", "error", "destructive"],
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
    title: "Info",
    description: "A new software update is available.",
    variant: "info",
  },
};

/**
 * ## Success
 * Positive feedback.
 */
export const Success: Story = {
  args: {
    title: "Success",
    description: "Your changes have been saved successfully.",
    variant: "success",
  },
};

/**
 * ## Alert Validation
 * Explicit warning states.
 */
export const Warning: Story = {
  args: {
    title: "Warning",
    description: "Your account is about to expire.",
    variant: "warning",
  },
};

/**
 * ## Error
 * Error state shown independently of theme brand color.
 */
export const Error: Story = {
  args: {
    title: "Error",
    description: "Something went wrong while processing your request.",
    variant: "error",
  },
};

/**
 * ## Personalized
 * You can override background, border, icon, title, and description colors.
 */
export const Personalized: Story = {
  args: {
    title: "Custom Warning",
    description: "This alert uses manually customized colors.",
    variant: "warning",
    colorOverrides: {
      background: "#FFF6E8",
      border: "#E0A92A",
      icon: "#A56A00",
      title: "#8C5A00",
      description: "#6E4B0C",
    },
  },
};
