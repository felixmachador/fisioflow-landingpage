import { useState } from 'react'

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: 'Agenda Inteligente',
    desc: 'Visualize sua semana e mês completos. Turmas fixas aparecem automaticamente. Agende consultas individuais e domiciliares com facilidade.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: 'Gestão de Pacientes',
    desc: 'Cadastro completo com dados pessoais, separação entre clínica e domiciliar, prontuário eletrônico e atestados em um só lugar.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: 'Prontuário Eletrônico',
    desc: 'Ficha clínica completa baseada na realidade do fisioterapeuta. Anamnese, exame físico, evolução por sessão para fisioterapia e pilates.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: 'Presença e Reposição',
    desc: 'Marque presença, falta, falta justificada ou reposição. Agende reposições automaticamente nas turmas com vagas disponíveis.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: 'Financeiro Completo',
    desc: 'Controle de pagamentos, inadimplentes, relatório mensal e visão clara do quanto entrou e quanto está pendente.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: 'Gestão de Profissionais',
    desc: 'Cadastre sua equipe com CREFITO, especialidade e horários. Cada profissional tem seu próprio acesso ao sistema.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: 'Emissão de Atestados',
    desc: 'Gere atestados profissionais em segundos. Preencha os dados e imprima ou salve em PDF direto pelo sistema.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Turmas de Pilates',
    desc: 'Controle de vagas, matrícula de alunos, marcação de presença e reposição de aulas integrada diretamente na agenda.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    title: 'Assistente de IA Integrada',
    desc: 'Pergunte sobre sua clínica, pacientes, agenda ou financeiro. Tire dúvidas técnicas, obtenha sugestões de tratamento e acelere sua rotina com inteligência artificial.'
  },
]

const plans = [
  {
    name: 'Solo', price: '79', desc: 'Para fisioterapeutas autônomas',
    features: ['1 profissional', 'Pacientes ilimitados', 'Agenda completa', 'Prontuário eletrônico', 'Financeiro', 'Suporte por email'],
    destaque: false
  },
  {
    name: 'Clínica', price: '129', desc: 'Para clínicas em crescimento',
    features: ['Até 3 profissionais', 'Pacientes ilimitados', 'Agenda completa', 'Prontuário eletrônico', 'Financeiro', 'Turmas de pilates', 'Suporte prioritário'],
    destaque: true
  },
  {
    name: 'Equipe', price: '199', desc: 'Para clínicas com equipe completa',
    features: ['Profissionais ilimitados', 'Pacientes ilimitados', 'Todas as funcionalidades', 'Assistente de IA integrada', 'Relatórios avançados', 'Suporte dedicado'],
    destaque: false
  },
]

const faqs = [
  { q: 'Preciso instalar algum programa?', a: 'Não! O FisioFlow funciona 100% no navegador. Acesse de qualquer computador, tablet ou celular.' },
  { q: 'Meus dados ficam seguros?', a: 'Sim. Seus dados ficam armazenados em servidores seguros com backup automático. Cada clínica só acessa seus próprios dados.' },
  { q: 'Posso cancelar quando quiser?', a: 'Sim, sem multas ou taxas. Cancele quando quiser diretamente pelo sistema.' },
  { q: 'Funciona para pilates e fisioterapia?', a: 'Sim! O FisioFlow foi construído especificamente para clínicas que atendem fisioterapia e pilates ao mesmo tempo.' },
  { q: 'Tem período de teste gratuito?', a: 'Sim! 14 dias grátis, sem cartão de crédito. Experimente todas as funcionalidades sem compromisso.' },
  { q: 'E se eu tiver dúvidas?', a: 'Nossa equipe de suporte está disponível para ajudar você a configurar e usar o sistema. Você não vai ficar sozinha.' },
]

export default function App() {
  const [faqAberto, setFaqAberto] = useState(null)
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleListaEspera = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="bg-black text-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/logo.png" alt="FisioFlow" className="h-8 w-auto object-contain brightness-200" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm text-gray-400 hover:text-white transition-colors">Funcionalidades</a>
            <a href="#precos" className="text-sm text-gray-400 hover:text-white transition-colors">Preços</a>
            <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a>
            <a href="https://app.usefisioflow.com.br" className="text-sm bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors">Começar grátis</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-sm font-medium">Feito para fisioterapeutas brasileiras</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Menos caos na gestão.
            <span className="text-green-400"> Mais foco nos seus pacientes.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sistema completo para clínicas de fisioterapia e pilates. Com assistente de IA integrada para responder dúvidas e acelerar sua rotina.
          </p>

          {/* Lista de espera */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-xl mx-auto mb-10">
            {enviado ? (
              <div className="text-center py-4">
                <p className="text-3xl mb-3">🎉</p>
                <p className="text-green-400 font-semibold text-lg">Você está na lista!</p>
                <p className="text-gray-400 text-sm mt-2">Entraremos em contato em breve com seu acesso antecipado.</p>
              </div>
            ) : (
              <>
                <p className="text-white font-semibold mb-1">Seja um dos primeiros a testar o FisioFlow.</p>
                <p className="text-gray-400 text-sm mb-6">Entre na lista de espera e tenha acesso antecipado ao lançamento, além de condições exclusivas.</p>
                <form onSubmit={handleListaEspera} className="space-y-3">
                  <input
                    type="tel"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    placeholder="Seu telefone / WhatsApp"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Seu melhor email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-colors"
                  >
                    Quero acesso antecipado
                  </button>
                </form>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm">Sem cartão de crédito. Cancele quando quiser.</p>

          <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/10">
            <div>
              <p className="text-4xl font-bold text-green-400">100%</p>
              <p className="text-gray-400 text-sm mt-1">Online e seguro</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400">14</p>
              <p className="text-gray-400 text-sm mt-1">Dias grátis</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400">∞</p>
              <p className="text-gray-400 text-sm mt-1">Pacientes ilimitados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Tudo que sua clínica precisa</h2>
            <p className="text-gray-400 text-xl">Construído com fisioterapeutas, para fisioterapeutas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-32 px-6 bg-white/3">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Quem usa, aprova</h2>
            <p className="text-gray-400 text-xl">Fisioterapeutas que transformaram sua gestão com o FisioFlow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { nome: 'Pietra Triches', cargo: 'Fisioterapeuta — Clínica Movment', texto: 'Finalmente um sistema que entende a realidade da minha clínica. Antes eu usava papel e WhatsApp para tudo. Agora tenho tudo organizado em um só lugar.' },
              { nome: 'Ana Carolina', cargo: 'Fisioterapeuta e instrutora de Pilates', texto: 'A parte de pilates é incrível. Consigo controlar as turmas, as presenças e as reposições de forma muito simples. Minha equipe adorou.' },
              { nome: 'Mariana Souza', cargo: 'Fisioterapeuta — Atendimento domiciliar', texto: 'O prontuário eletrônico é completo e fácil de usar. Economizo pelo menos 20 minutos por dia que antes gastava preenchendo fichas em papel.' },
            ].map((d, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-green-400">★</span>)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{d.texto}"</p>
                <p className="font-semibold text-sm">{d.nome}</p>
                <p className="text-gray-500 text-xs">{d.cargo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Planos simples e transparentes</h2>
            <p className="text-gray-400 text-xl">Sem taxas escondidas. Cancele quando quiser.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 border ${p.destaque ? 'bg-green-500 border-green-400' : 'bg-white/5 border-white/10'}`}>
                {p.destaque && <p className="text-xs font-bold bg-black/20 rounded-full px-3 py-1 inline-block mb-4">MAIS POPULAR</p>}
                <h3 className={`text-xl font-bold mb-1 ${p.destaque ? 'text-black' : 'text-white'}`}>{p.name}</h3>
                <p className={`text-sm mb-6 ${p.destaque ? 'text-black/70' : 'text-gray-400'}`}>{p.desc}</p>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${p.destaque ? 'text-black' : 'text-white'}`}>R${p.price}</span>
                  <span className={`text-sm ${p.destaque ? 'text-black/70' : 'text-gray-400'}`}>/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${p.destaque ? 'text-black' : 'text-gray-300'}`}>
                      <span className={p.destaque ? 'text-black' : 'text-green-400'}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                
                  href="https://app.usefisioflow.com.br/cadastro"
                  className={`block text-center font-bold py-3 rounded-xl transition-colors ${p.destaque ? 'bg-black text-white hover:bg-gray-900' : 'bg-green-500 text-black hover:bg-green-400'}`}
                >
                  Começar grátis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 bg-white/3">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perguntas frequentes</h2>
            <p className="text-gray-400 text-xl">Tudo que você precisa saber antes de começar.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">{f.q}</span>
                  <span className="text-green-400 text-xl">{faqAberto === i ? '−' : '+'}</span>
                </button>
                {faqAberto === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Pronta para transformar
            <span className="text-green-400"> sua clínica?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-10">Comece hoje. 14 dias grátis, sem cartão de crédito.</p>
          
            href="https://app.usefisioflow.com.br/cadastro"
            className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold px-10 py-5 rounded-xl text-xl transition-colors"
          >
            Começar grátis agora
          </a>
          <p className="text-gray-600 text-sm mt-6">Cancele quando quiser. Sem compromisso.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/logo.png" alt="FisioFlow" className="h-8 w-auto object-contain brightness-200" />
          <p className="text-gray-600 text-sm">© 2026 FisioFlow. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="https://app.usefisioflow.com.br" className="text-gray-400 hover:text-white text-sm transition-colors">Acessar sistema</a>
            <a href="https://app.usefisioflow.com.br/cadastro" className="text-gray-400 hover:text-white text-sm transition-colors">Cadastrar</a>
          </div>
        </div>
      </footer>

    </div>
  )
}