import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: '.',
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      '/api': {
        target:
          'http://ec2-54-116-242-126.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
