# archon-ui: como construir com esta biblioteca

Biblioteca React (Radix + Tailwind) dos sistemas Archon. Interface sempre em pt-BR. Fonte unica: IBM Plex Sans, ja carregada por `styles.css`.

## Providers obrigatorios

Monte toda tela dentro desta cadeia, nesta ordem. Sem ela, `DataTable`, `PageLayout`, `TableToolbar`, `ConfirmModal` e `ChartContainer` lancam "useI18n must be used within I18nProvider", e `AppLayout` lanca erro de Router e de `useAuth`. O `I18nProvider` sem `catalogLoader` tenta buscar o catalogo na API e a tela fica vazia.

```jsx
const { MemoryRouter, AuthProvider, ThemeProvider, I18nProvider, loadPtBRCatalog } = window.ArchonUi

<MemoryRouter>
  <AuthProvider>
    <ThemeProvider>
      <I18nProvider initialCulture="pt-BR" catalogLoader={loadPtBRCatalog}>
        {tela}
      </I18nProvider>
    </ThemeProvider>
  </AuthProvider>
</MemoryRouter>
```

## Estilo

Classes utilitarias Tailwind, mas **so existem as classes que a propria lib usa**, compiladas em `_ds_bundle.css`. Classe fora dele nao tem efeito nenhum. Antes de usar uma classe de layout, confira no `_ds_bundle.css`; se nao estiver la, use `style` inline. Exemplos que NAO existem: `grid-cols-3`, `max-w-xl`, `max-w-2xl`, `h-56`, `h-64`.

Classes de token que existem e devem ser usadas no lugar de cores cruas:

| Uso | Classes |
|---|---|
| Fundo | `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `bg-secondary` |
| Texto | `text-foreground`, `text-muted-foreground`, `text-primary`, `text-primary-foreground`, `text-destructive` |
| Borda | `border`, `border-border`, `rounded-md` |
| Espaco | `gap-2`, `gap-3`, `gap-4`, `p-3`, `p-4`, `space-y-1.5`, `space-y-4`, `mt-6` |
| Layout | `flex`, `items-center`, `justify-between`, `justify-end`, `grid`, `grid-cols-2` |
| Tipo | `text-xs`, `text-sm`, `text-2xl`, `font-medium`, `font-semibold` |

Tokens CSS (`hsl(var(--nome))`): `--background`, `--foreground`, `--card`, `--primary` (navy), `--secondary` (teal), `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--success`, `--warning`, `--info`, `--border`, `--ring`, `--radius`. Modo escuro: classe `dark` no `html`, controlada pelo `ThemeProvider`. Sem gradiente, sem emoji, sem fonte extra.

## Onde esta a verdade

- `styles.css` e `_ds_bundle.css`: todo o CSS disponivel.
- `components/<grupo>/<Nome>/<Nome>.d.ts`: props aceitas. `<Nome>.prompt.md`: exemplos de uso.
- Variantes de `Button`: `primary`, `secondary`, `outline`, `danger`, `ghost`, `link`, `dark`, `success`, `warning`, `info`, `outline-primary`, `outline-secondary`, `outline-success`, `outline-warning`, `outline-danger`; tamanhos `sm`, `md`, `lg`, `icon`.
- Variantes de `Badge`: `default`, `secondary`, `success`, `warning`, `info`, `destructive`, `outline`.

## Padrao de tela

1. Moldura: `AppLayout` com `navMode="module-rail"` e `moduleNav` (modulos com `routes`), `breadcrumbs`, `user`, `notifications`.
2. Pagina: `PageLayout` com `title`, `subtitle`, `onAdd`, `onEdit`, `onDelete`, `onRefresh`, `selectedRowsCount` e `actions` extras.
3. Listagem: `TableToolbar` (`searchValue`, `onSearchChange`, `rightSlot={<FilterPanel sections={...} />}`) acima de `DataTable` (`columns`, `data`, `rowKey`, `selectable`). Situacao sempre em `Badge`.
4. Detalhe do registro selecionado: `Sheet` lateral com `SheetPreviewHeader`, `SheetPreviewSection`, `SheetPreviewGrid`, `SheetPreviewField`.
5. Formulario: `Modal` > `ModalContent size="lg"` > `ModalHeader`/`ModalTitle`/`ModalDescription`, `ModalBody`, `ModalFooter` com Cancelar (`outline`) e Salvar (`primary`). Campo: `FormField` com `Input`, `Select`, `SearchableSelect`, `Textarea`, `Switch`, `Checkbox`.
6. Exclusao: `ConfirmModal variant="danger"`. Retorno de acao: `toast({ title, description, variant })` com `<Toaster />` montado. Lista vazia: `EmptyState`.

```jsx
<PageLayout title="Contratos" subtitle="Planos ativos e bloqueados" onAdd={novo} onRefresh={recarregar} selectedRowsCount={sel.length}>
  <TableToolbar searchValue={busca} onSearchChange={setBusca} searchPlaceholder="Buscar contrato"
    rightSlot={<FilterPanel sections={filtros} onClearAll={limpar} />} className="mb-3" />
  <DataTable columns={colunas} data={contratos} rowKey="id" selectable selectedRows={sel} onSelectionChange={setSel} />
</PageLayout>
```
