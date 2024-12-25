---
title: '故障排除'
date: 2024-12-25
---

# 故障排除

裝是裝好了，也能運作開發了，但還有一些小問題需要排除

## 棄用pnpm

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
