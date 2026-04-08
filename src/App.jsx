import { useState, useRef } from 'react'

const CADASTRO_URL = 'https://app.usefisioflow.com.br/cadastro'

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: 'Agenda Inteligente',
    desc: 'Visualize semana e mês completos. Turmas fixas aparecem automaticamente. Agende consultas individuais e domiciliares com facilidade.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: 'Gestão de Pacientes',
    desc: 'Cadastro completo, prontuário eletrônico, histórico de evolução e atestados em um só lugar.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: 'Prontuário Eletrônico',
    desc: 'Ficha clínica completa para fisioterapia e pilates. Anamnese, exame físico e evolução por sessão.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: 'Financeiro Completo',
    desc: 'Controle de pagamentos, inadimplentes, pacotes de sessões e relatório mensal detalhado.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Turmas de Pilates',
    desc: 'Controle de vagas, matrículas, presença e reposição de aulas integrada diretamente na agenda.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
    title: 'WhatsApp Automático',
    desc: 'Lembretes de consulta, confirmações e aniversários enviados automaticamente para seus pacientes.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: 'Gestão de Profissionais',
    desc: 'Cadastre sua equipe com CREFITO e especialidade. Cada profissional tem seu próprio acesso.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: 'Presença e Reposição',
    desc: 'Marque presença, falta justificada ou reposição. Agende reposições automaticamente nas turmas.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: 'CRM de Leads',
    desc: 'Kanban completo para acompanhar seus potenciais pacientes e converter mais consultas.'
  },
]

const plans = [
  {
    name: 'Solo',
    preco_mensal: 127,
    preco_anual: 106,
    desc: 'Para fisioterapeutas autônomas',
    features: [
      '1 profissional',
      'Até 80 pacientes',
      'Agenda completa',
      'Prontuário eletrônico',
      'Financeiro básico',
      'WhatsApp manual',
      'IA Flora',
      'Suporte por e-mail',
    ],
    destaque: false,
    cta: 'Começar grátis'
  },
  {
    name: 'Equipe',
    preco_mensal: 197,
    preco_anual: 164,
    desc: 'Para clínicas em crescimento',
    features: [
      'Até 5 profissionais',
      'Pacientes ilimitados',
      'Tudo do Solo',
      'Turmas de Pilates',
      'CRM de leads',
      'Orçamentos PDF',
      'WhatsApp automático',
      'Dashboard avançado',
    ],
    destaque: true,
    cta: 'Começar grátis'
  },
  {
    name: 'Clínica',
    preco_mensal: 347,
    preco_anual: 289,
    desc: 'Para clínicas com equipe completa',
    features: [
      'Profissionais ilimitados',
      'Pacientes ilimitados',
      'Tudo do Equipe',
      'Contratos PDF',
      'Relatório de alta',
      'Prognóstico por IA',
      'Configuração assistida',
      'Suporte por videochamada',
    ],
    destaque: false,
    cta: 'Começar grátis'
  },
]

const faqs = [
  { q: 'Preciso instalar algum programa?', a: 'Não. O FisioFlow funciona 100% no navegador. Acesse de qualquer computador, tablet ou celular, em qualquer lugar.' },
  { q: 'Meus dados ficam seguros?', a: 'Sim. Seus dados ficam armazenados em servidores seguros com backup automático. Cada clínica acessa apenas seus próprios dados, com isolamento total.' },
  { q: 'Posso cancelar quando quiser?', a: 'Sim, sem multas ou taxas. Cancele quando quiser diretamente pelo sistema, sem burocracia.' },
  { q: 'Funciona para pilates e fisioterapia ao mesmo tempo?', a: 'Sim. O FisioFlow foi construído especificamente para clínicas que atendem fisioterapia e pilates ao mesmo tempo, com módulos dedicados para cada um.' },
  { q: 'Tem período de teste gratuito?', a: 'Sim, 7 dias grátis sem precisar de cartão de crédito. Você experimenta todas as funcionalidades do plano Solo sem compromisso.' },
  { q: 'Como funciona a configuração assistida do plano Clínica?', a: 'Nossa equipe agenda uma videochamada para configurar o sistema junto com você — importar pacientes, configurar agenda, WhatsApp e tudo mais. Você começa a usar no mesmo dia.' },
]

// Mock de dashboard para hero
function MockDashboard() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }} className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 w-full">
      {/* Header */}
      <div className="bg-[#065f46] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <span className="text-white/80 text-xs font-medium">FisioFlow</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/60" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-12 bg-gray-50 border-r border-gray-100 py-4 flex flex-col items-center gap-3">
          {['▦','◎','◈','$','★'].map((icon, i) => (
            <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${i === 0 ? 'bg-[#065f46] text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
              {icon}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'Pacientes', value: '47', color: '#065f46' },
              { label: 'Este mês', value: 'R$8.4k', color: '#2563eb' },
              { label: 'Confirmados', value: '12', color: '#d97706' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="text-sm font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Agenda */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 mb-3">
            <p className="text-xs font-semibold text-gray-500 mb-2">Hoje — Segunda, 7 Abr</p>
            <div className="space-y-1.5">
              {[
                { hora: '08:00', nome: 'Maria Silva', tipo: 'Fisioterapia', cor: '#ecfdf5', borda: '#6ee7b7' },
                { hora: '09:00', nome: 'Turma Pilates A', tipo: '5 alunas', cor: '#eff6ff', borda: '#93c5fd' },
                { hora: '10:30', nome: 'Ana Costa', tipo: 'Domiciliar', cor: '#fff7ed', borda: '#fcd34d' },
                { hora: '14:00', nome: 'João Pereira', tipo: 'Fisioterapia', cor: '#ecfdf5', borda: '#6ee7b7' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5 border" style={{ background: a.cor, borderColor: a.borda }}>
                  <span className="text-xs font-mono text-gray-500 w-10 shrink-0">{a.hora}</span>
                  <span className="text-xs font-semibold text-gray-700 flex-1">{a.nome}</span>
                  <span className="text-xs text-gray-400">{a.tipo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financeiro mini */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#ecfdf5] rounded-xl p-3 border border-[#6ee7b7]/40">
              <p className="text-xs text-[#065f46]/60 mb-1">Recebido</p>
              <p className="text-sm font-bold text-[#065f46]">R$ 6.240</p>
            </div>
            <div className="bg-[#fff1f2] rounded-xl p-3 border border-red-200">
              <p className="text-xs text-red-400 mb-1">Pendente</p>
              <p className="text-sm font-bold text-red-500">R$ 2.160</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [faqAberto, setFaqAberto] = useState(null)
  const [anual, setAnual] = useState(false)

  const irParaCadastro = () => {
    window.location.href = CADASTRO_URL
  }

  const BotaoPrimario = ({ className = '', texto = 'Criar minha conta grátis' }) => (
    <button
      onClick={irParaCadastro}
      className={`bg-[#065f46] hover:bg-[#047857] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      {texto}
    </button>
  )

  return (
    <div className="bg-white text-gray-900" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/logo.png" alt="FisioFlow" className="h-14 w-auto object-contain" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Funcionalidades</a>
            <a href="#precos" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Preços</a>
            <a href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">FAQ</a>
            <BotaoPrimario className="text-sm px-5 py-2.5" />
          </div>
          {/* Mobile CTA */}
          <BotaoPrimario className="md:hidden text-sm px-4 py-2" />
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-24 pb-16 px-6 bg-gradient-to-br from-white via-[#f0fdf4] to-white overflow-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ecfdf5] border border-[#6ee7b7] rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                <span className="text-[#065f46] text-sm font-semibold">7 dias grátis · Sem cartão</span>
              </div>

              <h1 className="serif text-5xl md:text-6xl leading-[1.1] mb-6 text-gray-900">
                Gestão completa para sua{' '}
                <span className="italic text-[#065f46]">clínica de fisioterapia</span>
              </h1>

              <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
                Agenda, prontuário, financeiro, pilates e WhatsApp automático. Tudo em um sistema feito por fisioterapeutas, para fisioterapeutas.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <BotaoPrimario className="px-8 py-4 text-base" />
                <a href="#funcionalidades" className="border border-gray-200 hover:border-gray-300 text-gray-700 font-medium px-8 py-4 rounded-xl text-base transition-colors text-center">
                  Ver funcionalidades
                </a>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['#065f46','#047857','#059669','#10b981'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: c }}>
                      {['P','A','M','C'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                  <p className="text-xs text-gray-500">Usado por fisioterapeutas em todo o Brasil</p>
                </div>
              </div>
            </div>

            {/* Right — mockup */}
            <div className="relative hidden lg:block">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] rounded-3xl -rotate-2 scale-105" />
              <div className="relative">
                <MockDashboard />
              </div>
              {/* Floating badges */}
              <div className="absolute -left-8 top-1/3 bg-white rounded-2xl shadow-xl p-3 border border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#ecfdf5] rounded-xl flex items-center justify-center text-[#065f46] text-sm font-bold">47</div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Pacientes ativos</p>
                  <p className="text-xs text-gray-400">este mês</p>
                </div>
              </div>
              <div className="absolute -right-6 bottom-1/4 bg-white rounded-2xl shadow-xl p-3 border border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-sm">✓</div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">WhatsApp enviado</p>
                  <p className="text-xs text-gray-400">confirmação automática</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#065f46] py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { valor: '100%', label: 'Online e seguro' },
            { valor: '7 dias', label: 'Grátis para testar' },
            { valor: 'Ilimitados', label: 'Pacientes no Equipe e Clínica' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-white mb-1">{s.valor}</p>
              <p className="text-[#6ee7b7] text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-28 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">Funcionalidades</p>
            <h2 className="serif text-4xl md:text-5xl text-gray-900 mb-4">Tudo que sua clínica precisa</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Construído com fisioterapeutas, para fisioterapeutas. Cada detalhe pensado na sua rotina.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#6ee7b7] hover:shadow-md transition-all duration-200 group">
                <div className="w-10 h-10 bg-[#ecfdf5] rounded-xl flex items-center justify-center text-[#065f46] mb-4 group-hover:bg-[#065f46] group-hover:text-white transition-colors duration-200">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* IA destaque */}
          <div className="bg-[#065f46] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start md:items-center gap-5">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Flora — Assistente de IA Integrada</h3>
                <p className="text-[#6ee7b7] text-sm max-w-lg">Pergunte sobre sua clínica, pacientes, agenda ou financeiro. A Flora responde com base nos seus dados reais e acelera sua rotina clínica.</p>
              </div>
            </div>
            <button onClick={irParaCadastro} className="shrink-0 bg-white text-[#065f46] font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
              Conhecer a Flora
            </button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">Depoimentos</p>
            <h2 className="serif text-4xl md:text-5xl text-gray-900 mb-4">Quem usa, aprova</h2>
            <p className="text-gray-500 text-xl">Fisioterapeutas que transformaram sua gestão com o FisioFlow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { nome: 'Pietra Triches', cargo: 'Fisioterapeuta — Clínica Movment', texto: 'Finalmente um sistema que entende a realidade da minha clínica. Antes eu usava papel e WhatsApp para tudo. Agora tenho tudo organizado em um só lugar.' },
              { nome: 'Ana Carolina', cargo: 'Fisioterapeuta e instrutora de Pilates', texto: 'A parte de pilates é incrível. Consigo controlar as turmas, as presenças e as reposições de forma muito simples. Minha equipe adorou.' },
              { nome: 'Mariana Souza', cargo: 'Fisioterapeuta — Atendimento domiciliar', texto: 'O prontuário eletrônico é completo e fácil de usar. Economizo pelo menos 20 minutos por dia que antes gastava preenchendo fichas em papel.' },
            ].map((d, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">"{d.texto}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#065f46] flex items-center justify-center text-white text-sm font-bold">
                    {d.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{d.nome}</p>
                    <p className="text-gray-400 text-xs">{d.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="py-28 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">Planos</p>
            <h2 className="serif text-4xl md:text-5xl text-gray-900 mb-4">Simples e transparente</h2>
            <p className="text-gray-500 text-xl mb-8">Sem taxas escondidas. Cancele quando quiser.</p>

            {/* Toggle mensal/anual */}
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-1.5">
              <button
                onClick={() => setAnual(false)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!anual ? 'bg-[#065f46] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Mensal
              </button>
              <button
                onClick={() => setAnual(true)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${anual ? 'bg-[#065f46] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Anual
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${anual ? 'bg-white/20 text-white' : 'bg-[#ecfdf5] text-[#065f46]'}`}>-17%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 border-2 relative flex flex-col ${p.destaque ? 'bg-[#065f46] border-[#065f46]' : 'bg-white border-gray-100'}`}>
                {p.destaque && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#22c55e] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">MAIS POPULAR</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-1 ${p.destaque ? 'text-white' : 'text-gray-900'}`}>{p.name}</h3>
                  <p className={`text-sm ${p.destaque ? 'text-[#6ee7b7]' : 'text-gray-400'}`}>{p.desc}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-bold ${p.destaque ? 'text-white' : 'text-gray-900'}`}>
                      R${anual ? p.preco_anual : p.preco_mensal}
                    </span>
                    <span className={`text-sm mb-1.5 ${p.destaque ? 'text-[#6ee7b7]' : 'text-gray-400'}`}>/mês</span>
                  </div>
                  {anual && (
                    <p className={`text-xs mt-1 ${p.destaque ? 'text-[#6ee7b7]' : 'text-[#065f46]'}`}>
                      Cobrado anualmente · R${p.preco_anual * 12}/ano
                    </p>
                  )}
                  {!anual && (
                    <p className={`text-xs mt-1 ${p.destaque ? 'text-white/50' : 'text-gray-400'}`}>
                      ou R${p.preco_anual}/mês no plano anual
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-start gap-2.5 text-sm ${p.destaque ? 'text-white/90' : 'text-gray-600'}`}>
                      <span className={`mt-0.5 shrink-0 ${p.destaque ? 'text-[#6ee7b7]' : 'text-[#065f46]'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={irParaCadastro}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${p.destaque ? 'bg-white text-[#065f46] hover:bg-gray-50' : 'bg-[#065f46] text-white hover:bg-[#047857]'}`}
                >
                  {p.cta} — 7 dias grátis
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">Todos os planos incluem 7 dias de teste grátis. Sem cartão de crédito.</p>
        </div>
      </section>

      {/* CTA intermediário */}
      <section className="py-20 px-6 bg-[#065f46]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="serif text-4xl md:text-5xl text-white mb-4">
            Pronta para organizar<br />
            <span className="italic">sua clínica de vez?</span>
          </h2>
          <p className="text-[#6ee7b7] text-lg mb-8">7 dias grátis, sem cartão, sem compromisso.</p>
          <button
            onClick={irParaCadastro}
            className="bg-white text-[#065f46] font-bold px-10 py-4 rounded-xl text-lg hover:bg-gray-50 transition-colors"
          >
            Criar minha conta grátis
          </button>
        </div>
      </section>

      {/* FisioFlow Club */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ecfdf5] border border-[#6ee7b7] rounded-full px-4 py-2 mb-6">
                <span className="text-[#065f46] text-sm font-semibold">Exclusivo para assinantes</span>
              </div>
              <h2 className="serif text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
                FisioFlow{' '}
                <span className="italic text-[#065f46]">Club</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Assinar o FisioFlow vai além do sistema. No Club você tem acesso a descontos exclusivos em fornecedores, equipamentos, cursos e eventos do setor — benefícios pensados para quem vive a fisioterapia todos os dias.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { titulo: 'Descontos em fornecedores', desc: 'Equipamentos, materiais e insumos com condições especiais negociadas para assinantes.' },
                  { titulo: 'Eventos e congressos', desc: 'Acesso antecipado e descontos em eventos, cursos e congressos de fisioterapia e pilates.' },
                  { titulo: 'Comunidade exclusiva', desc: 'Troca de experiências com outros fisioterapeutas, dicas de gestão e novidades do setor.' },
                  { titulo: 'Parceiros selecionados', desc: 'Plataformas, softwares e serviços complementares com benefícios exclusivos para clientes FisioFlow.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#ecfdf5] rounded-xl flex items-center justify-center text-[#065f46] shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.titulo}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={irParaCadastro}
                className="bg-[#065f46] hover:bg-[#047857] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Criar minha conta grátis
              </button>
            </div>

            {/* Right — visual do Club */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] rounded-3xl" />
              <div className="relative p-8">
                <p className="text-[#065f46] font-bold text-sm uppercase tracking-widest mb-6">Parceiros do Club</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { categoria: 'Equipamentos', desconto: 'até 20% off', cor: '#ecfdf5', borda: '#6ee7b7' },
                    { categoria: 'Cursos online', desconto: 'até 30% off', cor: '#eff6ff', borda: '#93c5fd' },
                    { categoria: 'Congressos', desconto: 'acesso VIP', cor: '#fff7ed', borda: '#fcd34d' },
                    { categoria: 'Softwares', desconto: 'planos especiais', cor: '#fdf4ff', borda: '#d8b4fe' },
                    { categoria: 'Materiais', desconto: 'até 15% off', cor: '#ecfdf5', borda: '#6ee7b7' },
                    { categoria: 'Eventos', desconto: 'desconto exclusivo', cor: '#fff1f2', borda: '#fca5a5' },
                  ].map((p, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border shadow-sm" style={{ borderColor: p.borda }}>
                      <p className="text-xs font-semibold text-gray-500 mb-1">{p.categoria}</p>
                      <p className="text-sm font-bold text-gray-900">{p.desconto}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-[#065f46] rounded-2xl p-4 text-center">
                  <p className="text-[#6ee7b7] text-xs font-semibold uppercase tracking-widest mb-1">Novos parceiros todo mês</p>
                  <p className="text-white text-sm">Incluído em todos os planos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="serif text-4xl md:text-5xl text-gray-900 mb-4">Perguntas frequentes</h2>
            <p className="text-gray-500 text-xl">Tudo que você precisa saber antes de começar.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
                <button
                  onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
                  <span className={`text-[#065f46] text-xl font-light transition-transform duration-200 ${faqAberto === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {faqAberto === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-28 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-4">Comece hoje</p>
          <h2 className="serif text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Sua clínica merece uma{' '}
            <span className="italic text-[#065f46]">gestão à altura</span>
          </h2>
          <p className="text-gray-500 text-xl mb-10">Junte-se às fisioterapeutas que já organizam sua clínica com o FisioFlow.</p>
          <button
            onClick={irParaCadastro}
            className="bg-[#065f46] hover:bg-[#047857] text-white font-bold px-12 py-5 rounded-xl text-xl transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Criar minha conta grátis
          </button>
          <p className="text-gray-400 text-sm mt-4">7 dias grátis · Sem cartão · Cancele quando quiser</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/logo.png" alt="FisioFlow" className="h-8 w-auto object-contain" />
          <p className="text-gray-400 text-sm">© 2026 FisioFlow. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/termos" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Termos de uso</a>
            <a href="/privacidade" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  )
}