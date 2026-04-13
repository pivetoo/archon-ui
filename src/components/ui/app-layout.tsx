import * as React from "react"
import { cn } from "../../lib/utils"
import { Sidebar } from "../ui/sidebar"
import { Navbar, type Module, type NotificationItem } from "../ui/navbar"
import type { SidebarItemData, SidebarGroup, SidebarHeaderMode } from "../ui/sidebar"
import type { BreadcrumbItem } from "../ui/breadcrumb"

export type { BreadcrumbItem, SidebarItemData, SidebarGroup, SidebarHeaderMode, Module }

export interface AppLayoutProps {
  title: string
  subtitle?: string
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
  logo,
  user,
  menuItems = [],
  menuGroups = [],
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
  onLogoClick,
  companyLogo,
  headerMode,
  headerLogo,
  headerLogoCollapsed,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed)
  const [isMobile, setIsMobile] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

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

  return (
    <div className="relative min-h-screen bg-background">
      <Sidebar
        title={title}
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

      <Navbar
        isCollapsed={isCollapsed}
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
        companyName={subtitle}
        notifications={notifications}
        onNotificationRead={onNotificationRead}
        onMarkAllAsRead={onMarkAllAsRead}
        onClearAllNotifications={onClearAllNotifications}
        onViewAllNotifications={onViewAllNotifications}
        modules={modules}
        currentModule={currentModule}
        onModuleChange={onModuleChange}
        profilePath={profilePath}
        onProfileNavigate={onProfileNavigate}
        onLogout={onLogout}
      />

      <main
        className={cn(
          "transition-all duration-300 pt-[52px] min-h-screen",
          isMobile ? "ml-0" : (isCollapsed ? "ml-[64px]" : "ml-[220px]")
        )}
      >
        <div className="w-full h-full p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
