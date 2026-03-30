import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import MultiSelectCombobox from './MultiSelectCombobox';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Framer Motion', value: 'framer' },
];

const meta: Meta<typeof MultiSelectCombobox> = {
  title: 'Forms/MultiSelectCombobox',
  component: MultiSelectCombobox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Combines search and multi-tag selection in a compact control for filtering, permission assignment, and taxonomy tagging.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    options: { control: false, description: 'Available selectable options.' },
    value: { control: false, description: 'Controlled selected values.' },
    onChange: { control: false, description: 'Called when selection changes.' },
    className: {
      control: false,
      description: 'Additional classes for the wrapper.',
    },
    bgClassName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function BasicUsageExample() {
  const [values, setValues] = useState<string[]>(['react', 'nextjs']);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <MultiSelectCombobox
        options={options}
        value={values}
        onChange={setValues}
        placeholder="Select frameworks..."
      />
    </StorySurface>
  );
}

function SelectionSummaryExample() {
  const [values, setValues] = useState<string[]>(['react', 'nextjs']);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:space-y-4">
        <MultiSelectCombobox
          options={options}
          value={values}
          onChange={setValues}
          placeholder="Select frameworks..."
        />
        <div className="ui:rounded-lg ui:border ui:border-border ui:bg-muted/40 ui:p-4">
          <p className="ui:mb-2 ui:text-sm ui:font-medium">Selected Values:</p>
          <div className="ui:flex ui:flex-wrap ui:gap-2">
            {values.length > 0 ? (
              values.map((value) => (
                <code
                  key={value}
                  className="ui:rounded ui:bg-primary/10 ui:px-2 ui:py-1 ui:text-xs ui:text-primary"
                >
                  {value}
                </code>
              ))
            ) : (
              <span className="ui:text-xs ui:italic ui:text-muted-foreground">
                None selected
              </span>
            )}
          </div>
        </div>
      </div>
    </StorySurface>
  );
}

function DenseToolbarExample() {
  const [values, setValues] = useState<string[]>(['react', 'nextjs']);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-5">
        <div className="ui:mb-3 ui:flex ui:items-center ui:justify-between ui:gap-3">
          <p className="ui:text-sm ui:font-medium">Task board filters</p>
          <span className="ui:text-xs ui:text-muted-foreground">
            {values.length} selected
          </span>
        </div>
        <MultiSelectCombobox
          options={options}
          value={values}
          onChange={setValues}
          placeholder="Filter by stack or capability..."
          bgClassName="ui:bg-muted"
        />
      </div>
    </StorySurface>
  );
}

/**
 * ## Basic Usage
 * Standard multi-tag selection with inline search.
 */
export const BasicUsage: Story = {
  render: () => <BasicUsageExample />,
};

/**
 * ## Selection Summary
 * Shows selected values alongside the control for filter builders.
 */
export const SelectionSummary: Story = {
  render: () => <SelectionSummaryExample />,
};

/**
 * ## Dense Filter Toolbar
 * Compact treatment for dashboards and data table headers.
 */
export const DenseFilterToolbar: Story = {
  render: () => <DenseToolbarExample />,
};
