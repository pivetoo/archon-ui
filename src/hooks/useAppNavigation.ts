import { useNavigate, useLocation } from 'react-router-dom'
import type { SidebarItemData, SidebarGroup } from '../components/ui/sidebar'

export interface NavigationConfig {
  basePath?: string
  items?: SidebarItemData[]
  groups?: SidebarGroup[]
}

export const useAppNavigation = (config: NavigationConfig) => {
  const navigate = useNavigate()
  const location = useLocation()
  const basePath = config.basePath || ''

  const isActive = (path: string): boolean => {
    const fullPath = basePath + path
    return location.pathname === fullPath ||
           (path !== '/' && location.pathname.startsWith(fullPath))
  }

  const handleNavigate = (path: string) => {
    navigate(basePath + path)
  }

  const createMenuItem = (
    key: string,
    label: string,
    path: string,
    icon?: React.ReactNode
  ): SidebarItemData => ({
    key,
    label,
    icon,
    active: isActive(path),
    onClick: () => handleNavigate(path)
  })

  const createMenuGroup = (
    label: string,
    items: Array<{
      key: string
      label: string
      path: string
      icon?: React.ReactNode
    }>
  ): SidebarGroup => ({
    label,
    items: items.map(item => createMenuItem(item.key, item.label, item.path, item.icon))
  })

  return {
    isActive,
    handleNavigate,
    createMenuItem,
    createMenuGroup,
    currentPath: location.pathname
  }
}
