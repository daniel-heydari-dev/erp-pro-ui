import { Form, Input, Button } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const FormDoc = () => {
  const handleSubmit = (data: any) => {
    alert(`Form submitted: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Form</h1>
      <p className="docs-paragraph">
        A container for grouping related inputs with support for validation and submission handling.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-sm">
          <Form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              placeholder="name@example.com"
              name="email"
              type="email"
              required
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              required
            />
            <div className="pt-2">
              <Button primary type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <CodeBlock code={`import { Form, Input, Button } from '@erp-pro/ui';

const Example = () => {
  const handleSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Email" name="email" type="email" required />
      <Input label="Password" name="password" type="password" required />
      <Button primary type="submit">Submit</Button>
    </Form>
  );
};`} />

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
              <td className="docs-prop-name">onSubmit</td>
              <td><span className="docs-prop-type">{"(data: any) => void"}</span></td>
              <td>-</td>
              <td>Handler for form submission with aggregated field data</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Custom CSS classes for the form element</td>
            </tr>
            <tr>
              <td className="docs-prop-name">children</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>Form content (inputs, buttons, labels)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'OTPInput', route: '/ui-basics/otpinput' }}
        next={{ label: 'DataTable', route: '/ui-basics/datatable' }}
      />
    </section>
  );
};

export default FormDoc;
