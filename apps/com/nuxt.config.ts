export default defineNuxtConfig({
  extends: ['../../layers/brand'],

  app: {
    head: {
      title: 'THALIOX — AI-Native Operating System',
      meta: [
        {
          name: 'description',
          content:
            'THALIOX is an operating system for AI, by AI. Vectors replace files, token streams replace byte pipes, attention budgets replace CPU time slices.',
        },
      ],
    },
  },
})
