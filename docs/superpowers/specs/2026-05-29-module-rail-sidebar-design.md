# Sidebar por módulos (rail + painel) — Design

Data: 2026-05-29
Status: aprovado (direção), pronto para plano de implementação
Origem: handoff de design `Sidebar Navigation Prototype.html` (Claude Design) + decisão de produto do Kanvas

> **Revisão 2026-05-30:** removida a feature de cor por módulo (a pedido do usuário). Toda a navegação por módulos usa apenas `primary`; o módulo ativo no rail virou um tile preenchido com `bg-primary/10` + `text-primary` (sem a barra `|` lateral), igual ao estado ativo do Geral. As menções a "cor por módulo" nas seções 2.4 e 8 ficam como registro histórico.

## 1. Contexto e objetivo

Hoje o `archon-ui` tem uma `Sidebar` plana: colapsa/descolapsa, mas todas as seções/rotas ficam visíveis ao mesmo tempo. Consumida por 3 sistemas (`IdentityManagement`, `IntegrationPlatform`, `AgencyCampaign`/Kanvas) via `AppLayout` + `menuGroups`.

Objetivo: adicionar uma **segunda navegação opt-in** no padrão **rail de ícones (64px) + painel de rotas persistente** (two-level nav), **sem quebrar a sidebar atual** nem a API atual do `AppLayout`. Adoção inicial: **apenas o Kanvas**. Os outros dois sistemas permanecem 100% na sidebar plana.

O padrão escolhido é o "icon rail + contextual panel" na variante **persistente** (painel fica aberto enquanto o usuário trabalha no módulo), não a variante flyout (que fecha a cada clique). Justificativa: o Kanvas é trabalho focado — o usuário passa horas dentro de um módulo; fechar o painel a cada clique custaria contexto.

## 2. Decisões fechadas

1. **Escopo:** componente compartilhado no `archon-ui`, adotado **só no Kanvas**. `IdentityManagement` e `IntegrationPlatform` ficam intactos (flat).
2. **Estado inicial:** painel **aberto no módulo da rota atual**; colapsável com `«`; preferência de colapsado persistida em `localStorage`.
3. **Navbar:** **mantém a Navbar atual** (52px, com breadcrumb/notificações/perfil). O rail+painel entram à esquerda; a navbar continua à direita deles reaproveitando o offset que já existe. O **module-switcher** da navbar (dropdown Painel/Configuração) é ocultado quando `navMode='module-rail'` (o rail substitui essa função).
4. **Cor por módulo:** mantida (orientação espacial), porém mapeada para valores token-friendly com variante dark — nunca os hex crus do protótipo.
5. **Configuração única (recomendação aceita):** o protótipo previa Configuração/Parâmetros/Integrações como 3 módulos de sistema, mas o Kanvas real não tem fronteira limpa de "Parâmetros" (regras de negócio espalhadas dentro de Configuração). Mantém-se **uma única Configuração com sub-grupos** + **Integrações como módulo próprio**. Split Configuração/Parâmetros fica como trabalho futuro (re-categorização de rotas), fora deste escopo.

## 3. Arquitetura (opt-in, sem regressão)

### Novo no `archon-ui` (compartilhado)
- `src/components/ui/module-nav/` (ou arquivos `module-rail.tsx` + `module-panel.tsx` + `types.ts`):
  - `ModuleRail` — rail de 64px com ícones de módulo, grupos op/sys separados por divisor, badge de pendência, indicador de módulo ativo (a barrinha `bg-primary` já usada na sidebar atual, `sidebar.tsx:120`), tooltips no hover, marca no topo e avatar no rodapé.
  - `ModulePanel` — painel (~232px) das rotas do módulo ativo: header (ícone+label+cor do módulo + botão `«`), corpo em **lista plana** (módulos operacionais) **ou sub-grupos** (Configuração), e estados ativo/hover iguais à sidebar atual.
  - Tipos: `NavRoute`, `NavSubGroup`, `NavModule`, `ModuleNavConfig`.
- `src/hooks/useModuleNav.ts` — deriva o módulo ativo da rota, gerencia colapsado (localStorage), e a lógica de clique (rota única = navega direto; multi-rota = abre painel).
- Barrels: adicionar `export * from './module-nav'` em `src/components/ui/index.ts` e `export * from './useModuleNav'` em `src/hooks/index.ts`.

### Alteração mínima no `AppLayout` (`src/components/ui/app-layout.tsx`)
- Novas props: `navMode?: 'flat' | 'module-rail'` (**default `'flat'`**) e `moduleNav?: ModuleNavConfig`.
- `navMode='flat'` (ou ausente): JSX atual **inalterado** — `Sidebar` + `Navbar` + `main`.
- `navMode='module-rail'`: renderiza `ModuleRail` + `ModulePanel` (no lugar de `Sidebar`), ajusta os offsets de `Navbar`/`main`, e **não passa** `modules`/`currentModule`/`onModuleChange` para a navbar (switcher some).

### Alteração no Kanvas (`AgencyCampaignLayout.tsx`)
- Construir `moduleNav: ModuleNavConfig` reaproveitando os defs existentes (`systemGroupDefs`/`configurationGroupDefs`) e o filtro de permissão (`canShow`/`filterItems`).
- Passar `navMode="module-rail"` + `moduleNav` ao `AppLayout`; **parar de passar** `modules`/`currentModule`/`onModuleChange` (o rail substitui o switcher). Breadcrumbs, notificações e perfil seguem como estão.

## 4. Modelo de dados

```ts
export interface NavRoute {
  key: string
  label: string
  path: string
  icon: React.ReactNode
  badge?: number            // pendências (ex.: Aprovações)
  requires?: string[]       // permissões; filtro reaproveita usePermissions do consumidor
}

export interface NavSubGroup {
  label: string
  routes: NavRoute[]
}

export interface NavModule {
  key: string
  label: string
  icon: React.ReactNode
  color: ModuleColor        // accent do módulo (token-friendly)
  group: 'op' | 'sys'       // operacional (topo) vs sistema (base), divisor entre eles
  routes?: NavRoute[]       // painel plano (módulos operacionais)
  subGroups?: NavSubGroup[] // painel agrupado (Configuração)
}

export type ModuleNavConfig = NavModule[]
```

Regra: um `NavModule` tem `routes` **ou** `subGroups`. Total de rotas visíveis do módulo (após filtro de permissão) = 1 → clique navega direto, painel não abre. ≥ 2 → abre painel.

## 5. Geometria

Reaproveita o mecanismo de offset da navbar (`navbar.tsx:207-209`) e do main (`app-layout.tsx:165-169`):

```
┌────┬──────────────────┬───────────────────────────────┐
│ M  │  COMERCIAL    «   │  navbar: breadcrumb · 🔔 · 👤  │ 52px
│ 📊 │                   ├───────────────────────────────┤
│ 🏷 │  Marcas           │                               │
│ 📣 │  Pipeline       ● │            conteúdo           │
│ 💰 │  Propostas        │                               │
│ ── │  Aprovações  [2]  │                               │
│ ⚙  │  Metas            │                               │
│ 🔌 │                   │                               │
│ RP │                   │                               │
└────┴──────────────────┴───────────────────────────────┘
 64px      ~232px
```

- Rail: `fixed left-0 top-0 h-screen w-[64px]`, `z-40` (igual à sidebar atual), `bg-card`.
- Painel: `fixed left-[64px] top-0 h-screen w-[232px]`, `bg-card`, `border-r`. Some quando colapsado ou módulo de rota única.
- Navbar `left` e `main ml`:
  - colapsado (ou módulo de rota única): `64px`
  - painel aberto: `64 + 232 = 296px`
- Mobile (<lg, `max-width:1023px`): rail+painel não ficam fixos; o hambúrguer da navbar abre **um drawer único em overlay** (reaproveita o overlay/backdrop da sidebar atual, `sidebar.tsx:138-152`) listando os módulos como acordeão (módulo = cabeçalho, rotas = itens). `navbar left = 0`, `main ml-0`.

## 6. Mapeamento dos módulos do Kanvas

Reaproveitando rotas/permissões reais de `AgencyCampaignLayout.tsx`.

### Operacionais (group `op`, topo)
- **geral** — icon `Home`/`LayoutDashboard`, cor primary. Rotas: Dashboard (`/`, requires `dashboard.overview`/`dashboard.charts`). Rota única → navega direto.
- **comercial** — icon `TrendingUp`, cor secondary. Rotas: Marcas (`/marcas`), Pipeline (`/comercial/pipeline`), Propostas (`/comercial/propostas`), Aprovações (`/comercial/aprovacoes`, badge se houver pendência), Metas (`/comercial/metas`).
- **producao** — icon `Megaphone`, cor roxo. Rotas: Creators (`/creators`), Campanhas (`/campanhas`), Calendário (`/operacao/calendario`), Aprovações (`/operacao/aprovacoes`, badge).
- **financas** — icon `Wallet`, cor verde. Rotas: Contas bancárias (`/financeiro/contas`), Contas a receber (`/financeiro/receber`), Contas a pagar (`/financeiro/pagar`), Repasses (`/financeiro/repasses-creators`), Fluxo de caixa (`/financeiro/fluxo-caixa`), Aging (`/financeiro/aging`).

### Sistema (group `sys`, base, após divisor)
- **configuracao** — icon `Settings`, cor muted. Painel **agrupado** (subGroups) reaproveitando `configurationGroupDefs` MENOS Integrações, e incluindo **Usuários** (movido de "Geral" operacional para a área de sistema, alinhado à decisão de que controle de acesso é configuração):
  - Geral/Acesso: Agência (`/configuracao`), Usuários (`/usuarios`, root)
  - Comercial: pipeline-comercial, origens-oportunidade, tags-oportunidade, motivos-ganho, motivos-perda, politica-comercial, itens-proposta, layouts-proposta
  - Operações: plataformas, status-creators, tipos-entrega, modelos-contrato
  - Finanças: bancos, subcategorias-financeiras
- **integracoes** — icon `Plug`, cor muted. Rotas: Conectores (`/configuracao/integracoes`). Rota única → navega direto. (Cresce depois: webhooks, chaves de API → vira multi-rota.)

### Derivação do módulo ativo
Para `location.pathname`, achar a `NavRoute` cujo `path` melhor casa (regra de `useAppNavigation.isActive`: igualdade exata ou prefixo seguido de `/`); empate → **maior path vence**. O módulo dono dessa rota fica ativo. Isso resolve:
- `/configuracao/integracoes` → módulo **integracoes** (path mais específico que `/configuracao`), não Configuração.
- páginas de detalhe (`/campanhas/123`, `/comercial/propostas/45`) → módulo dono do prefixo.

## 7. Comportamento

- **Inicial:** painel aberto no módulo da rota atual. Colapsável com `«` (botão no header do painel); estado colapsado salvo em `localStorage` (chave por app, ex.: `archon:moduleNav:collapsed`).
- **Clique no ícone do módulo:** multi-rota → abre/garante painel aberto naquele módulo; rota única → `navigate(path)` direto, painel não abre.
- **Clique na rota:** `navigate(path)`; no mobile, fecha o drawer.
- **Badge:** ponto/contagem vermelha no ícone do rail quando alguma rota do módulo tem `badge` > 0 (reusa o padrão de cor `destructive`).
- **Breadcrumb:** primeiro nível recebe a cor do módulo ativo (enhancement leve; opcional se conflitar com o `Breadcrumb` atual — não bloquear o resto).
- **Sub-grupos do painel (Configuração):** colapsáveis, default expandidos (mesmo comportamento da sidebar atual).

## 8. Theming

- Paleta por módulo mapeada para classes Tailwind com variante dark (sem hex cru): geral → primary (navy), comercial → secondary (cyan), producao → roxo, financas → verde, sistema → muted-foreground.
- Accent aplicado em fundos com baixa opacidade (`/10`–`/15`); ícone com `text-{cor}`; barra ativa reusa `bg-primary` (consistência com a sidebar atual). Tudo via tokens `bg-card`/`text-primary`/`text-muted-foreground`/`bg-accent`/`border-border` para funcionar claro/escuro.

## 9. O que NÃO muda (compatibilidade)

- `Sidebar` (`sidebar.tsx`): inalterada.
- API atual do `AppLayout`: inalterada para quem não passa `navMode` (default `flat`).
- `Navbar`: inalterada; apenas deixa de receber `modules` quando `navMode='module-rail'` (o switcher já é condicional — `navbar.tsx:224`).
- `IdentityManagement` e `IntegrationPlatform`: nenhuma mudança.

## 10. Arquivos afetados

`archon-ui` (repo `frameworks/archon-ui`):
- novo `src/components/ui/module-nav/` (rail, panel, types)
- novo `src/hooks/useModuleNav.ts`
- editar `src/components/ui/app-layout.tsx` (props + branch)
- editar barrels `src/components/ui/index.ts` e `src/hooks/index.ts`
- i18n: reusar chaves existentes de nav; adicionar só se faltar tooltip/label.

Kanvas (repo `system/agency-campaign-os`):
- editar `AgencyCampaign.Web/src/layouts/AgencyCampaignLayout.tsx` (montar `moduleNav`, passar `navMode`, remover switcher).

## 11. Critérios de aceitação

1. `AppLayout` sem `navMode` → comportamento idêntico ao atual; `IdentityManagement` e `IntegrationPlatform` renderizam e buildam sem mudança.
2. Kanvas: rail mostra 4 módulos operacionais + divisor + Configuração + Integrações; clicar módulo multi-rota abre painel persistente; Geral e Integrações (rota única) navegam direto sem abrir painel; `«` colapsa e o estado persiste após reload; módulo ativo destacado a partir da URL (incl. `/configuracao/integracoes` → Integrações e detalhes `/x/:id`).
3. Badge aparece em Aprovações quando houver pendência.
4. Dark mode correto em rail, painel, ativo/hover.
5. Mobile: hambúrguer abre drawer em overlay com os módulos; navegar fecha o drawer.
6. `npm run build`/`tsc` passam em `archon-ui` e no Kanvas; filtro de permissão preservado (módulo sem rota visível some).

## 12. Fora de escopo

- Split Configuração/Parâmetros (futuro).
- Adoção em `IdentityManagement`/`IntegrationPlatform`.
- Variante de navbar full-width (mantém geometria atual).
- Coleta de métricas sociais / qualquer backend.
