import { ButtonHoverBorderGradient } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const ButtonHoverBorderGradientDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Button Hover Border Gradient</h1>
      <p className="docs-paragraph">
        A pre-configured CTA button built on top of HoverBorderGradient for
        high-emphasis actions.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-62.5 flex items-center justify-center p-0">
        <div className="-mt-40">
          {" "}
          {/* Offset the component's hardcoded m-40 */}
          <ButtonHoverBorderGradient>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Launch Application</span>
            </div>
          </ButtonHoverBorderGradient>
        </div>
      </div>

      <CodeBlock
        code={`import { ButtonHoverBorderGradient } from 'erp-pro-ui';

<ButtonHoverBorderGradient>
  <span>Launch Application</span>
</ButtonHoverBorderGradient>`}
      />

      <h2 className="docs-category-subtitle">Action Set</h2>
      <p className="docs-paragraph">
        Use this variant for a small group of premium calls to action such as
        demo launches or trial starts.
      </p>
      <div className="docs-showcase-card h-70 flex items-center justify-center p-0">
        <div className="-mt-40 flex flex-wrap items-center justify-center gap-8">
          <ButtonHoverBorderGradient>
            <span className="font-semibold">Watch Demo</span>
          </ButtonHoverBorderGradient>
          <ButtonHoverBorderGradient>
            <span className="font-semibold">Start Trial</span>
          </ButtonHoverBorderGradient>
        </div>
      </div>

      <CodeBlock
        code={`<div className="flex gap-6">
  <ButtonHoverBorderGradient>
    <span>Watch Demo</span>
  </ButtonHoverBorderGradient>
  <ButtonHoverBorderGradient>
    <span>Start Trial</span>
  </ButtonHoverBorderGradient>
</div>`}
      />

      {/* Styling Note */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> This component currently has a hardcoded{" "}
          <code>m-40</code> class in its source, which might require centering
          or container adjustments in your layout.
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
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>The content to display inside the button</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{
          label: "Hover Border Gradient",
          route: "/ui-basics/hover-border-gradient",
        }}
        next={{
          label: "Password Strength",
          route: "/ui-basics/password-strength-meter",
        }}
      />
    </section>
  );
};

export default ButtonHoverBorderGradientDoc;
