import {
  Loading,
  Spinner,
  Dots,
  Pulse,
  Bars,
  Ring,
  Bounce,
  Wave,
} from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const LoadingDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Loading</h1>
      <p className="docs-paragraph">
        Loading covers both compact inline indicators and heavier waiting states
        such as overlays, blocking screens, and lightweight skeleton
        placeholders.
      </p>

      <h2 className="docs-category-subtitle">Variant Gallery</h2>
      <p className="docs-paragraph mb-4">
        The package exposes both the generic{" "}
        <span className="docs-highlight">Loading</span>
        component and direct indicator exports when you want to drop a specific
        animation into a tighter UI surface.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Spinner", element: <Spinner size="lg" /> },
            { label: "Dots", element: <Dots size="lg" /> },
            { label: "Pulse", element: <Pulse size="lg" /> },
            { label: "Bars", element: <Bars size="lg" /> },
            { label: "Ring", element: <Ring size="lg" /> },
            { label: "Bounce", element: <Bounce size="lg" /> },
            { label: "Wave", element: <Wave size="lg" /> },
            {
              label: "Skeleton",
              element: (
                <Loading
                  variant="skeleton"
                  skeletonWidth="5rem"
                  skeletonHeight="1rem"
                />
              ),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex min-h-12 items-center justify-center">
                {item.element}
              </div>
              <p className="mt-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        code={`import { Loading } from 'erp-pro-ui';

<Loading variant="ring" size="lg" text="Syncing inventory" />
<Loading variant="wave" size="sm" color="#00cfe8" />
<Loading variant="skeleton" skeletonWidth="160px" skeletonHeight="16px" />`}
      />

      <h2 className="docs-category-subtitle">Inline Status Messaging</h2>
      <p className="docs-paragraph mb-4">
        Use text when the user needs confirmation about what is currently
        happening, especially in forms, bulk actions, and background sync flows.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <Loading variant="spinner" text="Saving supplier profile" />
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <Loading
              variant="ring"
              size="lg"
              text="Generating weekly summary"
              textPosition="bottom"
            />
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <Loading
              variant="wave"
              color="#00cfe8"
              text="Publishing branch updates"
            />
          </div>
        </div>
      </div>

      <CodeBlock
        code={`<Loading variant="spinner" text="Saving supplier profile" />

<Loading
  variant="ring"
  size="lg"
  text="Generating weekly summary"
  textPosition="bottom"
/>`}
      />

      <h2 className="docs-category-subtitle">Contained Overlay</h2>
      <p className="docs-paragraph mb-4">
        The overlay mode is useful when content already exists on screen but is
        temporarily locked while a refresh or approval step is in progress.
      </p>

      <div className="docs-showcase-card">
        <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <div className="grid gap-3 p-6 md:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Pending approvals
              </p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-white">
                18
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Transfers queued
              </p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-white">
                42
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Branch sync
              </p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-white">
                94%
              </p>
            </div>
          </div>

          <Loading
            overlay
            variant="dots"
            size="lg"
            text="Refreshing operations queue"
          />
        </div>
      </div>

      <CodeBlock
        code={`<div className="relative rounded-2xl border">
  <DashboardCardContent />
  <Loading overlay variant="dots" size="lg" text="Refreshing operations queue" />
</div>`}
      />

      <h2 className="docs-category-subtitle">Skeleton Placeholder Mode</h2>
      <p className="docs-paragraph mb-4">
        For lightweight placeholders, the loading component can render an inline
        skeleton strip without switching to the dedicated skeleton component.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl space-y-3 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <Loading
            variant="skeleton"
            skeletonWidth="45%"
            skeletonHeight="18px"
          />
          <Loading
            variant="skeleton"
            skeletonWidth="100%"
            skeletonHeight="14px"
          />
          <Loading
            variant="skeleton"
            skeletonWidth="92%"
            skeletonHeight="14px"
          />
          <Loading
            variant="skeleton"
            skeletonWidth="76%"
            skeletonHeight="14px"
          />
        </div>
      </div>

      <CodeBlock
        code={`<Loading variant="skeleton" skeletonWidth="45%" skeletonHeight="18px" />
<Loading variant="skeleton" skeletonWidth="100%" skeletonHeight="14px" />
<Loading variant="skeleton" skeletonWidth="76%" skeletonHeight="14px" />`}
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
                  'spinner' | 'dots' | 'pulse' | 'bars' | 'ring' | 'bounce' |
                  'wave' | 'skeleton'
                </span>
              </td>
              <td>'spinner'</td>
              <td>Chooses which indicator or placeholder style is rendered</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td>
                <span className="docs-prop-type">
                  'xs' | 'sm' | 'md' | 'lg' | 'xl'
                </span>
              </td>
              <td>'md'</td>
              <td>Scales the indicator and matching helper text size</td>
            </tr>
            <tr>
              <td className="docs-prop-name">text</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Optional status message shown beside or below the loader</td>
            </tr>
            <tr>
              <td className="docs-prop-name">textPosition</td>
              <td>
                <span className="docs-prop-type">'right' | 'bottom'</span>
              </td>
              <td>'right'</td>
              <td>Controls whether the status text is inline or stacked</td>
            </tr>
            <tr>
              <td className="docs-prop-name">overlay</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>
                Places the loader over its nearest positioned parent container
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">fullScreen</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Turns the loader into a viewport-blocking waiting state</td>
            </tr>
            <tr>
              <td className="docs-prop-name">skeletonWidth / skeletonHeight</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>
                Controls placeholder dimensions when using the skeleton variant
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">skeletonRounded</td>
              <td>
                <span className="docs-prop-type">
                  'none' | 'sm' | 'md' | 'lg' | 'full'
                </span>
              </td>
              <td>'md'</td>
              <td>Sets the placeholder corner radius for skeleton mode</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        previous={{ label: "Data Table", route: "/ui-basics/data-table" }}
        next={{ label: "Skeleton", route: "/ui-basics/skeleton" }}
      />
    </section>
  );
};

export default LoadingDoc;
