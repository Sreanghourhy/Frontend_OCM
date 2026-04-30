import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'vuex', 'pinia'],
          ui: ['naive-ui'],
          charts: ['d3', 'd3-org-chart'],
          qr: ['qrcode.vue', 'qrcode-generator', 'qrcode-reader-vue3', 'vue-qrcode-reader', 'vue3-qrcode-reader', 'vue3-barcode'],
          media: ['html2canvas', 'vue-pdf-embed', 'vue-advanced-cropper'],
          maps: ['vue3-google-map'],
          utils: ['axios', 'moment', 'dateformat']
        }
      }
    }
  },
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@classes': path.resolve(__dirname, './src/classes'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@plugins': path.resolve(__dirname, './src/plugins')
    }
  },
  server: {
      host: '127.0.0.1',
      // host: '192.168.0.105',
      port: 3009
  }
})