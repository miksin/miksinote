import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app: _app, router: _router, siteData: _siteData }) {
    // ...
  },
} satisfies Theme
