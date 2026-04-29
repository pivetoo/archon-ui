import * as React from "react"
import { useOptionalI18n } from "../../i18n"
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
      title,
      description,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      variant = "primary",
      loading = false,
    },
    ref
  ) => {
    const i18n = useOptionalI18n()
    const t = i18n?.t ?? ((key: string) => key)

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
            <ModalTitle>{title ?? t("confirmModal.title")}</ModalTitle>
            {(description ?? t("confirmModal.description")) && (
              <ModalDescription>{description ?? t("confirmModal.description")}</ModalDescription>
            )}
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              {cancelText ?? t("common.action.cancel")}
            </Button>
            <Button variant={variant} onClick={handleConfirm} loading={loading}>
              {confirmText ?? t("common.action.confirm")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
)
ConfirmModal.displayName = "ConfirmModal"

export { ConfirmModal }
