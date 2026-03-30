import { useState } from 'react';
import { DatePicker, DatePickerValue } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const DatePickerDoc = () => {
  const [date, setDate] = useState<DatePickerValue>(new Date());
  const [range, setRange] = useState<DatePickerValue>({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Date Picker</h1>
      <p className="docs-paragraph">
        DatePicker supports single-date and range selection with optional presets for recurring
        workflows like reporting windows and booking periods.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-xs">
          <DatePicker
            value={date}
            onChange={setDate}
            label="Pick a date"
            placeholder="Select date"
          />
        </div>
      </div>

      <CodeBlock code={`import { DatePicker } from 'erp-pro-ui';

<DatePicker
  value={date}
  onChange={setDate}
  label="Pick a date"
/>`} />

      <h2 className="docs-category-subtitle">Date Range Picker</h2>
      <p className="docs-paragraph">
        Set <code>mode="range"</code> to allow users to select a start and end date.
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-sm">
          <DatePicker
            mode="range"
            value={range}
            onChange={setRange}
            label="Travel Dates"
            placeholder="Select range"
          />
        </div>
      </div>

      <CodeBlock code={`<DatePicker
  mode="range"
  value={range}
  onChange={setRange}
  label="Booking Range"
/>`} />

      <h2 className="docs-category-subtitle">Preset Shortcuts</h2>
      <p className="docs-paragraph">
        Define custom presets for common timeframes like "Start of Year" or "Next Month".
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-xs">
          <DatePicker
            value={date}
            onChange={setDate}
            label="Report Period"
            presets={[
              { label: 'Start of Year', value: () => new Date(new Date().getFullYear(), 0, 1) },
              { label: 'End of Year', value: () => new Date(new Date().getFullYear(), 11, 31) },
              {
                label: 'Next Month', value: () => {
                  const d = new Date();
                  return new Date(d.getFullYear(), d.getMonth() + 1, 1);
                }
              },
            ]}
          />
        </div>
      </div>

      <CodeBlock code={`<DatePicker
  value={date}
  onChange={setDate}
  label="Report Period"
  presets={[
    { label: 'Start of Year', value: () => new Date(new Date().getFullYear(), 0, 1) },
    { label: 'End of Year', value: () => new Date(new Date().getFullYear(), 11, 31) },
  ]}
/>`} />

      <h2 className="docs-category-subtitle">Helper And Disabled States</h2>
      <p className="docs-paragraph mb-4">
        Use helper text for context and disabled mode when date input is controlled by upstream
        business logic.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
          <DatePicker
            value={date}
            onChange={setDate}
            label="Invoice Date"
            helperText="Invoice dates cannot be earlier than the purchase order date."
          />

          <DatePicker
            value={date}
            onChange={setDate}
            label="Locked Settlement Date"
            disabled
            helperText="Settlement windows are assigned by the finance team."
          />
        </div>
      </div>

      <CodeBlock code={`<DatePicker
  value={invoiceDate}
  onChange={setInvoiceDate}
  label="Invoice Date"
  helperText="Invoice dates cannot be earlier than the purchase order date."
/>

<DatePicker
  value={settlementDate}
  onChange={setSettlementDate}
  disabled
  label="Locked Settlement Date"
/>`} />

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
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">DatePickerValue</span></td>
              <td>-</td>
              <td>Controlled selected value for single or range mode</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">(value: DatePickerValue) =&gt; void</span></td>
              <td>-</td>
              <td>Fires when the selected date or range changes</td>
            </tr>
            <tr>
              <td className="docs-prop-name">mode</td>
              <td><span className="docs-prop-type">'single' | 'range'</span></td>
              <td>'single'</td>
              <td>Switches between one-date selection and start/end range selection</td>
            </tr>
            <tr>
              <td className="docs-prop-name">presets</td>
              <td><span className="docs-prop-type">DatePickerPreset[]</span></td>
              <td>-</td>
              <td>Optional quick-select shortcuts rendered under the calendar</td>
            </tr>
            <tr>
              <td className="docs-prop-name">label</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Field label rendered above the trigger</td>
            </tr>
            <tr>
              <td className="docs-prop-name">placeholder</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>'Pick a date'</td>
              <td>Text shown before any value is selected</td>
            </tr>
            <tr>
              <td className="docs-prop-name">helperText</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Supplementary hint shown under the picker</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Disables interaction and hides the calendar popover trigger state</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Calendar', route: '/ui-basics/calendar' }}
        next={{ label: 'Chip', route: '/ui-basics/chip' }}
      />
    </section>
  );
};

export default DatePickerDoc;
