---
title: Profile
layout: page
---

<div :class="$style.page">
  <Profile />
</div>

<script setup lang="ts">
import Profile from '../.vitepress/components/Profile.vue'
</script>

<style lang="css" module>
.page {
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
