import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import type { AccessResource } from "../../services/users-management/usersManagementService"
import { Badge } from "./badge"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "./modal"

export interface RolePermissionsPickerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resources: AccessResource[]
  selectedResourceIds: number[]
  onConfirm: (ids: number[]) => void
  disabled?: boolean
}

function getActionInfo(method: string): { label: string; className: string } {
  switch (method?.toUpperCase()) {
    case "GET":
      return { label: "Consultar", className: "border-emerald-500/40 text-emerald-700 dark:text-emerald-300" }
    case "POST":
      return { label: "Criar", className: "border-blue-500/40 text-blue-700 dark:text-blue-300" }
    case "PUT":
      return { label: "Editar", className: "border-amber-500/40 text-amber-700 dark:text-amber-300" }
    case "PATCH":
      return { label: "Ajustar", className: "border-violet-500/40 text-violet-700 dark:text-violet-300" }
    case "DELETE":
      return { label: "Excluir", className: "border-red-500/40 text-red-700 dark:text-red-300" }
    default:
      return { label: method || "Outro", className: "" }
  }
}

export function RolePermissionsPickerModal({
  open,
  onOpenChange,
  resources,
  selectedResourceIds,
  onConfirm,
  disabled = false,
}: RolePermissionsPickerModalProps) {
  const [search, setSearch] = React.useState("")
  const [draftIds, setDraftIds] = React.useState<number[]>(selectedResourceIds)
  const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(new Set())

  React.useEffect(() => {
    if (open) {
      setDraftIds(selectedResourceIds)
      setSearch("")
      setCollapsedGroups(new Set())
    }
  }, [open, selectedResourceIds])

  const toggleGroupCollapsed = (groupTitle: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupTitle)) {
        next.delete(groupTitle)
      } else {
        next.add(groupTitle)
      }
      return next
    })
  }

  const normalizedSearch = search.trim().toLowerCase()

  const filteredGroups = React.useMemo(() => {
    const groups = new Map<string, AccessResource[]>()
    for (const resource of resources) {
      const key = resource.area?.trim() || resource.controller
      const list = groups.get(key) ?? []
      list.push(resource)
      groups.set(key, list)
    }

    return Array.from(groups.entries())
      .map(([groupTitle, list]) => ({
        title: groupTitle,
        resources: list
          .filter((resource) => {
            if (!normalizedSearch) {
              return true
            }
            const haystack = `${resource.name} ${resource.area ?? ''} ${resource.controller} ${resource.action} ${resource.route} ${resource.description}`.toLowerCase()
            return haystack.includes(normalizedSearch)
          })
          .sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => a.title.localeCompare(b.title))
      .filter((group) => group.resources.length > 0)
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [normalizedSearch, resources])

  const toggleResource = (resourceId: number, checked: boolean) => {
    setDraftIds((current) => {
      if (checked) {
        return current.includes(resourceId) ? current : [...current, resourceId]
      }
      return current.filter((item) => item !== resourceId)
    })
  }

  const toggleGroup = (resourceIds: number[], checked: boolean) => {
    setDraftIds((current) => {
      if (checked) {
        return Array.from(new Set([...current, ...resourceIds]))
      }
      return current.filter((item) => !resourceIds.includes(item))
    })
  }

  const handleSelectAll = () => {
    setDraftIds(resources.map((item) => item.id))
  }

  const handleClearAll = () => {
    setDraftIds([])
  }

  const handleConfirm = () => {
    onConfirm(draftIds)
    onOpenChange(false)
  }

  const collapseAll = () => {
    setCollapsedGroups(new Set(filteredGroups.map((group) => group.title)))
  }

  const expandAll = () => {
    setCollapsedGroups(new Set())
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="full" className="h-[92vh] max-w-[96vw] grid-rows-[auto_auto_minmax(0,1fr)_auto]">
        <ModalHeader>
          <ModalTitle>Selecionar permissões</ModalTitle>
        </ModalHeader>

        <div className="flex flex-col gap-4 py-4 min-h-0">
          <div className="rounded-lg border bg-muted/20 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Permissões disponíveis</p>
                <p className="text-sm text-muted-foreground">
                  Marque o que este perfil pode fazer. Mudanças afetam todos os usuários vinculados.
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end gap-1">
                <div className="text-xs text-muted-foreground">
                  {draftIds.length} de {resources.length} selecionadas
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <button type="button" className="text-primary hover:underline" onClick={handleSelectAll} disabled={disabled}>
                    Marcar tudo
                  </button>
                  <span className="text-muted-foreground">·</span>
                  <button type="button" className="text-primary hover:underline" onClick={handleClearAll} disabled={disabled}>
                    Limpar
                  </button>
                  <span className="text-muted-foreground">·</span>
                  <button type="button" className="text-primary hover:underline" onClick={expandAll}>
                    Expandir tudo
                  </button>
                  <span className="text-muted-foreground">·</span>
                  <button type="button" className="text-primary hover:underline" onClick={collapseAll}>
                    Colapsar tudo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Buscar permissão</label>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Filtrar permissões…"
              disabled={disabled}
            />
          </div>

          <div className="min-h-0 space-y-4 overflow-y-auto pr-1">
            {filteredGroups.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-sm font-medium">Nenhuma permissão encontrada</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ajuste a busca ou aguarde a sincronização das permissões do sistema.
                </p>
              </div>
            ) : (
              filteredGroups.map((group) => {
                const resourceIds = group.resources.map((resource) => resource.id)
                const totalInGroup = resourceIds.length
                const selectedInGroup = resourceIds.filter((resourceId) => draftIds.includes(resourceId)).length
                const allSelected = totalInGroup > 0 && selectedInGroup === totalInGroup
                const isCollapsed = collapsedGroups.has(group.title)

                return (
                  <div key={group.title} className="rounded-lg border bg-background">
                    <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
                      <button
                        type="button"
                        className="flex flex-1 items-center gap-2 text-left"
                        onClick={() => toggleGroupCollapsed(group.title)}
                      >
                        {isCollapsed ? (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                        <p className="text-sm font-semibold">{group.title}</p>
                        <Badge variant="outline">
                          {selectedInGroup}/{totalInGroup}
                        </Badge>
                      </button>

                      <label className="flex items-center gap-2 text-sm" onClick={(event) => event.stopPropagation()}>
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={(checked) => toggleGroup(resourceIds, checked === true)}
                          disabled={disabled}
                        />
                        Marcar grupo
                      </label>
                    </div>

                    {isCollapsed ? null : (
                      <div className="grid gap-3 px-4 py-4 md:grid-cols-2 xl:grid-cols-3">
                        {group.resources.map((resource) => {
                          const actionInfo = getActionInfo(resource.httpMethod)
                          return (
                            <label
                              key={resource.id}
                              className="flex min-w-0 items-start gap-3 rounded-md border p-3 text-sm transition-colors hover:bg-muted/30"
                            >
                              <Checkbox
                                checked={draftIds.includes(resource.id)}
                                onCheckedChange={(checked) => toggleResource(resource.id, checked === true)}
                                disabled={disabled}
                              />
                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex min-w-0 items-center gap-2">
                                  <Badge variant="outline" className={actionInfo.className}>
                                    {actionInfo.label}
                                  </Badge>
                                  <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium" title={resource.action || resource.name}>
                                    {resource.action || resource.name}
                                  </span>
                                </div>
                                {resource.description ? (
                                  <p className="text-xs text-muted-foreground" title={resource.description}>
                                    {resource.description}
                                  </p>
                                ) : null}
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm} disabled={disabled}>
            Aplicar permissões
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
