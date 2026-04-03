import * as React from "react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfirmModal,
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  useGlobalLoader,
  useToast,
} from "../../components/ui"

export function FeedbackSection() {
  const { toast } = useToast()
  const { showLoader, hideLoader } = useGlobalLoader()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)

  const handleFakeRequest = () => {
    showLoader()
    window.setTimeout(() => {
      hideLoader()
      toast({
        title: "Processo concluído",
        description: "A sincronização foi finalizada com sucesso.",
        variant: "success",
      })
    }, 1200)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Feedback e overlays</CardTitle>
        <CardDescription>Toast, modal, confirmação, sheet e loader global.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast({
              title: "Dados atualizados",
              description: "Os dados da tela foram recarregados.",
              variant: "info",
            })
          }
        >
          Toast informativo
        </Button>

        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          Abrir modal
        </Button>

        <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
          Abrir painel lateral
        </Button>

        <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
          Abrir confirmação
        </Button>

        <Button variant="outline-primary" onClick={handleFakeRequest}>
          Simular requisição
        </Button>

        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <ModalContent size="md">
            <ModalHeader>
              <ModalTitle>Novo vínculo</ModalTitle>
              <ModalDescription>
                Este exemplo demonstra a composição padrão do modal no dRTS.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Salvar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <ConfirmModal
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          title="Remover registro"
          description="Essa ação não poderá ser desfeita."
          confirmText="Remover"
          cancelText="Cancelar"
          variant="danger"
          onConfirm={() => {
            setIsConfirmOpen(false)
            toast({ title: "Registro removido", variant: "success" })
          }}
        />

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Detalhes do processo</SheetTitle>
              <SheetDescription>
                Use o Sheet para mostrar configurações sem navegar de página.
              </SheetDescription>
            </SheetHeader>
            <div className="my-4 text-sm text-muted-foreground">
              Última execução: hoje às 14:32
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                Fechar
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}
