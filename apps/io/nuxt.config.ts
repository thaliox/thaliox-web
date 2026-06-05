export default defineNuxtConfig({
  extends: ['../../layers/brand'],

  modules: ['@nuxt/content'],

  app: {
    head: {
      title: 'THALIOX 文档',
      meta: [
        {
          name: 'description',
          content: 'THALIOX 文档:上手、核心概念、指南、参考。',
        },
      ],
    },
  },
})
