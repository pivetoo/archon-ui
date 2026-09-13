import { Copy, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button, Dropdown, DropdownContent, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger } from 'archon-ui'

export function MenuDeAcoes() {
  return (
    <div className="flex justify-center pt-4" style={{ height: 256 }}>
      <Dropdown open modal={false}>
        <DropdownTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Ações"><MoreHorizontal /></Button>
        </DropdownTrigger>
        <DropdownContent align="start">
          <DropdownLabel>Contrato 102</DropdownLabel>
          <DropdownSeparator />
          <DropdownItem><Pencil className="mr-2 h-4 w-4" />Editar</DropdownItem>
          <DropdownItem><Copy className="mr-2 h-4 w-4" />Duplicar</DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Excluir</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}
