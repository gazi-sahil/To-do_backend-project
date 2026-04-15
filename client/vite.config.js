import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiHint = {
  name: 'api-backend-hint',
  configureServer(s) {
    s.httpServer?.once('listening', () => {
      console.log('\n[vite] /api proxy -> http://localhost:5000')
      console.log('[vite] agar register/login 500 de: pehle backend chalao (repo root: npm start, ya cd server && npm start)\n')
    })
  }
}

export default defineConfig({
  plugins: [react(), apiHint],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
