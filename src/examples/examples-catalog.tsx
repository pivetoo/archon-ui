import * as React from "react"
import { AppWindow, Blocks, ChartSpline, Database, FormInput, Sparkles } from "lucide-react"
import { AppLayoutSection } from "./sections/app-layout-section"
import { Badge, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui"
import { ChartsSection } from "./sections/charts-section"
import { DataSection } from "./sections/data-section"
import { FeedbackSection } from "./sections/feedback-section"
import { FormsSection } from "./sections/forms-section"
import { PrimitivesSection } from "./sections/primitives-section"

export function ExamplesCatalog() {
  const [activeTab, setActiveTab] = React.useState("primitives")

  if (activeTab === "layout") {
    return (
      <div className="min-h-screen bg-background">
        <AppLayoutSection onBackToCatalog={() => setActiveTab("primitives")} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle>dRTS - Catálogo de exemplos</CardTitle>
              <Badge variant="info">Playground</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">
            Base inicial para reconstruir os exemplos com organização por domínio.
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger value="primitives" className="rounded-md border bg-background data-[state=active]:border-primary">
              <Blocks className="mr-2 h-4 w-4" />
              Primitives
            </TabsTrigger>
            <TabsTrigger value="forms" className="rounded-md border bg-background data-[state=active]:border-primary">
              <FormInput className="mr-2 h-4 w-4" />
              Forms
            </TabsTrigger>
            <TabsTrigger value="feedback" className="rounded-md border bg-background data-[state=active]:border-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="data" className="rounded-md border bg-background data-[state=active]:border-primary">
              <Database className="mr-2 h-4 w-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="charts" className="rounded-md border bg-background data-[state=active]:border-primary">
              <ChartSpline className="mr-2 h-4 w-4" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="layout" className="rounded-md border bg-background data-[state=active]:border-primary">
              <AppWindow className="mr-2 h-4 w-4" />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="primitives" className="mt-4">
            <PrimitivesSection />
          </TabsContent>

          <TabsContent value="forms" className="mt-4">
            <FormsSection />
          </TabsContent>

          <TabsContent value="feedback" className="mt-4">
            <FeedbackSection />
          </TabsContent>

          <TabsContent value="data" className="mt-4">
            <DataSection />
          </TabsContent>

          <TabsContent value="charts" className="mt-4">
            <ChartsSection />
          </TabsContent>

          <TabsContent value="layout" className="mt-4">
            <AppLayoutSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
