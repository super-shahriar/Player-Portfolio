'use client'

import PlayerCard from '@/components/player-card'
import { PLAYERS } from '@/lib/player-data'

export default function TopProspectsPage() {
  // Sort players by vertical reach to show top prospects
  const topProspects = [...PLAYERS].sort((a, b) => b.verticalReach - a.verticalReach).slice(0, 8)

  return (
    <div className="min-h-screen bg-background text-foreground">

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Top Prospects</h1>
          <p className="text-lg text-muted-foreground">
            Elite athletes rated by their performance metrics
          </p>
        </div>

        {/* Prospects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topProspects.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  )
}
