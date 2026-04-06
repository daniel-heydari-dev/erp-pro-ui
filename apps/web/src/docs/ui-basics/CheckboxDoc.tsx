import { useState } from "react";
import { Checkbox } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const CheckboxDoc = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [notifications, setNotifications] = useState<string[]>(["email"]);

  const toggleChannel = (channel: string, nextChecked: boolean) => {
    setNotifications((previous) => {
      if (nextChecked) {
        return previous.includes(channel) ? previous : [...previous, channel];
      }
      return previous.filter((item) => item !== channel);
    });
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Checkbox</h1>
      <p className="docs-paragraph">
        Checkbox is used for yes/no choices and multi-select lists where users
        can enable more than one option at a time.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Checkbox
          id="terms-checkbox"
          label="Accept terms and conditions"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.target.checked)}
        />
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Checkbox } from 'erp-pro-ui';

export function TermsCheckboxExample() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={acceptedTerms}
      onChange={(event) => setAcceptedTerms(event.target.checked)}
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Multi-Select Pattern</h2>
      <p className="docs-paragraph">
        Use multiple checkboxes with a shared state array for preference and
        permissions screens.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-md space-y-2">
          <Checkbox
            label="Email updates"
            checked={notifications.includes("email")}
            onChange={(event) => toggleChannel("email", event.target.checked)}
          />
          <Checkbox
            label="SMS alerts"
            checked={notifications.includes("sms")}
            onChange={(event) => toggleChannel("sms", event.target.checked)}
          />
          <Checkbox
            label="Push notifications"
            checked={notifications.includes("push")}
            onChange={(event) => toggleChannel("push", event.target.checked)}
          />
          <p className="pt-2 text-xs text-neutral-500 dark:text-neutral-400">
            Selected channels:{" "}
            {notifications.length ? notifications.join(", ") : "none"}
          </p>
        </div>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Checkbox } from 'erp-pro-ui';

export function NotificationCheckboxesExample() {
  const [channels, setChannels] = useState<string[]>(['email']);

  const toggleChannel = (channel: string, nextChecked: boolean) => {
    setChannels((previous) => {
      if (nextChecked) {
        return previous.includes(channel) ? previous : [...previous, channel];
      }

      return previous.filter((value) => value !== channel);
    });
  };

  return (
    <div className="space-y-2">
      <Checkbox
        label="Email updates"
        checked={channels.includes('email')}
        onChange={(event) => toggleChannel('email', event.target.checked)}
      />
      <Checkbox
        label="SMS alerts"
        checked={channels.includes('sms')}
        onChange={(event) => toggleChannel('sms', event.target.checked)}
      />
      <Checkbox
        label="Push notifications"
        checked={channels.includes('push')}
        onChange={(event) => toggleChannel('push', event.target.checked)}
      />
    </div>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Colors and States</h2>
      <p className="docs-paragraph">
        Choose semantic color variants for intent, and use <code>error</code> or{" "}
        <code>disabled</code> for user feedback. Required validation renders a
        red outline and red helper copy beneath the control.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Checkbox label="Primary" color="primary" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Success" color="green" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Warning" color="yellow" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Custom hex color" color="#7c3aed" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Checkbox
            label="Error state"
            error="Permission required"
            color="red"
          />
        </div>
        <div className="docs-showcase-card">
          <Checkbox label="Disabled" disabled />
        </div>
      </div>

      <CodeBlock
        code={`import { Checkbox } from 'erp-pro-ui';

export function CheckboxValidationAndStatesExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Checkbox label="Primary" color="primary" defaultChecked />
      <Checkbox label="Success" color="green" defaultChecked />
      <Checkbox label="Custom" color="#7c3aed" defaultChecked />
      <Checkbox
        label="I agree to the privacy policy"
        error="You must agree before continuing."
        color="red"
      />
      <Checkbox label="Disabled" disabled />
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
              <td>Optional text rendered beside the checkbox control.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">checked</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>-</td>
              <td>Controlled selection state.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">defaultChecked</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>-</td>
              <td>Initial value when used in uncontrolled mode.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">color</td>
              <td>
                <span className="docs-prop-type">
                  'red' | 'blue' | 'green' | 'yellow' | 'teal' | 'primary' |
                  string
                </span>
              </td>
              <td>'primary'</td>
              <td>Checked-state color token or any custom color value.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Error message displayed beside the control.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">extra</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Additional class names applied to the input element.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">...InputHTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTML props</span>
              </td>
              <td>-</td>
              <td>
                Supports native props like <code>name</code>,{" "}
                <code>disabled</code>, <code>required</code>, and{" "}
                <code>onChange</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Input", route: "/ui-basics/input" }}
        next={{ label: "Radio", route: "/ui-basics/radio" }}
      />
    </section>
  );
};

export default CheckboxDoc;
