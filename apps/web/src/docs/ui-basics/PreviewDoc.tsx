import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";
import PreviewShowcase from "./PreviewShowcase";

const PreviewDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Preview Showcase</h1>
      <p className="docs-paragraph">
        A docs-only composition example that combines multiple published
        components into a cohesive landing page experience.
      </p>

      {/* Live Preview */}
      <h2 className="docs-category-subtitle">Live Showcase</h2>
      <p className="docs-paragraph">
        This page is assembled locally from reusable library primitives instead
        of relying on a monolithic <code>Preview</code> export.
      </p>
      <div className="docs-showcase-card h-150 overflow-y-auto rounded-2xl border-none p-0 shadow-2xl">
        <PreviewShowcase />
      </div>

      <CodeBlock
        code={`import {
  AnimatedContent,
  Button,
  Carousel,
  Dialog,
  GradualBlur,
} from 'erp-pro-ui';

function MarketingShowcase() {
  return (
    <>
      <GradualBlur>
        <h1>Design System Showcase</h1>
      </GradualBlur>

      <AnimatedContent preset="scale">
        <Carousel items={items} variant="glass" />
      </AnimatedContent>

      <Button primary label="Open Dialog" onClick={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen} title="Crystal Dialog" />
    </>
  );
}`}
      />

      {/* Rationale */}
      <h2 className="docs-category-subtitle">Integration Philosophy</h2>
      <p className="docs-paragraph">
        The showcase page is intentionally not part of the published package.
        The reusable contract stays focused on primitives, while docs can still
        demonstrate composition patterns such as:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-400 mb-8">
        <li>
          <strong>Layering:</strong> Using Animated Content over Carousel
          transitions.
        </li>
        <li>
          <strong>Reveal:</strong> Using Gradual Blur for scroll-based section
          entrances.
        </li>
        <li>
          <strong>Consistency:</strong> Maintaining glassmorphism across diverse
          component types.
        </li>
      </ul>

      <DocsButtonBar
        prev={{ label: "Carousel", route: "/ui-basics/carousel" }}
        next={{ label: "Accordion", route: "/ui-basics/accordion" }}
      />
    </section>
  );
};

export default PreviewDoc;
