---
title: 'robots.txt and aria-label'
date: 2025-01-19
---

# robots.txt and aria-label

> AI-generated summary

<!-- excerpt -->

This article introduces how to configure an effective `robots.txt` file for your website and add the `aria-label` attribute to buttons without text to improve the SEO and accessibility of your website.

<!-- excerpt -->

[[toc]]

I just finished my website [locky](https://locky.miksin.art/) and used Lighthouse for testing.

## robots.txt is not valid

![seo_robots_txt.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/seo_robots_txt.webp)

I didn't prepare a `robots.txt` file, and it seems to have read the contents of `index.html`.

Refer to [Google Developers](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt) to prepare one yourself.

My website only has one page `/`, so I used the simplest configuration:

```
User-agent: *
Allow: /
```

## Buttons do not have an accessible name

![accessibility_button_aria_label.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/accessibility_button_aria_label.webp)

After clicking [Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.10/button-name), I found the following requirements:

```
Ensure that each button element and elements with role="button" have one of the following characteristics:

- Inner text that is discernible to screen reader users.
- Non-empty aria-label attribute.
- aria-labelledby pointing to element with text which is discernible to screen reader users.
- role="presentation" or role="none" (ARIA 1.1) and is not in tab order (tabindex="-1").
```

Since I have two `<button />` elements without inner text, only icons, I chose to add `aria-label`.

```
<button
  class={["btn btn-circle btn-xs", copied && "hidden"]}
  onclick={handleCopy}
  aria-label="Copy password" // [!code ++]
>
  {@html copyIcon}
</button>
```

## Result

After testing with Lighthouse again, the issues were resolved!

![lighthouse_100.webp](https://cdn.miksin.art/miksinote/img/notes/misc/robots_and_aria_label/lighthouse_100.webp)
