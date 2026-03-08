import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type ThemeModeType = "light" | "dark";
export type ThemeColorType = "purple" | "teal" | "yellow" | "green";

export interface UseThemeType {
  mode: ThemeModeType;
  theme: ThemeColorType;
  colorScheme: `${ThemeColorType}-${ThemeModeType}`;
  setMode: (mode: ThemeModeType) => void;
  toggleMode: () => void;
  setTheme: (theme: ThemeColorType) => void;
}

const ThemeContext = createContext<UseThemeType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeModeType>("dark");
  const [theme, setTheme] = useState<ThemeColorType>("purple");

  useEffect(() => {
    const storedMode = localStorage.getItem("mode") as ThemeModeType | null;
    const storedTheme = localStorage.getItem("theme") as ThemeColorType | null;
    if (storedMode && storedMode !== mode) {
      setMode(storedMode);
    }
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const colorScheme = `${theme}-${mode}`;
    document.documentElement.setAttribute("data-theme", colorScheme);
    localStorage.setItem("mode", mode);
    localStorage.setItem("theme", theme);

    // Toggle dark class for Tailwind
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode, theme]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const value: UseThemeType = {
    mode,
    theme,
    colorScheme: `${theme}-${mode}` as const,
    setMode,
    toggleMode,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return ctx;
}
