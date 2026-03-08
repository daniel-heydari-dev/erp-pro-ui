import { useState } from 'react';
import { Button } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const ButtonDoc = () => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Button</h1>
      <p className="docs-paragraph">
        The Button component is the primary interactive element for triggering actions.
        It supports multiple variants, sizes, and states to fit various UI contexts.
      </p>

      {/* Preview Section */}
      <div className="docs-showcase-card">
        <div className="flex gap-4 items-center">
          <Button label="Click Me" primary onClick={() => alert('Button Clicked!')} />
          <Button label="Secondary" onClick={() => alert('Secondary Clicked!')} />
        </div>
      </div>

      <CodeBlock code={`import { Button } from '@erp-pro/ui';

<Button label="Click Me" primary onClick={() => console.log('Clicked')} />
<Button label="Secondary" onClick={() => console.log('Clicked')} />`} />

      {/* Variants Section */}
      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        Use <span className="docs-highlight">primary</span> for main actions and default (secondary) for alternative actions.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Button label="Primary Button" primary />
          <span className="text-sm text-muted-foreground mt-2">Primary Action</span>
        </div>
        <div className="docs-showcase-card">
          <Button label="Secondary Button" />
          <span className="text-sm text-muted-foreground mt-2">Secondary Action</span>
        </div>
      </div>

      <CodeBlock code={`<Button label="Primary" primary />
<Button label="Secondary" />`} />

      {/* Sizes Section */}
      <h2 className="docs-category-subtitle">Sizes</h2>
      <p className="docs-paragraph">
        Available in three standard sizes: <span className="docs-highlight">small</span>, <span className="docs-highlight">medium</span> (default), and <span className="docs-highlight">large</span>.
      </p>

      <div className="docs-showcase-card flex-row items-end flex-wrap">
        <Button label="Small" size="small" />
        <Button label="Medium" size="medium" />
        <Button label="Large" size="large" />
      </div>

      <CodeBlock code={`<Button label="Small" size="small" />
<Button label="Medium" size="medium" />
<Button label="Large" size="large" />`} />

      {/* States Section */}
      <h2 className="docs-category-subtitle">States</h2>
      <p className="docs-paragraph">
        Buttons handles disabled states automatically.
      </p>

      <div className="docs-showcase-card flex-row gap-4">
        <Button label="Disabled Key" disabled />
        <Button label="Disabled Primary" primary disabled />
      </div>

      <CodeBlock code={`<Button label="Disabled" disabled />
<Button label="Disabled Primary" primary disabled />`} />

      {/* Loading State Demo */}
      <h2 className="docs-category-subtitle">Interactive Demo</h2>
      <p className="docs-paragraph">
        Click the button below to see a simulated loading/async action.
      </p>

      <div className="docs-showcase-card">
        <Button
          label={loading ? "Loading..." : "Click to Load"}
          primary
          disabled={loading}
          onClick={toggleLoading}
        />
      </div>

      <CodeBlock code={`const [loading, setLoading] = useState(false);

<Button 
  label={loading ? "Loading..." : "Click to Load"} 
  primary 
  disabled={loading}
  onClick={handleAsyncAction} 
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
              <td className="docs-prop-name">label</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Text to display inside the button</td>
            </tr>
            <tr>
              <td className="docs-prop-name">primary</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>If true, applies primary styling</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td><span className="docs-prop-type">'small' | 'medium' | 'large'</span></td>
              <td>'medium'</td>
              <td>Controls the size of the button</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Disables interaction and dims opacity</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onClick</td>
              <td><span className="docs-prop-type">() =&gt; void</span></td>
              <td>-</td>
              <td>Function called when button is clicked</td>
            </tr>
            <tr>
              <td className="docs-prop-name">backgroundColor</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Custom background color override</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar next={{ label: 'Input', route: '/ui-basics/input' }} />
    </section>
  );
};

export default ButtonDoc;
