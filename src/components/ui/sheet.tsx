import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const Sheet = DialogPrimitive.Root

const SheetTrigger = DialogPrimitive.Trigger

const SheetClose = DialogPrimitive.Close

const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-[200] bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

// Painel em coluna flex: SheetHeader e SheetFooter ficam fixos e SheetBody rola. Quem nao usa essas
// pecas continua com o painel inteiro rolando, como antes. bg-card no lugar de bg-background: o cinza
// da pagina deixava o painel sem contraste com o conteudo que ele cobre.
const sheetVariants = cva(
  "group/sheet fixed z-[201] flex flex-col gap-0 overflow-y-auto bg-card p-6 shadow-2xl transition data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:ease-in",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 max-h-[85dvh] border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 max-h-[85dvh] border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        // mobile: bottom-sheet (sobe de baixo); sm+: painel lateral
        left: "inset-x-0 bottom-0 max-h-[90dvh] w-full rounded-t-2xl border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:inset-y-0 sm:inset-x-auto sm:bottom-auto sm:left-0 sm:h-full sm:max-h-none sm:w-[85vw] sm:rounded-t-none sm:border-t-0 sm:border-r sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=closed]:slide-out-to-left sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:slide-in-from-left",
        right:
          "inset-x-0 bottom-0 max-h-[90dvh] w-full rounded-t-2xl border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:inset-y-0 sm:inset-x-auto sm:bottom-auto sm:right-0 sm:h-full sm:max-h-none sm:w-[85vw] sm:rounded-t-none sm:border-t-0 sm:border-l sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=closed]:slide-out-to-right sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:slide-in-from-right",
      },
      // Largura do painel lateral (so vale a partir de sm; no mobile ele ocupa a tela toda).
      size: {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        full: "sm:max-w-none",
      },
    },
    defaultVariants: {
      side: "right",
      size: "sm",
    },
  }
)

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", size, className, children, onOpenAutoFocus, ...props }, ref) => {
  const handleOpenAutoFocus = (event: Event) => {
    if (onOpenAutoFocus) {
      onOpenAutoFocus(event)
      return
    }
    // No mobile, evitar focar o primeiro input ao abrir (abriria o teclado).
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches
    if (isMobile) {
      event.preventDefault()
      const content = event.currentTarget as HTMLElement | null
      content?.focus({ preventScroll: true })
    }
  }

  // Telas que passam p-0 montam a propria estrutura; nesse caso header, body e footer nao sangram
  // ate a borda (o data-padded some junto com o p-6 no merge das classes).
  const mergedClassName = cn(sheetVariants({ side, size }), className)
  const padded = /(^|\s)p-6(\s|$)/.test(mergedClassName)

  return (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={mergedClassName}
      data-padded={padded ? "" : undefined}
      onOpenAutoFocus={handleOpenAutoFocus}
      {...props}
    >
      {side !== "top" && (
        <div aria-hidden className="mx-auto -mt-1 mb-1 h-1.5 w-10 shrink-0 rounded-full bg-muted-foreground/25 sm:hidden" />
      )}
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/25 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
  )
})
SheetContent.displayName = DialogPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex shrink-0 flex-col gap-1 pr-10 text-left",
      "group-data-[padded]/sheet:-mx-6 group-data-[padded]/sheet:-mt-2 group-data-[padded]/sheet:mb-5 group-data-[padded]/sheet:border-b group-data-[padded]/sheet:border-border/70 group-data-[padded]/sheet:px-6 group-data-[padded]/sheet:pb-4 group-data-[padded]/sheet:pt-1 sm:group-data-[padded]/sheet:-mt-6 sm:group-data-[padded]/sheet:pt-5",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

// Area que rola entre o header e o footer.
const SheetBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      // relative pelo mesmo motivo do ModalBody: elemento absolute do conteudo nao estica o painel.
      "relative min-h-0 flex-1 overflow-y-auto",
      "group-data-[padded]/sheet:-mx-6 group-data-[padded]/sheet:px-6",
      className
    )}
    {...props}
  />
)
SheetBody.displayName = "SheetBody"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex shrink-0 flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      "group-data-[padded]/sheet:-mx-6 group-data-[padded]/sheet:-mb-6 group-data-[padded]/sheet:mt-5 group-data-[padded]/sheet:border-t group-data-[padded]/sheet:border-border/70 group-data-[padded]/sheet:bg-muted/30 group-data-[padded]/sheet:px-6 group-data-[padded]/sheet:py-3",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-tight text-primary", className)}
    {...props}
  />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = DialogPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
