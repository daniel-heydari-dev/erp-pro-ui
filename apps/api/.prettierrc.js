import prettierConfig from '@repo/prettier-config';

/** @type {import("prettier").Config} */
export default {
  ...prettierConfig,
  semi: false, // Example override: no semicolons in API
};
