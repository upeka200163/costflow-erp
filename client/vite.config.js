import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom plugin to enforce strict JavaScript MIME types on Windows
const mimeTypePlugin = () => ({
  name: 'force-javascript-mime-type',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url ? req.url.split('?')[0] : '';
      if (url.endsWith('.jsx') || url.endsWith('.js') || url.endsWith('.mjs') || url.endsWith('.ts') || url.endsWith('.tsx')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      }
      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url ? req.url.split('?')[0] : '';
      if (url.endsWith('.jsx') || url.endsWith('.js') || url.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), mimeTypePlugin()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
