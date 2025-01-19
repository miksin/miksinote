---
title: 'Vite + Svelte + Tailwind CSS + daisyUI セットアップ手順'
date: 2025-01-19

---

# Vite + Svelte + Tailwind CSS + daisyUI セットアップ手順

> AI生成の要約

<!-- excerpt -->

この記事では、WSL環境でVite、Svelte、Tailwind CSS、およびdaisyUIを使用してプロジェクトをセットアップし、VSCode開発環境を構成する方法を紹介します。関連する拡張機能のインストールやPrettierフォーマッターの設定も含まれます。

<!-- excerpt -->

[[toc]]

## 環境

- WSL
- Docker Desktop
- VSCode Dev Containers

Dev Containersの使用手順については、[この記事](https://note.miksin.art/notes/vitepress/01_installation.html)を参照してください。

## Viteプロジェクトの生成

[こちら](https://vite.dev/guide/#scaffolding-your-first-vite-project)を参考にして、Viteを使用してプロジェクトを生成します。

Svelte + TypeScriptを選択します。現在のフォルダにプロジェクトを生成するには、`Project name`を`.`に設定することを忘れないでください。

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

生成後、指示に従ってインストールし、開発サーバーを起動します。

```bash
npm install
npm run dev -- --host # for dev containers
```

ブラウザを開いて初期画面を確認します。

![vite_init.webp](https://cdn.miksin.art/miksinote/img/notes/svelte/vite_tailwind_daisyui/vite_init.webp)

### VSCodeの設定

#### Svelte VSCode拡張機能のインストール

拡張機能名を`.devcontainer/devcontainer.json`に追加し、再ビルドします。

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

TypeScript設定を`.vscode/settings.json`に追加します。

```json
{
  "svelte.enable-ts-plugin": true, // [!code ++]
}
```

## Tailwind CSSのインストール

[公式ドキュメント](https://tailwindcss.com/docs/installation)に従ってインストールします。

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

`postcss.config.js`を編集します。

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

生成された`tailwind.config.js`を編集します。

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

設定を`src/app.css`に追加します。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### VSCodeの設定

#### Tailwind CSS VSCode拡張機能のインストール

拡張機能名を`.devcontainer/devcontainer.json`に追加し、再ビルドします。

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

CSSの関連付けと提案設定を`.vscode/settings.json`に追加します。

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

`editor.quickSuggestions.strings`を有効にすると、文字列の引用符`"`内でもTailwind CSSの提案が表示されます。

## daisyUIのインストール

[公式ドキュメント](https://daisyui.com/docs/install/)に従って手順を進めます。

```bash
npm i -D daisyui@latest
```

`tailwind.config.js`を編集します。

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

完了です！

## Prettierの設定

Tailwindのクラス名は非常に長くなることがあるため、フォーマッターを使用すると開発が容易になります。

公式ドキュメントに従って手順を進めます。

- [prettier-plugin-svelte](https://github.com/sveltejs/prettier-plugin-svelte)
- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```bash
npm install -D prettier prettier-plugin-tailwindcss prettier-plugin-svelte
```

`.prettierrc`を編集します。

```
{
  "plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  "overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

フォーマットを実行します。

```bash
npx prettier --write .
```

### VSCodeの設定

#### Prettier VSCode拡張機能のインストール

拡張機能名を`.devcontainer/devcontainer.json`に追加し、再ビルドします。

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

自動フォーマット設定を`.vscode/settings.json`に追加します。

```json
{
  "editor.formatOnSave": true, // [!code ++]
  "editor.defaultFormatter": "esbenp.prettier-vscode", // [!code ++]
  // ...
}
```
