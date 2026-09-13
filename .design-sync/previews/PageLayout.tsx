import * as React from 'react'
import { Download } from 'lucide-react'
import { Badge, DataTable, FilterPanel, PageLayout, TableToolbar, type DataTableColumn } from 'archon-ui'

type Contrato = { id: number; cliente: string; plano: string; valorMensal: number; situacao: 'Ativo' | 'Em implantação' | 'Bloqueado' }

const contratos: Contrato[] = [
  { id: 101, cliente: 'Mercado Horizonte', plano: 'Enterprise', valorMensal: 3290, situacao: 'Ativo' },
  { id: 102, cliente: 'Logística Vale', plano: 'Professional', valorMensal: 1490, situacao: 'Em implantação' },
  { id: 103, cliente: 'Clínica Aurora', plano: 'Starter', valorMensal: 690, situacao: 'Bloqueado' },
  { id: 104, cliente: 'Transportes Nobre', plano: 'Professional', valorMensal: 1490, situacao: 'Ativo' },
]

const variante: Record<Contrato['situacao'], 'success' | 'warning' | 'destructive'> = {
  'Ativo': 'success',
  'Em implantação': 'warning',
  'Bloqueado': 'destructive',
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const colunas: DataTableColumn<Contrato>[] = [
  { key: 'cliente', title: 'Cliente', dataIndex: 'cliente', primary: true },
  { key: 'plano', title: 'Plano', dataIndex: 'plano' },
  { key: 'valorMensal', title: 'Valor mensal', dataIndex: 'valorMensal', render: (v) => brl.format(Number(v)) },
  { key: 'situacao', title: 'Situação', dataIndex: 'situacao', cardTag: true, render: (_v, r) => <Badge variant={variante[r.situacao]}>{r.situacao}</Badge> },
]

const filtros = [
  {
    key: 'situacao',
    label: 'Situação',
    value: '',
    onChange: () => undefined,
    options: [
      { value: 'ativo', label: 'Ativo' },
      { value: 'implantacao', label: 'Em implantação' },
      { value: 'bloqueado', label: 'Bloqueado' },
    ],
  },
]

export function Listagem() {
  const [selecionados, setSelecionados] = React.useState<Contrato[]>([])
  const [busca, setBusca] = React.useState('')
  return (
    <PageLayout
      title="Contratos"
      subtitle="Planos ativos, em implantação e bloqueados"
      onAdd={() => undefined}
      onEdit={() => undefined}
      onDelete={() => undefined}
      onRefresh={() => undefined}
      selectedRowsCount={selecionados.length}
      actions={[{ key: 'exportar', label: 'Exportar', icon: <Download className="h-4 w-4" />, variant: 'outline-primary', onClick: () => undefined }]}
    >
      <TableToolbar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar por cliente ou plano"
        rightSlot={<FilterPanel sections={filtros} onClearAll={() => undefined} />}
        className="mb-3"
      />
      <DataTable columns={colunas} data={contratos} rowKey="id" selectable selectedRows={selecionados} onSelectionChange={setSelecionados} pageSize={10} />
    </PageLayout>
  )
}

export function Compacta() {
  return (
    <PageLayout title="Bancos" subtitle="Contas usadas na conciliação" density="compact" onAdd={() => undefined} onRefresh={() => undefined}>
      <DataTable
        columns={[
          { key: 'nome', title: 'Banco', dataIndex: 'nome' },
          { key: 'agencia', title: 'Agência', dataIndex: 'agencia' },
          { key: 'conta', title: 'Conta', dataIndex: 'conta' },
        ]}
        data={[
          { id: 1, nome: 'Banco do Brasil', agencia: '1234-5', conta: '98765-0' },
          { id: 2, nome: 'Itaú', agencia: '0456', conta: '12345-6' },
        ]}
        rowKey="id"
        pageSize={10}
      />
    </PageLayout>
  )
}
