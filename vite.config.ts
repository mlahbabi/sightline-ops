import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Base = nom du repo GitHub : l'app est servie sous https://mlahbabi.github.io/pmd-ops/
const BASE = '/sightline-ops/'

export default defineConfig({
  base: BASE,
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['sightline.png', 'favicon.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Sightline Ops — Marrakech & Agafay',
        short_name: 'Sightline Ops',
        description: 'Outil terrain MRCO — Partners’ Meeting Marrakech, 07 → 13 septembre 2026',
        lang: 'fr',
        theme_color: '#111114',
        background_color: '#050608',
        display: 'standalone',
        orientation: 'portrait',
        start_url: BASE,
        scope: BASE,
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2,json}'],
        navigateFallback: BASE + 'index.html',
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
