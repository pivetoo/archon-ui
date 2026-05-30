import * as React from 'react'
import { cn } from '../../../lib/utils'
import { moduleRoutes } from '../../../hooks/useModuleNav'
import type { ModuleNavConfig, NavModule } from './types'

export interface ModuleRailProps {
  modules: ModuleNavConfig
  activeModuleKey: string | null
  onModuleClick: (key: string) => void
  brand?: React.ReactNode
}

const RailModule: React.FC<{ module: NavModule; active: boolean; onClick: () => void }> = ({ module, active, onClick }) => {
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
          active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent dark:hover:bg-accent/80'
        )}
      >
        <span className="w-5 h-5 flex items-center justify-center">{module.icon}</span>
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
    <aside data-module-nav className="fixed left-0 top-0 h-screen w-[64px] bg-card border-r border-border flex flex-col items-center z-40 shadow-sm">
      <div className="min-h-[60px] w-full flex items-center justify-center">
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
