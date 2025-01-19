---
title: 'robots.txt和aria-label'
date: 2025-01-19
---

# robots.txt和aria-label

> AI生成摘要

<!-- excerpt -->

本文介紹了如何為網站配置有效的`robots.txt`文件以及為無文本的按鈕添加`aria-label`屬性，以提高網站的SEO和無障礙性。

<!-- excerpt -->

[[toc]]

我剛做好了網站[locky](https://locky.miksin.art/)並使用Lighthouse做檢測

## robots.txt is not valid

![seo_robots_txt.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/seo_robots_txt.webp)

我沒有準備`robots.txt`，看起來他讀到`index.html`的內容了

參考[google developers](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt)自己準備一個。

我的網站只有一頁`/`，所以用最簡單的：

```
User-agent: *
Allow: /
```

## Buttons do not have an accessible name

![accessibility_button_aria_label.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/accessibility_button_aria_label.webp)

點進[Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.10/button-name)後發現需要以下條件：

```markdown
Ensure that each button element and elements with role="button" have one of the following characteristics:

- Inner text that is discernible to screen reader users.
- Non-empty aria-label attribute.
- aria-labelledby pointing to element with text which is discernible to screen reader users.
- role="presentation" or role="none" (ARIA 1.1) and is not in tab order (tabindex="-1").
```

由於我有兩個沒有`inner text`，只有Icon的`<button />`，我選擇加上`aria-label`

```
<button
  class={["btn btn-circle btn-xs", copied && "hidden"]}
  onclick={handleCopy}
  aria-label="Copy password" // [!code ++]
>
  {@html copyIcon}
</button>
```

## 結果

再次檢測Lighthouse，問題解決！

![lighthouse_100.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/lighthouse_100.webp)
