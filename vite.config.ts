import { sentryVitePlugin } from '@sentry/vite-plugin'
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    sentryVitePlugin({
      org: 'vincent-core',
      project: 'rme-harapan',
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
