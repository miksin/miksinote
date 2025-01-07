---
title: Cloudflare PagesとAstroでURL短縮サービスを構築する
date: 2025-01-07
---

# Cloudflare PagesとAstroでURL短縮サービスを構築する

> AI生成の要約

<!-- 抜粋 -->

この記事では、Cloudflare PagesとAstroを使用してURL短縮サービスを構築する方法を紹介します。この記事では、環境設定、AstroとCloudflareの統合、Cloudflare KVの設定、ページの実装とデプロイについて説明します。これらの手順に従うことで、完全に機能するURL短縮サービスを構築することができます。

<!-- 抜粋 -->

[[toc]]

## Prerequisite

- Docker
- VSCode
- Cloudflareアカウント

## 環境設定

VSCodeの開発コンテナを使用します

VSCodeでF1を押します

`Dev Containers: Add Dev Container Configuration Files...`を選択します

`node.js`環境を選択します：

![dev_container.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/tiny/dev_container.webp)

以下は私が使用した`devcontainer.json`と`Dockerfile`です

```json
{
  "name": "Untitled Node.js project",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "remoteUser": "node",
  "features": {
    "ghcr.io/devcontainers/features/common-utils:2": {}
  },
  "forwardPorts": [
    4321, // for astro dev server
    8976  // for wrangler login
  ],
  "customizations": {
    "vscode": {
      "extensions": [
        "astro-build.astro-vscode",
        "svelte.svelte-vscode",
        "dbaeumer.vscode-eslint",
        "GitHub.copilot",
        "GitHub.copilot-chat"
      ]
    }
  }
}
```

`forwardPorts`は後で開発のために必要です

```Dockerfile
FROM node:22

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
```

他のVSCode開発コンテナについては、[別の記事](/notes/vitepress/01_installation)を参照してください

## Astroの設定

コンテナに入った後、公式ツールを使用してAstroファイルを生成します

```bash
npm create astro@latest

# dir   Where should we create your new project?
#        ./astro

# tmpl   How would you like to start your new project?
#        A basic, minimal starter

# deps   Install dependencies?
#        Yes

#  git   Initialize a new git repository?
#        Yes
```

生成されたファイルは`/astro`フォルダにあります。すべての内容を移動しました

```bash
mv astro/* .
rm -rf astro
```

開発サーバーを起動してみて、初期画面が表示されるはずです

```bash
npm run dev
```

![astro_init.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/tiny/astro_init.webp)

### Cloudflare Integration

Cloudflare Integrationを追加します

```bash
npx astro add cloudflare
```

自動的にファイルを設定してくれるはずですが、いくつかの設定を追加する必要があります：

```js
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
})
```

このURL短縮サービスは純粋な静的ウェブサイトではないので、AstroがデフォルトでSSRを使用するように`output: 'server'`を設定します

`platformProxy.enabled`は、ローカルでCloudflareの機能を使用できるようにするためのものです

詳細については、[公式ドキュメント](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#platformproxy)を参照してください

### Cloudflare KVの設定

こののURL短縮サービスは、短縮URLとキー値ペアを保存する必要があります。ここでは`Cloudflare KV`を使用します

#### wranglerにログイン

`wrangler`はCloudflareの公式ツールです。まずログインしましょう

```bash
npx wrangler login
```

ブラウザがポップアップするはずですが、開発コンテナでは自動的にポップアップしないため、手動でURLをコピーしてブラウザに貼り付ける必要があります

![wrangler_grant.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/tiny/wrangler_grant.webp)

同意すると、ページはポート8976にリダイレクトしようとしますが、失敗するかもしれません

しかし、`devcontainer.json`でこのポートを開いているので、正常にログインできるはずです

#### KV Namespaceの作成

データを保存するための名前空間を作成し、`SHORT_TO_URL`と名付けます

```bash
npx wrangler@latest kv:namespace create SHORT_TO_URL
```

ターミナルからIDを取得し、`wrangler.toml`に追加します

```
[[kv_namespaces]]
binding = "SHORT_TO_URL"
id = "[YOUR ID HERE]"
```

開発環境が`SHORT_TO_URL`を認識するようにするために、`env.d.ts`を追加します

```
/// <reference types="astro/client" />

type KVNamespace = import("@cloudflare/workers-types").KVNamespace;
type ENV = {
  SHORT_TO_URL: KVNamespace;
};

// use a default runtime configuration (advanced mode).
type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
  interface Locals extends Runtime {}
}
```

詳細については、[公式ドキュメント](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/#use-bindings-in-your-astro-application)を参照してください

`.wrangler`フォルダが表示されましたが、バージョン管理に追加する必要はないようですので、`.gitignore`に追加します：

```
.wrangler/
```

### ページの実装

3つのエンドポイントを用意します：

- `src/pages/index.astro`
  - ホームページ。静的で、ユーザーがURLを入力して送信するためのフォームを準備します
- `src/pages/shorten.ts`
  - URLを受け取り、短縮されたslugを返します
- `src/pages/[slug].ts`
  - slugを受け取り、保存されたURLにリダイレクトします

#### `src/pages/index.astro`

このページは基本的にインタラクティブなフォームが必要で、SSRは必要ありません。`prerender = true`を追加して指定します

[こちら](https://docs.astro.build/en/reference/routing-reference/#switch-to-server-mode)を参照してください

```astro
---
export const prerender = true;
---
```

フォームの実装にはSvelteを使用します

```bash
npx astro add svelte
```

CSS部分は省略しますが、`index.astro`では、コンポーネントをインタラクティブにするために`client:load`として指定する必要があります

```jsx
<Form client:load />
```

フォームの内容は通常のフロントエンド実装と同じです。[GitHub](https://github.com/miksin/tiny/blob/main/src/components/Form.svelte)を参照してください

#### `src/pages/shorten.ts`

このエンドポイントはURLを受け取り、短縮されたslugを返すために使用されます

md5暗号化を使用するので、まずパッケージをインストールします：

```bash
npm i -S js-md5
```

slugを計算した後、`locals`から以前に設定した`SHORT_TO_URL`を取得できます

```typescript
import type { APIRoute } from "astro"
import { md5 } from "js-md5"

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json()
    const url = new URL(body.url)
    let hashed = Number.parseInt(md5.hex(url.href), 16)
    let slug = ""
    for (let i = 0; i < 6; i++) {
      slug += charset[hashed % charset.length]
      hashed = Math.floor(hashed / charset.length)
    }
    const { SHORT_TO_URL } = locals.runtime.env
    await SHORT_TO_URL.put(slug, url.href)
    return new Response(JSON.stringify({ slug }))
  }
  catch (e) {
    return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400 })
  }
}
```

#### `src/pages/[slug].ts`

このエンドポイントは受け取ったslugを処理し、以前に保存されたURLをクエリしてリダイレクトを提供する必要があります

```typescript
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ params, locals, redirect }) => {
  const slug: string = params.slug ?? ""
  const { SHORT_TO_URL } = locals.runtime.env
  const url = await SHORT_TO_URL.get(slug)
  if (!url) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  }
  return redirect(url, 301)
}
```

## デプロイ

`package.json`にビルドとデプロイコマンドを設定できます

```json
{
  "scripts": {
    // ...
    "deploy": "astro build && wrangler pages deploy",
  }
}
```

```bash
npm run deploy
```

成功！しかし、私のドメイン名は長すぎて、全く短縮されませんでした 🙃

![tiny_site.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/tiny/tiny_site.webp)

#### 疑問

最初はCloudflare Pagesに含まれるデプロイ機能を使用するように設定しましたが、この機能だけを使用するとワーカーが自動的に生成されません。
つまり、静的ページのみが正常にデプロイされ（他のページは404が表示されます）

ローカルから`wrangler pages deploy`を使用するだけでうまくいくようです

## 参考文献

- [Build a Full-Stack Application using Astro on Cloudflare Workers and Cloudflare Pages](https://youtu.be/c_IBs1crl4k?si=0jEVb2t_GNvWF9m0)
