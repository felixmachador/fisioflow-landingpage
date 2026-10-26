import { useState } from 'react'
import { useGrade, montarPlanos, nomeDoPlano, seloDoRecurso, menorPreco } from './lib/planos'
import { LinhaRecurso, LegendaFicticia, TelaNavegador } from './components/Vitrine'

const CADASTRO_URL = 'https://app.usefisioflow.com.br/cadastro'
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcuhBA73Bx_p9JqsEtuKvALcF6p4N71sxujcxpq-IgvFzFwIRqZsem8vjkqxO9lVCn/exec'

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
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: 'CRM de Leads',
    desc: 'Kanban completo para acompanhar seus potenciais pacientes e converter mais consultas.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Prognóstico por IA',
    desc: 'Analisa casos similares no banco de dados e gera uma estimativa de sessões e melhora clínica para o seu paciente. Exclusivo Plano Clínica.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: 'Suporte por WhatsApp e Videochamada',
    desc: 'Nossa equipe está disponível para ajudar você via WhatsApp. No plano Clínica, conte também com suporte por videochamada e configuração assistida.'
  },
]

const formatarReais = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })

const ANTES_DEPOIS = [
  {
    antes: 'O paciente esquece, falta, e você passa o fim da tarde mandando mensagem um por um para confirmar.',
    depois: 'Na véspera, cada paciente recebe a confirmação no WhatsApp. A resposta já muda o status na agenda.'
  },
  {
    antes: 'Ficha de papel, dor anotada em texto solto e evolução difícil de mostrar para o paciente.',
    depois: 'Prontuário digital com corpo 3D, evolução em gráfico e laudo pronto para imprimir.'
  },
  {
    antes: 'Mensalidade no caderno, cobrança constrangedora e contrato impresso que ninguém acha depois.',
    depois: 'Financeiro com recibo e lembrete de pagamento, e contrato assinado pelo paciente no celular.'
  },
]

// Tour pelas telas reais (public/telas, geradas das capturas do app com dados fictícios).
// recurso = chave da grade de planos (GET /planos) que define o selo do plano.
const TOUR = [
  {
    tela: 'agenda',
    recurso: 'confirmacaoAutomatica',
    rotulo: 'Agenda',
    titulo: 'Agenda que se',
    destaque: 'confirma sozinha',
    texto: 'Marque uma vez e repita a semana inteira. Na véspera, o FisioFlow manda a confirmação para cada paciente, e quem cancela ou pede para remarcar avisa você.',
    pontos: ['Sessões recorrentes em poucos cliques', 'Cores por tipo de atendimento e filtro por profissional', 'Confirmado, cancelado ou remarcar direto na agenda'],
    alt: 'Agenda semanal do FisioFlow com as sessões coloridas por tipo de atendimento'
  },
  {
    tela: 'central',
    recurso: 'dashboardCompleto',
    rotulo: 'Central da Clínica',
    titulo: 'Seu dia inteiro',
    destaque: 'numa tela só',
    texto: 'Pacientes, financeiro do mês, agenda de hoje e inadimplentes logo ao abrir o sistema, com a distribuição da semana e a ocupação das turmas.',
    pontos: ['Índice de saúde da clínica', 'Tarefas da equipe e aniversariantes do mês', 'Ocupação de cada turma de Pilates'],
    alt: 'Central da Clínica do FisioFlow com pacientes, financeiro, agenda de hoje e distribuição semanal'
  },
  {
    tela: 'evolucao',
    recurso: 'prontuario',
    rotulo: 'Prontuário e evolução',
    titulo: 'Mostre a melhora',
    destaque: 'em um gráfico',
    texto: 'Cada sessão registrada vira um ponto no gráfico de dor, funcionalidade e satisfação. O paciente vê a própria evolução, e você tem os dados para o laudo.',
    pontos: ['Fichas por especialidade: ortopédica, lombar, Pilates e mais', 'Corpo 3D para marcar onde dói', 'Anexos e histórico completo do paciente'],
    alt: 'Gráfico de evolução clínica com dor caindo e funcionalidade subindo ao longo das sessões'
  },
  {
    tela: 'laudo',
    recurso: 'laudoIA',
    rotulo: 'Laudo com IA',
    titulo: 'O laudo,',
    destaque: 'a Flora escreve',
    texto: 'A Flora, assistente de IA do FisioFlow, redige o laudo a partir do prontuário e das evoluções. Você revisa, ajusta e imprime com o logo da clínica.',
    pontos: ['Texto técnico a partir dos dados do paciente', 'Pronto para imprimir ou salvar em PDF', 'Você sempre revisa antes de assinar'],
    alt: 'Laudo fisioterapêutico gerado pela Flora, pronto para imprimir'
  },
  {
    tela: 'pilates',
    recurso: 'turmas',
    rotulo: 'Pilates',
    titulo: 'Turmas, presença',
    destaque: 'e reposição',
    texto: 'Veja as turmas de cada dia, as vagas livres e quem está matriculado. Registrou uma falta? Marque a reposição numa turma com vaga.',
    pontos: ['Ocupação e vagas de cada turma', 'Presença e falta em um toque', 'Reposição só onde tem vaga'],
    alt: 'Grade de turmas de Pilates com alunas matriculadas e vagas disponíveis'
  },
  {
    tela: 'financeiro',
    recurso: 'financeiro',
    rotulo: 'Financeiro',
    titulo: 'Da agenda',
    destaque: 'ao caixa',
    texto: 'Mensalidades, pacotes de sessões e orçamentos aprovados viram cobranças. Recibo em um clique e lembrete de pagamento pelo WhatsApp.',
    pontos: ['Pago, pendente e inadimplente à vista', 'Pacotes de sessões com controle de uso', 'Recibo em PDF para o paciente'],
    alt: 'Lista de pagamentos do FisioFlow com mensalidades pagas e uma cobrança pendente'
  },
  {
    tela: 'contrato-celular',
    celular: true,
    recurso: 'contratos',
    rotulo: 'Contratos',
    titulo: 'Contrato assinado',
    destaque: 'no celular',
    texto: 'Monte o contrato de fisioterapia ou de Pilates com as cláusulas da clínica e envie para o paciente assinar com o dedo, de onde estiver.',
    pontos: ['Cláusulas da sua clínica, prontas para reutilizar', 'Assinatura pelo celular, sem imprimir', 'Comprovante guardado no perfil do paciente'],
    alt: 'Celular mostrando a confirmação de contrato assinado com sucesso'
  },
]

const montarFaqs = (grade) => [
  { q: 'Preciso instalar algum programa?', a: 'Não. O FisioFlow funciona 100% no navegador. Acesse de qualquer computador, tablet ou celular, em qualquer lugar.' },
  { q: 'Meus dados ficam seguros?', a: 'Sim. Seus dados ficam armazenados em servidores seguros com backup automático. Cada clínica acessa apenas seus próprios dados, com isolamento total.' },
  { q: 'Posso cancelar quando quiser?', a: 'Sim, sem multas ou taxas. Cancele quando quiser diretamente pelo sistema, sem burocracia.' },
  { q: 'Funciona para pilates e fisioterapia ao mesmo tempo?', a: 'Sim. O FisioFlow foi construído especificamente para clínicas que atendem fisioterapia e pilates ao mesmo tempo, com módulos dedicados para cada um.' },
  { q: 'Tem período de teste gratuito?', a: `Sim, ${grade.trial.dias} dias grátis sem precisar de cartão de crédito. Você experimenta tudo do plano ${nomeDoPlano(grade, grade.trial.plano)} sem compromisso.` },
  { q: 'Como funciona a configuração assistida do plano Clínica?', a: 'Nossa equipe agenda uma videochamada para configurar o sistema junto com você — importar pacientes, configurar agenda, WhatsApp e tudo mais. Você começa a usar no mesmo dia.' },
]

export default function App() {
  const grade = useGrade()
  const plans = montarPlanos(grade)
  const faqs = montarFaqs(grade)
  const dias = grade.trial.dias
  const [faqAberto, setFaqAberto] = useState(null)
  const [anual, setAnual] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [formLead, setFormLead] = useState({ nome: '', whatsapp: '', email: '' })
  const [errosLead, setErrosLead] = useState({})
  const [enviandoLead, setEnviandoLead] = useState(false)
  const [erroEnvioLead, setErroEnvioLead] = useState('')

  const fecharModal = () => {
    setModalAberto(false)
    setFormLead({ nome: '', whatsapp: '', email: '' })
    setErrosLead({})
    setErroEnvioLead('')
  }

  const irParaCadastro = () => setModalAberto(true)

  const mascaraWhatsapp = (v) => {
    const n = v.replace(/\D/g, '').slice(0, 11)
    if (!n.length) return ''
    if (n.length <= 2) return `(${n}`
    if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`
    return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
  }

  const validarLead = () => {
    const e = {}
    if (!formLead.nome.trim()) e.nome = 'Nome é obrigatório'
    if (formLead.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'WhatsApp inválido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formLead.email)) e.email = 'E-mail inválido'
    return e
  }

  const handleSubmitLead = (ev) => {
    ev.preventDefault()
    const errs = validarLead()
    if (Object.keys(errs).length) { setErrosLead(errs); return }
    setEnviandoLead(true)
    setErroEnvioLead('')
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(APPS_SCRIPT_URL, JSON.stringify(formLead))
      } else {
        fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(formLead) })
      }
    } catch (_) {}
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: 'AW-18077801620/o-O2CIfNn5kcEJS5laxD', value: 1.0, currency: 'BRL' })
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead')
    }
    window.location.href = CADASTRO_URL
  }

  const BotaoPrimario = ({ className = '', texto = 'Criar minha conta grátis' }) => (
    <button onClick={irParaCadastro} className={`bg-[#065f46] hover:bg-[#047857] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${className}`}>
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
        @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <img src="/logo.png" alt="FisioFlow" className="h-9 md:h-14 w-auto object-contain" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Funcionalidades</a>
            <a href="#video" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Vídeo</a>
            <a href="#precos" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Preços</a>
            <a href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">FAQ</a>
            <a href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Blog</a>
            <a href="https://app.usefisioflow.com.br" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Entrar</a>
            <BotaoPrimario className="text-sm px-5 py-2.5" />
          </div>
          <div className="md:hidden flex items-center gap-3">
            <a href="https://app.usefisioflow.com.br" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Entrar</a>
            <BotaoPrimario className="text-sm px-4 py-2 whitespace-nowrap" texto="Teste grátis" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-14 md:pb-24 px-4 md:px-6 bg-gradient-to-b from-[#f0fdf4] via-white to-white overflow-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ecfdf5] border border-[#6ee7b7] rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                <span className="text-[#065f46] text-sm font-semibold">{dias} dias grátis · sem cartão de crédito</span>
              </div>
              <h1 className="serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-5 md:mb-6 text-gray-900">
                Sua clínica no{' '}
                <span className="italic text-[#065f46] whitespace-nowrap">fluxo certo.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-7 md:mb-8 leading-relaxed max-w-xl">
                Agenda que se confirma pelo WhatsApp, prontuário com corpo 3D, turmas de Pilates, financeiro e contratos assinados no celular.
                Tudo num só sistema, feito para fisioterapeutas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <BotaoPrimario className="px-7 py-4 text-base w-full sm:w-auto text-center" texto={`Testar grátis por ${dias} dias`} />
                <a href="#video" className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#6ee7b7] bg-white text-gray-700 font-semibold px-6 py-4 rounded-xl text-base transition-colors">
                  <span className="w-7 h-7 rounded-full bg-[#065f46] text-white flex items-center justify-center" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  Ver em 45 segundos
                </a>
              </div>
              <p className="text-sm text-gray-500">
                Planos a partir de <strong className="text-gray-900">{formatarReais(menorPreco(grade))}/mês</strong>. Cancele quando quiser.
              </p>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-[#d1fae5] to-[#ecfdf5] rounded-[2rem] rotate-1" aria-hidden="true" />
                <div className="relative mr-6 sm:mr-12 lg:mr-10">
                  <TelaNavegador nome="central" prioridade alt="Central da Clínica do FisioFlow com pacientes, financeiro do mês, agenda de hoje e ocupação das turmas" />
                </div>
                <div className="absolute -bottom-6 right-0 w-[30%] max-w-[180px] rounded-[1.6rem] bg-gray-900 p-[5px] rotate-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                  <img
                    src="/telas/whatsapp-celular.webp"
                    alt="Celular do paciente confirmando a sessão pelo WhatsApp"
                    fetchpriority="high"
                    className="block w-full h-auto rounded-[1.3rem]"
                  />
                </div>
              </div>
              <LegendaFicticia className="mt-12 text-center lg:text-right" />
            </div>
          </div>
        </div>
      </section>

      {/* Faixa de benefícios */}
      <section className="bg-[#065f46] py-7 md:py-9 px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 text-center">
          {[
            { valor: 'Tudo em um', label: 'Agenda, prontuário, Pilates, financeiro e WhatsApp' },
            { valor: `${dias} dias`, label: 'Grátis para testar, sem cartão' },
            { valor: formatarReais(menorPreco(grade)), label: 'Por mês no plano Solo' },
          ].map((s, i) => (
            <div key={i} className={i < 2 ? 'sm:border-0 border-b border-[#047857] pb-5 sm:pb-0' : ''}>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{s.valor}</p>
              <p className="text-[#6ee7b7] text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Antes e depois */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">Sua rotina</p>
            <h2 className="serif text-3xl md:text-5xl text-gray-900 mb-4">Menos retrabalho, <span className="italic text-[#065f46]">mais atendimento</span></h2>
            <p className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto">O que hoje toma o seu fim de tarde, o FisioFlow faz por você.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ANTES_DEPOIS.map((c, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Antes</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{c.antes}</p>
                <div className="mt-auto rounded-xl bg-white border border-[#a7f3d0] p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#065f46] mb-2">Com o FisioFlow</p>
                  <p className="text-gray-800 text-sm leading-relaxed font-medium">{c.depois}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour pelas telas reais */}
      <section id="funcionalidades" className="py-12 md:py-20 px-4 md:px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">Por dentro do FisioFlow</p>
            <h2 className="serif text-3xl md:text-5xl text-gray-900 mb-4">A clínica inteira <span className="italic text-[#065f46]">num lugar só</span></h2>
            <p className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto">Estas são as telas do sistema, do jeito que você vai usar.</p>
          </div>
          <div className="space-y-20 md:space-y-28">
            {TOUR.map((item, i) => (
              <LinhaRecurso key={item.tela} item={item} invertido={i % 2 === 1} selo={seloDoRecurso(grade, item.recurso)} />
            ))}
          </div>
          <div className="text-center mt-16 md:mt-24">
            <BotaoPrimario className="px-8 py-4 text-base w-full sm:w-auto" texto={`Quero testar por ${dias} dias`} />
            <p className="text-gray-400 text-sm mt-3">Sem cartão de crédito · Cancele quando quiser</p>
          </div>
        </div>
      </section>

      {/* Showreel */}
      <section id="video" className="py-12 md:py-20 px-4 md:px-6 bg-[#04251a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[#6ee7b7] font-semibold text-sm uppercase tracking-widest mb-3">Em 45 segundos</p>
            <h2 className="serif text-3xl md:text-5xl text-white mb-4">Veja o FisioFlow <span className="italic text-[#6ee7b7]">funcionando</span></h2>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">Da confirmação no WhatsApp ao contrato assinado no celular, passando pelo prontuário, pelo Pilates e pelo financeiro.</p>
          </div>
          <video
            src="/fisioflow-showreel.mp4"
            poster="/telas/showreel-capa.jpg"
            controls
            preload="none"
            playsInline
            className="w-full rounded-2xl shadow-2xl border border-white/10 bg-black aspect-video"
          />
          <p className="text-[11px] text-white/40 mt-4 text-center">Imagens ilustrativas · os dados exibidos são fictícios</p>
        </div>
      </section>

      {/* E tem mais */}
      <section id="mais" className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">E tem mais</p>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">Tudo que sua clínica precisa</h2>
            <p className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto">Construído com fisioterapeutas, para fisioterapeutas. Cada detalhe pensado na sua rotina.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-[#6ee7b7] hover:shadow-md transition-all duration-200 group">
                <div className="w-10 h-10 bg-[#ecfdf5] rounded-xl flex items-center justify-center text-[#065f46] mb-4 group-hover:bg-[#065f46] group-hover:text-white transition-colors duration-200">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          {/* IA destaque */}
          <div className="bg-[#065f46] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6">
            <div className="flex items-start md:items-center gap-4 md:gap-5">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1">Flora — Assistente de IA Integrada</h3>
                <p className="text-[#6ee7b7] text-sm max-w-lg">Pergunte sobre sua clínica, pacientes, agenda ou financeiro. A Flora responde com base nos seus dados reais e acelera sua rotina clínica.</p>
              </div>
            </div>
            <button onClick={irParaCadastro} className="w-full md:w-auto shrink-0 bg-white text-[#065f46] font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
              Conhecer a Flora
            </button>
          </div>
        </div>
      </section>

      {/* Corpo 3D */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Vídeo */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] rounded-3xl" />
              <div className="relative p-4 md:p-6">
                <video
                  src="/body3d.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-2xl shadow-xl"
                  style={{ maxHeight: 420, objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Texto */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-[#ecfdf5] border border-[#6ee7b7] rounded-full px-4 py-2 mb-6">
                <span className="text-[#065f46] text-sm font-semibold">Exclusivo FisioFlow</span>
              </div>
              <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight">
                Mostre exatamente{' '}
                <span className="italic text-[#065f46]">onde dói</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Chega de anotar "dor no joelho" num campo de texto. O FisioFlow tem um corpo humano 3D interativo no prontuário — o fisioterapeuta gira o modelo, clica na região exata e define a intensidade da dor com um slider.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { titulo: 'Modelo feminino e masculino', desc: 'Carregado automaticamente pelo sexo cadastrado do paciente.' },
                  { titulo: 'Múltiplas regiões', desc: 'Marque quantas regiões quiser, cada uma com sua intensidade de dor.' },
                  { titulo: 'Integrado ao prontuário', desc: 'As regiões marcadas ficam salvas diretamente na ficha clínica.' },
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
              <p className="text-xs text-gray-400 italic">Nenhum outro sistema de fisioterapia no Brasil tem esse recurso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FisioFlow Club */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ecfdf5] border border-[#6ee7b7] rounded-full px-4 py-2 mb-6">
                <span className="text-[#065f46] text-sm font-semibold">Exclusivo para assinantes</span>
              </div>
              <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight">
                FisioFlow <span className="italic text-[#065f46]">Club</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Assinar o FisioFlow vai além do sistema. No Club você tem acesso a descontos exclusivos em fornecedores, equipamentos, cursos e eventos do setor — benefícios pensados para quem vive a fisioterapia todos os dias.
              </p>
              <div className="space-y-4 mb-6 md:mb-8">
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
              <button onClick={irParaCadastro} className="w-full sm:w-auto bg-[#065f46] hover:bg-[#047857] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5">
                Experimentar grátis por {dias} dias
              </button>
            </div>
            <div className="relative mt-2 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] rounded-3xl" />
              <div className="relative p-6 md:p-8">
                <p className="text-[#065f46] font-bold text-sm uppercase tracking-widest mb-4 md:mb-6">Parceiros do Club</p>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { categoria: 'Equipamentos', desconto: 'até 20% off', borda: '#6ee7b7' },
                    { categoria: 'Cursos online', desconto: 'até 30% off', borda: '#93c5fd' },
                    { categoria: 'Congressos', desconto: 'acesso VIP', borda: '#fcd34d' },
                    { categoria: 'Softwares', desconto: 'planos especiais', borda: '#d8b4fe' },
                    { categoria: 'Materiais', desconto: 'até 15% off', borda: '#6ee7b7' },
                    { categoria: 'Eventos', desconto: 'desconto exclusivo', borda: '#fca5a5' },
                  ].map((p, i) => (
                    <div key={i} className="bg-white rounded-2xl p-3 md:p-4 border shadow-sm" style={{ borderColor: p.borda }}>
                      <p className="text-xs font-semibold text-gray-500 mb-1">{p.categoria}</p>
                      <p className="text-sm font-bold text-gray-900">{p.desconto}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 md:mt-6 bg-[#065f46] rounded-2xl p-4 text-center">
                  <p className="text-[#6ee7b7] text-xs font-semibold uppercase tracking-widest mb-1">Novos parceiros todo mês</p>
                  <p className="text-white text-sm">Incluído em todos os planos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">Depoimentos</p>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">Quem usa, aprova</h2>
            <p className="text-gray-500 text-base md:text-xl">Fisioterapeutas que transformaram sua gestão com o FisioFlow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { nome: 'Pietra Triches', cargo: 'Fisioterapeuta — Clínica Movment', texto: 'Finalmente um sistema que entende a realidade da minha clínica. Antes eu usava papel e WhatsApp para tudo. Agora tenho tudo organizado em um só lugar.' },
              { nome: 'Ana Carolina', cargo: 'Fisioterapeuta e instrutora de Pilates', texto: 'A parte de pilates é incrível. Consigo controlar as turmas, as presenças e as reposições de forma muito simples. Minha equipe adorou.' },
              { nome: 'Mariana Souza', cargo: 'Fisioterapeuta — Atendimento domiciliar', texto: 'O prontuário eletrônico é completo e fácil de usar. Economizo pelo menos 20 minutos por dia que antes gastava preenchendo fichas em papel.' },
            ].map((d, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">"{d.texto}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#065f46] flex items-center justify-center text-white text-sm font-bold">{d.nome.charAt(0)}</div>
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

      {/* Mobile */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ecfdf5] border border-[#6ee7b7] rounded-full px-4 py-2 mb-6">
                <span className="text-[#065f46] text-sm font-semibold">Acesse de qualquer lugar</span>
              </div>
              <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight">
                Na palma da{' '}
                <span className="italic text-[#065f46]">sua mão</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto">
                O FisioFlow funciona 100% no navegador, sem instalação. Acesse pelo celular entre atendimentos, pelo tablet na recepção ou pelo computador no consultório.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
                      </svg>
                    ),
                    titulo: 'Celular',
                    desc: 'Consulte a agenda, registre evoluções e veja pagamentos entre um atendimento e outro.',
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    ),
                    titulo: 'Tablet',
                    desc: 'Interface adaptada para a tela da recepção ou para uso durante a sessão com o paciente.',
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
                      </svg>
                    ),
                    titulo: 'Computador',
                    desc: 'Experiência completa no desktop, sem instalar nada — basta abrir o navegador.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-[#ecfdf5] rounded-xl flex items-center justify-center text-[#065f46] shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-0.5">{item.titulo}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="py-10 md:py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">Planos</p>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">Simples e transparente</h2>
            <p className="text-gray-500 text-base md:text-xl mb-6 md:mb-8">Sem taxas escondidas. Cancele quando quiser.</p>
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-1.5">
              <button onClick={() => setAnual(false)} className={`px-4 md:px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!anual ? 'bg-[#065f46] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>Mensal</button>
              <button onClick={() => setAnual(true)} className={`px-4 md:px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${anual ? 'bg-[#065f46] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>
                Anual
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${anual ? 'bg-white/20 text-white' : 'bg-[#ecfdf5] text-[#065f46]'}`}>2 meses grátis</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-6 md:p-8 border-2 relative flex flex-col ${p.destaque ? 'bg-[#065f46] border-[#065f46]' : 'bg-white border-gray-100'}`}>
                {p.destaque && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#22c55e] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">MAIS POPULAR</span>
                  </div>
                )}
                <div className="mb-5 md:mb-6">
                  <h3 className={`text-xl font-bold mb-1 ${p.destaque ? 'text-white' : 'text-gray-900'}`}>{p.name}</h3>
                  <p className={`text-sm ${p.destaque ? 'text-[#6ee7b7]' : 'text-gray-400'}`}>{p.desc}</p>
                </div>
                <div className="mb-5 md:mb-6">
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-bold ${p.destaque ? 'text-white' : 'text-gray-900'}`}>R${anual ? p.preco_anual : p.preco_mensal}</span>
                    <span className={`text-sm mb-1.5 ${p.destaque ? 'text-[#6ee7b7]' : 'text-gray-400'}`}>/mês</span>
                  </div>
                  {anual
                    ? <p className={`text-xs mt-1 ${p.destaque ? 'text-[#6ee7b7]' : 'text-[#065f46]'}`}>Cobrado anualmente · R${p.preco_anual * 12}/ano</p>
                    : <p className={`text-xs mt-1 ${p.destaque ? 'text-white/50' : 'text-gray-400'}`}>ou R${p.preco_anual}/mês no plano anual</p>
                  }
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-start gap-2.5 text-sm ${p.destaque ? 'text-white/90' : 'text-gray-600'}`}>
                      <span className={`mt-0.5 shrink-0 ${p.destaque ? 'text-[#6ee7b7]' : 'text-[#065f46]'}`}>✓</span>
                      <span>
                        {f.texto}
                        {f.novo && <span className={`ml-1.5 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${p.destaque ? 'bg-white/20 text-white' : 'bg-[#d1fae5] text-[#065f46]'}`}>Novo</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                <button onClick={irParaCadastro} className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${p.destaque ? 'bg-white text-[#065f46] hover:bg-gray-50' : 'bg-[#065f46] text-white hover:bg-[#047857]'}`}>
                  {p.cta} — {dias} dias grátis
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6 md:mt-8">Todos os planos começam com {dias} dias de teste grátis, com tudo do plano {nomeDoPlano(grade, grade.trial.plano)}. Sem cartão de crédito.</p>
        </div>
      </section>

      {/* CTA intermediário */}
      <section className="py-10 md:py-14 px-4 md:px-6 bg-[#065f46]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Pronta para organizar{' '}
            <span className="italic">sua clínica de vez?</span>
          </h2>
          <p className="text-[#6ee7b7] text-base md:text-lg mb-6 md:mb-8">{dias} dias grátis, sem cartão, sem compromisso.</p>
          <button onClick={irParaCadastro} className="w-full sm:w-auto bg-white text-[#065f46] font-bold px-8 md:px-10 py-4 rounded-xl text-lg hover:bg-gray-50 transition-colors">
            Quero organizar minha clínica
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-10 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">Perguntas frequentes</h2>
            <p className="text-gray-500 text-base md:text-xl">Tudo que você precisa saber antes de começar.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
                <button onClick={() => setFaqAberto(faqAberto === i ? null : i)} className="w-full flex justify-between items-center px-5 md:px-6 py-4 md:py-5 text-left hover:bg-gray-100 transition-colors gap-4">
                  <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
                  <span className={`text-[#065f46] text-xl font-light transition-transform duration-200 shrink-0 ${faqAberto === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {faqAberto === i && (
                  <div className="px-5 md:px-6 pb-4 md:pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 md:py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#065f46] font-semibold text-sm uppercase tracking-widest mb-4">Comece hoje</p>
          <h2 className="serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-5 md:mb-6 leading-tight">
            Sua clínica merece uma{' '}
            <span className="italic text-[#065f46]">gestão à altura</span>
          </h2>
          <p className="text-gray-500 text-base md:text-xl mb-8 md:mb-10">Junte-se às fisioterapeutas que já organizam sua clínica com o FisioFlow.</p>
          <button onClick={irParaCadastro} className="w-full sm:w-auto bg-[#065f46] hover:bg-[#047857] text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-xl text-lg md:text-xl transition-all hover:shadow-xl hover:-translate-y-0.5">
            Começar meus {dias} dias grátis
          </button>
          <p className="text-gray-400 text-sm mt-4">{dias} dias grátis · Sem cartão · Cancele quando quiser</p>
        </div>
      </section>

      {/* Modal de captura de lead */}
      {modalAberto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={(e) => { if (e.target === e.currentTarget) fecharModal() }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={fecharModal} />
          <div
            className="relative bg-white rounded-2xl w-full max-w-md p-8"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'modalFadeIn 0.22s ease' }}
          >
            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-[#ecfdf5] rounded-xl p-4 mb-6">
              <h2 className="serif text-2xl text-gray-900 mb-1">Ótima escolha! Antes de continuar…</h2>
              <p className="text-[#065f46] text-sm font-medium">Preencha rapidinho e garanta descontos exclusivos</p>
            </div>
            <form onSubmit={handleSubmitLead} noValidate className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome completo</label>
                <input
                  type="text"
                  value={formLead.nome}
                  onChange={(e) => { setFormLead(p => ({ ...p, nome: e.target.value })); setErrosLead(p => ({ ...p, nome: '' })) }}
                  placeholder="Seu nome completo"
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${errosLead.nome ? 'border-red-400' : 'border-gray-200 focus:border-[#065f46]'}`}
                />
                {errosLead.nome && <p className="text-red-500 text-xs mt-1">{errosLead.nome}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
                <input
                  type="tel"
                  value={formLead.whatsapp}
                  onChange={(e) => { setFormLead(p => ({ ...p, whatsapp: mascaraWhatsapp(e.target.value) })); setErrosLead(p => ({ ...p, whatsapp: '' })) }}
                  placeholder="(00) 00000-0000"
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${errosLead.whatsapp ? 'border-red-400' : 'border-gray-200 focus:border-[#065f46]'}`}
                />
                {errosLead.whatsapp && <p className="text-red-500 text-xs mt-1">{errosLead.whatsapp}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  value={formLead.email}
                  onChange={(e) => { setFormLead(p => ({ ...p, email: e.target.value })); setErrosLead(p => ({ ...p, email: '' })) }}
                  placeholder="seu@email.com"
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${errosLead.email ? 'border-red-400' : 'border-gray-200 focus:border-[#065f46]'}`}
                />
                {errosLead.email && <p className="text-red-500 text-xs mt-1">{errosLead.email}</p>}
              </div>
              {erroEnvioLead && <p className="text-red-500 text-sm text-center">{erroEnvioLead}</p>}
              <button
                type="submit"
                disabled={enviandoLead}
                className="w-full bg-[#065f46] hover:bg-[#047857] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors text-sm"
              >
                {enviandoLead ? 'Enviando…' : 'Continuar para o cadastro →'}
              </button>
              <p className="text-center text-gray-400 text-xs">Não precisa de cartão de crédito</p>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 md:py-12 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <img src="/logo.png" alt="FisioFlow" className="h-8 w-auto object-contain" />
          <p className="text-gray-400 text-sm">© 2026 FisioFlow. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/termos" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Termos de uso</a>
            <a href="/privacidade" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Privacidade</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto text-center mt-6 pt-6 border-t border-gray-50">
          <p className="text-gray-400 text-xs">FisioFlow é um produto da M3 Branding LTDA — CNPJ 58.740.015/0001-76</p>
        </div>
      </footer>
    </div>
  )
}