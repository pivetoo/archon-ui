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
    <div className={cn("space-y-4 border-b border-border/70 pb-5", className)}>
      {eyebrow ? (
        <div className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </div>
      ) : null}
      <div className="space-y-2">
        <div className="text-lg font-semibold text-primary">{title}</div>
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
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
        <div>
          <div className="text-base font-bold tracking-[-0.01em] text-primary">{title}</div>
          {description ? <div className="text-xs text-muted-foreground">{description}</div> : null}
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border/60 px-4 pt-4">
        {children}
      </div>
    </details>
  )
}

export interface SheetPreviewGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SheetPreviewGrid({ className, ...props }: SheetPreviewGridProps) {
  return <div className={cn("grid gap-4 sm:grid-cols-2", className)} {...props} />
}

export interface SheetPreviewFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  value: React.ReactNode
}

export function SheetPreviewField({ label, value, className, ...props }: SheetPreviewFieldProps) {
  return (
    <div className={className} {...props}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}
