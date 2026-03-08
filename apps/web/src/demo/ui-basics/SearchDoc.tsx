import React from 'react';
import { Button } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';
import { useSearch } from '../../components/context/SearchContext/useSearch';

const SearchDoc = () => {
  const { toggleSearch } = useSearch();

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Search Components</h1>
      <p className="docs-paragraph">
        The universal Component Search overlay provides rapid access to any component or documentation page within the application. Available instantly via keyboard shortcuts.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Interactive Demo</h2>
      <div className="docs-showcase-card">
        <div className="flex flex-col items-center justify-center py-8">
          <Button
            label="Open Search Dialog"
            primary
            onClick={() => toggleSearch()}
          />
          <p className="mt-6 text-sm text-neutral-500 flex items-center gap-1">
            Or press
            <kbd className="font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 rounded text-xs shadow-sm">⌘</kbd>
            <kbd className="font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 rounded text-xs shadow-sm">K</kbd>
            anywhere.
          </p>
        </div>
      </div>

      <CodeBlock code={`import { useSearch } from '@/components/context/SearchContext/useSearch';
import { Button } from '@erp-pro/ui';

export default function MyComponent() {
  const { toggleSearch } = useSearch();

  return (
    <Button 
      label="Open Component Search" 
      onClick={toggleSearch} 
    />
  );
}`} />

      {/* Details Section */}
      <h2 className="docs-category-subtitle">Key Features</h2>
      <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300 space-y-2 mb-8 ml-2">
        <li><strong>Fuzzy Matching:</strong> Optimized search algorithm targeting both categories and components.</li>
        <li><strong>Keyboard Navigation:</strong> Full accessibility (Up/Down arrows to navigate, Enter to select).</li>
        <li><strong>Smart Scrolling:</strong> Automatic scroll-into-view logic keeps highlighted items visible.</li>
        <li><strong>Animations:</strong> Smooth entry/exit and individual item transitions powered by Framer Motion.</li>
        <li><strong>Global Shortcuts:</strong> Always accessible via <code>⌘K</code>, <code>Ctrl+K</code>, or <code>/</code>.</li>
      </ul>

      <DocsButtonBar
        prev={{ label: 'Icons', route: '/ui-basics/icons' }}
      />
    </section>
  );
};

export default SearchDoc;
