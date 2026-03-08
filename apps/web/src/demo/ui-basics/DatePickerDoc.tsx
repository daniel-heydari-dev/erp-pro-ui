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
        A component that allows users to select a date from a calendar popover.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[350px] items-start">
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

      {/* Range Mode */}
      <h2 className="docs-category-subtitle">Date Range Picker</h2>
      <p className="docs-paragraph">
        Set <code>mode="range"</code> to allow users to select a start and end date.
      </p>
      <div className="docs-showcase-card h-[350px] items-start">
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

      {/* Advanced Presets */}
      <h2 className="docs-category-subtitle">Advanced Presets</h2>
      <p className="docs-paragraph">
        Define custom presets for common timeframes like "Start of Year" or "Next Month".
      </p>
      <div className="docs-showcase-card h-[350px] items-start">
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
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">Date | Range</span></td>
              <td>-</td>
              <td>Selected date or range</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onChange</td>
              <td><span className="docs-prop-type">Function</span></td>
              <td>-</td>
              <td>Callback when selection changes</td>
            </tr>
            <tr>
              <td className="docs-prop-name">mode</td>
              <td><span className="docs-prop-type">"single" | "range"</span></td>
              <td>"single"</td>
              <td>Selection mode</td>
            </tr>
            <tr>
              <td className="docs-prop-name">presets</td>
              <td><span className="docs-prop-type">Preset[]</span></td>
              <td>-</td>
              <td>Quick selection presets</td>
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
