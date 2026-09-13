import * as React from 'react'
import { BarChart3, Briefcase, Building2, Download, FileSignature, Landmark, LayoutDashboard, Settings, Users, Wallet } from 'lucide-react'
import {
  AppLayout,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DataTable,
  FilterPanel,
  FormField,
  Input,
  PageLayout,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  TableToolbar,
  Textarea,
  type DataTableColumn,
  type ModuleNavConfig,
  type NotificationItem,
} from 'archon-ui'

const moduleNav: ModuleNavConfig = [
  {
    key: 'comercial',
    label: 'Comercial',
    icon: <Briefcase className="h-4 w-4" />,
    group: 'op',
    routes: [
      { key: 'contratos', label: 'Contratos', path: '/', icon: <FileSignature className="h-4 w-4" /> },
      { key: 'clientes', label: 'Clientes', path: '/comercial/clientes', icon: <Building2 className="h-4 w-4" /> },
      { key: 'indicadores', label: 'Indicadores', path: '/comercial/indicadores', icon: <BarChart3 className="h-4 w-4" /> },
    ],
  },
  {
    key: 'financeiro',
    label: 'Financeiro',
    icon: <Wallet className="h-4 w-4" />,
    group: 'op',
    routes: [
      { key: 'recebiveis', label: 'Recebíveis', path: '/financeiro/recebiveis', icon: <Landmark className="h-4 w-4" /> },
    ],
  },
  {
    key: 'configuracao',
    label: 'Configuração',
    icon: <Settings className="h-4 w-4" />,
    group: 'sys',
    routes: [
      { key: 'usuarios', label: 'Usuários', path: '/configuracao/usuarios', icon: <Users className="h-4 w-4" /> },
    ],
  },
]

const notificacoes: NotificationItem[] = [
  { id: '1', title: 'Cobrança paga', message: 'Mercado Horizonte pagou a fatura de agosto.', timestamp: new Date(Date.now() - 1000 * 60 * 18), read: false, type: 'success' },
  { id: '2', title: 'Vencimento próximo', message: 'A cobrança de Logística Vale vence em 2 dias.', timestamp: new Date(Date.now() - 1000 * 60 * 55), read: true, type: 'warning' },
]

const logo = (
  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">A</span>
)

const usuario = { name: 'Ana Souza', email: 'ana.souza@empresa.com.br', username: 'ana.souza', role: 'Administrador' }

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

function Moldura({ breadcrumbs, children }: { breadcrumbs: { label: string }[]; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: 1280, height: 760, overflow: 'hidden', transform: 'translateZ(0)' }}>
      <AppLayout
        title="Archon"
        subtitle="Empresa Exemplo"
        navbarCompanyName="Empresa Exemplo Ltda."
        logo={logo}
        user={usuario}
        navMode="module-rail"
        moduleNav={moduleNav}
        breadcrumbs={breadcrumbs}
        notifications={notificacoes}
      >
        {children}
      </AppLayout>
    </div>
  )
}

export function Listagem() {
  const [selecionados, setSelecionados] = React.useState<Contrato[]>([])
  return (
    <Moldura breadcrumbs={[{ label: 'Comercial' }, { label: 'Contratos' }]}>
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
          searchValue=""
          onSearchChange={() => undefined}
          searchPlaceholder="Buscar contrato"
          rightSlot={
            <FilterPanel
              sections={[{ key: 'situacao', label: 'Situação', value: '', onChange: () => undefined, options: [{ value: 'ativo', label: 'Ativo' }, { value: 'bloqueado', label: 'Bloqueado' }] }]}
              onClearAll={() => undefined}
            />
          }
          className="mb-3"
        />
        <DataTable columns={colunas} data={contratos} rowKey="id" selectable selectedRows={selecionados} onSelectionChange={setSelecionados} pageSize={10} />
      </PageLayout>
    </Moldura>
  )
}

export function Formulario() {
  return (
    <Moldura breadcrumbs={[{ label: 'Comercial' }, { label: 'Contratos' }, { label: 'Novo contrato' }]}>
      <PageLayout title="Novo contrato" subtitle="Dados do plano e do cliente" showDefaultActions={false}>
        <Card style={{ maxWidth: 768 }}>
          <CardHeader>
            <CardTitle>Dados do contrato</CardTitle>
            <CardDescription>Campos obrigatórios marcados com asterisco.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <FormField label="Cliente" htmlFor="cliente" required>
              <Input id="cliente" defaultValue="Mercado Horizonte" />
            </FormField>
            <FormField label="Plano" htmlFor="plano" required>
              <Select defaultValue="professional">
                <SelectTrigger id="plano"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Valor mensal" htmlFor="valor" required helperText="Em reais.">
              <Input id="valor" defaultValue="1.490,00" />
            </FormField>
            <FormField label="Dia de vencimento" htmlFor="vencimento" error="Informe um dia entre 1 e 28.">
              <Input id="vencimento" defaultValue="31" error />
            </FormField>
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Observações" htmlFor="obs">
                <Textarea id="obs" rows={3} defaultValue="Renovação automática ao fim de 12 meses." />
              </FormField>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3" style={{ gridColumn: '1 / -1' }}>
              <span className="text-sm">Enviar cobrança automática</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar contrato</Button>
          </CardFooter>
        </Card>
      </PageLayout>
    </Moldura>
  )
}
