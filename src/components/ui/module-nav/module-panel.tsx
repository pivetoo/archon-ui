import * as React from 'react'
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../../lib/utils'
import type { NavModule, NavRoute } from './types'
import { routeMatches } from '../../../hooks/useModuleNav'

export interface ModulePanelProps {
  module: NavModule
  activeRoutePath: string | null
  onRouteClick: (path: string) => void
  onCollapse: () => void
}

const RouteButton: React.FC<{ route: NavRoute; active: boolean; onClick: () => void }> = ({ route, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex w-full items-center gap-3 rounded-md px-3 py-2 my-0.5 text-sm font-medium transition-colors text-muted-foreground',
        'hover:bg-accent dark:hover:bg-accent/80 hover:text-foreground',
        active && 'bg-primary/10 text-primary font-semibold'
      )}
    >
      {active && <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r bg-primary" />}
      <span className={cn('flex items-center justify-center w-5 h-5 flex-shrink-0', active && 'text-primary')}>{route.icon}</span>
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
  const [openState, setOpenState] = React.useState<Record<string, boolean>>({})
  const isGroupOpen = (label: string) => openState[`${module.key}::${label}`] ?? true
  const toggleGroup = (label: string) => {
    const stateKey = `${module.key}::${label}`
    setOpenState((prev) => ({ ...prev, [stateKey]: !(prev[stateKey] ?? true) }))
  }

  const isRouteActive = (route: NavRoute) => activeRoutePath != null && routeMatches(route.path, activeRoutePath)

  return (
    <nav
      data-module-nav
      className="fixed left-[64px] top-0 h-screen w-[232px] bg-card border-r border-border flex flex-col z-40 shadow-sm transition-all duration-300"
      aria-label={module.label}
    >
      <div className="flex items-center justify-between min-h-[60px] px-4 border-b border-border/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">{module.icon}</span>
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
          <RouteButton key={route.key} route={route} active={isRouteActive(route)} onClick={() => onRouteClick(route.path)} />
        ))}

        {module.subGroups?.map((group) => {
          const isOpen = isGroupOpen(group.label)
          return (
            <div key={group.label} className="mb-3">
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-3 py-1 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <span>{group.label}</span>
                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {isOpen && group.routes.map((route) => (
                <RouteButton key={route.key} route={route} active={isRouteActive(route)} onClick={() => onRouteClick(route.path)} />
              ))}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

ModulePanel.displayName = 'ModulePanel'
