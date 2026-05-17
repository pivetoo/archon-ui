import * as React from "react"
import {
  UsersManagementService,
  type AccessResource,
  type CreateRolePayload,
  type UpdateRolePayload,
} from "../../services/users-management/usersManagementService"
import { Button } from "./button"
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
}

export interface RoleFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleId: number | null
  initialData?: RoleFormInitialData | null
  accessResources: AccessResource[]
  onSaved: () => void
}

interface FormState {
  name: string
  description: string
  isRoot: boolean
  isDefault: boolean
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

export function RoleFormModal({ open, onOpenChange, roleId, initialData, accessResources, onSaved }: RoleFormModalProps) {
  const { toast } = useToast()
  const isEditMode = roleId !== null

  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [selectedIds, setSelectedIds] = React.useState<number[]>([])
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [isPickerOpen, setIsPickerOpen] = React.useState(false)

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
      } else {
        setForm(emptyForm)
        setSelectedIds([])
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

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({
        variant: "destructive",
        title: "Nome obrigatório",
        description: "Informe um nome para o perfil.",
      })
      return
    }

    setSaving(true)
    try {
      if (isEditMode && roleId !== null) {
        const payload: UpdateRolePayload = {
          name: form.name.trim(),
          description: form.description.trim(),
          isRoot: form.isRoot,
          isDefault: form.isDefault,
          accessResourceIds: selectedIds,
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

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent size="lg">
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
                  <div className="rounded-lg border bg-muted/20 p-4">
                    {form.isRoot ? (
                      <div className="rounded-md border border-dashed border-warning/40 bg-warning/10 p-3 text-sm">
                        Perfis com acesso total não precisam de permissões específicas — podem fazer tudo no sistema.
                      </div>
                    ) : (
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
                    )}
                  </div>
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
