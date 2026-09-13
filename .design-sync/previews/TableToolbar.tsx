import * as React from 'react'
import { Download } from 'lucide-react'
import { Button, FilterPanel, TableToolbar } from 'archon-ui'

const filtros = [
  {
    key: 'situacao',
    label: 'Situação',
    value: 'ativo',
    onChange: () => undefined,
    options: [
      { value: 'ativo', label: 'Ativo' },
      { value: 'bloqueado', label: 'Bloqueado' },
    ],
  },
]

export function BuscaEFiltros() {
  const [busca, setBusca] = React.useState('')
  return (
    <div style={{ width: 760 }}>
      <TableToolbar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar contrato"
        summary="4 contratos"
        rightSlot={
          <div className="flex items-center gap-2">
            <FilterPanel sections={filtros} onClearAll={() => undefined} />
            <Button variant="outline" size="sm" icon={<Download />}>Exportar</Button>
          </div>
        }
      />
    </div>
  )
}
