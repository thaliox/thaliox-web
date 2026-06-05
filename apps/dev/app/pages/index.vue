<script setup lang="ts">
type Status = 'done' | 'active' | 'planned'

const milestones: { id: string; title: string; detail: string; status: Status }[] = [
  { id: 'M1', title: 'Single-node MVP', detail: 'Rust daemon + LLM + vector memory + autonomous tool-calling + capability gating + gateway. Shipped as v0.1.0.', status: 'done' },
  { id: 'M2', title: 'microVM packaging', detail: 'One-command deploy + snapshot/restore + self-update rollback.', status: 'active' },
  { id: 'M3', title: 'Multi-instance HA', detail: 'Live migration + CRDT merge + self-healing takeover.', status: 'planned' },
  { id: 'M4', title: 'Cluster + multi-client', detail: 'agent↔agent + team orchestration + multi-client.', status: 'planned' },
  { id: 'M5', title: 'Learning control plane', detail: 'RL scheduling + supervisor agents + self-optimization.', status: 'planned' },
  { id: 'M6', title: 'Pushing down the stack', detail: 'eBPF → unikernel / abstract-machine contract → kernel-bypass vector transport → FPGA primitives.', status: 'planned' },
  { id: 'M7', title: 'First primitive in silicon', detail: 'Tape out a single primitive that is uniquely THALIOX.', status: 'planned' },
  { id: 'M8', title: 'Vertically integrated node', detail: 'A complete THALIOX machine.', status: 'planned' },
]

const badge: Record<Status, { label: string; color: 'success' | 'primary' | 'neutral' }> = {
  done: { label: 'Shipped', color: 'success' },
  active: { label: 'In progress', color: 'primary' },
  planned: { label: 'Planned', color: 'neutral' },
}

const links = [
  { title: 'Main repo — thaliox-os', description: 'The THALIOX core, rebuilt from scratch in Rust.', icon: 'i-simple-icons-github', to: 'https://github.com/thaliox/thaliox-os' },
  { title: 'TAM Abstract Machine — RFC-0001', description: 'Three primitives + five invariants: the shared contract from software to silicon.', icon: 'i-lucide-scroll-text', to: 'https://github.com/thaliox/thaliox-os/blob/main/docs/rfcs/0001-abstract-machine.md' },
  { title: 'Master Plan', description: 'The full top-down, staged-moonshot roadmap.', icon: 'i-lucide-map', to: 'https://github.com/thaliox/thaliox-os/blob/main/docs/MASTER_PLAN.md' },
  { title: 'Become a contributor', description: 'How to contribute and apply for developer access.', icon: 'i-lucide-user-plus', to: 'https://github.com/thaliox/thaliox-os/blob/main/CONTRIBUTING.md' },
]
</script>

<template>
  <UPageHero
    title="THALIOX Development"
    description="Top-down and staged. Every milestone is independently usable, demonstrable, and falsifies the next stage."
    :ui="{ title: 'text-balance' }"
  >
    <template #links>
      <UButton size="xl" to="https://github.com/thaliox/thaliox-os" target="_blank" icon="i-simple-icons-github">
        thaliox-os
      </UButton>
      <UButton size="xl" color="neutral" variant="subtle" to="https://thaliox.io">
        Docs
      </UButton>
    </template>
  </UPageHero>

  <UPageSection title="Milestones" description="H1 software → H2 specialization → H3 co-designed silicon.">
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

  <UPageSection title="Entry points">
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
