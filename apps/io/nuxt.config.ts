export default defineNuxtConfig({
  extends: ['../../layers/brand'],

  modules: ['@nuxt/content'],

  app: {
    head: {
      title: 'THALIOX Docs',
      meta: [
        {
          name: 'description',
          content: 'THALIOX documentation: getting started, core concepts, guides, and reference.',
        },
      ],
    },
  },
})
