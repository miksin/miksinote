---
title: 'WSL+VSCode Dev ContainersでWranglerにログインする'
date: 2025-01-19
---

# WSL+VSCode Dev ContainersでWranglerにログインする

WSL + VSCode開発コンテナでwranglerにログインしようとすると...

```bash
npx wrangler login
```

![try_to_login.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/try_to_login.webp)

`Failed to open`と表示され、ブラウザが自動的に開かれませんが、リンクをブラウザで開くことができます。

![prompt.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/prompt.webp)

このステップで、ブラウザの開発者ツールを開き、`Network`モニタリングに切り替えます。この状態を維持し、`Allow`をクリックしてログインします。

`Network`で`callback...`リクエストが表示されるので、右クリックして→`Copy`→`Copy as cURL (bash)`を選択します。

![copy.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/copy.webp)

ログインしたターミナルを閉じずに、別のターミナルを開いてコピーした内容を貼り付けます。

![pasted_curl_text.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/pasted_curl_text.webp)

リクエストを送信した後、元のターミナルに戻ると、ログインが成功していることがわかります！

![login_succeed.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/login_successed.webp)
