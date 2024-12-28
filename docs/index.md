---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: miksinote
titleTemplate: Miksin's note site
hero:
  text: "Miksin's note site"
  tagline: 程式・開發學習筆記
---

<RecentNotes />

<script setup lang="ts">
import RecentNotes from './.vitepress/components/RecentNotes.vue'
</script>
