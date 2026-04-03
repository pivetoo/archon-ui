import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react"

import { cn } from "../../lib/utils"

const toastIcons = {
  default: null,
  success: CheckCircle2,
  destructive: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[300] flex max-h-screen w-full flex-col-reverse gap-3 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[460px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full overflow-hidden rounded-lg border shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:content-['']",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground before:bg-border",
        success: "border-emerald-100 bg-emerald-50/55 text-emerald-900 before:bg-emerald-400 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100",
        destructive: "border-rose-100 bg-rose-50/55 text-rose-900 before:bg-rose-400 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-100",
        warning: "border-amber-100 bg-amber-50/60 text-amber-900 before:bg-amber-400 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100",
        info: "border-sky-100 bg-sky-50/55 text-sky-900 before:bg-sky-400 dark:border-sky-900/40 dark:bg-sky-950/30 dark:text-sky-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconContainerVariants = cva(
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border",
  {
    variants: {
      variant: {
        default: "border-border bg-foreground/5 text-foreground",
        success: "border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-200",
        destructive: "border-rose-100 bg-rose-50 text-rose-600 dark:border-rose-900/50 dark:bg-rose-900/30 dark:text-rose-200",
        warning: "border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-900/30 dark:text-amber-200",
        info: "border-sky-100 bg-sky-50 text-sky-600 dark:border-sky-900/50 dark:bg-sky-900/30 dark:text-sky-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & {
      showIcon?: boolean
    }
>(({ className, variant, showIcon = true, children, ...props }, ref) => {
  const IconComponent = variant ? toastIcons[variant] : null

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="flex w-full items-start gap-3 p-4 pr-3">
        {showIcon && IconComponent && (
          <div className={cn(iconContainerVariants({ variant }))}>
            <IconComponent className="h-5 w-5" />
          </div>
        )}
        <div className="min-w-0 flex-1 pt-0.5">
          {children}
        </div>
        <ToastPrimitives.Close className="shrink-0 rounded-md p-1.5 opacity-50 transition-opacity hover:bg-black/5 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring dark:hover:bg-white/10">
          <X className="h-4 w-4" />
        </ToastPrimitives.Close>
      </div>
    </ToastPrimitives.Root>
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-current/20 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-tight tracking-[-0.01em]", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("mt-1 whitespace-pre-line text-[13px] leading-5 opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  toastIcons,
}
