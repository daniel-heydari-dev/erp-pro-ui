# erp-pro-ui

Typed React 19 component library for ERP, admin, and SaaS products.

This package is designed to be consumed from a different project, not only inside this monorepo. It ships compiled styles, typed components, root imports, subpath imports, icons, helpers, machine-readable docs metadata, and a publishable npm package surface.

Live docs: [daniel-heydari-dev.github.io/erp-pro-ui](https://daniel-heydari-dev.github.io/erp-pro-ui/)

## What You Get

- React 19 components for forms, overlays, navigation, data display, charts, typography, and visual effects.
- Shared theme provider and toast provider for app-level wiring.
- Flat public API with optional subpath imports for smaller consumer bundles.
- Shared icon components from one folder and one barrel export.
- Structured docs exports from `erp-pro-ui/docs` and `erp-pro-ui/catalog`.

## Installation

Install the package and its required React peer dependencies:

```bash
npm install erp-pro-ui react react-dom
```

Install optional peers only if you use the components that need them:

```bash
npm install framer-motion @tanstack/react-table three
```

### Peer Dependency Guide

| Package                 | Required | Used by                                                                                              |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `react`                 | Yes      | All components                                                                                       |
| `react-dom`             | Yes      | All components                                                                                       |
| `framer-motion`         | Optional | Dialog, Drawer, Toast, Carousel, AnimatedContent, GradualBlur, SpotlightCard, several visual effects |
| `@tanstack/react-table` | Optional | DataTable                                                                                            |
| `three`                 | Optional | 3D and visual effect components that depend on Three.js-backed rendering                             |

`recharts`, `clsx`, and `tailwind-merge` are regular package dependencies and do not need to be installed separately in the consuming app.

## Setup In Another Project

### 1. Import the package styles once

In your global stylesheet:

```css
@import "tailwindcss";
@import "erp-pro-ui/styles.css";
```

That single import already loads the packaged colors, fonts, foundations, and generated Tailwind v4 tokens. You do not need a local Tailwind theme extension just to use the library palette.

If you only want the raw design tokens without the Tailwind bridge, import the internal token layer directly instead:

```css
@import "erp-pro-ui/tokens.css";
```

If you want just the token bridge and fonts without the rest of the library styles, import them directly instead:

```css
@import "tailwindcss";
@import "erp-pro-ui/colors.css";
@import "erp-pro-ui/fonts.css";
```

### 2. Wrap the app with providers

Use `ThemeProvider` if you want the built-in light/dark theme context. Use `ToastProvider` if you want to call `useToast()` anywhere in the app.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, ToastProvider } from "erp-pro-ui";

import "./styles.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
```

### 3. Start using components

```tsx
import { Button, Card, Input, Typography } from "erp-pro-ui";

export function App() {
  return (
    <Card>
      <Typography variant="h2">Welcome</Typography>
      <Input label="Email" placeholder="you@company.com" />
      <Button primary>Continue</Button>
    </Card>
  );
}
```

### Next.js note

If you use Next.js, import `erp-pro-ui/styles.css` from your app-level global stylesheet and place `ThemeProvider` and `ToastProvider` in your shared app provider wrapper or root layout client boundary.

## Colors And Fonts In Another Project

The library now ships a two-layer theme contract so another project can use the same tokens without copying theme config:

- `erp-pro-ui/tokens.css`: raw `--ds-*` tokens plus compatibility CSS variables
- `erp-pro-ui/colors.css`: Tailwind v4 `@theme` bridge that generates semantic utilities
- `erp-pro-ui/styles.css`: full package stylesheet, including fonts, tokens, bridge, foundations, and animations

### Use the generated utility classes

After importing `erp-pro-ui/styles.css` or `erp-pro-ui/colors.css`, you can use the semantic Tailwind v4 utilities directly:

```tsx
export function ThemePreview() {
  return (
    <section className="bg-surface text-fg border border-border rounded-2xl p-6 shadow-2 font-sans">
      <h2 className="text-accent text-2xl font-semibold">
        Semantic theme utilities
      </h2>
      <p className="text-fg-muted">
        These classes come from erp-pro-ui. No local Tailwind theme extension is
        required.
      </p>
      <div className="mt-4 flex gap-3">
        <span className="bg-accent text-on-accent rounded-full px-3 py-1">
          Accent
        </span>
        <span className="bg-accent-subtle text-accent rounded-full px-3 py-1">
          Accent Subtle
        </span>
        <span className="bg-success-subtle text-success rounded-full px-3 py-1">
          Success
        </span>
      </div>
    </section>
  );
}
```

### Use the CSS variables directly

You can also use the readable CSS variables in plain CSS, CSS Modules, or inline styles:

```css
.dashboard-shell {
  background: var(--ds-color-bg-surface);
  color: var(--ds-color-fg);
  border: 1px solid var(--ds-color-border);
  box-shadow: var(--ds-shadow-2);
  font-family: var(--font-sans);
}

.dashboard-shell a {
  color: var(--ds-color-accent);
}

.dashboard-shell .status-info {
  color: var(--ds-color-info);
}
```

### Theme variable groups

The token system is split into stable layers:

- Internal design-system tokens: `--ds-*`
- Semantic utility aliases: `bg-surface`, `text-fg`, `border-border`, `bg-accent`, `text-on-accent`, `outline-focus`
- Compatibility color variables: `--color-primary`, `--color-background-primary`, `--color-text-primary`, and the existing `primary-50` through `primary-900` theme scale

### Theme switching

If you use `ThemeProvider`, the library updates `data-brand` and `data-mode` for you. It still writes the old `data-theme` attribute for compatibility, but the new architecture treats brand and mode as separate axes.

If you do not use `ThemeProvider`, you can still switch manually in your app shell:

```html
<html data-brand="teal" data-mode="dark"></html>
```

## Import Patterns

Use whichever public import style fits your project.

### Root imports

```tsx
import {
  Button,
  DataTable,
  Dialog,
  ThemeProvider,
  ToastProvider,
  Typography,
} from "erp-pro-ui";
```

### Subpath imports

```tsx
import { Button } from "erp-pro-ui/button";
import { DataTable } from "erp-pro-ui/data-table";
import { Dialog } from "erp-pro-ui/dialog";
import { ThemeProvider } from "erp-pro-ui/theme";
import { SearchIcon } from "erp-pro-ui/icons";
import { Audio } from "erp-pro-ui/spinners";
```

### Structured docs and catalog exports

```tsx
import { uiCatalogItems } from "erp-pro-ui/catalog";
import {
  getComponentDocByName,
  libraryDocs,
  searchComponentDocs,
} from "erp-pro-ui/docs";
```

### Utilities

```tsx
import {
  generateUniqueKey,
  mergeClassNames,
  validateEmail,
} from "erp-pro-ui/utils";
```

Only use the documented package exports. Do not import from `src/**` or internal folder paths.

## Complete Starter Example

This example shows the normal setup pattern in a separate app: theme provider, toast provider, input controls, status messaging, dialog usage, and shared layout components.

```tsx
import { useState } from "react";

import {
  Alert,
  Button,
  Card,
  Chip,
  Dialog,
  Input,
  Select,
  ToastProvider,
  ThemeProvider,
  Typography,
  useToast,
} from "erp-pro-ui";

function DashboardDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { addToast } = useToast();

  return (
    <div className="min-h-screen bg-neutral-50 p-6 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h1" gradient="ocean">
              ERP Pro UI Demo
            </Typography>
            <Typography variant="body1">
              Use the same package in any React 19 project.
            </Typography>
          </div>
          <Chip variant="filled" color="success">
            Ready
          </Chip>
        </div>

        <Alert
          variant="info"
          title="Shared setup"
          description="ThemeProvider and ToastProvider are already wired at the app root."
        />

        <Card className="space-y-4 p-6">
          <Typography variant="h3">Create workspace</Typography>
          <Input
            label="Email"
            placeholder="owner@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Select
            label="Plan"
            placeholder="Choose a plan"
            options={[
              { value: "starter", label: "Starter" },
              { value: "growth", label: "Growth" },
              { value: "enterprise", label: "Enterprise" },
            ]}
          />

          <div className="flex gap-3">
            <Button
              primary
              onClick={() => {
                addToast({
                  type: "success",
                  title: "Draft saved",
                  message: "Workspace settings were saved locally.",
                });
              }}
            >
              Save draft
            </Button>
            <Button onClick={() => setDialogOpen(true)}>
              Open review dialog
            </Button>
          </div>
        </Card>

        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Review workspace"
          description="Confirm that the workspace should be created."
          preset="confirm"
          variant="default"
          onConfirm={() => {
            setDialogOpen(false);
            addToast({
              type: "success",
              title: "Workspace created",
              message: "Your environment is ready to use.",
            });
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DashboardDemo />
      </ToastProvider>
    </ThemeProvider>
  );
}
```

## Component Inventory

The tables below document the public surface you can use from another project.

### Providers, Shared Surfaces, and Package Utilities

| Export                                                  | Public import                           | Notes                                       |
| ------------------------------------------------------- | --------------------------------------- | ------------------------------------------- |
| `ThemeProvider`, `useThemeContext`                      | `erp-pro-ui` or `erp-pro-ui/theme`      | App theme context and mode switching        |
| `ToastProvider`, `ToastItem`, `useToast`                | `erp-pro-ui` or `erp-pro-ui/toast`      | Global toast notifications                  |
| `Typography`                                            | `erp-pro-ui` or `erp-pro-ui/typography` | Semantic text system                        |
| all icons                                               | `erp-pro-ui` or `erp-pro-ui/icons`      | Shared React SVG icon components            |
| `Audio`                                                 | `erp-pro-ui` or `erp-pro-ui/spinners`   | Audio wave spinner                          |
| `generateUniqueKey`, `mergeClassNames`, `validateEmail` | `erp-pro-ui/utils`                      | Reusable package helpers                    |
| `libraryDocs` and helpers                               | `erp-pro-ui/docs`                       | Machine-readable install and component docs |
| `uiCatalogItems`                                        | `erp-pro-ui/catalog`                    | Component catalog metadata                  |

### Form Components

| Export                  | Subpath                              | Use it for                                            |
| ----------------------- | ------------------------------------ | ----------------------------------------------------- |
| `Button`                | `erp-pro-ui/button`                  | Primary and secondary actions                         |
| `Input`                 | `erp-pro-ui/input`                   | Text inputs with label, helper text, and icon support |
| `InputState`            | `erp-pro-ui/input`                   | Input validation states                               |
| `Textarea`              | `erp-pro-ui/textarea`                | Multi-line user input                                 |
| `Select`                | `erp-pro-ui/select`                  | Fixed option dropdowns                                |
| `Checkbox`              | `erp-pro-ui/checkbox`                | Multi-select and boolean inputs                       |
| `Radio`                 | `erp-pro-ui/radio`                   | Single-choice form selections                         |
| `Switch`                | `erp-pro-ui/switch`                  | Immediate on/off settings                             |
| `Label`                 | `erp-pro-ui/label`                   | Accessible field labels                               |
| `Calendar`              | `erp-pro-ui/calendar`                | Embedded calendar display                             |
| `DatePicker`            | `erp-pro-ui/date-picker`             | Calendar-backed date inputs                           |
| `Combobox`              | `erp-pro-ui/combobox`                | Searchable single-select control                      |
| `MultiSelectCombobox`   | `erp-pro-ui/multi-select-combobox`   | Searchable multi-value selection                      |
| `OTPInput`              | `erp-pro-ui/otp-input`               | Verification code entry                               |
| `PasswordStrengthMeter` | `erp-pro-ui/password-strength-meter` | Password feedback UI                                  |
| `Form`                  | `erp-pro-ui/form`                    | Form composition wrapper                              |

### Navigation, Overlays, and Feedback

| Export                                                                   | Subpath                 | Use it for                                              |
| ------------------------------------------------------------------------ | ----------------------- | ------------------------------------------------------- |
| `Accordion`                                                              | `erp-pro-ui/accordion`  | Collapsible sections                                    |
| `Dialog`                                                                 | `erp-pro-ui/dialog`     | Confirmation flows and modal content                    |
| `Drawer`                                                                 | `erp-pro-ui/drawer`     | Slide-over panels                                       |
| `Tooltip`                                                                | `erp-pro-ui/tooltip`    | Short contextual help                                   |
| `HoverCard`                                                              | `erp-pro-ui/hover-card` | Rich hover previews                                     |
| `Carousel`                                                               | `erp-pro-ui/carousel`   | Horizontal content sliders                              |
| `Stepper`                                                                | `erp-pro-ui/stepper`    | Multi-step workflow progress                            |
| `Alert`                                                                  | `erp-pro-ui/alert`      | Inline success, warning, info, or destructive messaging |
| `Loading`                                                                | `erp-pro-ui/loading`    | Unified loading API                                     |
| `Spinner`, `Dots`, `Pulse`, `Bars`, `Ring`, `Bounce`, `Wave`, `Skeleton` | `erp-pro-ui/loading`    | Individual loading variants                             |
| `SkeletonComponent`                                                      | root import only        | Root alias for the skeleton placeholder export          |

### Data Display And Charts

| Export                                                            | Subpath                    | Use it for                                        |
| ----------------------------------------------------------------- | -------------------------- | ------------------------------------------------- |
| `Card`                                                            | `erp-pro-ui/card`          | Panel and container layout                        |
| `Chip`                                                            | `erp-pro-ui/chip`          | Tags, status pills, and labels                    |
| `ColorPalette`                                                    | `erp-pro-ui/color-palette` | Design token or palette presentation              |
| `DataTable`                                                       | `erp-pro-ui/data-table`    | Feature-rich tables with filtering and pagination |
| `FilterDropdown`, `FilterButton`, `ColumnToggle`, `FilterProfile` | `erp-pro-ui/data-table`    | DataTable helper building blocks                  |
| `AreaChart`                                                       | `erp-pro-ui/charts`        | Area chart visualizations                         |
| `BarChart`                                                        | `erp-pro-ui/charts`        | Bar chart visualizations                          |
| `PieChart`                                                        | `erp-pro-ui/charts`        | Pie and donut charts                              |
| `NeonLineChart`                                                   | `erp-pro-ui/charts`        | Glowing line charts                               |
| `StackedBarChart`                                                 | `erp-pro-ui/charts`        | Stacked comparisons                               |
| `ThinBreakdownBar`                                                | `erp-pro-ui/charts`        | Compact segmented metric bars                     |

### Visual Effects And Text Components

| Export                        | Public import                              | Use it for                        |
| ----------------------------- | ------------------------------------------ | --------------------------------- |
| `AnimatedContent`             | `erp-pro-ui/animated-content`              | Entrance animation wrappers       |
| `BackgroundGradientAnimation` | `erp-pro-ui/background-gradient-animation` | Full-section animated backgrounds |
| `BorderBeam`                  | root import only                           | Beam border effect wrapper        |
| `ButtonHoverBorderGradient`   | `erp-pro-ui/button-hover-border-gradient`  | CTA button with animated border   |
| `ChromaGrid`                  | `erp-pro-ui/chroma-grid`                   | Animated background grid          |
| `GradualBlur`                 | `erp-pro-ui/gradual-blur`                  | Progressive blur reveal           |
| `HoverBorderGradient`         | `erp-pro-ui/hover-border-gradient`         | Hover border lighting treatment   |
| `SplashCursor`                | `erp-pro-ui/splash-cursor`                 | Cursor effect overlay             |
| `SpotlightCard`               | `erp-pro-ui/spotlight-card`                | Cursor-reactive premium card      |
| `SunToMoonButton`             | `erp-pro-ui/sun-to-moon-button`            | Theme toggle control              |
| `ASCIIText`                   | `erp-pro-ui/ascii-text`                    | Animated ASCII display text       |

## Focused Usage Examples

### Dialog and toast flow

```tsx
import { Button, Dialog, ToastProvider, useToast } from "erp-pro-ui";

function DeleteButton() {
  const [open, setOpen] = useState(false);
  const { addToast } = useToast();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete record</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete record"
        description="This action cannot be undone."
        variant="destructive"
        preset="confirm"
        onConfirm={() => {
          setOpen(false);
          addToast({ type: "success", title: "Deleted" });
        }}
      />
    </>
  );
}
```

### Data table

```tsx
import { DataTable } from "erp-pro-ui";

const columns = [
  { id: "name", label: "Name", visible: true },
  { id: "email", label: "Email", visible: true },
  { id: "role", label: "Role", visible: true },
];

const rows = [
  { name: "Ava Stone", email: "ava@company.com", role: "Admin" },
  { name: "Noah Reed", email: "noah@company.com", role: "Manager" },
];

<DataTable columns={columns} data={rows} searchPlaceholder="Search users" />;
```

### Charts

```tsx
import { AreaChart, BarChart, PieChart } from "erp-pro-ui";

const revenue = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2800 },
];

<AreaChart data={revenue} dataKey="value" xAxisKey="name" />;
<BarChart data={revenue} dataKey="value" xAxisKey="name" />;
<PieChart
  data={[
    { name: "ERP", value: 60 },
    { name: "POS", value: 40 },
  ]}
/>;
```

### Icons

```tsx
import { CloseIcon, RefreshIcon, SearchIcon } from "erp-pro-ui/icons";

<div className="flex items-center gap-3">
  <SearchIcon className="h-4 w-4" />
  <RefreshIcon className="h-4 w-4" />
  <CloseIcon className="h-4 w-4" />
</div>;
```

## Companion Surfaces

### Structured docs bundle

Use `erp-pro-ui/docs` if you want to build your own docs page, CLI, codegen, or AI integration.

```tsx
import {
  getComponentDocByName,
  libraryDocs,
  searchComponentDocs,
} from "erp-pro-ui/docs";

const docs = getComponentDocByName("Dialog");
const charts = searchComponentDocs("chart");

console.log(libraryDocs.installSteps);
console.log(docs?.subpathImport);
console.log(charts.length);
```

### Catalog bundle

Use `erp-pro-ui/catalog` if you only need the component list and public slugs.

```tsx
import { uiCatalogItems } from "erp-pro-ui/catalog";

console.log(uiCatalogItems.map((item) => item.name));
```

### MCP server

For AI-assisted tooling and editor integrations, use the companion package:

```bash
npx -y erp-pro-ui-mcp-server
```

Example MCP client config:

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

## Development In This Repo

```bash
pnpm install
pnpm --filter ./packages/ui build
pnpm --filter ./packages/ui typecheck
pnpm --filter ./packages/ui lint
pnpm storybook
```

## License

MIT
