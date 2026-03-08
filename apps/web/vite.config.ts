import { defineConfig,loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');

    return {
        base: '/erp-pro-ui/',
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'erp-pro-ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
            },
        },
        server: {
            port: Number(env.VITE_PORT) || 3000,
        },
    };
});