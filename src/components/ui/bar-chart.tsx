import * as React from "react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export interface BarChartDataItem {
  name: string
  [key: string]: any
}

export interface BarChartProps {
  data: BarChartDataItem[]
  dataKeys: string[]
  xAxisKey?: string
  colors?: string[]
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  width?: number | `${number}%`
  height?: number | `${number}%`
  className?: string
  barSize?: number
  layout?: "horizontal" | "vertical"
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      dataKeys,
      xAxisKey = "name",
      colors,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      width = "100%",
      height = 400,
      className,
      barSize = 20,
      layout = "horizontal",
    },
    ref
  ) => {
    const defaultColors = [
      "hsl(var(--primary))",
      "hsl(var(--secondary))",
      "hsl(221.2 83.2% 53.3%)",
      "hsl(204 94% 94%)",
      "hsl(142 71% 45%)",
      "hsl(0 84.2% 60.2%)"
    ]

    const chartColors = colors || defaultColors

    return (
      <div ref={ref} className={className}>
        <ResponsiveContainer width={width} height={height}>
          <RechartsBarChart data={data} layout={layout}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
            <XAxis
              dataKey={xAxisKey}
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "0.875rem" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "0.875rem" }}
            />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartColors[index % chartColors.length]}
                barSize={barSize}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

BarChart.displayName = "BarChart"
