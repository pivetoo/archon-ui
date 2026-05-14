import { useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Input } from './input'

export interface SearchableSelectOption {
  value: string
  label: string
}

interface SearchableSelectProps {
  value?: string
  onValueChange: (value: string) => void
  options: SearchableSelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  onSearch?: (term: string) => Promise<SearchableSelectOption[]>
}

const EMPTY_SENTINEL = '__searchable_select_empty__'

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Selecione...',
  searchPlaceholder = 'Buscar...',
  disabled,
  onSearch,
}: SearchableSelectProps) {
  const [search, setSearch] = useState('')
  const [asyncOptions, setAsyncOptions] = useState<SearchableSelectOption[] | null>(null)
  const [searching, setSearching] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Mantem referencia mutavel pro callback para que closures inline no pai
  // (recriadas a cada render) nao reiniciem o effect e quebrem o debounce.
  const onSearchRef = useRef(onSearch)
  useEffect(() => { onSearchRef.current = onSearch }, [onSearch])
  const hasAsyncSearch = Boolean(onSearch)

  const safeValue = value ? value : EMPTY_SENTINEL

  const activeOptions = asyncOptions ?? options
  const filteredOptions = hasAsyncSearch
    ? activeOptions
    : activeOptions.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))

  const selectedLabel = activeOptions.find((opt) => opt.value === (value ?? ''))?.label
    ?? options.find((opt) => opt.value === (value ?? ''))?.label
    ?? placeholder

  useEffect(() => {
    if (!hasAsyncSearch) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!search) {
      setAsyncOptions(null)
      setSearching(false)
      return
    }
    setSearching(true)
    debounceRef.current = setTimeout(() => {
      const fn = onSearchRef.current
      if (!fn) {
        setSearching(false)
        return
      }
      void fn(search).then((results) => {
        setAsyncOptions(results)
        setSearching(false)
      }).catch(() => setSearching(false))
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [search, hasAsyncSearch])

  return (
    <Select value={safeValue} onValueChange={(v) => { setSearch(''); setAsyncOptions(null); onValueChange(v === EMPTY_SENTINEL ? '' : v) }} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder}>{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[var(--radix-select-trigger-width)]">
        <div className="px-2 pt-2 pb-1">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            className="h-8 text-sm"
          />
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {searching ? (
            <div className="px-2 py-3 text-sm text-muted-foreground text-center">Buscando...</div>
          ) : filteredOptions.length === 0 ? (
            <div className="px-2 py-3 text-sm text-muted-foreground text-center">Nenhum resultado</div>
          ) : (
            filteredOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value ? opt.value : EMPTY_SENTINEL}>
                {opt.label}
              </SelectItem>
            ))
          )}
        </div>
      </SelectContent>
    </Select>
  )
}
