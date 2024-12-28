<script setup lang="ts">
import { data as posts } from '../theme/posts.data.mjs'
</script>

<template>
  <h3>Recents</h3>
  <div :class="$style.container">
    <div v-for="post in posts" :key="post.url" :class="$style.block">
      <article :class="$style.article">
        <a :href="post.url">
          {{ post.title }}
        </a>
        <div v-html="post.excerpt" />
      </article>
    </div>
  </div>
</template>

<style lang="css" module>
.container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem 0.75rem;
}

.block {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-bg-soft);
  background-color: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
}

.article {
  display: flex;
  flex-direction: column;
}
</style>
