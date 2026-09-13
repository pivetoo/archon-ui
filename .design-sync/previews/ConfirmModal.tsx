import { ConfirmModal } from 'archon-ui'

export function Exclusao() {
  return (
    <ConfirmModal
      open
      variant="danger"
      title="Excluir contrato"
      description="O contrato CTR-102 de Logística Vale será excluído. Esta ação não pode ser desfeita."
      confirmText="Excluir"
      cancelText="Cancelar"
      onOpenChange={() => undefined}
      onConfirm={() => undefined}
    />
  )
}
