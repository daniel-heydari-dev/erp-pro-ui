import { useState } from "react";
import { MultiSelectCombobox } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const MultiSelectComboboxDoc = () => {
  const [values, setValues] = useState<string[]>(["react", "nextjs"]);

  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt.js", value: "nuxtjs" },
    { label: "Tailwind CSS", value: "tailwind" },
    { label: "TypeScript", value: "typescript" },
    { label: "Framer Motion", value: "framer" },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Multi Select Combobox</h1>
      <p className="docs-paragraph">
        MultiSelectCombobox combines search and multi-tag selection in a compact
        control for filters, permissions, team assignment, and catalog tagging.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-md">
          <MultiSelectCombobox
            options={options}
            value={values}
            onChange={setValues}
            placeholder="Select frameworks..."
          />
        </div>
      </div>

      <CodeBlock
        code={`import { MultiSelectCombobox } from 'erp-pro-ui';
import { useState } from 'react';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Next.js', value: 'nextjs' },
  // ...
];

const [values, setValues] = useState<string[]>([]);

<MultiSelectCombobox
  options={options}
  value={values}
  onChange={setValues}
  placeholder="Select frameworks..."
/>`}
      />

      <h2 className="docs-category-subtitle">Selection Summary</h2>
      <div className="mt-4 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
          Selected Values:
        </p>
        <div className="flex flex-wrap gap-2">
          {values.length > 0 ? (
            values.map((v) => (
              <code
                key={v}
                className="px-2 py-1 rounded bg-accent-subtle text-accent text-xs"
              >
                {v}
              </code>
            ))
          ) : (
            <span className="text-xs text-neutral-500 italic">
              None selected
            </span>
          )}
        </div>
      </div>

      <h2 className="docs-category-subtitle">Dense Filter Toolbar</h2>
      <p className="docs-paragraph mb-4">
        In table headers and dashboards, use a compact background style and
        controlled state to keep multi-filter selections readable.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              Task board filters
            </p>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {values.length} selected
            </span>
          </div>

          <MultiSelectCombobox
            options={options}
            value={values}
            onChange={setValues}
            placeholder="Filter by stack or capability..."
            bgClassName="bg-neutral-50 dark:bg-neutral-800"
          />
        </div>
      </div>

      <CodeBlock
        code={`<MultiSelectCombobox
  options={options}
  value={selectedFilters}
  onChange={setSelectedFilters}
  placeholder="Filter by stack or capability..."
  bgClassName="bg-neutral-50 dark:bg-neutral-800"
/>`}
      />

      <h2 className="docs-category-subtitle">Core Props</h2>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">options</td>
              <td>
                <span className="docs-prop-type">MultiSelectOption[]</span>
              </td>
              <td>-</td>
              <td>Available options in the format {"{ label, value }[]"}</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td>
                <span className="docs-prop-type">string[]</span>
              </td>
              <td>-</td>
              <td>Controlled array of selected values</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td>
                <span className="docs-prop-type">{`(values: string[]) => void`}</span>
              </td>
              <td>-</td>
              <td>Callback when selection changes</td>
            </tr>
            <tr>
              <td className="docs-prop-name">placeholder</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'Select...'</td>
              <td>Placeholder shown when no options are selected</td>
            </tr>
            <tr>
              <td className="docs-prop-name">bgClassName</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl'</td>
              <td>Overrides the combobox trigger surface style</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>''</td>
              <td>Additional classes for the wrapper container</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Combobox", route: "/ui-basics/combobox" }}
        next={{ label: "Hover Card", route: "/ui-basics/hover-card" }}
      />
    </section>
  );
};

export default MultiSelectComboboxDoc;
