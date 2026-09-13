import { FileText, Plus, SearchX } from 'lucide-react'
import { Button, EmptyState } from 'archon-ui'

export function ComAcao() {
  return (
    <div className="rounded-md border bg-card" style={{ width: 520 }}>
      <EmptyState
        icon={<FileText className="h-5 w-5" />}
        title="Nenhum contrato cadastrado"
        description="Cadastre o primeiro contrato para começar a emitir cobranças."
        action={<Button icon={<Plus />}>Novo contrato</Button>}
      />
    </div>
  )
}

export function SemResultado() {
  return (
    <div className="rounded-md border bg-card" style={{ width: 520 }}>
      <EmptyState
        icon={<SearchX className="h-5 w-5" />}
        title="Nenhum resultado para a busca"
        description="Revise os filtros aplicados ou busque por outro termo."
      />
    </div>
  )
}
