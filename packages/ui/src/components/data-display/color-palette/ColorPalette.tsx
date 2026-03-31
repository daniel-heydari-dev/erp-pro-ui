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

// ============================================================================
// LIGHT THEME COLORS
// ============================================================================
const lightThemeGroups: ColorGroup[] = [
  {
    name: "Primary",
    colors: [
      { name: "primary-50", value: "#f5f4fe", textColor: "dark" },
      { name: "primary-100", value: "#ebe9fd", textColor: "dark" },
      { name: "primary-200", value: "#dad6fb", textColor: "dark" },
      { name: "primary-300", value: "#bfb8f8", textColor: "dark" },
      { name: "primary-400", value: "#9d91f3", textColor: "dark" },
      { name: "primary-500", value: "#7367f0", textColor: "light" },
      { name: "primary-600", value: "#5a4de6", textColor: "light" },
      { name: "primary-700", value: "#4a3dd2", textColor: "light" },
      { name: "primary-800", value: "#3e33af", textColor: "light" },
      { name: "primary-900", value: "#352d8e", textColor: "light" },
      { name: "primary-950", value: "#201b54", textColor: "light" },
    ],
  },
  {
    name: "Secondary",
    colors: [
      { name: "secondary-50", value: "#f8fafc", textColor: "dark" },
      { name: "secondary-100", value: "#f1f5f9", textColor: "dark" },
      { name: "secondary-200", value: "#e2e8f0", textColor: "dark" },
      { name: "secondary-300", value: "#cbd5e1", textColor: "dark" },
      { name: "secondary-400", value: "#94a3b8", textColor: "dark" },
      { name: "secondary-500", value: "#64748b", textColor: "light" },
      { name: "secondary-600", value: "#475569", textColor: "light" },
      { name: "secondary-700", value: "#334155", textColor: "light" },
      { name: "secondary-800", value: "#1e293b", textColor: "light" },
      { name: "secondary-900", value: "#0f172a", textColor: "light" },
      { name: "secondary-950", value: "#020617", textColor: "light" },
    ],
  },
  {
    name: "Success",
    colors: [
      { name: "success-50", value: "#f0fdf4", textColor: "dark" },
      { name: "success-100", value: "#dcfce7", textColor: "dark" },
      { name: "success-200", value: "#bbf7d0", textColor: "dark" },
      { name: "success-300", value: "#86efac", textColor: "dark" },
      { name: "success-400", value: "#4ade80", textColor: "dark" },
      { name: "success-500", value: "#22c55e", textColor: "light" },
      { name: "success-600", value: "#16a34a", textColor: "light" },
      { name: "success-700", value: "#15803d", textColor: "light" },
      { name: "success-800", value: "#166534", textColor: "light" },
      { name: "success-900", value: "#14532d", textColor: "light" },
      { name: "success-950", value: "#052e16", textColor: "light" },
    ],
  },
  {
    name: "Warning",
    colors: [
      { name: "warning-50", value: "#fffbeb", textColor: "dark" },
      { name: "warning-100", value: "#fef3c7", textColor: "dark" },
      { name: "warning-200", value: "#fde68a", textColor: "dark" },
      { name: "warning-300", value: "#fcd34d", textColor: "dark" },
      { name: "warning-400", value: "#fbbf24", textColor: "dark" },
      { name: "warning-500", value: "#f59e0b", textColor: "dark" },
      { name: "warning-600", value: "#d97706", textColor: "light" },
      { name: "warning-700", value: "#b45309", textColor: "light" },
      { name: "warning-800", value: "#92400e", textColor: "light" },
      { name: "warning-900", value: "#78350f", textColor: "light" },
      { name: "warning-950", value: "#451a03", textColor: "light" },
    ],
  },
  {
    name: "Error / Destructive",
    colors: [
      { name: "error-50", value: "#fef2f2", textColor: "dark" },
      { name: "error-100", value: "#fee2e2", textColor: "dark" },
      { name: "error-200", value: "#fecaca", textColor: "dark" },
      { name: "error-300", value: "#fca5a5", textColor: "dark" },
      { name: "error-400", value: "#f87171", textColor: "dark" },
      { name: "error-500", value: "#ef4444", textColor: "light" },
      { name: "error-600", value: "#dc2626", textColor: "light" },
      { name: "error-700", value: "#b91c1c", textColor: "light" },
      { name: "error-800", value: "#991b1b", textColor: "light" },
      { name: "error-900", value: "#7f1d1d", textColor: "light" },
      { name: "error-950", value: "#450a0a", textColor: "light" },
    ],
  },
  {
    name: "Info",
    colors: [
      { name: "info-50", value: "#eff6ff", textColor: "dark" },
      { name: "info-100", value: "#dbeafe", textColor: "dark" },
      { name: "info-200", value: "#bfdbfe", textColor: "dark" },
      { name: "info-300", value: "#93c5fd", textColor: "dark" },
      { name: "info-400", value: "#60a5fa", textColor: "dark" },
      { name: "info-500", value: "#3b82f6", textColor: "light" },
      { name: "info-600", value: "#2563eb", textColor: "light" },
      { name: "info-700", value: "#1d4ed8", textColor: "light" },
      { name: "info-800", value: "#1e40af", textColor: "light" },
      { name: "info-900", value: "#1e3a8a", textColor: "light" },
      { name: "info-950", value: "#172554", textColor: "light" },
    ],
  },
  {
    name: "Gray / Neutral",
    colors: [
      { name: "gray-50", value: "#fafafa", textColor: "dark" },
      { name: "gray-100", value: "#f4f4f5", textColor: "dark" },
      { name: "gray-200", value: "#e4e4e7", textColor: "dark" },
      { name: "gray-300", value: "#d4d4d8", textColor: "dark" },
      { name: "gray-400", value: "#a1a1aa", textColor: "dark" },
      { name: "gray-500", value: "#71717a", textColor: "light" },
      { name: "gray-600", value: "#52525b", textColor: "light" },
      { name: "gray-700", value: "#3f3f46", textColor: "light" },
      { name: "gray-800", value: "#27272a", textColor: "light" },
      { name: "gray-900", value: "#18181b", textColor: "light" },
      { name: "gray-950", value: "#09090b", textColor: "light" },
    ],
  },
  {
    name: "Background (Light Theme)",
    colors: [
      { name: "background", value: "#ffffff", textColor: "dark" },
      { name: "background-subtle", value: "#f8fafc", textColor: "dark" },
      { name: "background-muted", value: "#f1f5f9", textColor: "dark" },
      { name: "surface", value: "#ffffff", textColor: "dark" },
      { name: "surface-raised", value: "#f8fafc", textColor: "dark" },
      { name: "card", value: "#ffffff", textColor: "dark" },
      { name: "popover", value: "#ffffff", textColor: "dark" },
    ],
  },
  {
    name: "Text (Light Theme)",
    colors: [
      { name: "text-primary", value: "#0f172a", textColor: "light" },
      { name: "text-secondary", value: "#475569", textColor: "light" },
      { name: "text-muted", value: "#64748b", textColor: "light" },
      { name: "text-disabled", value: "#94a3b8", textColor: "dark" },
      { name: "text-placeholder", value: "#a1a1aa", textColor: "dark" },
      { name: "text-inverse", value: "#ffffff", textColor: "dark" },
    ],
  },
  {
    name: "Border (Light Theme)",
    colors: [
      { name: "border", value: "#e2e8f0", textColor: "dark" },
      { name: "border-muted", value: "#f1f5f9", textColor: "dark" },
      { name: "border-strong", value: "#cbd5e1", textColor: "dark" },
      { name: "ring", value: "#7367f0", textColor: "light" },
      { name: "input", value: "#e2e8f0", textColor: "dark" },
    ],
  },
];

// ============================================================================
// DARK THEME COLORS
// ============================================================================
const darkThemeGroups: ColorGroup[] = [
  {
    name: "Primary (Dark)",
    colors: [
      { name: "primary-50", value: "#201b54", textColor: "light" },
      { name: "primary-100", value: "#352d8e", textColor: "light" },
      { name: "primary-200", value: "#3e33af", textColor: "light" },
      { name: "primary-300", value: "#4a3dd2", textColor: "light" },
      { name: "primary-400", value: "#5a4de6", textColor: "light" },
      { name: "primary-500", value: "#7367f0", textColor: "light" },
      { name: "primary-600", value: "#9d91f3", textColor: "dark" },
      { name: "primary-700", value: "#bfb8f8", textColor: "dark" },
      { name: "primary-800", value: "#dad6fb", textColor: "dark" },
      { name: "primary-900", value: "#ebe9fd", textColor: "dark" },
      { name: "primary-950", value: "#f5f4fe", textColor: "dark" },
    ],
  },
  {
    name: "Secondary (Dark)",
    colors: [
      { name: "secondary-50", value: "#020617", textColor: "light" },
      { name: "secondary-100", value: "#0f172a", textColor: "light" },
      { name: "secondary-200", value: "#1e293b", textColor: "light" },
      { name: "secondary-300", value: "#334155", textColor: "light" },
      { name: "secondary-400", value: "#475569", textColor: "light" },
      { name: "secondary-500", value: "#64748b", textColor: "light" },
      { name: "secondary-600", value: "#94a3b8", textColor: "dark" },
      { name: "secondary-700", value: "#cbd5e1", textColor: "dark" },
      { name: "secondary-800", value: "#e2e8f0", textColor: "dark" },
      { name: "secondary-900", value: "#f1f5f9", textColor: "dark" },
      { name: "secondary-950", value: "#f8fafc", textColor: "dark" },
    ],
  },
  {
    name: "Background (Dark Theme)",
    colors: [
      { name: "background", value: "#09090b", textColor: "light" },
      { name: "background-subtle", value: "#18181b", textColor: "light" },
      { name: "background-muted", value: "#27272a", textColor: "light" },
      { name: "surface", value: "#18181b", textColor: "light" },
      { name: "surface-raised", value: "#27272a", textColor: "light" },
      { name: "card", value: "#18181b", textColor: "light" },
      { name: "popover", value: "#27272a", textColor: "light" },
    ],
  },
  {
    name: "Text (Dark Theme)",
    colors: [
      { name: "text-primary", value: "#fafafa", textColor: "dark" },
      { name: "text-secondary", value: "#a1a1aa", textColor: "dark" },
      { name: "text-muted", value: "#71717a", textColor: "light" },
      { name: "text-disabled", value: "#52525b", textColor: "light" },
      { name: "text-placeholder", value: "#71717a", textColor: "light" },
      { name: "text-inverse", value: "#09090b", textColor: "light" },
    ],
  },
  {
    name: "Border (Dark Theme)",
    colors: [
      { name: "border", value: "#27272a", textColor: "light" },
      { name: "border-muted", value: "#18181b", textColor: "light" },
      { name: "border-strong", value: "#3f3f46", textColor: "light" },
      { name: "ring", value: "#7367f0", textColor: "light" },
      { name: "input", value: "#27272a", textColor: "light" },
    ],
  },
];

// ============================================================================
// GRADIENTS
// ============================================================================
const gradientGroups: ColorGroup[] = [
  {
    name: "Primary Gradients",
    colors: [
      { name: "primary-gradient-start", value: "#7367f0", textColor: "light" },
      { name: "primary-gradient-end", value: "#9d91f3", textColor: "light" },
    ],
  },
  {
    name: "Accent Gradients",
    colors: [
      { name: "accent-gradient-start", value: "#7367f0", textColor: "light" },
      { name: "accent-gradient-end", value: "#3b82f6", textColor: "light" },
    ],
  },
  {
    name: "Success Gradients",
    colors: [
      { name: "success-gradient-start", value: "#22c55e", textColor: "light" },
      { name: "success-gradient-end", value: "#16a34a", textColor: "light" },
    ],
  },
  {
    name: "Warning Gradients",
    colors: [
      { name: "warning-gradient-start", value: "#f59e0b", textColor: "dark" },
      { name: "warning-gradient-end", value: "#d97706", textColor: "light" },
    ],
  },
  {
    name: "Error Gradients",
    colors: [
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
        Gradient Examples
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Primary Gradient */}
        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={{
              background: "linear-gradient(135deg, #7367f0, #9d91f3)",
            }}
          >
            Primary Gradient
          </div>
          <code className="text-xs text-neutral-500">
            linear-gradient(135deg, #7367f0, #9d91f3)
          </code>
        </div>

        {/* Primary to Info */}
        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={{
              background: "linear-gradient(135deg, #7367f0, #3b82f6)",
            }}
          >
            Primary to Info
          </div>
          <code className="text-xs text-neutral-500">
            linear-gradient(135deg, #7367f0, #3b82f6)
          </code>
        </div>

        {/* Success Gradient */}
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

        {/* Warning Gradient */}
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

        {/* Error Gradient */}
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

        {/* Glass Effect */}
        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium backdrop-blur-xl border border-white/20"
            style={{
              background: "rgba(115, 103, 240, 0.7)",
            }}
          >
            Glass Effect
          </div>
          <code className="text-xs text-neutral-500">
            rgba(115, 103, 240, 0.7) + backdrop-blur
          </code>
        </div>

        {/* Mesh Gradient */}
        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={{
              background:
                "radial-gradient(at 40% 20%, #7367f0 0px, transparent 50%), radial-gradient(at 80% 0%, #3b82f6 0px, transparent 50%), radial-gradient(at 0% 50%, #22c55e 0px, transparent 50%), radial-gradient(at 80% 50%, #9d91f3 0px, transparent 50%), radial-gradient(at 0% 100%, #7367f0 0px, transparent 50%)",
              backgroundColor: "#1e293b",
            }}
          >
            Mesh Gradient
          </div>
          <code className="text-xs text-neutral-500">radial-gradient mesh</code>
        </div>

        {/* Navigation Active */}
        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={{
              background:
                "linear-gradient(270deg, rgba(115, 103, 240, 0.7), rgb(115, 103, 240))",
              boxShadow: "0 2px 6px rgba(115, 103, 240, 0.3)",
            }}
          >
            Nav Active State
          </div>
          <code className="text-xs text-neutral-500">270deg with opacity</code>
        </div>

        {/* Dark Surface */}
        <div className="flex flex-col gap-2">
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium border border-white/10"
            style={{
              background: "linear-gradient(180deg, #27272a, #18181b)",
            }}
          >
            Dark Surface
          </div>
          <code className="text-xs text-neutral-500">
            linear-gradient(180deg, #27272a, #18181b)
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
        CSS Variables Usage
      </h3>
      <div className="space-y-4">
        <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
            Tailwind Config
          </h4>
          <pre className="text-xs font-mono text-neutral-600 dark:text-neutral-400 overflow-x-auto">
            {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f4fe',
          500: '#7367f0',
          600: '#5a4de6',
        },
        success: {
          500: '#22c55e',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        info: {
          500: '#3b82f6',
        },
      },
    },
  },
}`}
          </pre>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
            CSS Variables
          </h4>
          <pre className="text-xs font-mono text-neutral-600 dark:text-neutral-400 overflow-x-auto">
            {`:root {
  --color-primary: #7367f0;
  --color-secondary: #64748b;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Light theme */
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
}

.dark {
  --color-background: #09090b;
  --color-foreground: #fafafa;
  --color-muted: #71717a;
  --color-border: #27272a;
}`}
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
        Primary color:{" "}
        <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
          #7367f0
        </code>{" "}
        • Click any swatch to copy the color value.
      </p>

      {/* Theme Toggle Info */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            theme === "light" || theme === "all"
              ? "bg-primary-100 text-primary-700"
              : "bg-neutral-100 text-neutral-500"
          }`}
        >
          Light Theme
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            theme === "dark" || theme === "all"
              ? "bg-primary-100 text-primary-700"
              : "bg-neutral-100 text-neutral-500"
          }`}
        >
          Dark Theme
        </span>
        {showGradients && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
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
