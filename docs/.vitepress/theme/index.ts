import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import GiscusComment from '../components/GiscusComment.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-after': () => h(GiscusComment),
    })
  },
  enhanceApp({ app: _app, router: _router, siteData: _siteData }) {
    // ...
  },
} satisfies Theme
