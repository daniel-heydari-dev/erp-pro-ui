import type { ChangeEvent } from "react";
import { useState } from "react";
import { Input, InputState } from "erp-pro-ui";
import { FiSearch, FiMail, FiLock } from "react-icons/fi";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const InputDoc = () => {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");

  const emailLooksInvalid = email.length > 0 && !email.includes("@");

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Input</h1>
      <p className="docs-paragraph">
        Input is a styled text field for search, authentication, profile forms,
        and settings pages. It supports validation states, helper messaging, and
        optional right-side icons.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-md">
          <Input
            label="Search tickets"
            placeholder="Find by ticket ID, title, or owner"
            value={query}
            onChange={handleQueryChange}
            helperText="Search runs client-side as you type."
            icon={<FiSearch size={18} className="text-ds-2" />}
          />
        </div>
      </div>

      <CodeBlock
        code={`import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Input } from 'erp-pro-ui';

export function SearchInputExample() {
  const [query, setQuery] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Input
      label="Search tickets"
      placeholder="Find by ticket ID, title, or owner"
      value={query}
      onChange={handleChange}
      helperText="Search runs client-side as you type."
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Validation States</h2>
      <p className="docs-paragraph">
        Use <code>state</code> with <code>error</code> or <code>message</code>{" "}
        to communicate field status clearly while preserving layout.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Input
            label="Work email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            state={InputState.ERROR}
            error={
              emailLooksInvalid
                ? "Use a valid company email address."
                : undefined
            }
          />
        </div>
        <div className="docs-showcase-card">
          <Input
            label="Environment name"
            placeholder="production"
            state={InputState.SUCCESS}
            message="Environment is available."
          />
        </div>
        <div className="docs-showcase-card">
          <Input
            label="Workspace slug"
            placeholder="locked-workspace"
            disabled
            helperText="Slug updates are restricted after first deployment."
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Input, InputState } from 'erp-pro-ui';

export function InputValidationStates() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        label="Work email"
        state={InputState.ERROR}
        error="Use a valid company email address."
      />
      <Input
        label="Environment name"
        state={InputState.SUCCESS}
        message="Environment is available."
      />
      <Input
        label="Workspace slug"
        disabled
        helperText="Slug updates are restricted."
      />
    </div>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Common Field Patterns</h2>
      <p className="docs-paragraph">
        Add icons for quick context and use <code>bgClassName</code> for
        alternate surfaces such as dark command bars.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Input
            label="Search"
            placeholder="Search projects"
            icon={<FiSearch size={18} className="text-ds-2" />}
          />
        </div>
        <div className="docs-showcase-card">
          <Input
            label="Email"
            placeholder="Email address"
            type="email"
            icon={<FiMail size={18} className="text-ds-2" />}
          />
        </div>
        <div className="docs-showcase-card">
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            icon={<FiLock size={18} className="text-ds-2" />}
            bgClassName="bg-neutral-100 dark:bg-neutral-800"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Input } from 'erp-pro-ui';

export function CommonInputPatterns() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        label="Search"
        placeholder="Search projects"
        icon={<span aria-hidden>...</span>}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email address"
        icon={<span aria-hidden>@</span>}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        bgClassName="bg-neutral-100 dark:bg-neutral-800"
      />
    </div>
  );
}`}
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
              <td>Optional field label rendered above the input control.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">state</td>
              <td>
                <span className="docs-prop-type">InputState</span>
              </td>
              <td>InputState.DEFAULT</td>
              <td>
                Visual state selector: <code>DEFAULT</code>,<code>ERROR</code>,{" "}
                <code>SUCCESS</code>, or
                <code>DISABLED</code>.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Error message shown below the field.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">message</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Non-error status text such as success confirmation.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">helperText</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>
                Helper text shown when <code>error</code> and{" "}
                <code>message</code> are empty.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">icon</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Optional right-side icon element.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">bgClassName</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'bg-secondary'</td>
              <td>Custom background classes for the input surface.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">...InputHTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTML props</span>
              </td>
              <td>-</td>
              <td>
                Supports native props such as <code>value</code>,{" "}
                <code>onChange</code>, <code>type</code>, <code>name</code>, and{" "}
                <code>disabled</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Button", route: "/ui-basics/button" }}
        next={{ label: "Checkbox", route: "/ui-basics/checkbox" }}
      />
    </section>
  );
};

export default InputDoc;
