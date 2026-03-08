import { SpotlightCard } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const SpotlightCardDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Spotlight Card</h1>
      <p className="docs-paragraph">
        A card component with a dynamic spotlight effect that follows the mouse movement.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[400px] flex items-center justify-center">
        <SpotlightCard className="max-w-sm" spotlightColor="rgba(115, 103, 240, 0.2)">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Spotlight Effect</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                Move your mouse over this card to see the dynamic spotlight effect in action.
              </p>
            </div>
          </div>
        </SpotlightCard>
      </div>

      <CodeBlock code={`import { SpotlightCard } from 'erp-pro-ui';

<SpotlightCard
  spotlightColor="rgba(115, 103, 240, 0.2)"
  className="max-w-sm"
>
  <h3>Spotlight Effect</h3>
  <p>Move your mouse over this card...</p>
</SpotlightCard>`} />

      {/* Variants */}
      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        SpotlightCard supports different styles like glass, solid, and outlined.
      </p>
      <div className="docs-showcase-card h-[400px] flex items-center justify-center overflow-x-auto">
        <div className="flex gap-6 p-4">
          <SpotlightCard variant="glass" className="w-64">
            <h4 className="font-bold">Glass</h4>
            <p className="text-sm mt-2 opacity-70">Translucent glass effect.</p>
          </SpotlightCard>
          <SpotlightCard variant="solid" className="w-64">
            <h4 className="font-bold">Solid</h4>
            <p className="text-sm mt-2 opacity-70">Solid background color.</p>
          </SpotlightCard>
          <SpotlightCard variant="outlined" className="w-64">
            <h4 className="font-bold">Outlined</h4>
            <p className="text-sm mt-2 opacity-70">Border only, no fill.</p>
          </SpotlightCard>
        </div>
      </div>

      <CodeBlock code={`<SpotlightCard variant="solid" />
<SpotlightCard variant="outlined" />`} />

      {/* Colors & Sizes */}
      <h2 className="docs-category-subtitle">Customization</h2>
      <p className="docs-paragraph">
        Adjust the spotlight color and size to match your theme.
      </p>
      <div className="docs-showcase-card h-[400px] flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8">
          <SpotlightCard spotlightColor="rgba(255, 0, 150, 0.1)" spotlightSize={200}>
            <h4 className="font-bold">Pink Spotlight</h4>
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(0, 255, 150, 0.1)" spotlightSize={500}>
            <h4 className="font-bold">Green Wide</h4>
          </SpotlightCard>
        </div>
      </div>

      <CodeBlock code={`<SpotlightCard
  spotlightColor="rgba(255, 0, 150, 0.1)"
  spotlightSize={200}
>
  ...
</SpotlightCard>`} />

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
              <td className="docs-prop-name">spotlightColor</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>'rgba(115, 103, 240, 0.15)'</td>
              <td>Color of the spotlight effect</td>
            </tr>
            <tr>
              <td className="docs-prop-name">spotlightSize</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>350</td>
              <td>Radius of the spotlight in pixels</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">'glass' | 'solid' | 'outlined'</span></td>
              <td>'glass'</td>
              <td>Visual style variant</td>
            </tr>
            <tr>
              <td className="docs-prop-name">hoverScale</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>true</td>
              <td>Whether to scale up on hover</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Hover Card', route: '/ui-basics/hover-card' }}
        next={{ label: 'Splash Cursor', route: '/ui-basics/splash-cursor' }}
      />
    </section>
  );
};

export default SpotlightCardDoc;
