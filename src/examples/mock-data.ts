export interface PersonRow {
  id: number
  nome: string
  email: string
  status: "Ativo" | "Pendente" | "Inativo"
  perfil: string
}

export interface ContractRow {
  id: number
  cliente: string
  plano: string
  valorMensal: number
  situacao: "Ativo" | "Bloqueado" | "Em implantação"
}

export const personRows: PersonRow[] = [
  { id: 1, nome: "Ana Souza", email: "ana.souza@empresa.com", status: "Ativo", perfil: "Administrador" },
  { id: 2, nome: "Bruno Lima", email: "bruno.lima@empresa.com", status: "Pendente", perfil: "Supervisor" },
  { id: 3, nome: "Carla Mendes", email: "carla.mendes@empresa.com", status: "Ativo", perfil: "Operador" },
  { id: 4, nome: "Diego Rocha", email: "diego.rocha@empresa.com", status: "Inativo", perfil: "Operador" },
  { id: 5, nome: "Elisa Martins", email: "elisa.martins@empresa.com", status: "Ativo", perfil: "Financeiro" },
  { id: 6, nome: "Felipe Nunes", email: "felipe.nunes@empresa.com", status: "Pendente", perfil: "Suporte" },
]

export const contractRows: ContractRow[] = [
  { id: 101, cliente: "Mercado Horizonte", plano: "Enterprise", valorMensal: 3290, situacao: "Ativo" },
  { id: 102, cliente: "Logística Vale", plano: "Professional", valorMensal: 1490, situacao: "Em implantação" },
  { id: 103, cliente: "Clínica Aurora", plano: "Starter", valorMensal: 690, situacao: "Bloqueado" },
  { id: 104, cliente: "Transportes Nobre", plano: "Professional", valorMensal: 1490, situacao: "Ativo" },
]

export const revenueByMonth = [
  { mes: "Jan", receita: 42000, custo: 28000 },
  { mes: "Fev", receita: 47000, custo: 30000 },
  { mes: "Mar", receita: 51000, custo: 31500 },
  { mes: "Abr", receita: 49500, custo: 32200 },
  { mes: "Mai", receita: 54800, custo: 34100 },
  { mes: "Jun", receita: 57300, custo: 35200 },
]

export const ticketByChannel = [
  { name: "Portal", value: 38 },
  { name: "E-mail", value: 22 },
  { name: "WhatsApp", value: 28 },
  { name: "Telefone", value: 12 },
]

export const executionHistory = [
  { dia: "Seg", sucesso: 91, falha: 9 },
  { dia: "Ter", sucesso: 93, falha: 7 },
  { dia: "Qua", sucesso: 89, falha: 11 },
  { dia: "Qui", sucesso: 95, falha: 5 },
  { dia: "Sex", sucesso: 96, falha: 4 },
]
