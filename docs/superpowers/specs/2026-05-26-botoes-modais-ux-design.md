# Design — Melhorias de UX em Botões e Modais (archon-ui)

Data: 2026-05-26
Escopo: `frameworks/archon-ui`. Mudanças propagam para IdentityManagement, IntegrationPlatform e AgencyCampaign/Kanvas.

## Objetivo

Elevar a percepção de qualidade de botões e modais sem quebrar a API pública dos componentes. Tornar a UI mais calma e hierárquica (alinhado à preferência por cores primárias sutis) e mais nativa no mobile.

## Princípio transversal

Preservar a API atual: nomes de variantes (`primary`, `secondary`, `success`, ...), props existentes (`loading`, `icon`, `size`, etc.) e a estrutura de composição do Modal continuam funcionando. As mudanças são de estilo e comportamento, não de contrato.

## 1. Disciplina de cor nos botões (`button.tsx`)

Reposicionar o peso visual mantendo os nomes:

- Sólido (reservado para ação): `primary`, `secondary` (cyan da marca), `error`/`danger` (destrutiva).
- Tonal soft (novo visual): `success`, `warning`, `info` — fundo translúcido da cor (`bg-<cor>/12-16`) + texto da cor.
- Inalterados: `outline*`, `ghost`, `text`, `link`.
- `dark`: mantido como alias (0 usos hoje), sem destaque no design.

Legibilidade do tonal em light/dark: o texto tonal não pode ser apenas `text-success` (fica fraco no dark). Decisão: cada variante tonal define a cor de texto com valor HSL explícito por tema, direto na string da cva, usando o modificador `dark:`. Exemplo para `success`: `bg-success/15 text-[hsl(142_60%_32%)] dark:text-[hsl(142_60%_62%)]`. Mantém tudo contido em `button.tsx`, sem alterar `index.css` nem o `tailwind.config`.

Raio: botões passam de `rounded` (var --radius = 4px) para `rounded-md` efetivo de ~6px, sem alterar o token global `--radius` (evita efeito colateral em outros componentes).

Impacto medido: 26 usos (`success` 12 + `warning` 10 + `info` 4) mudam de sólido para tonal. `secondary` (22) e `primary` (37) e `danger`/`error` (41) permanecem sólidos. `outline` (193) inalterado.

## 2. Estados do botão (`button.tsx`)

- Loading com largura estável: o conteúdo (`children` + ícone) permanece no fluxo com `invisible`, e o spinner é posicionado de forma absoluta centralizado. Elimina o layout-shift atual onde o spinner empurra o texto. Mantém `aria-busy` já implementado.
- Icon-only acessível: nova prop opcional `tooltip?: string`. Quando presente, o Button é embrulhado em `Tooltip` (Radix, já existente) e define `aria-label={tooltip}` automaticamente. Requer `TooltipProvider` na árvore (já presente nos apps). Sem `tooltip`, comportamento inalterado; recomenda-se passar `aria-label` manualmente em `size="icon"`.

## 3. Modal (`modal.tsx`)

- Scrim: `bg-black/80` → `bg-black/60` + `backdrop-blur-sm` (consistente com o GlobalLoader).
- Botão de fechar: vira ghost com área de toque — `rounded-md p-1 hover:bg-accent` mantendo o ícone `X` e o `sr-only`.
- Raio desktop: `sm:rounded-lg` → `sm:rounded-xl`.
- Divisórias header/footer: nova prop `bordered?: boolean` em `ModalHeader` e `ModalFooter` (default `false`) que aplica `border-b`/`border-t` + leve tom no footer. Opt-in para não poluir modais simples (ex.: `ConfirmModal`, que não tem `ModalBody`).

## 4. Bottom-sheet no mobile (`modal.tsx`)

No breakpoint mobile (abaixo de `sm`), o `ModalContent` deixa de ser fullscreen vindo do topo e passa a subir de baixo:

- Posição: `inset-x-0 bottom-0` com `rounded-t-2xl`, `max-h-[90vh]` e `overflow-y-auto`.
- Animação: `slide-in-from-bottom` na entrada / `slide-out-to-bottom` na saída (substitui `zoom-in-95` no mobile). Desktop (`sm:`) inalterado, mantém o dialog centralizado.
- Affordance: um "grabber" (barra curta arredondada) no topo do conteúdo no mobile, escondido em `sm:`.

Esta é a única mudança de comportamento responsivo. Afeta todos os modais no celular.

## Backward-compatibility e riscos

- API pública preservada: nenhum nome de variante/prop removido. `tooltip` e `bordered` são adições opcionais.
- Risco visual: os 26 botões `success/warning/info` ficam mais discretos. Esperado e desejado; revisar telas onde um status era um CTA forte.
- Risco mobile: modais que assumiam fullscreen no celular passam a bottom-sheet. Validar formulários longos (ex.: telas de cadastro do Kanvas).
- `divided`/`bordered` é opt-in: telas atuais não mudam até adotarem a prop.

## Fora de escopo

- Refatorar quantidade total de variantes (não remover variantes).
- Barra de progresso no Toast e overflow-menu de Tabs (discutidos antes, adiados).
- Mudança do token global `--radius`.

## Verificação

- `tsc -b` sem erros novos.
- Lint sem erros novos (os 2 pré-existentes em `button.tsx`/`tabs.tsx` permanecem fora de escopo).
- Inspeção visual em pelo menos um app real (IntegrationPlatform ou Kanvas) cobrindo: botões de status, modal de edição (desktop) e o mesmo modal no mobile.
