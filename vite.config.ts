import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',         
      injectRegister: null,               

      
      includeAssets: [
        'favicon.ico', 
        'logo192.png', 
        'logo512.png', 
        'assets/*.png', 
        'assets/*.jpg', 
        'assets/*.webp', 
        'assets/*.ttf'
      ],
      
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,png,jpg,jpeg,webp,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'CacheFirst' as const,
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,  
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: false, 
      },
    }),
  ],

  server: {
    host: "127.0.0.1",
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
  },

  
});