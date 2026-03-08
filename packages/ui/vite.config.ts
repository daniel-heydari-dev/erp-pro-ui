import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ErpProUi',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'framer-motion',
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        '@tanstack/react-table',
        'recharts',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
          three: 'THREE',
          recharts: 'Recharts',
        },
      },
    },
    minify: false,
    sourcemap: true,
  },
});
