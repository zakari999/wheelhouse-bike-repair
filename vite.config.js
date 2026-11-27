import { defineConfig } from 'vite';

export default defineConfig({
  base: '/wheelhouse-bike-repair/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
