import { Bell, Download, Settings } from "lucide-react"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui"

export function PrimitivesSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Buttons e Badge</CardTitle>
          <CardDescription>Estados e variantes principais.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Salvar</Button>
            <Button variant="secondary">Duplicar</Button>
            <Button variant="outline">Cancelar</Button>
            <Button variant="danger">Excluir</Button>
            <Button variant="primary" loading>Processando</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Ativo</Badge>
            <Badge variant="warning">Atenção</Badge>
            <Badge variant="info">Informativo</Badge>
            <Badge variant="destructive">Erro</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tooltip e Dropdown</CardTitle>
          <CardDescription>Interações comuns de barra de ações.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Notificações">
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notificações do usuário</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="outline" icon={<Settings className="h-4 w-4" />}>Ações</Button>
            </DropdownTrigger>
            <DropdownContent align="start">
              <DropdownLabel>Projeto</DropdownLabel>
              <DropdownSeparator />
              <DropdownItem>Configurações</DropdownItem>
              <DropdownItem>Permissões</DropdownItem>
              <DropdownItem>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </CardContent>
      </Card>
    </div>
  )
}
