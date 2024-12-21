<script setup lang="ts">
import { data as posts } from '../theme/posts.data.mjs'
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.url">
      <a :href="post.url">{{ post.title }}</a>
    </li>
  </ul>
</template>
