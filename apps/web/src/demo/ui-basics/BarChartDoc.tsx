import React from 'react';
import { BarChart, BarChartData } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const BarChartDoc = () => {
  const data: BarChartData[] = [
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Feb', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Apr', revenue: 2780, expenses: 3908 },
    { name: 'May', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
  ];

  const categories = [
    { key: 'revenue', color: '#00cfe8' },
    { key: 'expenses', color: '#28c76f' },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Bar Chart</h1>
      <p className="docs-paragraph">
        A customizable standard bar chart for comparing distinct categories of data.
      </p>

      {/* Vertical Layout Usage */}
      <h2 className="docs-category-subtitle">Vertical Layout</h2>
      <p className="docs-paragraph">
        The default layout, great for time-series or sequential comparisons.
      </p>
      <div className="docs-showcase-card h-[450px] flex items-center justify-center">
        <BarChart data={data} categories={categories} height={350} layout="horizontal" className="px-4" />
      </div>

      <CodeBlock code={`import { BarChart, BarChartData } from '@erp-pro/ui';

const data: BarChartData[] = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  // ...
];

const categories = [
  { key: 'revenue', color: '#00cfe8' },
  { key: 'expenses', color: '#28c76f' },
];

<BarChart 
  data={data} 
  categories={categories} 
  height={350} 
  layout="horizontal" 
/>`} />

      {/* Horizontal Layout Usage */}
      <h2 className="docs-category-subtitle">Horizontal Layout</h2>
      <p className="docs-paragraph">
        Useful when data names are long or you are ranking items from top to bottom.
      </p>
      <div className="docs-showcase-card h-[450px] flex items-center justify-center">
        <BarChart data={data} categories={categories} height={350} layout="vertical" className="px-4" />
      </div>

      <CodeBlock code={`<BarChart 
  data={data} 
  categories={categories} 
  height={350} 
  layout="vertical" 
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
              <td><span className="docs-prop-type">BarChartData[]</span></td>
              <td>required</td>
              <td>The array of objects to map into the chart</td>
            </tr>
            <tr>
              <td className="docs-prop-name">categories</td>
              <td><span className="docs-prop-type">{"{ key: string; color: string }[]"}</span></td>
              <td>required</td>
              <td>The data keys to represent, and their respective bar colors</td>
            </tr>
            <tr>
              <td className="docs-prop-name">layout</td>
              <td><span className="docs-prop-type">'horizontal' | 'vertical'</span></td>
              <td>'horizontal'</td>
              <td>Orientation of the bars. 'horizontal' means bars grow upwards.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>300</td>
              <td>Height of the chart container</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showGrid</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>true</td>
              <td>Whether to render the Cartesian grid background</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Area Chart', route: '/ui-basics/area-chart' }}
        next={{ label: 'Pie Chart', route: '/ui-basics/pie-chart' }}
      />
    </section>
  );
};

export default BarChartDoc;
