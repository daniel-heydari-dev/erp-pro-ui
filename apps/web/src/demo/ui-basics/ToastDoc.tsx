import { Button, useToast, ToastProvider } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const ToastDoc = () => {
  const { toast, success, error, warning, info, loading, promise } = useToast();

  const handlePromise = () => {
    const myPromise = new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({ name: 'Success Data' });
        } else {
          reject(new Error('Failed to fetch'));
        }
      }, 2000);
    });

    promise(myPromise, {
      loading: 'Loading data...',
      success: (data) => `Successfully loaded ${data.name}`,
      error: 'Error loading data',
    });
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Toast</h1>
      <p className="docs-paragraph">
        Global notification system for feedback. Requires the app to be wrapped in <code>ToastProvider</code>.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Button
          label="Show Toast"
          onClick={() => toast({ title: 'Notification', description: 'This is a basic toast message.' })}
        />
      </div>

      <CodeBlock code={`import { useToast } from 'erp-pro-ui';

const Component = () => {
  const { toast } = useToast();

  return (
    <Button 
      label="Show Toast" 
      onClick={() => toast({ title: 'Notification', description: 'Hello World' })} 
    />
  );
};`} />

      {/* Variants Section */}
      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        Type-safe helpers for common scenarios.
      </p>

      <div className="docs-showcase-card flex-wrap gap-4">
        <Button label="Success" onClick={() => success({ title: 'Success', description: 'Operation completed successfully.' })} />
        <Button label="Error" onClick={() => error({ title: 'Error', description: 'Something went wrong.' })} />
        <Button label="Warning" onClick={() => warning({ title: 'Warning', description: 'Please review your input.' })} />
        <Button label="Info" onClick={() => info({ title: 'Info', description: 'New updates available.' })} />
      </div>

      <CodeBlock code={`const { success, error, warning, info } = useToast();

<Button onClick={() => success({ title: 'Success', description: '...' })} />
<Button onClick={() => error({ title: 'Error', description: '...' })} />`} />

      {/* Promise Section */}
      <h2 className="docs-category-subtitle">Promise Handling</h2>
      <p className="docs-paragraph">
        Automatically handle promise states (loading, success, error).
      </p>

      <div className="docs-showcase-card">
        <Button label="Trigger Async Action" primary onClick={handlePromise} />
      </div>

      <CodeBlock code={`const { promise } = useToast();

promise(myPromise, {
  loading: 'Loading data...',
  success: (data) => \`Loaded \${data.name}\`,
  error: 'Error loading data',
});`} />

      {/* Positions Section */}
      <h2 className="docs-category-subtitle">Positions</h2>
      <p className="docs-paragraph">
        Toasts can be positioned at any corner or center edge.
        <br />
        <span className="text-sm text-neutral-500">
          (Note: These examples use nested providers to demonstrate positioning. In a real app, you configure this once at the root.)
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

      <CodeBlock code={`// In App.tsx
<ToastProvider position="top-right">
  <App />
</ToastProvider>`} />

      <DocsButtonBar
        prev={{ label: 'Alert', route: '/ui-basics/alert' }}
        next={{ label: 'Tooltip', route: '/ui-basics/tooltip' }}
      />
    </section>
  );
};

// Helper component to isolate useToast context for position demos
const PositionDemo = ({ label, position }: { label: string, position: string }) => {
  const { toast } = useToast();
  return (
    <Button
      label={label}
      size="small"
      onClick={() => toast({ title: position, description: `This toast is positioned at ${position}` })}
    />
  );
};

export default ToastDoc;
