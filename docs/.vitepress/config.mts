import type { DefaultTheme, UserConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
const vitePressConfigs = {
  title: 'miksinote',
  titleTemplate: ':title | miksinote',
  description: 'Miksin\'s note site',
  lang: 'en-US',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Notes', link: '/notes', activeMatch: '^/notes' },
      { text: 'About', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/miksin' },
    ],

    search: {
      provider: 'local',
    },
  },
} satisfies UserConfig<DefaultTheme.Config>

export default defineConfig(withSidebar(vitePressConfigs, [{
  documentRootPath: '/docs',
  scanStartPath: 'notes',
  resolvePath: '/notes/',
  useTitleFromFileHeading: true,
}]))
