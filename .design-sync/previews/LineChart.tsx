import { LineChart } from 'archon-ui'

const evolucao = [
  { name: 'Mar', receita: 51000, custo: 31500 },
  { name: 'Abr', receita: 49500, custo: 32200 },
  { name: 'Mai', receita: 54800, custo: 34100 },
  { name: 'Jun', receita: 57300, custo: 35200 },
  { name: 'Jul', receita: 61200, custo: 36900 },
  { name: 'Ago', receita: 64800, custo: 38100 },
]

export function Evolucao() {
  return (
    <div style={{ width: 560 }}>
      <LineChart data={evolucao} dataKeys={['receita', 'custo']} height={280} showLegend />
    </div>
  )
}

export function ComArea() {
  return (
    <div style={{ width: 560 }}>
      <LineChart data={evolucao} dataKeys={['receita']} height={240} enableArea areaOpacity={0.15} />
    </div>
  )
}
