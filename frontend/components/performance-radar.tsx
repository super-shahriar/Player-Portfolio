'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

interface PerformanceStats {
  stamina: number
  power: number
  technique: number
  speed: number
  jump: number
}

interface PerformanceRadarProps {
  stats?: PerformanceStats
}

const defaultStats: PerformanceStats = {
  stamina: 91,
  power: 92,
  technique: 95,
  speed: 85,
  jump: 88,
}

export default function PerformanceRadar({ stats = defaultStats }: PerformanceRadarProps) {
  const performanceData = [
    { metric: 'Stamina', value: stats.stamina, fullMark: 100 },
    { metric: 'Power', value: stats.power, fullMark: 100 },
    { metric: 'Technique', value: stats.technique, fullMark: 100 },
    { metric: 'Speed', value: stats.speed, fullMark: 100 },
    { metric: 'Jump', value: stats.jump, fullMark: 100 },
  ]

  const primaryColor = 'hsl(75, 100%, 50%)'

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Performance Metrics</h2>
        <p className="text-sm text-muted-foreground mt-1">5-Metric Performance Profile</p>
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
              domain={[0, 100]}
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
