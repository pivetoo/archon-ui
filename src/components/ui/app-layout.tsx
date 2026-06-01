import * as React from "react"
import { Sidebar } from "../ui/sidebar"
import { Navbar, type Module, type NotificationItem } from "../ui/navbar"
import type { SidebarItemData, SidebarGroup, SidebarHeaderMode } from "../ui/sidebar"
import type { BreadcrumbItem } from "../ui/breadcrumb"
import { ModuleRail } from "../ui/module-nav/module-rail"
import { ModulePanel } from "../ui/module-nav/module-panel"
import { ModuleNavMobile } from "../ui/module-nav/module-nav-mobile"
import type { ModuleNavConfig } from "../ui/module-nav/types"
import { useModuleNav, moduleRoutes } from "../../hooks/useModuleNav"
import { UserMenu } from "../ui/user-menu"
import { CommandPalette, type CommandPaletteItem } from "../ui/command-palette"

export type { BreadcrumbItem, SidebarItemData, SidebarGroup, SidebarHeaderMode, Module }

export type NavMode = 'flat' | 'module-rail'

const EMPTY_MODULE_NAV: ModuleNavConfig = []

export interface AppLayoutProps {
  title: string
  titleStyle?: React.CSSProperties
  titleClassName?: string
  subtitle?: string
  navbarCompanyName?: string
  logo?: React.ReactNode
  user: {
    name: string
    email: string
    username?: string
    role?: string
    avatarUrl?: string
    preferredLanguage?: string
    lastLoginAt?: string
  }
  menuItems?: SidebarItemData[]
  menuGroups?: SidebarGroup[]
  navMode?: NavMode
  moduleNav?: ModuleNavConfig
  initialCollapsed?: boolean
  onLogout?: () => void
  notifications?: NotificationItem[]
  onNotificationRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onClearAllNotifications?: () => void
  onViewAllNotifications?: () => void
  breadcrumbs?: BreadcrumbItem[]
  modules?: Module[]
  currentModule?: string
  onModuleChange?: (moduleId: string) => void
  profilePath?: string
  onProfileNavigate?: (path: string) => void
  onAvatarUpload?: (file: File) => Promise<string>
  onAvatarRemove?: () => Promise<void>
  onLogoClick?: () => void
  companyLogo?: string
  headerMode?: SidebarHeaderMode
  headerLogo?: string
  headerLogoCollapsed?: string
  children?: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  subtitle,
  navbarCompanyName,
  logo,
  user,
  menuItems = [],
  menuGroups = [],
  navMode = 'flat',
  moduleNav,
  initialCollapsed = true,
  onLogout,
  notifications,
  onNotificationRead,
  onMarkAllAsRead,
  onClearAllNotifications,
  onViewAllNotifications,
  breadcrumbs = [],
  modules,
  currentModule,
  onModuleChange,
  profilePath,
  onProfileNavigate,
  onAvatarUpload,
  onAvatarRemove,
  onLogoClick,
  companyLogo,
  headerMode,
  headerLogo,
  headerLogoCollapsed,
  titleStyle,
  titleClassName,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed)
  const [isMobile, setIsMobile] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)

  const useRail = navMode === 'module-rail' && !!moduleNav && moduleNav.length > 0
  const mn = useModuleNav(moduleNav ?? EMPTY_MODULE_NAV)
  const commandItems = React.useMemo<CommandPaletteItem[]>(() => (
    (moduleNav ?? []).flatMap((m) => moduleRoutes(m).map((r) => ({ key: r.key, label: r.label, path: r.path, moduleLabel: m.label, icon: r.icon })))
  ), [moduleNav])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)")
    const syncMobile = () => {
      setIsMobile(mediaQuery.matches)
      if (!mediaQuery.matches) {
        setIsMobileMenuOpen(false)
      }
    }

    syncMobile()
    mediaQuery.addEventListener("change", syncMobile)
    return () => mediaQuery.removeEventListener("change", syncMobile)
  }, [])

  React.useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }

    document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobile, isMobileMenuOpen])

  React.useEffect(() => {
    if (!useRail || isMobile || !mn.panelOpen) return
    const handleOutsidePointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target && !target.closest('[data-module-nav]')) {
        mn.setCollapsed(true)
      }
    }
    document.addEventListener('mousedown', handleOutsidePointer)
    return () => document.removeEventListener('mousedown', handleOutsidePointer)
  }, [useRail, isMobile, mn.panelOpen, mn.setCollapsed])

  React.useEffect(() => {
    if (!useRail) return
    const onKeyDown = (event: KeyboardEvent) => {
      // Espaco abre a busca, mas so quando nada esta focado (fora de input/botao/link)
      // e nenhum dialog esta aberto, para nao roubar o espaco de digitacao ou rolagem.
      if (event.key !== ' ' && event.code !== 'Space') return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const active = document.activeElement
      if (active && active !== document.body) return
      if (document.querySelector('[role="dialog"]')) return
      event.preventDefault()
      setSearchOpen(true)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [useRail])

  // offset do conteudo: flat usa 64/220; module-rail usa 64 (so rail) ou 296 (64 rail + 232 painel)
  const leftWidth = isMobile ? 0 : (useRail ? (mn.panelOpen ? 296 : 64) : (isCollapsed ? 64 : 220))

  const handleRouteClick = (path: string) => {
    mn.navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-background">
      {useRail ? (
        <>
          {!isMobile && (
            <>
              <ModuleRail
                modules={moduleNav!}
                activeModuleKey={mn.highlightedModuleKey}
                onModuleClick={mn.handleModuleClick}
                brand={logo}
                footer={
                  <UserMenu
                    placement="rail"
                    user={user}
                    onLogout={onLogout}
                    profilePath={profilePath}
                    onProfileNavigate={onProfileNavigate}
                    onAvatarUpload={onAvatarUpload}
                    onAvatarRemove={onAvatarRemove}
                  />
                }
              />
              {mn.panelOpen && mn.openModule && (
                <ModulePanel
                  module={mn.openModule}
                  activeRoutePath={mn.activeRoutePath}
                  onRouteClick={(path) => mn.navigate(path)}
                  onCollapse={() => mn.setCollapsed(true)}
                />
              )}
            </>
          )}
          {isMobile && (
            <ModuleNavMobile
              modules={moduleNav!}
              activeModuleKey={mn.activeModuleKey}
              activeRoutePath={mn.activeRoutePath}
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              onRouteClick={handleRouteClick}
              brand={logo}
            />
          )}
        </>
      ) : (
        <Sidebar
          title={title}
          titleStyle={titleStyle}
          titleClassName={titleClassName}
          subtitle={subtitle}
          logo={logo}
          items={menuItems}
          groups={menuGroups}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onLogout={onLogout}
          onLogoClick={onLogoClick}
          companyLogo={companyLogo}
          headerMode={headerMode}
          headerLogo={headerLogo}
          headerLogoCollapsed={headerLogoCollapsed}
          isMobile={isMobile}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Navbar
        isCollapsed={isCollapsed}
        leftOffset={leftWidth}
        isMobile={isMobile}
        onMobileMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)}
        breadcrumbs={breadcrumbs}
        user={{
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
          avatarUrl: user.avatarUrl,
          preferredLanguage: user.preferredLanguage,
          lastLoginAt: user.lastLoginAt,
        }}
        companyName={navbarCompanyName ?? subtitle}
        notifications={notifications}
        onNotificationRead={onNotificationRead}
        onMarkAllAsRead={onMarkAllAsRead}
        onClearAllNotifications={onClearAllNotifications}
        onViewAllNotifications={onViewAllNotifications}
        modules={useRail ? undefined : modules}
        currentModule={useRail ? undefined : currentModule}
        onModuleChange={useRail ? undefined : onModuleChange}
        hideUserMenu={useRail}
        showSearch={useRail}
        onSearchClick={() => setSearchOpen(true)}
        showSettings={useRail}
        profilePath={profilePath}
        onProfileNavigate={onProfileNavigate}
        onAvatarUpload={onAvatarUpload}
        onAvatarRemove={onAvatarRemove}
        onLogout={onLogout}
      />

      <main
        className="transition-all duration-300 pt-[52px] min-h-screen"
        style={{ marginLeft: leftWidth }}
      >
        <div className="w-full h-full p-3 sm:p-6">
          {children}
        </div>
      </main>

      {useRail && (
        <CommandPalette
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          items={commandItems}
          onSelect={(path) => { mn.navigate(path); setSearchOpen(false) }}
        />
      )}
    </div>
  )
}
