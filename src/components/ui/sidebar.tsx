import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SidebarGroup {
  label: string
  items: SidebarItemData[]
  collapsible?: boolean
  defaultExpanded?: boolean
}

export interface SidebarItemData {
  key: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  active?: boolean
  path?: string
}

export type SidebarHeaderMode = 'default' | 'companyLogo'

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  logo?: React.ReactNode
  items?: SidebarItemData[]
  groups?: SidebarGroup[]
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  width?: number
  collapsedWidth?: number
  showCollapseButton?: boolean
  onLogout?: () => void
  onLogoClick?: () => void
  companyLogo?: string
  headerMode?: SidebarHeaderMode
  headerLogo?: string
  headerLogoCollapsed?: string
  isMobile?: boolean
  isMobileOpen?: boolean
  onMobileClose?: () => void
  mobileWidth?: number
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      title,
      logo,
      items = [],
      groups = [],
      isCollapsed = false,
      onToggleCollapse,
      width = 220,
      collapsedWidth = 64,
      showCollapseButton = true,
      onLogout,
      onLogoClick,
      companyLogo,
      headerMode = 'default',
      headerLogo,
      headerLogoCollapsed,
      isMobile = false,
      isMobileOpen = false,
      onMobileClose,
      mobileWidth = 280,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(false)
    const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({})

    React.useEffect(() => {
      const initial: Record<string, boolean> = {}
      groups.forEach((group) => {
        initial[group.label] = group.defaultExpanded !== false
      })
      setExpandedGroups(initial)
    }, [groups])

    const collapsed = onToggleCollapse ? isCollapsed : internalCollapsed
    const handleToggle = onToggleCollapse || (() => setInternalCollapsed(!internalCollapsed))

    const toggleGroup = (groupLabel: string) => {
      setExpandedGroups((prev) => ({
        ...prev,
        [groupLabel]: !prev[groupLabel],
      }))
    }

    const renderItems = (itemList: SidebarItemData[]) =>
      itemList.map((item) => (
        <button
          type="button"
          key={item.key}
          onClick={() => {
            item.onClick?.()
            if (isMobile) {
              onMobileClose?.()
            }
          }}
          aria-current={item.active ? "page" : undefined}
          aria-label={collapsed ? item.label : undefined}
          className={cn(
            "relative flex w-full items-center transition-all my-0.5 font-medium text-muted-foreground",
            collapsed ? "justify-center px-2.5 py-2.5" : "justify-start px-4 py-2.5",
            item.active && "bg-primary/5 text-primary font-semibold",
            "hover:bg-accent dark:hover:bg-accent/80 hover:text-primary",
            item.active && "hover:bg-primary/10 dark:hover:bg-primary/20"
          )}
        >
          {item.active && (
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
          )}
          {item.icon && (
            <div className={cn("flex items-center justify-center w-5 h-5", !collapsed && "mr-3")}>
              {item.icon}
            </div>
          )}
          {!collapsed && (
            <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {item.label}
            </span>
          )}
        </button>
      ))

    return (
      <>
        {isMobile && isMobileOpen && (
          <div
            className="fixed inset-0 z-[110] bg-black/40"
            onClick={onMobileClose}
          />
        )}
        <aside
          ref={ref}
          className={cn(
            "fixed left-0 top-0 h-screen bg-card flex flex-col transition-all duration-300 overflow-visible shadow-sm dark:border-r dark:border-border/70",
            isMobile ? "z-[120]" : "z-40",
            isMobile && !isMobileOpen && "-translate-x-full",
            isMobile && isMobileOpen && "translate-x-0",
            className
          )}
          style={{
            width: isMobile ? `${mobileWidth}px` : (collapsed ? `${collapsedWidth}px` : `${width}px`),
          }}
          {...props}
        >
        {headerMode === 'companyLogo' && headerLogo ? (
          <div
            onClick={onLogoClick}
            className={cn(
              "flex items-center justify-center min-h-[60px] bg-card mb-1 px-3 py-3",
              onLogoClick && "cursor-pointer hover:bg-accent dark:hover:bg-accent/80 transition-colors"
            )}
          >
            <img
              src={collapsed && headerLogoCollapsed ? headerLogoCollapsed : headerLogo}
              alt="Logo"
              className={cn(
                "object-contain transition-all",
                collapsed ? "h-8 w-8" : "h-14 max-w-full"
              )}
            />
          </div>
        ) : (title || logo) && (
          <div
            onClick={onLogoClick}
            className={cn(
              "flex items-center min-h-[60px] bg-card mb-1",
              collapsed ? "justify-center px-2 py-4.5" : "justify-start px-5 py-4.5",
              onLogoClick && "cursor-pointer hover:bg-accent dark:hover:bg-accent/80 transition-colors"
            )}
          >
            {logo}
            {!collapsed && (
              <div className="flex-1 overflow-hidden ml-3">
                {title && <div className="font-semibold text-base text-foreground leading-tight tracking-tight">{title}</div>}
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide">
          {items.length > 0 && renderItems(items)}

          {groups.map((group) => {
            const isExpanded = expandedGroups[group.label]
            const isCollapsible = group.collapsible !== false

            return (
              <div key={group.label} className="mb-6">
                {!collapsed && (
                  <button
                    type="button"
                    onClick={() => isCollapsible && toggleGroup(group.label)}
                    aria-expanded={isExpanded}
                    className={cn(
                      "w-full px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-between text-left",
                      isCollapsible && "cursor-pointer hover:text-foreground transition-colors"
                    )}
                  >
                    <span>{group.label}</span>
                    {isCollapsible && (
                      <div className="w-3 h-3">
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </div>
                    )}
                  </button>
                )}
                {isExpanded && renderItems(group.items)}
              </div>
            )
          })}
        </div>

        {companyLogo && !collapsed && (
          <div className="mt-auto p-4 flex justify-center">
            <img
              src={companyLogo}
              alt="Logo da Empresa"
              className="h-14 opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        )}

        {showCollapseButton && !isMobile && (
          <button
            onClick={handleToggle}
            type="button"
            aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            className="absolute bottom-20 -right-3 bg-card border border-border rounded-sm p-1 cursor-pointer flex items-center justify-center transition-all w-6 h-6 shadow-sm hover:bg-accent dark:hover:bg-accent/80 hover:shadow-md active:scale-95"
          >
            <div className="w-3.5 h-3.5 text-muted-foreground flex items-center justify-center">
              {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </div>
          </button>
        )}
        </aside>
      </>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center border-b p-4", className)} {...props} />
  )
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto p-4", className)} {...props} />
  )
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-t p-4", className)} {...props} />
  )
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn("flex flex-col space-y-1", className)} {...props} />
  )
)
SidebarNav.displayName = "SidebarNav"

export interface SidebarNavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  icon?: React.ReactNode
  href?: string
}

const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ className, active, icon, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent dark:hover:bg-accent/80 hover:text-accent-foreground",
          active && "bg-accent text-accent-foreground",
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
      </a>
    )
  }
)
SidebarNavItem.displayName = "SidebarNavItem"

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem }
