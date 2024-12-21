import type { DefaultTheme, UserConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
const vitePressConfigs = {
  title: 'miksinote',
  titleTemplate: ':title | miksinote',
  description: 'Miksin\'s note site',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      alt: 'Logo',
    },
    siteTitle: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/miksin' },
    ],

    search: {
      provider: 'local',
    },
  },

  locales: {
    root: {
      lang: 'zh-TW',
      label: '繁體中文',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Notes', link: '/notes', activeMatch: '^/notes' },
          { text: 'About', link: '/about' },
        ],
      },
    },
    en: {
      lang: 'en-US',
      label: 'English',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en' },
          { text: 'Notes', link: '/en/notes', activeMatch: '^/en/notes' },
          { text: 'About', link: '/en/about' },
        ],
      },
    },
    jp: {
      lang: 'ja-JP',
      label: '日本語',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/jp' },
          { text: 'Notes', link: '/jp/notes', activeMatch: '^/jp/notes' },
          { text: 'About', link: '/jp/about' },
        ],
      },
    },
  },
} satisfies UserConfig<DefaultTheme.Config>

export default defineConfig(withSidebar(vitePressConfigs, [{
  documentRootPath: '/docs',
  scanStartPath: 'notes',
  resolvePath: '/notes/',
  useTitleFromFileHeading: true,
}, {
  documentRootPath: '/docs',
  scanStartPath: '/en/notes',
  resolvePath: '/en/',
  basePath: '/',
  useTitleFromFileHeading: true,
}, {
  documentRootPath: '/docs',
  scanStartPath: '/jp/notes',
  resolvePath: '/jp/',
  basePath: '/',
  useTitleFromFileHeading: true,
}]))
