import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../../lib/utils"

type TabsVariant = "default" | "underline"

const TabsVariantContext = React.createContext<TabsVariant>("default")

const listVariants: Record<TabsVariant, string> = {
  default:
    "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground overflow-x-auto scrollbar-hide data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-start",
  underline:
    "flex h-auto w-full items-center justify-start gap-6 rounded-none border-b border-border bg-transparent p-0 text-muted-foreground overflow-x-auto scrollbar-hide data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-start data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r",
}

const triggerVariants: Record<TabsVariant, string> = {
  default:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-[orientation=vertical]:px-3 data-[orientation=vertical]:py-2 data-[orientation=vertical]:text-left",
  underline:
    "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-0 text-sm font-medium text-muted-foreground shadow-none ring-offset-background transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-2 data-[orientation=vertical]:pb-0 data-[orientation=vertical]:pl-3 data-[orientation=vertical]:pr-3 data-[orientation=vertical]:py-2",
}

const Tabs = TabsPrimitive.Root

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsVariantContext.Provider value={variant}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(listVariants[variant], className)}
      {...props}
    />
  </TabsVariantContext.Provider>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(triggerVariants[variant], className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[orientation=vertical]:mt-0",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

interface TabsBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

const TabsBadge = React.forwardRef<HTMLSpanElement, TabsBadgeProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
)
TabsBadge.displayName = "TabsBadge"

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsBadge }
export type { TabsVariant }
