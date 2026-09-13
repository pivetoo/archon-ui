import { BarChart3, PieChart as PieIcon } from 'lucide-react'
import { BarChart, ChartContainer } from 'archon-ui'

export function ComGrafico() {
  return (
    <div style={{ width: 600 }}>
      <ChartContainer title="Receita por mês" icon={<BarChart3 className="h-4 w-4" />} height={280}>
        <BarChart
          data={[
            { name: 'Jun', receita: 57300 },
            { name: 'Jul', receita: 61200 },
            { name: 'Ago', receita: 64800 },
          ]}
          dataKeys={['receita']}
          height={260}
        />
      </ChartContainer>
    </div>
  )
}

export function Vazio() {
  return (
    <div style={{ width: 600 }}>
      <ChartContainer title="Contratos por plano" icon={<PieIcon className="h-4 w-4" />} height={200} isEmpty emptyMessage="Nenhum contrato no período selecionado.">
        <div />
      </ChartContainer>
    </div>
  )
}
