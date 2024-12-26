---
title: 'Giscus'
date: 2024-12-26
---

# Giscus

[[toc]]

## Giscusを有効にする

### ディスカッション機能を有効にする

まず、GitHubの設定でディスカッション機能を有効にします

`(リポジトリページ) > 設定 > 一般 > 機能 > ディスカッション`

### Giscusアプリを設定する

[giscus GitHubアプリ](https://github.com/apps/giscus)をインストールし、リポジトリに対してgiscusを認可します

次に、[giscus.app](https://giscus.app/)にアクセスして初期設定を行います

`repository:`セクションにリポジトリ名を入力します

以下のようなものが表示されるので、これをコピーします:

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

これを今すぐコピーする必要はありません。後で`repo-id`と`category-id`だけが必要になります。

## VitePressに統合する

### Giscusコンポーネントを追加する

まず、Giscus Vueコンポーネントをインストールします

```bash
npm i -S @giscus/vue
```

`docs/.vitepress/components/GiscusComment.vue`を追加します

リポジトリ名を`repo`に、上記のスクリプトから`repo-id`と`category-id`を入力します

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

### VitePressにコンポーネントを追加する

`docs/.vitepress/theme/index.ts`に追加します:

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

成功です！コメントを残してみてください

### インターフェース言語の自動切り替え

しかし、私のサイトは複数の言語をサポートしているため、giscusのインターフェースもそれに応じて変更できると良いでしょう

以下の行を追加します:

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
