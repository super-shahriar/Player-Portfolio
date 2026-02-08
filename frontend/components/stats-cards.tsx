'use client'

import { TrendingUp } from 'lucide-react'

interface StatItem {
  label: string
  value: string
  unit: string
  trend?: number
}

const stats: StatItem[] = [
  {
    label: 'Vertical Reach',
    value: '362',
    unit: 'cm',
    trend: 5,
  },
  {
    label: 'Service Ace %',
    value: '68',
    unit: '%',
    trend: 12,
  },
  {
    label: 'Match Wins',
    value: '245',
    unit: 'games',
    trend: 8,
  },
]

export default function StatsCards() {
  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Career Stats</h2>
        <p className="text-sm text-muted-foreground mt-1">Professional Achievements</p>
      </div>

      {/* Stats Container */}
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative px-5 py-4 rounded-lg bg-secondary/40 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs tracking-wider uppercase text-muted-foreground font-semibold mb-1">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{stat.value}</span>
                  <span className="text-xs text-foreground/60">{stat.unit}</span>
                </div>
              </div>

              {stat.trend && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <TrendingUp size={14} className="text-accent" />
                  <span className="text-xs font-semibold text-accent">+{stat.trend}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
