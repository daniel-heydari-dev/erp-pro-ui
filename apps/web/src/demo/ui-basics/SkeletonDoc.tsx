import { SkeletonComponent as Skeleton } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const SkeletonDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Skeleton</h1>
      <p className="docs-paragraph">
        Skeleton placeholders preserve layout while real content is loading. They are ideal for
        feed items, cards, tables, and any view where sudden layout shift would feel abrupt.
      </p>

      <h2 className="docs-category-subtitle">Text Blocks</h2>
      <p className="docs-paragraph mb-4">
        The text variant can render multiple lines in one call, with a shorter final line to mimic
        natural paragraph rhythm.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <Skeleton lines={4} height={14} lineGap={12} lastLineWidth="58%" />
        </div>
      </div>

      <CodeBlock code={`import { SkeletonComponent as Skeleton } from 'erp-pro-ui';

<Skeleton
  lines={4}
  height={14}
  lineGap={12}
  lastLineWidth="58%"
/>`} />

      <h2 className="docs-category-subtitle">Profile And Media Layouts</h2>
      <p className="docs-paragraph mb-4">
        Compose the base component to mirror the final content structure instead of showing a single
        generic block everywhere.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-start gap-4">
              <Skeleton variant="circular" width={56} height={56} />
              <div className="flex-1">
                <Skeleton width="45%" height={16} />
                <Skeleton width="68%" height={14} className="mt-3" />
                <Skeleton width="85%" height={14} className="mt-3" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <Skeleton variant="rounded" width="100%" height={180} animation="wave" />
            <Skeleton width="40%" height={16} className="mt-4" animation="wave" />
            <Skeleton lines={2} height={14} lineGap={10} className="mt-3" animation="wave" />
          </div>
        </div>
      </div>

      <CodeBlock code={`<div className="flex items-start gap-4">
  <Skeleton variant="circular" width={56} height={56} />
  <div className="flex-1">
    <Skeleton width="45%" height={16} />
    <Skeleton width="68%" height={14} className="mt-3" />
    <Skeleton width="85%" height={14} className="mt-3" />
  </div>
</div>`} />

      <h2 className="docs-category-subtitle">Dense Table Placeholder</h2>
      <p className="docs-paragraph mb-4">
        For admin tables, repeat narrow text rows so the loading state reflects the eventual density
        of the screen.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <div className="grid grid-cols-4 gap-4 border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
            <Skeleton width="60%" height={12} />
            <Skeleton width="50%" height={12} />
            <Skeleton width="55%" height={12} />
            <Skeleton width="45%" height={12} />
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 border-b border-neutral-200 px-6 py-4 last:border-b-0 dark:border-neutral-800"
            >
              <Skeleton width="70%" height={14} />
              <Skeleton width="65%" height={14} />
              <Skeleton width="50%" height={14} />
              <Skeleton width="40%" height={14} />
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`{Array.from({ length: 4 }).map((_, index) => (
  <div key={index} className="grid grid-cols-4 gap-4 px-6 py-4">
    <Skeleton width="70%" height={14} />
    <Skeleton width="65%" height={14} />
    <Skeleton width="50%" height={14} />
    <Skeleton width="40%" height={14} />
  </div>
))}`} />

      <h2 className="docs-category-subtitle">Core Props</h2>
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
              <td><span className="docs-prop-type">'text' | 'circular' | 'rectangular' | 'rounded'</span></td>
              <td>'text'</td>
              <td>Defines the shape of the placeholder block</td>
            </tr>
            <tr>
              <td className="docs-prop-name">animation</td>
              <td><span className="docs-prop-type">'pulse' | 'wave' | 'none'</span></td>
              <td>'pulse'</td>
              <td>Controls whether the placeholder pulses, shimmers, or stays static</td>
            </tr>
            <tr>
              <td className="docs-prop-name">width / height</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>auto</td>
              <td>Explicit dimensions for single-line or shaped placeholders</td>
            </tr>
            <tr>
              <td className="docs-prop-name">lines</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>1</td>
              <td>Number of lines rendered for the text variant</td>
            </tr>
            <tr>
              <td className="docs-prop-name">lineGap</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>8</td>
              <td>Spacing between text rows when rendering multiple lines</td>
            </tr>
            <tr>
              <td className="docs-prop-name">lastLineWidth</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>'80%'</td>
              <td>Lets the final text row end shorter for a more realistic placeholder</td>
            </tr>
            <tr>
              <td className="docs-prop-name">borderRadius</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>-</td>
              <td>Overrides the default corner rounding for custom placeholder shapes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        previous={{ label: 'Loading', route: '/ui-basics/loading' }}
        next={{ label: 'Area Chart', route: '/ui-basics/area-chart' }}
      />
    </section>
  );
};

export default SkeletonDoc;
