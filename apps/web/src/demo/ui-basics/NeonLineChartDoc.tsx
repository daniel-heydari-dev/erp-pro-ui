import React from 'react';
import { NeonLineChart } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const NeonLineChartDoc = () => {
  const data = [
    { name: 'Mon', value: 3 },
    { name: 'Tue', value: 8 },
    { name: 'Wed', value: 6 },
    { name: 'Thu', value: 10 },
    { name: 'Fri', value: 5 },
    { name: 'Sat', value: 12 },
    { name: 'Sun', value: 14 },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Neon Line Chart</h1>
      <p className="docs-paragraph">
        A highly stylized, cyberpunk-inspired line chart with built-in glowing drop-shadow filters and gradient strokes.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <p className="docs-paragraph">
        This chart is pre-configured to deliver a premium, glowing aesthetic without any extra CSS.
      </p>
      <div className="docs-showcase-card h-[400px] flex items-center justify-center">
        <NeonLineChart data={data} height={300} className="px-4" />
      </div>

      <CodeBlock code={`import { NeonLineChart } from '@erp-pro/ui';

const data = [
  { name: 'Mon', value: 3 },
  { name: 'Tue', value: 8 },
  // ...
];

<NeonLineChart 
  data={data} 
  height={300} 
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
              <td><span className="docs-prop-type">{"{ name: string; value: number }[]"}</span></td>
              <td>required</td>
              <td>The array of timeline data points</td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>300</td>
              <td>Height of the chart container</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>undefined</td>
              <td>Additional CSS classes for the container wrapper</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Pie Chart', route: '/ui-basics/pie-chart' }}
        next={{ label: 'Stacked Bar Chart', route: '/ui-basics/stacked-bar-chart' }}
      />
    </section>
  );
};

export default NeonLineChartDoc;
