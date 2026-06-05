export default defineNuxtConfig({
  extends: ['../../layers/brand'],

  app: {
    head: {
      title: 'THALIOX Development — Progress · Milestones · RFCs',
      meta: [
        {
          name: 'description',
          content: 'THALIOX development: milestone timeline, abstract-machine RFC, releases, and how to contribute.',
        },
      ],
    },
  },
})
