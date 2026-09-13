import { Input } from 'archon-ui'

export function Estados() {
  return (
    <div className="grid w-80 gap-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="cliente">Nome do cliente</label>
        <Input id="cliente" placeholder="Ex.: Mercado Horizonte" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="email">E-mail</label>
        <Input id="email" type="email" defaultValue="financeiro@horizonte.com.br" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="cnpj">CNPJ</label>
        <Input id="cnpj" defaultValue="12.345.678/0001" error helperText="CNPJ incompleto." />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="codigo">Código</label>
        <Input id="codigo" defaultValue="CTR-102" disabled helperText="Gerado automaticamente." />
      </div>
    </div>
  )
}
