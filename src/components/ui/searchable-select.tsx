import { useState } from 'react'
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
}

const EMPTY_SENTINEL = '__searchable_select_empty__'

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Selecione...',
  searchPlaceholder = 'Buscar...',
  disabled,
}: SearchableSelectProps) {
  const [search, setSearch] = useState('')
  const safeValue = value ? value : EMPTY_SENTINEL
  const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))
  const selectedLabel = options.find((opt) => opt.value === (value ?? ''))?.label ?? placeholder

  return (
    <Select value={safeValue} onValueChange={(v) => { setSearch(''); onValueChange(v === EMPTY_SENTINEL ? '' : v) }} disabled={disabled}>
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
          {filteredOptions.length === 0 ? (
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
