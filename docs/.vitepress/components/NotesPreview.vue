<script setup lang="ts">
import { data as posts } from '../theme/posts.data.mjs'
</script>

<template>
  <h3>Recents</h3>
  <div :class="$style.container">
    <div v-for="post in posts" :key="post.url" :class="$style.block">
      <a :href="post.url">
        {{ post.title }}
      </a>
      <div v-html="post.excerpt" />
      <div :class="$style.timestamp">
        {{ post.date.string }}
      </div>
    </div>
  </div>
</template>

<style lang="css" module>
.container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  gap: 1rem 0.75rem;
}

.block {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  row-gap: 0;

  padding: 1.5rem;
  border: 1px solid var(--vp-c-bg-soft);
  background-color: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
}

.timestamp {
  margin-left: auto;
  font-size: var(--vp-font-size-small);
  color: var(--vp-c-text-soft);
}
</style>
