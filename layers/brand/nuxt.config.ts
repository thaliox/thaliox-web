import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 让 css 路径在被 apps extends 时仍解析到本 layer 自身。
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/image'],

  css: [join(currentDir, './app/assets/css/main.css')],

  // 三站统一:静态站点,深色友好。
  ssr: true,
  devtools: { enabled: true },
})
