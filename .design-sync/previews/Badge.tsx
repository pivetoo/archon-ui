import { Badge } from 'archon-ui'

export function Variantes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Padrão</Badge>
      <Badge variant="secondary">Novo</Badge>
      <Badge variant="success">Ativo</Badge>
      <Badge variant="warning">Pendente</Badge>
      <Badge variant="info">Em análise</Badge>
      <Badge variant="destructive">Bloqueado</Badge>
      <Badge variant="outline">Rascunho</Badge>
    </div>
  )
}

export function StatusDeContrato() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="font-medium">Mercado Horizonte</span>
      <Badge variant="success">Ativo</Badge>
      <span className="text-muted-foreground">Plano Enterprise</span>
    </div>
  )
}
