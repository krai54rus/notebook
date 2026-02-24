import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/_variables.scss" as *;
          @use "@/assets/scss/variables/colorsVars.scss" as *;
          @use "@/assets/scss/variables/colorsMain.scss" as *;
          @use "@/assets/scss/variables/common.scss" as *;
        `,
      },
    },
  },
})
