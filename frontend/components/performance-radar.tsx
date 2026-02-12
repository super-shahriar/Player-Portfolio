'use client'

import { sensitiveHeaders } from 'http2'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

interface PerformanceStats {
  stamina: number
  power: number
  technique: number
  speed: number
  jump: number
  gameSense: number
}

interface PerformanceRadarProps {
  stats?: PerformanceStats
}

const defaultStats: PerformanceStats = {
  stamina: 5,
  power: 5,
  technique: 5,
  speed: 5,
  jump: 5,
  gameSense: 4,
}

export default function PerformanceRadar({ stats = defaultStats }: PerformanceRadarProps) {
  const performanceData = [
    { metric: 'Stamina', value: stats.stamina, fullMark: 5 },
    { metric: 'Power', value: stats.power, fullMark: 5 },
    { metric: 'Technique', value: stats.technique, fullMark: 5},
    { metric: 'Speed', value: stats.speed, fullMark: 5 },
    { metric: 'Jump', value: stats.jump, fullMark: 5 },
    { metric: 'Game Sense', value: stats.gameSense, fullMark: 5 },
  ]

  const primaryColor = 'hsl(75, 100%, 50%)'

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Performance Metrics</h2>
        <p className="text-sm text-muted-foreground mt-1">6-Metric Performance Profile</p>
      </div>

      <div className="relative w-full h-80 bg-secondary/30 rounded-xl border border-border/50 p-4 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={performanceData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <PolarGrid stroke="hsl(220, 12%, 22%)" />
            <PolarAngleAxis 
              dataKey="metric" 
              stroke="hsl(0, 0%, 68%)" 
              tick={{ fill: 'hsl(0, 0%, 68%)', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              stroke="hsl(220, 12%, 22%)" 
              tick={{ fill: 'hsl(0, 0%, 68%)', fontSize: 11 }}
              angle={90}
              domain={[0, 5]}
              tickCount={6} // This will show ticks and grid lines at 0, 1, 2, 3, 4, 5
            />
            <Radar
              name="Performance"
              dataKey="value"
              stroke={primaryColor}
              fill={primaryColor}
              fillOpacity={0.25}
              dot={{ fill: primaryColor, r: 3 }}
              activeDot={{ r: 5, fillOpacity: 0.8 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
