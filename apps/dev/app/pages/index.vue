<script setup lang="ts">
type Status = 'done' | 'active' | 'planned'

const milestones: { id: string; title: string; detail: string; status: Status }[] = [
  { id: 'M1', title: '单机 MVP', detail: 'Rust daemon + LLM + 向量记忆 + 自主 tool-calling + 能力门控 + 网关。v0.1.0 已交付。', status: 'done' },
  { id: 'M2', title: 'microVM 化', detail: '一键部署 + 快照/恢复 + 自更新回滚。', status: 'active' },
  { id: 'M3', title: '多实例 HA', detail: '热迁移 + CRDT 合并 + 自愈接管。', status: 'planned' },
  { id: 'M4', title: '集群 + 多端', detail: 'agent↔agent + 团队编排 + 多端客户端。', status: 'planned' },
  { id: 'M5', title: '学习型控制平面', detail: 'RL 调度 + 监督 agent + 自优化。', status: 'planned' },
  { id: 'M6', title: '向下压栈', detail: 'eBPF → unikernel/抽象机契约 → kernel-bypass 向量传输 → FPGA 原语。', status: 'planned' },
  { id: 'M7', title: '单原语流片', detail: '只流片一个独属于 THALIOX 的硅原语。', status: 'planned' },
  { id: 'M8', title: '垂直整合节点', detail: '完整 THALIOX 机器。', status: 'planned' },
]

const badge: Record<Status, { label: string; color: 'success' | 'primary' | 'neutral' }> = {
  done: { label: '已交付', color: 'success' },
  active: { label: '进行中', color: 'primary' },
  planned: { label: '规划中', color: 'neutral' },
}

const links = [
  { title: '主仓库 thaliox-os', description: '从 0 重构的 THALIOX 本体(Rust)。', icon: 'i-simple-icons-github', to: 'https://github.com/thaliox/thaliox-os' },
  { title: 'TAM 抽象机 RFC-0001', description: '三原语 + 五不变量,软件到硅的共同契约。', icon: 'i-lucide-scroll-text', to: 'https://github.com/thaliox/thaliox-os/blob/main/docs/rfcs/0001-abstract-machine.md' },
  { title: 'MASTER_PLAN', description: '自上而下 · 分步登月的完整路线。', icon: 'i-lucide-map', to: 'https://github.com/thaliox/thaliox-os/blob/main/docs/MASTER_PLAN.md' },
  { title: 'Releases', description: '版本与变更日志。', icon: 'i-lucide-tag', to: 'https://github.com/thaliox/thaliox-os/releases' },
]
</script>

<template>
  <UPageHero
    title="THALIOX 开发进展"
    description="自上而下、分步登月。每个里程碑都独立可用、可演示、可证伪下一阶段。"
    :ui="{ title: 'text-balance' }"
  >
    <template #links>
      <UButton size="xl" to="https://github.com/thaliox/thaliox-os" target="_blank" icon="i-simple-icons-github">
        thaliox-os
      </UButton>
      <UButton size="xl" color="neutral" variant="subtle" to="https://thaliox.io">
        文档
      </UButton>
    </template>
  </UPageHero>

  <UPageSection title="里程碑" description="H1 软件 → H2 专门化 → H3 协同设计的硅。">
    <div class="flex flex-col gap-3">
      <UCard v-for="m in milestones" :key="m.id" variant="subtle">
        <div class="flex items-start gap-4">
          <span class="text-primary font-mono text-lg font-bold w-10 shrink-0">{{ m.id }}</span>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold">{{ m.title }}</h3>
              <UBadge :color="badge[m.status].color" variant="subtle" size="sm">
                {{ badge[m.status].label }}
              </UBadge>
            </div>
            <p class="text-sm text-muted mt-1">{{ m.detail }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </UPageSection>

  <UPageSection title="入口">
    <div class="grid gap-4 sm:grid-cols-2">
      <UPageCard
        v-for="l in links"
        :key="l.title"
        :icon="l.icon"
        :title="l.title"
        :description="l.description"
        :to="l.to"
        target="_blank"
        variant="subtle"
      />
    </div>
  </UPageSection>
</template>
