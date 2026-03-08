import { useState } from 'react';
import { Textarea } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const TextareaDoc = () => {
  const [value, setValue] = useState('');

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Textarea</h1>
      <p className="docs-paragraph">
        The Textarea component allows users to enter multi-line text.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Preview</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-sm">
          <Textarea
            label="Comments"
            placeholder="Type your message here."
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
          />
        </div>
      </div>

      <CodeBlock code={`import { Textarea } from 'erp-pro-ui';

<Textarea
  label="Comments"
  placeholder="Type your message here."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`} />

      {/* Scenarios Section */}
      <h2 className="docs-category-subtitle">Scenarios</h2>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Textarea
            label="Error State"
            placeholder="Invalid text"
            error="Message is too short"
          />
        </div>
        <div className="docs-showcase-card">
          <Textarea
            label="Disabled"
            placeholder="Cannot type here"
            disabled
          />
        </div>
        <div className="docs-showcase-card">
          <Textarea
            label="Helper Text"
            placeholder="Enter bio"
            helperText="Max 500 characters"
          />
        </div>
      </div>

      <CodeBlock code={`<Textarea error="Error message" />
<Textarea disabled />
<Textarea helperText="Helper text" />`} />

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
              <td>Label displayed above textarea</td>
            </tr>
            <tr>
              <td className="docs-prop-name">placeholder</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Controlled value</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">(e) =&gt; void</span></td>
              <td>-</td>
              <td>Change handler</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Error message displayed below</td>
            </tr>
            <tr>
              <td className="docs-prop-name">helperText</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Helper text displayed below</td>
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
        previous={{ label: 'Select', route: '/ui-basics/select' }}
        next={{ label: 'Label', route: '/ui-basics/label' }}
      />
    </section>
  );
};

export default TextareaDoc;
