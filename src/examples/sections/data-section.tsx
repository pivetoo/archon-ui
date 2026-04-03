import * as React from "react"
import { Database, Eye, Filter, Search } from "lucide-react"
import {
  Badge,
  Button,
  Card,
  CardContent,
  DataTable,
  DataTablePreview,
  PageLayout,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "../../components/ui"
import type { DataTableColumn, DataTablePreviewColumn } from "../../components/ui"
import type { ContractRow, PersonRow } from "../mock-data"
import { contractRows, personRows } from "../mock-data"

const personColumns: DataTableColumn<PersonRow>[] = [
  { key: "nome", title: "Nome", dataIndex: "nome" },
  { key: "email", title: "E-mail", dataIndex: "email" },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    render: (value) => {
      const status = String(value)
      const variant = status === "Ativo" ? "success" : status === "Pendente" ? "warning" : "destructive"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  { key: "perfil", title: "Perfil", dataIndex: "perfil" },
]

const contractColumns: DataTablePreviewColumn<ContractRow>[] = [
  { key: "cliente", title: "Cliente", dataIndex: "cliente" },
  { key: "plano", title: "Plano", dataIndex: "plano" },
  {
    key: "valor",
    title: "Valor",
    render: (_value, record) => `R$ ${record.valorMensal.toLocaleString("pt-BR")}`,
  },
]

export function DataSection() {
  const [selectedRows, setSelectedRows] = React.useState<PersonRow[]>([])
  const [selectedContract, setSelectedContract] = React.useState<ContractRow | null>(contractRows[0])

  return (
    <div className="space-y-4">
      <PageLayout
        title="Gestão de usuários"
        subtitle="Exemplo com cabeçalho contextual, ações rápidas e tabela de leitura mais refinada"
        icon={<Database className="h-5 w-5" />}
        filtersSlot={
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" icon={<Search className="h-4 w-4" />}>
                Buscar por usuário
              </Button>
              <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
                Filtrar status
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Última atualização há 2 minutos
            </div>
          </div>
        }
        onAdd={() => toast({ title: "Ação", description: "Incluir acionado", variant: "info" })}
        onEdit={() => toast({ title: "Ação", description: "Editar acionado", variant: "info" })}
        onDelete={() => toast({ title: "Ação", description: "Excluir acionado", variant: "warning" })}
        selectedRowsCount={selectedRows.length}
      >
        <DataTable
          columns={personColumns}
          data={personRows}
          rowKey="id"
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          pageSize={5}
        />
      </PageLayout>

      <Card>
        <CardContent className="p-4">
          <DataTablePreview
            columns={contractColumns}
            data={contractRows}
            rowKey="id"
            selectedRow={selectedContract}
            onRowSelect={setSelectedContract}
            renderDetail={(record) => (
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-semibold">Detalhe do contrato</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Cliente:</strong> {record.cliente}</p>
                  <p><strong>Plano:</strong> {record.plano}</p>
                  <p><strong>Situação:</strong> {record.situacao}</p>
                  <p><strong>Valor:</strong> R$ {record.valorMensal.toLocaleString("pt-BR")}</p>
                </div>
                <Button variant="outline" size="sm" icon={<Eye className="h-4 w-4" />}>
                  Ver histórico
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sistema</TableHead>
                <TableHead>Ambiente</TableHead>
                <TableHead>Versão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>FinanceChannel</TableCell>
                <TableCell>Produção</TableCell>
                <TableCell>v2.4.1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>MarketChannel</TableCell>
                <TableCell>Homologação</TableCell>
                <TableCell>v1.18.0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
