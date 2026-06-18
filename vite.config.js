import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Served from a GitHub Pages project subpath. Clean URLs are handled by the
  // spa-github-pages 404.html redirect + the restore script in index.html,
  // with BrowserRouter basename matching this base.
  base: '/sport-air-event/',
  plugins: [react()],
  server: { port: 5173, host: true },
});
