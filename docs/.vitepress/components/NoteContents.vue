<script setup lang="ts">
import { useRouter } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const router = useRouter()
const { sidebar } = useSidebar()

const firstLink = sidebar.value[0].items?.[0].link

if (firstLink) {
  router.go(firstLink)
}
</script>

<template>
  {{ sidebar }}
</template>
