import * as React from "react"
import { ResponsiveBar } from "@nivo/bar"
import { cn } from "../../lib/utils"

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

const defaultColors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
]

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
      height = 400,
      className,
      layout = "vertical",
    },
    ref
  ) => {
    const chartColors = colors || defaultColors

    return (
      <div ref={ref} className={cn("h-full w-full", className)} style={{ height: typeof height === "number" ? height : 400 }}>
        <ResponsiveBar
          data={data as any}
          keys={dataKeys}
          indexBy={xAxisKey}
          layout={layout === "horizontal" ? "horizontal" : "vertical"}
          margin={{ top: 10, right: showLegend ? 80 : 10, bottom: 40, left: 50 }}
          padding={0.3}
          innerPadding={2}
          borderRadius={4}
          colors={chartColors}
          enableGridY={showGrid}
          enableGridX={false}
          gridYValues={5}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#ffffff"
          enableLabel={false}
          legends={
            showLegend
              ? [
                  {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 80,
                    translateY: 0,
                    itemsSpacing: 4,
                    itemWidth: 60,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 10,
                  },
                ]
              : []
          }
          tooltip={
            showTooltip
              ? ({ id, value, indexValue }) => (
                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
                    <p className="text-xs font-medium text-gray-500">{String(indexValue)}</p>
                    <p className="text-sm font-bold text-gray-900">
                      {String(id)}: {Number(value).toLocaleString("pt-BR")}
                    </p>
                  </div>
                )
              : undefined
          }
          theme={{
            text: {
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fill: "#6b7280",
            },
            grid: {
              line: {
                stroke: "#e5e7eb",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              },
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

BarChart.displayName = "BarChart"
