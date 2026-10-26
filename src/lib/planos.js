import { useEffect, useState } from 'react'
import gradeReserva from './gradeReserva.json'

// Planos, preços e dias de teste vêm do backend (GET /planos), a mesma grade que o app
// usa para cobrar e liberar recursos — mudou lá, muda aqui.
// gradeReserva.json é uma cópia usada até a API responder (ou se ela falhar), para a
// página nunca ficar sem preço. Para atualizar a cópia, no repositório do backend:
//   node -e "console.log(JSON.stringify(require('./src/lib/planos').gradePublica(), null, 2))"
const API_URL = import.meta.env.VITE_API_URL || 'https://fisioflow-production-5e0b.up.railway.app'

let promessa = null

function carregarGrade() {
  if (!promessa) {
    promessa = fetch(`${API_URL}/planos`)
      .then(r => { if (!r.ok) throw new Error(`GET /planos ${r.status}`); return r.json() })
      .catch(e => { promessa = null; throw e })
  }
  return promessa
}

export function useGrade() {
  const [grade, setGrade] = useState(gradeReserva)
  useEffect(() => {
    let ativo = true
    carregarGrade().then(g => { if (ativo) setGrade(g) }).catch(() => {})
    return () => { ativo = false }
  }, [])
  return grade
}

// Recursos que acabaram de entrar no plano — viram selo "Novo" no card
const NOVIDADES = { solo: ['turmas', 'confirmacaoAutomatica'] }
const PLANO_DESTAQUE = 'equipe'
// O Club é benefício de todos os planos, fora da grade de recursos
const EXTRAS = { solo: ['FisioFlow Club'] }

function textoLimites(limites) {
  const prof = limites.limiteProfissionais
  const pac = limites.limitePacientes
  return [
    prof == null ? 'Profissionais ilimitados' : prof === 1 ? '1 profissional' : `Até ${prof} profissionais`,
    pac == null ? 'pacientes ilimitados' : `até ${pac} pacientes ativos`
  ].join(' · ')
}

// Cards da seção de preços, montados da grade
export function montarPlanos(grade) {
  return grade.planos.map((p, i) => {
    const anterior = grade.planos[i - 1]
    const novos = NOVIDADES[p.id] || []
    return {
      id: p.id,
      name: p.nome,
      desc: p.descricao,
      preco_mensal: p.precos.mensal,
      preco_anual: p.precos.anualMensal,
      destaque: p.id === PLANO_DESTAQUE,
      cta: i === 0 ? `Começar com o ${p.nome}` : `Escolher o ${p.nome}`,
      features: [
        { texto: textoLimites(p.limites) },
        ...(anterior ? [{ texto: `Tudo do plano ${anterior.nome}` }] : []),
        ...grade.recursos.filter(r => r.planoMinimo === p.id).map(r => ({ texto: r.nome, novo: novos.includes(r.chave) })),
        ...(EXTRAS[p.id] || []).map(texto => ({ texto }))
      ]
    }
  })
}

export const nomeDoPlano = (grade, id) => grade.planos.find(p => p.id === id)?.nome || id
