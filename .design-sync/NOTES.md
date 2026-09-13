# Notas do design-sync do archon-ui

Projeto no Claude Design: "Design System" (`8eba4454-4c41-49b4-b41b-20cdcce35095`), design system padrao da conta.
Primeiro sync em 2026-09-12, com Claude Code 2.1.270.

## Escopo

- Entram como card so as 29 familias usadas diretamente nas telas do Mainstay em 2026-09-12 (contagem de JSX em `AgencyCampaign.Web/src`). O resto esta em `componentSrcMap: null`, mas continua exportado em `window.ArchonUi` pelo bundle.
- Partes de compostos (ModalHeader, CardTitle, SheetPreviewField etc.) nao tem card proprio: aparecem compostas no preview da familia.
- Grupos vem de stubs em `.design-sync/groups/<Grupo>.md` apontados por `docsMap`. Nao ha docs por componente no repo.
- `UsersManagementPage` nao tem preview autorado: exige sessao root e carrega usuarios, perfis e permissoes da API. O card mostra o estado real "Acesso restrito". Autorar exigiria simular `usePermissions` e stubar `UsersManagementService`.

## Ambiente

- Rodar `npm run build` antes do converter; ele le `dist/index.js` e `dist/style.css`.
- `--node-modules ./node_modules --entry ./dist/index.js` na raiz do archon-ui.
- Render check: `playwright@1.62.1` instalado em `.ds-sync/`, casado com o chromium-1234 em cache em `%LOCALAPPDATA%/ms-playwright`.

## Armadilhas encontradas

- Mudanca em `cfg.overrides` exige `package-build.mjs` completo; `preview-rebuild.mjs` recusa com `[CONFIG_STALE]`.
- O CSS da lib so tem as classes Tailwind que a propria lib usa. Classe de layout nos previews que nao esteja em `_ds_bundle.css` nao tem efeito: usar `style` inline (`grid-cols-3`, `max-w-xl`, `max-w-2xl`, `h-56`, `h-64` nao existem).
- Cadeia de providers: `MemoryRouter > AuthProvider > ThemeProvider > I18nProvider(catalogLoader)`. `MemoryRouter` e `loadPtBRCatalog` vem de `.design-sync/preview-context.mjs` via `extraEntries`. `AuthProvider` nao chama API ao montar.
- Sem `catalogLoader`, o `I18nProvider` busca `/Localization/catalog` e fica em loading para sempre (card em branco).
- `Modal`/`Sheet` abertos focam o primeiro campo e selecionam o texto: `onOpenAutoFocus={(e) => e.preventDefault()}` no preview.
- `Toaster`: toasts somem em 5s e o viewport e `fixed` no rodape; no preview usar `duration: Infinity` e envolver em contêiner com `transform: translateZ(0)` e altura fixa.
- `PieChart.innerRadius` e em pixels (a lib divide por 120), nao proporcao.
- `FilterPanel` nao aceita `open`: o preview `PainelAberto` clica no primeiro botao num `useEffect`.
- `AppLayout` e `fixed`: o preview envolve em contêiner 1280x760 com `transform: translateZ(0)`; rota ativa e `/` no `MemoryRouter`.

## Catalogo pt-BR

`preview-context.mjs` e gerado, nao editar. Regenerar quando o resx do archon-framework mudar:

```sh
node .design-sync/gen-preview-context.mjs ../archon-framework/Archon/Archon.Api/Resources/Localization/ArchonApiResource.pt-BR.resx
```

Em worktree, passar o caminho absoluto do resx.

## Known render warns

- Nenhum apos aplicar `cardMode` sugerido pelo `[GRID_OVERFLOW]` (column para graficos, SearchBar, TableToolbar, EmptyState, Card; single para Select, Modal, ConfirmModal, Sheet, Toaster, GlobalLoader, Dropdown, FilterPanel, AppLayout).

## Re-sync risks

- Catalogo pt-BR e copia do resx: sai de sincronia se o resx mudar e ninguem regenerar.
- Escopo de 29 familias reflete o uso do Mainstay em 2026-09-12. Componente novo usado nas telas precisa sair de `componentSrcMap` e ganhar grupo em `docsMap`.
- `PainelAberto` do FilterPanel depende de o gatilho ser o primeiro `button` do componente.
- Previews de `AppLayout`, `Toaster` e `GlobalLoader` dependem de `position: fixed` resolver contra o contêiner com `transform`.
- `[FONT_REMOTE]`: IBM Plex Sans vem do Google Fonts por `@import` no CSS; sem rede os cards caem na fonte do sistema.
