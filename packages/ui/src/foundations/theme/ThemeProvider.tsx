import { createContext, useContext, useLayoutEffect, useState } from "react";
import type { ReactNode } from "react";

export type ThemeModeType = "light" | "dark";
export type ThemeColorType = "purple" | "teal" | "yellow" | "green";
export type ThemeDarkVariantType = "default" | "alt";
export type ThemeColorSchemeType =
  | `${ThemeColorType}-light`
  | `${ThemeColorType}-dark`
  | `${ThemeColorType}-dark-alt`;

export interface UseThemeType {
  mode: ThemeModeType;
  theme: ThemeColorType;
  brand: ThemeColorType;
  darkVariant: ThemeDarkVariantType;
  colorScheme: ThemeColorSchemeType;
  setMode: (mode: ThemeModeType) => void;
  toggleMode: () => void;
  setTheme: (theme: ThemeColorType) => void;
  setDarkVariant: (darkVariant: ThemeDarkVariantType) => void;
  toggleDarkVariant: () => void;
}

const ThemeContext = createContext<UseThemeType | null>(null);

const MODE_STORAGE_KEY = "erp-pro-ui:mode";
const THEME_STORAGE_KEY = "erp-pro-ui:theme";
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

function getStoredDarkVariant(): ThemeDarkVariantType | null {
  if (typeof window === "undefined") {
    return null;
  }

  const darkVariant = localStorage.getItem(DARK_VARIANT_STORAGE_KEY);
  return darkVariant === "default" || darkVariant === "alt"
    ? darkVariant
    : null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeModeType>(
    () => getStoredMode() ?? "dark",
  );
  const [theme, setTheme] = useState<ThemeColorType>(
    () => getStoredTheme() ?? "purple",
  );
  const [darkVariant, setDarkVariant] = useState<ThemeDarkVariantType>(
    () => getStoredDarkVariant() ?? "default",
  );

  useLayoutEffect(() => {
    const colorScheme =
      mode === "dark" && darkVariant === "alt"
        ? (`${theme}-dark-alt` as ThemeColorSchemeType)
        : (`${theme}-${mode}` as ThemeColorSchemeType);

    document.documentElement.setAttribute("data-brand", theme);
    document.documentElement.setAttribute("data-mode", mode);
    document.documentElement.setAttribute("data-dark-variant", darkVariant);
    document.documentElement.setAttribute("data-theme", colorScheme);
    document.documentElement.style.colorScheme = mode;

    localStorage.setItem(MODE_STORAGE_KEY, mode);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem(DARK_VARIANT_STORAGE_KEY, darkVariant);
    localStorage.setItem("mode", mode);
    localStorage.setItem("theme", theme);

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode, theme, darkVariant]);

  const toggleMode = () =>
    setMode((previousMode) => (previousMode === "light" ? "dark" : "light"));
  const toggleDarkVariant = () =>
    setDarkVariant((previousVariant) =>
      previousVariant === "default" ? "alt" : "default",
    );

  const value: UseThemeType = {
    mode,
    theme,
    brand: theme,
    darkVariant,
    colorScheme:
      mode === "dark" && darkVariant === "alt"
        ? (`${theme}-dark-alt` as ThemeColorSchemeType)
        : (`${theme}-${mode}` as ThemeColorSchemeType),
    setMode,
    toggleMode,
    setTheme,
    setDarkVariant,
    toggleDarkVariant,
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
