import { useState } from 'react';
import { Select } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const SelectDoc = () => {
  const [value, setValue] = useState('');

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Select</h1>
      <p className="docs-paragraph">
        The Select component allows users to choose one option from a dropdown list.
        It supports custom styling and behaves like a native select.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Preview</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-xs">
          <Select
            label="Framework"
            placeholder="Select a framework"
            options={options}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>

      <CodeBlock code={`import { Select } from '@erp-pro/ui';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
];

<Select
  label="Framework"
  options={options}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`} />

      {/* Scenarios Section */}
      <h2 className="docs-category-subtitle">Scenarios</h2>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Select
            label="Error State"
            placeholder="Select option"
            options={options}
            error="Selection required"
          />
        </div>
        <div className="docs-showcase-card">
          <Select
            label="Disabled"
            placeholder="Cannot select"
            options={options}
            disabled
          />
        </div>
        <div className="docs-showcase-card">
          <Select
            label="With Helper Text"
            placeholder="Select option"
            options={options}
            helperText="Choose your preferred library"
          />
        </div>
      </div>

      <CodeBlock code={`<Select error="Selection required" options={options} />
<Select disabled options={options} />
<Select helperText="Helper text here" options={options} />`} />

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
              <td><span className="docs-prop-type">{'Array<{ value: string, label: string }>'}</span></td>
              <td>[]</td>
              <td>Array of options to display</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Current selected value</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">(e) =&gt; void</span></td>
              <td>-</td>
              <td>Change handler</td>
            </tr>
            <tr>
              <td className="docs-prop-name">label</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Label above the select</td>
            </tr>
            <tr>
              <td className="docs-prop-name">placeholder</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>'Select...'</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Error message</td>
            </tr>
            <tr>
              <td className="docs-prop-name">helperText</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Helper text below the select</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        previous={{ label: 'Switch', route: '/ui-basics/switch' }}
        next={{ label: 'Textarea', route: '/ui-basics/textarea' }}
      />
    </section>
  );
};

export default SelectDoc;
