import { Button } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";
import { useSearch } from "@/hooks/useSearch";

const SearchDoc = () => {
  const { toggleSearch } = useSearch();

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Search</h1>
      <p className="docs-paragraph">
        The docs site includes a global component search dialog so users can
        jump directly to components, charts, and reference pages from anywhere
        in the app.
      </p>

      <h2 className="docs-category-subtitle">Interactive Demo</h2>
      <p className="docs-paragraph mb-4">
        Open the dialog with a click or use the same shortcuts the app registers
        globally.
      </p>

      <div className="docs-showcase-card">
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex flex-wrap justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-700">
              Command + K
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-700">
              Control + K
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-700">
              /
            </span>
          </div>

          <Button label="Open Search Dialog" primary onClick={toggleSearch} />

          <div className="flex flex-wrap justify-center gap-2">
            {["button", "data table", "dialog", "chart", "tooltip"].map(
              (query) => (
                <span
                  key={query}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  Try: {query}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <CodeBlock
        code={`import { Button } from 'erp-pro-ui';
    import { useSearch } from '@/hooks/useSearch';

export function SearchTrigger() {
  const { toggleSearch } = useSearch();

  return (
    <Button
      label="Open component search"
      onClick={toggleSearch}
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">What The Search Dialog Handles</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            Fuzzy matching
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Queries are matched against both category names and component names,
            so users do not need exact spelling to find a page quickly.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            Keyboard navigation
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Arrow keys or tab move the active result, and Enter confirms the
            current selection.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            Route-aware results
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Selecting a result immediately navigates to the matching category
            and component slug.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            Scroll-state feedback
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Top and bottom gradients indicate more results while the highlighted
            item is kept in view during keyboard navigation.
          </p>
        </div>
      </div>

      <h2 className="docs-category-subtitle">Suggested Integration Pattern</h2>
      <p className="docs-paragraph mb-4">
        Add at least one visible trigger in the header or command bar, then keep
        the global keyboard shortcut for repeat users.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 md:grid-cols-3">
          {[
            {
              title: "Header trigger",
              body: "Place a visible button near navigation so new users discover search quickly.",
            },
            {
              title: "Shortcut hint",
              body: "Show the keyboard shortcut in the trigger label, tooltip, or header utility bar.",
            },
            {
              title: "Relevant indexing",
              body: "Keep category metadata accurate so results reflect the real information architecture.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        code={`// Search dialog behavior in this app:
// - Command/Ctrl + K and / open the dialog
// - Results are matched against categories and component names
// - Arrow keys, Tab, and Enter support full keyboard selection
// - Choosing a result navigates directly to the target docs route`}
      />

      <DocsButtonBar prev={{ label: "Icons", route: "/ui-basics/icons" }} />
    </section>
  );
};

export default SearchDoc;
