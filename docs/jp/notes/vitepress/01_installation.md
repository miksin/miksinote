---
title: '開発環境設定とデプロイ'
date: 2024-12-21
---

# 開発環境設定とデプロイ

> AI生成の要約

<!-- excerpt -->

この記事では、Windows 11環境でWSL2を使用してDockerをインストールし、開発用にVSCodeでDev Containersを設定し、VitePressプロジェクトを生成および設定し、最終的にプロジェクトをCloudFlare Pagesにデプロイする方法を説明します。

<!-- excerpt -->

[[toc]]

### 環境

- Windows 11
- AMD CPU

## WSL2

前提条件: BIOSでvirtualizationを有効にする
SVM Mode = Enabled

新しいプロジェクトフォルダを作成

```bash
mkdir miksinote
cd miksinote
```

### Dockerのインストール

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

インストールを確認

```bash
sudo docker run hello-world
```

権限を設定

```bash
sudo usermod -aG docker $USER
```

その後、WSLを再起動

```powershell
# powershell
wsl --shutdown
wsl
```

## VSCode Dev Containers

VSCodeを開く

```bash
code .
```

### 必須拡張機能をインストール

- [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### devcontainer.json設定ファイルを生成

VSCodeでF1を押す

`Dev Containers: Add Dev Container Configuration Files...`を選択

`Node.js & TypeScript`と`Common Utils`オプションを選択し、ファイルを生成

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

開発用のポートを設定

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

必要なVSCode拡張機能を設定

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

設定後、右下に`Reopen in Container`というプロンプトが表示されるはずです

## VitePressプロジェクトの作成

VSCodeをコンテナ内で再オープンした後、内部ターミナルでnodeコマンドを使用できます。ここではpnpmを使用します。

```bash
pnpm add -D vitepress
```

セットアップツールを使用して初期設定を完了

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

### 開発環境の開始

コンテナ外のブラウザでプレビューを表示するために、package.jsonに`--host`を追加

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

実行してみる

```bash
pnpm run docs:dev
```

デフォルトの画面が表示されるはずです

### 欠けている設定ファイルを追加

デフォルトでは`.gitignore`ファイルが含まれていないので、追加しました

```
.pnpm-store
node_modules/
```

また、`/docs`フォルダにも追加

```
.vitepress/cache
.vitepress/dist
```

`tsconfig.json`も欠けています。本当に必要かどうかはわかりませんが、一応追加しました

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

## CloudFlare Pagesへのデプロイ

CloudFlare Pagesを選んだ理由はシンプルです。私のドメインはCloudFlareでホストされています
デプロイ前に、まずGitHubにコミットします（ここでは省略）

1. CloudFlareにログイン後、ダッシュボードの左メニューから`Workers & Pages`を選択
2. 作成をクリックし、Pagesタブを選択
3. Gitに接続し、デプロイするリポジトリを選択
4. フレームワークオプションにVitePressが既にあるため、設定は簡単です。以下を参照

```
Build command: npx vitepress build
Build output directory: /.vitepress/dist
Root directory: /docs
Environment variables:
  NODE_VERSION  22.12.0
```

デプロイ後、カスタムドメインも設定できます。私のドメインは既にCloudFlareにあるため、入力後すぐに反映されました

https://note.miksin.art/

## References

- [VitePress](https://vitepress.dev/)
- [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Desktop for Windows を使用しない Dev Container 環境を構築する](https://qiita.com/ain1084/items/6cb6d82852c91416ec0e)
- [30天用Vitepress 開啟我的"部落客"生活](https://ithelp.ithome.com.tw/users/20109918/ironman/7545)
- [VitePressとCloudflare Pagesで爆速で技術文書を公開する](https://zenn.dev/urth/articles/1d1430d2e15f74#2.-vitepress%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%8A%E3%82%88%E3%81%B3%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)
