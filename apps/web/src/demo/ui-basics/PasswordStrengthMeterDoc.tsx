import { PasswordStrengthMeter } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';
import { useState } from 'react';

const PasswordStrengthMeterDoc = () => {
  const [password, setPassword] = useState('');

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Password Strength Meter</h1>
      <p className="docs-paragraph">
        An interactive component that assesses and visualizes the strength of a user's password based on length, case, numbers, and special characters.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Interactive Example</h2>
      <div className="docs-showcase-card h-auto p-8 flex flex-col gap-6 max-w-md mx-auto">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Enter Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="Type something..."
          />
        </div>

        <PasswordStrengthMeter password={password} />
      </div>

      <CodeBlock code={`import { PasswordStrengthMeter } from 'erp-pro-ui';
import { useState } from 'react';

const MyForm = () => {
  const [password, setPassword] = useState('');

  return (
    <div>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <PasswordStrengthMeter password={password} />
    </div>
  );
};`} />

      {/* Criteria Breakdown */}
      <h2 className="docs-category-subtitle">Security Criteria</h2>
      <p className="docs-paragraph">
        The meter evaluates the following rules:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-400 mb-8">
        <li><strong>Minimum Length:</strong> At least 6 characters.</li>
        <li><strong>Mixed Case:</strong> Contains both uppercase and lowercase letters.</li>
        <li><strong>Numbers:</strong> Contains at least one numeric digit.</li>
        <li><strong>Special Characters:</strong> Contains symbols (e.g., !, @, #, $).</li>
      </ul>

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
              <td className="docs-prop-name">password</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>The password string to evaluate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Button Hover Border', route: '/ui-basics/button-hover-border-gradient' }}
        next={{ label: 'Sun To Moon Button', route: '/ui-basics/sun-to-moon-button' }}
      />
    </section>
  );
};

export default PasswordStrengthMeterDoc;
