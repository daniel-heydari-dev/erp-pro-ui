# erp-pro-ui

# erp-pro-ui

Premium UI component library for ERP and SaaS applications.

## Features

- 🚀 **50+ Premium Components**: From basic buttons to complex data tables and charts.
- 🎨 **Modern Aesthetics**: Sleek, glassmorphic, and highly interactive designs.
- 📊 **Advanced Charts**: Customizable Neon Line Charts, Stacked Bar Charts, and more.
- ⌨️ **Accessibility**: Built with accessibility and responsiveness in mind.
- 🛠️ **Developer Friendly**: Fully typed with TypeScript and easy to integrate.

## Installation

```bash
pnpm add erp-pro-ui
# or
npm install erp-pro-ui
# or
yarn add erp-pro-ui
```

### Peer Dependencies

Ensure you have the following peer dependencies installed:

```bash
pnpm add framer-motion three @react-three/fiber @react-three/drei @tanstack/react-table recharts lucide-react
```

### Font Setup (Geist)

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

In your Tailwind config, extend `fontFamily`:

```js
fontFamily: {
  geist: ['Geist', 'sans-serif'],
}
```

## 🚀 Quick Start

```tsx
import { ThemeProvider, Button, Input, Typography } from 'erp-pro-ui';

function App() {
  return (
    <ThemeProvider>
      <Typography variant="h1" gradient="ocean">
        Welcome to ERP Pro
      </Typography>
      <Input label="Email" placeholder="you@company.com" />
      <Button primary label="Get Started" />
    </ThemeProvider>
  );
}
```

## 📋 Component Reference

### Form Controls

| Component               | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `Button`                | Primary/secondary button with size variants                  |
| `Input`                 | Text input with label, validation states, and hover gradient |
| `Textarea`              | Multi-line text input                                        |
| `Select`                | Dropdown selection                                           |
| `Checkbox`              | Checkbox with label                                          |
| `Radio`                 | Radio button group                                           |
| `Switch`                | Toggle switch                                                |
| `OTPInput`              | One-time password input                                      |
| `DatePicker`            | Calendar-based date picker                                   |
| `Combobox`              | Searchable dropdown                                          |
| `MultiSelectCombobox`   | Multi-value searchable dropdown                              |
| `PasswordStrengthMeter` | Visual password strength indicator                           |
| `Form`                  | Form wrapper with validation                                 |

### Layout & Containers

| Component   | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `Card`      | Content container card                                       |
| `Accordion` | Expandable content panels                                    |
| `Dialog`    | Modal dialog with variants, presets, and 10 animation styles |
| `Drawer`    | Slide-out panel (left/right/top/bottom)                      |
| `Tooltip`   | Hover tooltip                                                |
| `HoverCard` | Rich content hover card                                      |
| `Calendar`  | Calendar display                                             |
| `Carousel`  | Content carousel/slider                                      |

### Typography

| Component    | Description                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Typography` | Semantic text with `h1`–`h6`, `body1`, `body2`, `caption`, `overline` variants. Supports `gradient`, `align`, `weight`, `tracking`, and `italic` props. |

### Data Display

| Component      | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `DataTable`    | Feature-rich table with sorting, filtering, column toggles, and filter profiles |
| `Chip`         | Status/tag badge with `filled`, `outlined`, `ghost` variants                    |
| `Stepper`      | Multi-step progress indicator (horizontal/vertical)                             |
| `ColorPalette` | Color swatch display                                                            |

### Charts

Built on [Recharts](https://recharts.org/), the chart components provide premium data visualization:

| Component          | Type                          |
| ------------------ | ----------------------------- |
| `AreaChart`        | Gradient-filled area chart    |
| `BarChart`         | Horizontal/vertical bar chart |
| `PieChart`         | Pie and donut charts          |
| `NeonLineChart`    | Glowing neon-style line chart |
| `StackedBarChart`  | Stacked bar visualization     |
| `ThinBreakdownBar` | Thin horizontal breakdown bar |

### Feedback

| Component                      | Description                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `Alert`                        | Banner alert with `default`, `destructive`, `success`, `warning`, `info` variants |
| `ToastProvider` + `useToast()` | Toast notification system                                                         |
| `Loading`                      | 8 loading variants: spinner, dots, pulse, bars, ring, bounce, wave, skeleton      |

### Visual Effects

| Component                     | Description                                       |
| ----------------------------- | ------------------------------------------------- |
| `BackgroundGradientAnimation` | Animated gradient background with 6 preset themes |
| `SpotlightCard`               | Card with cursor-tracking spotlight effect        |
| `AnimatedContent`             | Scroll-triggered entrance animations              |
| `GradualBlur`                 | Progressive blur entrance effect                  |
| `ChromaGrid`                  | Chromatic grid animation                          |
| `SplashCursor`                | Interactive cursor splash effect                  |
| `HoverBorderGradient`         | Animated gradient border on hover                 |
| `SunToMoonButton`             | Animated theme toggle button                      |
| `ASCIIText`                   | 3D ASCII text animation                           |

### Icons

30+ custom SVG icons available:

```tsx
import { IconDashboard, IconSettings, IconUser } from 'erp-pro-ui';

<IconDashboard className="w-5 h-5" />;
```

## 🎨 Theme System

Wrap your app with `ThemeProvider` for automatic dark/light mode:

```tsx
import { ThemeProvider, useThemeContext } from 'erp-pro-ui';

// In root
<ThemeProvider>
  <App />
</ThemeProvider>;

// In any component
const { mode, toggleMode, setMode } = useThemeContext();
```

## 📖 Usage Examples

### Dialog

```tsx
import { Dialog } from 'erp-pro-ui';

<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Confirm Delete"
  description="This action cannot be undone."
  variant="destructive"
  preset="confirm"
  animation="scale"
  onConfirm={() => handleDelete()}
/>;
```

**Dialog Animations:** `fade`, `scale`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `elastic`, `bounce`, `flip`, `zoom`

### Toast

```tsx
import { ToastProvider, useToast } from 'erp-pro-ui';

// Wrap app
<ToastProvider>
  <App />
</ToastProvider>;

// Use anywhere
const { addToast } = useToast();
addToast({ type: 'success', title: 'Saved!', message: 'All changes saved.' });
```

### DataTable

```tsx
import { DataTable, FilterDropdown, ColumnToggle } from 'erp-pro-ui';

<DataTable data={users} columns={columns} searchable sortable paginated />;
```

### Background Gradient

```tsx
import { BackgroundGradientAnimation } from 'erp-pro-ui';

<BackgroundGradientAnimation
  gradientBackgroundStart="rgb(0, 17, 82)"
  gradientBackgroundEnd="rgb(108, 0, 162)"
  firstColor="18, 113, 255"
  secondColor="221, 74, 255"
  thirdColor="100, 220, 255"
  size="80%"
  interactive
>
  <h1>Your Content Here</h1>
</BackgroundGradientAnimation>;
```

## 📂 Subpath Imports

For optimal bundle size, use subpath imports:

```tsx
import { Button } from 'erp-pro-ui/button';
import { Dialog } from 'erp-pro-ui/dialog';
import { Input } from 'erp-pro-ui/input';
import { DataTable } from 'erp-pro-ui/data-table';
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Type check
pnpm typecheck

# Lint
pnpm lint

# Run Storybook
pnpm storybook
```

## 📄 License

MIT
