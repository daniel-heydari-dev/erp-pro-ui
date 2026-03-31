import { useState } from "react";
import { Calendar } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

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
        Date grid for selecting a single day or a date range, with optional
        month controls and custom footer actions.
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
          Selected: {date?.toLocaleDateString() || "None"}
        </div>
      </div>

      <CodeBlock
        code={`import { Calendar } from 'erp-pro-ui';
import { useState } from 'react';

const [date, setDate] = useState<Date | null>(new Date());

<Calendar
  selectionMode="single"
  value={date}
  onSelect={setDate}
  className="rounded-md border"
/>`}
      />

      {/* Range Selection */}
      <h2 className="docs-category-subtitle">Range Selection</h2>
      <p className="docs-paragraph">
        In range mode, the first click sets the start date and the second click
        completes the range.
      </p>
      <div className="docs-showcase-card flex-col items-center">
        <Calendar
          selectionMode="range"
          range={range}
          onRangeSelect={setRange}
          className="rounded-md border shadow"
        />
        <div className="mt-4 text-sm text-neutral-500">
          Range: {range?.start?.toLocaleDateString()} -{" "}
          {range?.end?.toLocaleDateString()}
        </div>
      </div>

      <CodeBlock
        code={`const [range, setRange] = useState({
  start: new Date(),
  end: new Date(),
});

<Calendar
  selectionMode="range"
  range={range}
  onRangeSelect={setRange}
/>`}
      />

      <h2 className="docs-category-subtitle">Controlled Month</h2>
      <p className="docs-paragraph">
        Use <code>month</code>, <code>year</code>, and{" "}
        <code>onMonthChange</code> when another control drives navigation.
      </p>
      <div className="docs-showcase-card flex-col items-center">
        <Calendar
          month={0}
          year={2027}
          onMonthChange={(nextMonth, nextYear) => {
            console.log("Navigate to", nextMonth, nextYear);
          }}
          value={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </div>

      <CodeBlock
        code={`<Calendar
  month={0}
  year={2027}
  onMonthChange={(nextMonth, nextYear) => {
    console.log(nextMonth, nextYear);
  }}
  value={date}
  onSelect={setDate}
/>`}
      />

      {/* Footer Actions */}
      <h2 className="docs-category-subtitle">With Footer Actions</h2>
      <p className="docs-paragraph">
        Use the <code>footer</code> prop to add buttons for quick actions like
        resetting the date or selecting today.
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

      <CodeBlock
        code={`<Calendar
  value={date}
  onSelect={setDate}
  footer={
    <div className="flex justify-between border-t p-2">
      <button onClick={() => setDate(new Date())}>Today</button>
      <button onClick={() => setDate(null)}>Clear</button>
    </div>
  }
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
              <td className="docs-prop-name">selectionMode</td>
              <td>
                <span className="docs-prop-type">'single' | 'range'</span>
              </td>
              <td>'single'</td>
              <td>Selection mode</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td>
                <span className="docs-prop-type">Date | null</span>
              </td>
              <td>-</td>
              <td>Selected date (single mode)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">range</td>
              <td>
                <span className="docs-prop-type">{`{ start: Date | null; end: Date | null }`}</span>
              </td>
              <td>-</td>
              <td>Selected range (range mode)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onSelect</td>
              <td>
                <span className="docs-prop-type">(date: Date) =&gt; void</span>
              </td>
              <td>-</td>
              <td>Callback when single-date selection changes.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onRangeSelect</td>
              <td>
                <span className="docs-prop-type">
                  (range: {`{ start: Date | null; end: Date | null }`}) =&gt;
                  void
                </span>
              </td>
              <td>-</td>
              <td>Callback when the range selection changes.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">month</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>Current month</td>
              <td>Controlled month index (0 = January).</td>
            </tr>
            <tr>
              <td className="docs-prop-name">year</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>Current year</td>
              <td>Controlled full year (for example 2026).</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onMonthChange</td>
              <td>
                <span className="docs-prop-type">
                  (month: number, year: number) =&gt; void
                </span>
              </td>
              <td>-</td>
              <td>Called when users navigate to a different month.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">footer</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Optional action area rendered below the calendar grid.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Custom classes applied to the root container.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Chip", route: "/ui-basics/chip" }}
        next={{ label: "Date Picker", route: "/ui-basics/datepicker" }}
      />
    </section>
  );
};

export default CalendarDoc;
