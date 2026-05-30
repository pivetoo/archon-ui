import type * as React from 'react'

export type ModuleColor = 'primary' | 'cyan' | 'purple' | 'green' | 'muted'

export interface NavRoute {
  key: string
  label: string
  path: string
  icon: React.ReactNode
  badge?: number
}

export interface NavSubGroup {
  label: string
  routes: NavRoute[]
}

export interface NavModule {
  key: string
  label: string
  icon: React.ReactNode
  color: ModuleColor
  group: 'op' | 'sys'
  routes?: NavRoute[]
  subGroups?: NavSubGroup[]
}

export type ModuleNavConfig = NavModule[]
