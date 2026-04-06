import type { ChangeEvent } from "react";
import { useState } from "react";
import { Textarea } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const TextareaDoc = () => {
  const [message, setMessage] = useState("");
  const [bio, setBio] = useState("");

  const messageLimit = 180;
  const messageTooShort =
    message.trim().length > 0 && message.trim().length < 20;

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value.slice(0, messageLimit));
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Textarea</h1>
      <p className="docs-paragraph">
        Textarea captures multi-line input such as support tickets, profile
        bios, and release notes while keeping label, helper text, and validation
        patterns consistent.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-xl">
          <Textarea
            label="Internal note"
            placeholder="Add context for the next teammate..."
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            helperText="This note is visible to workspace collaborators."
          />
        </div>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Textarea } from 'erp-pro-ui';

export function InternalNoteTextarea() {
  const [bio, setBio] = useState('');

  return (
    <Textarea
      label="Internal note"
      placeholder="Add context for the next teammate..."
      value={bio}
      onChange={(event) => setBio(event.target.value)}
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">
        Validation and Character Limits
      </h2>
      <p className="docs-paragraph">
        For support and feedback forms, combine controlled state with helper
        text and inline validation feedback.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-xl space-y-2">
          <Textarea
            label="Support request"
            placeholder="Describe what happened and what you expected."
            value={message}
            onChange={handleMessageChange}
            error={
              messageTooShort ? "Please add at least 20 characters." : undefined
            }
            helperText={`${message.length}/${messageLimit} characters`}
          />
        </div>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Textarea } from 'erp-pro-ui';

export function SupportRequestTextarea() {
  const [message, setMessage] = useState('');
  const limit = 180;
  const tooShort = message.trim().length > 0 && message.trim().length < 20;

  return (
    <Textarea
      value={message}
      onChange={(event) => setMessage(event.target.value.slice(0, limit))}
      error={tooShort ? 'Please add at least 20 characters.' : undefined}
      helperText={String(message.length) + '/' + String(limit) + ' characters'}
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Common States</h2>
      <p className="docs-paragraph">
        The component supports disabled fields, static helper guidance, and
        error messaging through simple props.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Textarea
            label="Error State"
            placeholder="Explain the issue"
            error="This field is required"
          />
        </div>
        <div className="docs-showcase-card">
          <Textarea
            label="Disabled"
            placeholder="Cannot edit"
            disabled
            value="Current deployment note is locked."
            onChange={() => {}}
          />
        </div>
        <div className="docs-showcase-card">
          <Textarea
            label="Helper Text"
            placeholder="Add migration notes"
            helperText="Markdown is supported for formatting."
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Textarea } from 'erp-pro-ui';

export function TextareaStates() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Textarea label="Error State" error="This field is required" />
      <Textarea label="Disabled" disabled value="Locked note" onChange={() => undefined} />
      <Textarea label="Helper Text" helperText="Markdown is supported" />
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
              <td>Optional field label rendered above the textarea.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Error message shown below the textarea in red.</td>
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
              <td className="docs-prop-name">value</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Controlled field value for form-driven usage.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td>
                <span className="docs-prop-type">
                  (event: ChangeEvent&lt;HTMLTextAreaElement&gt;) =&gt; void
                </span>
              </td>
              <td>-</td>
              <td>Triggered when users type or edit text.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">...TextareaHTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTML props</span>
              </td>
              <td>-</td>
              <td>
                Supports native props like <code>placeholder</code>,
                <code>disabled</code>, <code>rows</code>,<code>maxLength</code>,
                and <code>name</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Select", route: "/ui-basics/select" }}
        next={{ label: "Label", route: "/ui-basics/label" }}
      />
    </section>
  );
};

export default TextareaDoc;
