---
title: 'Fonts'
date: 2024-12-30
---

# Fonts

> AI Generated Summary

<!-- excerpt -->

This article introduces how to use Google Fonts in VitePress, including selecting fonts, obtaining embed codes, configuring VitePress's head and CSS to set different primary fonts based on language settings.

<!-- excerpt -->

[[toc]]

## Using Google Fonts

I used four fonts:

- English [Inter](https://fonts.google.com/specimen/Inter?query=inter)
- Chinese [Noto Sans TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC?query=noto+sans+tc)
- Japanese [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP?query=noto+sans+jp)
- Monospace [Noto Sans Mono](https://fonts.google.com/noto/specimen/Noto+Sans+Mono?query=noto+sans+mono)

Click `Get Font` on each page.

![Get Font](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/get_font.webp)

After selecting the fonts, click `Get embed code`.

![Get embed code](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/get_embed_code.webp)

`Embed code in the <head> of your html` is the part to be added to VitePress.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+Mono:wght@100..900&family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet"></link>
```

![embed code](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/embed_code.webp)

## Integrating with VitePress

### Setting the head

Modify the part copied from Google Fonts and add it to `docs/.vitepress/config.mts`.

```typescript
export default defineConfig({
  // ...
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+Mono:wght@100..900&family=Noto+Sans+TC:wght@100..900&display=swap', rel: 'stylesheet' },
    ],
  ],
  // ...
})
```

### Setting the CSS

Override `docs/.vitepress/theme/style.css`.

```css
:root {
  --vp-font-family-base: var(--main-font-face, 'Inter'), ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --vp-font-family-mono: 'Noto Sans Mono', sans-serif;
}

html[lang='en-US'] {
  --main-font-face: 'Inter';
}

html[lang='zh-TW'] {
  --main-font-face: 'Noto Sans TC';
}

html[lang='ja-JP'] {
  --main-font-face: 'Noto Sans JP';
}
```

The primary font is determined based on the language. The language switch settings will be recorded in the next article.

Check with developer tools, success!

![Network](https://cdn.miksin.art/miksinote/img/notes/vitepress/03_fonts/network.webp)
