import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Tantler-Enhancer/', // Your GitHub repository name
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
