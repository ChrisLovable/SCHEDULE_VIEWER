import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use '/' for Vercel/Render deployment, '/SCHEDULE_VIEWER/' for GitHub Pages
  // Set VITE_BASE_PATH=/SCHEDULE_VIEWER/ in build command if using GitHub Pages
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    port: 3000,
    open: true
  }
})

