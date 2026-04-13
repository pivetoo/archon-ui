import * as React from "react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export interface PieChartDataItem {
  name: string
  value: number
  [key: string]: any
}

export interface PieChartProps {
  data: PieChartDataItem[]
  dataKey?: string
  nameKey?: string
  colors?: string[]
  showLabels?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  innerRadius?: number
  outerRadius?: number
  labelFormatter?: (props: any) => string
  width?: number | `${number}%`
  height?: number | `${number}%`
  className?: string
}

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      dataKey = "value",
      nameKey = "name",
      colors,
      showLabels = true,
      showLegend = true,
      showTooltip = true,
      innerRadius = 0,
      outerRadius = 120,
      labelFormatter,
      width = "100%",
      height = 400,
      className,
    },
    ref
  ) => {
    const defaultColors = [
      "hsl(var(--primary))",
      "hsl(var(--secondary))",
      "hsl(221.2 83.2% 53.3%)",
      "hsl(204 94% 94%)",
      "hsl(142 71% 45%)",
      "hsl(0 84.2% 60.2%)",
      "hsl(210 40% 96.1%)",
      "hsl(220 14.3% 95.9%)"
    ]

    const chartColors = colors || defaultColors

    const defaultLabelFormatter = (props: any) => `${props.value}`

    return (
      <div ref={ref} className={className}>
        <ResponsiveContainer width={width} height={height}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={showLabels ? (labelFormatter || defaultLabelFormatter) : false}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((_item, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

PieChart.displayName = "PieChart"
