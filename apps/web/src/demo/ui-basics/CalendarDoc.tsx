import { useState } from 'react';
import { Calendar } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const CalendarDoc = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 5)),
  });

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Calendar</h1>
      <p className="docs-paragraph">
        A calendar component for displaying dates and handling date selection.
      </p>

      {/* Single Selection */}
      <h2 className="docs-category-subtitle">Single Selection</h2>
      <div className="docs-showcase-card flex-col items-center">
        <Calendar
          selectionMode="single"
          value={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
        <div className="mt-4 text-sm text-neutral-500">
          Selected: {date?.toLocaleDateString() || 'None'}
        </div>
      </div>

      <CodeBlock code={`import { Calendar } from '@erp-pro/ui';
import { useState } from 'react';

const [date, setDate] = useState<Date | null>(new Date());

<Calendar
  selectionMode="single"
  value={date}
  onSelect={setDate}
  className="rounded-md border"
/>`} />

      {/* Range Selection */}
      <h2 className="docs-category-subtitle">Range Selection</h2>
      <div className="docs-showcase-card flex-col items-center">
        <Calendar
          selectionMode="range"
          range={range}
          onRangeSelect={setRange}
          className="rounded-md border shadow"
        />
        <div className="mt-4 text-sm text-neutral-500">
          Range: {range?.start?.toLocaleDateString()} - {range?.end?.toLocaleDateString()}
        </div>
      </div>

      <CodeBlock code={`const [range, setRange] = useState({
  start: new Date(),
  end: new Date(),
});

<Calendar
  selectionMode="range"
  range={range}
  onRangeSelect={setRange}
/>`} />

      {/* Footer Actions */}
      <h2 className="docs-category-subtitle">With Footer Actions</h2>
      <p className="docs-paragraph">
        Use the <code>footer</code> prop to add buttons for quick actions like resetting the date or selecting today.
      </p>
      <div className="docs-showcase-card flex-col items-center">
        <Calendar
          value={date}
          onSelect={setDate}
          className="rounded-md border shadow"
          footer={
            <div className="flex justify-between border-t border-white/10 pt-3">
              <button
                onClick={() => setDate(new Date())}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Today
              </button>
              <button
                onClick={() => setDate(null)}
                className="text-xs font-semibold text-neutral-500 hover:underline"
              >
                Clear
              </button>
            </div>
          }
        />
      </div>

      <CodeBlock code={`<Calendar
  value={date}
  onSelect={setDate}
  footer={
    <div className="flex justify-between border-t p-2">
      <button onClick={() => setDate(new Date())}>Today</button>
      <button onClick={() => setDate(null)}>Clear</button>
    </div>
  }
/>`} />

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
              <td className="docs-prop-name">selectionMode</td>
              <td><span className="docs-prop-type">'single' | 'range' | 'multiple'</span></td>
              <td>'single'</td>
              <td>Selection mode</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">Date | null</span></td>
              <td>-</td>
              <td>Selected date (single mode)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">range</td>
              <td><span className="docs-prop-type">{`{ start: Date | null; end: Date | null }`}</span></td>
              <td>-</td>
              <td>Selected range (range mode)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onSelect</td>
              <td><span className="docs-prop-type">(date: any) =&gt; void</span></td>
              <td>-</td>
              <tr>
                <td className="docs-prop-name">onSelect</td>
                <td><span className="docs-prop-type">(date: Date) =&gt; void</span></td>
                <td>-</td>
                <td>Callback when selection changes (single mode)</td>
              </tr>
              <tr>
                <td className="docs-prop-name">onRangeSelect</td>
                <td><span className="docs-prop-type">(range: any) =&gt; void</span></td>
                <td>-</td>
                <td>Callback when range changes (range mode)</td>
              </tr>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Chip', route: '/ui-basics/chip' }}
        next={{ label: 'Date Picker', route: '/ui-basics/datepicker' }}
      />
    </section>
  );
};

export default CalendarDoc;
