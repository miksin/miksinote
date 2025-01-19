---
title: '在WSL+VSCode Dev Containers中登入Wrangler'
date: 2025-01-19
---

# 在WSL+VSCode Dev Containers中登入Wrangler

嘗試在WSL + VSCode dev containers中登入wrangler

```bash
npx wrangler login
```

![try_to_login.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/try_to_login.webp)

顯示`Failed to open`瀏覽器不會自動打開，但我們可以在瀏覽器打開該連結：

![prompt.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/prompt.webp)

在這個步驟記得開著瀏覽器開發者工具切到`Network`監控。並維持這個狀態按下Allow允許登入。

可以看到`Network`中出現`callback...`的request，對其右鍵 → `Copy` → `Copy as cURL (bash)`

![copy.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/copy.webp)

剛才login的terminal別關掉，直接另開一個terminal貼上剛才複製的內容：

![pasted_curl_text.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/pasted_curl_text.webp)

送出後，切換回原來的terminal，發現登入成功！

![login_succeed.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/login_successed.webp)
