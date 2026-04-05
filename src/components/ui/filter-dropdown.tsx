import { Filter } from "lucide-react"
import { Button } from "./button"
import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "./dropdown"

export interface FilterDropdownOption {
  value: string
  label: string
}

export interface FilterDropdownProps {
  label: string
  value: string
  options: FilterDropdownOption[]
  onChange: (value: string) => void
  clearLabel?: string
  allValue?: string
}

export function FilterDropdown({
  label,
  value,
  options,
  onChange,
  clearLabel = "Limpar filtros",
  allValue = "all",
}: FilterDropdownProps) {
  const hasActiveFilters = value !== allValue

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button
          variant={hasActiveFilters ? "outline-primary" : "outline"}
          size="sm"
          icon={<Filter className="h-4 w-4" />}
        />
      </DropdownTrigger>
      <DropdownContent align="end" className="w-56">
        <DropdownLabel>{label}</DropdownLabel>
        <DropdownSeparator />
        {options.map((option) => (
          <DropdownCheckboxItem
            key={option.value}
            checked={value === option.value}
            onCheckedChange={(checked) => onChange(checked ? option.value : allValue)}
          >
            {option.label}
          </DropdownCheckboxItem>
        ))}
        <DropdownSeparator />
        <button
          type="button"
          className="w-full rounded-sm px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          onClick={() => onChange(allValue)}
        >
          {clearLabel}
        </button>
      </DropdownContent>
    </Dropdown>
  )
}
