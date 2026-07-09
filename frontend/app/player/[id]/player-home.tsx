'use client'

import { use, useState, useEffect } from 'react'
import AthletePortrait from '@/components/athlete-portrait'
import PerformanceRadar from '@/components/performance-radar'
import { Skeleton } from '@/components/ui/skeleton'
import { trackViewPlayerProfile } from '@/lib/analytics'

interface PlayerProfilePageProps {
  params: Promise<{
    id: string
  }>
}

function PlayerHome({ params }: PlayerProfilePageProps) {
  const { id } = use(params)
  const [player, setPlayer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlayer() {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:8000/api/v1/athletes/${id}`)
        if (!res.ok) throw new Error('Player not found')
        const data = await res.json()
        setPlayer(data)
      } catch (error) {
        console.error('Error loading player:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPlayer()
  }, [id])

  useEffect(() => {
    if (player) {
      trackViewPlayerProfile({
        id: player.id,
        first_name: player.first_name,
        last_name: player.last_name,
        position: player.position,
        university_team: player.university_team,
        current_team: player.current_team,
      })
    }
  }, [player])

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
          <AthletePortrait jerseyNumber={player.jersey_number} playerImage={player.player_photo} />
        </div>

        {/* Center Column: Bio & Trivia */}
        <div className="flex flex-col justify-start space-y-8">
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
        <AthletePortrait jerseyNumber={player.jersey_number} playerImage={player.player_photo} />
        <PlayerBioSection player={player} />
        <PerformanceRadar stats={player.stats} />
        <PlayerStatsCards player={player} />
      </div>
    </div>
  )
}

export default PlayerHome;

function PlayerBioSection({ player }: { player: any }) {
  return (
    <div className="flex flex-col items-start w-full gap-6 mt-0">
      {/* Player Name */}
      <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance mt-0">
        {player.first_name} {player.last_name}
      </h1>

      {/* Teams */}
      <div className="rounded-xl bg-secondary/30 border border-border/30 px-4 py-3 flex flex-col gap-2 shadow-sm mt-2 w-full">
        {player.school_team && (
          <div className="flex items-center gap-2 text-sm">
            <span role="img" aria-label="School" className="text-lg">🏫</span>
            <span className="font-semibold text-muted-foreground">School Team:</span>
            <span className="text-foreground">{player.school_team}</span>
          </div>
        )}
        {player.college_team && (
          <div className="flex items-center gap-2 text-sm">
            <span role="img" aria-label="College" className="text-lg">🎓</span>
            <span className="font-semibold text-muted-foreground">College Team:</span>
            <span className="text-foreground">{player.college_team}</span>
          </div>
        )}
        {player.university_team && (
          <div className="flex items-center gap-2 text-sm">
            <span role="img" aria-label="University" className="text-lg">🏛️</span>
            <span className="font-semibold text-muted-foreground">University Team:</span>
            <span className="text-foreground">{player.university_team}</span>
          </div>
        )}
        {player.current_team && (
          <div className="flex items-center gap-2 text-sm">
            <span role="img" aria-label="Current Team" className="text-lg">🏐</span>
            <span className="font-semibold text-muted-foreground">Current Team:</span>
            <span className="text-foreground">{player.current_team}</span>
          </div>
        )}
      </div>

      {/* Trivia/Quick Facts */}
      <div className="space-y-3 mt-2 w-full">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Quick Facts</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Position</p>
            <p className="text-foreground font-semibold mt-1">{player.position}</p>
          </div>
          <div className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Height</p>
            <p className="text-foreground font-semibold mt-1">{player.height_cm ? `${player.height_cm} cm` : 'N/A'}</p>
          </div>
          <div className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Weight</p>
            <p className="text-foreground font-semibold mt-1">{player.weight_kg ? `${player.weight_kg} kg` : 'N/A'}</p>
          </div>
          <div className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Jersey Number</p>
            <p className="text-foreground font-semibold mt-1">{player.jersey_number ?? 'N/A'}</p>
          </div>
          {player.performance_stats && (
            <>
              <div className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Vertical Jump</p>
                <p className="text-foreground font-semibold mt-1">{player.performance_stats.vertical_jump_cm ? `${player.performance_stats.vertical_jump_cm} cm` : 'N/A'}</p>
              </div>
              <div className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Spike Power</p>
                <p className="text-foreground font-semibold mt-1">{player.performance_stats.spike_power_kmh ? `${player.performance_stats.spike_power_kmh} km/h` : 'N/A'}</p>
              </div>
              <div className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Passing Rating</p>
                <p className="text-foreground font-semibold mt-1">{player.performance_stats.passing_rating ?? 'N/A'}</p>
              </div>
              <div className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Hitting Rating</p>
                <p className="text-foreground font-semibold mt-1">{player.performance_stats.hitting_rating ?? 'N/A'}</p>
              </div>
            </>



          )}
        </div>
      </div>

      {/* Bio Paragraph (moved below Quick Facts) */}
      {player.bio && (
        <div className="space-y-4 mt-2 w-full">
          <p className="text-foreground/80 leading-relaxed">{player.bio}</p>
        </div>
      )}
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
