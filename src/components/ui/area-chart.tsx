import * as React from "react"
import { ResponsiveLine } from "@nivo/line"
import { cn } from "../../lib/utils"
import { useNivoTheme } from "./chart-theme"

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

const defaultColors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
]

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
      height = 400,
      className,
      strokeWidth = 2.5,
      fillOpacity = 0.15,
    },
    ref
  ) => {
    const chartColors = colors || defaultColors
    const nivoTheme = useNivoTheme()

    const nivoData = dataKeys.map((key, index) => ({
      id: key,
      color: chartColors[index % chartColors.length],
      data: data.map((item) => ({
        x: item[xAxisKey],
        y: item[key],
      })),
    }))

    void showGrid

    return (
      <div ref={ref} className={cn("h-full w-full", className)} style={{ height: typeof height === "number" ? height : 400 }}>
        <ResponsiveLine
          data={nivoData}
          margin={{ top: 10, right: 10, bottom: 40, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableGridX={false}
          gridYValues={5}
          colors={chartColors}
          lineWidth={strokeWidth}
          enablePoints={true}
          pointSize={6}
          pointColor="#ffffff"
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enableArea={true}
          areaOpacity={fillOpacity}
          useMesh={true}
          legends={
            showLegend
              ? [
                  {
                    anchor: "bottom-right",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 40,
                    itemsSpacing: 16,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    symbolSize: 10,
                    symbolShape: "circle",
                  },
                ]
              : []
          }
          tooltip={
            showTooltip
              ? ({ point }) => (
                  <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
                    <p className="text-xs font-medium text-muted-foreground">{point.data.x as string}</p>
                    <p className="text-sm font-bold text-foreground">
                      {point.seriesId}: {Number(point.data.y).toLocaleString("pt-BR")}
                    </p>
                  </div>
                )
              : undefined
          }
          theme={nivoTheme}
        />
      </div>
    )
  }
)

AreaChart.displayName = "AreaChart"
