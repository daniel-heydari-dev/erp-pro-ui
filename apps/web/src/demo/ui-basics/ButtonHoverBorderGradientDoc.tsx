import { ButtonHoverBorderGradient } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const ButtonHoverBorderGradientDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Button Hover Border Gradient</h1>
      <p className="docs-paragraph">
        A pre-configured button component utilizing the HoverBorderGradient for a futuristic aesthetic.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[250px] flex items-center justify-center p-0">
        <div className="-mt-40"> {/* Offset the component's hardcoded m-40 */}
          <ButtonHoverBorderGradient>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Launch Application</span>
            </div>
          </ButtonHoverBorderGradient>
        </div>
      </div>

      <CodeBlock code={`import { ButtonHoverBorderGradient } from '@erp-pro/ui';

<ButtonHoverBorderGradient>
  <span>Launch Application</span>
</ButtonHoverBorderGradient>`} />

      {/* Styling Note */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> This component currently has a hardcoded <code>m-40</code> class in its source, which might require centering or container adjustments in your layout.
        </p>
      </div>

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
              <td className="docs-prop-name">children</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>The content to display inside the button</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Hover Border Gradient', route: '/ui-basics/hover-border-gradient' }}
        next={{ label: 'Password Strength', route: '/ui-basics/password-strength-meter' }}
      />
    </section>
  );
};

export default ButtonHoverBorderGradientDoc;
