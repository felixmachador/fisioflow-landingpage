const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data = {}
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':')
    if (colonIdx > -1) {
      const key = line.slice(0, colonIdx).trim()
      const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
      if (key) data[key] = val
    }
  })

  return { data, content: match[2] }
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.replace('../posts/', '').replace('.md', '')
    const { data, content } = parseFrontmatter(raw)
    return {
      slug,
      content,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || 'Equipe FisioFlow',
      category: data.category || 'Gestão',
      readTime: data.readTime || '5 min',
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug)
}
