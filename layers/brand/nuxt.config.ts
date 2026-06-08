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

  // Shared favicon / theme — applies to all sites that extend this layer.
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [{ name: 'theme-color', content: '#0b1220' }],
    },
  },
})
