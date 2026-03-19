// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Target older browsers to prevent esbuild converting max-width media queries
    // to range syntax (width<=767px), which breaks on iOS Safari < 16.4
    cssTarget: ['chrome88', 'safari14', 'firefox85', 'edge88'],
  },
})
