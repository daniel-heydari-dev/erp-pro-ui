import { Button, useToast, ToastProvider } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const ToastDoc = () => {
  const { toast, success, error, warning, info, loading, promise } = useToast();

  const handlePromise = () => {
    const myPromise = new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({ name: "Success Data" });
        } else {
          reject(new Error("Failed to fetch"));
        }
      }, 2000);
    });

    promise(myPromise, {
      loading: "Loading data...",
      success: (data: { name: string }) => `Successfully loaded ${data.name}`,
      error: "Error loading data",
    });
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Toast</h1>
      <p className="docs-paragraph">
        Toast provides global, non-blocking feedback for async actions, form
        submissions, and system events. It requires the app to be wrapped in{" "}
        <code>ToastProvider</code>.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="flex flex-wrap gap-3">
          <Button
            label="Show Toast"
            onClick={() =>
              toast({
                title: "Notification",
                description: "This is a basic toast message.",
              })
            }
          />
          <Button
            label="Loading Toast"
            onClick={() =>
              loading({
                title: "Syncing",
                description: "Uploading 12 inventory changes...",
              })
            }
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Button, useToast } from 'erp-pro-ui';

const Component = () => {
  const { toast } = useToast();

  return (
    <Button 
      label="Show Toast" 
      onClick={() => toast({ title: 'Notification', description: 'Hello World' })} 
    />
  );
};`}
      />

      <h2 className="docs-category-subtitle">Provider Setup</h2>
      <p className="docs-paragraph">
        Mount the provider once near the app root and keep usage calls inside
        descendants.
      </p>

      <CodeBlock
        code={`import { ToastProvider } from 'erp-pro-ui';

export function AppRoot() {
  return (
    <ToastProvider position="top-right" duration={4000} maxToasts={4}>
      <App />
    </ToastProvider>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">Type-safe helpers for common scenarios.</p>

      <div className="docs-showcase-card flex-wrap gap-4">
        <Button
          label="Success"
          onClick={() =>
            success({
              title: "Success",
              description: "Operation completed successfully.",
            })
          }
        />
        <Button
          label="Error"
          onClick={() =>
            error({ title: "Error", description: "Something went wrong." })
          }
        />
        <Button
          label="Warning"
          onClick={() =>
            warning({
              title: "Warning",
              description: "Please review your input.",
            })
          }
        />
        <Button
          label="Info"
          onClick={() =>
            info({ title: "Info", description: "New updates available." })
          }
        />
      </div>

      <CodeBlock
        code={`import { Button, useToast } from 'erp-pro-ui';

export function ToastVariants() {
  const { success, error, warning, info } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button label="Success" onClick={() => success({ title: 'Success', description: 'Operation completed successfully.' })} />
      <Button label="Error" onClick={() => error({ title: 'Error', description: 'Something went wrong.' })} />
      <Button label="Warning" onClick={() => warning({ title: 'Warning', description: 'Please review your input.' })} />
      <Button label="Info" onClick={() => info({ title: 'Info', description: 'New updates available.' })} />
    </div>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Promise Handling</h2>
      <p className="docs-paragraph">
        Automatically handle promise states (loading, success, error).
      </p>

      <div className="docs-showcase-card">
        <Button label="Trigger Async Action" primary onClick={handlePromise} />
      </div>

      <CodeBlock
        code={`import { Button, useToast } from 'erp-pro-ui';

export function PromiseToastDemo() {
  const { promise } = useToast();

  return (
    <Button
      label="Trigger async action"
      primary
      onClick={() => {
        const task = new Promise<{ name: string }>((resolve) => {
          window.setTimeout(() => resolve({ name: 'Success Data' }), 2000);
        });

        void promise(task, {
          loading: 'Loading data...',
          success: (data) => 'Loaded ' + data.name,
          error: 'Error loading data',
        }).catch(() => undefined);
      }}
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Positions</h2>
      <p className="docs-paragraph">
        Toasts can be positioned at any corner or center edge.
        <br />
        <span className="text-sm text-neutral-500">
          (Note: These examples use nested providers to demonstrate positioning.
          In a real app, you configure this once at the root.)
        </span>
      </p>

      <div className="docs-showcase-card">
        <div className="grid grid-cols-3 gap-4">
          <ToastProvider position="top-left">
            <PositionDemo label="Top Left" position="top-left" />
          </ToastProvider>
          <ToastProvider position="top-center">
            <PositionDemo label="Top Center" position="top-center" />
          </ToastProvider>
          <ToastProvider position="top-right">
            <PositionDemo label="Top Right" position="top-right" />
          </ToastProvider>
          <ToastProvider position="bottom-left">
            <PositionDemo label="Bot Left" position="bottom-left" />
          </ToastProvider>
          <ToastProvider position="bottom-center">
            <PositionDemo label="Bot Center" position="bottom-center" />
          </ToastProvider>
          <ToastProvider position="bottom-right">
            <PositionDemo label="Bot Right" position="bottom-right" />
          </ToastProvider>
        </div>
      </div>

      <CodeBlock
        code={`import { ToastProvider, type ToastPosition } from 'erp-pro-ui';

const position: ToastPosition = 'top-right';

export function AppRoot() {
  return (
    <ToastProvider position={position}>
      <App />
    </ToastProvider>
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
              <td className="docs-prop-name">position</td>
              <td>
                <span className="docs-prop-type">
                  'top-left' | 'top-center' | 'top-right' | 'bottom-left' |
                  'bottom-center' | 'bottom-right'
                </span>
              </td>
              <td>'top-right'</td>
              <td>Default placement for toast stack in the viewport</td>
            </tr>
            <tr>
              <td className="docs-prop-name">duration</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>4000</td>
              <td>
                Auto-dismiss duration in milliseconds for non-loading toasts
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">maxToasts</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>5</td>
              <td>Maximum visible toasts before older items are removed</td>
            </tr>
            <tr>
              <td className="docs-prop-name">dismissible</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Whether toasts show a close control by default</td>
            </tr>
            <tr>
              <td className="docs-prop-name">containerClassName</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>''</td>
              <td>Additional classes for the toast container wrapper</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Alert", route: "/ui-basics/alert" }}
        next={{ label: "Tooltip", route: "/ui-basics/tooltip" }}
      />
    </section>
  );
};

// Helper component to isolate useToast context for position demos
const PositionDemo = ({
  label,
  position,
}: {
  label: string;
  position: string;
}) => {
  const { toast } = useToast();
  return (
    <Button
      label={label}
      size="small"
      onClick={() =>
        toast({
          title: position,
          description: `This toast is positioned at ${position}`,
        })
      }
    />
  );
};

export default ToastDoc;
