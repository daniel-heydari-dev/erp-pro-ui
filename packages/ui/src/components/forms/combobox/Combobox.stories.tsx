import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySurface } from "../../shared/storybook";
import Combobox from "./Combobox";

const meta = {
  title: "Forms/Combobox",
  component: Combobox,
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Searchable select input for long option lists. The story keeps local state inside a dedicated demo wrapper instead of leaking state into Storybook args.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworkSelectorSource = `import { useState } from 'react';
import { Combobox, type ComboboxOption } from 'erp-pro-ui';

const frameworks: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'next.js', label: 'Next.js' },
];

export function FrameworkSelector() {
  const [value, setValue] = useState('next.js');

  return (
    <Combobox
      options={frameworks}
      value={value}
      onChange={setValue}
      placeholder="Select a framework..."
    />
  );
}`;

const teamProvisioningSource = `import { useState } from 'react';
import { Combobox, type ComboboxOption } from 'erp-pro-ui';

const teams: ComboboxOption[] = [
  { value: 'fulfillment', label: 'Fulfillment Operations' },
  { value: 'finance', label: 'Finance' },
  { value: 'product', label: 'Product' },
];

export function TeamProvisioningFlow() {
  const [value, setValue] = useState('');

  return (
    <Combobox
      options={teams}
      value={value}
      onChange={setValue}
      placeholder="Search a team..."
      createOptionLabel="Request a new team"
      onCreateOption={() => {
        window.alert('Create flow requested for ' + (value || 'a new team') + '.');
      }}
    />
  );
}`;

const toolbarFilterSource = `import { useState } from 'react';
import { Combobox, type ComboboxOption } from 'erp-pro-ui';

const filters: ComboboxOption[] = [
  { value: 'open', label: 'Open Orders' },
  { value: 'at-risk', label: 'At-Risk Shipments' },
  { value: 'exceptions', label: 'Exceptions Queue' },
];

export function QueueToolbarFilter() {
  const [value, setValue] = useState('exceptions');

  return (
    <Combobox
      options={filters}
      value={value}
      onChange={setValue}
      placeholder="Filter operational queue..."
      bgClassName="bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl"
    />
  );
}`;

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next.js", label: "Next.js" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "solidstart", label: "SolidStart" },
];

const teams = [
  { value: "fulfillment", label: "Fulfillment Operations" },
  { value: "finance", label: "Finance" },
  { value: "merchandising", label: "Merchandising" },
  { value: "support", label: "Support" },
  { value: "revops", label: "Revenue Operations" },
  { value: "product", label: "Product" },
];

const filters = [
  { value: "open", label: "Open Orders" },
  { value: "at-risk", label: "At-Risk Shipments" },
  { value: "scheduled", label: "Scheduled Deliveries" },
  { value: "exceptions", label: "Exceptions Queue" },
  { value: "returns", label: "Returns" },
];

function FrameworkSelectorPreview() {
  const [value, setValue] = useState("next.js");

  const selected = frameworks.find((option) => option.value === value);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-6 ui:md:grid-cols-[1.1fr_0.9fr]">
        <div className="ui:space-y-3">
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">
            Searchable selection
          </p>
          <p className="ui:text-sm ui:text-ds-2">
            Use Combobox when the option list is too long for a standard select
            and people benefit from type-ahead search.
          </p>
          <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-3/40 ui:p-4">
            <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
              Current selection
            </p>
            <p className="ui:mt-2 ui:text-xl ui:font-semibold ui:text-ds-1">
              {selected?.label ?? "No framework selected"}
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
              Useful for framework presets, assignee routing, or catalog
              filters.
            </p>
          </div>
        </div>
        <div className="ui:min-h-80 ui:w-full">
          <label className="ui:mb-2 ui:block ui:text-sm ui:font-medium ui:text-ds-1">
            Preferred framework
          </label>
          <Combobox
            options={frameworks}
            value={value}
            onChange={setValue}
            placeholder="Select a framework..."
            className="ui:w-full"
          />
        </div>
      </div>
    </StorySurface>
  );
}

function TeamProvisioningPreview() {
  const [value, setValue] = useState("");
  const [requests, setRequests] = useState<string[]>([]);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-6 ui:md:grid-cols-[0.95fr_1.05fr]">
        <div className="ui:min-h-80 ui:w-full">
          <label className="ui:mb-2 ui:block ui:text-sm ui:font-medium ui:text-ds-1">
            Assign request owner
          </label>
          <Combobox
            options={teams}
            value={value}
            onChange={setValue}
            placeholder="Search a team..."
            createOptionLabel="Request a new team"
            onCreateOption={() =>
              setRequests((current) => [
                `Creation flow requested for \"${value || "new team"}\".`,
                ...current,
              ])
            }
            className="ui:w-full"
          />
        </div>
        <div className="ui:space-y-3 ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-3/40 ui:p-4">
          <div>
            <p className="ui:text-sm ui:font-semibold ui:text-ds-1">
              Create-option workflow
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
              Pair `createOptionLabel` with a modal or side panel when the
              desired record is not available yet.
            </p>
          </div>
          <div className="ui:rounded-xl ui:border ui:border-dashed ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
            <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
              Activity log
            </p>
            <div className="ui:mt-3 ui:space-y-2 ui:text-sm ui:text-ds-2">
              {requests.length > 0 ? (
                requests.slice(0, 3).map((entry) => <p key={entry}>{entry}</p>)
              ) : (
                <p>
                  Trigger the create action to simulate opening a provisioning
                  flow.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </StorySurface>
  );
}

function QueueToolbarFilterPreview() {
  const [value, setValue] = useState("exceptions");

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:flex ui:flex-col ui:gap-4 ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-3/40 ui:p-4">
        <div className="ui:flex ui:flex-col ui:gap-3 ui:md:flex-row ui:md:items-center ui:md:justify-between">
          <div>
            <p className="ui:text-sm ui:font-semibold ui:text-ds-1">
              Embedded in a dashboard toolbar
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
              The same component works as a compact filter control when paired
              with a lightweight background treatment.
            </p>
          </div>
          <div className="ui:w-full ui:max-w-sm">
            <Combobox
              options={filters}
              value={value}
              onChange={setValue}
              placeholder="Filter operational queue..."
              bgClassName="bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl"
              className="ui:w-full"
            />
          </div>
        </div>
        <div className="ui:grid ui:gap-3 ui:md:grid-cols-3">
          {[
            { label: "Open tasks", value: "42" },
            { label: "Escalations", value: "6" },
            { label: "Avg. resolution", value: "2h 14m" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4"
            >
              <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
                {metric.label}
              </p>
              <p className="ui:mt-2 ui:text-2xl ui:font-semibold ui:text-ds-1">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </StorySurface>
  );
}

export const SearchableSelection: Story = {
  name: "Framework Selector",
  render: () => <FrameworkSelectorPreview />,
  parameters: {
    docs: {
      source: {
        code: frameworkSelectorSource,
      },
    },
  },
};

export const CreateOptionWorkflow: Story = {
  name: "Team Provisioning Flow",
  render: () => <TeamProvisioningPreview />,
  parameters: {
    docs: {
      source: {
        code: teamProvisioningSource,
      },
    },
  },
};

export const ToolbarFilter: Story = {
  name: "Queue Toolbar Filter",
  render: () => <QueueToolbarFilterPreview />,
  parameters: {
    docs: {
      source: {
        code: toolbarFilterSource,
      },
    },
  },
};
