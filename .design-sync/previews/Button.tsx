import { Download, Plus, Settings, Trash2 } from 'lucide-react'
import { Button } from 'archon-ui'

export function Variantes() {
  return (
    <div className="flex flex-wrap gap-2" style={{ maxWidth: 576 }}>
      <Button variant="primary">Salvar</Button>
      <Button variant="secondary">Duplicar</Button>
      <Button variant="outline">Cancelar</Button>
      <Button variant="danger">Excluir</Button>
      <Button variant="ghost">Ver mais</Button>
      <Button variant="link">Abrir contrato</Button>
      <Button variant="dark">Publicar</Button>
    </div>
  )
}

export function Contorno() {
  return (
    <div className="flex flex-wrap gap-2" style={{ maxWidth: 576 }}>
      <Button variant="outline-primary">Convidar usuário</Button>
      <Button variant="outline-secondary">Exportar</Button>
      <Button variant="outline-success">Aprovar</Button>
      <Button variant="outline-warning">Solicitar ajuste</Button>
      <Button variant="outline-danger">Cancelar contrato</Button>
    </div>
  )
}

export function Suaves() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="success">Pago</Button>
      <Button variant="warning">Pendente</Button>
      <Button variant="info">Em análise</Button>
    </div>
  )
}

export function Tamanhos() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
      <Button size="icon" variant="outline" aria-label="Configurações"><Settings /></Button>
    </div>
  )
}

export function ComIcone() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button icon={<Plus />}>Novo contrato</Button>
      <Button variant="outline" icon={<Download />} iconPosition="right">Baixar PDF</Button>
      <Button variant="outline-danger" size="icon" aria-label="Excluir"><Trash2 /></Button>
    </div>
  )
}

export function Estados() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button loading>Salvando</Button>
      <Button disabled>Desabilitado</Button>
      <Button variant="outline" disabled>Sem permissão</Button>
    </div>
  )
}
