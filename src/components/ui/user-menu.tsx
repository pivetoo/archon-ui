import * as React from "react"
import { ChevronDown, LogOut, Moon, Sun, Check, UserRound } from "lucide-react"
import { cn, getInitials } from "../../lib/utils"
import { getApiBaseURL } from "../../services/http/client"
import { useTheme } from "./use-theme"
import { useOptionalI18n, type ArchonCulture } from "../../i18n"
import { LanguageFlag } from "./language-flag"
import { UserProfileModal } from "./user-profile-modal"

export type UserMenuPlacement = 'navbar' | 'rail'

export interface UserMenuUser {
  name: string
  email: string
  username?: string
  role?: string
  avatarUrl?: string
  preferredLanguage?: string
  lastLoginAt?: string
}

export interface UserMenuProps {
  user: UserMenuUser
  placement?: UserMenuPlacement
  onLogout?: () => void
  profilePath?: string
  onProfileNavigate?: (path: string) => void
  onAvatarUpload?: (file: File) => Promise<string>
  onAvatarRemove?: () => Promise<void>
  onUpdateProfile?: React.ComponentProps<typeof UserProfileModal>['onUpdateProfile']
}

const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>(
  ({ user, placement = 'navbar', onLogout, profilePath, onProfileNavigate, onAvatarUpload, onAvatarRemove, onUpdateProfile }, ref) => {
    const { isDark, toggleDark } = useTheme()
    const i18n = useOptionalI18n()
    const translate = React.useCallback((key: string) => i18n?.t(key) ?? key, [i18n])
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false)
    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)
    const supportedCultures: Array<{ value: ArchonCulture; label: string }> = [
      { value: "pt-BR", label: "Português" },
      { value: "en-US", label: "English" },
      { value: "es-AR", label: "Español" },
    ]
    const isRail = placement === 'rail'

    const renderAvatar = () => {
      if (user?.avatarUrl) {
        const baseUrl = getApiBaseURL().replace('/api', '')
        const fullUrl = user.avatarUrl.startsWith('http') ? user.avatarUrl : `${baseUrl}${user.avatarUrl}`
        return <img src={fullUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      }
      return getInitials(user?.name || '')
    }

    return (
      <div ref={ref} className={cn("relative", isRail && "flex justify-center")}>
        <button
          type="button"
          onClick={() => { setIsOpen((o) => !o); setIsLanguageMenuOpen(false) }}
          aria-label={user.name}
          className={cn(
            "flex items-center transition-all active:scale-[0.98]",
            isRail
              ? cn("w-9 h-9 rounded-full overflow-hidden justify-center bg-secondary text-secondary-foreground text-xs font-semibold border-2", isOpen ? "border-primary" : "border-transparent")
              : "gap-3 bg-transparent border-0 py-1 px-2.5 rounded-md hover:bg-accent dark:hover:bg-accent/80"
          )}
        >
          {isRail ? (
            renderAvatar()
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-semibold overflow-hidden border-2 border-background">
                {renderAvatar()}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold text-foreground leading-tight">{user.name}</span>
                <span className="text-xs text-muted-foreground leading-tight font-medium">{user.role}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </>
          )}
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className={cn(
              "absolute w-64 bg-popover border border-border rounded-md shadow-lg z-50 py-2",
              isRail ? "left-[52px] bottom-0" : "right-0 top-full mt-2"
            )}>
              <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-semibold overflow-hidden flex-shrink-0">
                  {renderAvatar()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  {user.role && <p className="text-xs text-muted-foreground/80 truncate">{user.role}</p>}
                </div>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    if (profilePath && onProfileNavigate) { onProfileNavigate(profilePath) } else { setIsProfileModalOpen(true) }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80"
                >
                  <UserRound className="h-4 w-4" />
                  {translate("nav.profile")}
                </button>
              </div>

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

        <UserProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} onAvatarUpload={onAvatarUpload} onAvatarRemove={onAvatarRemove} onUpdateProfile={onUpdateProfile} />
      </div>
    )
  }
)
UserMenu.displayName = "UserMenu"

export { UserMenu }
