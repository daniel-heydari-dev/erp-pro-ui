import { createContext, useContext, useLayoutEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type ThemeModeType = 'light' | 'dark';
export type ThemeColorType = 'purple' | 'teal' | 'yellow' | 'green';

export interface UseThemeType {
  mode: ThemeModeType;
  theme: ThemeColorType;
  colorScheme: `${ThemeColorType}-${ThemeModeType}`;
  setMode: (mode: ThemeModeType) => void;
  toggleMode: () => void;
  setTheme: (theme: ThemeColorType) => void;
}

const ThemeContext = createContext<UseThemeType | null>(null);

const MODE_STORAGE_KEY = 'erp-pro-ui:mode';
const THEME_STORAGE_KEY = 'erp-pro-ui:theme';

function getStoredMode(): ThemeModeType | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const mode =
    localStorage.getItem(MODE_STORAGE_KEY) ?? localStorage.getItem('mode');
  return mode === 'light' || mode === 'dark' ? mode : null;
}

function getStoredTheme(): ThemeColorType | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const theme =
    localStorage.getItem(THEME_STORAGE_KEY) ?? localStorage.getItem('theme');
  return theme === 'purple' ||
    theme === 'teal' ||
    theme === 'yellow' ||
    theme === 'green'
    ? theme
    : null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeModeType>(
    () => getStoredMode() ?? 'dark',
  );
  const [theme, setTheme] = useState<ThemeColorType>(
    () => getStoredTheme() ?? 'purple',
  );

  useLayoutEffect(() => {
    const colorScheme = `${theme}-${mode}`;

    document.documentElement.setAttribute('data-theme', colorScheme);
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.style.colorScheme = mode;

    localStorage.setItem(MODE_STORAGE_KEY, mode);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem('mode', mode);
    localStorage.setItem('theme', theme);

    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode, theme]);

  const toggleMode = () =>
    setMode((previousMode) => (previousMode === 'light' ? 'dark' : 'light'));

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
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}
