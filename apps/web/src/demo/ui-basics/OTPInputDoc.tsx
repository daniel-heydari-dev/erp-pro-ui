import { useState } from 'react';
import { OTPInput } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const OTPInputDoc = () => {
  const [otp, setOtp] = useState('');

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">OTP Input</h1>
      <p className="docs-paragraph">
        A specialized input component for entering one-time passwords, verification codes, or PINs.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="flex flex-col items-center gap-4">
          <OTPInput
            length={6}
            value={otp}
            onChange={setOtp}
            autoFocus
          />
          <p className="text-sm text-neutral-500">
            Entered Code: <span className="font-mono font-bold text-primary">{otp || '------'}</span>
          </p>
        </div>
      </div>

      <CodeBlock code={`import { OTPInput } from 'erp-pro-ui';
import { useState } from 'react';

const Example = () => {
  const [value, setValue] = useState('');
  
  return (
    <OTPInput 
      length={6} 
      value={value} 
      onChange={setValue} 
      autoFocus 
    />
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
              <td className="docs-prop-name">length</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>6</td>
              <td>Number of input fields/digits</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Current value of the input</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">{"(value: string) => void"}</span></td>
              <td>-</td>
              <td>Callback when value changes</td>
            </tr>
            <tr>
              <td className="docs-prop-name">autoFocus</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Focus the first field automatically on mount</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Disable all input fields</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'DatePicker', route: '/ui-basics/datepicker' }}
        next={{ label: 'Form', route: '/ui-basics/form' }}
      />
    </section>
  );
};

export default OTPInputDoc;
