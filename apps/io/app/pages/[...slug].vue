<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(`docs-${route.path}`, () =>
  queryCollection('docs').path(route.path).first(),
)

const { data: navigation } = await useAsyncData('docs-nav', () =>
  queryCollectionNavigation('docs'),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside>
        <UContentNavigation :navigation="navigation" highlight />
      </UPageAside>
    </template>

    <UPageHeader :title="page?.title" :description="page?.description" />

    <UPageBody>
      <ContentRenderer v-if="page" :value="page" />
    </UPageBody>
  </UPage>
</template>
