import * as React from 'react'
import { FilterPanel } from 'archon-ui'

const opcoesSituacao = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'implantacao', label: 'Em implantação' },
  { value: 'bloqueado', label: 'Bloqueado' },
]

const opcoesPlano = [
  { value: 'starter', label: 'Starter' },
  { value: 'professional', label: 'Professional' },
  { value: 'enterprise', label: 'Enterprise' },
]

export function PainelAberto() {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    ref.current?.querySelector('button')?.click()
  }, [])
  return (
    <div ref={ref} className="p-4">
      <FilterPanel
        sections={[
          { key: 'situacao', label: 'Situação', value: 'ativo', options: opcoesSituacao, onChange: () => undefined },
          { key: 'plano', label: 'Plano', value: 'enterprise', options: opcoesPlano, onChange: () => undefined },
        ]}
        onClearAll={() => undefined}
      />
    </div>
  )
}

export function SemFiltro() {
  return (
    <FilterPanel
      sections={[
        { key: 'situacao', label: 'Situação', value: '', options: opcoesSituacao, onChange: () => undefined },
        { key: 'plano', label: 'Plano', value: '', options: opcoesPlano, onChange: () => undefined },
      ]}
      onClearAll={() => undefined}
    />
  )
}
