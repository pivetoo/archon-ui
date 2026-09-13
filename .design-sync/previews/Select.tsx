import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'archon-ui'

export function Fechado() {
  return (
    <div className="w-64 space-y-1.5">
      <label className="text-sm font-medium">Plano</label>
      <Select defaultValue="professional">
        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="starter">Starter</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function Aberto() {
  return (
    <div className="w-64 space-y-1.5" style={{ height: 224 }}>
      <label className="text-sm font-medium">Plano</label>
      <Select defaultValue="professional" open>
        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="starter">Starter</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
