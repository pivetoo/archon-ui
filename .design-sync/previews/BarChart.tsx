import { BarChart } from 'archon-ui'

const receitaPorMes = [
  { name: 'Abr', receita: 49500, custo: 32200 },
  { name: 'Mai', receita: 54800, custo: 34100 },
  { name: 'Jun', receita: 57300, custo: 35200 },
  { name: 'Jul', receita: 61200, custo: 36900 },
  { name: 'Ago', receita: 64800, custo: 38100 },
]

export function ReceitaECusto() {
  return (
    <div style={{ width: 560 }}>
      <BarChart data={receitaPorMes} dataKeys={['receita', 'custo']} height={280} showLegend />
    </div>
  )
}

export function Horizontal() {
  return (
    <div style={{ width: 560 }}>
      <BarChart
        data={[
          { name: 'Enterprise', contratos: 42 },
          { name: 'Professional', contratos: 118 },
          { name: 'Starter', contratos: 182 },
        ]}
        dataKeys={['contratos']}
        layout="horizontal"
        height={220}
      />
    </div>
  )
}
