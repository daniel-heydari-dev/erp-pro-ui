import { HoverBorderGradient } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const HoverBorderGradientDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Hover Border Gradient</h1>
      <p className="docs-paragraph">
        A generic hoverable frame that adds animated border emphasis to buttons, pills, and small CTA surfaces.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[250px] flex items-center justify-center">
        <HoverBorderGradient className="px-8 py-3 bg-white dark:bg-black">
          <span>Hover Me</span>
        </HoverBorderGradient>
      </div>

      <CodeBlock code={`import { HoverBorderGradient } from 'erp-pro-ui';

<HoverBorderGradient className="px-8 py-3 bg-white dark:bg-black text-black dark:text-white">
  <span>Hover Me</span>
</HoverBorderGradient>`} />

      {/* Animation Styles */}
      <h2 className="docs-category-subtitle">Animation Control</h2>
      <p className="docs-paragraph">
        You can control the animation speed and direction.
      </p>
      <div className="docs-showcase-card h-[250px] flex items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <HoverBorderGradient duration={2} clockwise={true} className="px-6 py-2">
            Slow Clockwise
          </HoverBorderGradient>
          <span className="text-xs text-neutral-400">duration: 2s</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <HoverBorderGradient duration={0.5} clockwise={false} className="px-6 py-2">
            Fast Counter-Clockwise
          </HoverBorderGradient>
          <span className="text-xs text-neutral-400">duration: 0.5s</span>
        </div>
      </div>

      <CodeBlock code={`<HoverBorderGradient duration={2} clockwise={true}>
  Slow Clockwise
</HoverBorderGradient>

<HoverBorderGradient duration={0.5} clockwise={false}>
  Fast Counter
</HoverBorderGradient>`} />

      <h2 className="docs-category-subtitle">Action Row</h2>
      <p className="docs-paragraph">
        Wrap smaller actions when you want a subtle premium accent without turning the entire panel into a hero component.
      </p>
      <div className="docs-showcase-card h-[240px] flex items-center justify-center">
        <div className="flex flex-wrap gap-4">
          <HoverBorderGradient>
            <span className="font-medium">Review order</span>
          </HoverBorderGradient>
          <HoverBorderGradient clockwise={false} duration={1.5}>
            <span className="font-medium">Assign auditor</span>
          </HoverBorderGradient>
        </div>
      </div>

      <CodeBlock code={`<HoverBorderGradient>
  <span>Review order</span>
</HoverBorderGradient>`} />

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
              <td className="docs-prop-name">duration</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>1</td>
              <td>Animation cycle duration in seconds</td>
            </tr>
            <tr>
              <td className="docs-prop-name">clockwise</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>true</td>
              <td>Direction of the gradient rotation</td>
            </tr>
            <tr>
              <td className="docs-prop-name">containerClassName</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>CSS class for the outer container</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>CSS class for the inner content wrapper</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Background Gradient', route: '/ui-basics/background-gradient-animation' }}
        next={{ label: 'Button Hover Border', route: '/ui-basics/button-hover-border-gradient' }}
      />
    </section>
  );
};

export default HoverBorderGradientDoc;
