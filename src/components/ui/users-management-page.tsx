import * as React from "react"
import { Shield, ShieldOff, UserPlus } from "lucide-react"
import { usePermissions } from "../../hooks/usePermissions"
import {
  UsersManagementService,
  type ContractRole,
  type ContractUser,
  type CreateUserInContractPayload,
} from "../../services/users-management/usersManagementService"
import { Badge } from "./badge"
import { Button } from "./button"
import { DataTable, type DataTableColumn } from "./data-table"
import { Input } from "./input"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "./modal"
import { PageLayout } from "./page-layout"
import { SearchableSelect } from "./searchable-select"
import { useToast } from "./use-toast"

export interface UsersManagementPageProps {
  title?: string
  subtitle?: string
  className?: string
}

interface FormState {
  username: string
  email: string
  name: string
  password: string
  roleId: string
}

const emptyForm: FormState = {
  username: "",
  email: "",
  name: "",
  password: "",
  roleId: "",
}

function getApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null) {
    const response = (error as { response?: { data?: { message?: string } } }).response
    if (response?.data?.message) {
      return response.data.message
    }
    const message = (error as { message?: string }).message
    if (message) {
      return message
    }
  }
  return fallback
}

export function UsersManagementPage({
  title = "Usuários",
  subtitle = "Gerencie quem tem acesso ao contrato ativo",
  className,
}: UsersManagementPageProps) {
  const { isRoot } = usePermissions()
  const { toast } = useToast()

  const [users, setUsers] = React.useState<ContractUser[]>([])
  const [roles, setRoles] = React.useState<ContractRole[]>([])
  const [loading, setLoading] = React.useState(false)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [editingRoleUser, setEditingRoleUser] = React.useState<ContractUser | null>(null)
  const [pendingRoleId, setPendingRoleId] = React.useState<string>("")

  const loadData = React.useCallback(async () => {
    setLoading(true)
    try {
      const [list, contractRoles] = await Promise.all([
        UsersManagementService.listInCurrentContract(),
        UsersManagementService.listRoles(),
      ])
      setUsers(list)
      setRoles(contractRoles)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao carregar usuários",
        description: getApiErrorMessage(error, "Tente novamente em alguns instantes."),
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  React.useEffect(() => {
    if (isRoot) {
      void loadData()
    }
  }, [isRoot, loadData])

  const roleOptions = React.useMemo(
    () => roles.map((role) => ({ value: String(role.id), label: role.name })),
    [roles]
  )

  const openCreateForm = () => {
    setForm({
      ...emptyForm,
      roleId: roles.find((role) => role.isDefault)?.id?.toString() ?? roleOptions[0]?.value ?? "",
    })
    setIsFormOpen(true)
  }

  const handleCreate = async () => {
    if (!form.username || !form.email || !form.name || !form.password || !form.roleId) {
      toast({
        variant: "destructive",
        title: "Preencha todos os campos",
        description: "Username, e-mail, nome, senha e perfil são obrigatórios.",
      })
      return
    }

    const payload: CreateUserInContractPayload = {
      username: form.username.trim(),
      email: form.email.trim(),
      name: form.name.trim(),
      password: form.password,
      roleId: Number(form.roleId),
    }

    setIsSaving(true)
    try {
      await UsersManagementService.createInCurrentContract(payload)
      toast({
        title: "Usuário criado",
        description: "O usuário já tem acesso ao contrato ativo.",
      })
      setIsFormOpen(false)
      setForm(emptyForm)
      await loadData()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Não foi possível criar o usuário",
        description: getApiErrorMessage(error, "Verifique os dados e tente novamente."),
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangeRole = async () => {
    if (!editingRoleUser || !pendingRoleId) return
    const newRoleId = Number(pendingRoleId)
    if (newRoleId === editingRoleUser.roleId) {
      setEditingRoleUser(null)
      return
    }

    setIsSaving(true)
    try {
      await UsersManagementService.updateRoleInCurrentContract(editingRoleUser.userId, newRoleId)
      toast({
        title: "Perfil atualizado",
        description: `${editingRoleUser.name} agora possui o novo perfil.`,
      })
      setEditingRoleUser(null)
      await loadData()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao atualizar perfil",
        description: getApiErrorMessage(error, "Tente novamente."),
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleActive = async (user: ContractUser) => {
    try {
      await UsersManagementService.setActive(user.userId, !user.isActive)
      toast({
        title: user.isActive ? "Usuário desativado" : "Usuário reativado",
        description: user.name,
      })
      await loadData()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao alterar status",
        description: getApiErrorMessage(error, "Tente novamente."),
      })
    }
  }

  if (!isRoot) {
    return (
      <PageLayout title={title} subtitle={subtitle} showDefaultActions={false} className={className}>
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border/70 bg-muted/20 p-10 text-center">
          <Shield className="mb-3 h-10 w-10 text-muted-foreground" />
          <h3 className="text-base font-semibold text-foreground">Acesso restrito</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Apenas administradores do contrato podem gerenciar usuários.
          </p>
        </div>
      </PageLayout>
    )
  }

  const columns: DataTableColumn<ContractUser>[] = [
    { key: "name", title: "Nome", dataIndex: "name" },
    { key: "username", title: "Usuário", dataIndex: "username" },
    { key: "email", title: "E-mail", dataIndex: "email" },
    {
      key: "roleName",
      title: "Perfil",
      dataIndex: "roleName",
      render: (value: string, record: ContractUser) => (
        <div className="flex items-center gap-2">
          <span>{value}</span>
          {record.isRoot ? <Badge variant="warning">root</Badge> : null}
        </div>
      ),
    },
    {
      key: "isActive",
      title: "Status",
      dataIndex: "isActive",
      render: (value: boolean) => (
        <Badge variant={value ? "success" : "destructive"}>{value ? "Ativo" : "Inativo"}</Badge>
      ),
    },
    {
      key: "lastLoginAt",
      title: "Último login",
      dataIndex: "lastLoginAt",
      render: (value?: string) =>
        value ? new Date(value).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "-",
    },
    {
      key: "actions",
      title: "",
      width: 220,
      render: (_: unknown, record: ContractUser) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="text-xs text-primary hover:underline"
            onClick={(event) => {
              event.stopPropagation()
              setEditingRoleUser(record)
              setPendingRoleId(String(record.roleId))
            }}
          >
            Alterar perfil
          </button>
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground hover:underline"
            onClick={(event) => {
              event.stopPropagation()
              void handleToggleActive(record)
            }}
          >
            {record.isActive ? (
              <span className="inline-flex items-center gap-1">
                <ShieldOff className="h-3 w-3" /> Desativar
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Shield className="h-3 w-3" /> Reativar
              </span>
            )}
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageLayout
        title={title}
        subtitle={subtitle}
        className={className}
        showDefaultActions={false}
        onRefresh={() => void loadData()}
        actions={[
          {
            key: "create",
            label: "Novo usuário",
            icon: <UserPlus className="h-4 w-4" />,
            variant: "primary",
            onClick: openCreateForm,
          },
        ]}
      >
        <DataTable
          columns={columns}
          data={users}
          rowKey="userId"
          emptyText="Nenhum usuário vinculado a este contrato."
          loading={loading}
          pageSize={10}
          pageSizeOptions={[10, 25, 50]}
        />
      </PageLayout>

      <Modal open={isFormOpen} onOpenChange={setIsFormOpen}>
        <ModalContent size="lg">
          <ModalHeader>
            <ModalTitle>Novo usuário</ModalTitle>
            <ModalDescription>
              O usuário será criado e vinculado automaticamente ao contrato ativo.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Nome completo</label>
                <Input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Maria Silva"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Username</label>
                <Input
                  value={form.username}
                  onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
                  placeholder="maria.silva"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs text-muted-foreground">E-mail</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="maria@empresa.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Senha</label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Perfil</label>
                <SearchableSelect
                  value={form.roleId}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, roleId: value }))}
                  options={roleOptions}
                  placeholder="Selecione um perfil"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)} disabled={isSaving}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={isSaving}>
              {isSaving ? "Criando..." : "Criar usuário"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal open={!!editingRoleUser} onOpenChange={(open) => !open && setEditingRoleUser(null)}>
        <ModalContent size="md">
          <ModalHeader>
            <ModalTitle>Alterar perfil</ModalTitle>
            <ModalDescription>
              {editingRoleUser ? `Definir um novo perfil para ${editingRoleUser.name}.` : ""}
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Perfil</label>
              <SearchableSelect
                value={pendingRoleId}
                onValueChange={setPendingRoleId}
                options={roleOptions}
                placeholder="Selecione um perfil"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setEditingRoleUser(null)} disabled={isSaving}>
              Cancelar
            </Button>
            <Button onClick={handleChangeRole} disabled={isSaving || !pendingRoleId}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
