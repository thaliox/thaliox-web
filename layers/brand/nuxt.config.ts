import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Resolve the css path to this layer itself, even when extended by apps.
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/image'],

  css: [join(currentDir, './app/assets/css/main.css')],

  // Shared across all three sites: static, dark-mode friendly.
  ssr: true,
  devtools: { enabled: true },
})
