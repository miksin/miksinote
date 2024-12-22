---
title: Development Environment and Deployment
date: 2024-12-21
---

# Development Environment and Deployment

[[toc]]

### Environment

- Windows 11
- AMD CPU

## WSL2

Prerequisite: Enable virtualization
in BIOS: SVM Mode = Enabled

Create a new project folder

```bash
mkdir miksinote
cd miksinote
```

### Install Docker

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify the installation

```bash
sudo docker run hello-world
```

Set permissions

```bash
sudo usermod -aG docker $USER
```

Then restart WSL

```powershell
# powershell
wsl --shutdown
wsl
```

## VSCode Dev Containers

Open VSCode

```bash
code .
```

### Install essential extensions

- [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Generate devcontainer.json configuration file

Press F1 in VSCode

Select `Dev Containers: Add Dev Container Configuration Files...`

I chose `Node.js & TypeScript` and `Common Utils` options, then generated the file

```json
{
  "name": "Node.js & TypeScript",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm",
  "features": {
    "ghcr.io/devcontainers/features/common-utils:2": {},
    "ghcr.io/devcontainers/features/node:1": {}
  }
}
```

Set the ports for development

```json
{
  "name": "Node.js & TypeScript",
  // ...
  "forwardPorts": [ // [!code ++]
    4173, // [!code ++]
    5173 // [!code ++]
  ] // [!code ++]
}
```

Set the required VSCode extensions

```json
{
  "name": "Node.js & TypeScript",
  // ...
  "customizations": { // [!code ++]
    "vscode": { // [!code ++]
      "extensions": [ // [!code ++]
        "dbaeumer.vscode-eslint", // [!code ++]
        "Vue.volar", // [!code ++]
        "GitHub.copilot", // [!code ++]
        "GitHub.copilot-chat" // [!code ++]
      ] // [!code ++]
    } // [!code ++]
  } // [!code ++]
}
```

After setting up, there should be a prompt at the bottom right saying `Reopen in Container`

## Create VitePress Project

After reopening VSCode in the container, you can use node commands in the internal terminal. Here, I use pnpm.

```bash
pnpm add -D vitepress
```

Use the setup tool to complete the initial setup

```bash
pnpm vitepress init
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  miksinote
│
◇  Site description:
│  Miksin's note site
│
◆  Theme:
│  ○ Default Theme (Out of the box, good-looking docs)
│  ● Default Theme + Customization
│  ○ Custom Theme
└
```

### Start Development Environment

To allow the browser outside the container to see the preview, add `--host` to package.json

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs", // [!code --]
    "docs:dev": "vitepress dev docs --host", // [!code ++]
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs", // [!code --]
    "docs:preview": "vitepress preview docs --host" // [!code ++]
  },
  "devDependencies": {
    "vitepress": "^1.5.0"
  }
}
```

Try running it

```bash
pnpm run docs:dev
```

You should see the default screen

### Add Missing Configuration Files

I noticed it doesn't include a `.gitignore` file by default, so I added one

```
.pnpm-store
node_modules/
```

Also add one in the `/docs` folder

```
.vitepress/cache
.vitepress/dist
```

It also lacks a `tsconfig.json`. I'm not sure if it's really needed, but I added it anyway

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "baseUrl": ".",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "paths": {
      "@/*": ["./docs/*"],
      "@vitepress/*": ["./docs/.vitepress/*"]
    },
    "allowImportingTsExtensions": false,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
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

## Deploy to CloudFlare Pages

The reason for choosing CloudFlare Pages is simple, my domain is hosted by CloudFlare
Before deploying, commit to GitHub first, which is omitted here

1. After logging into CloudFlare, select `Workers & Pages` from the left menu in the Dashboard
2. Click Create, then select the Pages tab.
3. Connect to Git and select the repository to deploy.
4. VitePress is already available in the framework options, making the setup simple. Refer to the following

```
Build command: npx vitepress build
Build output directory: /.vitepress/dist
Root directory: /docs
Environment variables:
  NODE_VERSION  22.12.0
```

After deployment, you can also set a custom domain. My domain is already on CloudFlare, so it was quickly reflected after inputting

https://note.miksin.art/

## References

- [VitePress](https://vitepress.dev/)
- [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Desktop for Windows を使用しない Dev Container 環境を構築する](https://qiita.com/ain1084/items/6cb6d82852c91416ec0e)
- [30天用Vitepress 開啟我的"部落客"生活](https://ithelp.ithome.com.tw/users/20109918/ironman/7545)
- [VitePressとCloudflare Pagesで爆速で技術文書を公開する](https://zenn.dev/urth/articles/1d1430d2e15f74#2.-vitepress%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%8A%E3%82%88%E3%81%B3%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)
