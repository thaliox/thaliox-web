<script setup lang="ts">
const primitives = [
  {
    title: 'Vector Message',
    description: 'The unit agents exchange is meaning, not byte streams. LLM token output maps directly to system semantics — zero parsing.',
    icon: 'i-lucide-waypoints',
  },
  {
    title: 'Attention Budget',
    description: 'The unit of scheduling and accounting is the token, replacing the CPU time slice. Every thought and action is metered and reconciled.',
    icon: 'i-lucide-gauge',
  },
  {
    title: 'Capability Token',
    description: 'The unit of permission and trust, replacing uid/gid. Signature + expiry + scope, verified before any side effect.',
    icon: 'i-lucide-key-round',
  },
]

const contrasts = [
  { from: 'files', to: 'Vectors', icon: 'i-lucide-file-stack' },
  { from: 'byte pipes', to: 'Token streams', icon: 'i-lucide-cable' },
  { from: 'CPU time slices', to: 'Attention budgets', icon: 'i-lucide-cpu' },
  { from: 'uid / gid', to: 'Capability tokens', icon: 'i-lucide-shield-check' },
]
</script>

<template>
  <UPageHero
    title="Redefining Everything Through AI"
    description="THALIOX is an operating system for AI, by AI — not Linux with agents bolted on, but a system redesigned from first principles around how AI actually works."
    :ui="{ title: 'text-balance', description: 'text-balance' }"
  >
    <template #links>
      <UButton size="xl" to="https://thaliox.io" trailing-icon="i-lucide-arrow-right">
        Read the docs
      </UButton>
      <UButton size="xl" color="neutral" variant="subtle" to="https://thaliox.dev">
        See development
      </UButton>
    </template>
  </UPageHero>

  <UPageSection
    title="Not Linux with agents bolted on"
    description="Every layer of a traditional OS assumes a human at the terminal. THALIOX assumes an intelligence at the core."
  >
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UPageCard
        v-for="c in contrasts"
        :key="c.to"
        :icon="c.icon"
        :title="c.to"
        :description="`replaces ${c.from}`"
        variant="subtle"
      />
    </div>
  </UPageSection>

  <UPageSection
    title="TAM: three first-principles primitives"
    description="The THALIOX Abstract Machine (TAM) defines the whole system with three primitives — one shared semantics from the software implementation to future custom silicon."
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
      title="Humans are the floor"
      description="Auditable, one-key takeover, reversible — never bypassable. AI runs autonomously; sovereignty always stays with people."
      variant="naked"
    >
      <template #links>
        <UButton size="xl" to="https://github.com/thaliox/thaliox-os" target="_blank" icon="i-simple-icons-github">
          Follow on GitHub
        </UButton>
      </template>
    </UPageCTA>
  </UPageSection>
</template>
