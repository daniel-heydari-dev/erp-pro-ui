import React from 'react';
import { PieChart, PieChartData } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const PieChartDoc = () => {
  const data: PieChartData[] = [
    { name: 'Software', value: 400 },
    { name: 'Hardware', value: 300 },
    { name: 'Services', value: 300 },
    { name: 'Cloud', value: 200 },
  ];

  const colors = ['#7367f0', '#00cfe8', '#28c76f', '#ff9f43'];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Pie Chart</h1>
      <p className="docs-paragraph">
        A circular chart used to show the proportion of categories. Supports both solid pie and hollow donut variants.
      </p>

      {/* Donut Mode Usage */}
      <h2 className="docs-category-subtitle">Donut Chart</h2>
      <p className="docs-paragraph">
        The donut variant is often preferred for dashboards as it feels lighter and allows for a central focal point.
      </p>
      <div className="docs-showcase-card h-[400px] flex items-center justify-center">
        <PieChart data={data} colors={colors} variant="donut" height={300} />
      </div>

      <CodeBlock code={`import { PieChart, PieChartData } from '@erp-pro/ui';

const data: PieChartData[] = [
  { name: 'Software', value: 400 },
  { name: 'Hardware', value: 300 },
  // ...
];

const colors = ['#7367f0', '#00cfe8', '#28c76f', '#ff9f43'];

<PieChart 
  data={data} 
  colors={colors} 
  variant="donut" 
  height={300} 
/>`} />

      {/* Pie Mode Usage */}
      <h2 className="docs-category-subtitle">Standard Pie Chart</h2>
      <p className="docs-paragraph">
        The classic solid pie chart for traditional data distribution representation.
      </p>
      <div className="docs-showcase-card h-[400px] flex items-center justify-center">
        <PieChart data={data} colors={colors} variant="pie" height={300} />
      </div>

      <CodeBlock code={`<PieChart 
  data={data} 
  colors={colors} 
  variant="pie" 
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
              <td><span className="docs-prop-type">PieChartData[]</span></td>
              <td>required</td>
              <td>The array of objects with `name` and `value` properties</td>
            </tr>
            <tr>
              <td className="docs-prop-name">colors</td>
              <td><span className="docs-prop-type">string[]</span></td>
              <td>[ '#7367f0', '#e024ff', '#00cfe8', '#28c76f', '#ff9f43' ]</td>
              <td>Array of color strings to cycle through for each slice</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">'pie' | 'donut'</span></td>
              <td>'donut'</td>
              <td>Whether the center should be hollow or solid</td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>300</td>
              <td>Height of the chart container</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Bar Chart', route: '/ui-basics/bar-chart' }}
        next={{ label: 'Neon Line Chart', route: '/ui-basics/neon-line-chart' }}
      />
    </section>
  );
};

export default PieChartDoc;
