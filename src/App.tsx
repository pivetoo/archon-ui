import { GlobalLoaderProvider, ThemeProvider, Toaster } from "./components/ui"
import { ExamplesCatalog } from "./examples"
import { I18nProvider, type ArchonCulture, type LocalizationCatalog } from "./i18n"

const mockCatalog: Partial<Record<ArchonCulture, LocalizationCatalog>> = {
  "pt-BR": {
    culture: "pt-BR",
    uiCulture: "pt-BR",
    messages: {
      "auth.signIn": "Entrar",
      "auth.signOut": "Sair",
      "auth.email": "E-mail",
      "auth.password": "Senha",
      "auth.invalidCredentials": "Credenciais invalidas",
      "auth.successful": "Login realizado com sucesso",
      "common.action.search": "Buscar...",
      "common.action.confirm": "Confirmar",
      "common.action.cancel": "Cancelar",
      "common.action.close": "Fechar",
      "common.toast.warningTitle": "Atenção",
      "confirm.title": "Confirmar Ação",
      "confirm.description": "Tem certeza de que deseja continuar?",
      "chart.empty": "Sem dados disponíveis",
      "pageLayout.add.title": "Novo",
      "pageLayout.add.description": "Clique em \"Novo\" para adicionar um registro.",
      "pageLayout.view.selectOne": "Selecione um registro para visualizar.",
      "pageLayout.edit.title": "Editar",
      "pageLayout.edit.description": "Edite o registro selecionado.",
      "pageLayout.edit.selectOne": "Selecione um registro para editar.",
      "pageLayout.delete.title": "Excluir",
      "pageLayout.delete.selectOne": "Selecione um registro para excluir.",
      "pageLayout.delete.confirm": "Deseja realmente excluir os registros selecionados?",
      "pageLayout.refresh.tooltip": "Atualizar",
      "table.empty": "Nenhum registro encontrado.",
      "table.of": "de",
      "table.perPage": "por página",
      "table.selected": "selecionado(s)"
    }
  },
  "en-US": {
    culture: "en-US",
    uiCulture: "en-US",
    messages: {
      "auth.signIn": "Sign In",
      "auth.signOut": "Sign Out",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.invalidCredentials": "Invalid credentials",
      "auth.successful": "Login successful",
      "common.action.search": "Search...",
      "common.action.confirm": "Confirm",
      "common.action.cancel": "Cancel",
      "common.action.close": "Close",
      "common.toast.warningTitle": "Warning",
      "confirm.title": "Confirm Action",
      "confirm.description": "Are you sure you want to continue?",
      "chart.empty": "No data available",
      "pageLayout.add.title": "New",
      "pageLayout.add.description": "Click \"New\" to add a record.",
      "pageLayout.view.selectOne": "Select a record to view.",
      "pageLayout.edit.title": "Edit",
      "pageLayout.edit.description": "Edit the selected record.",
      "pageLayout.edit.selectOne": "Select a record to edit.",
      "pageLayout.delete.title": "Delete",
      "pageLayout.delete.selectOne": "Select a record to delete.",
      "pageLayout.delete.confirm": "Are you sure you want to delete the selected records?",
      "pageLayout.refresh.tooltip": "Refresh",
      "table.empty": "No records found.",
      "table.of": "of",
      "table.perPage": "per page",
      "table.selected": "selected"
    }
  }
}

const loadMockCatalog = async (culture: ArchonCulture): Promise<LocalizationCatalog> => {
  return mockCatalog[culture] ?? mockCatalog["pt-BR"]!
}

function App() {
  return (
    <I18nProvider initialCulture="pt-BR" catalogLoader={loadMockCatalog}>
      <ThemeProvider>
        <GlobalLoaderProvider>
          <ExamplesCatalog />
          <Toaster />
        </GlobalLoaderProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default App
