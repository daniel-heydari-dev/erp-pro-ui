import { ThinBreakdownBar, BreakdownSegment } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const ThinBreakdownBarDoc = () => {
  const infrastructureSegments: BreakdownSegment[] = [
    { label: 'Compute', value: 45, color: '#7367f0' },
    { label: 'Database', value: 25, color: '#00cfe8' },
    { label: 'Queues', value: 15, color: '#28c76f' },
    { label: 'Storage', value: 10, color: '#ff9f43' },
    { label: 'Other', value: 5, color: '#ff4c51' },
  ];

  const capacityRows: Array<{ title: string; segments: BreakdownSegment[] }> = [
    {
      title: 'Warehouse A',
      segments: [
        { label: 'Available', value: 58, color: '#28c76f' },
        { label: 'Reserved', value: 27, color: '#7367f0' },
        { label: 'Blocked', value: 15, color: '#ff9f43' },
      ],
    },
    {
      title: 'Warehouse B',
      segments: [
        { label: 'Available', value: 36, color: '#28c76f' },
        { label: 'Reserved', value: 44, color: '#7367f0' },
        { label: 'Blocked', value: 20, color: '#ff9f43' },
      ],
    },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Thin Breakdown Bar</h1>
      <p className="docs-paragraph">
        ThinBreakdownBar is a compact proportional indicator for showing how a total is divided
        across a small number of segments.
      </p>

      <h2 className="docs-category-subtitle">Allocation Overview</h2>
      <p className="docs-paragraph mb-4">
        Values are normalized against the total provided, so you can pass raw counts, percentages,
        or budget amounts and let the component calculate widths automatically.
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">Infrastructure spend allocation</p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Segment widths are derived from their share of the full spend profile.
            </p>
          </div>
          <ThinBreakdownBar data={infrastructureSegments} />
        </div>
      </div>

      <CodeBlock code={`import { ThinBreakdownBar, BreakdownSegment } from 'erp-pro-ui';

const segments: BreakdownSegment[] = [
  { label: 'Compute', value: 45, color: '#7367f0' },
  { label: 'Database', value: 25, color: '#00cfe8' },
  { label: 'Queues', value: 15, color: '#28c76f' },
  { label: 'Storage', value: 10, color: '#ff9f43' },
  { label: 'Other', value: 5, color: '#ff4c51' },
];

<ThinBreakdownBar data={segments} />`} />

      <h2 className="docs-category-subtitle">Compact Capacity Rows</h2>
      <p className="docs-paragraph mb-4">
        Hide labels when the surrounding layout already provides context and the bar is acting as a
        compact status meter.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          {capacityRows.map((row) => (
            <div key={row.title} className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">{row.title}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Live capacity mix</p>
              </div>
              <ThinBreakdownBar data={row.segments} showLabels={false} />
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`<ThinBreakdownBar data={segments} showLabels={false} />`} />

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
              <td className="docs-prop-name">data</td>
              <td><span className="docs-prop-type">BreakdownSegment[]</span></td>
              <td>-</td>
              <td>Segments containing label, value, optional id, and display color</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showLabels</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>true</td>
              <td>Controls whether the segment labels are rendered under the track</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>''</td>
              <td>Optional classes applied to the outer wrapper</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Stacked Bar Chart', route: '/ui-basics/stacked-bar-chart' }}
        next={{ label: 'Spotlight Card', route: '/ui-basics/spotlight-card' }}
      />
    </section>
  );
};

export default ThinBreakdownBarDoc;
