import DocsButtonBar from './DocsButtonBar';

const McpServer = () => {
  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        Enhance your AI development workflow with the <strong>erp-pro-ui</strong> MCP server.
      </p>

      <h3 className="docs-category-title">What is MCP?</h3>
      <p className="docs-paragraph">
        The Model Context Protocol (MCP) allows AI agents to directly interact with the erp-pro-ui component library, enabling them to suggest component usage, search through documentation, and understand your design system context.
      </p>

      <h3 className="docs-category-title">Local Setup</h3>
      <p className="docs-paragraph">
        To enable the MCP server in your IDE (Cursor, Claude Desktop), add the following to your configuration:
      </p>
      <div className="bg-zinc-900 p-4 rounded-lg my-4 font-mono text-sm border border-zinc-800">
        &#123;<br />
        &nbsp;&nbsp;&quot;mcpServers&quot;: &#123;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&quot;erp-pro-ui&quot;: &#123;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;command&quot;: &quot;npx&quot;,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;args&quot;: [&quot;-y&quot;, &quot;erp-pro-mcp-server&quot;]<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
        &nbsp;&nbsp;&#125;<br />
        &#125;
      </div>

      <DocsButtonBar />
    </section>
  );
};

export default McpServer;
