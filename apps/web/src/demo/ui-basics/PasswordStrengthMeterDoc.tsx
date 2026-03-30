import { Input, PasswordStrengthMeter } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';
import { useState } from 'react';

const PasswordStrengthMeterDoc = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Password Strength Meter</h1>
      <p className="docs-paragraph">
        PasswordStrengthMeter evaluates password quality against practical
        criteria and gives immediate feedback while users are setting
        credentials.
      </p>

      <h2 className="docs-category-subtitle">Interactive Example</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Enter Password"
            placeholder="Type a new password"
          />
          <PasswordStrengthMeter password={password} />
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            Tip: include upper/lower case, numbers, and symbols for a stronger
            score.
          </p>
        </div>
      </div>

      <CodeBlock
        code={`import { Input, PasswordStrengthMeter } from 'erp-pro-ui';
import { useState } from 'react';

const MyForm = () => {
  const [password, setPassword] = useState('');

  return (
    <div>
      <Input
        type="password" 
        label="Enter Password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordStrengthMeter password={password} />
    </div>
  );
};`}
      />

      <h2 className="docs-category-subtitle">Sign-Up Flow Pattern</h2>
      <p className="docs-paragraph mb-4">
        Pair the meter with a confirmation field so users can see quality and
        match state in the same step.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full max-w-3xl gap-4 rounded-2xl border border-neutral-200 bg-white p-8 md:grid-cols-2 dark:border-neutral-800 dark:bg-neutral-900">
          <div>
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
            <PasswordStrengthMeter password={password} />
          </div>

          <div>
            <Input
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              helperText="Keep both fields aligned before submitting the form."
            />
          </div>
        </div>
      </div>

      <CodeBlock
        code={`<Input type="password" label="Password" value={password} onChange={...} />
<PasswordStrengthMeter password={password} />
<Input type="password" label="Confirm Password" value={confirmPassword} onChange={...} />`}
      />

      <h2 className="docs-category-subtitle">Security Criteria</h2>
      <p className="docs-paragraph">The meter evaluates the following rules:</p>
      <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-400 mb-8">
        <li>
          <strong>Minimum Length:</strong> At least 6 characters.
        </li>
        <li>
          <strong>Mixed Case:</strong> Contains both uppercase and lowercase
          letters.
        </li>
        <li>
          <strong>Numbers:</strong> Contains at least one numeric digit.
        </li>
        <li>
          <strong>Special Characters:</strong> Contains symbols (e.g., !, @, #,
          $).
        </li>
      </ul>

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
              <td className="docs-prop-name">password</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Password value to score and visualize in real time</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{
          label: 'Button Hover Border',
          route: '/ui-basics/button-hover-border-gradient',
        }}
        next={{
          label: 'Sun To Moon Button',
          route: '/ui-basics/sun-to-moon-button',
        }}
      />
    </section>
  );
};

export default PasswordStrengthMeterDoc;
