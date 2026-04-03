import * as React from "react"
import { GlobalLoader } from "./global-loader"

interface GlobalLoaderContextType {
  isLoading: boolean
  showLoader: () => void
  hideLoader: () => void
}

const GlobalLoaderContext = React.createContext<GlobalLoaderContextType | null>(null)

export const useGlobalLoader = () => {
  const context = React.useContext(GlobalLoaderContext)
  if (!context) {
    throw new Error("useGlobalLoader must be used within GlobalLoaderProvider")
  }
  return context
}

interface GlobalLoaderProviderProps {
  children: React.ReactNode
}

export const GlobalLoaderProvider: React.FC<GlobalLoaderProviderProps> = ({ children }) => {
  const [loadingCount, setLoadingCount] = React.useState(0)

  const showLoader = React.useCallback(() => {
    setLoadingCount((prev) => prev + 1)
  }, [])

  const hideLoader = React.useCallback(() => {
    setLoadingCount((prev) => Math.max(0, prev - 1))
  }, [])

  const isLoading = loadingCount > 0

  return (
    <GlobalLoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
      <GlobalLoader isVisible={isLoading} />
    </GlobalLoaderContext.Provider>
  )
}
