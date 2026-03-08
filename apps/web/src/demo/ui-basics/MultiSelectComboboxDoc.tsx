import { useState } from 'react';
import { MultiSelectCombobox } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const MultiSelectComboboxDoc = () => {
  const [values, setValues] = useState<string[]>(['react', 'nextjs']);

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

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Multi Select Combobox</h1>
      <p className="docs-paragraph">
        A searchable combobox that allows selecting multiple options as tags.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[400px] items-start">
        <div className="w-full max-w-md">
          <MultiSelectCombobox
            options={options}
            value={values}
            onChange={setValues}
            placeholder="Select frameworks..."
          />
        </div>
      </div>

      <CodeBlock code={`import { MultiSelectCombobox } from 'erp-pro-ui';
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
/>`} />

      {/* Selection Summary */}
      <div className="mt-4 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">Selected Values:</p>
        <div className="flex flex-wrap gap-2">
          {values.length > 0 ? (
            values.map(v => (
              <code key={v} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">
                {v}
              </code>
            ))
          ) : (
            <span className="text-xs text-neutral-500 italic">None selected</span>
          )}
        </div>
      </div>

      {/* Props Reference */}
      <h2 className="docs-category-subtitle">Props</h2>
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
              <td><span className="docs-prop-type">MultiSelectOption[]</span></td>
              <td>-</td>
              <td>Array of {`{ label, value }`} objects</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">string[]</span></td>
              <td>[]</td>
              <td>Controlled array of selected values</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">{`(values: string[]) => void`}</span></td>
              <td>-</td>
              <td>Callback when selection changes</td>
            </tr>
            <tr>
              <td className="docs-prop-name">placeholder</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>"Select..."</td>
              <td>Placeholder text</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Combobox', route: '/ui-basics/combobox' }}
        next={{ label: 'Hover Card', route: '/ui-basics/hover-card' }}
      />
    </section>
  );
};

export default MultiSelectComboboxDoc;
