import { Badge, SheetPreviewField, SheetPreviewGrid, SheetPreviewHeader, SheetPreviewSection } from 'archon-ui'

export function FichaDoRegistro() {
  return (
    <div className="rounded-md border bg-card p-6" style={{ width: 460 }}>
      <SheetPreviewHeader
        eyebrow="Cliente"
        title="Mercado Horizonte"
        meta={<Badge variant="success">Ativo</Badge>}
        description="Dados cadastrais e contato principal do cliente."
      />
      <div className="mt-6 space-y-4">
        <SheetPreviewSection title="Dados cadastrais" description="Razão social, documento e contato.">
          <SheetPreviewGrid>
            <SheetPreviewField label="Razão social" value="Mercado Horizonte Ltda." />
            <SheetPreviewField label="Nome fantasia" value="Mercado Horizonte" />
            <SheetPreviewField label="CNPJ" value="12.345.678/0001-90" />
            <SheetPreviewField label="Contato" value="Ana Souza" />
            <SheetPreviewField className="sm:col-span-2" label="E-mail" value="financeiro@horizonte.com.br" />
          </SheetPreviewGrid>
        </SheetPreviewSection>
        <SheetPreviewSection title="Contrato" defaultOpen={false}>
          <SheetPreviewGrid>
            <SheetPreviewField label="Plano" value="Enterprise" />
            <SheetPreviewField label="Valor mensal" value="R$ 3.290,00" />
          </SheetPreviewGrid>
        </SheetPreviewSection>
      </div>
    </div>
  )
}
