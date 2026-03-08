import { useState } from 'react';
import { Input, InputState } from '@erp-pro/ui';
import { FiSearch, FiMail, FiLock } from 'react-icons/fi';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const InputDoc = () => {
  const [value, setValue] = useState('');

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Input</h1>
      <p className="docs-paragraph">
        The Input component is a versatile text field supporting various states, icons, and validation feedback.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Preview</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Type something..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Default Input"
            helperText="This is a helper text"
          />
        </div>
      </div>

      <CodeBlock code={`import { Input } from '@erp-pro/ui';

<Input
  label="Default Input"
  placeholder="Type something..."
  helperText="This is a helper text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`} />

      {/* States Section */}
      <h2 className="docs-category-subtitle">States</h2>
      <p className="docs-paragraph">
        Visual feedback for different input states: <span className="docs-highlight">error</span>, <span className="docs-highlight">success</span>, and <span className="docs-highlight">disabled</span>.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Input
            label="Error State"
            placeholder="Invalid input"
            state={InputState.ERROR}
            error="This field is required"
          />
        </div>
        <div className="docs-showcase-card">
          <Input
            label="Success State"
            placeholder="Valid input"
            state={InputState.SUCCESS}
            message="Looks good!"
          />
        </div>
        <div className="docs-showcase-card">
          <Input
            label="Disabled State"
            placeholder="Cannot type here"
            disabled
          />
        </div>
      </div>

      <CodeBlock code={`import { Input, InputState } from '@erp-pro/ui';

<Input state={InputState.ERROR} error="Error message" />
<Input state={InputState.SUCCESS} message="Success message" />
<Input disabled />`} />

      {/* Icons Section */}
      <h2 className="docs-category-subtitle">With Icons</h2>
      <p className="docs-paragraph">
        Add icons to inputs for better visual context.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Input
            placeholder="Search..."
            icon={<FiSearch size={18} className="text-muted-foreground" />}
          />
        </div>
        <div className="docs-showcase-card">
          <Input
            placeholder="Email address"
            type="email"
            icon={<FiMail size={18} className="text-muted-foreground" />}
          />
        </div>
        <div className="docs-showcase-card">
          <Input
            placeholder="Password"
            type="password"
            icon={<FiLock size={18} className="text-muted-foreground" />}
          />
        </div>
      </div>

      <CodeBlock code={`import { FiSearch, FiMail } from 'react-icons/fi';

<Input icon={<FiSearch size={18} />} placeholder="Search..." />
<Input icon={<FiMail size={18} />} placeholder="Email" />`} />

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
              <td>Label displayed above the input</td>
            </tr>
            <tr>
              <td className="docs-prop-name">placeholder</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td className="docs-prop-name">state</td>
              <td><span className="docs-prop-type">InputState</span></td>
              <td>DEFAULT</td>
              <td>'default', 'error', 'success', 'disabled'</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Error message text (triggers error state)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">helperText</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Helper text displayed below the input</td>
            </tr>
            <tr>
              <td className="docs-prop-name">icon</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>Icon element to display on the right</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Disables interaction</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        previous={{ label: 'Button', route: '/ui-basics/button' }}
        next={{ label: 'Checkbox', route: '/ui-basics/checkbox' }}
      />
    </section>
  );
};

export default InputDoc;
