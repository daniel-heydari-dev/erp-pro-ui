import { useState } from 'react';
import { Combobox } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const ComboboxDoc = () => {
  const [value, setValue] = useState('');
  const [createValue, setCreateValue] = useState('');

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Nuxt.js', value: 'nuxtjs' },
  ];

  const handleCreate = () => {
    alert('Create option clicked!');
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Combobox</h1>
      <p className="docs-paragraph">
        An autocomplete input with a searchable dropdown list of options.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[300px] items-start">
        <div className="w-full max-w-xs">
          <Combobox
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Select a framework..."
          />
        </div>
      </div>

      <CodeBlock code={`import { Combobox } from 'erp-pro-ui';
import { useState } from 'react';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  // ...
];

const [value, setValue] = useState('');

<Combobox
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select a framework..."
/>`} />

      {/* Create Option */}
      <h2 className="docs-category-subtitle">With Create Option</h2>
      <p className="docs-paragraph">
        You can allow users to trigger a creation flow if their desired option isn't in the list.
      </p>
      <div className="docs-showcase-card h-[300px] items-start">
        <div className="w-full max-w-xs">
          <Combobox
            options={options}
            value={createValue}
            onChange={setCreateValue}
            createOptionLabel="Add new framework"
            onCreateOption={handleCreate}
          />
        </div>
      </div>

      <CodeBlock code={`<Combobox
  options={options}
  value={value}
  onChange={setValue}
  createOptionLabel="Add new framework"
  onCreateOption={() => handleCreate()}
/>`} />

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
              <td><span className="docs-prop-type">ComboboxOption[]</span></td>
              <td>-</td>
              <td>Array of {`{ label, value }`} objects</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Controlled value</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">(value: string) =&gt; void</span></td>
              <td>-</td>
              <td>Callback when selection changes</td>
            </tr>
            <tr>
              <td className="docs-prop-name">placeholder</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>"Select..."</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td className="docs-prop-name">createOptionLabel</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Label for the "create" button in the menu</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onCreateOption</td>
              <td><span className="docs-prop-type">() =&gt; void</span></td>
              <td>-</td>
              <td>Callback when the create button is clicked</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Tooltip', route: '/ui-basics/tooltip' }}
        next={{ label: 'Multi Select Combobox', route: '/ui-basics/multi-select-combobox' }}
      />
    </section>
  );
};

export default ComboboxDoc;
