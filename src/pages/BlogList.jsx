import { Link } from 'react-router-dom'
import { posts } from '../lib/posts'

const CADASTRO_URL = 'https://app.usefisioflow.com.br/cadastro'

const categoryColors = {
  Gestão: 'bg-emerald-50 text-emerald-700',
  Financeiro: 'bg-blue-50 text-blue-700',
  Produtividade: 'bg-violet-50 text-violet-700',
  Clínica: 'bg-amber-50 text-amber-700',
  Geral: 'bg-gray-100 text-gray-600',
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogList() {
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

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 md:px-6 bg-gradient-to-br from-white via-[#f0fdf4] to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#ecfdf5] border border-[#6ee7b7] rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full" />
            <span className="text-[#065f46] text-sm font-semibold">Blog FisioFlow</span>
          </div>
          <h1 className="serif text-4xl md:text-5xl text-gray-900 mb-4">
            Gestão de clínica<br />
            <span className="italic text-[#065f46]">sem enrolação</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Artigos práticos sobre gestão, financeiro e produtividade para fisioterapeutas que querem crescer com mais controle.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400">Nenhum post publicado ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col border border-gray-100 rounded-2xl p-6 hover:border-[#6ee7b7] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || categoryColors.Geral}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <h2 className="serif text-xl text-gray-900 leading-snug mb-3 group-hover:text-[#065f46] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs font-medium text-gray-700">{post.author}</p>
                      <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
                    </div>
                    <span className="text-[#065f46] text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Ler →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 bg-[#065f46]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="serif text-3xl md:text-4xl text-white mb-4">
            Pronto para organizar sua clínica?
          </h2>
          <p className="text-emerald-200 mb-8">
            Teste o FisioFlow gratuitamente por 7 dias, sem cartão de crédito.
          </p>
          <a
            href={CADASTRO_URL}
            className="inline-block bg-white text-[#065f46] font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            Começar grátis
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} FisioFlow · <a href="/" className="hover:text-gray-600 transition-colors">Voltar ao site</a>
      </footer>
    </div>
  )
}
