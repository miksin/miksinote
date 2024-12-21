# 安裝VitePress開發環境與部屬: 步驟紀錄

[[toc]]

### 環境

- Windows 11
- AMD CPU

## WSL2

前置: 開啟虛擬化
in bios: SVM Mode = Enabled

新增專案資料夾

```bash
mkdir miksinote
cd miksinote
```

### 安裝Docker

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

確認安裝完成

```bash
sudo docker run hello-world
```

設定權限

```bash
sudo usermod -aG docker $USER
```

然後重開wsl

```powershell
# powershell
wsl --shutdown
wsl
```

## VSCode Dev Containers

先打開VSCode

```bash
code .
```

### 安裝基本的擴充功能

- [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### 產生devcontainer.json設定檔

在VSCode裡按下F1

選擇`Dev Containers: Add Dev Container Configuration Files...`

我選擇了`Node.js & TypeScript`和`Common Utils`等選項，然後生成檔案

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

設定等下開發用的port

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

設定需要用到的VSCode插件

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

設定完成後右下角應該會提示`Reopen in Container`

## 生成VitePress專案

VSCode於container中重開後就可以於內部terminal使用node指令了，這裡我使用pnpm。

```bash
pnpm add -D vitepress
```

使用設定工具完成初始設定

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

### 啟動開發環境

為了讓container外的瀏覽器也能看到預覽畫面需要在package.json加上`--host`

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs", // [!code --]
    "docs:dev": "vitepress dev docs --host", // [!code ++]
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs" // [!code --]
    "docs:preview": "vitepress preview docs --host" // [!code ++]
  },
  "devDependencies": {
    "vitepress": "^1.5.0"
  }
}
```

試著執行看看

```bash
pnpm run docs:dev
```

應該能看見預設的畫面了

### 補上不足的設定檔

這裡我注意到它預設不會附上`.gitignore`檔案，所以我自己追加了

```gitignore
.pnpm-store
node_modules/
```

`/docs`資料夾裡也附上一個

```.gitignore
.vitepress/cache
.vitepress/dist
```

也缺少了`tsconfig.json`我不清楚是否真的需要，總之我補上了

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

## 部屬到CloudFlare Pages

選擇CloudFlare Pages的原因很單純，我的domain是給CloudFlare託管的
部屬之前要先commit到GitHub上，這裡就先省略

1. 登入CloudFlare後在Dashboard左側選單選擇`Workers & Pages`
2. 按下Create後，選擇Pages分頁。
3. Connect to Git後選擇要部屬的repository。
4. 在framework中已經有VitePress可供選擇，設定很簡單。參考以下

```
Build command: npx vitepress build
Build output directory: /.vitepress/dist
Root directory: /docs
Environment variables:
  NODE_VERSION  22.12.0
```

部屬完成後也能設定custom domain，我的domain本來就在CloudFlare，輸入後很快就反映完成了

https://note.miksin.art/

## References

- [VitePress](https://vitepress.dev/)
- [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Desktop for Windows を使用しない Dev Container 環境を構築する](https://qiita.com/ain1084/items/6cb6d82852c91416ec0e)
- [30天用Vitepress 開啟我的"部落客"生活](https://ithelp.ithome.com.tw/users/20109918/ironman/7545)
- [VitePressとCloudflare Pagesで爆速で技術文書を公開する](https://zenn.dev/urth/articles/1d1430d2e15f74#2.-vitepress%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%8A%E3%82%88%E3%81%B3%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)
