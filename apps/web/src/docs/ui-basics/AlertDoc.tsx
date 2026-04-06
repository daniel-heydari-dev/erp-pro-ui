import { useState } from "react";
import { Alert, Button, CloseIcon } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const AlertDoc = () => {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Alert</h1>
      <p className="docs-paragraph">
        Alert is a compact status surface for high-signal messages such as
        validation issues, successful submissions, maintenance notices, and
        destructive warnings.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl">
          <Alert
            title="Heads up"
            description="Branch synchronization will pause for approximately 5 minutes during the scheduled migration window."
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Alert } from 'erp-pro-ui';

export function MaintenanceNoticeAlert() {
  return (
    <Alert
      title="Heads up"
      description="Branch synchronization will pause during the migration window."
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        Use semantic variants to help users scan message severity quickly.
      </p>

      <div className="docs-showcase-card flex-col gap-4">
        <Alert
          variant="info"
          title="Info"
          description="A new software update is available."
        />
        <Alert
          variant="success"
          title="Success"
          description="Your changes have been saved successfully."
        />
        <Alert
          variant="warning"
          title="Warning"
          description="Your account is about to expire."
        />
        <Alert
          variant="destructive"
          title="Error"
          description="Failed to connect to the server."
        />
      </div>

      <CodeBlock
        code={`import { Alert } from 'erp-pro-ui';

export function AlertVariantsExample() {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="info" title="Info" description="A new software update is available." />
      <Alert variant="success" title="Success" description="Your changes have been saved successfully." />
      <Alert variant="warning" title="Warning" description="Your account is about to expire." />
      <Alert variant="destructive" title="Error" description="Failed to connect to the server." />
    </div>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Actionable Content</h2>
      <p className="docs-paragraph">
        The component accepts children, so you can include links or follow-up
        actions without building a custom wrapper.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl">
          <Alert
            variant="warning"
            title="Reconciliation mismatch detected"
            description="Three warehouse transfers are missing receiving confirmations."
          >
            <div className="mt-3 flex gap-2">
              <Button label="Review queue" size="small" primary />
              <Button label="Dismiss" size="small" />
            </div>
          </Alert>
        </div>
      </div>

      <CodeBlock
        code={`import { Alert, Button } from 'erp-pro-ui';

export function ActionableAlertExample() {
  return (
    <Alert
      variant="warning"
      title="Reconciliation mismatch detected"
      description="Three warehouse transfers are missing receiving confirmations."
    >
      <div className="mt-3 flex gap-2">
        <Button label="Review queue" size="small" primary />
        <Button label="Dismiss" size="small" />
      </div>
    </Alert>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Dismissible Pattern</h2>
      <p className="docs-paragraph">
        Alerts are intentionally static by default. Use local state to hide them
        when users dismiss non-blocking messages.
      </p>

      <div className="docs-showcase-card">
        {!showDismissible ? (
          <Button
            label="Show Alert Again"
            onClick={() => setShowDismissible(true)}
          />
        ) : (
          <div className="relative w-full max-w-3xl">
            <Alert
              variant="info"
              title="New receiving flow available"
              description="You can now bulk-confirm ASN receipts directly from the inbound table."
            />
            <Button
              onClick={() => setShowDismissible(false)}
              aria-label="Dismiss alert"
              className="absolute top-4 right-4 h-8 w-8 border-none bg-transparent px-0 py-0 text-neutral-500 shadow-none hover:bg-transparent hover:text-neutral-900 hover:opacity-100 dark:hover:text-white"
            >
              <CloseIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Alert, Button, CloseIcon } from 'erp-pro-ui';

export function DismissibleAlertExample() {
  const [show, setShow] = useState(true);

  if (!show) {
    return <Button label="Show Alert Again" onClick={() => setShow(true)} />;
  }

  return (
    <div className="relative max-w-3xl">
      <Alert
        variant="info"
        title="New receiving flow available"
        description="You can now bulk-confirm ASN receipts directly from the inbound table."
      />
      <Button
        aria-label="Dismiss alert"
        onClick={() => setShow(false)}
        className="absolute top-4 right-4 h-8 w-8 border-none bg-transparent px-0 py-0 shadow-none"
      >
        <CloseIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
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
              <td className="docs-prop-name">title</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Primary heading displayed at the top of the alert body</td>
            </tr>
            <tr>
              <td className="docs-prop-name">description</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Supporting message shown under the title</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td>
                <span className="docs-prop-type">
                  'info' | 'success' | 'warning' | 'destructive'
                </span>
              </td>
              <td>'info'</td>
              <td>Controls visual severity styling and semantics</td>
            </tr>
            <tr>
              <td className="docs-prop-name">icon</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Optional icon override for custom status presentation</td>
            </tr>
            <tr>
              <td className="docs-prop-name">children</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Extra inline content such as actions, links, or hints</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>''</td>
              <td>Additional classes applied to the root alert container</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Drawer", route: "/ui-basics/drawer" }}
        next={{ label: "Toast", route: "/ui-basics/toast" }}
      />
    </section>
  );
};

export default AlertDoc;
