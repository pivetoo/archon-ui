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
