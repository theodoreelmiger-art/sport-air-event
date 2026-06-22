import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Vercel (custom domain) serves from the ROOT; GitHub Pages serves from the
  // /sport-air-event/ subpath. Vercel sets VERCEL=1 at build time, so the base
  // adapts automatically and the SAME code deploys correctly to both.
  base: process.env.VERCEL ? '/' : '/sport-air-event/',
  plugins: [react()],
  server: { port: 5173, host: true },
});
