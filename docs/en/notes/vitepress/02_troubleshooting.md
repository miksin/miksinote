---
title: 'Troubleshooting'
date: 2024-12-25
---

# Troubleshooting

The installation is complete, and development can proceed, but there are still some minor issues to resolve.

## Remove pnpm

After opening the initially generated file `docs/.vitepress/theme/index.ts`, I found the following message:

```
Cannot find module 'vue' or its corresponding type declarations
```

This appears on the line where vue is first imported:

```typescript
import { h } from 'vue'
```

It seems that the already installed vue package cannot be found. However, both the dev server and build run normally, which means the package is installed correctly, but VSCode cannot detect it.

Interestingly, if I run `pnpm run docs:build` once, the error message disappears, as if it found the package. But after some development, it suddenly cannot find it again, which seems to be a very unstable state.

After repeated testing many times, I suspect that the way pnpm installs packages is not compatible with WSL & dev container. Although I cannot find the actual reason, I deleted all the original packages and `pnpm-lock.yaml` and switched back to the traditional npm. The problem was resolved.

```bash
npm install
```
