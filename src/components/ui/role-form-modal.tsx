import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import {
  UsersManagementService,
  type AccessCapability,
  type AccessResource,
  type CreateRolePayload,
  type UpdateRolePayload,
} from "../../services/users-management/usersManagementService"
import { Badge } from "./badge"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
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
import { RolePermissionsPickerModal } from "./role-permissions-picker-modal"
import { Switch } from "./switch"
import { useToast } from "./use-toast"

export interface RoleFormInitialData {
  name: string
  description: string
  isRoot: boolean
  isDefault: boolean
  accessResourceIds: number[]
  capabilityKeys?: string[]
}

export interface RoleFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleId: number | null
  initialData?: RoleFormInitialData | null
  accessResources: AccessResource[]
  capabilities?: AccessCapability[]
  onSaved: () => void
}

interface FormState {
  name: string
  description: string
  isRoot: boolean
  isDefault: boolean
}

interface CapabilityModule {
  key: string
  label: string
  items: AccessCapability[]
}

const emptyForm: FormState = {
  name: "",
  description: "",
  isRoot: false,
  isDefault: false,
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

// Agrupa o catalogo por modulo respeitando a ordem que o sistema declarou (moduleOrder/order).
function groupByModule(capabilities: AccessCapability[]): CapabilityModule[] {
  const sorted = [...capabilities].sort(
    (a, b) => a.moduleOrder - b.moduleOrder || a.module.localeCompare(b.module) || a.order - b.order || a.key.localeCompare(b.key)
  )
  const modules = new Map<string, CapabilityModule>()
  for (const capability of sorted) {
    const current = modules.get(capability.module) ?? { key: capability.module, label: capability.moduleLabel || capability.module, items: [] }
    current.items.push(capability)
    modules.set(capability.module, current)
  }
  return Array.from(modules.values())
}

export function RoleFormModal({ open, onOpenChange, roleId, initialData, accessResources, capabilities = [], onSaved }: RoleFormModalProps) {
  const { toast } = useToast()
  const isEditMode = roleId !== null
  const hasCatalog = capabilities.length > 0

  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [selectedIds, setSelectedIds] = React.useState<number[]>([])
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [isPickerOpen, setIsPickerOpen] = React.useState(false)
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  const modules = React.useMemo(() => groupByModule(capabilities), [capabilities])
  const baselineKeys = React.useMemo(() => capabilities.filter((item) => item.isBaseline).map((item) => item.key), [capabilities])

  const loadInitialData = React.useCallback(async () => {
    if (!isEditMode || roleId === null) {
      if (initialData) {
        setForm({
          name: initialData.name,
          description: initialData.description,
          isRoot: initialData.isRoot,
          isDefault: initialData.isDefault,
        })
        setSelectedIds(initialData.accessResourceIds)
        setSelectedKeys(initialData.capabilityKeys ?? [])
        setShowAdvanced(initialData.accessResourceIds.length > 0)
      } else {
        setForm(emptyForm)
        setSelectedIds([])
        setSelectedKeys([])
        setShowAdvanced(false)
      }
      return
    }

    setLoading(true)
    try {
      const role = await UsersManagementService.getRoleById(roleId)
      setForm({
        name: role.name,
        description: role.description ?? "",
        isRoot: role.isRoot,
        isDefault: role.isDefault,
      })
      setSelectedIds(role.accessResourceIds ?? [])
      setSelectedKeys(role.capabilityKeys ?? [])
      setShowAdvanced((role.accessResourceIds ?? []).length > 0)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao carregar perfil",
        description: getApiErrorMessage(error, "Tente novamente."),
      })
    } finally {
      setLoading(false)
    }
  }, [isEditMode, roleId, initialData, toast])

  React.useEffect(() => {
    if (open) {
      void loadInitialData()
    }
  }, [open, loadInitialData])

  const toggleKey = (key: string, checked: boolean) => {
    setSelectedKeys((current) => {
      if (checked) {
        return current.includes(key) ? current : [...current, key]
      }
      return current.filter((item) => item !== key)
    })
  }

  const toggleModule = (module: CapabilityModule, checked: boolean) => {
    const keys = module.items.filter((item) => !item.isBaseline).map((item) => item.key)
    setSelectedKeys((current) => {
      if (checked) {
        return Array.from(new Set([...current, ...keys]))
      }
      return current.filter((item) => !keys.includes(item))
    })
  }

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({
        variant: "destructive",
        title: "Nome obrigatório",
        description: "Informe um nome para o perfil.",
      })
      return
    }

    // As capacidades basicas sao adicionadas pelo IdentityManagement na emissao do token; nao
    // precisam ficar gravadas no perfil.
    const capabilityKeys = selectedKeys.filter((key) => !baselineKeys.includes(key))

    setSaving(true)
    try {
      if (isEditMode && roleId !== null) {
        const payload: UpdateRolePayload = {
          name: form.name.trim(),
          description: form.description.trim(),
          isRoot: form.isRoot,
          isDefault: form.isDefault,
          accessResourceIds: selectedIds,
          capabilityKeys,
        }
        await UsersManagementService.updateRole(roleId, payload)
        toast({ variant: "success", title: "Perfil atualizado", description: form.name })
      } else {
        const payload: CreateRolePayload = {
          name: form.name.trim(),
          description: form.description.trim(),
          isRoot: form.isRoot,
          isDefault: form.isDefault,
          accessResourceIds: selectedIds,
          capabilityKeys,
        }
        await UsersManagementService.createRole(payload)
        toast({ variant: "success", title: "Perfil criado", description: form.name })
      }

      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: isEditMode ? "Falha ao atualizar perfil" : "Falha ao criar perfil",
        description: getApiErrorMessage(error, "Verifique os dados e tente novamente."),
      })
    } finally {
      setSaving(false)
    }
  }

  const selectedNonBaseline = selectedKeys.filter((key) => !baselineKeys.includes(key))

  const renderCapabilityMatrix = () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">O que este perfil pode fazer</p>
          <p className="text-sm text-muted-foreground">
            Marque por módulo. Cada opção já libera todas as telas e ações correspondentes.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          {selectedNonBaseline.length} de {capabilities.length - baselineKeys.length} marcadas
        </div>
      </div>

      <div className="space-y-3">
        {modules.map((module) => {
          const selectable = module.items.filter((item) => !item.isBaseline)
          const selectedInModule = selectable.filter((item) => selectedKeys.includes(item.key)).length
          const allSelected = selectable.length > 0 && selectedInModule === selectable.length

          return (
            <div key={module.key} className="rounded-lg border bg-background">
              <div className="flex items-center justify-between gap-4 border-b px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{module.label}</p>
                  {selectable.length > 0 ? (
                    <Badge variant="outline">
                      {selectedInModule}/{selectable.length}
                    </Badge>
                  ) : null}
                </div>
                {selectable.length > 1 ? (
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Checkbox checked={allSelected} onCheckedChange={(checked) => toggleModule(module, checked === true)} />
                    Tudo do módulo
                  </label>
                ) : null}
              </div>
              <div className="grid gap-2 px-4 py-3 md:grid-cols-2">
                {module.items.map((capability) => {
                  const checked = capability.isBaseline || selectedKeys.includes(capability.key)
                  return (
                    <label
                      key={capability.key}
                      className={`flex min-w-0 items-start gap-3 rounded-md border p-3 text-sm transition-colors ${capability.isBaseline ? "bg-muted/30" : "hover:bg-muted/30"}`}
                      title={capability.description || undefined}
                    >
                      <Checkbox
                        checked={checked}
                        disabled={capability.isBaseline}
                        onCheckedChange={(value) => toggleKey(capability.key, value === true)}
                      />
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{capability.label}</span>
                          {capability.isBaseline ? <Badge variant="outline">Sempre incluído</Badge> : null}
                        </div>
                        {capability.description ? (
                          <p className="text-xs text-muted-foreground">{capability.description}</p>
                        ) : null}
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderAdvanced = () => (
    <div className="rounded-lg border bg-muted/20">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
        onClick={() => setShowAdvanced((current) => !current)}
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          {showAdvanced ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          Permissões avançadas por ação
        </span>
        <span className="text-xs text-muted-foreground">
          {selectedIds.length} de {accessResources.length} ações
        </span>
      </button>
      {showAdvanced ? (
        <div className="space-y-3 border-t px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Libera ações específicas da API além das marcadas por módulo. Use apenas em casos fora do padrão.
          </p>
          <Button variant="secondary" size="sm" onClick={() => setIsPickerOpen(true)} disabled={accessResources.length === 0}>
            Selecionar ações
          </Button>
        </div>
      ) : null}
    </div>
  )

  const renderLegacyPicker = () => (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Permissões deste perfil</p>
          <p className="text-sm text-muted-foreground">
            {selectedIds.length} de {accessResources.length} permissões selecionadas.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          onClick={() => setIsPickerOpen(true)}
          disabled={accessResources.length === 0}
        >
          Selecionar permissões
        </Button>
      </div>
    </>
  )

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent size={hasCatalog ? "xl" : "lg"}>
          <ModalHeader>
            <ModalTitle>{isEditMode ? "Editar perfil" : "Novo perfil"}</ModalTitle>
            <ModalDescription>
              Define o nome, descrição e permissões deste perfil.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">Carregando…</div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">
                      Nome <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Ex: Comercial"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Descrição</label>
                    <Input
                      value={form.description}
                      onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                      placeholder="Pipeline e propostas"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={form.isRoot}
                      onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isRoot: checked }))}
                    />
                    <label className="cursor-pointer text-sm font-medium">Acesso total ao sistema</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={form.isDefault}
                      onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isDefault: checked }))}
                    />
                    <label className="cursor-pointer text-sm font-medium">Perfil padrão</label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Permissões</label>
                  {form.isRoot ? (
                    <div className="rounded-md border border-dashed border-warning/40 bg-warning/10 p-3 text-sm">
                      Perfis com acesso total não precisam de permissões específicas — podem fazer tudo no sistema.
                    </div>
                  ) : hasCatalog ? (
                    <div className="space-y-3">
                      {renderCapabilityMatrix()}
                      {renderAdvanced()}
                    </div>
                  ) : (
                    <div className="rounded-lg border bg-muted/20 p-4">{renderLegacyPicker()}</div>
                  )}
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving || loading}>
              {saving ? "Salvando…" : isEditMode ? "Salvar" : "Criar perfil"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <RolePermissionsPickerModal
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        resources={accessResources}
        selectedResourceIds={selectedIds}
        onConfirm={setSelectedIds}
      />
    </>
  )
}
