<script lang="ts" setup>
import Giscus from "@giscus/vue"
import { useData, useRoute } from "vitepress"
import { computed } from "vue"

const route = useRoute()
const { isDark, lang } = useData()
const displayLang = computed(() => {
  if (lang.value === "en-US")
    return "en"
  if (lang.value === "ja-JP")
    return "ja"
  return "zh-TW"
})
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
      :lang="displayLang"
      loading="lazy"
    />
  </div>
</template>

<style lang="css" module>
.giscus {
  margin-top: 2rem;
}
</style>
