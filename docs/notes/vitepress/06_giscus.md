---
title: 'Giscus'
date: 2024-12-26
---

# Giscus

> AI生成摘要

<!-- excerpt -->

本文介紹如何在VitePress中啟用和設置Giscus評論系統。步驟包括在GitHub開啟Discussion功能、安裝giscus GitHub App、在giscus.app進行設定、安裝Giscus的Vue Component、配置GiscusComment.vue元件，並將其添加到VitePress主題中，實現界面語言自動切換。

<!-- excerpt -->

[[toc]]

## 啟用Giscus

### 開啟Discussion功能

首先在GitHub設定中開啟Discussion功能

`(Repository Page) > Settings > General > Features > Discussions`

![github settings](https://cdn.miksin.art/miksinote/img/notes/vitepress/06_giscus/github_enable_discussions.webp)

### 設定Giscus App

安裝[giscus GitHub App](https://github.com/apps/giscus)並授權該repository給giscus

![giscus GitHub App](https://cdn.miksin.art/miksinote/img/notes/vitepress/06_giscus/github_giscus_app.webp)

接著來到[giscus.app](https://giscus.app/)做初步設定

在`repository:`的部分輸入自己的repository名

你應該可以在下面看到類似這樣的內容可供複製：

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

這邊先不用複製，等下只會需要用到當中的`repo-id`和`category-id`。

## 導入VitePress中

### 新增Giscus Component

先安裝Giscus的Vue Component

```bash
npm i -S @giscus/vue
```

新增`docs/.vitepress/components/GiscusComment.vue`

其中`repo`請填入你自己的repository名，`repo-id`, `category-id`則填入剛才可供複製的script中的資訊

```vue
<script lang="ts" setup>
import Giscus from "@giscus/vue"
import { useData, useRoute } from "vitepress"

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

### 將Component加進VitePress

追加進`docs/.vitepress/theme/index.ts`裡：

```typescript
import GiscusComment from "../components/GiscusComment.vue" // [!code ++]
// ...
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => h(GiscusComment), // [!code ++]
    })
  },
  // ...
} satisfies Theme
```

成功！嘗試留言看看

![giscus success](https://cdn.miksin.art/miksinote/img/notes/vitepress/06_giscus/giscus_success.webp)

### 界面語言自動切換

不過我的網站是支援多語言的，如果giscus介面也能跟著變動就更好了

稍微增加下面幾行設定：

```vue
<script lang="ts" setup>
import Giscus from "@giscus/vue"
import { useData, useRoute } from "vitepress"
import { computed } from "vue" // [!code ++]

const route = useRoute()
const { isDark } = useData() // [!code --]
const { isDark, lang } = useData() // [!code ++]
const displayLang = computed(() => { // [!code ++]
  if (lang.value === "en-US") // [!code ++]
    return "en" // [!code ++]
  if (lang.value === "ja-JP") // [!code ++]
    return "ja" // [!code ++]
  return "zh-TW" // [!code ++]
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
