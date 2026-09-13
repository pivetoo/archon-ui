import { PieChart } from 'archon-ui'

const porPlano = [
  { name: 'Starter', value: 182 },
  { name: 'Professional', value: 118 },
  { name: 'Enterprise', value: 42 },
]

export function Rosca() {
  return (
    <div style={{ width: 420 }}>
      <PieChart data={porPlano} height={280} innerRadius={70} showLabels={false} showLegend />
    </div>
  )
}

export function Pizza() {
  return (
    <div style={{ width: 420 }}>
      <PieChart data={porPlano} height={280} showLabels />
    </div>
  )
}
