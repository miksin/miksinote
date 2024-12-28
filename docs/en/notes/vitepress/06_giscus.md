---
title: 'Giscus'
date: 2024-12-26
---

# Giscus

> AI-generated summary

<!-- excerpt -->

This article introduces how to enable and set up the Giscus comment system in VitePress. The steps include enabling the Discussion feature on GitHub, installing the giscus GitHub App, configuring settings on giscus.app, installing the Giscus Vue Component, configuring the GiscusComment.vue component, and adding it to the VitePress theme to achieve automatic interface language switching.

<!-- excerpt -->

[[toc]]

## Enable Giscus

### Enable Discussion Feature

First, enable the Discussion feature in GitHub settings

`(Repository Page) > Settings > General > Features > Discussions`

![github settings](https://i.imgur.com/v7sIMLn.png)

### Configure Giscus App

Install the [giscus GitHub App](https://github.com/apps/giscus) and authorize the repository for giscus

![giscus GitHub App](https://i.imgur.com/w0pAO3E.png)

Then go to [giscus.app](https://giscus.app/) for initial setup

Enter your repository name in the `repository:` section

You should see something like this that you can copy:

```html
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

You don't need to copy this now, you will only need the `repo-id` and `category-id` from it later.

## Integrate into VitePress

### Add Giscus Component

First, install the Giscus Vue Component

```bash
npm i -S @giscus/vue
```

Add `docs/.vitepress/components/GiscusComment.vue`

Fill in your repository name for `repo`, and the `repo-id` and `category-id` from the script above

```vue
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
      repo="[ENTER REPO HERE]"
      repo-id="[ENTER REPO ID HERE]"
      category="General"
      category-id="[ENTER CATEGORY ID HERE]"
      mapping="pathname"
      term="Welcome to giscus"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="isDark ? 'dark' : 'light'"
      lang="en"
      loading="lazy"
    />
  </div>
</template>

<style lang="css" module>
.giscus {
  margin-top: 2rem;
}
</style>
```

### Add Component to VitePress

Add it to `docs/.vitepress/theme/index.ts`:

```typescript
import GiscusComment from '../components/GiscusComment.vue' // [!code ++]
// ...
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(GiscusComment), // [!code ++]
    })
  },
  // ...
} satisfies Theme
```

Success! Try leaving a comment

![giscus success](https://i.imgur.com/gMzwIAZ.png)

### Auto-Switch Interface Language

However, my site supports multiple languages, it would be better if the giscus interface could change accordingly

Add the following lines:

```vue
<script lang="ts" setup>
import Giscus from '@giscus/vue'
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue' // [!code ++]

const route = useRoute()
const { isDark } = useData() // [!code --]
const { isDark, lang } = useData() // [!code ++]
const displayLang = computed(() => { // [!code ++]
  if (lang.value === 'en-US') // [!code ++]
    return 'en' // [!code ++]
  if (lang.value === 'ja-JP') // [!code ++]
    return 'ja' // [!code ++]
  return 'zh-TW' // [!code ++]
}) // [!code ++]
</script>

<template>
  <div :class="$style.giscus">
    <Giscus
      :key="route.path"
      repo="[ENTER REPO HERE]"
      repo-id="[ENTER REPO ID HERE]"
      category="General"
      category-id="[ENTER CATEGORY ID HERE]"
      mapping="pathname"
      term="Welcome to giscus"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="isDark ? 'dark' : 'light'"
      :lang="displayLang" # use variable
      loading="lazy"
    />
  </div>
</template>

<style lang="css" module>
.giscus {
  margin-top: 2rem;
}
</style>
```

## References

- [giscus app](https://giscus.app/)
- [给 VitePress 添加评论功能](https://site.quteam.com/technology/front-end/vitepress-comment/)
- [giscus-component](https://github.com/giscus/giscus-component)
