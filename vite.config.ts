import path from 'path'
import { defineConfig } from 'vite'

import { sentryVitePlugin } from '@sentry/vite-plugin'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    sentryVitePlugin({
      org: 'vincent-core',
      project: 'rme-tiara',
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: true,
  },
})
