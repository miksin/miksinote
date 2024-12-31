---
title: 'Linting'
date: 2024-12-31
---

# Linting

> AI Generated Summary

<!-- excerpt -->

This article introduces how to set up and use ESLint for code checking and formatting in a project, including installing and configuring ESLint, setting up pre-commit hooks, and integrating ESLint in VSCode.

<!-- excerpt -->

[[toc]]

## Installing Linter

I use [@antfu/eslint-config](https://github.com/antfu/eslint-config), which can lint and format.

```bash
npm i -D eslint eslint-plugin-format @antfu/eslint-config
```

### Configuring ESLint

Create `eslint.config.mjs`

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

Add settings to `package.json`

```json
{
  "scripts": {
    // ...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

Run the formatter

```bash
npm run lint:fix
```

### TODO: Ignore code block content

I don't want to check the content of code blocks in `.md` files, but I don't know the best way to set this up. I'll update this once I find a solution.

### Setting up pre-commit

You can set up `pre-commit` to automatically format code when committing with git.

Install `lint-staged`, `simple-git-hooks`

```bash
npm i -D lint-staged simple-git-hooks
```

Add settings to `package.json`:

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

Run `simple-git-hooks` once to complete the setup

```bash
npx simple-git-hooks
```

## Integrating with VSCode

Add settings to `.vscode/settings.json`

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

  // Silence the stylistic rules in your IDE, but still auto fix them
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
