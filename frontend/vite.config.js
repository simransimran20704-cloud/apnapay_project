import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/auth': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
      },
      '/customer': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
      },
      '/transaction': {
        target: 'http://127.0.0.1:8083',
        changeOrigin: true,
      },
    },
  },
})
