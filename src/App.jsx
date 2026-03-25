import { useState } from 'react'

const features = [
  { icon: '📅', title: 'Agenda Inteligente', desc: 'Visualize sua semana e mês completos. Turmas fixas aparecem automaticamente. Agende consultas individuais e domiciliares com facilidade.' },
  { icon: '👥', title: 'Gestão de Pacientes', desc: 'Cadastro completo com dados pessoais, separação entre clínica e domiciliar, prontuário eletrônico e atestados em um só lugar.' },
  { icon: '📋', title: 'Prontuário Eletrônico', desc: 'Ficha clínica completa baseada na realidade do fisioterapeuta. Anamnese, exame físico, evolução por sessão para fisioterapia e pilates.' },
  { icon: '🧘', title: 'Turmas de Pilates', desc: 'Controle de vagas, matrícula de alunos, marcação de presença e reposição de aulas integrada diretamente na agenda.' },
  { icon: '💰', title: 'Financeiro Completo', desc: 'Controle de pagamentos, inadimplentes, relatório mensal e visão clara do quanto entrou e quanto está pendente.' },
  { icon: '✅', title: 'Presença e Reposição', desc: 'Marque presença, falta, falta justificada ou reposição. Agende reposições automaticamente nas turmas com vagas disponíveis.' },
  { icon: '👩‍⚕️', title: 'Gestão de Profissionais', desc: 'Cadastre sua equipe com CREFITO, especialidade e horários. Cada profissional tem seu próprio acesso ao sistema.' },
  { icon: '📄', title: 'Emissão de Atestados', desc: 'Gere atestados profissionais em segundos. Preencha os dados e imprima ou salve em PDF direto pelo sistema.' },
  { icon: '🤖', title: 'IA no Prontuário (em breve)', desc: 'Fale ou escreva livremente sobre a sessão e a IA organiza automaticamente no prontuário. Economize 15 minutos por paciente.' },
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
    features: ['Profissionais ilimitados', 'Pacientes ilimitados', 'Todas as funcionalidades', 'IA no prontuário (em breve)', 'Relatórios avançados', 'Suporte dedicado'],
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
            Sua clínica,
            <span className="text-green-400"> organizada.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            O FisioFlow é o sistema de gestão feito especialmente para clínicas de fisioterapia e pilates. Agenda, prontuário, financeiro e muito mais — tudo em um lugar só.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.usefisioflow.com.br/cadastro" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Começar 14 dias grátis
            </a>
            <a href="#funcionalidades" className="border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-xl text-lg transition-colors">
              Ver funcionalidades
            </a>
          </div>
          <p className="text-gray-600 text-sm mt-6">Sem cartão de crédito. Cancele quando quiser.</p>
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
                <span className="text-3xl mb-4 block">{f.icon}</span>
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
            Começar grátis agora →
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