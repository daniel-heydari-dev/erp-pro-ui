// This file has been automatically migrated to valid ESM format by Storybook.
import { dirname, join, resolve } from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import type { StorybookConfig } from "@storybook/react-vite";
import { createStorybookViteConfig } from "@erp-pro/vite-config";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const uiPackageRoot = resolve(__dirname, "../../../packages/ui");
const isStaticBuild = process.env.STORYBOOK_STATIC_BUILD === "true";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use pnpm or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs"),
    ...(!isStaticBuild ? [getAbsolutePath("@storybook/addon-a11y")] : []),
    getAbsolutePath("@storybook/addon-mcp"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(
      config,
      createStorybookViteConfig({
        appSrcPath: resolve(__dirname, "../src"),
        uiPackageRoot,
      }),
    );
  },
};
export default config;
