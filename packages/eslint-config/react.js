import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { baseConfig } from "./base.js";

/** @type {import('eslint').Linter.Config[]} */
export const reactConfig = [
  ...baseConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      ...reactHooksPlugin.configs.flat.recommended.plugins,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      parserOptions: {
        ...reactPlugin.configs.flat.recommended.languageOptions?.parserOptions,
        ecmaFeatures: {
          ...reactPlugin.configs.flat.recommended.languageOptions?.parserOptions
            ?.ecmaFeatures,
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "19.2",
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];
