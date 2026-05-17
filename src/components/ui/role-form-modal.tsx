import * as React from "react"
import { Search } from "lucide-react"
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
import { useToast } from "./use-toast"

export interface RoleFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleId: number | null
  onSaved: () => void
}

interface FormState {
  name: string
  description: string
  isRoot: boolean
  isDefault: boolean
  selected: Set<number>
}

const emptyForm: FormState = {
  name: "",
  description: "",
  isRoot: false,
  isDefault: false,
  selected: new Set<number>(),
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

export function RoleFormModal({ open, onOpenChange, roleId, onSaved }: RoleFormModalProps) {
  const { toast } = useToast()
  const isEditMode = roleId !== null

  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [accessResources, setAccessResources] = React.useState<AccessResource[]>([])
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const loadInitialData = React.useCallback(async () => {
    setLoading(true)
    try {
      const resources = await UsersManagementService.listAccessResources()
      setAccessResources(resources)

      if (isEditMode && roleId !== null) {
        const role = await UsersManagementService.getRoleById(roleId)
        setForm({
          name: role.name,
          description: role.description ?? "",
          isRoot: role.isRoot,
          isDefault: role.isDefault,
          selected: new Set(role.accessResourceIds ?? []),
        })
      } else {
        setForm(emptyForm)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao carregar perfil",
        description: getApiErrorMessage(error, "Tente novamente."),
      })
    } finally {
      setLoading(false)
    }
  }, [isEditMode, roleId, toast])

  React.useEffect(() => {
    if (open) {
      setSearch("")
      void loadInitialData()
    }
  }, [open, loadInitialData])

  const grouped = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    const map = new Map<string, AccessResource[]>()
    for (const resource of accessResources) {
      if (term) {
        const haystack = `${resource.controller} ${resource.action} ${resource.name} ${resource.description}`.toLowerCase()
        if (!haystack.includes(term)) {
          continue
        }
      }
      const list = map.get(resource.controller) ?? []
      list.push(resource)
      map.set(resource.controller, list)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [accessResources, search])

  const toggleResource = (id: number) => {
    setForm((prev) => {
      const next = new Set(prev.selected)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return { ...prev, selected: next }
    })
  }

  const toggleAllInGroup = (resources: AccessResource[]) => {
    setForm((prev) => {
      const next = new Set(prev.selected)
      const allSelected = resources.every((item) => next.has(item.id))
      if (allSelected) {
        for (const item of resources) {
          next.delete(item.id)
        }
      } else {
        for (const item of resources) {
          next.add(item.id)
        }
      }
      return { ...prev, selected: next }
    })
  }

  const selectAll = () => {
    setForm((prev) => ({ ...prev, selected: new Set(accessResources.map((item) => item.id)) }))
  }

  const clearAll = () => {
    setForm((prev) => ({ ...prev, selected: new Set() }))
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

    setSaving(true)
    try {
      const accessResourceIds = Array.from(form.selected)

      if (isEditMode && roleId !== null) {
        const payload: UpdateRolePayload = {
          name: form.name.trim(),
          description: form.description.trim(),
          isRoot: form.isRoot,
          isDefault: form.isDefault,
          accessResourceIds,
        }
        await UsersManagementService.updateRole(roleId, payload)
        toast({ variant: "success", title: "Perfil atualizado", description: form.name })
      } else {
        const payload: CreateRolePayload = {
          name: form.name.trim(),
          description: form.description.trim(),
          isRoot: form.isRoot,
          isDefault: form.isDefault,
          accessResourceIds,
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
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="xl">
        <ModalHeader>
          <ModalTitle>{isEditMode ? "Editar perfil" : "Novo perfil"}</ModalTitle>
          <ModalDescription>
            Define o nome, descrição e permissões deste perfil. Mudanças afetam todos os usuários vinculados.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">Carregando…</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Nome *</label>
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

              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.isRoot}
                    onChange={(event) => setForm((prev) => ({ ...prev, isRoot: event.target.checked }))}
                    className="h-4 w-4 rounded border-border"
                  />
                  Perfil root (ignora verificação de permissões)
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(event) => setForm((prev) => ({ ...prev, isDefault: event.target.checked }))}
                    className="h-4 w-4 rounded border-border"
                  />
                  Perfil padrão (sugerido em novos usuários)
                </label>
              </div>

              <div className="rounded-lg border border-border/70 bg-muted/10 p-3">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold">Permissões</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">
                      {form.selected.size} de {accessResources.length} selecionadas
                    </span>
                    <button type="button" className="text-primary hover:underline" onClick={selectAll}>
                      Marcar tudo
                    </button>
                    <span className="text-muted-foreground">·</span>
                    <button type="button" className="text-primary hover:underline" onClick={clearAll}>
                      Limpar
                    </button>
                  </div>
                </div>

                <div className="relative mb-3">
                  <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Filtrar permissões…"
                    className="pl-8"
                  />
                </div>

                <div className="max-h-[420px] overflow-y-auto pr-1">
                  {form.isRoot ? (
                    <div className="rounded-md border border-dashed border-warning/40 bg-warning/10 p-3 text-sm text-warning-foreground">
                      Perfis root ignoram a lista de permissões e têm acesso a tudo.
                    </div>
                  ) : grouped.length === 0 ? (
                    <div className="rounded-md border border-dashed border-border bg-muted/20 p-3 text-sm text-muted-foreground">
                      Nenhuma permissão encontrada.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {grouped.map(([controller, resources]) => {
                        const allSelected = resources.every((item) => form.selected.has(item.id))
                        const someSelected = !allSelected && resources.some((item) => form.selected.has(item.id))
                        return (
                          <div key={controller} className="rounded-md border border-border/60 bg-background">
                            <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
                              <label className="inline-flex items-center gap-2 text-sm font-semibold">
                                <input
                                  type="checkbox"
                                  checked={allSelected}
                                  ref={(input) => {
                                    if (input) {
                                      input.indeterminate = someSelected
                                    }
                                  }}
                                  onChange={() => toggleAllInGroup(resources)}
                                  className="h-4 w-4 rounded border-border"
                                />
                                {controller}
                              </label>
                              <span className="text-xs text-muted-foreground">
                                {resources.filter((item) => form.selected.has(item.id)).length}/{resources.length}
                              </span>
                            </div>
                            <ul className="divide-y divide-border/40">
                              {resources.map((resource) => (
                                <li key={resource.id} className="flex items-start gap-3 px-3 py-2">
                                  <input
                                    type="checkbox"
                                    checked={form.selected.has(resource.id)}
                                    onChange={() => toggleResource(resource.id)}
                                    className="mt-0.5 h-4 w-4 rounded border-border"
                                    id={`perm-${resource.id}`}
                                  />
                                  <label htmlFor={`perm-${resource.id}`} className="flex-1 cursor-pointer">
                                    <div className="text-sm font-medium text-foreground">{resource.action}</div>
                                    {resource.description ? (
                                      <div className="text-xs text-muted-foreground">{resource.description}</div>
                                    ) : null}
                                    <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                                      {resource.httpMethod} {resource.route}
                                    </div>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
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
  )
}
