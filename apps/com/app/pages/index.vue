<script setup lang="ts">
const primitives = [
  {
    title: '向量消息',
    description: 'agent 间交换"意义"的单位,而非字节流。LLM 的 token 输出直接映射为系统语义,零解析。',
    icon: 'i-lucide-waypoints',
  },
  {
    title: '注意力预算',
    description: '调度与资源核算的单位(token),取代 CPU 时间片。每一次思考与行动都按预算计量、对账。',
    icon: 'i-lucide-gauge',
  },
  {
    title: '能力令牌',
    description: '权限与信任的单位,取代 uid/gid。签名 + 过期 + scope,任何副作用前先校验。',
    icon: 'i-lucide-key-round',
  },
]

const contrasts = [
  { from: '文件', to: '向量', icon: 'i-lucide-file-stack' },
  { from: '字节管道', to: 'Token 流', icon: 'i-lucide-cable' },
  { from: 'CPU 时间片', to: '注意力预算', icon: 'i-lucide-cpu' },
  { from: 'uid / gid', to: '能力令牌', icon: 'i-lucide-shield-check' },
]
</script>

<template>
  <UPageHero
    title="Redefining Everything Through AI"
    description="THALIOX 是为 AI、由 AI 打造的操作系统 —— 不是给 Linux 加装 agent,而是从第一性原理为 AI 的工作方式重新设计。"
    :ui="{ title: 'text-balance', description: 'text-balance' }"
  >
    <template #links>
      <UButton size="xl" to="https://thaliox.io" trailing-icon="i-lucide-arrow-right">
        阅读文档
      </UButton>
      <UButton size="xl" color="neutral" variant="subtle" to="https://thaliox.dev">
        看开发进展
      </UButton>
    </template>
  </UPageHero>

  <UPageSection
    title="不是给 Linux 加装 agent"
    description="传统 OS 的每一层都假设终端前坐着一个人。THALIOX 假设核心处是一个智能体。"
  >
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UPageCard
        v-for="c in contrasts"
        :key="c.to"
        :icon="c.icon"
        :title="c.to"
        :description="`取代 ${c.from}`"
        variant="subtle"
      />
    </div>
  </UPageSection>

  <UPageSection
    title="TAM:三个第一性原语"
    description="THALIOX 抽象机(TAM)用三个原语定义整个系统,从软件实现到未来自研硅都遵守同一份语义。"
  >
    <div class="grid gap-6 md:grid-cols-3">
      <UPageCard
        v-for="p in primitives"
        :key="p.title"
        :icon="p.icon"
        :title="p.title"
        :description="p.description"
        spotlight
      />
    </div>
  </UPageSection>

  <UPageSection>
    <UPageCTA
      title="人类是底线"
      description="可审计、可一键接管、可回滚,不可绕过。AI 自主运行,主权始终在人。"
      variant="naked"
    >
      <template #links>
        <UButton size="xl" to="https://github.com/thaliox/thaliox-os" target="_blank" icon="i-simple-icons-github">
          在 GitHub 上关注
        </UButton>
      </template>
    </UPageCTA>
  </UPageSection>
</template>
