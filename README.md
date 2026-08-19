# archon-ui

Biblioteca React que serve de base para as SPAs construídas sobre o Archon Framework. Além dos
componentes visuais, ela entrega o runtime que essas aplicações compartilham: autenticação OIDC,
cliente HTTP alinhado ao envelope de resposta da API, internacionalização com catálogo vindo do
backend, permissões a partir das claims do token e o shell de layout (sidebar, navbar, breadcrumb).

A ideia é que uma aplicação nova só precise escrever as telas do domínio dela. Login, refresh de
token, tradução, tema, layout, tabelas e formulários já vêm resolvidos.

## Stack

| Área | Tecnologia |
| --- | --- |
| Framework | React 19 |
| Linguagem | TypeScript 5.9 |
| Build | Vite 7 (library mode, ESM + UMD) |
| Estilos | Tailwind CSS 3.4 |
| Primitivos acessíveis | Radix UI |
| Gráficos | Nivo (bar, line, pie) |
| HTTP | axios |
| Ícones | lucide-react |

Peer dependencies (ficam a cargo da aplicação consumidora): `react`, `react-dom` e `react-router-dom`.

## Instalação

A biblioteca não é publicada em registry. Aplicações consomem por caminho local:

```json
{
  "dependencies": {
    "archon-ui": "file:../caminho/para/archon-ui"
  }
}
```

### O `dist/` é versionado

O diretório `dist/` está commitado no repositório de propósito, porque o consumo por `file:` não
dispara build da dependência. A consequência prática:

**Alterar `src/` não tem efeito nenhum no consumidor até que você rode `npm run build` e comite o
`dist/` resultante.** É a causa mais comum de "mudei o componente e não mudou nada na aplicação".

```bash
npm run build
git add dist
git commit -m "feat: descricao da mudanca"
```

## Configuração na aplicação

### 1. Estilos e Tailwind

```tsx
import 'archon-ui/styles'
```

O Tailwind da aplicação precisa varrer o `dist/` da biblioteca, senão as classes usadas pelos
componentes são removidas na purga e a interface sobe sem estilo:

```js
// tailwind.config.js da aplicação
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/archon-ui/dist/**/*.{js,mjs}",
  ],
}
```

O tema usa variáveis CSS em HSL (`--primary`, `--background`, `--border`, `--radius` etc.) e modo
escuro por classe. A aplicação sobrescreve as variáveis para aplicar a identidade visual dela.

### 2. URLs das APIs

```tsx
setApiBaseURL(import.meta.env.VITE_API_BASE_URL)
setIdentityManagementURL(import.meta.env.VITE_IDENTITY_MANAGEMENT_URL)
```

A primeira é a API da própria aplicação. A segunda é o provedor de identidade, usado no fluxo OIDC e
na renovação de token.

### 3. Árvore de providers

A ordem não é arbitrária: o `I18nProvider` carrega o catálogo pelo cliente HTTP, e o `AuthProvider`
depende do loader global já estar disponível.

```tsx
import { AuthProvider, ThemeProvider, GlobalLoaderProvider, I18nProvider, useGlobalLoader,
         setGlobalLoaderContext, Toaster, setApiBaseURL, setIdentityManagementURL } from 'archon-ui'

function AppContent() {
  const globalLoaderContext = useGlobalLoader()

  useEffect(() => {
    setGlobalLoaderContext(globalLoaderContext)
  }, [globalLoaderContext])

  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <GlobalLoaderProvider>
        <I18nProvider>
          <AppContent />
        </I18nProvider>
      </GlobalLoaderProvider>
    </ThemeProvider>
  )
}
```

## Autenticação

O fluxo é OIDC Authorization Code com PKCE, contra o provedor de identidade do ecossistema.

1. `ProtectedRoute` detecta que não há sessão e monta a URL de autorização: gera `code_verifier`
   aleatório, deriva o `code_challenge` por SHA-256 (`code_challenge_method=S256`), sorteia `state` e
   `nonce`, guarda os três em `sessionStorage` e redireciona.
2. O provedor autentica e volta para a rota de callback com `code` e `state`.
3. `Callback` valida `state` contra o valor guardado, troca o código pelo token enviando o
   `code_verifier`, e valida o `nonce` no `id_token`.
4. Tokens e dados do usuário vão para o `localStorage`; a aplicação segue para a rota original.

A validação é estrita de propósito: `state` divergente, `code_verifier` ausente, access token
expirado, refresh token ausente ou `nonce` que não confere abortam o login em vez de seguir com
sessão parcialmente verificada.

`ProtectedRoute` também aceita entrada por sessão de autorização vinda do provedor
(`authorizationSessionToken` + `contractId` no fragmento da URL), usada quando o acesso parte de um
portal central em vez da própria aplicação.

### Renovação de token

O provedor **rotaciona** o refresh token: ao renovar, revoga o token apresentado e emite outro.

Por isso a renovação tem ponto único com single-flight — duas renovações concorrentes fariam a
segunda apresentar um token já revogado, derrubando a sessão do usuário no meio do uso. Não crie um
segundo caminho de refresh na aplicação; use o exportado pela biblioteca.

Quando a renovação falha em definitivo, a sessão local é limpa e o controle volta para a aplicação
pelo handler registrado pelo `AuthProvider`, preservando a rota atual em vez de dar um redirect duro.

### Chaves de armazenamento

Todas prefixadas com `@Archon:`, centralizadas em um único módulo (um typo em literal repetido não
quebra build nem lint — aparece como "usuário deslogado sozinho").

| Chave | Onde vive | Conteúdo |
| --- | --- | --- |
| `@Archon:accessToken` | localStorage | Access token |
| `@Archon:refreshToken` | localStorage | Refresh token |
| `@Archon:user` | localStorage | Usuário autenticado |
| `@Archon:contract` | localStorage | Contrato/tenant ativo |
| `@Archon:oidcClientId` | localStorage | Client ID usado no login |
| `@Archon:language` | localStorage | Idioma escolhido |
| `@Archon:oidc:state`, `:nonce`, `:codeVerifier`, `:redirectUri` | sessionStorage | Consumidas uma vez no callback |

A leitura de JSON do storage é tolerante a lixo: valor corrompido é descartado em vez de estourar no
boot do `AuthProvider`.

## Cliente HTTP

`httpClient` é um axios configurado para o contrato do Archon:

- Injeta o token e o idioma corrente nos headers.
- Desembrulha o envelope `ApiResponse` quando ele existe, devolvendo `data` direto.
- Renova o token e repete a request em caso de 401.
- Integra com o loader global.

## Hooks

| Hook | Para que serve |
| --- | --- |
| `useApi` | Executa chamadas mantendo `data`, `loading`, `error`, `message` e `pagination`; toast automático de sucesso/erro |
| `usePermissions` | `permissions`, `isRoot`, `hasPermission`, `hasAnyPermission`, `hasAllPermissions` |
| `useNotifications` | Notificações in-app servidas pela API |
| `useFormErrors` | Erros de validação por campo, a partir do envelope de erro |
| `useAppNavigation` | Navegação do shell |
| `useBreadcrumbs` | Breadcrumb derivado da rota |
| `useModuleNav` | Navegação por módulos, com resolução de módulo/rota ativa |

`usePermissions` lê as claims `permission` e `root` direto do access token. `root` concede tudo sem
consultar a lista.

`useApi` reconhece o envelope da API e extrai a paginação automaticamente; se a resposta não for um
envelope, ela é usada como está.

## Internacionalização

Três culturas suportadas: `pt-BR` (padrão), `en-US` e `es-AR`.

O `I18nProvider` resolve a cultura inicial na ordem: valor salvo em `localStorage`, idioma do
navegador, padrão. Em seguida busca o catálogo de traduções na própria API
(`/Localization/catalog?lang=...`) — os textos vivem no backend, não em arquivos JSON no frontend.

Consequência prática: adicionar ou corrigir um texto exige mexer nos resources do backend e
publicá-lo. Rebuild do frontend sozinho não muda tradução.

Um `catalogLoader` customizado pode ser passado ao provider quando a aplicação precisar de outra
origem de catálogo.

## Componentes

Exportados por `src/components/ui`, além dos componentes de rota. Agrupados abaixo por finalidade.

**Formulários e entrada**
`Button`, `Input`, `Textarea`, `FormField`, `Checkbox`, `Select`, `SearchableSelect`, `RadioGroup`,
`Switch`, `SearchBar`

**Sobreposição e feedback**
`Modal`, `ConfirmModal`, `Sheet`, `Toast`, `Toaster`, `useToast`, `Tooltip`,
`Popover`, `Dropdown`, `GlobalLoader`, `useGlobalLoader`, `Skeleton`, `EmptyState`, `Badge`

**Dados**
`Table`, `TableToolbar`, `DataTable`, `DataTablePreview`, `FilterDropdown`, `FilterPanel`,
e o conjunto de leitura `SheetPreviewHeader`, `SheetPreviewSection`, `SheetPreviewGrid`,
`SheetPreviewField`

**Gráficos**
`ChartContainer`, `BarChart`, `LineChart`, `AreaChart`, `PieChart`, e os hooks de tema
`useNivoTheme`, `useChartColors`, `useIsDark`

**Layout e navegação**
`AppLayout`, `PageLayout`, `Sidebar`, `Navbar`, `Breadcrumb`, `ModulePanel`, `ModuleRail`,
`ModuleNavMobile`, `UserMenu`, `SettingsMenu`, `CommandPalette`, `Tabs`, `Card`, `LanguageFlag`

**Usuário e administração**
`UserProfilePanel`, `UserProfilePage`, `UserProfileModal`, `UsersManagementPage`

**Tema**
`useTheme`

**Rotas** (`src/components/routing`)
`ProtectedRoute`, `Callback`

### Comportamentos que valem conhecer

- `DataTable` vira cards abaixo do breakpoint `md`, usando a coluna marcada como primária como título
  do card. Colunas marcadas para ocultar em telas menores ficam de fora do card.
- `PageLayout` colapsa as ações do cabeçalho em um menu quando são mais de duas no mobile; ações
  marcadas como primárias continuam visíveis. Uma ação pode agrupar sub-ações em menu próprio.
- `SearchableSelect` é o padrão para listas vindas de API (busca embutida, suporte a ícone por item).
  `Select` serve para listas curtas e fixas.
- Os gráficos Nivo respeitam o tema claro/escuro, incluindo tooltip e crosshair.
- `UsersManagementPage` é uma tela inteira pronta de gestão de usuários e perfis, com abas opcionais
  e possibilidade de rotear perfil e avatar pela API da aplicação via callbacks.

## Playground

O repositório roda como aplicação Vite normal, com uma página de exemplos que exercita os
componentes:

```bash
npm install
npm run dev
```

Os exemplos ficam em `src/examples`. Quando algo aparecer errado ali, verifique primeiro se o
problema é do exemplo antes de alterar o componente.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Playground de desenvolvimento |
| `npm run build` | Type-check e build da biblioteca em `dist/` (ESM, UMD, tipos e CSS) |
| `npm run lint` | ESLint |
| `npm run docs:api` | Build seguido de geração da documentação de API com TypeDoc |
| `npm run docs:api:fast` | TypeDoc sem rebuild |

## Build

Vite em library mode, com entrada em `src/index.ts`:

- `dist/index.js` (ESM) e `dist/index.umd.cjs` (UMD)
- `dist/index.d.ts` com os tipos consolidados
- `dist/style.css`, exposto como `archon-ui/styles`

`react`, `react-dom`, `react/jsx-runtime` e `react-router-dom` ficam externos ao bundle, para não
duplicar React na aplicação consumidora.
