import * as React from 'react'
import { Badge, DataTable, type DataTableColumn } from 'archon-ui'

type Contrato = { id: number; cliente: string; plano: string; valorMensal: number; situacao: 'Ativo' | 'Em implantação' | 'Bloqueado' }

const contratos: Contrato[] = [
  { id: 101, cliente: 'Mercado Horizonte', plano: 'Enterprise', valorMensal: 3290, situacao: 'Ativo' },
  { id: 102, cliente: 'Logística Vale', plano: 'Professional', valorMensal: 1490, situacao: 'Em implantação' },
  { id: 103, cliente: 'Clínica Aurora', plano: 'Starter', valorMensal: 690, situacao: 'Bloqueado' },
  { id: 104, cliente: 'Transportes Nobre', plano: 'Professional', valorMensal: 1490, situacao: 'Ativo' },
  { id: 105, cliente: 'Padaria Estrela', plano: 'Starter', valorMensal: 690, situacao: 'Ativo' },
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

export function Listagem() {
  return <DataTable columns={colunas} data={contratos} rowKey="id" pageSize={10} />
}

export function ComSelecao() {
  const [selecionados, setSelecionados] = React.useState<Contrato[]>([contratos[1]])
  return <DataTable columns={colunas} data={contratos} rowKey="id" selectable selectedRows={selecionados} onSelectionChange={setSelecionados} pageSize={10} />
}

export function Carregando() {
  return <DataTable columns={colunas} data={[]} rowKey="id" loading />
}

export function Vazia() {
  return <DataTable columns={colunas} data={[]} rowKey="id" emptyText="Nenhum contrato encontrado." />
}
