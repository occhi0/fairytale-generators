import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Imposta il percorso corretto per GitHub Pages
  base: '/fairytale-generators/', 
  plugins: [react()],
})
