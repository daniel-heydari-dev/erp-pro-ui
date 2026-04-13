import {
  SkeletonCard,
  SkeletonComponent as Skeleton,
  SkeletonListItem,
  SkeletonMetricCard,
  SkeletonTableRow,
} from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const SkeletonDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Skeleton</h1>
      <p className="docs-paragraph">
        Skeleton placeholders preserve layout while real content is loading.
        They are ideal for feed items, cards, tables, and any view where sudden
        layout shift would feel abrupt.
      </p>

      <h2 className="docs-category-subtitle">Text Blocks</h2>
      <p className="docs-paragraph mb-4">
        The text variant can render multiple lines in one call, and now supports
        theme-aware tones, radius presets, and faster or slower motion so the
        loading state matches the final surface.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl rounded-md border border-ds-border-2 bg-ds-surface-1 p-6">
          <Skeleton
            lines={4}
            height={14}
            lineGap={12}
            lastLineWidth="58%"
            tone="accent"
            animation="wave"
            radius="md"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { SkeletonComponent as Skeleton } from 'erp-pro-ui';

<Skeleton
  lines={4}
  height={14}
  lineGap={12}
  lastLineWidth="58%"
  tone="accent"
  animation="wave"
  radius="md"
/>`}
      />

      <h2 className="docs-category-subtitle">Light And Dark Modes</h2>
      <p className="docs-paragraph mb-4">
        Skeleton uses the shared semantic token system, so it adapts to both
        light and dark mode automatically when your app is wrapped in
        ThemeProvider or when a container sets data-mode.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 lg:grid-cols-2">
          {(
            [
              { mode: "light", label: "Light" },
              { mode: "dark", label: "Dark" },
            ] as const
          ).map((item) => (
            <div
              key={item.mode}
              data-mode={item.mode}
              className="rounded-md border border-ds-border-2 bg-ds-canvas p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ds-1">
                    {item.label}
                  </p>
                  <p className="text-xs uppercase tracking-[0.16em] text-ds-2">
                    data-mode=&quot;{item.mode}&quot;
                  </p>
                </div>
                <span className="rounded-full bg-ds-accent-subtle px-3 py-1 text-xs font-medium text-ds-1">
                  mode
                </span>
              </div>

              <div className="space-y-4">
                <SkeletonMetricCard tone="accent" />
                <div className="rounded-md border border-ds-border-2 bg-ds-surface-1 p-4">
                  <Skeleton
                    lines={3}
                    height={12}
                    lineGap={10}
                    lastLineWidth="54%"
                    tone="subtle"
                    animation="wave"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        code={`import { SkeletonComponent as Skeleton, ThemeProvider } from 'erp-pro-ui';

<ThemeProvider>
  <Skeleton tone="accent" animation="wave" lines={3} />
</ThemeProvider>

<section data-mode="dark">
  <Skeleton tone="subtle" animation="wave" lines={3} />
</section>`}
      />

      <h2 className="docs-category-subtitle">Modern Metric Cards</h2>
      <p className="docs-paragraph mb-4">
        The library now includes a metric-card preset for analytics dashboards,
        with optional trend chips and spark bars.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 lg:grid-cols-3">
          <SkeletonMetricCard />
          <SkeletonMetricCard tone="success" />
          <SkeletonMetricCard tone="info" showTrend={false} />
        </div>
      </div>

      <CodeBlock
        code={`import { SkeletonMetricCard } from 'erp-pro-ui';

<SkeletonMetricCard />
<SkeletonMetricCard tone="success" />
<SkeletonMetricCard tone="info" showTrend={false} />`}
      />

      <h2 className="docs-category-subtitle">Content Feed Presets</h2>
      <p className="docs-paragraph mb-4">
        Use the shipped card and list presets when you want richer shells with
        minimal wiring.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <SkeletonCard showAvatar showActions animation="wave" tone="accent" />
          <div className="rounded-md border border-ds-border-2 bg-ds-surface-1 p-4">
            <div className="space-y-4">
              <SkeletonListItem animation="wave" showAction />
              <SkeletonListItem animation="wave" showAction />
              <SkeletonListItem animation="wave" showSecondaryText={false} />
            </div>
          </div>
        </div>
      </div>

      <CodeBlock
        code={`import { SkeletonCard, SkeletonListItem } from 'erp-pro-ui';

<SkeletonCard showAvatar showActions animation="wave" tone="accent" />

    <SkeletonListItem animation="wave" showAction />`}
      />

      <h2 className="docs-category-subtitle">Dense Table Placeholder</h2>
      <p className="docs-paragraph mb-4">
        For data-heavy views, the table-row preset keeps loading states aligned
        with compact admin layouts.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-4xl overflow-hidden rounded-md border border-ds-border-2 bg-ds-surface-1 px-4 py-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonTableRow
              key={index}
              columns={5}
              animation="wave"
              className="border-b border-ds-border-2 last:border-b-0"
            />
          ))}
        </div>
      </div>

      <CodeBlock
        code={`import { SkeletonTableRow } from 'erp-pro-ui';

{Array.from({ length: 5 }).map((_, index) => (
  <SkeletonTableRow
    key={index}
    columns={5}
    animation="wave"
    className="border-b border-ds-border-2 last:border-b-0"
  />
))}`}
      />

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
              <td>
                <span className="docs-prop-type">
                  'text' | 'circular' | 'rectangular' | 'rounded'
                </span>
              </td>
              <td>'text'</td>
              <td>Defines the shape of the placeholder block</td>
            </tr>
            <tr>
              <td className="docs-prop-name">animation</td>
              <td>
                <span className="docs-prop-type">
                  'pulse' | 'wave' | 'none'
                </span>
              </td>
              <td>'pulse'</td>
              <td>
                Controls whether the placeholder pulses, shimmers, or stays
                static
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">tone</td>
              <td>
                <span className="docs-prop-type">
                  'default' | 'subtle' | 'accent' | 'success' | 'warning' |
                  'danger' | 'info'
                </span>
              </td>
              <td>'default'</td>
              <td>
                Maps the placeholder to semantic theme surfaces instead of a
                single hardcoded neutral fill
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">radius</td>
              <td>
                <span className="docs-prop-type">
                  'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
                </span>
              </td>
              <td>variant based</td>
              <td>
                Applies semantic corner presets without hand-authoring a pixel
                radius each time
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">speed</td>
              <td>
                <span className="docs-prop-type">
                  'slow' | 'normal' | 'fast' | number | string
                </span>
              </td>
              <td>'normal'</td>
              <td>
                Adjusts the pulse or shimmer timing for calmer or more active
                loading motion
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">width / height</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>auto</td>
              <td>
                Explicit dimensions for single-line or shaped placeholders
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">lines</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>1</td>
              <td>Number of lines rendered for the text variant</td>
            </tr>
            <tr>
              <td className="docs-prop-name">lineGap</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>8</td>
              <td>Spacing between text rows when rendering multiple lines</td>
            </tr>
            <tr>
              <td className="docs-prop-name">lastLineWidth</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>'80%'</td>
              <td>
                Lets the final text row end shorter for a more realistic
                placeholder
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">borderRadius</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>-</td>
              <td>
                Overrides the default corner rounding for custom placeholder
                shapes
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        previous={{ label: "Loading", route: "/ui-basics/loading" }}
        next={{ label: "Area Chart", route: "/ui-basics/area-chart" }}
      />
    </section>
  );
};

export default SkeletonDoc;
