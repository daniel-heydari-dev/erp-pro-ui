import { Preview } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const PreviewDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Preview Showcase</h1>
      <p className="docs-paragraph">
        A hero-style integration page that combines multiple components including Carousel, Gradual Blur, and Animated Content into a cohesive landing page experience.
      </p>

      {/* Live Preview */}
      <h2 className="docs-category-subtitle">Live Showcase</h2>
      <p className="docs-paragraph">
        Below is the full <code>Preview</code> component rendered in a container.
      </p>
      <div className="docs-showcase-card h-[600px] overflow-y-auto p-0 border-none shadow-2xl rounded-2xl">
        <Preview />
      </div>

      <CodeBlock code={`import { Preview } from '@erp-pro/ui';

/* Render the full showcase page */
<Preview />`} />

      {/* Rationale */}
      <h2 className="docs-category-subtitle">Integration Philosophy</h2>
      <p className="docs-paragraph">
        The <code>Preview</code> component serves as a reference implementation for:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-400 mb-8">
        <li><strong>Layering:</strong> Using Animated Content over Carousel transitions.</li>
        <li><strong>Reveal:</strong> Using Gradual Blur for scroll-based section entrances.</li>
        <li><strong>Consistency:</strong> Maintaining glassmorphism across diverse component types.</li>
      </ul>

      <DocsButtonBar
        prev={{ label: 'Carousel', route: '/ui-basics/carousel' }}
        next={{ label: 'Accordion', route: '/ui-basics/accordion' }}
      />
    </section>
  );
};

export default PreviewDoc;
