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
