import DocsButtonBar from './DocsButtonBar';

const Installation = () => {
  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        Quickly integrate <strong>erp-pro-ui</strong> into your local workspace.
      </p>

      <h3 className="docs-category-title">1. Install Dependencies</h3>
      <p className="docs-paragraph">Run the following command in your terminal:</p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800">
        pnpm install @erp-pro/ui
      </div>

      <h3 className="docs-category-title">2. Import Styles</h3>
      <p className="docs-paragraph">Add the global CSS to your root application file:</p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800">
        import &apos;@erp-pro/ui/styles.css&apos;;
      </div>

      <h3 className="docs-category-title">3. Tailwind Configuration</h3>
      <p className="docs-paragraph">
        To ensure Tailwind picks up the styles from the library, add the package to your <code>tailwind.config.js</code>:
      </p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800 text-blue-400">
        <pre>{`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@erp-pro/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}`}</pre>
      </div>

      <h3 className="docs-category-title">4. Custom Fonts</h3>
      <p className="docs-paragraph">
        Our library uses <strong>Geist</strong> (Primary) and <strong>Bebas Neue</strong> (Display). Ensure these are loaded in your global CSS:
      </p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800 text-purple-400">
        <pre>{`@font-face {
  font-family: "Geist";
  src: url("/fonts/Geist-Variable.woff2") format("woff2");
}

@font-face {
  font-family: "Bebas Neue";
  src: url("/fonts/BebasNeue-Regular.woff2") format("woff2");
}`}</pre>
      </div>

      <h3 className="docs-category-title">5. Start Building</h3>
      <p className="docs-paragraph">Import components anywhere in your React app:</p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800">
        import &#123; Button &#125; from &apos;@erp-pro/ui&apos;;
      </div>

      <DocsButtonBar next={{ label: 'MCP Server', route: '/get-started/mcp' }} />
    </section>
  );
};

export default Installation;
