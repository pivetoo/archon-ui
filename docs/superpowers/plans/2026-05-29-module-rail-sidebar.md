# Sidebar por módulos (rail + painel) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar ao `archon-ui` uma navegação opt-in "rail de ícones (64px) + painel de rotas persistente" agrupada por módulos, adotada apenas no Kanvas, sem alterar o comportamento da `Sidebar` plana atual nem dos outros sistemas.

**Architecture:** Novos componentes (`ModuleRail`, `ModulePanel`, `ModuleNavMobile`) + hook `useModuleNav` no `archon-ui`. O `AppLayout` ganha `navMode?: 'flat' | 'module-rail'` (default `flat`, caminho atual intacto) e `moduleNav?: ModuleNavConfig`; quando `module-rail`, renderiza rail+painel no lugar da `Sidebar`, ajusta o offset da `Navbar`/`main` e oculta o module-switcher da navbar. O Kanvas monta o `moduleNav` reaproveitando seus defs e o filtro de permissão.

**Tech Stack:** React 18 + TypeScript, Tailwind (tokens `bg-card`/`text-primary`/etc.), lucide-react, react-router-dom. Sem runner de teste unitário no `archon-ui` (verificação = `tsc -b` + `vite build` + `eslint` + checagem visual). Kanvas consome `archon-ui` via `file:` symlink para `dist/` → **rebuild do `archon-ui` é obrigatório antes de buildar/rodar o Kanvas**.

**Repos git (commits separados):**
- `archon-ui`: `/mnt/c/development/web-projects/frameworks/archon-ui`
- Kanvas: `/mnt/c/development/web-projects/system/agency-campaign-os` (app web em `AgencyCampaign/AgencyCampaign.Web`)

**Convenções de commit:** pt-BR, prefixo semântico (`feat`/`fix`/`refactor`), sem emojis, **sem `Co-Authored-By`**. Trabalhar na branch `main` (convenção do projeto). Imports sempre em uma única linha.

---

## File Structure

`archon-ui` (`src/`):
- `components/ui/module-nav/types.ts` — tipos `NavRoute`/`NavSubGroup`/`NavModule`/`ModuleNavConfig`/`ModuleColor`.
- `components/ui/module-nav/module-colors.ts` — mapa `MODULE_COLORS` (classes Tailwind por cor, dark-safe).
- `components/ui/module-nav/module-panel.tsx` — `ModulePanel` (painel de rotas: plano ou sub-grupos).
- `components/ui/module-nav/module-rail.tsx` — `ModuleRail` (rail de ícones de módulo).
- `components/ui/module-nav/module-nav-mobile.tsx` — `ModuleNavMobile` (drawer acordeão no mobile).
- `components/ui/module-nav/index.ts` — barrel do módulo.
- `hooks/useModuleNav.ts` — derivação de módulo ativo, persistência de colapsado, lógica de clique.
- `components/ui/index.ts` — `export * from './module-nav'`.
- `hooks/index.ts` — `export * from './useModuleNav'`.
- `components/ui/navbar.tsx` — +1 prop opcional `leftOffset?: number` (backward-compatible).
- `components/ui/app-layout.tsx` — props `navMode`/`moduleNav` + branch de render.

Kanvas (`AgencyCampaign/AgencyCampaign.Web/src/`):
- `layouts/AgencyCampaignLayout.tsx` — monta `moduleNav`, passa `navMode="module-rail"`, remove o switcher da navbar.

---

## Task 1: Tipos, paleta de cores e docs

**Files:**
- Create: `frameworks/archon-ui/src/components/ui/module-nav/types.ts`
- Create: `frameworks/archon-ui/src/components/ui/module-nav/module-colors.ts`
- (Docs já criados: `docs/superpowers/specs/2026-05-29-module-rail-sidebar-design.md`, `docs/superpowers/plans/2026-05-29-module-rail-sidebar.md`)

- [ ] **Step 1: Criar `types.ts`**

```ts
import type * as React from 'react'

export type ModuleColor = 'primary' | 'cyan' | 'purple' | 'green' | 'muted'

export interface NavRoute {
  key: string
  label: string
  path: string
  icon: React.ReactNode
  badge?: number
}

export interface NavSubGroup {
  label: string
  routes: NavRoute[]
}

export interface NavModule {
  key: string
  label: string
  icon: React.ReactNode
  color: ModuleColor
  group: 'op' | 'sys'
  routes?: NavRoute[]
  subGroups?: NavSubGroup[]
}

export type ModuleNavConfig = NavModule[]
```

Nota: o filtro de permissão acontece no consumidor (Kanvas) antes de montar o `ModuleNavConfig`. O componente compartilhado recebe módulos já filtrados.

- [ ] **Step 2: Criar `module-colors.ts`**

```ts
import type { ModuleColor } from './types'

export interface ModuleColorClasses {
  icon: string
  activeBg: string
  activeText: string
  bar: string
}

export const MODULE_COLORS: Record<ModuleColor, ModuleColorClasses> = {
  primary: { icon: 'text-primary', activeBg: 'bg-primary/10', activeText: 'text-primary', bar: 'bg-primary' },
  cyan: { icon: 'text-cyan-600 dark:text-cyan-400', activeBg: 'bg-cyan-500/10', activeText: 'text-cyan-700 dark:text-cyan-300', bar: 'bg-cyan-500' },
  purple: { icon: 'text-purple-600 dark:text-purple-400', activeBg: 'bg-purple-500/10', activeText: 'text-purple-700 dark:text-purple-300', bar: 'bg-purple-500' },
  green: { icon: 'text-emerald-600 dark:text-emerald-400', activeBg: 'bg-emerald-500/10', activeText: 'text-emerald-700 dark:text-emerald-300', bar: 'bg-emerald-500' },
  muted: { icon: 'text-muted-foreground', activeBg: 'bg-accent', activeText: 'text-foreground', bar: 'bg-muted-foreground' },
}
```

- [ ] **Step 3: Typecheck**

Run: `cd /mnt/c/development/web-projects/frameworks/archon-ui && npx tsc -b`
Expected: sem erros (os arquivos novos compilam; ainda não são importados em lugar nenhum).

- [ ] **Step 4: Commit**

```bash
git -C /mnt/c/development/web-projects/frameworks/archon-ui add src/components/ui/module-nav/types.ts src/components/ui/module-nav/module-colors.ts docs/superpowers/specs/2026-05-29-module-rail-sidebar-design.md docs/superpowers/plans/2026-05-29-module-rail-sidebar.md
git -C /mnt/c/development/web-projects/frameworks/archon-ui commit -m "feat: tipos e paleta da navegacao por modulos (rail + painel)"
```

---

## Task 2: Hook `useModuleNav` + helpers puros

**Files:**
- Create: `frameworks/archon-ui/src/hooks/useModuleNav.ts`
- Modify: `frameworks/archon-ui/src/hooks/index.ts`

- [ ] **Step 1: Criar `useModuleNav.ts`**

```ts
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ModuleNavConfig, NavModule, NavRoute } from '../components/ui/module-nav/types'

const COLLAPSE_KEY = 'archon:moduleNav:collapsed'

export function moduleRoutes(module: NavModule): NavRoute[] {
  if (module.routes) return module.routes
  if (module.subGroups) return module.subGroups.flatMap((g) => g.routes)
  return []
}

export function isSingleRouteModule(module: NavModule): boolean {
  return moduleRoutes(module).length === 1
}

export function routeMatches(routePath: string, pathname: string): boolean {
  if (pathname === routePath) return true
  if (routePath !== '/' && pathname.startsWith(`${routePath}/`)) return true
  return false
}

export function deriveActiveRoutePath(modules: ModuleNavConfig, pathname: string): string | null {
  let bestPath: string | null = null
  for (const m of modules) {
    for (const r of moduleRoutes(m)) {
      if (routeMatches(r.path, pathname) && (bestPath === null || r.path.length > bestPath.length)) {
        bestPath = r.path
      }
    }
  }
  return bestPath
}

export function deriveActiveModuleKey(modules: ModuleNavConfig, pathname: string): string | null {
  let bestKey: string | null = null
  let bestLen = -1
  for (const m of modules) {
    for (const r of moduleRoutes(m)) {
      if (routeMatches(r.path, pathname) && r.path.length > bestLen) {
        bestLen = r.path.length
        bestKey = m.key
      }
    }
  }
  return bestKey
}

function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(COLLAPSE_KEY) === '1'
  } catch {
    return false
  }
}

export function useModuleNav(modules: ModuleNavConfig) {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const activeModuleKey = useMemo(() => deriveActiveModuleKey(modules, pathname), [modules, pathname])
  const activeRoutePath = useMemo(() => deriveActiveRoutePath(modules, pathname), [modules, pathname])

  const [collapsed, setCollapsedState] = useState<boolean>(readCollapsed)
  const [openModuleKey, setOpenModuleKey] = useState<string | null>(activeModuleKey)

  useEffect(() => {
    if (activeModuleKey) setOpenModuleKey(activeModuleKey)
  }, [activeModuleKey])

  const setCollapsed = useCallback((value: boolean) => {
    setCollapsedState(value)
    try {
      window.localStorage.setItem(COLLAPSE_KEY, value ? '1' : '0')
    } catch {
      // localStorage indisponivel — ignora persistencia
    }
  }, [])

  const toggleCollapsed = useCallback(() => setCollapsed(!collapsed), [collapsed, setCollapsed])

  const handleModuleClick = useCallback((moduleKey: string) => {
    const navModule = modules.find((m) => m.key === moduleKey)
    if (!navModule) return
    const routes = moduleRoutes(navModule)
    if (routes.length === 1) {
      navigate(routes[0].path)
      return
    }
    setOpenModuleKey(moduleKey)
    setCollapsed(false)
  }, [modules, navigate, setCollapsed])

  const openModule = useMemo(() => modules.find((m) => m.key === openModuleKey) ?? null, [modules, openModuleKey])
  const panelOpen = !collapsed && !!openModule && !isSingleRouteModule(openModule)

  return { activeModuleKey, activeRoutePath, openModule, panelOpen, collapsed, setCollapsed, toggleCollapsed, handleModuleClick, navigate }
}
```

- [ ] **Step 2: Exportar no barrel de hooks**

Em `frameworks/archon-ui/src/hooks/index.ts`, adicionar a linha:

```ts
export * from "./useModuleNav"
```

- [ ] **Step 3: Conferência manual da lógica (sem runner de teste no repo)**

Validar mentalmente com a config do Kanvas (Task 7):
- `pathname='/configuracao/integracoes'` → casa `/configuracao` (Configuração) E `/configuracao/integracoes` (Integrações); maior path vence → módulo **integracoes**. OK.
- `pathname='/campanhas/123'` → casa `/campanhas` (Produção) via prefixo `/`. OK.
- `pathname='/'` → casa só `/` (Geral). OK.
- Módulo Geral (1 rota) → `isSingleRouteModule` true → `handleModuleClick('geral')` navega para `/` sem abrir painel. OK.

- [ ] **Step 4: Typecheck**

Run: `cd /mnt/c/development/web-projects/frameworks/archon-ui && npx tsc -b`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git -C /mnt/c/development/web-projects/frameworks/archon-ui add src/hooks/useModuleNav.ts src/hooks/index.ts
git -C /mnt/c/development/web-projects/frameworks/archon-ui commit -m "feat: hook useModuleNav para derivar modulo ativo e estado do painel"
```

---

## Task 3: Componente `ModulePanel`

**Files:**
- Create: `frameworks/archon-ui/src/components/ui/module-nav/module-panel.tsx`

- [ ] **Step 1: Criar `module-panel.tsx`**

```tsx
import * as React from 'react'
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { MODULE_COLORS } from './module-colors'
import type { NavModule, NavRoute } from './types'
import { routeMatches } from '../../../hooks/useModuleNav'

export interface ModulePanelProps {
  module: NavModule
  activeRoutePath: string | null
  onRouteClick: (path: string) => void
  onCollapse: () => void
}

const RouteButton: React.FC<{ route: NavRoute; active: boolean; colorKey: NavModule['color']; onClick: () => void }> = ({ route, active, colorKey, onClick }) => {
  const colors = MODULE_COLORS[colorKey]
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex w-full items-center gap-3 rounded-md px-3 py-2 my-0.5 text-sm font-medium transition-colors text-muted-foreground',
        'hover:bg-accent dark:hover:bg-accent/80 hover:text-foreground',
        active && cn(colors.activeBg, colors.activeText, 'font-semibold')
      )}
    >
      {active && <span className={cn('absolute left-0 top-0 bottom-0 w-[3px] rounded-r', colors.bar)} />}
      <span className={cn('flex items-center justify-center w-5 h-5 flex-shrink-0', active && colors.icon)}>{route.icon}</span>
      <span className="flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">{route.label}</span>
      {route.badge != null && route.badge > 0 && (
        <span className="ml-auto min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
          {route.badge > 9 ? '9+' : route.badge}
        </span>
      )}
    </button>
  )
}

export const ModulePanel: React.FC<ModulePanelProps> = ({ module, activeRoutePath, onRouteClick, onCollapse }) => {
  const colors = MODULE_COLORS[module.color]
  const initialExpanded = React.useMemo(() => {
    const map: Record<string, boolean> = {}
    module.subGroups?.forEach((g) => { map[g.label] = true })
    return map
  }, [module])
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(initialExpanded)
  React.useEffect(() => { setExpanded(initialExpanded) }, [initialExpanded])

  const isRouteActive = (route: NavRoute) => activeRoutePath != null && routeMatches(route.path, activeRoutePath)

  return (
    <nav
      className="fixed left-[64px] top-0 h-screen w-[232px] bg-card border-r border-border flex flex-col z-40 shadow-sm transition-all duration-300"
      aria-label={module.label}
    >
      <div className="flex items-center justify-between min-h-[60px] px-4 border-b border-border/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={cn('flex items-center justify-center w-7 h-7 rounded-md', colors.activeBg, colors.icon)}>{module.icon}</span>
          <span className="font-semibold text-base text-foreground tracking-tight truncate">{module.label}</span>
        </div>
        <button
          type="button"
          onClick={onCollapse}
          aria-label="Recolher menu lateral"
          className="w-6 h-6 rounded-sm border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent dark:hover:bg-accent/80 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 scrollbar-hide">
        {module.routes?.map((route) => (
          <RouteButton key={route.key} route={route} active={isRouteActive(route)} colorKey={module.color} onClick={() => onRouteClick(route.path)} />
        ))}

        {module.subGroups?.map((group) => {
          const isOpen = expanded[group.label] !== false
          return (
            <div key={group.label} className="mb-3">
              <button
                type="button"
                onClick={() => setExpanded((prev) => ({ ...prev, [group.label]: !isOpen }))}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-3 py-1 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <span>{group.label}</span>
                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {isOpen && group.routes.map((route) => (
                <RouteButton key={route.key} route={route} active={isRouteActive(route)} colorKey={module.color} onClick={() => onRouteClick(route.path)} />
              ))}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

ModulePanel.displayName = 'ModulePanel'
```

- [ ] **Step 2: Typecheck**

Run: `cd /mnt/c/development/web-projects/frameworks/archon-ui && npx tsc -b`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git -C /mnt/c/development/web-projects/frameworks/archon-ui add src/components/ui/module-nav/module-panel.tsx
git -C /mnt/c/development/web-projects/frameworks/archon-ui commit -m "feat: ModulePanel com rotas planas e sub-grupos"
```

---

## Task 4: `ModuleRail`, `ModuleNavMobile` e barrel

**Files:**
- Create: `frameworks/archon-ui/src/components/ui/module-nav/module-rail.tsx`
- Create: `frameworks/archon-ui/src/components/ui/module-nav/module-nav-mobile.tsx`
- Create: `frameworks/archon-ui/src/components/ui/module-nav/index.ts`
- Modify: `frameworks/archon-ui/src/components/ui/index.ts`

- [ ] **Step 1: Criar `module-rail.tsx`**

```tsx
import * as React from 'react'
import { cn } from '../../../lib/utils'
import { MODULE_COLORS } from './module-colors'
import { moduleRoutes } from '../../../hooks/useModuleNav'
import type { ModuleNavConfig, NavModule } from './types'

export interface ModuleRailProps {
  modules: ModuleNavConfig
  activeModuleKey: string | null
  onModuleClick: (key: string) => void
  brand?: React.ReactNode
}

const RailModule: React.FC<{ module: NavModule; active: boolean; onClick: () => void }> = ({ module, active, onClick }) => {
  const colors = MODULE_COLORS[module.color]
  const hasBadge = moduleRoutes(module).some((r) => r.badge != null && r.badge > 0)
  return (
    <div className="relative w-full flex justify-center group">
      <button
        type="button"
        onClick={onClick}
        aria-label={module.label}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors',
          active ? cn(colors.activeBg, colors.icon) : 'text-muted-foreground hover:bg-accent dark:hover:bg-accent/80'
        )}
      >
        <span className="w-5 h-5 flex items-center justify-center">{module.icon}</span>
        {active && <span className={cn('absolute -left-2.5 top-2.5 w-[3px] h-[22px] rounded', colors.bar)} />}
        {hasBadge && <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-destructive border-[1.5px] border-card" />}
      </button>
      <span className="pointer-events-none absolute left-[56px] top-2.5 z-50 hidden group-hover:block whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-semibold text-background shadow-md">
        {module.label}
      </span>
    </div>
  )
}

export const ModuleRail: React.FC<ModuleRailProps> = ({ modules, activeModuleKey, onModuleClick, brand }) => {
  const opModules = modules.filter((m) => m.group === 'op')
  const sysModules = modules.filter((m) => m.group === 'sys')
  return (
    <aside className="fixed left-0 top-0 h-screen w-[64px] bg-card border-r border-border flex flex-col items-center z-40 shadow-sm">
      <div className="min-h-[60px] w-full flex items-center justify-center border-b border-border/60">
        {brand}
      </div>
      <div className="pt-3 w-full flex flex-col items-center gap-1.5">
        {opModules.map((m) => (
          <RailModule key={m.key} module={m} active={m.key === activeModuleKey} onClick={() => onModuleClick(m.key)} />
        ))}
      </div>
      {sysModules.length > 0 && <div className="w-7 h-px bg-border my-2.5" />}
      <div className="w-full flex flex-col items-center gap-1.5">
        {sysModules.map((m) => (
          <RailModule key={m.key} module={m} active={m.key === activeModuleKey} onClick={() => onModuleClick(m.key)} />
        ))}
      </div>
      <div className="flex-1" />
    </aside>
  )
}

ModuleRail.displayName = 'ModuleRail'
```

- [ ] **Step 2: Criar `module-nav-mobile.tsx`**

```tsx
import * as React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { MODULE_COLORS } from './module-colors'
import { moduleRoutes, routeMatches } from '../../../hooks/useModuleNav'
import type { ModuleNavConfig, NavModule, NavRoute } from './types'

export interface ModuleNavMobileProps {
  modules: ModuleNavConfig
  activeModuleKey: string | null
  activeRoutePath: string | null
  isOpen: boolean
  onClose: () => void
  onRouteClick: (path: string) => void
  brand?: React.ReactNode
}

export const ModuleNavMobile: React.FC<ModuleNavMobileProps> = ({ modules, activeModuleKey, activeRoutePath, isOpen, onClose, onRouteClick, brand }) => {
  const [expandedKey, setExpandedKey] = React.useState<string | null>(activeModuleKey)
  React.useEffect(() => { setExpandedKey(activeModuleKey) }, [activeModuleKey])

  const handleRoute = (path: string) => { onRouteClick(path); onClose() }
  const isRouteActive = (route: NavRoute) => activeRoutePath != null && routeMatches(route.path, activeRoutePath)

  const renderModule = (module: NavModule) => {
    const colors = MODULE_COLORS[module.color]
    const routes = moduleRoutes(module)
    const single = routes.length === 1
    const isOpenModule = expandedKey === module.key
    return (
      <div key={module.key} className="border-b border-border/60">
        <button
          type="button"
          onClick={() => (single ? handleRoute(routes[0].path) : setExpandedKey(isOpenModule ? null : module.key))}
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent dark:hover:bg-accent/80 transition-colors"
        >
          <span className={cn('flex items-center justify-center w-7 h-7 rounded-md', colors.activeBg, colors.icon)}>{module.icon}</span>
          <span className="flex-1 font-semibold text-sm text-foreground">{module.label}</span>
          {!single && (isOpenModule ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />)}
        </button>
        {!single && isOpenModule && (
          <div className="pb-2">
            {routes.map((route) => (
              <button
                key={route.key}
                type="button"
                onClick={() => handleRoute(route.path)}
                aria-current={isRouteActive(route) ? 'page' : undefined}
                className={cn(
                  'w-full flex items-center gap-3 pl-12 pr-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent dark:hover:bg-accent/80 transition-colors',
                  isRouteActive(route) && cn(colors.activeBg, colors.activeText, 'font-semibold')
                )}
              >
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{route.icon}</span>
                <span className="flex-1 text-left">{route.label}</span>
                {route.badge != null && route.badge > 0 && (
                  <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">{route.badge > 9 ? '9+' : route.badge}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[110] bg-black/40" onClick={onClose} />}
      <aside
        className={cn('fixed left-0 top-0 h-screen w-[280px] bg-card flex flex-col z-[120] shadow-sm transition-transform duration-300', isOpen ? 'translate-x-0' : '-translate-x-full')}
      >
        <div className="min-h-[60px] flex items-center px-4 border-b border-border/60">{brand}</div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {modules.map(renderModule)}
        </div>
      </aside>
    </>
  )
}

ModuleNavMobile.displayName = 'ModuleNavMobile'
```

- [ ] **Step 3: Criar barrel `module-nav/index.ts`**

```ts
export * from './types'
export * from './module-colors'
export * from './module-panel'
export * from './module-rail'
export * from './module-nav-mobile'
```

- [ ] **Step 4: Exportar no barrel de UI**

Em `frameworks/archon-ui/src/components/ui/index.ts`, adicionar (junto às outras linhas `export * from './...'`):

```ts
export * from './module-nav'
```

- [ ] **Step 5: Typecheck**

Run: `cd /mnt/c/development/web-projects/frameworks/archon-ui && npx tsc -b`
Expected: sem erros.

- [ ] **Step 6: Commit**

```bash
git -C /mnt/c/development/web-projects/frameworks/archon-ui add src/components/ui/module-nav/module-rail.tsx src/components/ui/module-nav/module-nav-mobile.tsx src/components/ui/module-nav/index.ts src/components/ui/index.ts
git -C /mnt/c/development/web-projects/frameworks/archon-ui commit -m "feat: ModuleRail e drawer mobile da navegacao por modulos"
```

---

## Task 5: Integrar no `AppLayout` + prop `leftOffset` na `Navbar`

**Files:**
- Modify: `frameworks/archon-ui/src/components/ui/navbar.tsx` (interface + cálculo de `left`)
- Modify: `frameworks/archon-ui/src/components/ui/app-layout.tsx`

- [ ] **Step 1: `Navbar` — adicionar prop `leftOffset`**

Em `navbar.tsx`, na interface `NavbarProps` (após `isCollapsed?: boolean`), adicionar:

```ts
  leftOffset?: number
```

Adicionar `leftOffset` à desestruturação dos props (junto de `isCollapsed = false`):

```ts
      isCollapsed = false,
      leftOffset,
```

Trocar o `style.left` do `<nav>` (atualmente `left: isMobile ? "0" : (isCollapsed ? "64px" : "220px")`) por:

```ts
          left: isMobile ? "0" : (leftOffset != null ? `${leftOffset}px` : (isCollapsed ? "64px" : "220px")),
```

(Backward-compatible: sem `leftOffset`, comportamento idêntico.)

- [ ] **Step 2: `AppLayout` — imports, props e branch**

Substituir o conteúdo de `app-layout.tsx` por:

```tsx
import * as React from "react"
import { cn } from "../../lib/utils"
import { Sidebar } from "../ui/sidebar"
import { Navbar, type Module, type NotificationItem } from "../ui/navbar"
import type { SidebarItemData, SidebarGroup, SidebarHeaderMode } from "../ui/sidebar"
import type { BreadcrumbItem } from "../ui/breadcrumb"
import { ModuleRail } from "../ui/module-nav/module-rail"
import { ModulePanel } from "../ui/module-nav/module-panel"
import { ModuleNavMobile } from "../ui/module-nav/module-nav-mobile"
import type { ModuleNavConfig } from "../ui/module-nav/types"
import { useModuleNav } from "../../hooks/useModuleNav"

export type { BreadcrumbItem, SidebarItemData, SidebarGroup, SidebarHeaderMode, Module }

export type NavMode = 'flat' | 'module-rail'

const EMPTY_MODULE_NAV: ModuleNavConfig = []

export interface AppLayoutProps {
  title: string
  titleStyle?: React.CSSProperties
  titleClassName?: string
  subtitle?: string
  navbarCompanyName?: string
  logo?: React.ReactNode
  user: {
    name: string
    email: string
    username?: string
    role?: string
    avatarUrl?: string
    preferredLanguage?: string
    lastLoginAt?: string
  }
  menuItems?: SidebarItemData[]
  menuGroups?: SidebarGroup[]
  navMode?: NavMode
  moduleNav?: ModuleNavConfig
  initialCollapsed?: boolean
  onLogout?: () => void
  notifications?: NotificationItem[]
  onNotificationRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onClearAllNotifications?: () => void
  onViewAllNotifications?: () => void
  breadcrumbs?: BreadcrumbItem[]
  modules?: Module[]
  currentModule?: string
  onModuleChange?: (moduleId: string) => void
  profilePath?: string
  onProfileNavigate?: (path: string) => void
  onAvatarUpload?: (file: File) => Promise<string>
  onLogoClick?: () => void
  companyLogo?: string
  headerMode?: SidebarHeaderMode
  headerLogo?: string
  headerLogoCollapsed?: string
  children?: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  subtitle,
  navbarCompanyName,
  logo,
  user,
  menuItems = [],
  menuGroups = [],
  navMode = 'flat',
  moduleNav,
  initialCollapsed = true,
  onLogout,
  notifications,
  onNotificationRead,
  onMarkAllAsRead,
  onClearAllNotifications,
  onViewAllNotifications,
  breadcrumbs = [],
  modules,
  currentModule,
  onModuleChange,
  profilePath,
  onProfileNavigate,
  onAvatarUpload,
  onLogoClick,
  companyLogo,
  headerMode,
  headerLogo,
  headerLogoCollapsed,
  titleStyle,
  titleClassName,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed)
  const [isMobile, setIsMobile] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const useRail = navMode === 'module-rail' && !!moduleNav && moduleNav.length > 0
  const mn = useModuleNav(moduleNav ?? EMPTY_MODULE_NAV)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)")
    const syncMobile = () => {
      setIsMobile(mediaQuery.matches)
      if (!mediaQuery.matches) {
        setIsMobileMenuOpen(false)
      }
    }

    syncMobile()
    mediaQuery.addEventListener("change", syncMobile)
    return () => mediaQuery.removeEventListener("change", syncMobile)
  }, [])

  React.useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }

    document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobile, isMobileMenuOpen])

  const leftWidth = isMobile ? 0 : (useRail ? (mn.panelOpen ? 296 : 64) : (isCollapsed ? 64 : 220))

  const handleRouteClick = (path: string) => {
    mn.navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-background">
      {useRail ? (
        <>
          {!isMobile && (
            <>
              <ModuleRail
                modules={moduleNav!}
                activeModuleKey={mn.activeModuleKey}
                onModuleClick={mn.handleModuleClick}
                brand={logo}
              />
              {mn.panelOpen && mn.openModule && (
                <ModulePanel
                  module={mn.openModule}
                  activeRoutePath={mn.activeRoutePath}
                  onRouteClick={(path) => mn.navigate(path)}
                  onCollapse={() => mn.setCollapsed(true)}
                />
              )}
            </>
          )}
          {isMobile && (
            <ModuleNavMobile
              modules={moduleNav!}
              activeModuleKey={mn.activeModuleKey}
              activeRoutePath={mn.activeRoutePath}
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              onRouteClick={handleRouteClick}
              brand={logo}
            />
          )}
        </>
      ) : (
        <Sidebar
          title={title}
          titleStyle={titleStyle}
          titleClassName={titleClassName}
          subtitle={subtitle}
          logo={logo}
          items={menuItems}
          groups={menuGroups}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onLogout={onLogout}
          onLogoClick={onLogoClick}
          companyLogo={companyLogo}
          headerMode={headerMode}
          headerLogo={headerLogo}
          headerLogoCollapsed={headerLogoCollapsed}
          isMobile={isMobile}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Navbar
        isCollapsed={isCollapsed}
        leftOffset={leftWidth}
        isMobile={isMobile}
        onMobileMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)}
        breadcrumbs={breadcrumbs}
        user={{
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
          avatarUrl: user.avatarUrl,
          preferredLanguage: user.preferredLanguage,
          lastLoginAt: user.lastLoginAt,
        }}
        companyName={navbarCompanyName ?? subtitle}
        notifications={notifications}
        onNotificationRead={onNotificationRead}
        onMarkAllAsRead={onMarkAllAsRead}
        onClearAllNotifications={onClearAllNotifications}
        onViewAllNotifications={onViewAllNotifications}
        modules={useRail ? undefined : modules}
        currentModule={useRail ? undefined : currentModule}
        onModuleChange={useRail ? undefined : onModuleChange}
        profilePath={profilePath}
        onProfileNavigate={onProfileNavigate}
        onAvatarUpload={onAvatarUpload}
        onLogout={onLogout}
      />

      <main
        className="transition-all duration-300 pt-[52px] min-h-screen"
        style={{ marginLeft: leftWidth }}
      >
        <div className="w-full h-full p-3 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
```

Observação de não-regressão: no modo `flat`, `leftWidth` reproduz exatamente `64`/`220` (e `0` no mobile), e `<Navbar leftOffset={leftWidth}>` é numericamente idêntico ao `left` anterior. O `<main>` passa de classe `ml-[...]` para `style.marginLeft` com o mesmo valor (visualmente idêntico; `transition-all` continua animando). `useModuleNav([])` é read-only e inerte quando não há módulos.

- [ ] **Step 3: Typecheck + lint + build da lib**

Run: `cd /mnt/c/development/web-projects/frameworks/archon-ui && npx tsc -b && npm run lint && npm run build`
Expected: sem erros; `dist/index.js` e `dist/index.d.ts` regenerados (necessário para o Kanvas).

- [ ] **Step 4: Commit**

```bash
git -C /mnt/c/development/web-projects/frameworks/archon-ui add src/components/ui/navbar.tsx src/components/ui/app-layout.tsx
git -C /mnt/c/development/web-projects/frameworks/archon-ui commit -m "feat: AppLayout com navMode module-rail e offset configuravel na navbar"
```

---

## Task 6: Verificar não-regressão da sidebar plana

**Files:** nenhum (verificação).

- [ ] **Step 1: Revisão de diff do caminho flat**

Run: `git -C /mnt/c/development/web-projects/frameworks/archon-ui diff HEAD~1 -- src/components/ui/navbar.tsx`
Confirmar: única mudança funcional é o `left` passar a respeitar `leftOffset` quando presente; sem `leftOffset`, idêntico.

- [ ] **Step 2: Build de um consumidor flat (IntegrationPlatform)**

Run:
```bash
cd /mnt/c/development/web-projects/system/integration-platform/IntegrationPlatform/IntegrationPlatform.Web && npm run build
```
Expected: build OK (consome o novo `dist` do archon-ui sem mudar nada; segue na sidebar plana).
Caso o diretório/script difira, rodar `npx tsc -b` no app web correspondente.

- [ ] **Step 3: (sem commit — etapa de verificação)**

---

## Task 7: Adotar a navegação por módulos no Kanvas

**Files:**
- Modify: `system/agency-campaign-os/AgencyCampaign/AgencyCampaign.Web/src/layouts/AgencyCampaignLayout.tsx`

- [ ] **Step 1: Garantir `archon-ui` buildado**

Run: `cd /mnt/c/development/web-projects/frameworks/archon-ui && npm run build`
Expected: `dist` atualizado (o Kanvas resolve `archon-ui` a partir de `dist`).

- [ ] **Step 2: Importar tipos/módulo no layout**

No topo de `AgencyCampaignLayout.tsx`, no import de `archon-ui`, adicionar `type ModuleNavConfig` à lista (uma linha só):

```ts
import type { BreadcrumbItem, NotificationItem, ModuleNavConfig } from 'archon-ui'
```

- [ ] **Step 3: Montar `moduleNav` a partir dos defs existentes**

Logo após a definição de `systemGroups`/`configurationGroups` (e do `filterItems`/`canShow` existentes), adicionar a montagem do `moduleNav`. Reaproveita o filtro de permissão; rotas operacionais viram módulos planos; Configuração vira módulo com sub-grupos (menos Integrações + inclui Usuários); Integrações vira módulo de rota única.

```tsx
  const opModuleDefs: { key: string; label: string; icon: React.ReactNode; color: 'primary' | 'cyan' | 'purple' | 'green'; items: NavItem[] }[] = [
    { key: 'geral', label: t('nav.group.general'), icon: <LayoutDashboard size={20} />, color: 'primary', items: [
      { key: 'dashboard', label: t('nav.item.dashboard'), path: '/', icon: <LayoutDashboard size={20} />, requires: ['dashboard.overview', 'dashboard.charts'] },
    ] },
    { key: 'comercial', label: t('nav.group.commercial'), icon: <TrendingUp size={20} />, color: 'cyan', items: [
      { key: 'marcas', label: t('nav.item.brands'), path: '/marcas', icon: <Building2 size={20} />, requires: ['brands.get'] },
      { key: 'comercial-pipeline', label: t('nav.item.pipeline'), path: '/comercial/pipeline', icon: <Columns3 size={20} />, requires: ['opportunities.board', 'opportunities.get'] },
      { key: 'comercial-propostas', label: t('nav.item.proposals'), path: '/comercial/propostas', icon: <Tags size={20} />, requires: ['proposals.get'] },
      { key: 'comercial-aprovacoes', label: t('nav.item.approvals'), path: '/comercial/aprovacoes', icon: <Globe size={20} />, requires: ['opportunityApprovals.get'] },
      { key: 'comercial-metas', label: 'Metas', path: '/comercial/metas', icon: <Target size={20} />, requires: ['commercialGoals.get'] },
    ] },
    { key: 'producao', label: t('nav.group.operations'), icon: <Megaphone size={20} />, color: 'purple', items: [
      { key: 'creators', label: t('nav.item.creators'), path: '/creators', icon: <Users size={20} />, requires: ['creators.get'] },
      { key: 'campanhas', label: t('nav.item.campaigns'), path: '/campanhas', icon: <Megaphone size={20} />, requires: ['campaigns.get'] },
      { key: 'operacao-calendario', label: t('campaignCalendar.pageTitle'), path: '/operacao/calendario', icon: <CalendarDays size={20} />, requires: ['campaignDeliverables.get'] },
      { key: 'operacao-aprovacoes', label: t('nav.item.approvals'), path: '/operacao/aprovacoes', icon: <ShieldCheck size={20} />, requires: ['deliverableApprovals.get'] },
    ] },
    { key: 'financas', label: t('nav.group.finance'), icon: <Wallet size={20} />, color: 'green', items: [
      { key: 'financeiro-contas', label: t('nav.item.bankAccounts'), path: '/financeiro/contas', icon: <Wallet size={20} />, requires: ['financialAccounts.get'] },
      { key: 'financeiro-receber', label: t('nav.item.accountsReceivable'), path: '/financeiro/receber', icon: <HandCoins size={20} />, requires: ['financialEntries.get'] },
      { key: 'financeiro-pagar', label: t('nav.item.accountsPayable'), path: '/financeiro/pagar', icon: <ReceiptText size={20} />, requires: ['financialEntries.get'] },
      { key: 'financeiro-repasses-creators', label: t('nav.item.creatorPayments'), path: '/financeiro/repasses-creators', icon: <HandCoins size={20} />, requires: ['creatorPayments.get'] },
      { key: 'financeiro-fluxo-caixa', label: t('nav.item.cashFlow'), path: '/financeiro/fluxo-caixa', icon: <TrendingUp size={20} />, requires: ['financialReports.getCashFlow'] },
      { key: 'financeiro-aging', label: t('nav.item.aging'), path: '/financeiro/aging', icon: <Hourglass size={20} />, requires: ['financialReports.getAging'] },
    ] },
  ]

  const configSubGroupDefs: { label: string; items: NavItem[] }[] = [
    { label: t('nav.group.general'), items: [
      { key: 'configuracao-agencia', label: t('nav.item.agency'), path: '/configuracao', icon: <Briefcase size={20} />, requires: ['agencySettings.get'] },
      ...(isRoot ? [{ key: 'usuarios', label: t('nav.item.users'), path: '/usuarios', icon: <UserCog size={20} /> }] : []),
    ] },
    { label: t('nav.group.commercial'), items: [
      { key: 'configuracao-pipeline-comercial', label: t('nav.item.commercialFunnel'), path: '/configuracao/pipeline-comercial', icon: <Columns3 size={20} />, requires: ['commercialPipelineStages.get'] },
      { key: 'configuracao-origens-oportunidade', label: t('nav.item.opportunitySources'), path: '/configuracao/origens-oportunidade', icon: <Compass size={20} />, requires: ['opportunitySources.get'] },
      { key: 'configuracao-tags-oportunidade', label: t('nav.item.opportunityTags'), path: '/configuracao/tags-oportunidade', icon: <Tag size={20} />, requires: ['opportunityTags.get'] },
      { key: 'configuracao-motivos-ganho', label: 'Motivos de ganho', path: '/configuracao/motivos-ganho', icon: <Trophy size={20} />, requires: ['opportunityWinReasons.get'] },
      { key: 'configuracao-motivos-perda', label: 'Motivos de perda', path: '/configuracao/motivos-perda', icon: <ThumbsDown size={20} />, requires: ['opportunityLossReasons.get'] },
      { key: 'configuracao-politica-comercial', label: 'Política comercial', path: '/configuracao/politica-comercial', icon: <ShieldCheck size={20} />, requires: ['commercialPolicy.get'] },
      { key: 'configuracao-itens-proposta', label: t('nav.item.proposalTemplates'), path: '/configuracao/itens-proposta', icon: <FileSignature size={20} />, requires: ['proposalTemplates.get'] },
      { key: 'configuracao-layouts-proposta', label: 'Layouts da proposta', path: '/configuracao/layouts-proposta', icon: <Paintbrush size={20} />, requires: ['agencySettings.getProposalTemplateVersions'] },
    ] },
    { label: t('nav.group.operations'), items: [
      { key: 'configuracao-plataformas', label: t('nav.item.socialNetworks'), path: '/configuracao/plataformas', icon: <Share2 size={20} />, requires: ['platforms.get'] },
      { key: 'configuracao-status-creators', label: t('nav.item.creatorStatus'), path: '/configuracao/status-creators', icon: <UserCheck size={20} />, requires: ['campaignCreatorStatuses.get'] },
      { key: 'configuracao-tipos-entrega', label: t('nav.item.deliverableKinds'), path: '/configuracao/tipos-entrega', icon: <Package size={20} />, requires: ['deliverableKinds.get'] },
      { key: 'configuracao-modelos-contrato', label: t('nav.item.contractTemplates'), path: '/configuracao/modelos-contrato', icon: <ScrollText size={20} />, requires: ['campaignDocumentTemplates.get'] },
    ] },
    { label: t('nav.group.finance'), items: [
      { key: 'configuracao-bancos', label: t('nav.item.banks'), path: '/configuracao/bancos', icon: <Landmark size={20} />, requires: ['banks.get'] },
      { key: 'configuracao-subcategorias-financeiras', label: t('nav.item.financialSubcategories'), path: '/configuracao/subcategorias-financeiras', icon: <Tag size={20} />, requires: ['financialSubcategories.get'] },
    ] },
  ]

  const toNavRoutes = (items: NavItem[]) =>
    filterItems(items).map((i) => ({ key: i.key, label: i.label, path: i.path, icon: i.icon }))

  const opModules = opModuleDefs
    .map((def) => ({ key: def.key, label: def.label, icon: def.icon, color: def.color, group: 'op' as const, routes: toNavRoutes(def.items) }))
    .filter((m) => m.routes.length > 0)

  const configSubGroups = configSubGroupDefs
    .map((g) => ({ label: g.label, routes: toNavRoutes(g.items) }))
    .filter((g) => g.routes.length > 0)

  const integracoesRoutes = toNavRoutes([
    { key: 'configuracao-integracoes', label: t('nav.item.integrations'), path: '/configuracao/integracoes', icon: <Plug size={20} />, requires: ['integrations.get', 'integrations.getActive'] },
  ])

  const sysModules = [
    ...(configSubGroups.length > 0 ? [{ key: 'configuracao', label: t('nav.module.configuration'), icon: <Settings size={20} />, color: 'muted' as const, group: 'sys' as const, subGroups: configSubGroups }] : []),
    ...(integracoesRoutes.length > 0 ? [{ key: 'integracoes', label: t('nav.item.integrations'), icon: <Plug size={20} />, color: 'muted' as const, group: 'sys' as const, routes: integracoesRoutes }] : []),
  ]

  const moduleNav: ModuleNavConfig = [...opModules, ...sysModules]
```

- [ ] **Step 4: Passar `navMode`/`moduleNav` ao `AppLayout` e remover o switcher**

No JSX `<AppLayout ... >`, remover as props `menuGroups={menuGroups}`, `modules={modules}`, `currentModule={currentModule}` e `onModuleChange={handleModuleChange}`, e adicionar:

```tsx
        navMode="module-rail"
        moduleNav={moduleNav}
```

(Manter `breadcrumbs`, `notifications*`, `user`, `onLogout`, `onAvatarUpload`, `logo`, `title`, `subtitle`, `navbarCompanyName`.)

- [ ] **Step 5: Remover código morto do switcher**

Remover as variáveis que só serviam ao switcher da navbar e ao menu plano, se ficarem sem uso após o Step 4: `modules`, `handleModuleChange`, `currentModule`, `menuGroups`, `isInConfiguration` (se não usado pelos breadcrumbs/`homePathByModule`). Atenção: `homePathByModule` e os breadcrumbs usam `isInConfiguration`/`location.pathname` — **manter** o que os breadcrumbs ainda consomem. Deixar `systemGroups`/`configurationGroups`/`buildMenuGroups` apenas se ainda referenciados; caso contrário remover. Rodar o typecheck do Step 6 para apontar não-usados (o eslint do projeto sinaliza `no-unused-vars`).

- [ ] **Step 6: Typecheck + build do Kanvas**

Run:
```bash
cd /mnt/c/development/web-projects/system/agency-campaign-os/AgencyCampaign/AgencyCampaign.Web && npm run build
```
Expected: build OK. Corrigir eventuais `unused` apontados no Step 5.

- [ ] **Step 7: Commit (repo do Kanvas)**

```bash
git -C /mnt/c/development/web-projects/system/agency-campaign-os add AgencyCampaign/AgencyCampaign.Web/src/layouts/AgencyCampaignLayout.tsx
git -C /mnt/c/development/web-projects/system/agency-campaign-os commit -m "feat: adotar navegacao por modulos (rail + painel) no layout do Kanvas"
```

---

## Task 8: Verificação visual (dev server)

**Files:** nenhum (verificação manual; usar a skill `run`/`verify` se disponível).

- [ ] **Step 1: Subir o Kanvas em dev**

Run: `cd /mnt/c/development/web-projects/system/agency-campaign-os/AgencyCampaign/AgencyCampaign.Web && npm run dev`
(Lembrar: se mudar algo no `archon-ui` depois, rodar `npm run build` no `archon-ui` novamente.)

- [ ] **Step 2: Percorrer o checklist de aceitação**

- Rail mostra Geral, Comercial, Produção, Finanças + divisor + Configuração, Integrações.
- Login numa rota Comercial → painel aberto no Comercial (estado inicial expandido).
- Clicar Finanças → painel troca para as 6 rotas de Finanças; clicar uma rota navega.
- Clicar Geral (rota única) → vai direto pro Dashboard, painel NÃO abre, conteúdo ocupa largura cheia.
- Clicar Integrações (rota única) → vai direto pra Conectores; URL `/configuracao/integracoes` deixa o ícone Integrações ativo (não Configuração).
- Clicar Configuração → painel agrupado (Geral/Comercial/Operações/Finanças) com sub-grupos colapsáveis.
- `«` no header do painel colapsa; recarregar a página mantém colapsado (localStorage); clicar de novo no ícone do módulo reabre.
- Aprovações com pendência → badge vermelho no ícone do rail.
- Alternar dark mode → rail, painel, ativo/hover corretos.
- Reduzir a janela (<1024px) → hambúrguer na navbar abre o drawer com módulos em acordeão; navegar fecha o drawer.
- Permissões: usuário sem acesso a um módulo não vê o ícone (módulo sem rota some).

- [ ] **Step 3: Registrar resultado**

Anotar no PR/handoff o que passou e qualquer ajuste fino de espaçamento/cor necessário (corrigir e recomitar no repo correspondente).

---

## Self-Review

**Spec coverage:**
- §2.1 escopo só Kanvas → Task 7 (outros apps intactos, Task 6 valida). OK
- §2.2 estado inicial expandido + persistência → `useModuleNav` (Task 2) + checklist (Task 8). OK
- §2.3 navbar mantida + switcher oculto → Task 5 (`modules={useRail?undefined:...}`). OK
- §2.4 cor por módulo token-friendly → Task 1 `MODULE_COLORS`. OK
- §2.5 Configuração única + Integrações própria → Task 7 mapeamento. OK
- §3 arquitetura opt-in → Tasks 1–5. OK
- §4 modelo de dados → Task 1. OK
- §5 geometria/offsets/mobile → Task 5 (`leftWidth` 64/296) + `ModuleNavMobile` (Task 4). OK
- §6 mapeamento Kanvas → Task 7. OK
- §7 derivação por longest-prefix + comportamento → Task 2. OK
- §8 theming → Task 1 + componentes. OK
- §9 não-regressão → Task 6. OK
- §11 critérios de aceitação → Task 8. OK

**Placeholder scan:** sem TBD/TODO; todo passo de código tem código completo. OK

**Type consistency:** `NavRoute`/`NavSubGroup`/`NavModule`/`ModuleNavConfig`/`ModuleColor` (Task 1) usados igual em `useModuleNav` (Task 2), `ModulePanel`/`ModuleRail`/`ModuleNavMobile` (Tasks 3–4) e `AppLayout`/Kanvas (Tasks 5,7). `MODULE_COLORS` campos `{icon,activeBg,activeText,bar}` consistentes. Funções `moduleRoutes`/`isSingleRouteModule`/`routeMatches`/`deriveActiveModuleKey`/`deriveActiveRoutePath` exportadas em Task 2 e importadas com o mesmo nome nos componentes. `leftOffset` (Navbar) ↔ `leftWidth` (AppLayout) — nomes diferentes mas a prop passada é `leftOffset={leftWidth}`. OK
