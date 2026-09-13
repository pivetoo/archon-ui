import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'archon-ui'

export function Completo() {
  return (
    <Card style={{ maxWidth: 448 }}>
      <CardHeader>
        <CardTitle>Dados do contrato</CardTitle>
        <CardDescription>Plano, valor e vencimento da cobrança.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-muted-foreground">Plano</div>
          <div className="font-medium">Professional</div>
        </div>
        <div>
          <div className="text-muted-foreground">Valor mensal</div>
          <div className="font-medium">R$ 1.490,00</div>
        </div>
        <div>
          <div className="text-muted-foreground">Vencimento</div>
          <div className="font-medium">Dia 10</div>
        </div>
        <div>
          <div className="text-muted-foreground">Situação</div>
          <Badge variant="success">Ativo</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar</Button>
      </CardFooter>
    </Card>
  )
}

export function Indicadores() {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", maxWidth: 672 }}>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Receita do mês</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-semibold">R$ 128.450</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Contratos ativos</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-semibold">342</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Inadimplência</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-semibold">2,4%</p></CardContent>
      </Card>
    </div>
  )
}
