export default defineNuxtConfig({
  extends: ['../../layers/brand'],

  app: {
    head: {
      title: 'THALIOX 开发 — 进展 · 里程碑 · RFC',
      meta: [
        {
          name: 'description',
          content: 'THALIOX 开发进展:里程碑时间线、抽象机 RFC、Release、参与方式。',
        },
      ],
    },
  },
})
