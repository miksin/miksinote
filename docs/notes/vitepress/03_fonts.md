---
title: '字型'
date: 2024-12-30
---

# 字型

> AI生成摘要

<!-- excerpt -->

本文介紹了如何在VitePress中使用Google Fonts，包括選擇字型、獲取嵌入代碼、配置VitePress的head和CSS，以根據語言設定不同的主要字型。

<!-- excerpt -->

[[toc]]

## 使用Google Fonts

我使用了四種字型

- 英文 [Inter](https://fonts.google.com/specimen/Inter?query=inter)
- 中文 [Noto Sans TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC?query=noto+sans+tc)
- 日文 [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP?query=noto+sans+jp)
- 等寬字型 [Noto Sans Mono](https://fonts.google.com/noto/specimen/Noto+Sans+Mono?query=noto+sans+mono)

分別在每個頁面都點選`Get Font`

![Get Font](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/get_font.webp)

需要字型選擇好後點選`Get embed code`

![Get embed code](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/get_embed_code.webp)

`Embed code in the <head> of your html`就是等一下要放進VitePress的部分

```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+Mono:wght@100..900&family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet">
```

![embed code](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/embed_code.webp)

## 導入VitePress

### 設定head

將剛才從google fonts複製來的部分修改一下放進`docs/.vitepress/config.mts`

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

### 設定css

覆寫`docs/.vitepress/theme/style.css`

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

根據語言決定主要字型，有關語言切換設定的部分會在下一篇文章記錄。

用開發者工具檢查一下，成功！

![Network](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/network.webp)
