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

function SearchableSelectionDemo() {
  const [value, setValue] = useState("next.js");

  const selected = frameworks.find((option) => option.value === value);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-6 ui:md:grid-cols-[1.1fr_0.9fr]">
        <div className="ui:space-y-3">
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Searchable selection
          </p>
          <p className="ui:text-sm ui:text-muted-foreground">
            Use Combobox when the option list is too long for a standard select
            and people benefit from type-ahead search.
          </p>
          <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-muted/40 ui:p-4">
            <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
              Current selection
            </p>
            <p className="ui:mt-2 ui:text-xl ui:font-semibold ui:text-foreground">
              {selected?.label ?? "No framework selected"}
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
              Useful for framework presets, assignee routing, or catalog
              filters.
            </p>
          </div>
        </div>
        <div className="ui:min-h-80 ui:w-full">
          <label className="ui:mb-2 ui:block ui:text-sm ui:font-medium ui:text-foreground">
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

function CreateOptionDemo() {
  const [value, setValue] = useState("");
  const [requests, setRequests] = useState<string[]>([]);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-6 ui:md:grid-cols-[0.95fr_1.05fr]">
        <div className="ui:min-h-80 ui:w-full">
          <label className="ui:mb-2 ui:block ui:text-sm ui:font-medium ui:text-foreground">
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
        <div className="ui:space-y-3 ui:rounded-2xl ui:border ui:border-border ui:bg-muted/40 ui:p-4">
          <div>
            <p className="ui:text-sm ui:font-semibold ui:text-foreground">
              Create-option workflow
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
              Pair `createOptionLabel` with a modal or side panel when the
              desired record is not available yet.
            </p>
          </div>
          <div className="ui:rounded-xl ui:border ui:border-dashed ui:border-border ui:bg-background ui:p-4">
            <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
              Activity log
            </p>
            <div className="ui:mt-3 ui:space-y-2 ui:text-sm ui:text-muted-foreground">
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

function ToolbarFilterDemo() {
  const [value, setValue] = useState("exceptions");

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:flex ui:flex-col ui:gap-4 ui:rounded-2xl ui:border ui:border-border ui:bg-muted/40 ui:p-4">
        <div className="ui:flex ui:flex-col ui:gap-3 ui:md:flex-row ui:md:items-center ui:md:justify-between">
          <div>
            <p className="ui:text-sm ui:font-semibold ui:text-foreground">
              Embedded in a dashboard toolbar
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
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
              className="ui:rounded-xl ui:border ui:border-border ui:bg-background ui:p-4"
            >
              <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
                {metric.label}
              </p>
              <p className="ui:mt-2 ui:text-2xl ui:font-semibold ui:text-foreground">
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
  render: () => <SearchableSelectionDemo />,
};

export const CreateOptionWorkflow: Story = {
  render: () => <CreateOptionDemo />,
};

export const ToolbarFilter: Story = {
  render: () => <ToolbarFilterDemo />,
};
