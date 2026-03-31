import { GradualBlur } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";
import { useState } from "react";

const GradualBlurDoc = () => {
  const [visible, setVisible] = useState(false);

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Gradual Blur</h1>
      <p className="docs-paragraph">
        Smoothly transition content from blurred/ghostly to clear, often used
        for scroll reveal effects.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Scroll Reveal</h2>
      <p className="docs-paragraph">
        By default, it triggers when the component enters the viewport.
      </p>
      <div className="docs-showcase-card h-[400px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-800/50 rounded-xl overflow-y-auto">
        <div className="h-[800px] w-full flex flex-col items-center justify-center gap-20">
          <div className="text-neutral-500 italic">
            Scroll down to see the effect
          </div>
          <GradualBlur
            blur={12}
            duration={1}
            className="p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl max-w-sm text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Revealed Content</h3>
            <p className="text-neutral-500">
              I appeared smoothly from a blur as you scrolled into view.
            </p>
          </GradualBlur>
        </div>
      </div>

      <CodeBlock
        code={`import { GradualBlur } from 'erp-pro-ui';

<GradualBlur blur={12} duration={1}>
  <h3>Revealed Content</h3>
  <p>I appeared smoothly...</p>
</GradualBlur>`}
      />

      {/* Directional Animations */}
      <h2 className="docs-category-subtitle">Directional Reveal</h2>
      <p className="docs-paragraph">
        Combine blur with directional movement for a more dynamic entrance.
      </p>
      <div className="docs-showcase-card min-h-[400px] flex-row! flex-wrap! items-center! justify-center! gap-12 py-16">
        <GradualBlur direction="top" distance={40} delay={0.1}>
          <div className="w-28 h-28 bg-blue-500/10 rounded-2xl flex flex-col items-center justify-center border border-blue-500/20 shadow-lg backdrop-blur-sm group hover:border-blue-500/50 transition-colors">
            <span className="text-2xl mb-1 group-hover:-translate-y-1 transition-transform">
              ↑
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Up
            </span>
          </div>
        </GradualBlur>
        <GradualBlur direction="bottom" distance={40} delay={0.2}>
          <div className="w-28 h-28 bg-purple-500/10 rounded-2xl flex flex-col items-center justify-center border border-purple-500/20 shadow-lg backdrop-blur-sm group hover:border-purple-500/50 transition-colors">
            <span className="text-2xl mb-1 group-hover:translate-y-1 transition-transform">
              ↓
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Down
            </span>
          </div>
        </GradualBlur>
        <GradualBlur direction="left" distance={40} delay={0.3}>
          <div className="w-28 h-28 bg-emerald-500/10 rounded-2xl flex flex-col items-center justify-center border border-emerald-500/20 shadow-lg backdrop-blur-sm group hover:border-emerald-500/50 transition-colors">
            <span className="text-2xl mb-1 group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Left
            </span>
          </div>
        </GradualBlur>
        <GradualBlur direction="right" distance={40} delay={0.4}>
          <div className="w-28 h-28 bg-amber-500/10 rounded-2xl flex flex-col items-center justify-center border border-amber-500/20 shadow-lg backdrop-blur-sm group hover:border-amber-500/50 transition-colors">
            <span className="text-2xl mb-1 group-hover:translate-x-1 transition-transform">
              →
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Right
            </span>
          </div>
        </GradualBlur>
      </div>

      <CodeBlock
        code={`<GradualBlur direction="top" distance={40} delay={0.1}>...</GradualBlur>
<GradualBlur direction="bottom" distance={40} delay={0.2}>...</GradualBlur>`}
      />

      {/* Manual Trigger */}
      <h2 className="docs-category-subtitle">Manual Trigger</h2>
      <div className="docs-showcase-card h-[250px] flex flex-col items-center justify-center gap-6">
        <button
          onClick={() => setVisible(!visible)}
          className="docs-button docs-button-primary"
        >
          {visible ? "Hide" : "Show"} Component
        </button>

        <GradualBlur
          triggerOnView={false}
          visible={visible}
          blur={20}
          duration={0.8}
        >
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 font-bold">
            Manually Triggered
          </div>
        </GradualBlur>
      </div>

      <CodeBlock
        code={`<GradualBlur
  triggerOnView={false}
  visible={isVisible}
  blur={20}
>
  ...
</GradualBlur>`}
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
              <td className="docs-prop-name">blur</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>8</td>
              <td>Starting blur amount in pixels</td>
            </tr>
            <tr>
              <td className="docs-prop-name">duration</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>0.5</td>
              <td>Duration of the reveal transition (s)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">direction</td>
              <td>
                <span className="docs-prop-type">
                  &apos;top&apos; | &apos;bottom&apos; | &apos;left&apos; |
                  &apos;right&apos; | &apos;none&apos;
                </span>
              </td>
              <td>'none'</td>
              <td>Optional direction to move from while fading in</td>
            </tr>
            <tr>
              <td className="docs-prop-name">triggerOnView</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Whether to trigger when component enters viewport</td>
            </tr>
            <tr>
              <td className="docs-prop-name">visible</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Controlled visibility (when triggerOnView is false)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Color Palette", route: "/ui-basics/color-palette" }}
        next={{
          label: "Animated Content",
          route: "/ui-basics/animated-content",
        }}
      />
    </section>
  );
};

export default GradualBlurDoc;
