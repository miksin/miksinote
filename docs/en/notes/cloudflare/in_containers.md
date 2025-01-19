---
title: 'Login to Wrangler in WSL+VSCode Dev Containers'
date: 2025-01-19
---

# Login to Wrangler in WSL+VSCode Dev Containers

When attempt to log in to wrangler in WSL + VSCode dev containers...

```bash
npx wrangler login
```

![try_to_login.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/try_to_login.webp)

Shows `Failed to open` and the browser does not open automatically, but we can open the link in the browser:

![prompt.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/prompt.webp)

At this step, open the browser developer tools and switch to `Network` monitoring. Keep this state and click `Allow` to log in.

You can see a `callback...` request in the `Network`, right-click on it → `Copy` → `Copy as cURL (bash)`

![copy.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/copy.webp)

Do not close the terminal where you logged in, open another terminal and paste the copied content:

![pasted_curl_text.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/pasted_curl_text.webp)

After sending the request, switch back to the original terminal and find that the login is successful!

![login_succeed.webp](https://cdn.miksin.art/miksinote/img/notes/cloudflare/in_containers/login_successed.webp)
