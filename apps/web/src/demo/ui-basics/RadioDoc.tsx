import { useState } from 'react';
import { Radio } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const RadioDoc = () => {
  const [selected, setSelected] = useState('option1');

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Radio</h1>
      <p className="docs-paragraph">
        The Radio component allows users to select a single option from a list.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Preview</h2>
      <div className="docs-showcase-card">
        <div className="flex flex-col gap-2">
          <Radio
            id="opt-1"
            name="demo-group"
            label="Option 1"
            checked={selected === 'option1'}
            onChange={() => setSelected('option1')}
          />
          <Radio
            id="opt-2"
            name="demo-group"
            label="Option 2"
            checked={selected === 'option2'}
            onChange={() => setSelected('option2')}
          />
        </div>
      </div>

      <CodeBlock code={`import { Radio } from '@erp-pro/ui';

const [selected, setSelected] = useState('option1');

<Radio
  label="Option 1"
  checked={selected === 'option1'}
  onChange={() => setSelected('option1')}
/>
<Radio
  label="Option 2"
  checked={selected === 'option2'}
  onChange={() => setSelected('option2')}
/>`} />

      {/* Colors Section */}
      <h2 className="docs-category-subtitle">Colors</h2>
      <p className="docs-paragraph">
        Available in multiple colors to match different themes or states.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Radio label="Blue (Default)" color="blue" defaultChecked readOnly />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Red" color="red" defaultChecked readOnly />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Green" color="green" defaultChecked readOnly />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Yellow" color="yellow" defaultChecked readOnly />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Teal" color="teal" defaultChecked readOnly />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Primary" color="primary" defaultChecked readOnly />
        </div>
      </div>

      <CodeBlock code={`<Radio color="blue" defaultChecked />
<Radio color="red" defaultChecked />
<Radio color="green" defaultChecked />`} />

      {/* States Section */}
      <h2 className="docs-category-subtitle">States</h2>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Radio label="Disabled" disabled />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Disabled Checked" disabled defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Error State" error="Selection invalid" defaultChecked color="red" />
        </div>
      </div>

      <CodeBlock code={`<Radio disabled />
<Radio disabled defaultChecked />
<Radio error="Invalid selection" color="red" />`} />

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
              <td className="docs-prop-name">label</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Text label displayed next to radio</td>
            </tr>
            <tr>
              <td className="docs-prop-name">checked</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>-</td>
              <td>Controlled checked state</td>
            </tr>
            <tr>
              <td className="docs-prop-name">color</td>
              <td><span className="docs-prop-type">RadioColor</span></td>
              <td>'blue'</td>
              <td>'red' | 'blue' | 'green' | 'yellow' | 'teal' | 'primary'</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Error message to display below</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">(e) =&gt; void</span></td>
              <td>-</td>
              <td>Handler for state changes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        previous={{ label: 'Checkbox', route: '/ui-basics/checkbox' }}
        next={{ label: 'Switch', route: '/ui-basics/switch' }}
      />
    </section>
  );
};

export default RadioDoc;
