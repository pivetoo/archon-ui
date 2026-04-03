import * as React from "react"
import { Modal, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "./modal"
import { Button } from "./button"

export interface ConfirmModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  variant?: "primary" | "secondary" | "success" | "error" | "danger" | "warning" | "info"
  loading?: boolean
}

const ConfirmModal = React.forwardRef<HTMLDivElement, ConfirmModalProps>(
  (
    {
      open,
      onOpenChange,
      title = "Confirmar ação",
      description = "Tem certeza que deseja continuar?",
      confirmText = "Confirmar",
      cancelText = "Cancelar",
      onConfirm,
      onCancel,
      variant = "primary",
      loading = false,
    },
    ref
  ) => {
    const handleConfirm = () => {
      onConfirm?.()
    }

    const handleCancel = () => {
      onCancel?.()
      onOpenChange?.(false)
    }

    return (
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent ref={ref}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {description && <ModalDescription>{description}</ModalDescription>}
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              {cancelText}
            </Button>
            <Button variant={variant} onClick={handleConfirm} loading={loading}>
              {confirmText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
)
ConfirmModal.displayName = "ConfirmModal"

export { ConfirmModal }
