import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const Modal = DialogPrimitive.Root

const ModalTrigger = DialogPrimitive.Trigger

const ModalPortal = DialogPrimitive.Portal

const ModalClose = DialogPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const modalContentVariants = cva(
  [
    "fixed z-[201] flex flex-col bg-background shadow-lg duration-200 overflow-y-auto",
    // mobile: bottom-sheet sobe de baixo — !w-full sobrescreve inline style width:95vw dos modais
    "inset-x-0 bottom-0 !w-full max-h-[90vh] rounded-t-2xl p-4 gap-3",
    // sm+: dialog centralizado flutuante
    "sm:inset-auto sm:left-[50%] sm:top-[50%] sm:w-full sm:min-h-0 sm:max-h-[90vh] sm:rounded-xl",
    "sm:translate-x-[-50%] sm:translate-y-[-50%] sm:border sm:p-6 sm:gap-4",
    // animações
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    // mobile: desliza de baixo
    "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
    // desktop: pop centralizado com leve zoom
    "sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95",
    "sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%]",
    "sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%]",
  ].join(" "),
  {
    variants: {
      size: {
        sm:    "sm:max-w-sm",
        md:    "sm:max-w-md",
        lg:    "sm:max-w-lg",
        xl:    "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "5xl": "sm:max-w-5xl",
        form:  "sm:max-w-3xl",
        full:  "sm:max-w-[95vw]",
      },
    },
    defaultVariants: {
      size: "form",
    },
  }
)

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, size, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalContentVariants({ size }), className)}
      {...props}
    >
      <div aria-hidden className="mx-auto -mt-1 mb-1 h-1.5 w-10 shrink-0 rounded-full bg-muted-foreground/25 sm:hidden" />
      {children}
      <DialogPrimitive.Close className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

const ModalHeader = ({
  className,
  bordered = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { bordered?: boolean }) => (
  <div
    className={cn(
      "flex shrink-0 flex-col space-y-1.5 text-center sm:text-left",
      bordered && "border-b border-border pb-3",
      className
    )}
    {...props}
  />
)
ModalHeader.displayName = "ModalHeader"

const ModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "min-h-0 flex-1 overflow-y-auto",
      className
    )}
    {...props}
  />
)
ModalBody.displayName = "ModalBody"

const ModalFooter = ({
  className,
  bordered = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { bordered?: boolean }) => (
  <div
    className={cn(
      "flex shrink-0 flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      bordered && "border-t border-border pt-3",
      className
    )}
    {...props}
  />
)
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
}
