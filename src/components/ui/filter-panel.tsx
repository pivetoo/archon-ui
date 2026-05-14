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

// Quando uma secao tem poucas opcoes e labels curtas, renderiza como chips inline.
// Quando tem muitas opcoes ou labels longas, renderiza como lista vertical com Check.
const CHIPS_MAX_OPTIONS = 4
const CHIPS_MAX_LABEL_LENGTH = 18
const POPOVER_WIDE_THRESHOLD = 22

function isChipsSection(section: FilterSection): boolean {
  if (section.options.length === 0) {
    return false
  }
  if (section.options.length > CHIPS_MAX_OPTIONS) {
    return false
  }
  const longestLabel = section.options.reduce(
    (max, option) => Math.max(max, option.label.length),
    section.allLabel?.length ?? 5,
  )
  return longestLabel <= CHIPS_MAX_LABEL_LENGTH
}

function hasLongLabels(sections: FilterSection[]): boolean {
  return sections.some((section) =>
    section.options.some((option) => option.label.length > POPOVER_WIDE_THRESHOLD),
  )
}

/**
 * Botao de filtros com popover agrupando varias dimensoes em uma so UI.
 * - Mostra badge com a contagem de filtros ativos.
 * - Secoes com <=4 opcoes curtas renderizam como chips inline; demais como lista.
 * - Popover ganha um pouco mais de largura quando ha labels longas (~22+ chars).
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
  const needsWidePopover = hasLongLabels(sections)

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
      <PopoverContent align="end" className={cn("p-0", needsWidePopover ? "w-[380px]" : "w-80")}>
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
  const useChips = isChipsSection(section)

  return (
    <div className="space-y-1.5">
      <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {section.label}
      </p>
      {useChips ? (
        <div className="flex flex-wrap gap-1.5">
          <FilterChip
            label={allLabel}
            selected={selectedValue === ""}
            onClick={() => section.onChange("")}
          />
          {section.options.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={selectedValue === option.value}
              onClick={() => section.onChange(option.value)}
            />
          ))}
        </div>
      ) : (
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
      )}
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

function FilterChip({ label, selected, onClick }: FilterOptionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-foreground hover:bg-muted",
      )}
    >
      {selected && <Check className="h-3 w-3" />}
      {label}
    </button>
  )
}
