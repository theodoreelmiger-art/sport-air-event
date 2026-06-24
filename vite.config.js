import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Servi à la RACINE du domaine (Infomaniak / hébergement Apache).
  base: '/',
  plugins: [react()],
  server: { port: 5173, host: true },
});
