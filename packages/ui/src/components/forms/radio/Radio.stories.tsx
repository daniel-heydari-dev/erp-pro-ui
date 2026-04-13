import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySurface } from "../../shared/storybook";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Forms/Radio",
  component: Radio,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Single-choice selector for choosing one option from a related set.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label text for the radio." },
    error: { control: "text", description: "Displays an error message." },
    disabled: { control: "boolean", description: "Locks interaction." },
    color: {
      control: "select",
      options: ["primary", "blue", "red", "green", "yellow", "teal"],
      description: "Accent color of the radio.",
    },
    checked: { control: false, description: "Controlled checked state." },
    onChange: { control: false, description: "Checked state change callback." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const radioDefaultSource = `import { useState } from 'react';
import { Radio } from 'erp-pro-ui';

export function DefaultRadioExample() {
  const [selected, setSelected] = useState('option-1');

  return (
    <Radio
      name="group1"
      label="Option 1"
      checked={selected === 'option-1'}
      onChange={() => setSelected('option-1')}
    />
  );
}`;

const radioGroupSource = `import { useState } from 'react';
import { Radio } from 'erp-pro-ui';

export function PricingRadioGroupExample() {
  const [plan, setPlan] = useState('basic');

  return (
    <div className="flex flex-col gap-3">
      <Radio
        name="plan"
        label="Basic Plan ($10/mo)"
        checked={plan === 'basic'}
        onChange={() => setPlan('basic')}
      />
      <Radio
        name="plan"
        label="Pro Plan ($20/mo)"
        checked={plan === 'pro'}
        onChange={() => setPlan('pro')}
      />
      <Radio
        name="plan"
        label="Enterprise Plan (Contact Us)"
        checked={plan === 'enterprise'}
        onChange={() => setPlan('enterprise')}
      />
    </div>
  );
}`;

const shippingSelectorSource = `import { useState } from 'react';
import { Radio } from 'erp-pro-ui';

export function ShippingSpeedSelectorExample() {
  const [speed, setSpeed] = useState('standard');

  return (
    <div className="space-y-3">
      <Radio
        name="shipping"
        label="Standard (3-5 days)"
        checked={speed === 'standard'}
        onChange={() => setSpeed('standard')}
      />
      <Radio
        name="shipping"
        label="Priority (1-2 days)"
        checked={speed === 'priority'}
        onChange={() => setSpeed('priority')}
      />
      <Radio
        name="shipping"
        label="Same day"
        checked={speed === 'sameday'}
        onChange={() => setSpeed('sameday')}
      />
    </div>
  );
}`;

const radioValidationSource = `import { Radio } from 'erp-pro-ui';

export function RequiredRadioExample() {
  return (
    <div className="flex flex-col gap-3">
      <Radio
        name="support-tier"
        label="Priority support"
        error="Select a support tier before continuing."
        color="red"
      />
      <Radio name="support-tier" label="Dedicated success manager" />
      <Radio name="support-tier" label="Custom SLA" />
    </div>
  );
}`;

/**
 * ## Default
 * Basic unchecked radio input.
 */
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState("option-1");

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Radio
          name="group1"
          label="Option 1"
          checked={selected === "option-1"}
          onChange={() => setSelected("option-1")}
        />
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: radioDefaultSource,
      },
    },
  },
};

/**
 * ## Radio Group Configuration
 * Radios sharing the same `name` attribute will toggle correctly as a group.
 */
export const RadioGroup: Story = {
  render: () => {
    const [plan, setPlan] = useState("basic");

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <div className="ui:flex ui:flex-col ui:gap-3">
          <h4 className="ui:mb-1 ui:font-semibold ui:text-ds-1">
            Select a Plan
          </h4>
          <Radio
            name="plan"
            label="Basic Plan ($10/mo)"
            checked={plan === "basic"}
            onChange={() => setPlan("basic")}
          />
          <Radio
            name="plan"
            label="Pro Plan ($20/mo)"
            checked={plan === "pro"}
            onChange={() => setPlan("pro")}
          />
          <Radio
            name="plan"
            label="Enterprise Plan (Contact Us)"
            checked={plan === "enterprise"}
            onChange={() => setPlan("enterprise")}
          />
        </div>
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: radioGroupSource,
      },
    },
  },
};

/**
 * ## Required Validation
 * Shows the red validation state and helper text used for required radio groups.
 */
export const RequiredValidation: Story = {
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryFn />
      </StorySurface>
    ),
  ],
  render: () => (
    <div className="ui:flex ui:flex-col ui:gap-3">
      <Radio
        name="support-tier"
        label="Priority support"
        error="Select a support tier before continuing."
        color="red"
      />
      <Radio name="support-tier" label="Dedicated success manager" />
      <Radio name="support-tier" label="Custom SLA" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: radioValidationSource,
      },
    },
  },
};

/**
 * ## Disabled
 * Example of an unavailable selection.
 */
export const Disabled: Story = {
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryFn />
      </StorySurface>
    ),
  ],
  args: {
    label: "Unavailable Option",
    disabled: true,
  },
};

/**
 * ## Shipping Speed Selector
 * Common checkout-style radio group showing a realistic single-select flow.
 */
export const ShippingSpeedSelector: Story = {
  render: () => {
    const [speed, setSpeed] = useState("standard");

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-lg">
        <div className="ui:space-y-3">
          <h4 className="ui:text-sm ui:font-semibold ui:text-ds-1">
            Shipping speed
          </h4>
          <Radio
            name="shipping"
            label="Standard (3-5 days)"
            checked={speed === "standard"}
            onChange={() => setSpeed("standard")}
          />
          <Radio
            name="shipping"
            label="Priority (1-2 days)"
            checked={speed === "priority"}
            onChange={() => setSpeed("priority")}
          />
          <Radio
            name="shipping"
            label="Same day"
            checked={speed === "sameday"}
            onChange={() => setSpeed("sameday")}
          />
        </div>
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: shippingSelectorSource,
      },
    },
  },
};
