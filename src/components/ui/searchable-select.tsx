import * as React from "react"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Input } from "./input"

export interface SearchableSelectOption {
  label: string
  value: string
}

export interface SearchableSelectProps {
  options: SearchableSelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  className?: string
  emptyMessage?: string
}

export const SearchableSelect = React.forwardRef<
  HTMLButtonElement,
  SearchableSelectProps
>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Selecione uma opção",
      searchPlaceholder = "Pesquisar...",
      disabled,
      className,
      emptyMessage = "Nenhum resultado encontrado",
    },
    ref
  ) => {
    const [search, setSearch] = React.useState("")
    const [open, setOpen] = React.useState(false)

    const filteredOptions = React.useMemo(() => {
      if (!search) return options

      const searchLower = search.toLowerCase()
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchLower)
      )
    }, [options, search])

    React.useEffect(() => {
      if (!open) {
        setSearch("")
      }
    }, [open])

    return (
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger ref={ref} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className="flex items-center border-b px-3 pb-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent"
            />
          </div>
          <div className="max-h-[300px] overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            )}
          </div>
        </SelectContent>
      </Select>
    )
  }
)

SearchableSelect.displayName = "SearchableSelect"
