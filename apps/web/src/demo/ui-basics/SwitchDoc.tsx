import { useState } from 'react';
import { Switch } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const SwitchDoc = () => {
  const [checked, setChecked] = useState(false);

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Switch</h1>
      <p className="docs-paragraph">
        The Switch component is used for toggling a single option on or off.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Preview</h2>
      <div className="docs-showcase-card">
        <Switch
          label="Notifications"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>

      <CodeBlock code={`import { Switch } from '@erp-pro/ui';

const [enabled, setEnabled] = useState(false);

<Switch
  label="Notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>`} />

      {/* States Section */}
      <h2 className="docs-category-subtitle">States</h2>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Switch label="Default (Off)" />
        </div>
        <div className="docs-showcase-card">
          <Switch label="Default (On)" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Switch label="Disabled" disabled />
        </div>
        <div className="docs-showcase-card">
          <Switch label="Disabled (On)" disabled defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Switch label="Error State" error="Failed to sync" />
        </div>
      </div>

      <CodeBlock code={`<Switch label="Off" />
<Switch label="On" defaultChecked />
<Switch label="Disabled" disabled />
<Switch label="Error" error="Error message" />`} />

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
              <td>Text label displayed next to switch</td>
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
              <td className="docs-prop-name">error</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Error message displayed below</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">(e) =&gt; void</span></td>
              <td>-</td>
              <td>Handler for state changes</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Disables the switch</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        previous={{ label: 'Radio', route: '/ui-basics/radio' }}
        next={{ label: 'Select', route: '/ui-basics/select' }}
      />
    </section>
  );
};

export default SwitchDoc;
