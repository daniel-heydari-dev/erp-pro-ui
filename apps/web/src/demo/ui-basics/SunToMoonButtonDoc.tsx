import { SunToMoonButton } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const SunToMoonButtonDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Sun to Moon Button</h1>
      <p className="docs-paragraph">
        A premium theme toggle button featuring intricate SVG path morphing and ray animations.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Interactive Toggle</h2>
      <p className="docs-paragraph">
        Click the button to see the sun morph into a moon with spring-based animations.
      </p>
      <div className="docs-showcase-card h-[250px] flex items-center justify-center">
        <div className="w-48">
          <SunToMoonButton showLabelAndImage={true} />
        </div>
      </div>

      <CodeBlock code={`import { SunToMoonButton } from 'erp-pro-ui';

/* Full version with label and mockup */
<SunToMoonButton showLabelAndImage={true} />

/* Icon only version */
<SunToMoonButton showLabelAndImage={false} />`} />

      {/* Variant */}
      <h2 className="docs-category-subtitle">Icon Only</h2>
      <div className="docs-showcase-card h-[200px] flex items-center justify-center">
        <div className="w-20">
          <SunToMoonButton showLabelAndImage={false} />
        </div>
      </div>

      <CodeBlock code={`<SunToMoonButton showLabelAndImage={false} />`} />

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
