import * as React from "react"
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export interface AreaChartDataItem {
  name: string
  [key: string]: any
}

export interface AreaChartProps {
  data: AreaChartDataItem[]
  dataKeys: string[]
  xAxisKey?: string
  colors?: string[]
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  width?: number | `${number}%`
  height?: number | `${number}%`
  className?: string
  strokeWidth?: number
  fillOpacity?: number
}

export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
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
      strokeWidth = 2,
      fillOpacity = 0.6,
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
          <RechartsAreaChart data={data}>
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
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                fill={chartColors[index % chartColors.length]}
                strokeWidth={strokeWidth}
                fillOpacity={fillOpacity}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

AreaChart.displayName = "AreaChart"
