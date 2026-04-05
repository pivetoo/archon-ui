export type ArchonCulture = "pt-BR" | "en-US" | "es-AR"

export interface LocalizationCatalog {
  culture: string
  uiCulture: string
  messages: Record<string, string>
}

export interface I18nContextValue {
  culture: ArchonCulture
  uiCulture: string
  messages: Record<string, string>
  isLoading: boolean
  error: string | null
  setCulture: (culture: ArchonCulture) => Promise<void>
  t: (key: string) => string
}
