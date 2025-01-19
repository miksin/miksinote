---
title: 'Vite + Svelte + Tailwind CSS + daisyUI Setup Steps'
date: 2025-01-19
---

# Vite + Svelte + Tailwind CSS + daisyUI Setup Steps

> AI-generated summary

<!-- excerpt -->

This article introduces how to use Vite, Svelte, Tailwind CSS, and daisyUI to set up a project in a WSL environment and configure the VSCode development environment, including installing relevant extensions and setting up the Prettier formatter.

<!-- excerpt -->

[[toc]]

## Environment

- WSL
- Docker Desktop
- VSCode Dev Containers

For steps on using dev containers, refer to [this article](https://note.miksin.art/notes/vitepress/01_installation.html)

## Generate Vite Project

I chose to use [vite](https://vite.dev/guide/#scaffolding-your-first-vite-project) to generate the project.

Select Svelte + TypeScript. To generate the project in the current folder, remember to set `Project name` to `.`

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

After generating, follow the instructions to install and start the dev server:

```bash
npm install
npm run dev -- --host # for dev containers
```

Open the browser to see the initial screen

![vite_init.webp](https://cdn.miksin.art/miksinote/img/notes/svelte/vite_tailwind_daisyui/vite_init.webp)

### Configure VSCode

#### Install Svelte VSCode extension

Add the extension name to `.devcontainer/devcontainer.json` and rebuild

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

Add TypeScript settings to `.vscode/settings.json`

```json
{
  "svelte.enable-ts-plugin": true, // [!code ++]
}
```

## Install Tailwind CSS

Follow the [official documentation](https://tailwindcss.com/docs/installation) to install

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Edit `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

Edit the generated `tailwind.config.js`

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

Add the settings to `src/app.css`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Configure VSCode

#### Install Tailwind CSS VSCode extension

Add the extension name to `.devcontainer/devcontainer.json` and rebuild

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

Add CSS association and suggestion settings to `.vscode/settings.json`

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

After enabling `editor.quickSuggestions.strings`, Tailwind CSS suggestions will also appear within string quotes `"`.

## Install daisyUI

Follow the steps in the [official documentation](https://daisyui.com/docs/install/)

```bash
npm i -D daisyui@latest
```

Edit `tailwind.config.js`

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

Done!

## Configure Prettier

Tailwind class names can sometimes be very long, using a formatter can make development easier.

Follow the steps in the official documentation

- [prettier-plugin-svelte](https://github.com/sveltejs/prettier-plugin-svelte)
- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```bash
npm install -D prettier prettier-plugin-tailwindcss prettier-plugin-svelte
```

Edit `.prettierrc`

```
{
  "plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  "overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

Run format

```bash
npx prettier --write .
```

### Configure VSCode

#### Install Prettier VSCode extension

Add the extension name to `.devcontainer/devcontainer.json` and rebuild

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

Add auto format settings to `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true, // [!code ++]
  "editor.defaultFormatter": "esbenp.prettier-vscode", // [!code ++]
  // ...
}
```
