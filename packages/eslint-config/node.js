import { baseConfig } from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export const nodeConfig = [
  ...baseConfig,
  {
    rules: {
      // Add node-specific rules here if needed
    },
  },
];
