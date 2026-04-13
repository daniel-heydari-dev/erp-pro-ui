import { SplashCursor } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const SplashCursorDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Splash Cursor</h1>
      <p className="docs-paragraph">
        Add interactive particle effects that respond to mouse movement and
        clicks within a specific container.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <p className="docs-paragraph">
        The default variant creates a "splash" of particles as you move your
        mouse.
      </p>
      <div className="docs-showcase-card h-100">
        <SplashCursor className="w-full h-full flex items-center justify-center bg-neutral-900/10 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700">
          <div className="text-neutral-400 font-medium">
            Move or click anywhere in this area
          </div>
        </SplashCursor>
      </div>

      <CodeBlock
        code={`import { SplashCursor } from 'erp-pro-ui';

export function BasicSplashCursorExample() {
  return (
    <SplashCursor className="flex h-100 w-full items-center justify-center rounded-xl border border-dashed">
      <div>Content inside the interactive area</div>
    </SplashCursor>
  );
}`}
      />

      {/* Variants */}
      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        Choose from different particle behaviors like trail, ripple, or glow.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold px-1">Trail Variant</h4>
          <div className="docs-showcase-card h-50">
            <SplashCursor
              variant="trail"
              particleCount={20}
              className="w-full h-full flex items-center justify-center"
            >
              <span className="text-xs text-neutral-400">Trail Effect</span>
            </SplashCursor>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold px-1">Ripple Variant</h4>
          <div className="docs-showcase-card h-50">
            <SplashCursor
              variant="ripple"
              className="w-full h-full flex items-center justify-center"
            >
              <span className="text-xs text-neutral-400">Click for Ripple</span>
            </SplashCursor>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold px-1">Glow Variant</h4>
          <div className="docs-showcase-card h-50">
            <SplashCursor
              variant="glow"
              blur={20}
              className="w-full h-full flex items-center justify-center"
            >
              <span className="text-xs text-neutral-400">Smooth Glow</span>
            </SplashCursor>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold px-1">Burst Variant</h4>
          <div className="docs-showcase-card h-50">
            <SplashCursor
              variant="splash"
              particleCount={30}
              duration={1200}
              className="w-full h-full flex items-center justify-center"
            >
              <span className="text-xs text-neutral-400">Large Burst</span>
            </SplashCursor>
          </div>
        </div>
      </div>

      <CodeBlock
        code={`import { SplashCursor } from 'erp-pro-ui';

export function SplashCursorVariantsExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SplashCursor variant="trail" className="h-50 rounded-xl border">Trail</SplashCursor>
      <SplashCursor variant="ripple" className="h-50 rounded-xl border">Ripple</SplashCursor>
      <SplashCursor variant="glow" blur={20} className="h-50 rounded-xl border">Glow</SplashCursor>
      <SplashCursor variant="splash" particleCount={30} duration={1200} className="h-50 rounded-xl border">Splash</SplashCursor>
    </div>
  );
}`}
      />

      {/* Custom Colors */}
      <h2 className="docs-category-subtitle">Customization</h2>
      <p className="docs-paragraph">
        You can control colors, particle sizes, and density.
      </p>
      <div className="docs-showcase-card h-75">
        <SplashCursor
          color="#ff0080"
          secondaryColor="#7928ca"
          size="lg"
          particleCount={15}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="px-6 py-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg font-bold text-ds-1">
            Custom Style
          </div>
        </SplashCursor>
      </div>

      <CodeBlock
        code={`import { SplashCursor } from 'erp-pro-ui';

export function CustomSplashCursorExample() {
  return (
    <SplashCursor
      color="#ff0080"
      secondaryColor="#7928ca"
      size="lg"
      particleCount={15}
      className="flex h-75 w-full items-center justify-center"
    >
      <div className="rounded-full bg-white px-6 py-3 font-bold text-ds-1 shadow-lg">
        Custom Style
      </div>
    </SplashCursor>
  );
}`}
      />

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
              <td className="docs-prop-name">variant</td>
              <td>
                <span className="docs-prop-type">
                  'splash' | 'trail' | 'ripple' | 'glow'
                </span>
              </td>
              <td>'splash'</td>
              <td>Visual behavior of the particles</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td>
                <span className="docs-prop-type">
                  'sm' | 'md' | 'lg' | 'xl'
                </span>
              </td>
              <td>'md'</td>
              <td>Base size of the particles</td>
            </tr>
            <tr>
              <td className="docs-prop-name">color</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Primary particle color</td>
            </tr>
            <tr>
              <td className="docs-prop-name">particleCount</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>12</td>
              <td>Number of particles created per event</td>
            </tr>
            <tr>
              <td className="docs-prop-name">duration</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>800</td>
              <td>Persistence of particles (ms)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">smooth</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Enable smooth position interpolation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Spotlight Card", route: "/ui-basics/spotlight-card" }}
        next={{ label: "Chroma Grid", route: "/ui-basics/chroma-grid" }}
      />
    </section>
  );
};

export default SplashCursorDoc;
