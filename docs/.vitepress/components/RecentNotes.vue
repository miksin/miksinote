<script setup lang="ts">
import { computed } from "vue"
import { data as enNotes } from "../theme/notes-en.data.mjs"
import { data as jpNotes } from "../theme/notes-jp.data.mjs"
import { data as rootNotes } from "../theme/notes.data.mjs"

const { locale } = defineProps({
  locale: String,
})

const notes = computed(() => {
  if (locale === "en") {
    return enNotes
  }
  if (locale === "jp") {
    return jpNotes
  }
  return rootNotes
})
</script>

<template>
  <h3>Recents</h3>
  <div :class="$style.container">
    <div v-for="note in notes" :key="note.url" :class="$style.block">
      <a :href="note.url">
        {{ note.title }}
      </a>
      <div v-html="note.excerpt" />
      <div :class="$style.timestamp">
        {{ note.date.string }}
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
