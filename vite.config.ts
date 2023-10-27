import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  /* Set the 'src' alias to '@' */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
