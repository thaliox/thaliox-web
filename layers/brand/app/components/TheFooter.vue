<script setup lang="ts">
const year = 2026
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ year }} THALIOX · An OS for AI, by AI, ultimately for Humans · Apache-2.0 / MIT
      </p>
    </template>

    <div class="flex items-center gap-1 text-sm">
      <UButton variant="link" color="neutral" to="https://thaliox.com">Overview</UButton>
      <UButton variant="link" color="neutral" to="https://thaliox.dev">Develop</UButton>
      <UButton variant="link" color="neutral" to="https://thaliox.io">Docs</UButton>
    </div>

    <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/thaliox/thaliox-os"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>
