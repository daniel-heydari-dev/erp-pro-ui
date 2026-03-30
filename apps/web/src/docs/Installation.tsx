import DocsButtonBar from './DocsButtonBar';

const Installation = () => {
  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        Quickly integrate <strong>erp-pro-ui</strong> into your local workspace.
      </p>

      <h3 className="docs-category-title">1. Install Dependencies</h3>
      <p className="docs-paragraph">
        Run the following command in your terminal:
      </p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800">
        pnpm install erp-pro-ui
      </div>

      <h3 className="docs-category-title">2. Import Styles</h3>
      <p className="docs-paragraph">
        Add Tailwind and the shared library stylesheet to your root app CSS
        file. This gives you the shared theme tokens, font stacks, and base
        foundation styles:
      </p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800 text-emerald-300">
        <pre>{`@import "tailwindcss";
@import "erp-pro-ui/styles.css";`}</pre>
      </div>

      <h3 className="docs-category-title">3. Tailwind Setup</h3>
      <p className="docs-paragraph">
        Tailwind v4 does not need extra content configuration for this package.
        Keep the imports in your app stylesheet and wrap your app with{' '}
        <code>ThemeProvider</code>.
      </p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800 text-blue-400">
        <pre>{`import { ThemeProvider } from "erp-pro-ui";

createRoot(rootElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);`}</pre>
      </div>

      <h3 className="docs-category-title">4. Optional Font Loading</h3>
      <p className="docs-paragraph">
        <strong>erp-pro-ui</strong> now ships the <strong>Geist</strong> font
        family inside <code>erp-pro-ui/styles.css</code>, so your app gets the
        default sans stack automatically. Display fonts such as{' '}
        <strong>Bebas Neue</strong> remain optional and can still be loaded by
        the host app when needed:
      </p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800 text-purple-400">
        <pre>{`/* Geist is already bundled by erp-pro-ui/styles.css */

@font-face {
  font-family: "Bebas Neue";
  src: url("/fonts/BebasNeue-Regular.woff2") format("woff2");
}

body {
  font-family: var(--font-sans);
}`}</pre>
      </div>

      <h3 className="docs-category-title">5. Start Building</h3>
      <p className="docs-paragraph">
        Import components anywhere in your React app:
      </p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800">
        import &#123; Button &#125; from &apos;erp-pro-ui&apos;;
      </div>

      <DocsButtonBar
        next={{ label: 'MCP Server', route: '/get-started/mcp' }}
      />
    </section>
  );
};

export default Installation;
