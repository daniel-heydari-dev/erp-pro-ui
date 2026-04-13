import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StorySurface,
} from "../../shared/storybook";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Controlled dropdown for choosing one option from a predefined list.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label for the dropdown" },
    error: { control: "text", description: "Error feedback message" },
    helperText: { control: "text", description: "Helper instruction text" },
    disabled: { control: "boolean", description: "Disables the dropdown" },
    placeholder: {
      control: "text",
      description: "Default placeholder when no item is selected",
    },
    options: {
      control: false,
      description: "Available choices as value/label pairs.",
    },
    value: { control: false, description: "Controlled selected value." },
    onChange: { control: false, description: "Selection change callback." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSelectSource = `import { useState } from 'react';
import { Select } from 'erp-pro-ui';

const options = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
];

export function CountrySelect() {
  const [value, setValue] = useState('');

  return (
    <Select
      label="Country"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      options={options}
    />
  );
}`;

const controlledPatternSource = `import { useState } from 'react';
import { Select } from 'erp-pro-ui';

const environmentOptions = [
  { label: 'Development', value: 'development' },
  { label: 'Staging', value: 'staging' },
  { label: 'Production', value: 'production' },
];

export function ControlledEnvironmentSelect() {
  const [environment, setEnvironment] = useState('');

  return (
    <Select
      label="Deployment environment"
      placeholder="Choose environment"
      options={environmentOptions}
      value={environment}
      onChange={(event) => setEnvironment(event.target.value)}
      error={environment ? undefined : 'Environment is required'}
      helperText="Choose where this release should be promoted."
    />
  );
}`;

const approvalSegmentSource = `import { useState } from 'react';
import { Select } from 'erp-pro-ui';

const departmentOptions = [
  { label: 'Operations', value: 'operations' },
  { label: 'Finance', value: 'finance' },
  { label: 'Procurement', value: 'procurement' },
];

export function ApprovalFormSegmentExample() {
  const [department, setDepartment] = useState('operations');

  return (
    <Select
      label="Review Department"
      value={department}
      onChange={(event) => setDepartment(event.target.value)}
      options={departmentOptions}
    />
  );
}`;

const commonStatesSource = `import { Select } from 'erp-pro-ui';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

export function SelectCommonStatesExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Select label="Validation" placeholder="Select owner" options={options} error="Owner is required" />
      <Select label="Disabled" placeholder="Cannot change" options={options} disabled value="react" />
      <Select label="Custom Surface" placeholder="Select option" options={options} helperText="Styled with a darker glass background." bgClassName="bg-neutral-900/70 text-white backdrop-blur-xl" />
    </div>
  );
}`;

const selectValidationSource = `import { Select } from 'erp-pro-ui';

const options = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
];

export function RequiredSelectExample() {
  return (
    <Select
      label="Favorite Color"
      error="Please select a color to continue."
      options={options}
    />
  );
}`;

// --- Helper Components ---

function ControlledSelect() {
  const [val, setVal] = useState("");
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:min-h-80 ui:w-full">
        <Select
          label="Country"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          options={[
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
            { label: "United Kingdom", value: "uk" },
            { label: "Australia", value: "au" },
          ]}
          className="ui:w-full"
        />
      </div>
    </StorySurface>
  );
}

// --- Stories ---

/**
 * ## Default
 * Basic Select dropdown. Clicking reveals the accessible options.
 */
export const Default: Story = {
  render: () => <ControlledSelect />,
  parameters: {
    docs: {
      source: {
        code: defaultSelectSource,
      },
    },
  },
};

export const ControlledFormPattern: Story = {
  render: () => {
    const [environment, setEnvironment] = useState("");

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <div className="ui:min-h-80 ui:w-full">
          <Select
            label="Deployment environment"
            placeholder="Choose environment"
            options={[
              { label: "Development", value: "development" },
              { label: "Staging", value: "staging" },
              { label: "Production", value: "production" },
            ]}
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
            error={environment ? undefined : "Environment is required"}
            helperText="Choose where this release should be promoted."
          />
        </div>
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: controlledPatternSource,
      },
    },
  },
};

/**
 * ## With Error
 * Use this state to indicate a validation error to the user.
 */
export const WithError: Story = {
  args: {
    label: "Favorite Color",
    error: "Please select a color to continue.",
    options: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
    ],
    className: "ui:w-full",
  },
  decorators: [
    (StoryFn) => (
      <StorySurface
        widthClassName="ui:w-full ui:max-w-md"
        className="ui:min-h-72"
      >
        <StoryFn />
      </StorySurface>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: selectValidationSource,
      },
    },
  },
};

/**
 * ## Disabled State
 * User cannot interact with the dropdown.
 */
export const Disabled: Story = {
  args: {
    label: "Available Options (Locked)",
    disabled: true,
    value: "opt1",
    options: [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
    ],
    className: "ui:w-full",
  },
  decorators: [
    (StoryFn) => (
      <StorySurface
        widthClassName="ui:w-full ui:max-w-md"
        className="ui:min-h-72"
      >
        <StoryFn />
      </StorySurface>
    ),
  ],
};

/**
 * ## Approval Form Segment
 * Practical section where select is paired with related fields.
 */
export const ApprovalFormSegment: Story = {
  render: () => {
    const [department, setDepartment] = useState("operations");

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-xl">
        <StorySection>
          <Select
            label="Review Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            options={[
              { label: "Operations", value: "operations" },
              { label: "Finance", value: "finance" },
              { label: "Procurement", value: "procurement" },
            ]}
          />
          <StoryPanel className="ui:rounded-md ui:bg-ds-surface-3/40 ui:px-3 ui:py-2 ui:text-sm ui:text-ds-2 ui:shadow-none">
            Current reviewer queue is generated from the selected department.
          </StoryPanel>
        </StorySection>
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: approvalSegmentSource,
      },
    },
  },
};

export const CommonStates: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <StorySection>
        <StoryIntro
          title="Common states and surfaces"
          description="Error, disabled, and custom-surface cases are easier to evaluate when shown together."
        />
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
          <Select
            label="Validation"
            placeholder="Select owner"
            options={[
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
              { label: "Angular", value: "angular" },
            ]}
            error="Owner is required"
          />
          <Select
            label="Disabled"
            placeholder="Cannot change"
            options={[
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
              { label: "Angular", value: "angular" },
            ]}
            disabled
            value="react"
          />
          <Select
            label="Custom Surface"
            placeholder="Select option"
            options={[
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
              { label: "Angular", value: "angular" },
            ]}
            helperText="Styled with a darker glass background."
            bgClassName="bg-neutral-900/70 text-white backdrop-blur-xl"
          />
        </div>
      </StorySection>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: commonStatesSource,
      },
    },
  },
};
