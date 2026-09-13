import { SearchableSelect } from 'archon-ui'

const clientes = [
  { value: '101', label: 'Mercado Horizonte' },
  { value: '102', label: 'Logística Vale' },
  { value: '103', label: 'Clínica Aurora' },
  { value: '104', label: 'Transportes Nobre' },
]

export function Selecionado() {
  return (
    <div className="w-72 space-y-1.5">
      <label className="text-sm font-medium">Cliente</label>
      <SearchableSelect value="102" onValueChange={() => undefined} options={clientes} placeholder="Selecione o cliente" searchPlaceholder="Buscar cliente" />
    </div>
  )
}

export function Vazio() {
  return (
    <div className="w-72 space-y-1.5">
      <label className="text-sm font-medium">Cliente</label>
      <SearchableSelect onValueChange={() => undefined} options={clientes} placeholder="Selecione o cliente" searchPlaceholder="Buscar cliente" />
    </div>
  )
}

export function Desabilitado() {
  return (
    <div className="w-72 space-y-1.5">
      <label className="text-sm font-medium">Modelo de proposta</label>
      <SearchableSelect onValueChange={() => undefined} options={[]} placeholder="Nenhum modelo cadastrado" disabled />
    </div>
  )
}
