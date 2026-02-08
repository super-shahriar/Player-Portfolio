'use client'

import { useState, useEffect } from 'react'
import PlayerCard from '@/components/player-card'
import { fetchPlayers } from '@/lib/player-data'
import { Skeleton } from '@/components/ui/skeleton'

export default function TopProspectsPage() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlayers() {
      try {
        const data = await fetchPlayers()
        setPlayers(data)
      } catch (error) {
        console.error('Error loading players:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPlayers()
  }, [])

  // Sort players by vertical reach to show top prospects
  const topProspects = [...players].sort((a: any, b: any) => (b.verticalReach || 0) - (a.verticalReach || 0)).slice(0, 8)

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <h1 className="text-4xl font-bold mb-8">Top Prospects</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    )
  }

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
