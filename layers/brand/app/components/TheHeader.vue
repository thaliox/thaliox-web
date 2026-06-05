<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Sites live on different domains — always link across with absolute URLs.
const sites: NavigationMenuItem[] = [
  { label: 'Overview', to: 'https://thaliox.com', icon: 'i-lucide-sparkles' },
  { label: 'Develop', to: 'https://thaliox.dev', icon: 'i-lucide-git-branch' },
  { label: 'Docs', to: 'https://thaliox.io', icon: 'i-lucide-book-open' },
]
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-bold tracking-tight">
        <span class="text-primary text-xl">▣</span>
        <span>THALIOX</span>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="sites" variant="link" />

    <template #right>
      <UColorModeButton />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/thaliox/thaliox-os"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UHeader>
</template>
