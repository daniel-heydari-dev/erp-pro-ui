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

Prefer the semantic utilities and `--ds-*` tokens in new code. The older `--color-*` and `primary-*` aliases are still shipped as a migration surface, not as the preferred authoring API.

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

- `erp-pro-ui/tokens.css`: raw `--ds-*` tokens plus internal legacy ERP bridge import
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

.dashboard-shell .chart-series {
  stroke: var(--ds-chart-6);
}
```

### Chart color slots

The library now ships fifteen dedicated chart slots in both token layers:

- `--ds-chart-1` through `--ds-chart-15`
- `--color-chart-1` through `--color-chart-15`

When you pass chart colors from React, you can use any CSS color string, the CSS vars directly, or the built-in helper and shorthand token names:

```tsx
import { BarChart, getChartColorVar } from "erp-pro-ui";

<BarChart
  data={data}
  categories={[
    { key: "revenue", color: getChartColorVar(1) },
    { key: "cost", color: "chart-6" },
    { key: "profit", color: "var(--color-chart-10)" },
  ]}
/>;
```

`getChartColorVar(slot)` supports slots `1` through `15`. The chart components also normalize the shorthand `chart-6` form into the matching theme variable automatically.

### Theme variable groups

The token system is split into stable layers:

- Internal design-system tokens: `--ds-*`
- Semantic utility aliases: `bg-surface`, `text-fg`, `border-border`, `bg-accent`, `text-on-accent`, `outline-focus`
- Compatibility color variables: `--color-primary`, `--color-background-primary`, `--color-text-primary`, and the existing `primary-50` through `primary-900` theme scale

For new components, use the semantic utility layer or the `--ds-*` variables directly. Keep the compatibility aliases for migration work and external consumers that still rely on the legacy contract.

### Token priority and quick groups

Priority order (top to bottom):

1. Global foundation defaults (`:root` / `:host`)
2. Global mode overrides (dark/light + system fallback)
3. Brand accent scales (`purple` / `teal` / `yellow` / `green`)
4. Brand + mode surface/text/border overrides

When debugging a color:

- Check `--ds-surface-*` (background layers)
- Check `--ds-text-*` (text hierarchy)
- Check `--ds-border-*` (border hierarchy)
- Check `--ds-accent-*` (brand accents)

Quick groups:

- `--ds-surface-*`: background layers
  - `--ds-surface-canvas`: main app/page background
  - `--ds-surface-1`: default card/panel background on top of canvas
  - `--ds-surface-2`: elevated background (modal/popover/raised panel)
- `--ds-text-*`: text hierarchy
  - `--ds-text-1`: primary text (titles, key content)
  - `--ds-text-2`: secondary text (supporting labels/metadata)
  - `--ds-text-3`: tertiary text (hints/helper/low emphasis)
- `--ds-border-*`: border hierarchy
  - `--ds-border-1`: strongest border
  - `--ds-border-2`: default border
  - `--ds-border-3`: subtle border
  - `--ds-border-field`: input border
- `--ds-accent-*`: brand accent scale
  - `--ds-accent-50..900`: light to dark scale
  - `--ds-accent`: active accent for CTA/active states
  - `--ds-accent-contrast`: text/icon color on accent backgrounds
- `--ds-color-*`: semantic derived tokens
  - `--ds-color-bg-*`: semantic backgrounds
  - `--ds-color-fg*`: semantic text
  - `--ds-color-border*`: semantic borders
  - `--ds-color-accent*`: interaction/brand states
  - status tokens: success, warning, danger, info, disabled

### Theme switching

If you use `ThemeProvider`, the library updates `data-brand`, `data-mode`, and `data-dark-variant` for you. It still writes the old `data-theme` attribute for compatibility, but the architecture treats brand, mode, and dark variant as separate axes.

If you do not use `ThemeProvider`, you can still switch manually in your app shell:

```html
<html data-brand="teal" data-mode="dark" data-dark-variant="alt"></html>
```

Quick mental model:

- `data-brand` controls accent family and brand-specific palette.
- `data-mode` controls light/dark surface, text, and border foundations.
- `data-dark-variant` controls which dark foundation to use (`default` or `alt`) when `data-mode="dark"`.
- Components consume semantic tokens, so they update automatically.

### Brand palette presets (light + dark)

The shipped token presets now include a tinted SaaS surface system for each brand. When you switch brand, mode, or dark variant, semantic tokens (`bg-surface`, `text-fg`, `border-border`) update automatically. The `dark-alt` variant uses a shared dark foundation while each brand keeps its own accent family.

| Brand preset | Light canvas / surface / stroke / text | Dark default canvas / surface / stroke / text | Dark alt canvas / surface / stroke |
| --- | --- | --- | --- |
| `purple` | `#F4F7FE` / `#FFFFFF` / `#E9EDF7` / `#2B3674` | `#0A0B1C` / `#161936` / `#2B308B` / `#EFF4FB` | `#0F111A` / `#1A1D29` / `#2D3748` |
| `teal` | `#F0F9FA` / `#FFFFFF` / `#D1E9ED` / `#134E48` | `#061113` / `#0E2529` / `#1A4D57` / `#E0F2F1` | `#0F111A` / `#1A1D29` / `#2D3748` |
| `yellow` | `#FEFCE8` / `#FFFFFF` / `#FEF08A` / `#854D0E` | `#121002` / `#241D05` / `#4D3D02` / `#FEF9C3` | `#0F111A` / `#1A1D29` / `#2D3748` |
| `green` | `#F0FDF4` / `#FFFFFF` / `#DCFCE7` / `#064E3B` | `#020C09` / `#06241B` / `#065F46` / `#D1FAE5` | `#0F111A` / `#1A1D29` / `#2D3748` |

You can target these via:

- `data-brand="purple|teal|yellow|green"` + `data-mode="light|dark"` + optional `data-dark-variant="default|alt"`
- legacy compatibility (deprecated): `data-brand="secondary"` or `data-theme="secondary-dark"` still works and maps to `purple`.

### Token migration guide (`primary` naming)

New canonical tokens:

- `--ds-foundation-light-primary`
- `--ds-foundation-dark-primary`
- `--ds-primary`

Deprecated aliases kept for compatibility:

- `--ds-foundation-light-primary-purple` -> `--ds-foundation-light-primary`
- `--ds-foundation-dark-primary-purple` -> `--ds-foundation-dark-primary`
- `--ds-primary-purple` -> `--ds-primary`

You can still ship old apps safely today because deprecated aliases are still defined in `tokens.css`.

### AI prompt for migrating another app

Use this prompt with your AI assistant in another project:

```text
Migrate my app from legacy ERP token names to the new canonical DS primary tokens.

Rules:
1) Replace token usage:
   --ds-foundation-light-primary-purple -> --ds-foundation-light-primary
   --ds-foundation-dark-primary-purple -> --ds-foundation-dark-primary
   --ds-primary-purple -> --ds-primary
2) Do not change visual output.
3) Keep backward compatibility aliases if this app exports tokens.
4) Update docs/comments to mark old names as deprecated.
5) Return a summary with changed files and a grep checklist for remaining old tokens.
```

### AI prompt for migrating ERP tokens to DS tokens

Use this prompt with your AI assistant in another project:

```text
Migrate this app from legacy ERP CSS variables (--erp-*) to canonical DS tokens (--ds-*), without changing visuals.

Rules:
1) Replace usages in source files:
   --erp-color-primary -> --ds-brand-primary
   --erp-color-secondary -> --ds-brand-secondary
   --erp-color-background-primary -> --ds-color-bg-canvas
   --erp-color-background-secondary -> --ds-color-bg-surface
   --erp-color-background-tertiary -> --ds-color-bg-elevated
   --erp-color-text-primary -> --ds-text-1
   --erp-color-text-secondary -> --ds-text-2
   --erp-color-text-tertiary -> --ds-text-3
   --erp-color-border-primary -> --ds-border-1
   --erp-color-border-secondary -> --ds-border-2
   --erp-color-border-tertiary -> --ds-border-3
   --erp-color-success -> --ds-color-success
   --erp-color-warning -> --ds-color-warning
   --erp-color-error -> --ds-color-danger
   --erp-color-info -> --ds-color-info
2) Keep compatibility available while migrating by continuing to import erp-pro-ui/styles.css or erp-pro-ui/tokens.css.
3) Do not change component behavior or spacing/typography.
4) Update docs/comments to mark --erp-* as deprecated.
5) Return:
   - changed files list
   - grep command for remaining --erp-* usages
   - any risky/manual-review spots.
```

Full migration checklist: [MIGRATION_ERP_TO_DS.md](./MIGRATION_ERP_TO_DS.md)

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
| `Stepper`                                                                | `erp-pro-ui/stepper`    | Centered or inline multi-step workflow progress         |
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
| `TableContainer`, `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | `erp-pro-ui/data-table` | Composable table primitives with style control    |
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

### Composable table primitives

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "erp-pro-ui";

<Table>
  <TableCaption>Quarterly summary</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ava Stone</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>;
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
