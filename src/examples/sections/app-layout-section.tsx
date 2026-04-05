import * as React from "react"
import { BarChart3, Building2, Filter, Home, Settings, Users } from "lucide-react"
import {
  AppLayout,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataTable,
  DataTablePreview,
  Modal,
  PageLayout,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Switch,
  TableToolbar,
  toast,
  type DataTableColumn,
  type DataTablePreviewColumn,
  type Module,
  type NotificationItem,
  type SidebarGroup,
  type SidebarItemData,
} from "../../components/ui"
import { I18nProvider, type ArchonCulture, type LocalizationCatalog } from "../../i18n"

const modules: Module[] = [
  { id: "portal", name: "FinanceChannel", icon: <Home className="h-4 w-4" /> },
  { id: "workforce", name: "MarketChannel", icon: <Users className="h-4 w-4" /> },
]

const layoutCatalogs: Record<ArchonCulture, LocalizationCatalog> = {
  "pt-BR": {
    culture: "pt-BR",
    uiCulture: "pt-BR",
    messages: {
      "nav.about": "Sobre",
      "nav.language": "Idioma",
      "nav.logout": "Sair",
      "nav.theme.dark": "Modo Escuro",
      "nav.theme.light": "Modo Claro",
    },
  },
  "en-US": {
    culture: "en-US",
    uiCulture: "en-US",
    messages: {
      "nav.about": "About",
      "nav.language": "Language",
      "nav.logout": "Sign out",
      "nav.theme.dark": "Dark mode",
      "nav.theme.light": "Light mode",
    },
  },
  "es-AR": {
    culture: "es-AR",
    uiCulture: "es-AR",
    messages: {
      "nav.about": "Acerca de",
      "nav.language": "Idioma",
      "nav.logout": "Salir",
      "nav.theme.dark": "Modo oscuro",
      "nav.theme.light": "Modo claro",
    },
  },
}

const loadLayoutCatalog = async (culture: ArchonCulture): Promise<LocalizationCatalog> => {
  return layoutCatalogs[culture]
}

interface AppLayoutSectionProps {
  onBackToCatalog?: () => void
}

type PageKey = "dashboard" | "usuarios" | "empresa" | "parametros"
type UserRow = { id: number; nome: string; email: string; perfil: string; status: "Ativo" | "Pendente" }
type DepartmentRow = { id: number; nome: string; responsavel: string; colaboradores: number; status: "Ativo" | "Revisão" }

export function AppLayoutSection({ onBackToCatalog }: AppLayoutSectionProps) {
  const [currentModule, setCurrentModule] = React.useState("portal")
  const [currentPage, setCurrentPage] = React.useState<PageKey>("dashboard")
  const companyName = "Empresa de Testes ME"
  const [maintenanceMode, setMaintenanceMode] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<UserRow[]>([])
  const [selectedDepartment, setSelectedDepartment] = React.useState<DepartmentRow | null>(null)
  const [userSearch, setUserSearch] = React.useState("")
  const [departmentSearch, setDepartmentSearch] = React.useState("")

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

  const departmentsColumns: DataTablePreviewColumn<DepartmentRow>[] = [
    { key: "nome", title: "Departamento", dataIndex: "nome" },
    { key: "responsavel", title: "Responsável", dataIndex: "responsavel" },
    {
      key: "status",
      title: "Status",
      render: (_value, record) => <Badge variant={record.status === "Ativo" ? "success" : "warning"}>{record.status}</Badge>,
    },
  ]

  const filteredUsers = usersData.filter((user) => {
    const search = userSearch.trim().toLowerCase()
    if (!search) {
      return true
    }

    return [user.nome, user.email, user.perfil].some((value) =>
      value.toLowerCase().includes(search)
    )
  })

  const previewUser = selectedUsers.length === 1 ? selectedUsers[0] : null

  const filteredDepartments = departmentsData.filter((department) => {
    const search = departmentSearch.trim().toLowerCase()
    if (!search) {
      return true
    }

    return [department.nome, department.responsavel, department.status].some((value) =>
      value.toLowerCase().includes(search)
    )
  })

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
        <>
          <PageLayout
            title="Usuários"
            subtitle="Gestão de acessos e perfis"
            onAdd={() => toast({ title: "Usuários", description: "Incluir acionado", variant: "success" })}
            onEdit={() => toast({ title: "Usuários", description: "Editar acionado", variant: "info" })}
            onDelete={() => toast({ title: "Usuários", description: "Excluir acionado", variant: "warning" })}
            selectedRowsCount={selectedUsers.length}
            actions={[
              {
                key: "invite",
                label: "Convidar usuário",
                variant: "outline-primary",
                onClick: () => toast({ title: "Usuários", description: "Convite enviado", variant: "success" }),
              },
            ]}
          >
            <div className="space-y-4">
              <TableToolbar
                searchValue={userSearch}
                onSearchChange={setUserSearch}
                searchPlaceholder="Buscar por nome, e-mail ou perfil"
                rightSlot={
                  <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />} />
                }
              />

              <DataTable
                columns={usersColumns}
                data={filteredUsers}
                rowKey="id"
                selectedRows={selectedUsers}
                onSelectionChange={setSelectedUsers}
                pageSize={5}
              />
            </div>
          </PageLayout>

          <Sheet open={!!previewUser} onOpenChange={(open) => !open && setSelectedUsers([])}>
            <SheetContent side="right" className="w-full sm:max-w-md">
              {previewUser ? (
                <div className="flex h-full flex-col">
                  <SheetHeader>
                    <SheetTitle>{previewUser.nome}</SheetTitle>
                    <SheetDescription>
                      Preview lateral acionado pela seleção do usuário.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 flex-1 space-y-5 overflow-y-auto">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                          Perfil
                        </div>
                        <div className="mt-1 text-sm font-medium text-foreground">{previewUser.perfil}</div>
                      </div>

                      <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                          Situação
                        </div>
                        <div className="mt-2">
                          <Badge variant={previewUser.status === "Ativo" ? "success" : "warning"}>
                            {previewUser.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                        E-mail
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">{previewUser.email}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => toast({ title: "Usuários", description: `Abrindo detalhes de ${previewUser.nome}`, variant: "info" })}
                    >
                      Abrir detalhes
                    </Button>
                  </div>
                </div>
              ) : null}
            </SheetContent>
          </Sheet>
        </>
      )
    }

    if (currentPage === "empresa") {
      return (
        <PageLayout
          title="Empresa"
          subtitle="Configurações institucionais e visão rápida da estrutura interna"
          onAdd={() => toast({ title: "Empresa", description: "Incluir departamento acionado", variant: "success" })}
          onEdit={() => toast({ title: "Empresa", description: "Editar departamento acionado", variant: "info" })}
          onDelete={() => toast({ title: "Empresa", description: "Excluir departamento acionado", variant: "warning" })}
          selectedRowsCount={selectedDepartment ? 1 : 0}
        >
          <div className="space-y-4">
            <TableToolbar
              searchValue={departmentSearch}
              onSearchChange={setDepartmentSearch}
              searchPlaceholder="Buscar departamento ou responsável"
              rightSlot={<Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />} />}
            />

            <DataTablePreview
              columns={departmentsColumns}
              data={filteredDepartments}
              rowKey="id"
              selectedRow={selectedDepartment}
              onRowSelect={setSelectedDepartment}
              renderDetail={(record) => (
                <div className="space-y-5 p-5">
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      Preview do departamento
                    </div>
                    <h3 className="text-xl font-semibold text-primary">{record.nome}</h3>
                    <p className="text-sm text-primary/80">
                      Estrutura organizacional e dados operacionais do departamento selecionado.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Responsável
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">{record.responsavel}</div>
                    </div>

                    <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Colaboradores
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">{record.colaboradores}</div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Situação atual
                    </div>
                    <div className="mt-2">
                      <Badge variant={record.status === "Ativo" ? "success" : "warning"}>{record.status}</Badge>
                    </div>
                  </div>

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => toast({ title: "Empresa", description: `Abrindo detalhes de ${record.nome}`, variant: "info" })}
                  >
                    Abrir detalhes
                  </Button>
                </div>
              )}
            />
          </div>
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
    <I18nProvider initialCulture="pt-BR" catalogLoader={loadLayoutCatalog}>
      <AppLayout
        title="archon-ui"
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
                <ModalTitle>Sobre o archon-ui</ModalTitle>
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
    </I18nProvider>
  )
}
