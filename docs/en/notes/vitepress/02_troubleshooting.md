---
title: 'Troubleshooting'
date: 2024-12-25
---

# Troubleshooting

> AI-generated summary

<!-- excerpt -->

This article introduces two main issues encountered during the development process with VitePress and their solutions. First, VSCode could not find the installed vue package, which was resolved by switching to npm. Second, there were numerous TypeScript error messages in `README.md`, which were resolved by adjusting the `include` scope in `tsconfig.json`.

<!-- excerpt -->

[[toc]]

The installation is complete, and development can proceed, but there are still some minor issues to resolve.

## Cannot find vue package

After opening the initially generated file `docs/.vitepress/theme/index.ts`, I found the following message:

```
Cannot find module 'vue' or its corresponding type declarations
```

This appears on the line where vue is first imported:

```typescript
import { h } from "vue"
```

It seems that the already installed vue package cannot be found. However, both the dev server and build run normally, which means the package is installed correctly, but VSCode cannot detect it.

Interestingly, if I run `pnpm run docs:build` once, the error message disappears, as if it found the package. But after some development, it suddenly cannot find it again, which seems to be a very unstable state.

After repeated testing many times, I suspect that the way pnpm installs packages is not compatible with WSL & dev container. Although I cannot find the actual reason, I deleted all the original packages and `pnpm-lock.yaml` and switched back to the traditional npm. The problem was resolved.

```bash
npm install
```

## Massive Errors in README.md

I want the type checking for Vue to also apply to the `.md` files inside `/docs`, so I made the following settings:

```json
// .vscode/settings.json
{
  // ...
  "vue.server.hybridMode": true,
  "vue.server.includeLanguages": ["vue", "markdown"],
}
```

```json
// tsconfig.json
{
  // ...
  "include": [
    "docs/**/*.md",
    "docs/.vitepress/*.mts",
    "docs/.vitepress/theme/*.ts",
    "docs/.vitepress/theme/**/*.ts",
    "docs/.vitepress/theme/**/*.vue"
  ],
  "exclude": [
    "node_modules",
    "resource"
  ],
  "vueCompilerOptions": {
    "vitePressExtensions": [".md"]
  }
}
```

But here's the problem: from within VSCode, the `README.md` file is filled with a massive amount of error messages, even though there are no actual errors in my document. Despite being a Markdown file, it shows a bunch of `ts-plugin(2304)` errors.

I don't want VSCode's TypeScript checking to be active in `README.md`, but I clearly haven't included it in the `include` section!

```json
  // tsconfig.json
  // ...
  "include": [
    "docs/**/*.md",
    "docs/.vitepress/*.mts",
    "docs/.vitepress/theme/*.ts",
    "docs/.vitepress/theme/**/*.ts",
    "docs/.vitepress/theme/**/*.vue"
  ],
```

I tried the following attempts, but none worked:

Attempt 1: Adding `README.md` to the `exclude` section

```json
// tsconfig.json
{
  // ...
  "exclude": [
    "README.md", // [!code ++]
    "node_modules",
    "resource"
  ],
  // ...
}
```

Attempt 2: Specifying `typescript.tsdk`

```json
// .vscode/settings.json
{
  // ...
  "typescript.tsdk": "./node_modules/typescript/lib",  // [!code ++]
}
```

I thought about it and realized that the issue arises because Vue applies to all `.md` files, while tsconfig only applies to `/docs/**/*.md`. This contradiction is the root cause. My initial attempts were in the wrong direction. Since I can't restrict the scope of Vue, I had to expand the scope of tsconfig.

```json
// tsconfig.json
{
  // ...
  "include": [
    "docs/**/*.md", // [!code --]
    "**/*.md", // [!code ++]
    "docs/.vitepress/*.mts",
    "docs/.vitepress/theme/*.ts",
    "docs/.vitepress/theme/**/*.ts",
    "docs/.vitepress/theme/**/*.vue"
  ],
  // ...
}
```

The error messages disappeared! If I find a better solution, I will update this article.
