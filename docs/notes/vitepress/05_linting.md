---
title: 'Linting'
date: 2024-12-28
---

# Linting

> AI生成摘要

<!-- excerpt -->

> 🚧 WIP 🚧

<!-- excerpt -->

[[toc]]

## 安裝Linter

我使用[@antfu/eslint-config](https://github.com/antfu/eslint-config)，lint之外還能format

```bash
npm i -D eslint eslint-plugin-format @antfu/eslint-config
```

### 設定ESLint

新增`eslint.config.mjs`

```javascript
import antfu from "@antfu/eslint-config"

export default antfu({
  formatters: true,
  stylistic: {
    indent: 2,
    quotes: "double",
  },
  yaml: false,
  jsonc: false,
  vue: true,
  typescript: {
    tsconfigPath: "tsconfig.json",
  },
  ignores: [
    "**/node_modules",
    "**/.vitepress/cache",
    "**/.vitepress/dist",
  ],
})
```

在`package.json`中增加設定

```json
{
  "scripts": {
    // ...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

執行formatter

```bash
npm run lint:fix
```

## 整合VSCode

在`.vscode/settings.json`中追加設定

```json
{
  "vue.server.hybridMode": true,
  "vue.server.includeLanguages": ["vue", "markdown"],
  // Disable the default formatter, use eslint instead
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "json5",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
}
```
