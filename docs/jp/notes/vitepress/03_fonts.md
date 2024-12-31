---
title: 'フォント'
date: 2024-12-30
---

# フォント

> AI生成の要約

<!-- excerpt -->

この記事では、VitePressでGoogleフォントを使用する方法を紹介します。フォントの選択、埋め込みコードの取得、VitePressのheadとCSSを設定して、言語設定に基づいて異なる主要フォントを設定する方法を含みます。

<!-- excerpt -->

[[toc]]

## Googleフォントの使用

私は4つのフォントを使用しました：

- 英語 [Inter](https://fonts.google.com/specimen/Inter?query=inter)
- 中国語 [Noto Sans TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC?query=noto+sans+tc)
- 日本語 [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP?query=noto+sans+jp)
- モノスペース [Noto Sans Mono](https://fonts.google.com/noto/specimen/Noto+Sans+Mono?query=noto+sans+mono)

各ページで`Get Font`をクリックします。

![Get Font](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/get_font.webp)

フォントを選択した後、`Get embed code`をクリックします。

![Get embed code](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/get_embed_code.webp)

`Embed code in the <head> of your html`はVitePressに追加する部分です。

```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+Mono:wght@100..900&family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet"></link>
```

![embed code](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/embed_code.webp)

## VitePressとの統合

### headの設定

Googleフォントからコピーした部分を修正し、`docs/.vitepress/config.mts`に追加します。

```typescript
export default defineConfig({
  // ...
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    [
      "link",
      { href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+Mono:wght@100..900&family=Noto+Sans+TC:wght@100..900&display=swap", rel: "stylesheet" },
    ],
  ],
  // ...
})
```

### CSSの設定

`docs/.vitepress/theme/style.css`を上書きします。

```css
:root {
  --vp-font-family-base: var(--main-font-face, "Inter"), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --vp-font-family-mono: "Noto Sans Mono", sans-serif;
}

html[lang="en-US"] {
  --main-font-face: "Inter";
}

html[lang="zh-TW"] {
  --main-font-face: "Noto Sans TC";
}

html[lang="ja-JP"] {
  --main-font-face: "Noto Sans JP";
}
```

主要フォントは言語に基づいて決定されます。言語切り替え設定は次の記事で記録します。

開発者ツールで確認し、成功しました！

![Network](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/network.webp)
