import React from "react";

export interface ColorSwatch {
  name: string;
  value: string;
  textColor?: "light" | "dark";
}

export interface ColorGroup {
  name: string;
  colors: ColorSwatch[];
}

export interface ColorPaletteProps {
  groups?: ColorGroup[];
  theme?: "light" | "dark" | "all";
  showGradients?: boolean;
  showUsageExamples?: boolean;
  className?: string;
}

const lightThemeGroups: ColorGroup[] = [
  {
    name: "Active Accent Scale",
    colors: [
      { name: "primary-50", value: "var(--ds-accent-50)", textColor: "dark" },
      { name: "primary-100", value: "var(--ds-accent-100)", textColor: "dark" },
      { name: "primary-200", value: "var(--ds-accent-200)", textColor: "dark" },
      { name: "primary-300", value: "var(--ds-accent-300)", textColor: "dark" },
      { name: "primary-400", value: "var(--ds-accent-400)", textColor: "light" },
      { name: "primary-500", value: "var(--ds-accent-500)", textColor: "light" },
      { name: "primary-600", value: "var(--ds-accent-600)", textColor: "light" },
      { name: "primary-700", value: "var(--ds-accent-700)", textColor: "light" },
      { name: "primary-800", value: "var(--ds-accent-800)", textColor: "light" },
      { name: "primary-900", value: "var(--ds-accent-900)", textColor: "light" },
    ],
  },
  {
    name: "Semantic Surfaces",
    colors: [
      { name: "bg-canvas", value: "var(--ds-color-bg-canvas)", textColor: "dark" },
      { name: "bg-surface", value: "var(--ds-color-bg-surface)", textColor: "dark" },
      { name: "bg-elevated", value: "var(--ds-color-bg-elevated)", textColor: "dark" },
      { name: "bg-muted", value: "var(--ds-color-bg-muted)", textColor: "dark" },
      { name: "accent-subtle", value: "var(--ds-color-accent-subtle)", textColor: "dark" },
    ],
  },
  {
    name: "Semantic Foreground",
    colors: [
      { name: "fg", value: "var(--ds-color-fg)", textColor: "light" },
      { name: "fg-muted", value: "var(--ds-color-fg-muted)", textColor: "light" },
      { name: "fg-subtle", value: "var(--ds-color-fg-subtle)", textColor: "light" },
      { name: "on-accent", value: "var(--ds-color-on-accent)", textColor: "dark" },
    ],
  },
  {
    name: "Semantic Borders",
    colors: [
      { name: "border", value: "var(--ds-color-border)", textColor: "dark" },
      { name: "border-strong", value: "var(--ds-color-border-strong)", textColor: "dark" },
      { name: "border-muted", value: "var(--ds-color-border-muted)", textColor: "dark" },
      { name: "border-field", value: "var(--ds-color-border-field)", textColor: "dark" },
      { name: "focus-ring", value: "var(--ds-color-focus-ring)", textColor: "dark" },
    ],
  },
  {
    name: "Semantic Status",
    colors: [
      { name: "success", value: "#1eb564", textColor: "light" },
      { name: "warning", value: "#ff9500", textColor: "dark" },
      { name: "danger", value: "#e31d1c", textColor: "light" },
      { name: "info", value: "#0085c4", textColor: "light" },
      { name: "disabled", value: "#d2d2d3", textColor: "dark" },
    ],
  },
  {
    name: "Foundation Tokens",
    colors: [
      { name: "--ds-primary", value: "var(--ds-primary)", textColor: "light" },
      {
        name: "--ds-surface-canvas",
        value: "var(--ds-surface-canvas)",
        textColor: "dark",
      },
      { name: "--ds-surface-1", value: "var(--ds-surface-1)", textColor: "dark" },
      { name: "--ds-text-1", value: "var(--ds-text-1)", textColor: "light" },
      { name: "--ds-border-1", value: "var(--ds-border-1)", textColor: "dark" },
    ],
  },
];

const darkThemeGroups: ColorGroup[] = [
  {
    name: "Active Accent Scale (Dark)",
    colors: [
      { name: "primary-50", value: "var(--ds-accent-50)", textColor: "dark" },
      { name: "primary-100", value: "var(--ds-accent-100)", textColor: "dark" },
      { name: "primary-200", value: "var(--ds-accent-200)", textColor: "dark" },
      { name: "primary-300", value: "var(--ds-accent-300)", textColor: "dark" },
      { name: "primary-400", value: "var(--ds-accent-400)", textColor: "light" },
      { name: "primary-500", value: "var(--ds-accent-500)", textColor: "light" },
      { name: "primary-600", value: "var(--ds-accent-600)", textColor: "light" },
      { name: "primary-700", value: "var(--ds-accent-700)", textColor: "light" },
      { name: "primary-800", value: "var(--ds-accent-800)", textColor: "light" },
      { name: "primary-900", value: "var(--ds-accent-900)", textColor: "light" },
    ],
  },
  {
    name: "Semantic Surfaces (Dark)",
    colors: [
      { name: "bg-canvas", value: "var(--ds-color-bg-canvas)", textColor: "light" },
      { name: "bg-surface", value: "var(--ds-color-bg-surface)", textColor: "light" },
      { name: "bg-elevated", value: "var(--ds-color-bg-elevated)", textColor: "light" },
      { name: "bg-muted", value: "var(--ds-color-bg-muted)", textColor: "light" },
      { name: "accent-subtle", value: "var(--ds-color-accent-subtle)", textColor: "light" },
    ],
  },
  {
    name: "Semantic Foreground (Dark)",
    colors: [
      { name: "fg", value: "var(--ds-color-fg)", textColor: "dark" },
      { name: "fg-muted", value: "var(--ds-color-fg-muted)", textColor: "dark" },
      { name: "fg-subtle", value: "var(--ds-color-fg-subtle)", textColor: "dark" },
      { name: "on-accent", value: "var(--ds-color-on-accent)", textColor: "dark" },
    ],
  },
  {
    name: "Semantic Borders (Dark)",
    colors: [
      { name: "border", value: "var(--ds-color-border)", textColor: "light" },
      { name: "border-strong", value: "var(--ds-color-border-strong)", textColor: "light" },
      { name: "border-muted", value: "var(--ds-color-border-muted)", textColor: "light" },
      { name: "border-field", value: "var(--ds-color-border-field)", textColor: "light" },
      { name: "focus-ring", value: "var(--ds-color-focus-ring)", textColor: "dark" },
    ],
  },
  {
    name: "Semantic Status (Dark)",
    colors: [
      { name: "success", value: "#22c55e", textColor: "light" },
      { name: "warning", value: "#f59e42", textColor: "dark" },
      { name: "danger", value: "#ef4444", textColor: "light" },
      { name: "info", value: "#38bdf8", textColor: "dark" },
      { name: "disabled", value: "#4b5563", textColor: "light" },
    ],
  },
  {
    name: "Foundation Tokens (Dark)",
    colors: [
      { name: "--ds-primary", value: "var(--ds-primary)", textColor: "light" },
      {
        name: "--ds-surface-canvas",
        value: "var(--ds-surface-canvas)",
        textColor: "light",
      },
      { name: "--ds-surface-1", value: "var(--ds-surface-1)", textColor: "light" },
      { name: "--ds-text-1", value: "var(--ds-text-1)", textColor: "dark" },
      { name: "--ds-border-1", value: "var(--ds-border-1)", textColor: "light" },
    ],
  },
];

const gradientGroups: ColorGroup[] = [
  {
    name: "Semantic Gradients",
    colors: [
      { name: "accent-gradient-start", value: "#9333ea", textColor: "light" },
      { name: "accent-gradient-end", value: "#7e22ce", textColor: "light" },
      { name: "accent-secondary", value: "#4318ff", textColor: "light" },
    ],
  },
  {
    name: "Status Gradients",
    colors: [
      { name: "success-gradient-start", value: "#22c55e", textColor: "light" },
      { name: "success-gradient-end", value: "#16a34a", textColor: "light" },
      { name: "warning-gradient-start", value: "#f59e0b", textColor: "dark" },
      { name: "warning-gradient-end", value: "#d97706", textColor: "light" },
      { name: "error-gradient-start", value: "#ef4444", textColor: "light" },
      { name: "error-gradient-end", value: "#dc2626", textColor: "light" },
    ],
  },
  {
    name: "Glass / Opacity",
    colors: [
      {
        name: "glass-white-90",
        value: "rgba(255,255,255,0.9)",
        textColor: "dark",
      },
      {
        name: "glass-white-70",
        value: "rgba(255,255,255,0.7)",
        textColor: "dark",
      },
      {
        name: "glass-white-50",
        value: "rgba(255,255,255,0.5)",
        textColor: "dark",
      },
      {
        name: "glass-white-20",
        value: "rgba(255,255,255,0.2)",
        textColor: "dark",
      },
      {
        name: "glass-white-10",
        value: "rgba(255,255,255,0.1)",
        textColor: "dark",
      },
      { name: "glass-black-90", value: "rgba(0,0,0,0.9)", textColor: "light" },
      { name: "glass-black-70", value: "rgba(0,0,0,0.7)", textColor: "light" },
      { name: "glass-black-50", value: "rgba(0,0,0,0.5)", textColor: "light" },
      { name: "glass-black-20", value: "rgba(0,0,0,0.2)", textColor: "light" },
      { name: "glass-black-10", value: "rgba(0,0,0,0.1)", textColor: "light" },
    ],
  },
];

// Default groups (backwards compatibility)
const defaultGroups: ColorGroup[] = lightThemeGroups;

interface DisplayColorGroup {
  group: ColorGroup;
  mode?: "light" | "dark";
}

function ColorSwatchItem({ color }: { color: ColorSwatch }) {
  const swatchRef = React.useRef<HTMLDivElement | null>(null);
  const [resolvedValue, setResolvedValue] = React.useState<string>(color.value);

  // Resolve runtime CSS variable values so docs reflect live theme tokens.
  React.useEffect(() => {
    if (!swatchRef.current) {
      return;
    }

    if (color.value.startsWith("var(")) {
      const computedBackground = getComputedStyle(swatchRef.current).backgroundColor;
      setResolvedValue(computedBackground || color.value);
      return;
    }

    setResolvedValue(color.value);
  }, [color.value]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resolvedValue);
  };

  const swatchLabel = color.value.startsWith("var(")
    ? "LIVE"
    : color.value.length <= 9
      ? color.value.toUpperCase()
      : "RGBA";

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-105"
      onClick={copyToClipboard}
      title="Click to copy"
    >
      <div
        ref={swatchRef}
        className="w-20 h-20 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-xs font-mono"
        style={{ backgroundColor: color.value }}
      >
        <span className="font-semibold text-white mix-blend-difference">
          {swatchLabel}
        </span>
      </div>
      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 text-center max-w-20">
        {color.name}
      </span>
      <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 text-center max-w-20 break-all">
        {resolvedValue}
      </span>
    </div>
  );
}

function GradientPreview() {
  // Static examples to illustrate common gradient recipes.
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
        Semantic Gradient Examples
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={{
              background: "linear-gradient(135deg, #9333ea, #7e22ce)",
            }}
          >
            Accent Gradient
          </div>
          <code className="text-xs text-neutral-500">
            linear-gradient(135deg, #9333ea, #7e22ce)
          </code>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={{
              background: "linear-gradient(135deg, #9333ea, #4318ff)",
            }}
          >
            Accent to Brand Primary
          </div>
          <code className="text-xs text-neutral-500">
            linear-gradient(135deg, #9333ea, #4318ff)
          </code>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
            }}
          >
            Success Gradient
          </div>
          <code className="text-xs text-neutral-500">
            linear-gradient(135deg, #22c55e, #16a34a)
          </code>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-neutral-900 font-medium"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            }}
          >
            Warning Gradient
          </div>
          <code className="text-xs text-neutral-500">
            linear-gradient(135deg, #fbbf24, #f59e0b)
          </code>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
            }}
          >
            Error Gradient
          </div>
          <code className="text-xs text-neutral-500">
            linear-gradient(135deg, #ef4444, #dc2626)
          </code>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium backdrop-blur-xl border border-white/20"
            style={{
              background: "rgba(147, 51, 234, 0.7)",
            }}
          >
            Glass Effect
          </div>
          <code className="text-xs text-neutral-500">
            rgba(147, 51, 234, 0.7) + backdrop-blur
          </code>
        </div>
      </div>
    </div>
  );
}

function UsageExamples() {
  // Token usage references for semantic utilities + raw CSS variables.
  return (
    <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
        Recommended Usage
      </h3>
      <div className="space-y-4">
        <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
            Semantic utilities first
          </h4>
          <pre className="text-xs font-mono text-neutral-600 dark:text-neutral-400 overflow-x-auto">
            {`import { Button } from "erp-pro-ui";

<section className="bg-surface text-fg border border-border rounded-2xl p-6">
  <h2 className="text-accent text-xl font-semibold">Semantic theme</h2>
  <p className="text-fg-muted">Use utilities generated by colors.css.</p>
  <Button label="Save changes" primary />
</section>`}
          </pre>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
            Raw design-system variables
          </h4>
          <pre className="text-xs font-mono text-neutral-600 dark:text-neutral-400 overflow-x-auto">
            {`.dashboard-shell {
  background: var(--ds-color-bg-surface);
  color: var(--ds-color-fg);
  border: 1px solid var(--ds-color-border);
}

.dashboard-shell a {
  color: var(--ds-color-accent);
}

html[data-brand="teal"][data-mode="dark"] {
  color-scheme: dark;
}`}
          </pre>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
            Compatibility aliases for migration
          </h4>
          <pre className="text-xs font-mono text-neutral-600 dark:text-neutral-400 overflow-x-auto">
            {`:root {
  --color-primary: #4318ff;
  --color-background-primary: #f4f7fe;
  --color-text-primary: #1e293b;
}

/* Supported for migration. Prefer semantic utilities or --ds-* in new code. */`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function ColorPalette({
  groups,
  theme = "all",
  showGradients = true,
  showUsageExamples = true,
  className,
}: ColorPaletteProps) {
  // Build display groups based on requested mode. Each group can be rendered
  // inside an explicit `data-mode` wrapper so light and dark values are both
  // resolved accurately on the same page.
  let displayGroups: DisplayColorGroup[];
  if (groups) {
    displayGroups = groups.map((group) => ({ group }));
  } else if (theme === "light") {
    displayGroups = lightThemeGroups.map((group) => ({ group, mode: "light" }));
  } else if (theme === "dark") {
    displayGroups = darkThemeGroups.map((group) => ({ group, mode: "dark" }));
  } else {
    // Show all
    displayGroups = [
      ...lightThemeGroups.map((group) => ({ group, mode: "light" as const })),
      ...darkThemeGroups.map((group) => ({ group, mode: "dark" as const })),
    ];
  }

  // Append optional gradient/opacity examples when using built-in groups.
  if (showGradients && !groups) {
    displayGroups = [
      ...displayGroups,
      ...gradientGroups.map((group) => ({ group })),
    ];
  }

  return (
    <div
      className={`p-6 bg-white dark:bg-neutral-900 rounded-xl ${
        className || ""
      }`}
    >
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        Color Palette
      </h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Preferred contract:{" "}
        <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
          semantic utilities and --ds-* tokens
        </code>{" "}
        • Compatibility aliases remain available for migration. Light and dark
        sections are resolved in their own mode contexts. Click any swatch to
        copy the resolved color value.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            theme === "light" || theme === "all"
              ? "bg-accent-subtle text-accent"
              : "bg-neutral-100 text-neutral-500"
          }`}
        >
          Light Theme
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            theme === "dark" || theme === "all"
              ? "bg-accent-subtle text-accent"
              : "bg-neutral-100 text-neutral-500"
          }`}
        >
          Dark Theme
        </span>
        {showGradients && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-subtle text-accent">
            Gradients
          </span>
        )}
      </div>

      {displayGroups.map(({ group, mode }) => (
        <div key={group.name} data-mode={mode} className="mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            {group.name}
          </h3>
          <div className="flex flex-wrap gap-4">
            {group.colors.map((color) => (
              <ColorSwatchItem key={color.name} color={color} />
            ))}
          </div>
        </div>
      ))}

      {showGradients && <GradientPreview />}
      {showUsageExamples && <UsageExamples />}
    </div>
  );
}

// Export color groups for external use
export { lightThemeGroups, darkThemeGroups, gradientGroups, defaultGroups };
