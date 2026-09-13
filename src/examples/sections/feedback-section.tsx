import * as React from "react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfirmModal,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Switch,
  Tabs,
  TabsBadge,
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
                Vincule um usuário a um contrato. Os campos com asterisco são obrigatórios.
              </ModalDescription>
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="vinculo-usuario">Usuário *</label>
                <Input id="vinculo-usuario" defaultValue="ana.souza@empresa.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="vinculo-contrato">Contrato *</label>
                <Input id="vinculo-contrato" placeholder="Buscar contrato pelo cliente" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="vinculo-obs">Observações</label>
                <Input id="vinculo-obs" placeholder="Opcional" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Salvar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal open={isTabbedModalOpen} onOpenChange={setIsTabbedModalOpen}>
          <ModalContent size="4xl" className="max-h-[85vh]">
            <ModalHeader>
              <ModalTitle>Configurações do vínculo</ModalTitle>
              <ModalDescription>Dados, acesso e notificações de Ana Souza no contrato Mercado Horizonte.</ModalDescription>
            </ModalHeader>

            <ModalBody>
              <Tabs defaultValue="general" orientation="vertical" className="grid min-h-[380px] gap-6 md:grid-cols-[200px_minmax(0,1fr)]">
                <TabsList className="self-start md:border-r md:border-border/70 md:pr-4">
                  <TabsTrigger value="general">Geral</TabsTrigger>
                  <TabsTrigger value="security">Segurança</TabsTrigger>
                  <TabsTrigger value="notifications">Notificações <TabsBadge>2</TabsBadge></TabsTrigger>
                  <TabsTrigger value="advanced">Avançado</TabsTrigger>
                </TabsList>

                <div className="min-w-0">
                  <TabsContent value="general" className="mt-0 space-y-4">
                    <div>
                      <h3 className="text-base font-semibold">Dados gerais</h3>
                      <p className="text-sm text-muted-foreground">Identificação do usuário neste contrato.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium" htmlFor="cfg-nome">Nome</label>
                        <Input id="cfg-nome" defaultValue="Ana Souza" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium" htmlFor="cfg-email">E-mail</label>
                        <Input id="cfg-email" defaultValue="ana.souza@empresa.com" />
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-sm font-medium" htmlFor="cfg-cargo">Cargo</label>
                        <Input id="cfg-cargo" defaultValue="Analista comercial" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="mt-0 space-y-4">
                    <div>
                      <h3 className="text-base font-semibold">Segurança</h3>
                      <p className="text-sm text-muted-foreground">Política de acesso e sessões.</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span>Exigir segundo fator</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span>Encerrar sessões inativas após 8 horas</span>
                        <Switch />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="mt-0 space-y-4">
                    <div>
                      <h3 className="text-base font-semibold">Notificações</h3>
                      <p className="text-sm text-muted-foreground">O que este usuário recebe por e-mail.</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span>Cobrança paga</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span>Vencimento próximo</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-0 space-y-4">
                    <div>
                      <h3 className="text-base font-semibold">Avançado</h3>
                      <p className="text-sm text-muted-foreground">Integrações e chaves de API deste usuário.</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="cfg-webhook">URL de webhook</label>
                      <Input id="cfg-webhook" placeholder="https://" />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" onClick={() => setIsTabbedModalOpen(false)}>Cancelar</Button>
              <Button onClick={() => setIsTabbedModalOpen(false)}>Salvar</Button>
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
          <SheetContent side="right" size="md">
            <SheetHeader>
              <SheetTitle>Detalhes do processo</SheetTitle>
              <SheetDescription>
                Use o Sheet para mostrar configurações sem navegar de página.
              </SheetDescription>
            </SheetHeader>
            <SheetBody className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div><div className="text-xs font-medium text-muted-foreground">Última execução</div><div className="mt-0.5">Hoje às 14:32</div></div>
                <div><div className="text-xs font-medium text-muted-foreground">Duração</div><div className="mt-0.5">2 min 14 s</div></div>
                <div><div className="text-xs font-medium text-muted-foreground">Situação</div><div className="mt-0.5">Concluído</div></div>
                <div><div className="text-xs font-medium text-muted-foreground">Registros</div><div className="mt-0.5">1.248</div></div>
              </div>
              <p className="text-muted-foreground">O processo roda a cada hora e reconcilia os recebimentos com o extrato bancário.</p>
            </SheetBody>
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
