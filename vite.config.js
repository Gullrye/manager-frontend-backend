import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver()],
    }),
    Icons({
      // expiremental
      autoInstall: true,
      compiler: 'vue3'
    })
  ],
  server: {
    host: 'localhost',
    port: 9011,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  // 设置别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 路径别名
    },
  },
})
