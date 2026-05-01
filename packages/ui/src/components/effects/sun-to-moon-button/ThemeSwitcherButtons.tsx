import type {
  ThemeColorType,
  ThemeModeType,
  ThemeVariantType,
} from "../../../foundations/theme";
import { useThemeContext } from "../../../foundations/theme";
import { Button } from "../../forms/button";
import { mergeClassNames } from "../../../utils";
import type { CSSProperties } from "react";

export interface ThemeSwitcherLabels {
  mode?: string;
  light?: string;
  dark?: string;
  brand?: string;
  variant?: string;
  variantDefault?: string;
  variantAlt?: string;
  purple?: string;
  teal?: string;
  yellow?: string;
  green?: string;
}

export interface ThemeSwitcherButtonsProps {
  className?: string;
  /** Override any label for localisation / translation. */
  labels?: ThemeSwitcherLabels;
}

const BRAND_SWATCHES: Record<ThemeColorType, string> = {
  purple: "var(--ds-brand-purple)",
  teal:   "var(--ds-brand-teal)",
  yellow: "var(--ds-brand-yellow)",
  green:  "var(--ds-brand-green)",
};

function ToggleButton({
  label,
  active,
  onClick,
  swatch,
  showBrandState = false,
  mode,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  swatch?: string;
  showBrandState?: boolean;
  mode?: ThemeModeType;
}) {
  const isLightMode = mode === "light";
  const toneStyle: CSSProperties | undefined = (() => {
    if (!showBrandState || !swatch) {
      return undefined;
    }

    if (isLightMode) {
      return {
        borderColor: active ? swatch : "var(--ds-border-2)",
        backgroundColor: active
          ? `color-mix(in srgb, ${swatch} 12%, #ffffff)`
          : "#ffffff",
        color: active
          ? `color-mix(in srgb, ${swatch} 76%, var(--ds-text-1))`
          : "var(--ds-text-2)",
        boxShadow: active
          ? `0 0 0 1px color-mix(in srgb, ${swatch} 24%, transparent)`
          : "none",
      };
    }

    return {
      borderColor: active
        ? swatch
        : `color-mix(in srgb, ${swatch} 42%, var(--ds-border-3))`,
      backgroundColor: active
        ? `color-mix(in srgb, ${swatch} 16%, var(--ds-surface-1))`
        : `color-mix(in srgb, ${swatch} 6%, var(--ds-surface-1))`,
    };
  })();

  return (
    <Button
      variant="secondary"
      size="small"
      onClick={onClick}
      className={mergeClassNames(
        "group rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200",
        active
          ? "border-ds-border-accent bg-ds-surface-2 text-ds-1 shadow-sm ring-1 ring-ds-border-accent/40"
          : "border-ds-border-2 bg-ds-surface-1 text-ds-2 hover:border-ds-border-accent/50 hover:bg-ds-surface-2 hover:text-ds-1",
        showBrandState && isLightMode
          ? "bg-ds-surface-1! hover:bg-ds-surface-1!"
          : null,
        showBrandState && active ? "text-ds-1" : null,
      )}
      style={toneStyle}
      aria-pressed={active}
    >
      {swatch ? (
        <span
          className={mergeClassNames(
            "h-2.5 w-2.5 rounded-full ring-1 ring-black/10 transition-transform duration-200 group-hover:scale-110",
            active
              ? isLightMode
                ? "scale-110 ring-2 ring-black/15"
                : "scale-110 ring-2 ring-white/35"
              : "scale-100 opacity-90",
          )}
          style={{ backgroundColor: swatch }}
          aria-hidden="true"
        />
      ) : null}
      <span>{label}</span>
    </Button>
  );
}

export default function ThemeSwitcherButtons({
  className,
  labels = {},
}: ThemeSwitcherButtonsProps) {
  const { mode, theme, variant, setMode, setTheme, setVariant } =
    useThemeContext();

  const l: Required<ThemeSwitcherLabels> = {
    mode:           labels.mode           ?? "Mode",
    light:          labels.light          ?? "Light",
    dark:           labels.dark           ?? "Dark",
    brand:          labels.brand          ?? "Brand",
    variant:        labels.variant        ?? "Variant",
    variantDefault: labels.variantDefault ?? "Default",
    variantAlt:     labels.variantAlt     ?? "Alt",
    purple:         labels.purple         ?? "Purple",
    teal:           labels.teal           ?? "Teal",
    yellow:         labels.yellow         ?? "Yellow",
    green:          labels.green          ?? "Green",
  };

  const brandOptions: Array<{ value: ThemeColorType; label: string; swatch: string }> = [
    { value: "purple", label: l.purple, swatch: BRAND_SWATCHES.purple },
    { value: "teal",   label: l.teal,   swatch: BRAND_SWATCHES.teal   },
    { value: "yellow", label: l.yellow, swatch: BRAND_SWATCHES.yellow },
    { value: "green",  label: l.green,  swatch: BRAND_SWATCHES.green  },
  ];

  const variantOptions: Array<{ value: ThemeVariantType; label: string }> = [
    { value: "default", label: l.variantDefault },
    { value: "alt",     label: l.variantAlt     },
  ];

  return (
    <div
      className={mergeClassNames(
        "w-full rounded-2xl border border-ds-border-2 bg-ds-canvas p-4 shadow-sm",
        className,
      )}
    >
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-3">
            {l.mode}
          </p>
          <div className="flex flex-wrap gap-2">
            <ToggleButton label={l.light} active={mode === "light"} onClick={() => setMode("light")} />
            <ToggleButton label={l.dark}  active={mode === "dark"}  onClick={() => setMode("dark")}  />
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-3">
            {l.brand}
          </p>
          <div className="flex flex-wrap gap-2">
            {brandOptions.map((opt) => (
              <ToggleButton
                key={opt.value}
                label={opt.label}
                active={theme === opt.value}
                onClick={() => setTheme(opt.value)}
                swatch={opt.swatch}
                showBrandState
                mode={mode}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-3">
            {l.variant}
          </p>
          <div className="flex flex-wrap gap-2">
            {variantOptions.map((opt) => (
              <ToggleButton
                key={opt.value}
                label={opt.label}
                active={variant === opt.value}
                onClick={() => setVariant(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
