import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "../../lib/utils"

export interface CommandPaletteItem {
  key: string
  label: string
  path: string
  moduleLabel: string
  icon?: React.ReactNode
}

export interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  items: CommandPaletteItem[]
  onSelect: (path: string) => void
  placeholder?: string
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose, items, onSelect, placeholder = "Buscar telas…" }) => {
  const [query, setQuery] = React.useState("")
  const [highlight, setHighlight] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!open) return
    setQuery("")
    setHighlight(0)
    const id = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(id)
  }, [open])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) => it.label.toLowerCase().includes(q) || it.moduleLabel.toLowerCase().includes(q))
  }, [items, query])

  React.useEffect(() => { setHighlight(0) }, [query])

  if (!open) return null

  const choose = (item?: CommandPaletteItem) => {
    if (!item) return
    onSelect(item.path)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlight((h) => Math.min(h + 1, filtered.length - 1)) }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)) }
    else if (e.key === "Enter") { e.preventDefault(); choose(filtered[highlight]) }
    else if (e.key === "Escape") { e.preventDefault(); onClose() }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-popover border border-border rounded-xl shadow-2xl overflow-hidden" onKeyDown={handleKeyDown}>
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">ESC</kbd>
        </div>
        <div className="max-h-[320px] overflow-y-auto py-2 scrollbar-hide">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">Nada encontrado</div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.key}
                type="button"
                onClick={() => choose(item)}
                onMouseEnter={() => setHighlight(i)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                  i === highlight ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent dark:hover:bg-accent/80"
                )}
              >
                {item.icon && <span className={cn("flex items-center justify-center w-5 h-5 flex-shrink-0", i === highlight && "text-primary")}>{item.icon}</span>}
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.moduleLabel}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
CommandPalette.displayName = "CommandPalette"

export { CommandPalette }
