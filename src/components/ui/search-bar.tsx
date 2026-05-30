import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "../../lib/utils"
import { Input } from "./input"

export interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
  "aria-label"?: string
  // modo gatilho: renderiza um botao com a mesma aparencia que abre uma busca externa (ex: command palette)
  asButton?: boolean
  onButtonClick?: () => void
  hotkeyHint?: string
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder, className, asButton, onButtonClick, hotkeyHint, ...props }, ref) => {
    if (asButton) {
      return (
        <button
          type="button"
          onClick={onButtonClick}
          aria-label={props["aria-label"] ?? placeholder ?? "Buscar"}
          className={cn(
            "relative flex h-9 items-center rounded-[10px] border border-input bg-background pl-9 pr-3 text-left text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent dark:hover:bg-accent/80 focus-visible:border-secondary focus-visible:outline-none",
            className
          )}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <span className="flex-1 truncate">{placeholder ?? "Buscar…"}</span>
          {hotkeyHint && (
            <kbd className="ml-2 flex-shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">{hotkeyHint}</kbd>
          )}
        </button>
      )
    }

    return (
      <div className={cn("relative w-full", className)}>
        <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          value={value ?? ""}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          className="rounded-[10px] pl-9 focus-visible:border-secondary focus-visible:ring-0"
          {...props}
        />
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
