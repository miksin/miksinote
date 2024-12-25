---
title: '故障排除'
date: 2024-12-25
---

# 故障排除

[[toc]]

裝是裝好了，也能運作開發了，但還有一些小問題需要排除

## 找不到vue package

我打開一開始生成的檔案`docs/.vitepress/theme/index.ts`後發現了這樣的訊息

```
Cannot find module 'vue' or its corresponding type declarations
```

出現在一開始import vue的那一行

```typescript
import { h } from 'vue'
```

似乎是找不到已經安裝好的vue package。但dev server和build都能正常運行，也就是說package是正常安裝的，只是VSCode偵測不到。

神奇的是如果我執行了一次`pnpm run docs:build`錯誤訊息就會消失，似乎是它找到package了。但開發了一陣子後就又會突然找不到，似乎是非常不安定的狀態。

反覆測試了很多次後我懷疑是pnpm安裝package的方式與WSL & dev container的相性不好。
雖然我不能找到實際的緣由，但總之我刪光原本的packages與`pnpm-lock.yaml`換回傳統的npm。問題就得到解決了。

```bash
npm install
```

我希望vue的型態檢查也作用在`/docs`裡面的`.md`檔案，因此有了這樣的設定：

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

但問題來了，從VSCode裡看起來`README.md`裡充滿了海量的錯誤訊息，但並不是我的文件裡真的有什麼錯誤。
明明是Markdown檔案卻顯示一堆`ts-plugin(2304)`這樣的錯誤。

我不希望VSCode的TypeScript檢查在`README.md`裡還在作用，但我明明沒有將其放在`include`裡面呀！

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

我做了以下的嘗試都沒有用

嘗試1: 將`README.md`放進`exclude`裡面

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

嘗試2: 指定typescript.tsdk

```json
// .vscode/settings.json
{
  // ...
  "typescript.tsdk": "./node_modules/typescript/lib",  // [!code ++]
}
```

我想了想，不就是因為vue作用在所有`.md`上，而tsconfig卻只作用在`/docs/**/*.md`上所產生的矛盾嗎？
我從一開始的嘗試就相反了，既然我阻止不了vue作用的範圍，那只好改tsconfig的作用範圍了

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

錯誤訊息消失了！如果有更好的解法會在更新這篇文章
