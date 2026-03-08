import React from 'react';
import { AreaChart, AreaChartData } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const AreaChartDoc = () => {
  const data: AreaChartData[] = [
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Feb', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Apr', revenue: 2780, expenses: 3908 },
    { name: 'May', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
    { name: 'Jul', revenue: 3490, expenses: 4300 },
  ];

  const categories = [
    { key: 'revenue', color: '#7367f0' },
    { key: 'expenses', color: '#ff4c51' },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Area Chart</h1>
      <p className="docs-paragraph">
        A standard area chart used to represent quantitative variations over a continuous time period.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[450px] flex items-center justify-center">
        <AreaChart data={data} categories={categories} height={350} className="px-4" />
      </div>

      <CodeBlock code={`import { AreaChart, AreaChartData } from 'erp-pro-ui';

const data: AreaChartData[] = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  // ...
];

const categories = [
  { key: 'revenue', color: '#7367f0' },
  { key: 'expenses', color: '#ff4c51' },
];

<AreaChart 
  data={data} 
  categories={categories} 
  height={350} 
/>`} />

      {/* Grid Usage */}
      <h2 className="docs-category-subtitle">Without Grid Lines</h2>
      <p className="docs-paragraph">
        You can disable the background grid lines for a cleaner, minimalist look by passing <code>showGrid={'{false}'}</code>.
      </p>
      <div className="docs-showcase-card h-[450px] flex items-center justify-center">
        <AreaChart data={data} categories={categories} height={350} showGrid={false} className="px-4" />
      </div>

      <CodeBlock code={`<AreaChart 
  data={data} 
  categories={categories} 
  height={350} 
  showGrid={false} 
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
              <td><span className="docs-prop-type">AreaChartData[]</span></td>
              <td>required</td>
              <td>The array of objects to map into the chart</td>
            </tr>
            <tr>
              <td className="docs-prop-name">categories</td>
              <td><span className="docs-prop-type">{"{ key: string; color: string }[]"}</span></td>
              <td>required</td>
              <td>The data keys to represent, and their respective stroke/gradient colors</td>
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
        prev={{ label: 'Skeleton', route: '/ui-basics/skeleton' }}
        next={{ label: 'Bar Chart', route: '/ui-basics/bar-chart' }}
      />
    </section>
  );
};

export default AreaChartDoc;
