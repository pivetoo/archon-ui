// Gera .design-sync/preview-context.mjs: catalogo pt-BR do archon-framework e router em memoria,
// usados pelos previews do Claude Design e pelo agente de design.
// Uso (na raiz do archon-ui): node .design-sync/gen-preview-context.mjs [caminho do resx]
import fs from 'node:fs'
import path from 'node:path'

const defaultResx = '../archon-framework/Archon/Archon.Api/Resources/Localization/ArchonApiResource.pt-BR.resx'
const resx = process.argv[2] ?? defaultResx
const xml = fs.readFileSync(resx, 'utf8')

const decode = (value) => value
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&amp;/g, '&')

const messages = {}
for (const match of xml.matchAll(/<data name="([^"]+)"[^>]*>\s*<value>([\s\S]*?)<\/value>/g)) {
  messages[match[1]] = decode(match[2])
}

const catalog = { culture: 'pt-BR', uiCulture: 'pt-BR', messages }
const body = `// Contexto dos previews do Claude Design: catalogo pt-BR e router em memoria.
// Gerado por .design-sync/gen-preview-context.mjs a partir de ArchonApiResource.pt-BR.resx. Nao editar a mao.

export const ptBRCatalog = ${JSON.stringify(catalog, null, 2)}

export const loadPtBRCatalog = async () => ptBRCatalog

export { MemoryRouter } from 'react-router-dom'
`

fs.writeFileSync(path.join('.design-sync', 'preview-context.mjs'), body)
console.log(`preview-context.mjs: ${Object.keys(messages).length} mensagens`)
