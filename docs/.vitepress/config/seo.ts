import type { DefaultTheme, UserConfig } from 'vitepress'

export const seoConfigs = {
  sitemap: {
    hostname: 'https://note.miksin.art',
  },
  transformPageData(pageData) {
    const canonicalUrl = `https://note.miksin.art/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl },
    ])

    const titleSuffix = pageData.relativePath === 'index.md' ? '' : ' | miksinote'
    const title = `${pageData.title}${titleSuffix}`
    const description = 'Explore Miksin\'s comprehensive notes on various topics, including VitePress, programming, and more.'

    const ogMeta = [
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:image',
        content: 'https://note.miksin.art/og_image.jpg',
      },
      {
        property: 'og:image:alt',
        content: 'miksinote - logo',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:url',
        content: canonicalUrl,
      },
    ]

    const twitterMeta = [
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:image',
        content: 'https://note.miksin.art/og_image.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'miksinote - logo',
      },
      {
        name: 'twitter:site',
        content: '@miksin_',
      },
      {
        name: 'twitter:creator',
        content: '@miksin_',
      },
    ]

    const metaItems = [...ogMeta, ...twitterMeta]

    pageData.frontmatter.head.push(...metaItems.map(item => ['meta', item]))
  },
} satisfies UserConfig<DefaultTheme.Config>
