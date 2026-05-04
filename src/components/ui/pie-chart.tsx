import * as React from "react"
import { ResponsivePie } from "@nivo/pie"
import { cn } from "../../lib/utils"

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
  width?: number | `${number}%`
  height?: number | `${number}%`
  className?: string
}

const defaultColors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#6366f1",
]

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
      height = 400,
      className,
    },
    ref
  ) => {
    const chartColors = colors || defaultColors

    const nivoData = data.map((item, index) => ({
      id: item[nameKey],
      label: item[nameKey],
      value: item[dataKey],
      color: chartColors[index % chartColors.length],
    }))

    return (
      <div ref={ref} className={cn("h-full w-full", className)} style={{ height: typeof height === "number" ? height : 400 }}>
        <ResponsivePie
          data={nivoData}
          margin={{ top: 10, right: 120, bottom: 10, left: 10 }}
          innerRadius={innerRadius / 120}
          padAngle={1.5}
          cornerRadius={4}
          colors={chartColors}
          borderWidth={1}
          borderColor="#ffffff"
          enableArcLabels={showLabels}
          arcLabel={showLabels ? (d) => `${d.value}` : undefined}
          arcLabelsSkipAngle={12}
          arcLabelsTextColor="#ffffff"
          enableArcLinkLabels={false}
          legends={
            showLegend
              ? [
                  {
                    anchor: "right",
                    direction: "column",
                    justify: false,
                    translateX: 110,
                    translateY: 0,
                    itemsSpacing: 8,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemTextColor: "#6b7280",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 10,
                    symbolShape: "circle",
                  },
                ]
              : []
          }
          tooltip={
            showTooltip
              ? ({ datum }) => (
                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
                    <p className="text-xs font-medium text-gray-500">{String(datum.label)}</p>
                    <p className="text-sm font-bold text-gray-900">
                      {Number(datum.value).toLocaleString("pt-BR")}
                    </p>
                  </div>
                )
              : undefined
          }
          theme={{
            text: {
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
            },
            legends: {
              text: {
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fill: "#6b7280",
              },
            },
          }}
        />
      </div>
    )
  }
)

PieChart.displayName = "PieChart"
