import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

export function postLoader(pattern: string | string[]) {
  return createContentLoader(pattern, {
    excerpt: (file) => {
      file.excerpt = file.content.split('<!-- excerpt -->')[1]
    },
    transform(raw): Post[] {
      return raw
        .filter(({ frontmatter, excerpt }) => !!frontmatter.title && !!excerpt)
        .map(({ url, frontmatter, excerpt }) => ({
          title: frontmatter.title,
          url,
          excerpt,
          date: formatDate(frontmatter.date),
        }))
        .sort((a, b) => b.date.time - a.date.time)
        .slice(0, 10)
    },
  })
}

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
