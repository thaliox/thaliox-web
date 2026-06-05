export default defineNuxtConfig({
  extends: ['../../layers/brand'],

  app: {
    head: {
      title: 'THALIOX — AI-Native Operating System',
      meta: [
        {
          name: 'description',
          content:
            'THALIOX 是为 AI、由 AI 打造的操作系统。向量取代文件,Token 流取代字节管道,注意力预算取代 CPU 时间片。',
        },
      ],
    },
  },
})
