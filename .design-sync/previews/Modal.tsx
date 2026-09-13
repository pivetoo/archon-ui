import { Button, Input, Modal, ModalBody, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, SearchableSelect } from 'archon-ui'

const planos = [
  { value: 'starter', label: 'Starter' },
  { value: 'professional', label: 'Professional' },
  { value: 'enterprise', label: 'Enterprise' },
]

export function Formulario() {
  return (
    <Modal open>
      <ModalContent size="lg" onOpenAutoFocus={(event) => event.preventDefault()}>
        <ModalHeader>
          <ModalTitle>Novo contrato</ModalTitle>
          <ModalDescription>Informe o cliente e o plano contratado.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="cliente">Cliente</label>
              <Input id="cliente" defaultValue="Mercado Horizonte" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Plano</label>
              <SearchableSelect value="professional" onValueChange={() => undefined} options={planos} placeholder="Selecione o plano" searchPlaceholder="Buscar plano" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar contrato</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
