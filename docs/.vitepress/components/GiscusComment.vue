<script lang="ts" setup>
import Giscus from '@giscus/vue'
import { useData, useRoute } from 'vitepress'

const route = useRoute()
const { isDark } = useData()
</script>

<template>
  <div :class="$style.giscus">
    <Giscus
      :key="route.path"
      repo="miksin/miksinote"
      repo-id="R_kgDONgPjug"
      category="General"
      category-id="DIC_kwDONgPjus4Clh1d"
      mapping="pathname"
      term="Welcome to giscus"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="isDark ? 'dark' : 'light'"
      lang="zh-TW"
      loading="lazy"
    />
  </div>
</template>

<style lang="css" module>
.giscus {
  margin-top: 2rem;
}
</style>
