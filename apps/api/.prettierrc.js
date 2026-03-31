import prettierConfig from "../../packages/prettier-config/index.js"

/** @type {import("prettier").Config} */
export default {
  ...prettierConfig,
  semi: false, // Example override: no semicolons in API
  singleQuote: false, // Example override: use single quotes in API
}
