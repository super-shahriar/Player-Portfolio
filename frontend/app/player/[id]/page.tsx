'use client'

import { use, useState, useEffect } from 'react'
import { fetchPlayerById } from '@/lib/player-data'
import AthletePortrait from '@/components/athlete-portrait'
import PerformanceRadar from '@/components/performance-radar'
import { Skeleton } from '@/components/ui/skeleton'

interface PlayerProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export default function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  const { id } = use(params)
  const [player, setPlayer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlayer() {
      try {
        setLoading(true)
        const data = await fetchPlayerById(id)
        setPlayer(data)
      } catch (error) {
        console.error('Error loading player:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPlayer()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="hidden md:grid md:grid-cols-3 gap-8 p-12 max-w-7xl mx-auto">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Player Not Found</h1>
          <p className="text-muted-foreground">The player you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Desktop: Three-column layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 p-12 max-w-7xl mx-auto">
        {/* Left Column: Athlete Portrait */}
        <div className="flex items-center justify-center">
          <AthletePortrait />
        </div>

        {/* Center Column: Bio & Trivia */}
        <div className="flex flex-col justify-center space-y-8">
          <PlayerBioSection player={player} />
        </div>

        {/* Right Column: Performance & Stats */}
        <div className="flex flex-col justify-start space-y-8">
          <PerformanceRadar stats={player.stats} />
          <PlayerStatsCards player={player} />
        </div>
      </div>

      {/* Mobile: Vertical stack */}
      <div className="md:hidden flex flex-col space-y-8 p-6">
        <AthletePortrait />
        <PlayerBioSection player={player} />
        <PerformanceRadar stats={player.stats} />
        <PlayerStatsCards player={player} />
      </div>
    </div>
  )
}

function PlayerBioSection({ player }: { player: any }) {
  return (
    <div className="space-y-8">
      {/* Player Name */}
      <div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
          {player.first_name} {player.last_name}
        </h1>
        <p className="text-lg text-muted-foreground mt-3">{player.position}</p>
      </div>

      {/* Teams */}
      <div className="space-y-1">
        {player.school_team && (
          <p><span className="font-semibold">School Team:</span> {player.school_team}</p>
        )}
        {player.college_team && (
          <p><span className="font-semibold">College Team:</span> {player.college_team}</p>
        )}
        {player.university_team && (
          <p><span className="font-semibold">University Team:</span> {player.university_team}</p>
        )}
        {player.current_team && (
          <p><span className="font-semibold">Current Team:</span> {player.current_team}</p>
        )}
      </div>

      {/* Bio Paragraph */}
      <div className="space-y-4">
        <p className="text-foreground/80 leading-relaxed">{player.bio}</p>
      </div>

      {/* Trivia/Quick Facts */}
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Quick Facts</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Position', value: player.position },
            { label: 'Height', value: player.height },
            { label: 'Weight', value: player.weight },
            { label: 'Play Style', value: player.playStyle },
          ].map((item) => (
            <div
              key={item.label}
              className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                {item.label}
              </p>
              <p className="text-foreground font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlayerStatsCards({ player }: { player: any }) {
  const stats = [
    {
      label: 'Vertical Reach',
      value:
        player.verticalReach !== undefined && player.verticalReach !== null
          ? player.verticalReach.toString()
          : 'N/A',
      unit: 'cm',
      trend: 5,
    },
    {
      label: 'Service Ace %',
      value:
        player.serviceAcePercent !== undefined && player.serviceAcePercent !== null
          ? player.serviceAcePercent.toString()
          : 'N/A',
      unit: '%',
      trend: 12,
    },
    {
      label: 'Match Wins',
      value:
        player.matchWins !== undefined && player.matchWins !== null
          ? player.matchWins.toString()
          : 'N/A',
      unit: 'games',
      trend: 8,
    },
  ]

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
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                  </svg>
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
