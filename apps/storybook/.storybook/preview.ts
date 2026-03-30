import type { ReactNode } from 'react';
import type { Preview } from '@storybook/react-vite';
import { createElement, useEffect } from 'react';

import {
  ThemeProvider,
  useThemeContext,
} from '../../../packages/ui/src/foundations/theme';

import '../src/index.css';

type StorybookThemeColor = 'purple' | 'teal' | 'yellow' | 'green';
type StorybookThemeMode = 'light' | 'dark';

function StorybookThemeBridge({
  children,
  theme,
  mode,
}: {
  children?: ReactNode;
  theme: StorybookThemeColor;
  mode: StorybookThemeMode;
}) {
  const { setMode, setTheme } = useThemeContext();

  useEffect(() => {
    setMode(mode);
    setTheme(theme);
  }, [mode, setMode, setTheme, theme]);

  return createElement(
    'div',
    {
      className:
        'min-h-screen bg-background p-6 text-foreground transition-colors duration-200',
      'data-mode': mode,
    },
    children,
  );
}

const preview: Preview = {
  initialGlobals: {
    themeMode: 'dark',
    themeColor: 'purple',
  },
  globalTypes: {
    themeColor: {
      name: 'Theme brand',
      description: 'Global brand preset for Storybook canvas',
      toolbar: {
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'purple', title: 'Purple' },
          { value: 'teal', title: 'Teal' },
          { value: 'yellow', title: 'Yellow' },
          { value: 'green', title: 'Green' },
        ],
      },
    },
    themeMode: {
      name: 'Theme mode',
      description: 'Global color mode for Storybook canvas',
      toolbar: {
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) =>
      createElement(
        ThemeProvider,
        null,
        createElement(
          StorybookThemeBridge,
          {
            theme: context.globals.themeColor as StorybookThemeColor,
            mode: context.globals.themeMode as StorybookThemeMode,
          },
          createElement(Story),
        ),
      ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      values: [
        { name: 'app-light', value: '#ffffff' },
        { name: 'app-dark', value: '#09090b' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
