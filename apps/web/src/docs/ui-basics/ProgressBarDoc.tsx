import { ProgressBar } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const ProgressBarDoc = () => {
  const capacityRows = [
    { label: "142 units", value: 71 },
    { label: "176 units", value: 88 },
    { label: "96 units", value: 48 },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Progress Bar</h1>
      <p className="docs-paragraph">
        ProgressBar is a compact linear meter for quotas, completion states,
        utilization, and other ratio-based metrics.
      </p>

      <h2 className="docs-category-subtitle">Quota Overview</h2>
      <p className="docs-paragraph mb-4">
        Pair a left-aligned label with the built-in percentage output for a
        dense operational readout.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-xl rounded-3xl bg-slate-950 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.4)]">
          <ProgressBar value={71} max={100} label="142 units" size="md" />
        </div>
      </div>

      <CodeBlock
        code={`import { ProgressBar } from 'erp-pro-ui';

<ProgressBar value={71} max={100} label="142 units" />`}
      />

      <h2 className="docs-category-subtitle">Capacity Rows</h2>
      <p className="docs-paragraph mb-4">
        Use the small size for stacked list views or table-adjacent summaries.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          {capacityRows.map((row) => (
            <div key={row.label} className="space-y-2">
              <ProgressBar
                value={row.value}
                max={100}
                label={row.label}
                size="sm"
                tone={row.value >= 85 ? "warning" : "default"}
              />
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        code={`const rows = [
  { label: '142 units', value: 71 },
  { label: '176 units', value: 88 },
  { label: '96 units', value: 48 },
];

{rows.map((row) => (
  <ProgressBar
    key={row.label}
    value={row.value}
    max={100}
    label={row.label}
    size="sm"
    tone={row.value >= 85 ? 'warning' : 'default'}
  />
))}`}
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
              <td className="docs-prop-name">value</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>-</td>
              <td>Current progress value rendered in the fill track</td>
            </tr>
            <tr>
              <td className="docs-prop-name">max</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>100</td>
              <td>Maximum value used to calculate the fill percentage</td>
            </tr>
            <tr>
              <td className="docs-prop-name">label</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Optional left-side label shown above the bar</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td>
                <span className="docs-prop-type">'sm' | 'md' | 'lg'</span>
              </td>
              <td>'md'</td>
              <td>Controls the bar thickness and label sizing</td>
            </tr>
            <tr>
              <td className="docs-prop-name">tone</td>
              <td>
                <span className="docs-prop-type">
                  'default' | 'success' | 'warning' | 'danger' | 'info'
                </span>
              </td>
              <td>'default'</td>
              <td>Adjusts the fill and track emphasis for the metric state</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Chip", route: "/ui-basics/chip" }}
        next={{ label: "Calendar", route: "/ui-basics/calendar" }}
      />
    </section>
  );
};

export default ProgressBarDoc;
