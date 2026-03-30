import { StackedBarChart, StackedBarData } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const StackedBarChartDoc = () => {
  const staffingData: StackedBarData[] = [
    { name: 'Mon', picking: 28, packing: 18, quality: 9, dispatch: 12 },
    { name: 'Tue', picking: 32, packing: 20, quality: 8, dispatch: 10 },
    { name: 'Wed', picking: 35, packing: 24, quality: 10, dispatch: 11 },
    { name: 'Thu', picking: 31, packing: 22, quality: 9, dispatch: 13 },
    { name: 'Fri', picking: 38, packing: 25, quality: 11, dispatch: 14 },
  ];

  const staffingCategories = [
    { key: 'picking', color: '#7367f0', label: 'Picking' },
    { key: 'packing', color: '#00cfe8', label: 'Packing' },
    { key: 'quality', color: '#ff9f43', label: 'Quality' },
    { key: 'dispatch', color: '#28c76f', label: 'Dispatch' },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Stacked Bar Chart</h1>
      <p className="docs-paragraph">
        Stacked bars help users compare total volume while still seeing how that total is composed
        by category.
      </p>

      <h2 className="docs-category-subtitle">Daily Team Mix</h2>
      <p className="docs-paragraph mb-4">
        This pattern is useful for workload planning, staffing distribution, or any dashboard where
        multiple contributors add up to a shared total.
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <StackedBarChart
            data={staffingData}
            categories={staffingCategories}
            height={360}
            yAxisDomain={[0, 90]}
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock code={`import { StackedBarChart, StackedBarData } from 'erp-pro-ui';

const data: StackedBarData[] = [
  { name: 'Mon', picking: 28, packing: 18, quality: 9, dispatch: 12 },
  { name: 'Tue', picking: 32, packing: 20, quality: 8, dispatch: 10 },
];

const categories = [
  { key: 'picking', color: '#7367f0', label: 'Picking' },
  { key: 'packing', color: '#00cfe8', label: 'Packing' },
  { key: 'quality', color: '#ff9f43', label: 'Quality' },
  { key: 'dispatch', color: '#28c76f', label: 'Dispatch' },
];

<StackedBarChart
  data={data}
  categories={categories}
  height={360}
  yAxisDomain={[0, 90]}
/>`} />

      <h2 className="docs-category-subtitle">Consistent Scale Across Reports</h2>
      <p className="docs-paragraph mb-4">
        Set a fixed Y-axis domain when adjacent charts need to remain visually comparable instead of
        auto-scaling independently.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm font-medium text-neutral-900 dark:text-white">With fixed domain</p>
            <StackedBarChart
              data={staffingData.slice(0, 3)}
              categories={staffingCategories}
              height={280}
              yAxisDomain={[0, 90]}
            />
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm font-medium text-neutral-900 dark:text-white">Auto domain</p>
            <StackedBarChart
              data={staffingData.slice(0, 3)}
              categories={staffingCategories}
              height={280}
            />
          </div>
        </div>
      </div>

      <CodeBlock code={`<StackedBarChart
  data={staffingData}
  categories={staffingCategories}
  yAxisDomain={[0, 90]}
/>

<StackedBarChart
  data={staffingData}
  categories={staffingCategories}
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
              <td className="docs-prop-name">data</td>
              <td><span className="docs-prop-type">StackedBarData[]</span></td>
              <td>-</td>
              <td>Array of items containing one shared name field plus multiple numeric series</td>
            </tr>
            <tr>
              <td className="docs-prop-name">categories</td>
              <td><span className="docs-prop-type">{'{ key: string; color: string; label: string }[]'}</span></td>
              <td>-</td>
              <td>Defines stack order, legend labels, and fill colors</td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>300</td>
              <td>Height of the responsive chart wrapper</td>
            </tr>
            <tr>
              <td className="docs-prop-name">yAxisDomain</td>
              <td><span className="docs-prop-type">[number, number]</span></td>
              <td>auto</td>
              <td>Optional fixed vertical scale for consistent cross-chart comparison</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>''</td>
              <td>Optional classes applied to the outer chart container</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Neon Line Chart', route: '/ui-basics/neon-line-chart' }}
        next={{ label: 'Thin Breakdown Bar', route: '/ui-basics/thin-breakdown-bar' }}
      />
    </section>
  );
};

export default StackedBarChartDoc;
