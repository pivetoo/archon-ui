import { Switch } from 'archon-ui'

export function Configuracoes() {
  return (
    <div className="grid w-96 gap-2 text-sm">
      <div className="flex items-center justify-between rounded-md border p-3">
        <span>Cobrança automática</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between rounded-md border p-3">
        <span>Lembrete antes do vencimento</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between rounded-md border p-3 text-muted-foreground">
        <span>Modo de manutenção</span>
        <Switch disabled />
      </div>
    </div>
  )
}
