import { Badge, Button, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from 'archon-ui'

export function PainelLateral() {
  return (
    <Sheet open modal={false}>
      <SheetContent side="right" className="w-full sm:max-w-md" onOpenAutoFocus={(event) => event.preventDefault()}>
        <SheetHeader>
          <SheetTitle>Logística Vale</SheetTitle>
          <SheetDescription>Resumo do contrato selecionado na listagem.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4 text-sm">
          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="text-muted-foreground">Situação</span>
            <Badge variant="warning">Em implantação</Badge>
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="text-muted-foreground">Valor mensal</span>
            <span className="font-medium">R$ 1.490,00</span>
          </div>
        </div>
        <SheetFooter className="mt-6">
          <Button variant="outline-primary" size="sm">Abrir detalhes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
