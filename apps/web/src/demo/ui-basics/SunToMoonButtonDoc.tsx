import { SunToMoonButton } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const SunToMoonButtonDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Sun to Moon Button</h1>
      <p className="docs-paragraph">
        A premium theme toggle with animated icon morphing that works inside the global ThemeProvider used by the web app.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Interactive Toggle</h2>
      <p className="docs-paragraph">
        Click the button to see the sun morph into a moon with spring-based animations.
      </p>
      <div className="docs-showcase-card h-64 flex items-center justify-center">
        <div className="w-48">
          <SunToMoonButton showLabelAndImage={true} />
        </div>
      </div>

      <CodeBlock code={`import { SunToMoonButton } from 'erp-pro-ui';

/* Full version with label and mockup */
<SunToMoonButton showLabelAndImage={true} />

/* Icon only version */
<SunToMoonButton showLabelAndImage={false} />`} />

      <h2 className="docs-category-subtitle">Icon Only</h2>
      <div className="docs-showcase-card h-52 flex items-center justify-center">
        <div className="w-20">
          <SunToMoonButton showLabelAndImage={false} />
        </div>
      </div>

      <CodeBlock code={`<SunToMoonButton showLabelAndImage={false} />`} />

      <h2 className="docs-category-subtitle">Toolbar Placement</h2>
      <p className="docs-paragraph">
        The compact variant fits naturally into workspace headers and utility bars.
      </p>
      <div className="docs-showcase-card h-56 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">Workspace header</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Theme toggle aligned with other global controls.
              </p>
            </div>
            <div className="w-20">
              <SunToMoonButton showLabelAndImage={false} />
            </div>
          </div>
        </div>
      </div>

      <CodeBlock code={`<div className="toolbar">
  <SunToMoonButton showLabelAndImage={false} />
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
              <td className="docs-prop-name">showLabelAndImage</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>true</td>
              <td>Whether to display the "Light/Dark" label and the UI mockup below the icon</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Password Strength', route: '/ui-basics/password-strength-meter' }}
        next={{ label: 'Carousel', route: '/ui-basics/carousel' }}
      />
    </section>
  );
};

export default SunToMoonButtonDoc;
