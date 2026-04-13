import type {
  ThemeColorType,
  ThemeModeType,
  ThemeVariantType,
} from "../../../foundations/theme";
import { useThemeContext } from "../../../foundations/theme";
import { Button } from "../../forms/button";
import { mergeClassNames } from "../../../utils";
import type { CSSProperties } from "react";

export interface ThemeSwitcherButtonsProps {
  className?: string;
}

const BRAND_OPTIONS: Array<{
  value: ThemeColorType;
  label: string;
  swatch: string;
}> = [
  { value: "purple", label: "Purple", swatch: "var(--ds-brand-purple)" },
  { value: "teal", label: "Teal", swatch: "var(--ds-brand-teal)" },
  { value: "yellow", label: "Yellow", swatch: "var(--ds-brand-yellow)" },
  { value: "green", label: "Green", swatch: "var(--ds-brand-green)" },
];

const VARIANT_OPTIONS: Array<{
  value: ThemeVariantType;
  label: string;
}> = [
  { value: "default", label: "Default" },
  { value: "alt", label: "Alt" },
];

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
          ? "border-ds-border-1 bg-ds-surface-2 text-ds-1 shadow-sm"
          : "border-ds-border-3 bg-ds-surface-1 text-ds-2 hover:border-ds-border-2 hover:text-ds-1",
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
}: ThemeSwitcherButtonsProps) {
  const { mode, theme, variant, setMode, setTheme, setVariant } =
    useThemeContext();

  return (
    <div
      className={mergeClassNames(
        "w-full rounded-2xl border border-ds-border-2 bg-ds-surface-1 p-4 shadow-sm",
        className,
      )}
    >
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-3">
            Mode
          </p>
          <div className="flex flex-wrap gap-2">
            <ToggleButton
              label="Light"
              active={mode === "light"}
              onClick={() => setMode("light")}
            />
            <ToggleButton
              label="Dark"
              active={mode === "dark"}
              onClick={() => setMode("dark")}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-3">
            Brand
          </p>
          <div className="flex flex-wrap gap-2">
            {BRAND_OPTIONS.map((option) => (
              <ToggleButton
                key={option.value}
                label={option.label}
                active={theme === option.value}
                onClick={() => setTheme(option.value)}
                swatch={option.swatch}
                showBrandState
                mode={mode}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-3">
            Variant
          </p>
          <div className="flex flex-wrap gap-2">
            {VARIANT_OPTIONS.map((option) => (
              <ToggleButton
                key={option.value}
                label={option.label}
                active={variant === option.value}
                onClick={() => setVariant(option.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
