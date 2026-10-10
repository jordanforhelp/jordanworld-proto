import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/stake/',   // critical — all assets load from jordanworld.co/stake/
})
