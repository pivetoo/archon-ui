import { Tabs, TabsBadge, TabsContent, TabsList, TabsTrigger } from 'archon-ui'

export function Padrao() {
  return (
    <Tabs defaultValue="dados" className="max-w-lg">
      <TabsList>
        <TabsTrigger value="dados">Dados</TabsTrigger>
        <TabsTrigger value="cobrancas">Cobranças <TabsBadge>3</TabsBadge></TabsTrigger>
        <TabsTrigger value="historico">Histórico</TabsTrigger>
      </TabsList>
      <TabsContent value="dados" className="pt-3 text-sm text-muted-foreground">
        Informações cadastrais do cliente e do plano contratado.
      </TabsContent>
    </Tabs>
  )
}

export function Sublinhado() {
  return (
    <Tabs defaultValue="cobrancas" className="max-w-lg">
      <TabsList variant="underline">
        <TabsTrigger value="dados">Dados</TabsTrigger>
        <TabsTrigger value="cobrancas">Cobranças <TabsBadge>3</TabsBadge></TabsTrigger>
        <TabsTrigger value="historico">Histórico</TabsTrigger>
      </TabsList>
      <TabsContent value="cobrancas" className="pt-3 text-sm text-muted-foreground">
        Três cobranças em aberto neste contrato.
      </TabsContent>
    </Tabs>
  )
}
