import * as React from "react"

interface ThemeContextType {
  isDark: boolean
  toggleDark: () => void
}

const ThemeContext = React.createContext<ThemeContextType | null>(null)

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultDark?: boolean
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultDark = false
}) => {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    const stored = localStorage.getItem("drts-dark-mode")
    return stored ? stored === "true" : defaultDark
  })

  React.useEffect(() => {
    const root = document.documentElement

    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("drts-dark-mode", String(isDark))
  }, [isDark])

  const toggleDark = React.useCallback(() => {
    setIsDark(prev => !prev)
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
