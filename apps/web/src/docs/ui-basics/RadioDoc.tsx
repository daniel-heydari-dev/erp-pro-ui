import { useState } from "react";
import { Radio } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const RadioDoc = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Radio</h1>
      <p className="docs-paragraph">
        Radio is for single-choice decisions where users must pick exactly one
        option from a known set.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Radio
            id="plan-basic"
            name="plan"
            label="Basic Plan"
            checked={selectedPlan === "basic"}
            onChange={() => setSelectedPlan("basic")}
          />
          <Radio
            id="plan-pro"
            name="plan"
            label="Pro Plan"
            checked={selectedPlan === "pro"}
            onChange={() => setSelectedPlan("pro")}
          />
          <Radio
            id="plan-enterprise"
            name="plan"
            label="Enterprise Plan"
            checked={selectedPlan === "enterprise"}
            onChange={() => setSelectedPlan("enterprise")}
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Radio } from 'erp-pro-ui';

const [selectedPlan, setSelectedPlan] = useState('pro');

<Radio
  name="plan"
  label="Basic Plan"
  checked={selectedPlan === 'basic'}
  onChange={() => setSelectedPlan('basic')}
/>
<Radio
  name="plan"
  label="Pro Plan"
  checked={selectedPlan === 'pro'}
  onChange={() => setSelectedPlan('pro')}
/>`}
      />

      <h2 className="docs-category-subtitle">Color Variants</h2>
      <p className="docs-paragraph">
        Use semantic color accents to map options to contexts such as risk,
        ownership, or status.
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

      <CodeBlock
        code={`<Radio color="blue" defaultChecked />
<Radio color="red" defaultChecked />
<Radio color="green" defaultChecked />`}
      />

      <h2 className="docs-category-subtitle">States</h2>
      <p className="docs-paragraph">
        Disabled and error states help prevent invalid submissions and guide
        users toward a valid selection.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Radio label="Disabled" disabled />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Disabled Checked" disabled defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Radio label="Error State" error="Selection invalid" color="red" />
        </div>
      </div>

      <CodeBlock
        code={`<Radio disabled />
<Radio disabled defaultChecked />
<Radio error="Invalid selection" color="red" />`}
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
              <td className="docs-prop-name">label</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Optional text label rendered next to the radio control.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">checked</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>-</td>
              <td>Controlled selected state.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">color</td>
              <td>
                <span className="docs-prop-type">
                  'red' | 'blue' | 'green' | 'yellow' | 'teal' | 'primary'
                </span>
              </td>
              <td>'blue'</td>
              <td>Accent color for the selected radio indicator.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Error message text shown beside the control.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">bgClassName</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Additional classes applied to the input element.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">...InputHTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTML props</span>
              </td>
              <td>-</td>
              <td>
                Supports native props including <code>name</code>,{" "}
                <code>value</code>, <code>onChange</code>, <code>disabled</code>
                , and <code>required</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Checkbox", route: "/ui-basics/checkbox" }}
        next={{ label: "Switch", route: "/ui-basics/switch" }}
      />
    </section>
  );
};

export default RadioDoc;
