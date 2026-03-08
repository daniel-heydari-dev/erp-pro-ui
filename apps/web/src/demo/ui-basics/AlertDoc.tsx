import { useState } from 'react';
import { Button, Alert, type AlertVariant } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const AlertDoc = () => {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Alert</h1>
      <p className="docs-paragraph">
        Displays a callout for user attention. Useful for validation messages or status updates.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Alert
          title="Heads up!"
          description="You can add components to your app using the CLI."
        />
      </div>

      <CodeBlock code={`import { Alert } from 'erp-pro-ui';

<Alert 
  title="Heads up!" 
  description="You can add components to your app using the CLI."
/>`} />

      {/* Variants Section */}
      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        Standard status indicators: <span className="docs-highlight">info</span> (default), <span className="docs-highlight">success</span>, <span className="docs-highlight">warning</span>, and <span className="docs-highlight">destructive</span>.
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

      <CodeBlock code={`<Alert variant="info" title="Info" ... />
<Alert variant="success" title="Success" ... />
<Alert variant="warning" title="Warning" ... />
<Alert variant="destructive" title="Error" ... />`} />

      {/* Dismissible Demo */}
      <h2 className="docs-category-subtitle">Dismissible</h2>
      <p className="docs-paragraph">
        The Alert component is static by default. Wrap it in conditional rendering to make it dismissible.
      </p>

      <div className="docs-showcase-card">
        {!showDismissible ? (
          <Button label="Reset Alert" onClick={() => setShowDismissible(true)} />
        ) : (
          <div className="relative w-full">
            <Alert
              title="Dismissible Alert"
              description="Click the X to close this alert."
            />
            <button
              onClick={() => setShowDismissible(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <CodeBlock code={`const [show, setShow] = useState(true);

{show && (
  <div className="relative">
    <Alert title="Dismissible" description="..." />
    <button onClick={() => setShow(false)} className="absolute top-4 right-4">
      Close
    </button>
  </div>
)}`} />

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
              <td className="docs-prop-name">title</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Alert title</td>
            </tr>
            <tr>
              <td className="docs-prop-name">description</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Alert description</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">'info' | 'success' | 'warning' | 'destructive'</span></td>
              <td>'info'</td>
              <td>Visual style</td>
            </tr>
            <tr>
              <td className="docs-prop-name">icon</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>Custom icon override</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Drawer', route: '/ui-basics/drawer' }}
        next={{ label: 'Toast', route: '/ui-basics/toast' }}
      />
    </section>
  );
};

export default AlertDoc;
