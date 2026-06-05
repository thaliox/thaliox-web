<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// 三站在不同域名下,站间一律绝对 URL。
const sites: NavigationMenuItem[] = [
  { label: '品牌', to: 'https://thaliox.com', icon: 'i-lucide-sparkles' },
  { label: '开发', to: 'https://thaliox.dev', icon: 'i-lucide-git-branch' },
  { label: '文档', to: 'https://thaliox.io', icon: 'i-lucide-book-open' },
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
