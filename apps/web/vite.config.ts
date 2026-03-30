import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const uiPackageRoot = path.resolve(__dirname, '../../packages/ui');

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/erp-pro-ui/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, './src'),
        },
        {
          find: /^erp-pro-ui$/,
          replacement: path.resolve(uiPackageRoot, 'src/index.ts'),
        },
        {
          find: /^erp-pro-ui\/styles\.css$/,
          replacement: path.resolve(uiPackageRoot, 'src/styles.css'),
        },
      ],
    },
    server: {
      port: Number(env.VITE_PORT) || 3000,
    },
  };
});
