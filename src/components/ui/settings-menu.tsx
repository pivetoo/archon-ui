import * as React from "react"
import { Settings, ChevronDown, LogOut, Moon, Sun, Check } from "lucide-react"
import { cn } from "../../lib/utils"
import { useTheme } from "./use-theme"
import { useOptionalI18n, type ArchonCulture } from "../../i18n"
import { LanguageFlag } from "./language-flag"

export interface SettingsMenuProps {
  onLogout?: () => void
  menuExtraItems?: Array<{ key: string; label: string; icon?: React.ReactNode; onClick: () => void }>
}

const SettingsMenu = React.forwardRef<HTMLDivElement, SettingsMenuProps>(({ onLogout, menuExtraItems }, ref) => {
  const { isDark, toggleDark } = useTheme()
  const i18n = useOptionalI18n()
  const translate = React.useCallback((key: string) => i18n?.t(key) ?? key, [i18n])
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false)
  const supportedCultures: Array<{ value: ArchonCulture; label: string }> = [
    { value: "pt-BR", label: "Português" },
    { value: "en-US", label: "English" },
    { value: "es-AR", label: "Español" },
  ]

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => { setIsOpen((o) => !o); setIsLanguageMenuOpen(false) }}
        aria-label={translate("nav.settings") === "nav.settings" ? "Configurações" : translate("nav.settings")}
        className="relative p-2 rounded-sm transition-all hover:bg-accent dark:hover:bg-accent/80 text-muted-foreground hover:text-foreground active:scale-95"
      >
        <Settings className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-60 bg-popover border border-border rounded-md shadow-lg z-50 py-2">
            {menuExtraItems && menuExtraItems.length > 0 && (
              <>
                {menuExtraItems.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => { setIsOpen(false); item.onClick() }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
                <div className="border-t border-border my-1" />
              </>
            )}

            <button
              type="button"
              onClick={() => toggleDark()}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80"
            >
              <div className="flex items-center gap-3">
                {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span>{translate(isDark ? "nav.theme.dark" : "nav.theme.light")}</span>
              </div>
              <div className={cn("relative w-9 h-5 rounded-full transition-colors", isDark ? "bg-primary" : "bg-muted")}>
                <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform", isDark ? "left-[18px]" : "left-0.5")} />
              </div>
            </button>

            {i18n && (
              <div className="relative py-1">
                <button
                  type="button"
                  onClick={() => setIsLanguageMenuOpen((c) => !c)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80"
                >
                  <div className="flex items-center gap-3">
                    <LanguageFlag culture={i18n.culture} />
                    <span>{translate("nav.language")}</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isLanguageMenuOpen && "rotate-180")} />
                </button>
                {isLanguageMenuOpen && (
                  <div className="mt-1 border-t border-border/60 bg-muted/30">
                    {supportedCultures.map((culture) => (
                      <button
                        key={culture.value}
                        type="button"
                        onClick={() => { void i18n.setCulture(culture.value); setIsLanguageMenuOpen(false); setIsOpen(false) }}
                        className={cn("w-full flex items-center justify-between gap-3 py-2.5 pl-11 pr-4 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80", i18n.culture === culture.value && "text-primary")}
                      >
                        <div className="flex items-center gap-3">
                          <LanguageFlag culture={culture.value} />
                          <span>{culture.label}</span>
                        </div>
                        {i18n.culture === culture.value && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-border my-1" />

            <div className="py-1">
              <button
                type="button"
                onClick={() => { setIsLanguageMenuOpen(false); setIsOpen(false); onLogout?.() }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80 text-destructive"
              >
                <LogOut className="h-4 w-4" />
                {translate("nav.logout")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
})
SettingsMenu.displayName = "SettingsMenu"

export { SettingsMenu }
