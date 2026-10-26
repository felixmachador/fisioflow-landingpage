// Telas reais do FisioFlow (capturas do app com dados fictícios, feitas no projeto
// fisioflow-video) em molduras de navegador e celular.

export function LegendaFicticia({ className = '' }) {
  return <p className={`text-[11px] text-gray-400 ${className}`}>Telas reais do FisioFlow · dados fictícios</p>
}

// nome = arquivo em /public/telas sem extensão; existe também a versão -800 para telas pequenas
export function TelaNavegador({ nome, alt, prioridade = false }) {
  return (
    <div className="rounded-xl md:rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-[0_24px_60px_-20px_rgba(6,95,70,0.35)]">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]" />
        </span>
        <span className="flex-1 mx-2 md:mx-6 text-center text-[10px] md:text-xs text-gray-400 bg-white border border-gray-200 rounded-md py-0.5 truncate">
          app.usefisioflow.com.br
        </span>
      </div>
      <img
        src={`/telas/${nome}.webp`}
        srcSet={`/telas/${nome}-800.webp 800w, /telas/${nome}.webp 1600w`}
        sizes="(min-width: 1024px) 640px, 100vw"
        alt={alt}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding="async"
        className="block w-full h-auto"
      />
    </div>
  )
}

export function Celular({ nome, alt }) {
  return (
    <div className="mx-auto w-[220px] md:w-[250px] rounded-[2.6rem] bg-gray-900 p-[7px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)]">
      <div className="relative rounded-[2.2rem] overflow-hidden bg-white">
        <span className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10" aria-hidden="true" />
        <img src={`/telas/${nome}.webp`} alt={alt} loading="lazy" decoding="async" className="block w-full h-auto" />
      </div>
    </div>
  )
}

const iconeCheck = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
)

// Uma linha do tour: texto de um lado, tela do outro (alterna o lado a cada linha)
export function LinhaRecurso({ item, invertido, selo }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-center">
      <div className={invertido ? 'lg:order-2' : ''}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[#065f46] font-semibold text-xs uppercase tracking-widest">{item.rotulo}</span>
          {selo && (
            <span className="text-[11px] font-semibold text-[#065f46] bg-[#ecfdf5] border border-[#a7f3d0] rounded-full px-2.5 py-0.5">{selo}</span>
          )}
        </div>
        <h3 className="serif text-2xl md:text-4xl text-gray-900 mb-4 leading-tight">
          {item.titulo} <span className="italic text-[#065f46]">{item.destaque}</span>
        </h3>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6">{item.texto}</p>
        <ul className="space-y-3">
          {item.pontos.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-[15px] text-gray-700">
              <span className="mt-0.5 w-6 h-6 shrink-0 rounded-lg bg-[#ecfdf5] text-[#065f46] flex items-center justify-center">{iconeCheck}</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className={invertido ? 'lg:order-1' : ''}>
        <div className="relative">
          <div className="absolute -inset-3 md:-inset-5 bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] rounded-3xl -z-0" aria-hidden="true" />
          <div className="relative">
            {item.celular
              ? <div className="py-4"><Celular nome={item.tela} alt={item.alt} /></div>
              : <TelaNavegador nome={item.tela} alt={item.alt} />}
          </div>
        </div>
        <LegendaFicticia className="mt-8 text-center lg:text-right" />
      </div>
    </div>
  )
}
