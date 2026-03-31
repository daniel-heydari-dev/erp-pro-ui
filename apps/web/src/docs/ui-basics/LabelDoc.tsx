import { Label, Input, Checkbox } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const LabelDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Label</h1>
      <p className="docs-paragraph">
        Label connects text to form controls and improves accessibility by
        giving each field a clear, clickable name.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="name@company.com" />
        </div>
      </div>

      <CodeBlock
        code={`import { Label, Input } from 'erp-pro-ui';

<div className="grid gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="name@company.com" />
</div>`}
      />

      <h2 className="docs-category-subtitle">Common Patterns</h2>
      <p className="docs-paragraph">
        Labels work across text inputs and checkboxes. Use the
        <code>required</code> prop to communicate mandatory fields.
      </p>

      <div className="docs-showcase-card">
        <div className="flex w-full max-w-md flex-col gap-6">
          <div className="grid gap-1.5">
            <Label htmlFor="req-field" required>
              Required Field
            </Label>
            <Input id="req-field" placeholder="Project name" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </div>
      </div>

      <CodeBlock
        code={`<Label htmlFor="projectName" required>Project name</Label>
<Input id="projectName" />

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`}
      />

      <h2 className="docs-category-subtitle">Core Props</h2>
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
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Text or custom content rendered inside the label.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">htmlFor</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>ID of the input element this label should target.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">required</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Appends a red asterisk to indicate required fields.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">...LabelHTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTML props</span>
              </td>
              <td>-</td>
              <td>
                Supports native label props like <code>className</code>,{" "}
                <code>onClick</code>, and <code>title</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Textarea", route: "/ui-basics/textarea" }}
        next={{ label: "Dialog", route: "/ui-basics/dialog" }}
      />
    </section>
  );
};

export default LabelDoc;
