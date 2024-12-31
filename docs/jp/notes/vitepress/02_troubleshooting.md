---
title: 'トラブルシューティング'
date: 2024-12-25
---

# トラブルシューティング

> AI生成の要約

<!-- excerpt -->

この記事では、VitePressの開発プロセス中に遭遇した2つの主な問題とその解決策を紹介します。まず、VSCodeがインストールされたvueパッケージを見つけられなかった問題は、npmに切り替えることで解決しました。次に、`README.md`に多数のTypeScriptエラーメッセージが表示される問題は、`tsconfig.json`の`include`範囲を調整することで解決しました。

<!-- excerpt -->

[[toc]]

インストールは完了し、開発を進めることができますが、まだいくつかの小さな問題を解決する必要があります。

## vueパッケージが見つかりません

最初に生成されたファイル `docs/.vitepress/theme/index.ts` を開いた後、次のメッセージが表示されました：

```
Cannot find module 'vue' or its corresponding type declarations
```

これは、vueが最初にインポートされる行に表示されます：

```typescript
import { h } from "vue"
```

すでにインストールされているvueパッケージが見つからないようです。しかし、開発サーバーとビルドは正常に動作するため、パッケージは正しくインストールされていますが、VSCodeがそれを検出できません。

奇妙なのは、`pnpm run docs:build` を一度実行すると、エラーメッセージが消え、パッケージが見つかったかのように見えます。しかし、しばらく開発を続けると、突然再び見つからなくなり、非常に不安定な状態のようです。

何度も繰り返しテストした結果、pnpmがWSLと開発コンテナとの相性が悪いと疑っています。実際の理由はわかりませんが、元のパッケージと `pnpm-lock.yaml` をすべて削除し、従来のnpmに戻しました。問題は解決しました。

```bash
npm install
```

## README.mdに大量のエラー

VSCode内で、`README.md`ファイルに大量のエラーメッセージが表示されますが、実際にはドキュメントにエラーはありません。Markdownファイルであるにもかかわらず、多くの `ts-plugin(2304)` エラーが表示されます。

`README.md`でVSCodeのTypeScriptチェックを無効にしたいのですが、`include`セクションに含めていないにもかかわらず、エラーが表示されます。

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

以下の試みを行いましたが、どれも効果がありませんでした：

試み1: `README.md`を`exclude`セクションに追加

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

試み2: `typescript.tsdk`の指定

```json
// .vscode/settings.json
{
  // ...
  "typescript.tsdk": "./node_modules/typescript/lib",  // [!code ++]
}
```

考えた結果、問題はVueがすべての`.md`ファイルに適用される一方で、tsconfigは`/docs/**/*.md`にのみ適用されるという矛盾が原因であることに気付きました。最初の試みは間違った方向でした。Vueの適用範囲を制限できないため、tsconfigの適用範囲を拡大する必要がありました。

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

エラーメッセージは消えました！より良い解決策が見つかれば、この記事を更新します。
