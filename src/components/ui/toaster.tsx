import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const duration = props.duration ?? (props.variant === "destructive" ? 10000 : 5000)
        return (
          <Toast key={id} {...props} duration={duration}>
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && (
              <ToastDescription>{description}</ToastDescription>
            )}
            {action}
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
