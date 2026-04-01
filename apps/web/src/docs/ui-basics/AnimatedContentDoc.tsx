import { useState } from "react";
import { AnimatedContent, Button } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const AnimatedContentDoc = () => {
  const [key, setKey] = useState(0);

  const replay = () => setKey((prev) => prev + 1);

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Animated Content</h1>
      <p className="docs-paragraph">
        A powerful wrapper component to add entrance and exit animations to any
        child element using Framer Motion presets.
      </p>

      {/* Basic Presets */}
      <h2 className="docs-category-subtitle">Animation Presets</h2>
      <p className="docs-paragraph">
        Choose from a variety of built-in presets like fade, scale, slide,
        bounce, and flip.
      </p>
      <div className="docs-showcase-card h-auto p-8 flex flex-col items-center gap-12">
        <Button onClick={replay} className="mb-4">
          Replay Animations
        </Button>

        <div
          key={key}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl"
        >
          <div className="flex flex-col items-center gap-2">
            <AnimatedContent preset="fade" duration={0.8}>
              <div className="w-20 h-20 bg-accent-subtle rounded-lg flex items-center justify-center border border-accent/20 text-accent font-bold">
                Fade
              </div>
            </AnimatedContent>
            <span className="text-xs text-neutral-400">fade</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AnimatedContent preset="scale" duration={0.8} delay={0.2}>
              <div className="w-20 h-20 bg-accent-subtle rounded-lg flex items-center justify-center border border-accent/20 text-accent font-bold">
                Scale
              </div>
            </AnimatedContent>
            <span className="text-xs text-neutral-400">scale</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AnimatedContent preset="slideUp" duration={0.8} delay={0.4}>
              <div className="w-20 h-20 bg-accent-subtle rounded-lg flex items-center justify-center border border-accent/20 text-accent font-bold">
                Slide Up
              </div>
            </AnimatedContent>
            <span className="text-xs text-neutral-400">slideUp</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AnimatedContent preset="bounce" duration={1} delay={0.6}>
              <div className="w-20 h-20 bg-accent-subtle rounded-lg flex items-center justify-center border border-accent/20 text-accent font-bold">
                Bounce
              </div>
            </AnimatedContent>
            <span className="text-xs text-neutral-400">bounce</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AnimatedContent preset="flip" duration={0.8} delay={0.8}>
              <div className="w-20 h-20 bg-accent-subtle rounded-lg flex items-center justify-center border border-accent/20 text-accent font-bold">
                Flip
              </div>
            </AnimatedContent>
            <span className="text-xs text-neutral-400">flip</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AnimatedContent preset="zoom" duration={0.8} delay={1}>
              <div className="w-20 h-20 bg-accent-subtle rounded-lg flex items-center justify-center border border-accent/20 text-accent font-bold">
                Zoom
              </div>
            </AnimatedContent>
            <span className="text-xs text-neutral-400">zoom</span>
          </div>
        </div>
      </div>

      <CodeBlock
        code={`import { AnimatedContent } from 'erp-pro-ui';

<AnimatedContent preset="fade">
  <div>Content to animate</div>
</AnimatedContent>

<AnimatedContent preset="bounce" delay={0.5} duration={1}>
  <div>Bouncy content</div>
</AnimatedContent>`}
      />

      {/* Easing Options */}
      <h2 className="docs-category-subtitle">Easing & Curves</h2>
      <p className="docs-paragraph">
        Fine-tune the animation feel with different easing functions.
      </p>
      <div className="docs-showcase-card h-62.5 flex items-center justify-center gap-12">
        <div key={`ease-${key}`} className="flex gap-8">
          <AnimatedContent preset="slideRight" ease="backOut" duration={1}>
            <div className="px-6 py-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 font-bold">
              Back Out
            </div>
          </AnimatedContent>
          <AnimatedContent
            preset="slideRight"
            ease="anticipate"
            duration={1}
            delay={0.3}
          >
            <div className="px-6 py-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 font-bold">
              Anticipate
            </div>
          </AnimatedContent>
        </div>
      </div>

      <CodeBlock
        code={`<AnimatedContent preset="slideRight" ease="backOut">...</AnimatedContent>`}
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
              <td className="docs-prop-name">preset</td>
              <td>
                <span className="docs-prop-type">AnimationPreset</span>
              </td>
              <td>'fade'</td>
              <td>
                fade, scale, slideUp, slideDown, slideLeft, slideRight, elastic,
                bounce, flip, zoom
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">ease</td>
              <td>
                <span className="docs-prop-type">AnimationEase</span>
              </td>
              <td>'easeOut'</td>
              <td>
                linear, easeIn, easeOut, easeInOut, circIn, circOut, backIn,
                backOut, bounce, elastic, etc.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">duration</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>0.5</td>
              <td>Animation duration in seconds</td>
            </tr>
            <tr>
              <td className="docs-prop-name">delay</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>0</td>
              <td>Wait time before starting (s)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">triggerOnView</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Whether to wait until enters viewport</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disappearAfter</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>0</td>
              <td>Time after which the component should animate out (s)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Gradual Blur", route: "/ui-basics/gradual-blur" }}
        next={{
          label: "Background Gradient",
          route: "/ui-basics/background-gradient-animation",
        }}
      />
    </section>
  );
};

export default AnimatedContentDoc;
