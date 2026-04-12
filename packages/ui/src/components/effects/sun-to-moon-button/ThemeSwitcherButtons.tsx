import type { ThemeColorType, ThemeDarkVariantType } from "../../../foundations/theme";
import { useThemeContext } from "../../../foundations/theme";
import { Button } from "../../forms/button";
import { mergeClassNames } from "../../../utils";

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

const DARK_VARIANT_OPTIONS: Array<{
  value: ThemeDarkVariantType;
  label: string;
}> = [
  { value: "default", label: "Default Dark" },
  { value: "alt", label: "Alt Dark" },
];

function ToggleButton({
  label,
  active,
  onClick,
  swatch,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  swatch?: string;
}) {
  return (
    <Button
      variant="secondary"
      size="small"
      onClick={onClick}
      className={mergeClassNames(
        "group rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200",
        active
          ? "border-[var(--ds-border-1)] bg-[var(--ds-surface-2)] text-[var(--ds-text-1)] shadow-sm"
          : "border-[var(--ds-border-3)] bg-[var(--ds-surface-1)] text-[var(--ds-text-2)] hover:border-[var(--ds-border-2)] hover:text-[var(--ds-text-1)]",
      )}
      aria-pressed={active}
    >
      {swatch ? (
        <span
          className={mergeClassNames(
            "h-2.5 w-2.5 rounded-full ring-1 ring-black/10 transition-transform duration-200 group-hover:scale-110",
            active ? "scale-110" : "scale-100",
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
  const { mode, theme, darkVariant, setMode, setTheme, setDarkVariant } =
    useThemeContext();

  return (
    <div
      className={mergeClassNames(
        "w-full rounded-2xl border border-[var(--ds-border-2)] bg-[var(--ds-surface-1)] p-4 shadow-sm",
        className,
      )}
    >
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ds-text-3)]">
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
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ds-text-3)]">
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
              />
            ))}
          </div>
        </div>

        {mode === "dark" ? (
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ds-text-3)]">
              Dark Variant
            </p>
            <div className="flex flex-wrap gap-2">
              {DARK_VARIANT_OPTIONS.map((option) => (
                <ToggleButton
                  key={option.value}
                  label={option.label}
                  active={darkVariant === option.value}
                  onClick={() => setDarkVariant(option.value)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
