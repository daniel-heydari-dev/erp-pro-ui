import { ChromaGrid } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const ChromaGridDoc = () => {
  const items = [
    { id: '1', title: 'Design', description: 'Clean & Modern UI', icon: '🎨' },
    { id: '2', title: 'Performance', description: 'Blazing Fast Speed', icon: '⚡' },
    { id: '3', title: 'Quality', description: 'Best-in-class Code', icon: '🏆' },
    { id: '4', title: 'Security', description: 'Enterprise Protection', icon: '🔒', size: 2 as const },
    { id: '5', title: 'Global', description: 'Cloud Distribution', icon: '🌐' },
    { id: '6', title: 'Analytics', description: 'Real-time Insights', icon: '📈' },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Chroma Grid</h1>
      <p className="docs-paragraph">
        A visually striking grid component with staggered animations and colorful backgrounds.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-auto p-8">
        <ChromaGrid
          items={items.slice(0, 3)}
          columns={3}
          variant="gradient"
          animation="wave"
        />
      </div>

      <CodeBlock code={`import { ChromaGrid } from 'erp-pro-ui';

const items = [
  { id: '1', title: 'Design', icon: '🎨' },
  { id: '2', title: 'Performance', icon: '⚡' },
  // ...
];

<ChromaGrid
  items={items}
  columns={3}
  animation="wave"
/>`} />

      {/* Variants & Layout */}
      <h2 className="docs-category-subtitle">Variants & Layout</h2>
      <p className="docs-paragraph">
        Mix sizes and use glass or solid variants for different aesthetic needs.
      </p>
      <div className="docs-showcase-card h-auto p-8">
        <ChromaGrid
          items={items}
          columns={3}
          gap={20}
          variant="glass"
          hoverEffect="tilt"
          spotlight={true}
        />
      </div>

      <CodeBlock code={`<ChromaGrid
  items={items}
  variant="glass"
  hoverEffect="tilt"
  gap={20}
/>`} />

      {/* Animations */}
      <h2 className="docs-category-subtitle">Entrance Animations</h2>
      <p className="docs-paragraph">
        Choose from various entrance animations like pulse, wave, or scale.
      </p>
      <div className="docs-showcase-card h-auto p-8">
        <ChromaGrid
          items={items.slice(0, 4)}
          columns={4}
          minHeight={150}
          animation="pulse"
          staggerDelay={150}
        />
      </div>

      <CodeBlock code={`<ChromaGrid animation="pulse" staggerDelay={150} />`} />

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
              <td className="docs-prop-name">items</td>
              <td><span className="docs-prop-type">ChromaGridItem[]</span></td>
              <td>-</td>
              <td>Array of grid items with id, title, content</td>
            </tr>
            <tr>
              <td className="docs-prop-name">columns</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>3</td>
              <td>Number of grid columns</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">'gradient' | 'glass' | 'solid'</span></td>
              <td>'gradient'</td>
              <td>Visual style of the grid items</td>
            </tr>
            <tr>
              <td className="docs-prop-name">animation</td>
              <td><span className="docs-prop-type">'wave' | 'pulse' | 'fadeIn' | 'scale'</span></td>
              <td>'wave'</td>
              <td>Initial entrance animation style</td>
            </tr>
            <tr>
              <td className="docs-prop-name">hoverEffect</td>
              <td><span className="docs-prop-type">'lift' | 'glow' | 'scale' | 'tilt'</span></td>
              <td>'lift'</td>
              <td>Interactive effect on mouse hover</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Splash Cursor', route: '/ui-basics/splash-cursor' }}
        next={{ label: 'Color Palette', route: '/ui-basics/color-palette' }}
      />
    </section>
  );
};

export default ChromaGridDoc;
