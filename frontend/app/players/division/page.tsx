'use client'

import { useState, useEffect } from 'react'
import PlayerCard from '@/components/player-card'
import { fetchPlayers } from '@/lib/player-data'
import { Skeleton } from '@/components/ui/skeleton'

export default function ByDivisionPage() {
  const [players, setPlayers] = useState([])
  const [divisions, setDivisions] = useState<string[]>([])
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const allPlayers = await fetchPlayers()
        setPlayers(allPlayers)
        const uniqueDivisions = Array.from(
          new Set(allPlayers.map((p: any) => p.division || 'College').filter(Boolean))
        ).sort() as string[]
        setDivisions(uniqueDivisions)
        setSelectedDivision(uniqueDivisions[0] || null)
      } catch (error) {
        console.error('Error loading divisions:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredPlayers = selectedDivision 
    ? players.filter((p: any) => (p.division || 'College') === selectedDivision)
    : players

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <h1 className="text-4xl font-bold mb-8">By Division</h1>
          <div className="grid gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">By Division</h1>
          <p className="text-lg text-muted-foreground">
            Browse players filtered by their division
          </p>
        </div>

        {/* Division Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {divisions.map((division) => (
            <button
              key={division}
              onClick={() => setSelectedDivision(division)}
              className={`px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedDivision === division
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                  : 'bg-secondary/40 text-foreground border border-border/50 hover:border-primary/30 hover:bg-secondary/60'
              }`}
            >
              {division}
            </button>
          ))}
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player: any) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  )
}
