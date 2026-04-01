import { useState } from "react";
import { Button, Switch } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const SwitchDoc = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [publicApiEnabled, setPublicApiEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  const saveSettings = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1200);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Switch</h1>
      <p className="docs-paragraph">
        Switch is a compact on/off control for feature toggles, permission
        gates, and account preferences.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-md space-y-2">
          <Switch
            label="Incident alerts"
            checked={alertsEnabled}
            onChange={(event) => setAlertsEnabled(event.target.checked)}
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Alerts are currently {alertsEnabled ? "enabled" : "disabled"}.
          </p>
        </div>
      </div>

      <CodeBlock
        code={`import { Switch } from 'erp-pro-ui';

const [alertsEnabled, setAlertsEnabled] = useState(true);

<Switch
  label="Incident alerts"
  checked={alertsEnabled}
  onChange={(event) => setAlertsEnabled(event.target.checked)}
/>`}
      />

      <h2 className="docs-category-subtitle">Preference Form Pattern</h2>
      <p className="docs-paragraph">
        Switches are often grouped inside settings cards with a delayed save
        action. This pattern makes state changes explicit.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-md space-y-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <Switch
            label="Public API access"
            checked={publicApiEnabled}
            onChange={(event) => setPublicApiEnabled(event.target.checked)}
          />
          <Button onClick={saveSettings} disabled={saving} primary>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      <CodeBlock
        code={`const [publicApiEnabled, setPublicApiEnabled] = useState(false);

<Switch
  label="Public API access"
  checked={publicApiEnabled}
  onChange={(event) => setPublicApiEnabled(event.target.checked)}
/>`}
      />

      <h2 className="docs-category-subtitle">States</h2>
      <p className="docs-paragraph">
        Use disabled and error messaging for loading and validation scenarios.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Switch label="Default (Off)" />
        </div>
        <div className="docs-showcase-card">
          <Switch label="Default (On)" defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Switch label="Disabled" disabled />
        </div>
        <div className="docs-showcase-card">
          <Switch label="Disabled (On)" disabled defaultChecked />
        </div>
        <div className="docs-showcase-card">
          <Switch label="Error State" error="Failed to sync" />
        </div>
      </div>

      <CodeBlock
        code={`<Switch label="Off" />
<Switch label="On" defaultChecked />
<Switch label="Disabled" disabled />
<Switch label="Error" error="Error message" />`}
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
              <td>Optional text shown next to the switch control.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">checked</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>-</td>
              <td>Controlled on/off value.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">defaultChecked</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>-</td>
              <td>Initial value in uncontrolled mode.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Validation message displayed beside the switch.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">...InputHTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTML props</span>
              </td>
              <td>-</td>
              <td>
                Supports native props such as <code>onChange</code>,{" "}
                <code>name</code>, <code>disabled</code>, and{" "}
                <code>required</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Radio", route: "/ui-basics/radio" }}
        next={{ label: "Select", route: "/ui-basics/select" }}
      />
    </section>
  );
};

export default SwitchDoc;
