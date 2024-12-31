---
title: 'Linting'
date: 2024-12-31
---

# Linting

> AI生成の要約

<!-- 抜粋 -->

この記事では、プロジェクトでコードチェックとフォーマットを行うためのESLintの設定と使用方法について紹介します。ESLintのインストールと設定、プリコミットフックの設定、VSCodeへの統合について説明します。

<!-- 抜粋 -->

[[toc]]

## リンターのインストール

私は[@antfu/eslint-config](https://github.com/antfu/eslint-config)を使用しており、これでリンティングとフォーマットができます。

```bash
npm i -D eslint eslint-plugin-format @antfu/eslint-config
```

### ESLintの設定

`eslint.config.mjs`を作成します

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

`package.json`に設定を追加します

```json
{
  "scripts": {
    // ...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

フォーマッターを実行します

```bash
npm run lint:fix
```

### TODO: コードブロックの内容を無視する

`.md`ファイルのコードブロックの内容をチェックしたくないのですが、今のところ最適な設定方法がわかりません。解決策が見つかり次第更新します。

### プリコミットの設定

gitでコミットする際に自動的にコードをフォーマットするために`pre-commit`を設定できます。

`lint-staged`と`simple-git-hooks`をインストールします

```bash
npm i -D lint-staged simple-git-hooks
```

`package.json`に設定を追加します：

```json
{
  // ...
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*": "eslint . --fix"
  }
}
```

セットアップを完了するために`simple-git-hooks`を一度実行します

```bash
npx simple-git-hooks
```

## VSCodeに導入

`.vscode/settings.json`に設定を追加します

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
