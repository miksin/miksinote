---
title: 'Vite + Svelte + Tailwind CSS + daisyUI建置步驟紀錄'
date: 2025-01-19
---

# Vite + Svelte + Tailwind CSS + daisyUI建置步驟紀錄

> AI生成摘要

<!-- excerpt -->

本文介紹如何在WSL環境中使用Vite、Svelte、Tailwind CSS和daisyUI建置專案，並配置VSCode開發環境，包括安裝相關擴展和設定Prettier格式化工具。

<!-- excerpt -->

[[toc]]

## 環境

- WSL
- Docker Desktop
- VSCode Dev Containers

dev containers使用步驟可參考[此文章](https://note.miksin.art/notes/vitepress/01_installation.html)

## 生成Vite Project

我選擇使用[vite](https://vite.dev/guide/#scaffolding-your-first-vite-project)來生成project。

選擇Svelte + TypeScript。要在原資料夾內生成project記得`Project name`要填`.`

```bash
npm create vite@latest

# ✔ Project name: … .
# ✔ Select a framework: › Svelte
# ✔ Select a variant: › TypeScript
# Scaffolding project in /home/user/XXX...

# Done. Now run:

#   npm install
#   npm run dev
```

生成後依照指示安裝並開啟dev server：

```bash
npm install
npm run dev -- --host # for dev containers
```

開啟瀏覽器看見初始畫面

![vite_init.webp](https://cdn.miksin.art/miksinote/img/notes/svelte/vite_tailwind_daisyui/vite_init.webp)

### 設定VSCode

#### 安裝svelte的VSCode extension

在`.devcontainer/devcontainer.json`加入extension名並rebuild

```json
{
  "customizations": {
    "vscode": {
      "extensions": [
        "svelte.svelte-vscode", // [!code ++]
      ]
    }
  }
}
```

在`.vscode/settings.json`中加入使用TypeScript設定

```json
{
  "svelte.enable-ts-plugin": true, // [!code ++]
}
```

## 安裝Tailwind CSS

依照[官方文件](https://tailwindcss.com/docs/installation)指示安裝

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

編輯`postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

編輯生成的`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"], // [!code highlight]
  theme: {
    extend: {},
  },
  plugins: [],
}
```

將設定加入`src/app.css`。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 設定VSCode

#### 安裝Tailwind CSS的VSCode extension

在`.devcontainer/devcontainer.json`加入extension名並rebuild

```json
{
  "customizations": {
    "vscode": {
      "extensions": [
        "svelte.svelte-vscode",
        "bradlc.vscode-tailwindcss", // [!code ++]
      ]
    }
  }
}
```

在`.vscode/settings.json`中加入使用css關聯和suggestion設定

```json
{
  "svelte.enable-ts-plugin": true,
  "files.associations": { // [!code ++]
    "*.css": "tailwindcss" // [!code ++]
  }, // [!code ++]
  "editor.quickSuggestions": { // [!code ++]
    "strings": "on" // [!code ++]
  } // [!code ++]
}
```

開啟`editor.quickSuggestions.strings`後，在字串引號`"`中也能顯示tailwindcss的提示了

## 安裝daisyUI

參考[官方文件](https://daisyui.com/docs/install/)步驟

```bash
npm i -D daisyui@latest
```

編輯`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // [!code highlight]
}
```

完成！

## 設定Prettier

tailwind的class names有時候會非常長，使用formatter會比較便於開發。

參考官方文件步驟

- [prettier-plugin-svelte](https://github.com/sveltejs/prettier-plugin-svelte)
- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```bash
npm install -D prettier prettier-plugin-tailwindcss prettier-plugin-svelte
```

編輯`.prettierrc`

```
{
  "plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  "overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

執行format

```bash
npx prettier --write .
```

### 設定VSCode

#### 安裝Prettier的VSCode extension

在`.devcontainer/devcontainer.json`加入extension名並rebuild

```json
{
  "customizations": {
    "vscode": {
      "extensions": [
        "svelte.svelte-vscode",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode", // [!code ++]
      ]
    }
  }
}
```

在`.vscode/settings.json`中加入自動format設定

```json
{
  "editor.formatOnSave": true, // [!code ++]
  "editor.defaultFormatter": "esbenp.prettier-vscode", // [!code ++]
  // ...
}
```
