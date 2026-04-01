import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../../forms/button";
import { StorySurface } from "../../shared/storybook";
import { Stepper } from "./Stepper";
import type { StepperProps } from "./types";

const meta: Meta<typeof Stepper> = {
  title: "Layout/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Step-based progress navigation for setup flows, approvals, and checkout-style multi-stage tasks.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "glass", "minimal", "outlined"],
    },
    showNumbers: { control: "boolean" },
    clickable: { control: "boolean" },
    showConnector: { control: "boolean" },
    showErrors: { control: "boolean" },
    animated: { control: "boolean" },
    steps: { control: false, description: "Ordered step definitions." },
    currentStep: {
      control: false,
      description: "Controlled current step index.",
    },
    onStepClick: {
      control: false,
      description: "Called when a step is clicked.",
    },
    errorSteps: {
      control: false,
      description: "Indices rendered in error state.",
    },
    completedSteps: {
      control: false,
      description: "Optional manual completed indices.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { id: "1", title: "Cart", description: "Review your items" },
  { id: "2", title: "Shipping", description: "Choose shipping method" },
  {
    id: "3",
    title: "Payment",
    description: "Enter payment details",
    optional: true,
  },
  { id: "4", title: "Confirmation", description: "Order complete!" },
];

function StepperDemo(props: Omit<StepperProps, "steps" | "currentStep">) {
  const [current, setCurrent] = useState(1);
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:w-full">
        <Stepper
          {...props}
          steps={steps}
          currentStep={current}
          onStepClick={setCurrent}
        />
        <div className="ui:flex ui:justify-center ui:gap-4 ui:mt-12">
          <Button
            label="Previous"
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
          />
          <Button
            label="Next"
            primary
            disabled={current === steps.length - 1}
            onClick={() => setCurrent((c) => c + 1)}
          />
        </div>
      </div>
    </StorySurface>
  );
}

/**
 * ## Horizontal Flow
 * Commonly used at the top of multi-part forms.
 */
export const Horizontal: Story = {
  render: () => <StepperDemo orientation="horizontal" variant="glass" />,
};

/**
 * ## Vertical Flow
 * Commonly used alongside deeper settings sections to outline major changes.
 */
export const Vertical: Story = {
  render: () => <StepperDemo orientation="vertical" variant="outlined" />,
};

/**
 * ## Error Validation Path
 * Marks invalid steps while preserving progress context.
 */
export const ErrorValidationPath: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <Stepper
        steps={[
          { id: "req", title: "Request", description: "Submit requisition" },
          { id: "mgr", title: "Manager", description: "Manager decision" },
          { id: "fin", title: "Finance", description: "Budget check" },
          { id: "rel", title: "Release", description: "Vendor release" },
        ]}
        currentStep={2}
        showErrors
        errorSteps={[1]}
        variant="outlined"
      />
    </StorySurface>
  ),
};

/**
 * ## Controlled Completed Steps
 * Demonstrates non-linear review flows where completion is tracked manually.
 */
export const ControlledCompletedSteps: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <Stepper
        steps={[
          { id: "draft", title: "Draft" },
          { id: "review", title: "Review" },
          { id: "legal", title: "Legal" },
          { id: "approved", title: "Approved" },
        ]}
        currentStep={2}
        completedSteps={[0, 1]}
        clickable
        variant="default"
      />
    </StorySurface>
  ),
};
