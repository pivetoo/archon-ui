import * as React from 'react'
import { Toaster, toast } from 'archon-ui'

export function Notificacoes() {
  React.useEffect(() => {
    toast({ title: 'Contrato salvo', description: 'As alterações de Mercado Horizonte foram gravadas.', variant: 'success', duration: Infinity })
    toast({ title: 'Vencimento próximo', description: 'A cobrança de Logística Vale vence em 2 dias.', variant: 'warning', duration: Infinity })
    toast({ title: 'Sincronização agendada', description: 'Os dados bancários serão atualizados às 18h.', variant: 'info', duration: Infinity })
  }, [])

  return (
    <div style={{ position: 'relative', height: 380, transform: 'translateZ(0)' }}>
      <Toaster />
    </div>
  )
}
