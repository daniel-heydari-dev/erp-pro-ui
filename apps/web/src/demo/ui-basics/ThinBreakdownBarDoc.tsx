import React from 'react';
import { ThinBreakdownBar, BreakdownSegment } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const ThinBreakdownBarDoc = () => {
  const segments: BreakdownSegment[] = [
    { label: 'Cloud Resources', value: 45, color: '#e024ff' },
    { label: 'Database', value: 25, color: '#7367f0' },
    { label: 'Network', value: 15, color: '#00cfe8' },
    { label: 'Processing', value: 10, color: '#28c76f' },
    { label: 'Storage', value: 5, color: '#ff9f43' },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Thin Breakdown Bar</h1>
      <p className="docs-paragraph">
        A minimalist horizontal proportion bar. CSS-only sizing based on percentage values out of 100.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <p className="docs-paragraph">
        Pass an array of segments with value (out of 100), label, and color. The component handles the layout perfectly.
      </p>
      <div className="docs-showcase-card h-[250px] flex items-center justify-center">
        <div className="w-full max-w-2xl px-8">
          <h3 className="text-xl font-semibold mb-6 text-zinc-100">Server Usage</h3>
          <ThinBreakdownBar segments={segments} />
        </div>
      </div>

      <CodeBlock code={`import { ThinBreakdownBar, BreakdownSegment } from '@erp-pro/ui';

const segments: BreakdownSegment[] = [
  { label: 'Cloud Resources', value: 45, color: '#e024ff' },
  { label: 'Database', value: 25, color: '#7367f0' },
  { label: 'Network', value: 15, color: '#00cfe8' },
  { label: 'Processing', value: 10, color: '#28c76f' },
  { label: 'Storage', value: 5, color: '#ff9f43' },
];

<div className="w-full max-w-2xl">
  <h3 className="text-xl font-semibold mb-6">Server Usage</h3>
  <ThinBreakdownBar segments={segments} />
</div>`} />

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
              <td className="docs-prop-name">segments</td>
              <td><span className="docs-prop-type">BreakdownSegment[]</span></td>
              <td>required</td>
              <td>Array of objects containing {`{ label: string; value: number; color: string }`}</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>undefined</td>
              <td>Additional CSS classes for styling the container</td>
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
