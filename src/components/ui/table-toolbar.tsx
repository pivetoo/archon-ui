import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "../../lib/utils"
import { Input } from "./input"

export interface TableToolbarProps {
  summary?: React.ReactNode
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  className?: string
}

export function TableToolbar({
  summary,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  leftSlot,
  rightSlot,
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center">
        {onSearchChange && (
          <div className="flex w-full items-center gap-2 md:max-w-sm">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchValue ?? ""}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                className="pl-9"
              />
            </div>

            {rightSlot}
          </div>
        )}

        {leftSlot}
      </div>

      {summary && (
        <div className="text-sm text-muted-foreground">
          {summary}
        </div>
      )}
    </div>
  )
}
