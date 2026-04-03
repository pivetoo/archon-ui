import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react"
import {
  AreaChart,
  BarChart,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  LineChart,
  PieChart,
} from "../../components/ui"
import { executionHistory, revenueByMonth, ticketByChannel } from "../mock-data"

export function ChartsSection() {
  const revenueChartData = revenueByMonth.map((item) => ({ ...item, name: item.mes }))
  const executionChartData = executionHistory.map((item) => ({ ...item, name: item.dia }))

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bar chart</CardTitle>
          <CardDescription>Receita vs custo mensal.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer title="Financeiro" icon={<BarChart3 className="h-4 w-4" />} height={280}>
            <BarChart data={revenueChartData} xAxisKey="mes" dataKeys={["receita", "custo"]} height={220} />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Line e area chart</CardTitle>
          <CardDescription>Taxa de execução por dia útil.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ChartContainer title="Linha" icon={<LineChartIcon className="h-4 w-4" />} height={220}>
            <LineChart data={executionChartData} xAxisKey="dia" dataKeys={["sucesso", "falha"]} height={160} />
          </ChartContainer>
          <ChartContainer title="Área" height={220}>
            <AreaChart data={executionChartData} xAxisKey="dia" dataKeys={["sucesso", "falha"]} height={160} />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Pie chart</CardTitle>
          <CardDescription>Distribuição de chamados por canal.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer title="Atendimento" icon={<PieChartIcon className="h-4 w-4" />} height={280}>
            <PieChart data={ticketByChannel} height={220} outerRadius={80} />
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
