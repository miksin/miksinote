---
title: 'robots.txt と aria-label'
date: 2025-01-19
---

# robots.txt と aria-label

> AI生成の要約

<!-- excerpt -->

この記事では、ウェブサイトのSEOとアクセシビリティを向上させるために、効果的な`robots.txt`ファイルの設定方法と、テキストのないボタンに`aria-label`属性を追加する方法を紹介します。

<!-- excerpt -->

[[toc]]

最近一つサイト[locky](https://locky.miksin.art/)を完成させ、Lighthouseでテストしました。

## robots.txt is not valid

![seo_robots_txt.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/seo_robots_txt.webp)

`robots.txt`ファイルを準備していなかったため、`index.html`の内容が読み取られたようです。

[Google Developers](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt)を参照して、自分で準備してください。

サイトには1ページ`/`しかないので、最も簡単な設定を使用しました：

```
User-agent: *
Allow: /
```

## Buttons do not have an accessible name

![accessibility_button_aria_label.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/accessibility_button_aria_label.webp)

[ボタンをよりアクセシブルにする方法を学ぶ](https://dequeuniversity.com/rules/axe/4.10/button-name)をクリックした後、以下の要件を見つけました：

```
Ensure that each button element and elements with role="button" have one of the following characteristics:

- Inner text that is discernible to screen reader users.
- Non-empty aria-label attribute.
- aria-labelledby pointing to element with text which is discernible to screen reader users.
- role="presentation" or role="none" (ARIA 1.1) and is not in tab order (tabindex="-1").
```

2つの`<button />`要素に内部テキストがなく、アイコンのみであるため、`aria-label`を追加することにしました。

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

再度Lighthouseでテストしたところ、問題が解決しました！

![lighthouse_100.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/lighthouse_100.webp)
