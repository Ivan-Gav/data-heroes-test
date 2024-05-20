import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/data-heroes-test/',
  resolve: {
    alias: {
      src: '/src'
    }
  }
})
