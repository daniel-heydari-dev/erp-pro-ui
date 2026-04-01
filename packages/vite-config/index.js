import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

function getUiPackageChunkName(id) {
  if (
    id.includes("/packages/ui/src/foundations/") ||
    id.includes("/packages/ui/src/contexts/") ||
    id.includes("/packages/ui/src/utils/") ||
    id.endsWith("/packages/ui/src/index.ts")
  ) {
    return "ui-core";
  }

  if (id.includes("/packages/ui/src/components/data-display/")) {
    return "ui-data-display";
  }

  if (id.includes("/packages/ui/src/components/forms/")) {
    return "ui-forms";
  }

  if (id.includes("/packages/ui/src/components/icons/")) {
    return "ui-icons";
  }

  if (
    id.includes("/packages/ui/src/components/navigation/") ||
    id.includes("/packages/ui/src/components/overlays/")
  ) {
    return "ui-navigation";
  }

  if (
    id.includes("/packages/ui/src/components/backgrounds/") ||
    id.includes("/packages/ui/src/components/effects/") ||
    id.includes("/packages/ui/src/components/spinners/") ||
    id.includes("/packages/ui/src/components/text-animations/")
  ) {
    return "ui-visuals";
  }

  if (
    id.includes("/packages/ui/src/components/basics/") ||
    id.includes("/packages/ui/src/components/feedback/") ||
    id.includes("/packages/ui/src/components/shared/") ||
    id.includes("/packages/ui/src/components/typography/")
  ) {
    return "ui-elements";
  }

  return "ui-kit";
}

function getStorybookChunkName(id) {
  if (id.includes("/axe-core/") || id.includes("/@storybook/addon-a11y/")) {
    return "storybook-a11y";
  }

  if (
    id.includes("/@mdx-js/") ||
    id.includes("/markdown-it/") ||
    id.includes("/react-syntax-highlighter/")
  ) {
    return "storybook-docs";
  }

  if (id.includes("/@storybook/") || id.includes("/storybook/")) {
    return "storybook-core";
  }

  return undefined;
}

function createSharedManualChunks(id) {
  if (id.includes("/packages/ui/src/")) {
    return getUiPackageChunkName(id);
  }

  const storybookChunkName = getStorybookChunkName(id);
  if (storybookChunkName) {
    return storybookChunkName;
  }

  if (!id.includes("/node_modules/")) {
    return undefined;
  }

  if (
    id.includes("/react-router/") ||
    id.includes("/react-router-dom/") ||
    id.includes("/react-dom/") ||
    id.includes("/react/") ||
    id.includes("/scheduler/")
  ) {
    return "react-runtime";
  }

  if (id.includes("/framer-motion/")) {
    return "motion";
  }

  if (id.includes("/react-icons/")) {
    return "icons";
  }

  if (id.includes("/@tanstack/")) {
    return "tanstack";
  }

  if (
    id.includes("/recharts/") ||
    id.includes("/victory-vendor/") ||
    id.includes("/d3-") ||
    id.includes("/internmap/")
  ) {
    return "charts";
  }

  if (id.includes("/three/") || id.includes("/@react-three/")) {
    return "three";
  }

  return undefined;
}

function createSharedBuildConfig() {
  return {
    rolldownOptions: {
      output: {
        manualChunks: createSharedManualChunks,
      },
    },
  };
}

export function createUiConsumerAliases({
  appSrcPath,
  uiPackageRoot,
  includeThemeAlias = false,
}) {
  const aliases = [
    {
      find: "@",
      replacement: appSrcPath,
    },
    {
      find: /^erp-pro-ui$/,
      replacement: path.resolve(uiPackageRoot, "src/index.ts"),
    },
    {
      find: /^erp-pro-ui\/catalog$/,
      replacement: path.resolve(uiPackageRoot, "src/catalog.ts"),
    },
    {
      find: /^erp-pro-ui\/docs$/,
      replacement: path.resolve(uiPackageRoot, "src/docs.ts"),
    },
    {
      find: /^erp-pro-ui\/styles\.css$/,
      replacement: path.resolve(uiPackageRoot, "src/styles.css"),
    },
  ];

  if (includeThemeAlias) {
    aliases.push({
      find: /^erp-pro-ui\/theme$/,
      replacement: path.resolve(
        uiPackageRoot,
        "src/foundations/theme/index.ts",
      ),
    });
  }

  return aliases;
}

export function createReactAppViteConfig({
  appDir,
  uiPackageRoot,
  base,
  appSrcPath = path.resolve(appDir, "src"),
  portEnvVar = "VITE_PORT",
}) {
  return defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const configuredPort = Number(env[portEnvVar]);

    return {
      base,
      build: createSharedBuildConfig(),
      plugins: [react(), tailwindcss()],
      resolve: {
        alias: createUiConsumerAliases({
          appSrcPath,
          uiPackageRoot,
        }),
      },
      server:
        Number.isFinite(configuredPort) && configuredPort > 0
          ? { port: configuredPort }
          : undefined,
    };
  });
}

export function createStorybookViteConfig({
  appSrcPath,
  uiPackageRoot,
  includeThemeAlias = true,
}) {
  return {
    build: createSharedBuildConfig(),
    plugins: [tailwindcss()],
    resolve: {
      alias: createUiConsumerAliases({
        appSrcPath,
        uiPackageRoot,
        includeThemeAlias,
      }),
    },
  };
}
