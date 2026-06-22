import * as React from "react"

// Detecta dark mode lendo a classe 'dark' no <html> de forma reativa (MutationObserver),
// sem depender do ThemeProvider - funciona em qualquer consumidor.
export function useIsDark(): boolean {
  const [isDark, setIsDark] = React.useState<boolean>(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  )

  React.useEffect(() => {
    const root = document.documentElement
    const update = () => setIsDark(root.classList.contains("dark"))
    update()
    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return isDark
}

export interface ChartColors {
  isDark: boolean
  tick: string
  grid: string
  crosshair: string
  surface: string
  tooltipBg: string
  tooltipText: string
}

// Cores do "chrome" do grafico (eixos, grid, tooltip, bordas) derivadas do tema, por modo.
// Valores alinhados ao bloco .dark / :root do index.css.
export function useChartColors(): ChartColors {
  const isDark = useIsDark()
  return React.useMemo<ChartColors>(
    () =>
      isDark
        ? {
            isDark,
            tick: "hsl(214, 10%, 68%)",
            grid: "hsl(220, 12%, 24%)",
            crosshair: "hsl(214, 10%, 55%)",
            surface: "hsl(220, 13%, 15%)",
            tooltipBg: "hsl(220, 13%, 17%)",
            tooltipText: "hsl(210, 16%, 96%)",
          }
        : {
            isDark,
            tick: "#6b7280",
            grid: "#e5e7eb",
            crosshair: "#9ca3af",
            surface: "#ffffff",
            tooltipBg: "#ffffff",
            tooltipText: "#111827",
          },
    [isDark]
  )
}

// Tema Nivo pronto, adaptado ao modo claro/escuro. Use em theme={useNivoTheme()}.
export function useNivoTheme() {
  const c = useChartColors()
  return React.useMemo(
    () => ({
      text: { fontFamily: "Inter, sans-serif", fontSize: 11, fill: c.tick },
      axis: {
        ticks: { text: { fontFamily: "Inter, sans-serif", fontSize: 11, fill: c.tick }, line: { stroke: c.grid } },
        legend: { text: { fontFamily: "Inter, sans-serif", fontSize: 11, fill: c.tick } },
        domain: { line: { stroke: c.grid } },
      },
      grid: { line: { stroke: c.grid, strokeWidth: 1, strokeDasharray: "4 4" } },
      crosshair: { line: { stroke: c.crosshair, strokeWidth: 1, strokeDasharray: "4 4" } },
      legends: { text: { fontFamily: "Inter, sans-serif", fontSize: 11, fill: c.tick } },
      tooltip: { container: { background: c.tooltipBg, color: c.tooltipText, fontSize: 12 } },
    }),
    [c]
  )
}
