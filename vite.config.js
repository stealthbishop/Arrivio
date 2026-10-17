import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Serve from root when embedded in Spring Boot
  base: '/',
  build: {
    // Output directly into Spring Boot's static resources folder
    outDir: 'backend/src/main/resources/static',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    // Proxy API calls to Spring Boot during dev
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
    