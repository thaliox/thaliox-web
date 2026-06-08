<script setup lang="ts">
const year = 2026

const repo = 'https://github.com/thaliox/thaliox-os'

const columns = [
  {
    label: 'Get started',
    children: [
      { label: 'Documentation', to: 'https://thaliox.io' },
      { label: 'Getting started', to: 'https://thaliox.io/getting-started' },
      { label: 'Core concepts', to: 'https://thaliox.io/concepts' },
      { label: 'Abstract Machine — RFC-0001', to: `${repo}/blob/main/docs/rfcs/0001-abstract-machine.md`, target: '_blank' },
    ],
  },
  {
    label: 'Explore',
    children: [
      { label: 'Master Plan', to: `${repo}/blob/main/docs/MASTER_PLAN.md`, target: '_blank' },
      { label: 'RFCs', to: `${repo}/tree/main/docs/rfcs`, target: '_blank' },
      { label: 'Model architecture — RFC-0003', to: `${repo}/blob/main/docs/rfcs/0003-meld-cognitive-substrate.md`, target: '_blank' },
      { label: 'Releases', to: `${repo}/releases`, target: '_blank' },
    ],
  },
  {
    label: 'Project',
    children: [
      { label: 'Overview', to: 'https://thaliox.com' },
      { label: 'Development', to: 'https://thaliox.dev' },
      { label: 'Docs', to: 'https://thaliox.io' },
      { label: 'Source', to: repo, target: '_blank' },
    ],
  },
  {
    label: 'Community',
    children: [
      { label: 'Contributing', to: `${repo}/blob/main/CONTRIBUTING.md`, target: '_blank' },
      { label: 'Discussions', to: `${repo}/discussions`, target: '_blank' },
      { label: 'Issues', to: `${repo}/issues`, target: '_blank' },
    ],
  },
]
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :columns="columns">
        <template #left>
          <div class="max-w-xs">
            <NuxtLink to="/" class="flex items-center gap-2 text-lg font-bold tracking-tight">
              <span class="text-primary text-xl">▣</span>
              <span>THALIOX</span>
            </NuxtLink>
            <p class="text-sm text-muted mt-3">
              An operating system for AI, by AI, ultimately for Humans.
            </p>
          </div>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        © {{ year }} THALIOX · Apache-2.0 OR MIT
      </p>
    </template>

    <template #right>
      <UColorModeButton />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        :to="repo"
        target="_blank"
        aria-label="THALIOX on GitHub"
      />
    </template>
  </UFooter>
</template>
