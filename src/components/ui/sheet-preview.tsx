import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SheetPreviewHeaderProps {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  meta?: React.ReactNode
  description?: React.ReactNode
  className?: string
}

export function SheetPreviewHeader({
  eyebrow,
  title,
  meta,
  description,
  className,
}: SheetPreviewHeaderProps) {
  return (
    <div className={cn("space-y-2 border-b border-border/70 pb-4", className)}>
      {eyebrow ? <div className="text-xs font-medium text-muted-foreground">{eyebrow}</div> : null}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <div className="text-lg font-semibold leading-tight text-primary">{title}</div>
        {meta ? <div className="flex flex-wrap items-center gap-2">{meta}</div> : null}
      </div>
      {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
    </div>
  )
}

export interface SheetPreviewSectionProps {
  title: React.ReactNode
  description?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export function SheetPreviewSection({
  title,
  description,
  defaultOpen = true,
  children,
  className,
}: SheetPreviewSectionProps) {
  return (
    <details open={defaultOpen} className={cn("group border-b border-border/70 pb-4 last:border-b-0 last:pb-0", className)}>
      <summary className="-mx-2 flex cursor-pointer list-none items-center justify-between gap-3 rounded-md px-2 py-2 transition-colors hover:bg-accent">
        <div>
          <div className="text-sm font-semibold text-foreground">{title}</div>
          {description ? <div className="text-xs text-muted-foreground">{description}</div> : null}
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="pt-3">
        {children}
      </div>
    </details>
  )
}

export interface SheetPreviewGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SheetPreviewGrid({ className, ...props }: SheetPreviewGridProps) {
  return <div className={cn("grid gap-x-4 gap-y-3 sm:grid-cols-2", className)} {...props} />
}

export interface SheetPreviewFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  value: React.ReactNode
}

export function SheetPreviewField({ label, value, className, ...props }: SheetPreviewFieldProps) {
  return (
    <div className={cn("min-w-0", className)} {...props}>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-0.5 break-words text-sm text-foreground">{value}</div>
    </div>
  )
}
