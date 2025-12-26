import { nodeConfig } from '@repo/eslint-config/node.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nodeConfig,
  {
    rules: {
      'no-console': 'off', // Example override: allow console in API
    },
  },
];
