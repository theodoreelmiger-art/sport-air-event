import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base so the build works under a GitHub Pages subpath
  // (e.g. https://user.github.io/sport-air-event/). Combined with HashRouter,
  // deep links and assets resolve correctly without server-side rewrites.
  base: './',
  plugins: [react()],
  server: { port: 5173, host: true },
});
