import * as React from "react"
import { Shield } from "lucide-react"
import { usePermissions } from "../../hooks/usePermissions"
import {
  UsersManagementService,
  type ContractRole,
  type ContractUser,
  type CreateUserInContractPayload,
  type UpdateUserPayload,
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
  isActive: boolean
}

const emptyForm: FormState = {
  username: "",
  email: "",
  name: "",
  password: "",
  roleId: "",
  isActive: true,
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
  const [editingUser, setEditingUser] = React.useState<ContractUser | null>(null)
  const [selectedUser, setSelectedUser] = React.useState<ContractUser | null>(null)

  const isEditMode = editingUser !== null

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
    setEditingUser(null)
    setForm({
      ...emptyForm,
      roleId: roles.find((role) => role.isDefault)?.id?.toString() ?? roleOptions[0]?.value ?? "",
    })
    setIsFormOpen(true)
  }

  const openEditForm = (user: ContractUser) => {
    setEditingUser(user)
    setForm({
      username: user.username,
      email: user.email,
      name: user.name,
      password: "",
      roleId: String(user.roleId),
      isActive: user.isActive,
    })
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingUser(null)
    setForm(emptyForm)
  }

  const handleSave = async () => {
    if (isEditMode) {
      if (!form.name || !form.roleId) {
        toast({
          variant: "destructive",
          title: "Preencha os campos obrigatórios",
          description: "Nome e perfil são obrigatórios.",
        })
        return
      }

      const payload: UpdateUserPayload = {
        name: form.name.trim(),
        password: form.password ? form.password : undefined,
        isActive: form.isActive,
        roleId: Number(form.roleId),
      }

      setIsSaving(true)
      try {
        await UsersManagementService.updateInCurrentContract(editingUser!.userId, payload)
        toast({ title: "Usuário atualizado", description: editingUser!.name })
        closeForm()
        await loadData()
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Não foi possível atualizar o usuário",
          description: getApiErrorMessage(error, "Verifique os dados e tente novamente."),
        })
      } finally {
        setIsSaving(false)
      }
      return
    }

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
      closeForm()
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
      render: (value: string) => <span>{value}</span>,
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
  ]

  const handleEditSelected = () => {
    if (!selectedUser) {
      toast({
        variant: "warning",
        title: "Selecione um usuário",
        description: "Marque a linha do usuário que você quer editar.",
      })
      return
    }
    openEditForm(selectedUser)
  }

  return (
    <>
      <PageLayout
        title={title}
        subtitle={subtitle}
        className={className}
        onRefresh={() => void loadData()}
        onAdd={openCreateForm}
        onEdit={handleEditSelected}
        selectedRowsCount={selectedUser ? 1 : 0}
      >
        <DataTable
          columns={columns}
          data={users}
          rowKey="userId"
          emptyText="Nenhum usuário vinculado a este contrato."
          loading={loading}
          pageSize={10}
          pageSizeOptions={[10, 25, 50]}
          selectable
          selectedRows={selectedUser ? [selectedUser] : []}
          onSelectionChange={(rows) => setSelectedUser(rows[0] ?? null)}
          onRowDoubleClick={openEditForm}
        />
      </PageLayout>

      <Modal open={isFormOpen} onOpenChange={(open) => (open ? setIsFormOpen(true) : closeForm())}>
        <ModalContent size="lg">
          <ModalHeader>
            <ModalTitle>{isEditMode ? "Editar usuário" : "Novo usuário"}</ModalTitle>
            <ModalDescription>
              {isEditMode
                ? "Username e e-mail não são editáveis."
                : "O usuário será criado e vinculado automaticamente ao contrato ativo."}
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
                  disabled={isEditMode}
                  readOnly={isEditMode}
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs text-muted-foreground">E-mail</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="maria@empresa.com"
                  disabled={isEditMode}
                  readOnly={isEditMode}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  {isEditMode ? "Nova senha (opcional)" : "Senha"}
                </label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder={isEditMode ? "Deixe em branco para manter" : "Mínimo 6 caracteres"}
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
              {isEditMode ? (
                <div className="flex items-center gap-2 sm:col-span-2">
                  <input
                    id="user-active-toggle"
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
                    className="h-4 w-4 rounded border-border"
                  />
                  <label htmlFor="user-active-toggle" className="text-sm text-foreground">
                    Usuário ativo
                  </label>
                </div>
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={closeForm} disabled={isSaving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Salvando..." : isEditMode ? "Salvar" : "Criar usuário"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
