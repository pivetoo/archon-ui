import * as React from "react"
import { Copy, Shield, ShieldCheck, Users } from "lucide-react"
import { usePermissions } from "../../hooks/usePermissions"
import {
  UsersManagementService,
  type AccessCapability,
  type AccessResource,
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
import { RoleFormModal, type RoleFormInitialData } from "./role-form-modal"
import { SearchableSelect } from "./searchable-select"
import { Tabs, TabsBadge, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { useToast } from "./use-toast"
import { ConfirmModal } from "./confirm-modal"
import { useOptionalI18n } from "../../i18n/I18nProvider"

export interface UsersManagementPageProps {
  title?: string
  subtitle?: string
  className?: string
  initialTab?: ActiveTab
  hideTabs?: boolean
}

type ActiveTab = "users" | "roles"

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
  title,
  subtitle,
  className,
  initialTab = "users",
  hideTabs = false,
}: UsersManagementPageProps) {
  const { isRoot } = usePermissions()
  const { toast } = useToast()
  const i18n = useOptionalI18n()
  const t = (key: string, fallback: string) => i18n?.t(key) ?? fallback
  const tf = (key: string, fallback: string, ...values: Array<string | number>) =>
    values.reduce((message: string, value, index) => message.replace(`{${index}}`, String(value)), t(key, fallback))
  const resolvedTitle = title ?? t("usersManagement.page.title", "Controle de Acesso")
  const resolvedSubtitle = subtitle ?? t("usersManagement.page.subtitle", "Gerencie usuários e perfis do contrato ativo")

  const [activeTab, setActiveTab] = React.useState<ActiveTab>(initialTab)

  React.useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])
  const [users, setUsers] = React.useState<ContractUser[]>([])
  const [roles, setRoles] = React.useState<ContractRole[]>([])
  const [accessResources, setAccessResources] = React.useState<AccessResource[]>([])
  const [accessCapabilities, setAccessCapabilities] = React.useState<AccessCapability[]>([])
  const [loading, setLoading] = React.useState(false)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [editingUser, setEditingUser] = React.useState<ContractUser | null>(null)
  const [selectedUser, setSelectedUser] = React.useState<ContractUser | null>(null)
  const [selectedRole, setSelectedRole] = React.useState<ContractRole | null>(null)
  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false)
  const [editingRoleId, setEditingRoleId] = React.useState<number | null>(null)
  const [duplicateInitial, setDuplicateInitial] = React.useState<RoleFormInitialData | null>(null)
  const [isConfirmDeleteRoleOpen, setIsConfirmDeleteRoleOpen] = React.useState(false)
  const [isDeletingRole, setIsDeletingRole] = React.useState(false)

  const isEditMode = editingUser !== null

  const loadData = React.useCallback(async () => {
    setLoading(true)
    try {
      const [list, contractRoles, resources, capabilities] = await Promise.all([
        UsersManagementService.listInCurrentContract(),
        UsersManagementService.listRoles(),
        UsersManagementService.listAccessResources(),
        UsersManagementService.listAccessCapabilities(),
      ])
      setUsers(list)
      setRoles(contractRoles)
      setAccessResources(resources)
      setAccessCapabilities(capabilities)
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("usersManagement.page.toast.loadErrorTitle", "Falha ao carregar dados"),
        description: getApiErrorMessage(error, t("common.error.retryShortly", "Tente novamente em alguns instantes.")),
      })
    } finally {
      setLoading(false)
    }
  }, [toast, i18n])

  React.useEffect(() => {
    if (isRoot) {
      void loadData()
    }
  }, [isRoot, loadData])

  const roleOptions = React.useMemo(
    () => roles.map((role) => ({ value: String(role.id), label: role.name })),
    [roles]
  )

  const userCountByRole = React.useMemo(() => {
    const map = new Map<number, number>()
    for (const user of users) {
      map.set(user.roleId, (map.get(user.roleId) ?? 0) + 1)
    }
    return map
  }, [users])

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
          title: t("usersManagement.page.validation.editRequiredTitle", "Preencha os campos obrigatórios"),
          description: t("usersManagement.page.validation.editRequiredDescription", "Nome e perfil são obrigatórios."),
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
        toast({ variant: "success", title: t("usersManagement.page.toast.userUpdatedTitle", "Usuário atualizado"), description: editingUser!.name })
        closeForm()
        await loadData()
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("usersManagement.page.toast.userUpdateErrorTitle", "Não foi possível atualizar o usuário"),
          description: getApiErrorMessage(error, t("common.error.checkDataAndRetry", "Verifique os dados e tente novamente.")),
        })
      } finally {
        setIsSaving(false)
      }
      return
    }

    if (!form.username || !form.email || !form.name || !form.password || !form.roleId) {
      toast({
        variant: "destructive",
        title: t("usersManagement.page.validation.createRequiredTitle", "Preencha todos os campos"),
        description: t("usersManagement.page.validation.createRequiredDescription", "Username, e-mail, nome, senha e perfil são obrigatórios."),
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
        variant: "success",
        title: t("usersManagement.page.toast.userCreatedTitle", "Usuário criado"),
        description: t("usersManagement.page.toast.userCreatedDescription", "O usuário já tem acesso ao contrato ativo."),
      })
      closeForm()
      await loadData()
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("usersManagement.page.toast.userCreateErrorTitle", "Não foi possível criar o usuário"),
        description: getApiErrorMessage(error, t("common.error.checkDataAndRetry", "Verifique os dados e tente novamente.")),
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isRoot) {
    return (
      <PageLayout title={resolvedTitle} subtitle={resolvedSubtitle} showDefaultActions={false} className={className}>
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border/70 bg-muted/20 p-10 text-center">
          <Shield className="mb-3 h-10 w-10 text-muted-foreground" />
          <h3 className="text-base font-semibold text-foreground">{t("usersManagement.page.restricted.title", "Acesso restrito")}</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {t("usersManagement.page.restricted.description", "Apenas administradores do contrato podem gerenciar o controle de acesso.")}
          </p>
        </div>
      </PageLayout>
    )
  }

  const userColumns: DataTableColumn<ContractUser>[] = [
    { key: "name", title: t("common.field.name", "Nome"), dataIndex: "name" },
    { key: "username", title: t("usersManagement.field.username", "Usuário"), dataIndex: "username" },
    { key: "email", title: t("common.field.email", "E-mail"), dataIndex: "email" },
    {
      key: "roleName",
      title: t("usersManagement.field.role", "Perfil"),
      dataIndex: "roleName",
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: "isActive",
      title: t("common.field.status", "Status"),
      dataIndex: "isActive",
      render: (value: boolean) => (
        <Badge variant={value ? "success" : "destructive"}>{value ? t("common.status.active", "Ativo") : t("common.status.inactive", "Inativo")}</Badge>
      ),
    },
    {
      key: "lastLoginAt",
      title: t("usersManagement.field.lastLogin", "Último login"),
      dataIndex: "lastLoginAt",
      render: (value?: string) =>
        value ? new Date(value).toLocaleString(i18n?.culture ?? "pt-BR", { dateStyle: "short", timeStyle: "short" }) : "-",
    },
  ]

  const roleColumns: DataTableColumn<ContractRole>[] = [
    { key: "name", title: t("usersManagement.field.role", "Perfil"), dataIndex: "name" },
    {
      key: "description",
      title: t("common.field.description", "Descrição"),
      dataIndex: "description",
      render: (value?: string) => value || "-",
    },
    {
      key: "isRoot",
      title: t("common.field.type", "Tipo"),
      dataIndex: "isRoot",
      render: (value: boolean) =>
        value ? <Badge variant="warning">{t("usersManagement.badge.fullAccess", "Acesso total")}</Badge> : <Badge variant="outline">{t("usersManagement.badge.restricted", "Restrito")}</Badge>,
    },
    {
      key: "permissions",
      title: t("usersManagement.role.field.permissions", "Permissões"),
      dataIndex: "id",
      render: (_value: number, role: ContractRole) => {
        if (role.isRoot) {
          return t("usersManagement.value.all", "Tudo")
        }
        const modules = new Set((role.capabilityKeys ?? []).map((key) => key.split(".")[0]))
        const parts: string[] = []
        if (modules.size > 0) {
          parts.push(tf("usersManagement.value.moduleCount", "{0} módulo(s)", modules.size))
        }
        if ((role.accessResourceIds ?? []).length > 0) {
          parts.push(tf("usersManagement.value.actionCount", "{0} ação(ões)", role.accessResourceIds!.length))
        }
        return parts.length > 0 ? parts.join(" · ") : <span className="text-muted-foreground">{t("common.status.none", "Nenhuma")}</span>
      },
    },
    {
      key: "isDefault",
      title: t("usersManagement.field.isDefaultColumn", "Default"),
      dataIndex: "isDefault",
      render: (value: boolean) => (value ? <Badge variant="success">{t("common.status.yes", "Sim")}</Badge> : "-"),
    },
    {
      key: "userCount",
      title: t("usersManagement.field.userCount", "Usuários"),
      dataIndex: "id",
      render: (value: number) => userCountByRole.get(value) ?? 0,
    },
  ]

  const handleEditSelected = () => {
    if (activeTab === "users") {
      if (!selectedUser) {
        toast({
          variant: "warning",
          title: t("usersManagement.page.toast.selectUserTitle", "Selecione um usuário"),
          description: t("usersManagement.page.toast.selectUserEditDescription", "Marque a linha do usuário que você quer editar."),
        })
        return
      }
      openEditForm(selectedUser)
      return
    }

    if (!selectedRole) {
      toast({
        variant: "warning",
        title: t("usersManagement.page.toast.selectRoleTitle", "Selecione um perfil"),
        description: t("usersManagement.page.toast.selectRoleEditDescription", "Marque a linha do perfil que você quer editar."),
      })
      return
    }
    setDuplicateInitial(null)
    setEditingRoleId(selectedRole.id)
    setIsRoleModalOpen(true)
  }

  const handleAdd = () => {
    if (activeTab === "users") {
      openCreateForm()
      return
    }
    setDuplicateInitial(null)
    setEditingRoleId(null)
    setIsRoleModalOpen(true)
  }

  const handleDuplicateRole = async () => {
    if (!selectedRole) {
      toast({
        variant: "warning",
        title: t("usersManagement.page.toast.selectRoleTitle", "Selecione um perfil"),
        description: t("usersManagement.page.toast.selectRoleDuplicateDescription", "Marque a linha do perfil que você quer duplicar."),
      })
      return
    }

    try {
      const source = await UsersManagementService.getRoleById(selectedRole.id)
      setDuplicateInitial({
        name: `${source.name}${t("usersManagement.page.duplicateSuffix", " (cópia)")}`,
        description: source.description ?? "",
        isRoot: source.isRoot,
        isDefault: false,
        accessResourceIds: source.accessResourceIds ?? [],
        capabilityKeys: source.capabilityKeys ?? [],
      })
      setEditingRoleId(null)
      setIsRoleModalOpen(true)
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("usersManagement.page.toast.duplicateErrorTitle", "Não foi possível duplicar"),
        description: getApiErrorMessage(error, t("common.error.retry", "Tente novamente.")),
      })
    }
  }

  const handleDeleteSelected = () => {
    if (activeTab !== "roles") {
      return
    }

    if (!selectedRole) {
      toast({
        variant: "warning",
        title: t("usersManagement.page.toast.selectRoleTitle", "Selecione um perfil"),
        description: t("usersManagement.page.toast.selectRoleDeleteDescription", "Marque a linha do perfil que você quer excluir."),
      })
      return
    }

    const usersInRole = userCountByRole.get(selectedRole.id) ?? 0
    if (usersInRole > 0) {
      toast({
        variant: "destructive",
        title: t("usersManagement.page.toast.roleHasUsersTitle", "Perfil com usuários vinculados"),
        description: tf("usersManagement.page.toast.roleHasUsersDescription", "Existem {0} usuário(s) usando este perfil. Reatribua antes de excluir.", usersInRole),
      })
      return
    }

    setIsConfirmDeleteRoleOpen(true)
  }

  const confirmDeleteRole = async () => {
    if (!selectedRole) return
    setIsDeletingRole(true)
    try {
      await UsersManagementService.deleteRole(selectedRole.id)
      toast({ variant: "success", title: t("usersManagement.page.toast.roleDeletedTitle", "Perfil excluído"), description: selectedRole.name })
      setIsConfirmDeleteRoleOpen(false)
      setSelectedRole(null)
      await loadData()
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("usersManagement.page.toast.deleteErrorTitle", "Não foi possível excluir"),
        description: getApiErrorMessage(error, t("common.error.retry", "Tente novamente.")),
      })
    } finally {
      setIsDeletingRole(false)
    }
  }

  const selectedRowsCount = activeTab === "users"
    ? selectedUser ? 1 : 0
    : selectedRole ? 1 : 0

  return (
    <>
      <PageLayout
        title={resolvedTitle}
        subtitle={resolvedSubtitle}
        className={className}
        onRefresh={() => void loadData()}
        onAdd={handleAdd}
        onEdit={handleEditSelected}
        onDelete={activeTab === "roles" ? handleDeleteSelected : undefined}
        selectedRowsCount={selectedRowsCount}
        actions={activeTab === "roles" ? [
          {
            key: "duplicate",
            label: t("usersManagement.page.action.duplicateRole", "Duplicar perfil"),
            icon: <Copy className="h-4 w-4" />,
            variant: "outline",
            onClick: () => void handleDuplicateRole(),
            disabled: !selectedRole,
          },
        ] : []}
      >
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as ActiveTab)
            setSelectedUser(null)
            setSelectedRole(null)
          }}
        >
          {!hideTabs && (
            <TabsList variant="underline" className="mb-4">
              <TabsTrigger value="users">
                <Users className="h-4 w-4" />
                {t("usersManagement.tab.users", "Usuários")}
                <TabsBadge>{users.length}</TabsBadge>
              </TabsTrigger>
              <TabsTrigger value="roles">
                <ShieldCheck className="h-4 w-4" />
                {t("usersManagement.tab.roles", "Perfis")}
                <TabsBadge>{roles.length}</TabsBadge>
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="users">
            <DataTable
              columns={userColumns}
              data={users}
              rowKey="userId"
              emptyText={t("usersManagement.page.usersEmpty", "Nenhum usuário vinculado a este contrato.")}
              loading={loading}
              pageSize={10}
              pageSizeOptions={[10, 25, 50]}
              selectable
              selectedRows={selectedUser ? [selectedUser] : []}
              onSelectionChange={(rows) => setSelectedUser(rows[0] ?? null)}
            />
          </TabsContent>

          <TabsContent value="roles">
            <DataTable
              columns={roleColumns}
              data={roles}
              rowKey="id"
              emptyText={t("usersManagement.page.rolesEmpty", "Nenhum perfil cadastrado neste contrato.")}
              loading={loading}
              pageSize={10}
              pageSizeOptions={[10, 25, 50]}
              selectable
              selectedRows={selectedRole ? [selectedRole] : []}
              onSelectionChange={(rows) => setSelectedRole(rows[0] ?? null)}
            />
          </TabsContent>
        </Tabs>
      </PageLayout>

      <Modal open={isFormOpen} onOpenChange={(open) => (open ? setIsFormOpen(true) : closeForm())}>
        <ModalContent size="lg">
          <ModalHeader>
            <ModalTitle>{isEditMode ? t("usersManagement.page.userModal.editTitle", "Editar usuário") : t("usersManagement.page.userModal.newTitle", "Novo usuário")}</ModalTitle>
            <ModalDescription>
              {isEditMode
                ? t("usersManagement.page.userModal.editDescription", "Username e e-mail não são editáveis.")
                : t("usersManagement.page.userModal.newDescription", "O usuário será criado e vinculado automaticamente ao contrato ativo.")}
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">{t("usersManagement.page.field.fullName", "Nome completo")}</label>
                <Input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder={t("usersManagement.page.field.fullNamePlaceholder", "Maria Silva")}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">{t("usersManagement.page.field.usernameLabel", "Username")}</label>
                <Input
                  value={form.username}
                  onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
                  placeholder={t("usersManagement.page.field.usernamePlaceholder", "maria.silva")}
                  disabled={isEditMode}
                  readOnly={isEditMode}
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs text-muted-foreground">{t("common.field.email", "E-mail")}</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder={t("usersManagement.page.field.emailPlaceholder", "maria@empresa.com")}
                  disabled={isEditMode}
                  readOnly={isEditMode}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  {isEditMode ? t("usersManagement.page.field.passwordOptional", "Nova senha (opcional)") : t("usersManagement.page.field.password", "Senha")}
                </label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder={isEditMode ? t("usersManagement.page.field.passwordKeepPlaceholder", "Deixe em branco para manter") : t("usersManagement.page.field.passwordMinPlaceholder", "Mínimo 6 caracteres")}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">{t("usersManagement.field.role", "Perfil")}</label>
                <SearchableSelect
                  value={form.roleId}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, roleId: value }))}
                  options={roleOptions}
                  placeholder={t("usersManagement.page.field.rolePlaceholder", "Selecione um perfil")}
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
                    {t("usersManagement.page.field.userActive", "Usuário ativo")}
                  </label>
                </div>
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={closeForm} disabled={isSaving}>
              {t("common.action.cancel", "Cancelar")}
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? t("common.action.saving", "Salvando...") : isEditMode ? t("common.action.save", "Salvar") : t("usersManagement.page.action.createUser", "Criar usuário")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <RoleFormModal
        open={isRoleModalOpen}
        onOpenChange={(open) => {
          setIsRoleModalOpen(open)
          if (!open) {
            setEditingRoleId(null)
            setDuplicateInitial(null)
          }
        }}
        roleId={editingRoleId}
        initialData={duplicateInitial}
        accessResources={accessResources}
        capabilities={accessCapabilities}
        onSaved={() => {
          setSelectedRole(null)
          void loadData()
        }}
      />

      <ConfirmModal
        open={isConfirmDeleteRoleOpen}
        onOpenChange={(open) => setIsConfirmDeleteRoleOpen(open)}
        onConfirm={() => void confirmDeleteRole()}
        title={t("usersManagement.page.confirmDelete.title", "Excluir perfil")}
        description={
          selectedRole
            ? tf("usersManagement.page.confirmDelete.description", 'Confirma a exclusão do perfil "{0}"? Esta ação não pode ser desfeita.', selectedRole.name)
            : ""
        }
        confirmText={t("common.action.delete", "Excluir")}
        variant="danger"
        loading={isDeletingRole}
      />
    </>
  )
}
