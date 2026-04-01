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
      { name: "primary-50", value: "#f6efff", textColor: "dark" },
      { name: "primary-100", value: "#ead9fd", textColor: "dark" },
      { name: "primary-200", value: "#d8b3fb", textColor: "dark" },
      { name: "primary-300", value: "#c084fc", textColor: "dark" },
      { name: "primary-400", value: "#a855f7", textColor: "light" },
      { name: "primary-500", value: "#9333ea", textColor: "light" },
      { name: "primary-600", value: "#7e22ce", textColor: "light" },
      { name: "primary-700", value: "#6b21a8", textColor: "light" },
      { name: "primary-800", value: "#581c87", textColor: "light" },
      { name: "primary-900", value: "#3b0764", textColor: "light" },
    ],
  },
  {
    name: "Semantic Surfaces",
    colors: [
      { name: "bg-canvas", value: "#f4f7fe", textColor: "dark" },
      { name: "bg-surface", value: "#ffffff", textColor: "dark" },
      { name: "bg-elevated", value: "#ffffff", textColor: "dark" },
      { name: "bg-muted", value: "#f4f3f8", textColor: "dark" },
      { name: "accent-subtle", value: "#f3e8fd", textColor: "dark" },
    ],
  },
  {
    name: "Semantic Foreground",
    colors: [
      { name: "fg", value: "#1e293b", textColor: "light" },
      { name: "fg-muted", value: "#475467", textColor: "light" },
      { name: "fg-subtle", value: "#64748b", textColor: "light" },
      { name: "on-accent", value: "#ffffff", textColor: "dark" },
    ],
  },
  {
    name: "Semantic Borders",
    colors: [
      { name: "border", value: "#e5e7eb", textColor: "dark" },
      { name: "border-strong", value: "#d1d5db", textColor: "dark" },
      { name: "border-muted", value: "#f3f4f6", textColor: "dark" },
      { name: "border-field", value: "#e9e8e8", textColor: "dark" },
      { name: "focus-ring", value: "#c595f2", textColor: "dark" },
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
    name: "Compatibility Aliases",
    colors: [
      { name: "--color-primary", value: "#4318ff", textColor: "light" },
      {
        name: "--color-background-primary",
        value: "#f4f7fe",
        textColor: "dark",
      },
      {
        name: "--color-background-secondary",
        value: "#ffffff",
        textColor: "dark",
      },
      { name: "--color-text-primary", value: "#1e293b", textColor: "light" },
      { name: "--color-border-primary", value: "#d1d5db", textColor: "dark" },
    ],
  },
];

const darkThemeGroups: ColorGroup[] = [
  {
    name: "Active Accent Scale (Dark)",
    colors: [
      { name: "primary-50", value: "#f6efff", textColor: "dark" },
      { name: "primary-100", value: "#ead9fd", textColor: "dark" },
      { name: "primary-200", value: "#d8b3fb", textColor: "dark" },
      { name: "primary-300", value: "#c084fc", textColor: "dark" },
      { name: "primary-400", value: "#a855f7", textColor: "light" },
      { name: "primary-500", value: "#9333ea", textColor: "light" },
      { name: "primary-600", value: "#7e22ce", textColor: "light" },
      { name: "primary-700", value: "#6b21a8", textColor: "light" },
      { name: "primary-800", value: "#581c87", textColor: "light" },
      { name: "primary-900", value: "#3b0764", textColor: "light" },
    ],
  },
  {
    name: "Semantic Surfaces (Dark)",
    colors: [
      { name: "bg-canvas", value: "#070f2e", textColor: "light" },
      { name: "bg-surface", value: "#111c44", textColor: "light" },
      { name: "bg-elevated", value: "#111c44", textColor: "light" },
      { name: "bg-muted", value: "#18254f", textColor: "light" },
      { name: "accent-subtle", value: "#24194b", textColor: "light" },
    ],
  },
  {
    name: "Semantic Foreground (Dark)",
    colors: [
      { name: "fg", value: "#f1f5f9", textColor: "dark" },
      { name: "fg-muted", value: "#cbd5e1", textColor: "dark" },
      { name: "fg-subtle", value: "#94a3b8", textColor: "dark" },
      { name: "on-accent", value: "#ffffff", textColor: "dark" },
    ],
  },
  {
    name: "Semantic Borders (Dark)",
    colors: [
      { name: "border", value: "#4b5563", textColor: "light" },
      { name: "border-strong", value: "#374151", textColor: "light" },
      { name: "border-muted", value: "#6b7280", textColor: "light" },
      { name: "border-field", value: "#545b58", textColor: "light" },
      { name: "focus-ring", value: "#b57fe7", textColor: "dark" },
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
    name: "Compatibility Aliases (Dark)",
    colors: [
      { name: "--color-primary", value: "#4318ff", textColor: "light" },
      {
        name: "--color-background-primary",
        value: "#070f2e",
        textColor: "light",
      },
      {
        name: "--color-background-secondary",
        value: "#111c44",
        textColor: "light",
      },
      { name: "--color-text-primary", value: "#f1f5f9", textColor: "dark" },
      { name: "--color-border-primary", value: "#374151", textColor: "light" },
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

function ColorSwatchItem({ color }: { color: ColorSwatch }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.value);
  };

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-105"
      onClick={copyToClipboard}
      title="Click to copy"
    >
      <div
        className="w-20 h-20 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-xs font-mono"
        style={{ backgroundColor: color.value }}
      >
        <span
          className={
            color.textColor === "light" ? "text-white" : "text-neutral-900"
          }
        >
          {color.value.length <= 9 ? color.value.toUpperCase() : "RGBA"}
        </span>
      </div>
      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 text-center max-w-20">
        {color.name}
      </span>
    </div>
  );
}

function GradientPreview() {
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
  // Determine which groups to show
  let displayGroups: ColorGroup[];
  if (groups) {
    displayGroups = groups;
  } else if (theme === "light") {
    displayGroups = lightThemeGroups;
  } else if (theme === "dark") {
    displayGroups = darkThemeGroups;
  } else {
    // Show all
    displayGroups = [...lightThemeGroups, ...darkThemeGroups];
  }

  // Add gradients if requested and no custom groups
  if (showGradients && !groups) {
    displayGroups = [...displayGroups, ...gradientGroups];
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
        • Compatibility aliases remain available for migration. Click any swatch
        to copy the color value.
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

      {displayGroups.map((group) => (
        <div key={group.name} className="mb-8">
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
