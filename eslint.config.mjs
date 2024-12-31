import antfu from "@antfu/eslint-config"

export default antfu({
  formatters: true,
  stylistic: {
    indent: 2,
    quotes: "double",
  },
  yaml: false,
  jsonc: false,
  vue: true,
  typescript: {
    tsconfigPath: "tsconfig.json",
  },
  ignores: [
    "**/node_modules",
    "**/.vitepress/cache",
    "**/.vitepress/dist",
  ],
})
