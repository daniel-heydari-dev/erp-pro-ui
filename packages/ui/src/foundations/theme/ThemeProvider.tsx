import { createContext, useContext, useLayoutEffect, useState } from "react";
import type { ReactNode } from "react";

export type ThemeModeType = "light" | "dark";
export type ThemeColorType = "purple" | "teal" | "yellow" | "green";
export type ThemeVariantType = "default" | "alt";
/**
 * @deprecated Use ThemeVariantType instead.
 */
export type ThemeDarkVariantType = ThemeVariantType;
export type ThemeColorSchemeType =
  | `${ThemeColorType}-light`
  | `${ThemeColorType}-light-alt`
  | `${ThemeColorType}-dark`
  | `${ThemeColorType}-dark-alt`;

export interface UseThemeType {
  mode: ThemeModeType;
  theme: ThemeColorType;
  brand: ThemeColorType;
  variant: ThemeVariantType;
  /**
   * @deprecated Use `variant` instead.
   */
  darkVariant: ThemeVariantType;
  colorScheme: ThemeColorSchemeType;
  setMode: (mode: ThemeModeType) => void;
  toggleMode: () => void;
  setTheme: (theme: ThemeColorType) => void;
  setVariant: (variant: ThemeVariantType) => void;
  toggleVariant: () => void;
  /**
   * @deprecated Use `setVariant` instead.
   */
  setDarkVariant: (variant: ThemeVariantType) => void;
  /**
   * @deprecated Use `toggleVariant` instead.
   */
  toggleDarkVariant: () => void;
}

const ThemeContext = createContext<UseThemeType | null>(null);

const MODE_STORAGE_KEY = "erp-pro-ui:mode";
const THEME_STORAGE_KEY = "erp-pro-ui:theme";
const VARIANT_STORAGE_KEY = "erp-pro-ui:variant";
const DARK_VARIANT_STORAGE_KEY = "erp-pro-ui:dark-variant";

function getStoredMode(): ThemeModeType | null {
  if (typeof window === "undefined") {
    return null;
  }

  const mode =
    localStorage.getItem(MODE_STORAGE_KEY) ?? localStorage.getItem("mode");
  return mode === "light" || mode === "dark" ? mode : null;
}

function getStoredTheme(): ThemeColorType | null {
  if (typeof window === "undefined") {
    return null;
  }

  const theme =
    localStorage.getItem(THEME_STORAGE_KEY) ?? localStorage.getItem("theme");
  return theme === "purple" ||
    theme === "teal" ||
    theme === "yellow" ||
    theme === "green"
    ? theme
    : null;
}

function getStoredVariant(): ThemeVariantType | null {
  if (typeof window === "undefined") {
    return null;
  }

  const variant =
    localStorage.getItem(VARIANT_STORAGE_KEY) ??
    localStorage.getItem(DARK_VARIANT_STORAGE_KEY);
  return variant === "default" || variant === "alt" ? variant : null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeModeType>(
    () => getStoredMode() ?? "dark",
  );
  const [theme, setTheme] = useState<ThemeColorType>(
    () => getStoredTheme() ?? "purple",
  );
  const [variant, setVariant] = useState<ThemeVariantType>(
    () => getStoredVariant() ?? "default",
  );

  useLayoutEffect(() => {
    const colorScheme = (
      variant === "alt" ? `${theme}-${mode}-alt` : `${theme}-${mode}`
    ) as ThemeColorSchemeType;

    document.documentElement.setAttribute("data-brand", theme);
    document.documentElement.setAttribute("data-mode", mode);
    document.documentElement.setAttribute("data-variant", variant);
    // Backward-compatibility attribute for consumers still using darkVariant.
    document.documentElement.setAttribute("data-dark-variant", variant);
    document.documentElement.setAttribute("data-theme", colorScheme);
    document.documentElement.style.colorScheme = mode;

    localStorage.setItem(MODE_STORAGE_KEY, mode);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem(VARIANT_STORAGE_KEY, variant);
    localStorage.setItem(DARK_VARIANT_STORAGE_KEY, variant);
    localStorage.setItem("mode", mode);
    localStorage.setItem("theme", theme);

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode, theme, variant]);

  const toggleMode = () =>
    setMode((previousMode) => (previousMode === "light" ? "dark" : "light"));
  const toggleVariant = () =>
    setVariant((previousVariant) =>
      previousVariant === "default" ? "alt" : "default",
    );

  const value: UseThemeType = {
    mode,
    theme,
    brand: theme,
    variant,
    darkVariant: variant,
    colorScheme: (variant === "alt"
      ? `${theme}-${mode}-alt`
      : `${theme}-${mode}`) as ThemeColorSchemeType,
    setMode,
    toggleMode,
    setTheme,
    setVariant,
    toggleVariant,
    setDarkVariant: setVariant,
    toggleDarkVariant: toggleVariant,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
}
