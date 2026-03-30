import { useState } from 'react';
import { OTPInput } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const OTPInputDoc = () => {
  const [otp, setOtp] = useState('');
  const [maskedOtp, setMaskedOtp] = useState('');
  const [codeStatus, setCodeStatus] = useState('Waiting for complete code...');

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">OTP Input</h1>
      <p className="docs-paragraph">
        OTPInput is a focused multi-cell input for one-time verification codes,
        PIN confirmation, and step-up authentication screens.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <OTPInput
            length={6}
            value={otp}
            onChange={setOtp}
            autoFocus
            onComplete={(value) => setCodeStatus(`Code complete: ${value}`)}
          />
          <p className="text-sm text-neutral-500">
            Entered Code:{' '}
            <span className="font-mono font-bold text-primary">
              {otp || '------'}
            </span>
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {codeStatus}
          </p>
        </div>
      </div>

      <CodeBlock
        code={`import { OTPInput } from 'erp-pro-ui';
import { useState } from 'react';

const Example = () => {
  const [value, setValue] = useState('');
  
  return (
    <OTPInput 
      length={6} 
      value={value} 
      onChange={setValue} 
      autoFocus
      onComplete={(code) => console.log('Complete OTP:', code)}
    />
  );
};`}
      />

      <h2 className="docs-category-subtitle">Masked And Grouped Code</h2>
      <p className="docs-paragraph mb-4">
        You can mask values and add separators for grouped verification patterns
        such as 3-3 or 2-2-2 split codes.
      </p>

      <div className="docs-showcase-card">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <OTPInput
            length={6}
            value={maskedOtp}
            onChange={setMaskedOtp}
            mask
            separatorPositions={[3]}
            placeholder="•"
            variant="filled"
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Paste a full code to auto-fill all slots.
          </p>
        </div>
      </div>

      <CodeBlock
        code={`<OTPInput
  length={6}
  mask
  separatorPositions={[3]}
  placeholder="•"
  variant="filled"
/>`}
      />

      <h2 className="docs-category-subtitle">Error State</h2>
      <p className="docs-paragraph mb-4">
        Display validation feedback when users enter an expired or invalid code.
      </p>

      <div className="docs-showcase-card">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <OTPInput
            length={6}
            value="12"
            error
            errorMessage="The code is invalid or expired. Request a new one."
          />
        </div>
      </div>

      <CodeBlock
        code={`<OTPInput
  length={6}
  value="12"
  error
  errorMessage="The code is invalid or expired. Request a new one."
/>`}
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
              <td className="docs-prop-name">length</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>6</td>
              <td>Total number of OTP cells</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Controlled OTP value</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td>
                <span className="docs-prop-type">
                  {'(value: string) => void'}
                </span>
              </td>
              <td>-</td>
              <td>Fires whenever any cell value changes</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onComplete</td>
              <td>
                <span className="docs-prop-type">
                  {'(value: string) => void'}
                </span>
              </td>
              <td>-</td>
              <td>Called once all cells are filled</td>
            </tr>
            <tr>
              <td className="docs-prop-name">autoFocus</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Focus the first field automatically on mount</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Disable all input fields</td>
            </tr>
            <tr>
              <td className="docs-prop-name">type</td>
              <td>
                <span className="docs-prop-type">'number' | 'text'</span>
              </td>
              <td>'number'</td>
              <td>Restricts accepted character set for OTP cells</td>
            </tr>
            <tr>
              <td className="docs-prop-name">mask</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Obscures entered characters for sensitive OTP input</td>
            </tr>
            <tr>
              <td className="docs-prop-name">separator / separatorPositions</td>
              <td>
                <span className="docs-prop-type">ReactNode / number[]</span>
              </td>
              <td>'—' / []</td>
              <td>Adds grouped formatting between specific input positions</td>
            </tr>
            <tr>
              <td className="docs-prop-name">error / errorMessage</td>
              <td>
                <span className="docs-prop-type">boolean / string</span>
              </td>
              <td>false / -</td>
              <td>Shows an invalid state and helper feedback message</td>
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
