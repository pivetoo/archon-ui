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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useGlobalLoader,
  useToast,
} from "../../components/ui"

export function FeedbackSection() {
  const { toast } = useToast()
  const { showLoader, hideLoader } = useGlobalLoader()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isTabbedModalOpen, setIsTabbedModalOpen] = React.useState(false)
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
              title: "Registro criado",
              description: "A empresa foi cadastrada com sucesso e já está disponível na listagem.",
              variant: "success",
            })
          }
        >
          Toast de sucesso
        </Button>

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

        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: "Falha de validação",
              description:
                "- O campo Telefone deve conter entre 8 e 30 caracteres válidos.\n- O campo E-mail deve ser um endereço válido.",
              variant: "destructive",
            })
          }
        >
          Toast de erro
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Alterações pendentes",
              description: "Existem campos modificados que ainda não foram salvos.",
              variant: "warning",
            })
          }
        >
          Toast de aviso
        </Button>

        <Button
          variant="outline-primary"
          onClick={() =>
            toast({
              title: "Edição iniciada",
              description: "Você entrou no modo de edição do contrato selecionado.",
              variant: "info",
            })
          }
        >
          Toast de edição
        </Button>

        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          Abrir modal
        </Button>

        <Button variant="outline-primary" onClick={() => setIsTabbedModalOpen(true)}>
          Modal com abas
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
                Este exemplo demonstra a composição padrão do modal no archon-ui.
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

        <Modal open={isTabbedModalOpen} onOpenChange={setIsTabbedModalOpen}>
          <ModalContent size="4xl" className="max-h-[85vh] overflow-hidden p-0">
            <Tabs
              defaultValue="general"
              orientation="vertical"
              className="grid h-full min-h-[560px] md:grid-cols-[190px_minmax(0,1fr)]"
            >
              <div className="border-b bg-muted/40 p-4 md:border-b-0 md:border-r">
                <TabsList className="h-auto w-full gap-1 rounded-xl bg-transparent p-0">
                  <TabsTrigger
                    value="general"
                    className="border border-transparent text-muted-foreground hover:bg-background/70 hover:text-foreground data-[state=active]:border-primary/15 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                  >
                    Geral
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="border border-transparent text-muted-foreground hover:bg-background/70 hover:text-foreground data-[state=active]:border-primary/15 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                  >
                    Segurança
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="border border-transparent text-muted-foreground hover:bg-background/70 hover:text-foreground data-[state=active]:border-primary/15 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                  >
                    Notificações
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="border border-transparent text-muted-foreground hover:bg-background/70 hover:text-foreground data-[state=active]:border-primary/15 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                  >
                    Avançado
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex min-h-0 flex-col">
                <div className="flex-1 overflow-y-auto p-6">
                  <TabsContent value="general" className="space-y-3">
                    <h3 className="text-base font-semibold">Dados gerais</h3>
                    <p className="text-sm text-muted-foreground">
                      Use a primeira aba para dados principais, contexto do cadastro e informações obrigatórias.
                    </p>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-3">
                    <h3 className="text-base font-semibold">Segurança</h3>
                    <p className="text-sm text-muted-foreground">
                      Separe credenciais, política de acesso e chaves em uma área própria para reduzir ruído visual.
                    </p>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-3">
                    <h3 className="text-base font-semibold">Notificações</h3>
                    <p className="text-sm text-muted-foreground">
                      Essa estrutura funciona bem quando o modal tem múltiplos grupos de configuração independentes.
                    </p>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-3">
                    <h3 className="text-base font-semibold">Configurações avançadas</h3>
                    <p className="text-sm text-muted-foreground">
                      O conteúdo principal fica à direita e pode rolar sem deslocar a lista de abas.
                    </p>
                  </TabsContent>
                </div>

                <ModalFooter className="border-t px-6 py-4">
                  <Button variant="outline" onClick={() => setIsTabbedModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsTabbedModalOpen(false)}>Salvar</Button>
                </ModalFooter>
              </div>
            </Tabs>
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
