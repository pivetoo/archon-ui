import * as React from "react"
import { httpClient, setRequestLanguage } from "../services/http/client"
import { setTranslationMessages } from "./store"
import type { ArchonCulture, I18nContextValue, LocalizationCatalog } from "./types"

import { LANGUAGE_KEY as LANGUAGE_STORAGE_KEY } from "../services/storage/keys"
const DEFAULT_CULTURE: ArchonCulture = "pt-BR"

// O catalogo de traducao ainda nao existe quando estas mensagens disparam (e a falha e
// justamente carregar esse catalogo), entao nao da pra resolver com t(): precisam do proprio
// texto embutido, nas 3 culturas suportadas.
const CATALOG_LOAD_FALLBACK: Record<ArchonCulture, { empty: string; failed: string }> = {
  "pt-BR": {
    empty: "O catálogo de localização não foi retornado pela API.",
    failed: "Não foi possível carregar o catálogo de localização."
  },
  "en-US": {
    empty: "The localization catalog was not returned by the API.",
    failed: "Could not load the localization catalog."
  },
  "es-AR": {
    empty: "El catálogo de localización no fue devuelto por la API.",
    failed: "No se pudo cargar el catálogo de localización."
  }
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

const isSupportedCulture = (value: string | null): value is ArchonCulture => {
  return value === "pt-BR" || value === "en-US" || value === "es-AR"
}

const getInitialCulture = (): ArchonCulture => {
  if (typeof window === "undefined") {
    return DEFAULT_CULTURE
  }

  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (isSupportedCulture(stored)) {
    return stored
  }

  const browserLanguage = window.navigator.language
  if (isSupportedCulture(browserLanguage)) {
    return browserLanguage
  }

  return DEFAULT_CULTURE
}

export interface I18nProviderProps {
  children: React.ReactNode
  initialCulture?: ArchonCulture
  catalogLoader?: (culture: ArchonCulture) => Promise<LocalizationCatalog>
  loadingFallback?: React.ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  initialCulture,
  catalogLoader,
  loadingFallback = null
}) => {
  const [culture, setCultureState] = React.useState<ArchonCulture>(() => initialCulture ?? getInitialCulture())
  const [uiCulture, setUiCulture] = React.useState<string>(initialCulture ?? getInitialCulture())
  const [messages, setMessages] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const loadCatalog = async (nextCulture: ArchonCulture) => {
    setIsLoading(true)
    setError(null)
    setRequestLanguage(nextCulture)

    try {
      const catalog = catalogLoader
        ? await catalogLoader(nextCulture)
        : (await httpClient.get<LocalizationCatalog>(`/Localization/catalog?lang=${encodeURIComponent(nextCulture)}`)).data

      if (!catalog) {
        throw new Error(CATALOG_LOAD_FALLBACK[nextCulture].empty)
      }

      setCultureState(nextCulture)
      setUiCulture(catalog.uiCulture)
      setMessages(catalog.messages ?? {})
      setTranslationMessages(catalog.messages ?? {})
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextCulture)
    } catch (currentError) {
      const message = currentError instanceof Error
        ? currentError.message
        : CATALOG_LOAD_FALLBACK[nextCulture].failed

      setError(message)
      throw currentError
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    void loadCatalog(initialCulture ?? getInitialCulture())
  }, [initialCulture])

  const setCulture = async (nextCulture: ArchonCulture) => {
    if (nextCulture === culture) {
      return
    }

    await loadCatalog(nextCulture)
  }

  const t = (key: string) => {
    return messages?.[key] ?? key
  }

  const value: I18nContextValue = {
    culture,
    uiCulture,
    messages,
    isLoading,
    error,
    setCulture,
    t
  }

  if (isLoading) {
    return <>{loadingFallback}</>
  }

  if (error) {
    throw new Error(error)
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => {
  const context = React.useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }

  return context
}

export const useOptionalI18n = () => {
  return React.useContext(I18nContext)
}
