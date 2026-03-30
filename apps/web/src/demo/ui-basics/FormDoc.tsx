import { Form, Input, Button } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';
import { useState } from 'react';

const FormDoc = () => {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
    setSubmitted(payload);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Form</h1>
      <p className="docs-paragraph">
        Form is a styled wrapper for grouped inputs and submission controls. It behaves like a
        standard HTML form and works with native submit handling patterns.
      </p>

      <h2 className="docs-category-subtitle">Basic Login Form</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-md space-y-4">
          <Form
            title="Sign in"
            description="Use your workspace credentials to continue."
            onSubmit={handleSubmit}
            className="space-y-4"
          >
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

          {submitted && (
            <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
              <p className="font-medium text-neutral-900 dark:text-white">Captured form data</p>
              <pre className="mt-2 overflow-auto rounded bg-neutral-100 p-3 text-xs dark:bg-neutral-800">
                {JSON.stringify(submitted, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <CodeBlock code={`import { Form, Input, Button } from 'erp-pro-ui';
import { useState } from 'react';

const Example = () => {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    setSubmitted(payload as Record<string, string>);
  };

  return (
    <Form title="Sign in" onSubmit={handleSubmit} className="space-y-4">
      <Input label="Email" name="email" type="email" required />
      <Input label="Password" name="password" type="password" required />
      <Button primary type="submit">Submit</Button>
    </Form>
  );
};`} />

      <h2 className="docs-category-subtitle">Profile Update Pattern</h2>
      <p className="docs-paragraph mb-4">
        Use the built-in title and description for section framing, then group inputs by intent so
        users can scan settings quickly.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl">
          <Form
            title="Profile settings"
            description="Update account identity and contact preferences."
            className="space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="First name" name="firstName" placeholder="Avery" required />
              <Input label="Last name" name="lastName" placeholder="Johnson" required />
            </div>
            <Input label="Work email" name="workEmail" type="email" placeholder="avery@company.com" required />
            <Input label="Phone" name="phone" placeholder="+1 (555) 123-0000" />

            <div className="flex justify-end gap-2">
              <Button label="Cancel" />
              <Button label="Save profile" primary type="submit" />
            </div>
          </Form>
        </div>
      </div>

      <CodeBlock code={`<Form
  title="Profile settings"
  description="Update account identity and contact preferences."
  onSubmit={(event) => event.preventDefault()}
>
  <Input label="First name" name="firstName" required />
  <Input label="Last name" name="lastName" required />
  <Input label="Work email" name="workEmail" type="email" required />
  <Button type="submit" label="Save profile" primary />
</Form>`} />

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
              <td className="docs-prop-name">onSubmit</td>
              <td><span className="docs-prop-type">FormEventHandler&lt;HTMLFormElement&gt;</span></td>
              <td>-</td>
              <td>Native submit handler. Use FormData to extract values from named fields.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>''</td>
              <td>Additional classes applied to the form container</td>
            </tr>
            <tr>
              <td className="docs-prop-name">children</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>Inputs, controls, and action buttons rendered inside the form</td>
            </tr>
            <tr>
              <td className="docs-prop-name">title</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Optional heading rendered at the top of the form surface</td>
            </tr>
            <tr>
              <td className="docs-prop-name">description</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Optional supporting text displayed under the form title</td>
            </tr>
            <tr>
              <td className="docs-prop-name">gap</td>
              <td><span className="docs-prop-type">'sm' | 'md' | 'lg'</span></td>
              <td>'lg'</td>
              <td>Vertical spacing preset used between top-level form sections</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'OTPInput', route: '/ui-basics/otpinput' }}
        next={{ label: 'DataTable', route: '/ui-basics/data-table' }}
      />
    </section>
  );
};

export default FormDoc;
