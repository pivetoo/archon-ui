import * as React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { moduleRoutes } from '../../../hooks/useModuleNav'
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
  const isRouteActive = (route: NavRoute) => activeRoutePath != null && route.path === activeRoutePath

  const renderModule = (module: NavModule) => {
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
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">{module.icon}</span>
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
                  'w-full flex items-center gap-3 pl-12 pr-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors',
                  !isRouteActive(route) && 'hover:bg-accent dark:hover:bg-accent/80',
                  isRouteActive(route) && 'bg-primary/10 text-primary font-semibold'
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
        <div className="min-h-[60px] flex items-center px-4">{brand}</div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {modules.map(renderModule)}
        </div>
      </aside>
    </>
  )
}

ModuleNavMobile.displayName = 'ModuleNavMobile'
