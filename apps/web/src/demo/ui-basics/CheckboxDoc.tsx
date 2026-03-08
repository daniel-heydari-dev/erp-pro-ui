import { useState } from 'react';
import { Checkbox } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const CheckboxDoc = () => {
  const [checked, setChecked] = useState(false);

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Checkbox</h1>
      <p className="docs-paragraph">
        The Checkbox component allows users to select one or multiple items from a list, or toggle an option.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Preview</h2>
      <div className="docs-showcase-card">
        <Checkbox
          id="preview-checkbox"
          label="Accept terms and conditions"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>

      <CodeBlock code={`import { Checkbox } from '@erp-pro/ui';

const [checked, setChecked] = useState(false);

<Checkbox
  label="Accept terms and conditions"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`} />

      {/* Colors Section */}
      <h2 className="docs-category-subtitle">Colors</h2>
      <p className="docs-paragraph">
        Customize the checkbox color to match your theme or intent.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Checkbox label="Primary (Default)" color="primary" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Green / Success" color="green" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Red / Error" color="red" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Blue" color="blue" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Yellow" color="yellow" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Teal" color="teal" defaultChecked />
        </div>
      </div>

      <CodeBlock code={`<Checkbox color="primary" defaultChecked />
<Checkbox color="green" defaultChecked />
<Checkbox color="red" defaultChecked />
<Checkbox color="blue" defaultChecked />`} />

      {/* States Section */}
      <h2 className="docs-category-subtitle">States</h2>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Checkbox label="Checked state" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Unchecked state" />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Error state" error="Permission required" defaultChecked color="red" />
        </div>
      </div>

      <CodeBlock code={`<Checkbox defaultChecked />
<Checkbox />
<Checkbox error="Permission required" color="red" />`} />

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
              <td>Text label displayed next to checkbox</td>
            </tr>
            <tr>
              <td className="docs-prop-name">checked</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>-</td>
              <td>Controlled checked state</td>
            </tr>
            <tr>
              <td className="docs-prop-name">defaultChecked</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>-</td>
              <td>Initial checked state (uncontrolled)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">color</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>'primary'</td>
              <td>Color theme: 'primary', 'red', 'green', 'blue', etc.</td>
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
        previous={{ label: 'Input', route: '/ui-basics/input' }}
        next={{ label: 'Radio', route: '/ui-basics/radio' }}
      />
    </section>
  );
};

export default CheckboxDoc;
