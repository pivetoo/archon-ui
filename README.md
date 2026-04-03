# archon-ui

Framework frontend do `Archon` para aplicações React.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI

## Funcionalidades

- componentes base de UI;
- layout, sidebar, navbar, breadcrumb e page layout;
- modal, sheet, toast e loader global;
- tabelas e gráficos;
- `AuthProvider`, `ProtectedRoute` e `Callback`;
- `httpClient` com suporte a token e refresh;
- `useApi` alinhado ao envelope do `Archon`;
- `usePermissions` usando claims `permission` e `root`;
- examples para playground local.

## Convenções atuais

- storage local:
  - `@Archon:user`
  - `@Archon:contract`
  - `@Archon:accessToken`
  - `@Archon:refreshToken`
- auth integrada ao `IdentityManagement`
- responses no formato:

```json
{
  "message": "",
  "data": {},
  "errors": null,
  "pagination": null
}
```

- paginação no formato:

```json
{
  "page": 1,
  "pageSize": 20,
  "totalCount": 150,
  "totalPages": 8,
  "hasPreviousPage": false,
  "hasNextPage": true
}
```

## Setup básico

Na aplicação consumidora:

```tsx
import 'archon-ui/styles'
```

Configuração inicial:

```tsx
setApiBaseURL(import.meta.env.VITE_API_BASE_URL)
setIdentityManagementURL(import.meta.env.VITE_IDENTITY_MANAGEMENT_URL)
```

Estrutura base:

```tsx
<ThemeProvider>
  <GlobalLoaderProvider>
    <App />
    <Toaster />
  </GlobalLoaderProvider>
</ThemeProvider>
```

## Build

```bash
npm run build
```