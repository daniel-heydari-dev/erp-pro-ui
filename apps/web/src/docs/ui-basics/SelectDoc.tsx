import type { ChangeEvent } from "react";
import { useState } from "react";
import { Select } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const SelectDoc = () => {
  const [framework, setFramework] = useState("");
  const [environment, setEnvironment] = useState("staging");

  const frameworkOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" },
  ];

  const environmentOptions = [
    { value: "development", label: "Development" },
    { value: "staging", label: "Staging" },
    { value: "production", label: "Production" },
  ];

  const handleFrameworkChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFramework(event.target.value);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Select</h1>
      <p className="docs-paragraph">
        Select is a styled dropdown that still preserves native form behavior.
        Use it for fields where users choose one value from a constrained list.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-sm">
          <Select
            label="Framework"
            placeholder="Select a framework"
            options={frameworkOptions}
            value={framework}
            onChange={handleFrameworkChange}
            helperText="Used to customize starter templates."
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Select } from 'erp-pro-ui';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
];

<Select
  label="Framework"
  options={options}
  value={framework}
  onChange={(event) => setFramework(event.target.value)}
/>`}
      />

      <h2 className="docs-category-subtitle">Controlled Form Pattern</h2>
      <p className="docs-paragraph">
        In real forms, pair controlled state with validation messaging so users
        can resolve errors without losing context.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-sm">
          <Select
            label="Deployment environment"
            placeholder="Choose environment"
            options={environmentOptions}
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
            error={environment ? undefined : "Environment is required"}
            helperText="Choose where this release should be promoted."
          />
        </div>
      </div>

      <CodeBlock
        code={`const [environment, setEnvironment] = useState('');

<Select
  label="Deployment environment"
  options={environmentOptions}
  value={environment}
  onChange={(event) => setEnvironment(event.target.value)}
  error={environment ? undefined : 'Environment is required'}
/>`}
      />

      <h2 className="docs-category-subtitle">Common States</h2>
      <p className="docs-paragraph">
        The component supports helper text, error text, disabled mode, and
        custom dropdown surface styles via <code>bgClassName</code>.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Select
            label="Validation"
            placeholder="Select owner"
            options={frameworkOptions}
            error="Owner is required"
          />
        </div>
        <div className="docs-showcase-card">
          <Select
            label="Disabled"
            placeholder="Cannot change"
            options={frameworkOptions}
            disabled
            value="react"
          />
        </div>
        <div className="docs-showcase-card">
          <Select
            label="Custom Surface"
            placeholder="Select option"
            options={frameworkOptions}
            helperText="Styled with a darker glass background."
            bgClassName="bg-neutral-900/70 text-white backdrop-blur-xl"
          />
        </div>
      </div>

      <CodeBlock
        code={`<Select error="Owner is required" options={options} />
<Select disabled value="react" options={options} />
<Select bgClassName="bg-neutral-900/70" options={options} />`}
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
              <td className="docs-prop-name">options</td>
              <td>
                <span className="docs-prop-type">
                  Array&lt;{"{ value: string; label: string }"}&gt;
                </span>
              </td>
              <td>-</td>
              <td>List of selectable values and visible labels.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Currently selected option value (controlled usage).</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td>
                <span className="docs-prop-type">
                  (event: ChangeEvent&lt;HTMLSelectElement&gt;) =&gt; void
                </span>
              </td>
              <td>-</td>
              <td>Called when users select a new value.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">label</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Optional field label rendered above the control.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">placeholder</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'Select...'</td>
              <td>Shown when no option is currently selected.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Error message shown below the control in red.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">helperText</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>
                Supporting text shown when <code>error</code> is not set.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">bgClassName</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl'</td>
              <td>Background classes for trigger and dropdown menu surface.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">...SelectHTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTML props</span>
              </td>
              <td>-</td>
              <td>
                Supports native props like <code>name</code>,
                <code>disabled</code>, and <code>required</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Switch", route: "/ui-basics/switch" }}
        next={{ label: "Textarea", route: "/ui-basics/textarea" }}
      />
    </section>
  );
};

export default SelectDoc;
