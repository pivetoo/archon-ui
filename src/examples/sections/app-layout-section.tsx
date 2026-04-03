import * as React from "react"
import { BarChart3, Building2, Home, Settings, Users } from "lucide-react"
import {
  AppLayout,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataTable,
  DataTableWithDetail,
  Input,
  Modal,
  PageLayout,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  Switch,
  toast,
  type DataTableColumn,
  type DataTableWithDetailColumn,
  type Module,
  type NotificationItem,
  type SidebarGroup,
  type SidebarItemData,
} from "../../components/ui"

const modules: Module[] = [
  { id: "portal", name: "FinanceChannel", icon: <Home className="h-4 w-4" /> },
  { id: "workforce", name: "MarketChannel", icon: <Users className="h-4 w-4" /> },
]

interface AppLayoutSectionProps {
  onBackToCatalog?: () => void
}

type PageKey = "dashboard" | "usuarios" | "empresa" | "parametros"
type UserRow = { id: number; nome: string; email: string; perfil: string; status: "Ativo" | "Pendente" }
type DepartmentRow = { id: number; nome: string; responsavel: string; colaboradores: number; status: "Ativo" | "Revisão" }

export function AppLayoutSection({ onBackToCatalog }: AppLayoutSectionProps) {
  const [currentModule, setCurrentModule] = React.useState("portal")
  const [currentPage, setCurrentPage] = React.useState<PageKey>("dashboard")
  const [companyName, setCompanyName] = React.useState("Empresa de Testes ME")
  const [supportEmail, setSupportEmail] = React.useState("suporte@empresa.com")
  const [maintenanceMode, setMaintenanceMode] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<UserRow[]>([])
  const [selectedDepartment, setSelectedDepartment] = React.useState<DepartmentRow | null>(null)

  const pageLabels: Record<PageKey, string> = {
    dashboard: "Dashboard",
    usuarios: "Usuários",
    empresa: "Empresa",
    parametros: "Parâmetros",
  }

  const sidebarLogo = (
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
      D
    </div>
  )

  const menuItems: SidebarItemData[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
      active: currentPage === "dashboard",
      onClick: () => setCurrentPage("dashboard"),
    },
    {
      key: "usuarios",
      label: "Usuários",
      icon: <Users className="h-4 w-4" />,
      active: currentPage === "usuarios",
      onClick: () => setCurrentPage("usuarios"),
    },
  ]

  const menuGroups: SidebarGroup[] = [
    {
      label: "Configurações",
      defaultExpanded: true,
      items: [
        {
          key: "empresa",
          label: "Empresa",
          icon: <Building2 className="h-4 w-4" />,
          active: currentPage === "empresa",
          onClick: () => setCurrentPage("empresa"),
        },
        {
          key: "parametros",
          label: "Parâmetros",
          icon: <Settings className="h-4 w-4" />,
          active: currentPage === "parametros",
          onClick: () => setCurrentPage("parametros"),
        },
      ],
    },
  ]

  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "Deploy concluído",
      message: "A versão 2.4.1 foi publicada com sucesso.",
      timestamp: new Date(Date.now() - 1000 * 60 * 18),
      read: false,
      type: "success",
    },
    {
      id: "2",
      title: "Atenção no tenant",
      message: "Tenant 2 com uso de CPU acima de 85%.",
      timestamp: new Date(Date.now() - 1000 * 60 * 55),
      read: true,
      type: "warning",
    },
  ]

  const usersData: UserRow[] = [
    { id: 1, nome: "Ana Souza", email: "ana.souza@empresa.com", perfil: "Administrador", status: "Ativo" },
    { id: 2, nome: "Bruno Lima", email: "bruno.lima@empresa.com", perfil: "Operador", status: "Ativo" },
    { id: 3, nome: "Carla Mendes", email: "carla.mendes@empresa.com", perfil: "Supervisor", status: "Pendente" },
  ]

  const usersColumns: DataTableColumn<UserRow>[] = [
    { key: "nome", title: "Nome", dataIndex: "nome" },
    { key: "email", title: "E-mail", dataIndex: "email" },
    { key: "perfil", title: "Perfil", dataIndex: "perfil" },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (value) => <Badge variant={value === "Ativo" ? "success" : "warning"}>{String(value)}</Badge>,
    },
  ]

  const departmentsData: DepartmentRow[] = [
    { id: 1, nome: "Financeiro", responsavel: "Mariana Costa", colaboradores: 12, status: "Ativo" },
    { id: 2, nome: "Operações", responsavel: "Henrique Alves", colaboradores: 24, status: "Ativo" },
    { id: 3, nome: "Compras", responsavel: "Patrícia Nunes", colaboradores: 6, status: "Revisão" },
  ]

  const departmentsColumns: DataTableWithDetailColumn<DepartmentRow>[] = [
    { key: "nome", title: "Departamento", dataIndex: "nome" },
    { key: "responsavel", title: "Responsável", dataIndex: "responsavel" },
    {
      key: "status",
      title: "Status",
      render: (_value, record) => <Badge variant={record.status === "Ativo" ? "success" : "warning"}>{record.status}</Badge>,
    },
  ]

  const renderPageContent = () => {
    if (currentPage === "dashboard") {
      return (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Receita (Mês)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">R$ 128.450</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Usuários ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">342</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Integrações</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Badge variant="success">24 online</Badge>
              <Badge variant="warning">2 alerta</Badge>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (currentPage === "usuarios") {
      return (
        <PageLayout
          title="Usuários"
          subtitle="Gestão de acessos e perfis"
          showDefaultActions={false}
          actions={[
            {
              key: "invite",
              label: "Convidar usuário",
              variant: "secondary",
              onClick: () => toast({ title: "Usuários", description: "Convite enviado", variant: "success" }),
            },
          ]}
        >
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={usersColumns}
                data={usersData}
                rowKey="id"
                selectedRows={selectedUsers}
                onSelectionChange={setSelectedUsers}
                pageSize={5}
              />
            </CardContent>
          </Card>
        </PageLayout>
      )
    }

    if (currentPage === "empresa") {
      return (
        <PageLayout
          title="Empresa"
          subtitle="Configurações institucionais"
          showDefaultActions={false}
          actions={[
            {
              key: "save-company",
              label: "Salvar",
              variant: "secondary",
              onClick: () => toast({ title: "Empresa", description: "Dados salvos", variant: "success" }),
            },
          ]}
        >
          <Card>
            <CardContent className="grid gap-4 pt-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome fantasia</label>
                <Input value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail de suporte</label>
                <Input value={supportEmail} onChange={(event) => setSupportEmail(event.target.value)} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <DataTableWithDetail
                columns={departmentsColumns}
                data={departmentsData}
                rowKey="id"
                selectedRow={selectedDepartment}
                onRowSelect={setSelectedDepartment}
                renderDetail={(record) => (
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold">{record.nome}</h3>
                    <p className="text-sm"><strong>Responsável:</strong> {record.responsavel}</p>
                    <p className="text-sm"><strong>Colaboradores:</strong> {record.colaboradores}</p>
                    <p className="text-sm">
                      <strong>Status:</strong>{" "}
                      <Badge variant={record.status === "Ativo" ? "success" : "warning"}>{record.status}</Badge>
                    </p>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </PageLayout>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Parâmetros gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="text-sm">Modo de manutenção</span>
            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => toast({ title: "Parâmetros", description: "Configurações salvas", variant: "success" })}
          >
            Salvar parâmetros
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <AppLayout
      title="dRTS"
      logo={sidebarLogo}
      subtitle={companyName}
      user={{ name: "Usuário Exemplo", email: "usuario@empresa.com", role: "Administrador" }}
      menuItems={menuItems}
      menuGroups={menuGroups}
      breadcrumbs={[{ label: "Início" }, { label: "Gestão" }, { label: pageLabels[currentPage] }]}
      notifications={notifications}
      modules={modules}
      currentModule={currentModule}
      onModuleChange={setCurrentModule}
      showAboutMenuItem
      renderAboutModal={(close) => (
        <Modal open onOpenChange={(open) => { if (!open) { close() } }}>
          <ModalContent size="md">
            <ModalHeader>
              <ModalTitle>Sobre o dRTS</ModalTitle>
              <ModalDescription>
                Exemplo de injeção do modal via `renderAboutModal` no AppLayout.
              </ModalDescription>
            </ModalHeader>
          </ModalContent>
        </Modal>
      )}
      onLogout={() => toast({ title: "Logout", description: "Ação de sair acionada", variant: "info" })}
    >
      <div className="space-y-4">
        {onBackToCatalog && currentPage === "dashboard" && (
          <div className="flex">
            <Button size="sm" variant="secondary" onClick={onBackToCatalog}>
              Voltar ao catálogo
            </Button>
          </div>
        )}
        {renderPageContent()}
      </div>
    </AppLayout>
  )
}
