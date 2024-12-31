---
title: 'Internationalization & Sidebar'
date: 2024-12-31
---

# Internationalization & Sidebar

> AI-generated summary

<!-- excerpt -->

This article introduces how to set up internationalization support and automatically generate a sidebar in VitePress. First, configure the multilingual folders and files, then set the language options in `config.mts`. Next, install and configure the `vitepress-sidebar` plugin to automatically generate the sidebar, and achieve indentation for sub-items by modifying the CSS.

<!-- excerpt -->

[[toc]]

## Internationalization Settings

### Configure Folders and Files

Refer to the [official documentation](https://vitepress.dev/guide/i18n#internationalization) for configuration. I have set up three languages:

- Traditional Chinese (root)
- English
- Japanese

```
docs/
├─ en/
│  ├─ foo.md
├─ jp/
│  ├─ foo.md
├─ foo.md
```

### Configure config

Add the settings in `docs/.vitepress/config.mts`

```typescript
export default defineConfig({
  // ...
  locales: {
    root: {
      lang: "zh-TW",
      label: "繁體中文",
      themeConfig: {
        nav: [
          { text: "Home", link: "/" },
          { text: "Notes", link: "/notes/vitepress", activeMatch: "^/notes" },
        ],
      },
    },
    en: {
      lang: "en-US",
      label: "English",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en" },
          { text: "Notes", link: "/en/notes/vitepress", activeMatch: "^/en/notes" },
        ],
      },
    },
    jp: {
      lang: "ja-JP",
      label: "日本語",
      themeConfig: {
        nav: [
          { text: "Home", link: "/jp" },
          { text: "Notes", link: "/jp/notes/vitepress", activeMatch: "^/jp/notes" },
        ],
      },
    },
  },
  // ...
})
```

## Sidebar Settings

Although you can manually set the Sidebar path like in the [official documentation](https://vitepress.dev/reference/default-theme-sidebar#sidebar), it is not practical to manually sync every time you add or modify files. Therefore, I chose to let it be automatically generated.

### Install VitePress Sidebar

```bash
npm i -D vitepress-sidebar
```

### Configure config

Add the settings in `docs/.vitepress/config.mts`

```typescript
import type { DefaultTheme, UserConfig } from "vitepress"
import { defineConfig } from "vitepress"
import { withSidebar } from "vitepress-sidebar"

const vitePressConfigs = {
  title: "miksinote",
  // ...
} satisfies UserConfig<DefaultTheme.Config>

export default defineConfig(withSidebar(vitePressConfigs, [{
  documentRootPath: "/docs",
  scanStartPath: "notes",
  resolvePath: "/notes/",
  useTitleFromFileHeading: true,
  useFolderLinkFromIndexFile: true,
  useFolderTitleFromIndexFile: true,
}, {
  documentRootPath: "/docs",
  scanStartPath: "/en/notes",
  resolvePath: "/en/notes/",
  basePath: "/",
  useTitleFromFileHeading: true,
  useFolderLinkFromIndexFile: true,
  useFolderTitleFromIndexFile: true,
}, {
  documentRootPath: "/docs",
  scanStartPath: "/jp/notes",
  resolvePath: "/jp/notes/",
  basePath: "/",
  useTitleFromFileHeading: true,
  useFolderLinkFromIndexFile: true,
  useFolderTitleFromIndexFile: true,
}]))
```

Using `withSidebar`, settings were made for the three languages respectively, where `resolvePath` and `basePath` are quite important. I wasn't entirely sure how it works, but through trial and error, I found a configuration that works correctly.

After restarting the dev server, you can see the sidebar displayed correctly!

```bash
npm run docs:dev
```

You can try switching languages to see if it works correctly.

![sidebar_a](https://cdn.miksin.art/miksinote/img/notes/vitepress/04_internationalization/sidebar_a.webp)

### Configure CSS

The sidebar is displayed, but there is a problem: the main items and sub-items are on the same level. I want the sub-items to be indented, like this:

![sidebar_b](https://cdn.miksin.art/miksinote/img/notes/vitepress/04_internationalization/sidebar_b.webp)

Fortunately, the [official documentation](https://vitepress-sidebar.cdget.com/advanced-usage/multi-level-sidebar-with-indents#multi-level-sidebar-with-indents) provides a way to modify it.

Add the settings in `docs/.vitepress/theme/style.css`

```css
/**
 * Component: Sidebar
 * -------------------------------------------------------------------------- */
.group .VPSidebarItem.level-0 .items {
  padding-left: 16px !important;
  border-left: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  transition: background-color 0.25s;
}
```

You can see the correct indentation.

![sidebar_c](https://cdn.miksin.art/miksinote/img/notes/vitepress/04_internationalization/sidebar_c.webp)

## References

- [Internationalization | VitePress](https://vitepress.dev/guide/i18n#internationalization)
- [VitePress Sidebar](https://vitepress-sidebar.cdget.com/)
