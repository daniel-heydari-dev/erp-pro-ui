import React from 'react';
import { StackedBarChart, StackedBarData } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const StackedBarChartDoc = () => {
  const customData: StackedBarData[] = [
    { name: '1/31', business: 600, construction: 400, leisure: 300, manufacturing: 200, wholesale: 100 },
    { name: '2/1', business: 500, construction: 350, leisure: 250, manufacturing: 150, wholesale: 80 },
    { name: '2/2', business: 800, construction: 600, leisure: 400, manufacturing: 300, wholesale: 200 },
    { name: '2/3', business: 900, construction: 700, leisure: 500, manufacturing: 400, wholesale: 250 },
  ];

  const categories = [
    { key: 'business', color: '#7367f0', label: 'Business' },
    { key: 'construction', color: '#e024ff', label: 'Construction' },
    { key: 'leisure', color: '#00cfe8', label: 'Leisure' },
    { key: 'manufacturing', color: '#28c76f', label: 'Manufacturing' },
    { key: 'wholesale', color: '#ff9f43', label: 'Wholesale' },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Stacked Bar Chart</h1>
      <p className="docs-paragraph">
        A multi-category stacked bar chart featuring dynamically rounded top corners for the topmost active category.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <p className="docs-paragraph">
        Pass in comprehensive multi-key data and define the categories configuration object to map each segment.
      </p>
      <div className="docs-showcase-card h-[450px] flex items-center justify-center">
        <StackedBarChart
          data={customData}
          categories={categories}
          height={380}
          yAxisDomain={[0, 3600]}
          className="px-4"
        />
      </div>

      <CodeBlock code={`import { StackedBarChart, StackedBarData } from '@erp-pro/ui';

const customData: StackedBarData[] = [
  { name: '1/31', business: 600, construction: 400, leisure: 300, manufacturing: 200, wholesale: 100 },
  { name: '2/1', business: 500, construction: 350, leisure: 250, manufacturing: 150, wholesale: 80 },
  // ...
];

const categories = [
  { key: 'business', color: '#7367f0', label: 'Business' },
  { key: 'construction', color: '#e024ff', label: 'Construction' },
  { key: 'leisure', color: '#00cfe8', label: 'Leisure' },
  { key: 'manufacturing', color: '#28c76f', label: 'Manufacturing' },
  { key: 'wholesale', color: '#ff9f43', label: 'Wholesale' },
];

<StackedBarChart
  data={customData}
  categories={categories}
  height={380}
  yAxisDomain={[0, 3600]}
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
              <td className="docs-prop-name">data</td>
              <td><span className="docs-prop-type">StackedBarData[]</span></td>
              <td>required</td>
              <td>The array of objects containing the multi-key series data</td>
            </tr>
            <tr>
              <td className="docs-prop-name">categories</td>
              <td><span className="docs-prop-type">{"{ key: string; color: string; label?: string }[]"}</span></td>
              <td>required</td>
              <td>Configuration object that defines the colors and stacking order of the segments</td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>350</td>
              <td>Height of the chart container</td>
            </tr>
            <tr>
              <td className="docs-prop-name">yAxisDomain</td>
              <td><span className="docs-prop-type">[number | string, number | string]</span></td>
              <td>[0, 'auto']</td>
              <td>Determines the minimum and maximum scaling values for the Y Axis</td>
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
