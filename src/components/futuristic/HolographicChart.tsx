import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface DataPoint {
  label: string
  value: number
}

interface HolographicChartProps {
  data: DataPoint[]
  title: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function HolographicChart({ data, title, trend = "up", trendValue }: HolographicChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        {trendValue && (
          <div className={`flex items-center gap-1 text-sm ${
            trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
          }`}>
            {trend === "up" && <TrendingUp className="w-4 h-4" />}
            {trend === "down" && <TrendingDown className="w-4 h-4" />}
            {trend === "neutral" && <Activity className="w-4 h-4" />}
            {trendValue}
          </div>
        )}
      </div>

      <div className="h-48 flex items-end justify-between gap-2">
        {data.map((point, i) => {
          const height = (point.value / maxValue) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative">
                <div
                  className="w-full bg-gradient-to-t from-primary via-secondary to-accent rounded-t-lg transition-all duration-500 hover:scale-105 cursor-pointer glow-primary"
                  style={{ height: `${height}%`, minHeight: "20px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-t-lg" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {point.label}
              </div>
              <div className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {point.value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
