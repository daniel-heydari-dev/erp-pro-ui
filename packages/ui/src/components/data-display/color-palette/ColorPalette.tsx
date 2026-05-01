"use client";

import React from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TokenSwatch {
  /** Tailwind class displayed as the main label, e.g. "bg-ds-surface-1" */
  twClass: string;
  /** Underlying CSS variable, e.g. "var(--ds-surface-1)" */
  cssVar: string;
  /** Short role description */
  role: string;
  /** Hint for readable label on the swatch itself */
  textOnColor?: "light" | "dark" | "auto";
}

export interface TokenGroup {
  /** Section heading */
  name: string;
  swatches: TokenSwatch[];
}

export interface ColorPaletteProps {
  /** Override the built-in groups with custom data */
  groups?: TokenGroup[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Canonical token groups (correct --ds-* CSS variables)
// ---------------------------------------------------------------------------

export const surfaceGroup: TokenGroup = {
  name: "Surfaces",
  swatches: [
    { twClass: "bg-ds-canvas",    cssVar: "var(--ds-surface-canvas)", role: "Page / app canvas",      textOnColor: "dark" },
    { twClass: "bg-ds-surface-1", cssVar: "var(--ds-surface-1)",      role: "Card / panel",           textOnColor: "dark" },
    { twClass: "bg-ds-surface-2", cssVar: "var(--ds-surface-2)",      role: "Elevated (modal/popover)", textOnColor: "dark" },
    { twClass: "bg-ds-surface-3", cssVar: "var(--ds-surface-3)",      role: "Highest elevated",       textOnColor: "dark" },
    { twClass: "bg-ds-accent-subtle", cssVar: "var(--ds-color-accent-subtle)", role: "Accent tinted surface", textOnColor: "dark" },
  ],
};

export const textGroup: TokenGroup = {
  name: "Text",
  swatches: [
    { twClass: "text-ds-1", cssVar: "var(--ds-text-1)", role: "Primary text",         textOnColor: "light" },
    { twClass: "text-ds-2", cssVar: "var(--ds-text-2)", role: "Secondary / labels",   textOnColor: "light" },
    { twClass: "text-ds-3", cssVar: "var(--ds-text-3)", role: "Muted / hints",        textOnColor: "light" },
    { twClass: "text-ds-on-accent", cssVar: "var(--ds-color-on-accent)", role: "On accent bg", textOnColor: "dark" },
  ],
};

export const borderGroup: TokenGroup = {
  name: "Borders",
  swatches: [
    { twClass: "border-ds-border-1",     cssVar: "var(--ds-border-1)",    role: "Strong border",    textOnColor: "dark" },
    { twClass: "border-ds-border-2",     cssVar: "var(--ds-border-2)",    role: "Default border",   textOnColor: "dark" },
    { twClass: "border-ds-border-3",     cssVar: "var(--ds-border-3)",    role: "Subtle divider",   textOnColor: "dark" },
    { twClass: "border-ds-border-4",     cssVar: "var(--ds-border-4)",    role: "Faintest border",  textOnColor: "dark" },
    { twClass: "border-ds-border-field", cssVar: "var(--ds-border-field)", role: "Input field border", textOnColor: "dark" },
  ],
};

export const accentGroup: TokenGroup = {
  name: "Accent",
  swatches: [
    { twClass: "bg-ds-accent",       cssVar: "var(--ds-color-accent)",       role: "Brand / interactive",  textOnColor: "light" },
    { twClass: "bg-ds-accent-hover", cssVar: "var(--ds-color-accent-hover)", role: "Hover state",          textOnColor: "light" },
    { twClass: "ring-ds-focus",      cssVar: "var(--ds-color-focus-ring)",   role: "Focus ring",           textOnColor: "light" },
  ],
};

export const accentScaleGroup: TokenGroup = {
  name: "Accent Scale",
  swatches: [
    { twClass: "--ds-accent-50",  cssVar: "var(--ds-accent-50)",  role: "Lightest",  textOnColor: "dark"  },
    { twClass: "--ds-accent-100", cssVar: "var(--ds-accent-100)", role: "100",       textOnColor: "dark"  },
    { twClass: "--ds-accent-200", cssVar: "var(--ds-accent-200)", role: "200",       textOnColor: "dark"  },
    { twClass: "--ds-accent-300", cssVar: "var(--ds-accent-300)", role: "300",       textOnColor: "dark"  },
    { twClass: "--ds-accent-400", cssVar: "var(--ds-accent-400)", role: "400",       textOnColor: "light" },
    { twClass: "--ds-accent-500", cssVar: "var(--ds-accent-500)", role: "Base (500)", textOnColor: "light" },
    { twClass: "--ds-accent-600", cssVar: "var(--ds-accent-600)", role: "600",       textOnColor: "light" },
    { twClass: "--ds-accent-700", cssVar: "var(--ds-accent-700)", role: "700",       textOnColor: "light" },
    { twClass: "--ds-accent-800", cssVar: "var(--ds-accent-800)", role: "800",       textOnColor: "light" },
    { twClass: "--ds-accent-900", cssVar: "var(--ds-accent-900)", role: "Darkest",   textOnColor: "light" },
  ],
};

export const brandGroup: TokenGroup = {
  name: "Brand Themes",
  swatches: [
    { twClass: "bg-ds-brand-purple", cssVar: "var(--ds-brand-purple)", role: "Purple (default)", textOnColor: "light" },
    { twClass: "bg-ds-brand-teal",   cssVar: "var(--ds-brand-teal)",   role: "Teal",             textOnColor: "light" },
    { twClass: "bg-ds-brand-yellow", cssVar: "var(--ds-brand-yellow)", role: "Yellow",           textOnColor: "dark"  },
    { twClass: "bg-ds-brand-green",  cssVar: "var(--ds-brand-green)",  role: "Green",            textOnColor: "light" },
  ],
};

export const statusGroup: TokenGroup = {
  name: "Status",
  swatches: [
    { twClass: "bg-ds-state-success", cssVar: "var(--ds-color-success)", role: "Success",  textOnColor: "light" },
    { twClass: "bg-ds-state-warning", cssVar: "var(--ds-color-warning)", role: "Warning",  textOnColor: "dark"  },
    { twClass: "bg-ds-state-danger",  cssVar: "var(--ds-color-danger)",  role: "Danger",   textOnColor: "light" },
    { twClass: "bg-ds-state-info",    cssVar: "var(--ds-color-info)",    role: "Info",     textOnColor: "light" },
  ],
};

export const defaultGroups: TokenGroup[] = [
  surfaceGroup,
  textGroup,
  borderGroup,
  accentGroup,
  accentScaleGroup,
  brandGroup,
  statusGroup,
];

// ---------------------------------------------------------------------------
// SwatchCard
// ---------------------------------------------------------------------------

function SwatchCard({ swatch }: { swatch: TokenSwatch }) {
  const swatchRef = React.useRef<HTMLDivElement>(null);
  const [hex, setHex] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const el = swatchRef.current;
    if (!el) return;
    const bg = getComputedStyle(el).backgroundColor;
    setHex(bg || "");
  }, [swatch.cssVar]);

  const handleCopy = () => {
    navigator.clipboard.writeText(swatch.twClass).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCopy}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCopy(); }}
      title={`Copy ${swatch.twClass}`}
      className="group flex flex-col gap-0 rounded-xl border border-ds-border-2 overflow-hidden text-start cursor-pointer transition hover:shadow-md hover:border-ds-border-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus"
    >
      {/* Color preview */}
      <div
        ref={swatchRef}
        className="relative h-16 w-full flex items-end px-2 pb-1.5"
        style={{ backgroundColor: swatch.cssVar }}
      >
        {copied && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold bg-black/30 text-white rounded-t-xl">
            Copied!
          </span>
        )}
        <span
          className="font-mono text-[9px] leading-none opacity-70"
          style={{ color: swatch.textOnColor === "light" ? "#fff" : "#000" }}
        >
          {hex || "LIVE"}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-0.5 px-3 py-2.5 bg-ds-surface-1">
        <span className="text-[11px] font-semibold font-mono text-ds-1 truncate">
          {swatch.twClass}
        </span>
        <span className="text-[10px] font-mono text-ds-3 truncate">
          {swatch.cssVar}
        </span>
        <span className="text-[10px] text-ds-2 mt-0.5">{swatch.role}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ColorPalette
// ---------------------------------------------------------------------------

export default function ColorPalette({ groups, className }: ColorPaletteProps) {
  const displayGroups = groups ?? defaultGroups;

  return (
    <div className={`space-y-8 ${className ?? ""}`}>
      {displayGroups.map((group) => (
        <section key={group.name}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-ds-2">
            {group.name}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {group.swatches.map((swatch) => (
              <SwatchCard key={swatch.twClass} swatch={swatch} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export { ColorPalette };
