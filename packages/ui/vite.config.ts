import { cp, rm } from "node:fs/promises";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

const rootDir = __dirname;

function resolveFromRoot(...segments: string[]) {
  return path.resolve(rootDir, ...segments);
}

function copyStylesheetAsset(): Plugin {
  return {
    name: "copy-stylesheet-asset",
    async closeBundle() {
      await rm(resolveFromRoot("dist/fonts"), {
        force: true,
        recursive: true,
      });

      await Promise.all([
        cp(
          resolveFromRoot("src/styles.css"),
          resolveFromRoot("dist/styles.css"),
        ),
        cp(
          resolveFromRoot("src/foundation.css"),
          resolveFromRoot("dist/foundation.css"),
        ),
        cp(
          resolveFromRoot("src/animations.css"),
          resolveFromRoot("dist/animations.css"),
        ),
        cp(
          resolveFromRoot("src/colors.css"),
          resolveFromRoot("dist/colors.css"),
        ),
        cp(
          resolveFromRoot("src/tokens.css"),
          resolveFromRoot("dist/tokens.css"),
        ),
        cp(resolveFromRoot("src/fonts.css"), resolveFromRoot("dist/fonts.css")),
      ]);

      await cp(resolveFromRoot("src/fonts"), resolveFromRoot("dist/fonts"), {
        recursive: true,
      });
    },
  };
}

const libraryEntries = {
  catalog: resolveFromRoot("src/catalog.ts"),
  docs: resolveFromRoot("src/docs.ts"),
  index: resolveFromRoot("src/index.ts"),
  theme: resolveFromRoot("src/foundations/theme/index.ts"),
  accordion: resolveFromRoot("src/components/navigation/accordion/index.ts"),
  alert: resolveFromRoot("src/components/feedback/alert/index.ts"),
  "animated-content": resolveFromRoot(
    "src/components/effects/animated-content/index.ts",
  ),
  "background-gradient-animation": resolveFromRoot(
    "src/components/effects/background-gradient-animation/index.ts",
  ),
  button: resolveFromRoot("src/components/forms/button/index.ts"),
  "button-hover-border-gradient": resolveFromRoot(
    "src/components/effects/button-hover-border-gradient/index.ts",
  ),
  calendar: resolveFromRoot("src/components/forms/calendar/index.ts"),
  card: resolveFromRoot("src/components/data-display/card/index.ts"),
  carousel: resolveFromRoot("src/components/navigation/carousel/index.ts"),
  charts: resolveFromRoot("src/components/data-display/charts/index.ts"),
  checkbox: resolveFromRoot("src/components/forms/checkbox/index.ts"),
  chip: resolveFromRoot("src/components/data-display/chip/index.ts"),
  "progress-bar": resolveFromRoot(
    "src/components/data-display/progress-bar/index.ts",
  ),
  "chroma-grid": resolveFromRoot("src/components/effects/chroma-grid/index.ts"),
  "color-palette": resolveFromRoot(
    "src/components/data-display/color-palette/index.ts",
  ),
  combobox: resolveFromRoot("src/components/forms/combobox/index.ts"),
  "data-table": resolveFromRoot(
    "src/components/data-display/data-table/index.ts",
  ),
  "date-picker": resolveFromRoot("src/components/forms/date-picker/index.ts"),
  dialog: resolveFromRoot("src/components/overlays/dialog/index.ts"),
  drawer: resolveFromRoot("src/components/overlays/drawer/index.ts"),
  form: resolveFromRoot("src/components/forms/form/index.ts"),
  "gradual-blur": resolveFromRoot(
    "src/components/effects/gradual-blur/index.ts",
  ),
  "hover-border-gradient": resolveFromRoot(
    "src/components/effects/hover-border-gradient/index.ts",
  ),
  "hover-card": resolveFromRoot("src/components/overlays/hover-card/index.ts"),
  input: resolveFromRoot("src/components/forms/input/index.ts"),
  label: resolveFromRoot("src/components/forms/label/index.ts"),
  loading: resolveFromRoot("src/components/data-display/loading/index.ts"),
  "multi-select-combobox": resolveFromRoot(
    "src/components/forms/multi-select-combobox/index.ts",
  ),
  "otp-input": resolveFromRoot("src/components/forms/otp-input/index.ts"),
  "password-strength-meter": resolveFromRoot(
    "src/components/forms/password-strength-meter/index.ts",
  ),
  radio: resolveFromRoot("src/components/forms/radio/index.ts"),
  select: resolveFromRoot("src/components/forms/select/index.ts"),
  skeleton: resolveFromRoot("src/components/data-display/skeleton/index.ts"),
  "splash-cursor": resolveFromRoot(
    "src/components/effects/splash-cursor/index.ts",
  ),
  "spotlight-card": resolveFromRoot(
    "src/components/effects/spotlight-card/index.ts",
  ),
  stepper: resolveFromRoot("src/components/navigation/stepper/index.ts"),
  "sun-to-moon-button": resolveFromRoot(
    "src/components/effects/sun-to-moon-button/index.ts",
  ),
  switch: resolveFromRoot("src/components/forms/switch/index.ts"),
  textarea: resolveFromRoot("src/components/forms/textarea/index.ts"),
  toast: resolveFromRoot("src/components/overlays/toast/index.ts"),
  tooltip: resolveFromRoot("src/components/overlays/tooltip/index.ts"),
  typography: resolveFromRoot("src/components/typography/index.ts"),
  "truncated-text": resolveFromRoot(
    "src/components/typography/truncated-text/index.ts",
  ),
  "ascii-text": resolveFromRoot("src/components/effects/ascii-text/index.ts"),
  icons: resolveFromRoot("src/components/icons/index.ts"),
  spinners: resolveFromRoot("src/components/spinners/index.ts"),
  utils: resolveFromRoot("src/utils/index.ts"),
};

const outputGlobals = {
  react: "React",
  "react-dom": "ReactDOM",
  "framer-motion": "FramerMotion",
  three: "THREE",
  recharts: "Recharts",
};

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
      exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
    }),
    copyStylesheetAsset(),
  ],
  build: {
    lib: {
      entry: libraryEntries,
      name: "ErpProUi",
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "mjs" : "cjs"}`,
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "framer-motion",
        "three",
        "@react-three/fiber",
        "@react-three/drei",
        "@tanstack/react-table",
        "recharts",
      ],
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          chunkFileNames: "chunks/[name]-[hash].mjs",
          globals: outputGlobals,
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          chunkFileNames: "chunks/[name]-[hash].cjs",
          exports: "named",
          globals: outputGlobals,
        },
      ],
    },
    minify: false,
    sourcemap: true,
  },
});
