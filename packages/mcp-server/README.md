# erp-pro-ui-mcp-server

MCP server for `erp-pro-ui` component discovery, setup guidance, and exact import-path lookup.

## What It Exposes

The server is backed by the portable docs bundle shipped from `erp-pro-ui/docs`.
It gives MCP clients a stable way to:

- inspect the library overview
- list components by category or status
- search components by keyword or capability
- fetch exact component docs with import paths and docs links
- retrieve installation and setup guidance
- read stable resource URIs for the docs bundle and per-component records
- request ready-to-use prompt templates for setup and integration workflows

## Run with npx

```bash
npx -y erp-pro-ui-mcp-server
```

## IDE Configuration

```json
{
  "mcpServers": {
    "erp-pro-ui": {
      "command": "npx",
      "args": ["-y", "erp-pro-ui-mcp-server"]
    }
  }
}
```

## Available Tools

### `library-overview`

Returns a package summary, feature highlights, and component category counts.

### `list-components`

Lists components and supports these optional filters:

- `category`
- `query`
- `status` (`new` or `updated`)

### `search-components`

Runs keyword search against component names, slugs, aliases, categories, Storybook titles, and summaries.

### `get-component-docs`

Returns a single component’s summary, docs URL, Storybook title, and supported root/subpath import code.

Accepted inputs:

- `slug`
- `name`

### `get-installation-guide`

Returns package setup guidance.

Supported topics:

- `all`
- `install`
- `styles`
- `providers`
- `imports`

## Available Resources

### `erp-pro-ui://library/overview`

Readable package summary with feature highlights and category counts.

### `erp-pro-ui://library/installation`

Shared installation guide covering package install, peers, styles, providers, and import strategy.

### `erp-pro-ui://library/docs-bundle`

Full structured docs payload exported from `erp-pro-ui/docs`.

### `erp-pro-ui://components/{slug}`

Structured docs payload for one component, including import paths, docs URL, aliases, and related components.

## Available Prompts

### `choose-component`

Creates a prompt that helps an AI client choose the best `erp-pro-ui` component for a product requirement.

Arguments:

- `goal`
- `constraints` (optional)

### `integrate-component`

Creates an implementation-focused prompt for one component and embeds that component’s structured resource content.

Arguments:

- `component`
- `task` (optional)

### `setup-library`

Creates a setup prompt grounded in the same installation guide exported by the package.

Arguments:

- `topic` (`all`, `install`, `styles`, `providers`, `imports`)

## Local Development

```bash
pnpm install
pnpm --filter erp-pro-ui build
pnpm --filter erp-pro-ui-mcp-server build
```

Then run the compiled server:

```bash
node packages/mcp-server/dist/cli.js
```
