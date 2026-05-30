import * as React from "react"
import { useI18n } from "../../i18n"
import { cn } from "../../lib/utils"
import { SearchBar } from "./search-bar"

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
  searchPlaceholder,
  leftSlot,
  rightSlot,
  className,
}: TableToolbarProps) {
  const { t } = useI18n()

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
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder ?? t("common.action.search")}
              className="flex-1"
            />

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
