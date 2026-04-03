import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  RadioGroup,
  RadioGroupItem,
  SearchableSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "../../components/ui"

const systems = [
  { value: "portal", label: "FinanceChannel" },
  { value: "workforce", label: "MarketChannel" },
  { value: "identity", label: "IdentityProvider" },
]

export function FormsSection() {
  const [name, setName] = React.useState("João da Silva")
  const [email, setEmail] = React.useState("joao.silva@empresa.com")
  const [system, setSystem] = React.useState("portal")
  const [profile, setProfile] = React.useState("admin")
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Formulários</CardTitle>
        <CardDescription>Inputs, selects e controles de seleção.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Nome completo</label>
          <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Digite o nome" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">E-mail</label>
          <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Digite o e-mail" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sistema</label>
          <SearchableSelect options={systems} value={system} onValueChange={setSystem} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tenant</label>
          <Select defaultValue="tenant-1">
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tenant-1">Tenant 1</SelectItem>
              <SelectItem value="tenant-2">Tenant 2</SelectItem>
              <SelectItem value="tenant-3">Tenant 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Perfil</p>
          <RadioGroup value={profile} onValueChange={setProfile} className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="admin" />
              Administrador
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="manager" />
              Gestor
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="operator" />
              Operador
            </label>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between rounded-md border p-3 text-sm">
            Receber notificações
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked === true)} />
            Aceito os termos de uso
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
