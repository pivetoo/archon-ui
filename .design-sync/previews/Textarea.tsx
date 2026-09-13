import { Textarea } from 'archon-ui'

export function Estados() {
  return (
    <div className="grid w-96 gap-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="obs">Observações</label>
        <Textarea id="obs" rows={3} defaultValue="Renovação automática ao fim de 12 meses, com reajuste pelo IPCA." />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="motivo">Motivo do cancelamento</label>
        <Textarea id="motivo" rows={2} placeholder="Descreva o motivo" error helperText="Informe o motivo para cancelar." />
      </div>
    </div>
  )
}
