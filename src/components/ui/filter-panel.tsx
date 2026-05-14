import { Filter, Check } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterSection {
  /** Identificador unico da secao (usado como key e nada mais). */
  key: string
  /** Titulo exibido acima das opcoes (ex: "Status"). */
  label: string
  /** Valor atual selecionado. Vazio (`""`) significa "todos". */
  value: string
  /** Lista de opcoes. */
  options: FilterOption[]
  /** Callback chamado quando o usuario muda. */
  onChange: (value: string) => void
  /** Texto do placeholder/all option. Default: "Todos". */
  allLabel?: string
}

export interface FilterPanelProps {
  /** Secoes de filtro (uma por dimensao). */
  sections: FilterSection[]
  /** Callback opcional para limpar tudo de uma vez. */
  onClearAll?: () => void
  /** Classe extra no botao trigger. */
  className?: string
  /** Texto opcional para o titulo do popover (default: "Filtros"). */
  title?: string
  /** Texto do botao "Limpar". */
  clearLabel?: string
}

/**
 * Botao de filtros com popover agrupando varias dimensoes em uma so UI.
 * - Mostra badge com a contagem de filtros ativos.
 * - Suporta multiplas secoes (single-select por secao).
 * - Botao "Limpar tudo" reseta todas as secoes.
 */
export function FilterPanel({
  sections,
  onClearAll,
  className,
  title = "Filtros",
  clearLabel = "Limpar tudo",
}: FilterPanelProps) {
  const activeCount = sections.reduce(
    (acc, section) => acc + (section.value && section.value !== "" ? 1 : 0),
    0,
  )
  const hasActive = activeCount > 0

  const handleClear = () => {
    if (onClearAll) {
      onClearAll()
      return
    }
    sections.forEach((section) => section.onChange(""))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={hasActive ? "outline-primary" : "outline"}
          size="sm"
          className={cn("gap-1.5 px-2.5", className)}
          aria-label={title}
        >
          <Filter className="h-4 w-4" />
          {hasActive && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold leading-none text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="text-sm font-semibold">{title}</span>
          {hasActive && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {clearLabel}
            </button>
          )}
        </div>
        <div className="max-h-[400px] space-y-3 overflow-y-auto p-3">
          {sections.map((section) => (
            <FilterPanelSection key={section.key} section={section} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface FilterPanelSectionProps {
  section: FilterSection
}

function FilterPanelSection({ section }: FilterPanelSectionProps) {
  const allLabel = section.allLabel ?? "Todos"
  const selectedValue = section.value || ""

  return (
    <div className="space-y-1.5">
      <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {section.label}
      </p>
      <div className="flex flex-col">
        <FilterOptionRow
          label={allLabel}
          selected={selectedValue === ""}
          onClick={() => section.onChange("")}
        />
        {section.options.map((option) => (
          <FilterOptionRow
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onClick={() => section.onChange(option.value)}
          />
        ))}
      </div>
    </div>
  )
}

interface FilterOptionRowProps {
  label: string
  selected: boolean
  onClick: () => void
}

function FilterOptionRow({ label, selected, onClick }: FilterOptionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        selected
          ? "bg-primary/10 font-medium text-primary"
          : "text-foreground hover:bg-muted",
      )}
    >
      <span className="truncate">{label}</span>
      {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
    </button>
  )
}
