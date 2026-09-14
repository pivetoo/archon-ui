import { useMemo } from "react"
import type { SidebarItemData, SidebarGroup } from "../components/ui/sidebar"
import type { BreadcrumbItem } from "../components/ui/breadcrumb"
import { useOptionalI18n } from "../i18n/I18nProvider"

interface UseBreadcrumbsOptions {
  pathname: string
  navigate: (path: string) => void
  home?: { label: string; path: string }
  menuItems?: SidebarItemData[]
  menuGroups?: SidebarGroup[]
}

export function useBreadcrumbs(options: UseBreadcrumbsOptions): BreadcrumbItem[] {
  const i18n = useOptionalI18n()
  const { pathname, navigate, home = { label: i18n?.t("nav.dashboard") ?? "Dashboard", path: "/" }, menuItems = [], menuGroups = [] } = options

  return useMemo(() => {
    const crumbs: BreadcrumbItem[] = []

    if (pathname !== home.path) {
      crumbs.push({ label: home.label, onClick: () => navigate(home.path) })
    }

    for (const item of menuItems) {
      if (item.path === pathname) {
        crumbs.push({ label: item.label })
        return crumbs
      }
    }

    for (const group of menuGroups) {
      for (const item of group.items) {
        if (item.path === pathname) {
          crumbs.push({ label: item.label })
          return crumbs
        }
      }
    }

    return crumbs
  }, [pathname, navigate, home, menuItems, menuGroups])
}
