import { Label, Input, Checkbox } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const LabelDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Label</h1>
      <p className="docs-paragraph">
        The Label component renders an accessible label associated with form controls.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Preview</h2>
      <div className="docs-showcase-card">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </div>

      <CodeBlock code={`import { Label, Input } from 'erp-pro-ui';

<div className="grid gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Email" />
</div>`} />

      {/* Scenarios Section */}
      <h2 className="docs-category-subtitle">Scenarios</h2>

      <div className="docs-showcase-card">
        <div className="flex flex-col gap-6 w-full max-w-sm">

          <div className="grid gap-1.5">
            <Label htmlFor="req-field" required>Required Field</Label>
            <Input id="req-field" placeholder="This is required" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>

        </div>
      </div>

      <CodeBlock code={`<Label required>Required Field</Label>

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`} />

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
              <td className="docs-prop-name">children</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>Label text or content</td>
            </tr>
            <tr>
              <td className="docs-prop-name">htmlFor</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>ID of the element the label is associated with</td>
            </tr>
            <tr>
              <td className="docs-prop-name">required</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Shows a red asterisk if true</td>
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

      <DocsButtonBar
        previous={{ label: 'Textarea', route: '/ui-basics/textarea' }}
        next={{ label: 'Dialog', route: '/ui-basics/dialog' }}
      />
    </section>
  );
};

export default LabelDoc;
