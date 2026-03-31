import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

const McpServer = () => {
  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        Use the <strong>erp-pro-ui</strong> MCP server to give AI tools a
        stable, queryable understanding of your component library, install
        steps, and supported import paths.
      </p>

      <h3 className="docs-category-title">What is MCP?</h3>
      <p className="docs-paragraph">
        The Model Context Protocol lets AI clients talk to a local server over
        stdio. In this package, that server exposes the reusable docs metadata
        shipped by <strong>erp-pro-ui</strong>, so editors and agents can search
        components, open exact usage details, and return setup guidance without
        scraping your docs app.
      </p>

      <h3 className="docs-category-title">Install or Run</h3>
      <p className="docs-paragraph">
        The server is published as <code>erp-pro-ui-mcp-server</code>. You can
        run it directly with <code>npx</code> or add it as a project dependency.
      </p>

      <CodeBlock language="bash" code={`npx -y erp-pro-ui-mcp-server`} />

      <h3 className="docs-category-title">IDE Configuration</h3>
      <p className="docs-paragraph">
        Add the MCP server to your editor or desktop client configuration. This
        works well for local tooling such as Cursor, Claude Desktop, or any MCP
        host that supports stdio servers.
      </p>

      <CodeBlock
        language="json"
        code={`{
  "mcpServers": {
    "erp-pro-ui": {
      "command": "npx",
      "args": ["-y", "erp-pro-ui-mcp-server"]
    }
  }
}`}
      />

      <h3 className="docs-category-title">Available Tools</h3>
      <p className="docs-paragraph">
        The server exposes a focused toolset built on top of the exported
        library docs bundle:
      </p>
      <ul className="docs-paragraph list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
        <li>
          <code>library-overview</code> for package capabilities and component
          category coverage.
        </li>
        <li>
          <code>list-components</code> for filtered inventories by category,
          status, or query.
        </li>
        <li>
          <code>search-components</code> for capability-driven discovery.
        </li>
        <li>
          <code>get-component-docs</code> for exact imports, docs URLs, and
          related components.
        </li>
        <li>
          <code>get-installation-guide</code> for setup, styling, providers, and
          import strategy guidance.
        </li>
      </ul>

      <h3 className="docs-category-title">Available Resources</h3>
      <p className="docs-paragraph">
        MCP clients can also read stable resource URIs directly. These are
        useful when a host prefers structured docs payloads over tool calls.
      </p>
      <ul className="docs-paragraph list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
        <li>
          <code>erp-pro-ui://library/overview</code> for a readable package
          summary.
        </li>
        <li>
          <code>erp-pro-ui://library/installation</code> for the full setup
          guide.
        </li>
        <li>
          <code>erp-pro-ui://library/docs-bundle</code> for the full structured
          docs payload.
        </li>
        <li>
          <code>erp-pro-ui://components/&lt;slug&gt;</code> for one component’s
          structured docs record.
        </li>
      </ul>

      <CodeBlock
        language="text"
        code={`erp-pro-ui://library/overview
erp-pro-ui://library/installation
erp-pro-ui://library/docs-bundle
erp-pro-ui://components/button`}
      />

      <h3 className="docs-category-title">Available Prompts</h3>
      <p className="docs-paragraph">
        The server also ships prompt templates for MCP hosts that support
        <code>prompts/get</code> and want a ready-made instruction payload.
      </p>
      <ul className="docs-paragraph list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
        <li>
          <code>choose-component</code> to map a product requirement to the best
          matching component.
        </li>
        <li>
          <code>integrate-component</code> to generate an implementation prompt
          for a specific component.
        </li>
        <li>
          <code>setup-library</code> to generate a package setup plan for a new
          or existing app.
        </li>
      </ul>

      <h3 className="docs-category-title">Portable Docs Export</h3>
      <p className="docs-paragraph">
        If you do not need MCP, you can still consume the same structured docs
        data directly from the package in scripts, custom docs apps, or other
        internal tooling.
      </p>

      <CodeBlock
        language="tsx"
        code={`import {
  getComponentDocByName,
  libraryDocs,
  searchComponentDocs,
} from 'erp-pro-ui/docs';

const button = getComponentDocByName('Button');
const charts = searchComponentDocs('chart');

console.log(libraryDocs.installSteps);
console.log(button?.subpathImport);
console.log(charts.map((item) => item.name));`}
      />

      <h3 className="docs-category-title">Suggested Prompts</h3>
      <p className="docs-paragraph">
        Ask your MCP-enabled assistant questions like these:
      </p>
      <ul className="docs-paragraph list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
        <li>
          Which erp-pro-ui component fits a searchable multi-select field?
        </li>
        <li>Show me the import path and docs URL for DataTable.</li>
        <li>How do I install erp-pro-ui and set up the shared stylesheet?</li>
        <li>List all overlay-related components in erp-pro-ui.</li>
        <li>
          Read the resource for button and generate an integration example.
        </li>
        <li>
          Use the integrate-component prompt for DataTable in an admin page.
        </li>
      </ul>

      <DocsButtonBar />
    </section>
  );
};

export default McpServer;
