import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../lib/posts'

const CADASTRO_URL = 'https://app.usefisioflow.com.br/cadastro'

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const mdComponents = {
  h2: ({ children }) => (
    <h2 className="serif text-2xl md:text-3xl text-gray-900 mt-12 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="serif text-xl text-gray-900 mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-600 leading-relaxed mb-5">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-2 mb-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-5 text-gray-600">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 text-gray-600">
      <span className="text-[#065f46] mt-1 shrink-0">•</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#6ee7b7] pl-5 py-1 my-6 bg-[#f0fdf4] rounded-r-xl text-gray-600 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-gray-100" />,
  a: ({ href, children }) => (
    <a href={href} className="text-[#065f46] underline underline-offset-2 hover:text-[#047857]" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <a href="/">
            <img src="/logo.png" alt="FisioFlow" className="h-10 md:h-14 w-auto object-contain" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/#funcionalidades" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Funcionalidades</a>
            <a href="/#precos" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Preços</a>
            <Link to="/blog" className="text-sm text-[#065f46] font-semibold">Blog</Link>
            <a href="https://app.usefisioflow.com.br" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Entrar</a>
            <a href={CADASTRO_URL} className="bg-[#065f46] hover:bg-[#047857] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Testar grátis
            </a>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <a href="https://app.usefisioflow.com.br" className="text-sm text-gray-500 hover:text-gray-900 font-medium">Entrar</a>
            <a href={CADASTRO_URL} className="bg-[#065f46] text-white text-sm font-semibold px-4 py-2 rounded-xl">
              Testar grátis
            </a>
          </div>
        </div>
      </nav>

      {/* Post header */}
      <header className="pt-32 pb-10 px-4 md:px-6 bg-gradient-to-br from-white via-[#f0fdf4] to-white">
        <div className="max-w-2xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-[#065f46] font-medium mb-8 hover:gap-2.5 transition-all">
            ← Voltar ao blog
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{post.readTime} de leitura</span>
          </div>
          <h1 className="serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">{post.description}</p>
          <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
            <div className="w-9 h-9 rounded-full bg-[#065f46] flex items-center justify-center text-white text-sm font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{post.author}</p>
              <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Post body */}
      <article className="py-12 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* CTA inline */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-2xl mx-auto bg-[#065f46] rounded-2xl p-8 md:p-10 text-center">
          <h3 className="serif text-2xl md:text-3xl text-white mb-3">
            Experimente o FisioFlow grátis
          </h3>
          <p className="text-emerald-200 mb-6 text-sm">
            7 dias sem compromisso. Sem cartão de crédito. Cancele quando quiser.
          </p>
          <a
            href={CADASTRO_URL}
            className="inline-block bg-white text-[#065f46] font-semibold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            Começar grátis
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} FisioFlow ·{' '}
        <Link to="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
        {' · '}
        <a href="/" className="hover:text-gray-600 transition-colors">Voltar ao site</a>
      </footer>
    </div>
  )
}
