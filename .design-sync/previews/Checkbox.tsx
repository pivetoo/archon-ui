import { Checkbox } from 'archon-ui'

export function Estados() {
  return (
    <div className="grid gap-3 text-sm">
      <label className="flex items-center gap-2"><Checkbox defaultChecked />Enviar cobrança por e-mail</label>
      <label className="flex items-center gap-2"><Checkbox />Enviar cobrança por WhatsApp</label>
      <label className="flex items-center gap-2 text-muted-foreground"><Checkbox checked disabled />Registrar no histórico (obrigatório)</label>
      <label className="flex items-center gap-2 text-muted-foreground"><Checkbox disabled />Integração bancária indisponível</label>
    </div>
  )
}
