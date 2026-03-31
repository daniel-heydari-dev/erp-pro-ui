import { reactConfig } from "@erp-pro/eslint-config/react.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
  {
    rules: {
      "react/no-unescaped-entities": "warn",
    },
  },
  {
    files: ["src/docs/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];
