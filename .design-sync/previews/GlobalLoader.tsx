import { Card, CardContent, CardHeader, CardTitle, GlobalLoader } from 'archon-ui'

export function Carregando() {
  return (
    <div className="p-6">
      <Card style={{ maxWidth: 420 }}>
        <CardHeader><CardTitle>Dados do contrato</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">Salvando as alterações do contrato CTR-102.</CardContent>
      </Card>
      <GlobalLoader isVisible />
    </div>
  )
}
