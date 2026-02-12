'use client'

import { useState, useEffect } from 'react'
import { fetchPlayers } from '@/lib/player-data'
import PlayerCard from '@/components/player-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function AllPlayersPage() {
  const [players, setPlayers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPlayers() {
      try {
        setLoading(true)
        const data = await fetchPlayers()
        setPlayers(data)
        setError(null)
      } catch (err) {
        setError('Failed to load players')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadPlayers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <h1 className="text-4xl font-bold mb-8">All Players</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-500">Error: {error}</h1>
          <p className="text-muted-foreground">Make sure backend is running on http://localhost:8000</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">All Players ({players.length})</h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete roster of elite volleyball athletes
          </p>
        </div>

        {/* Players Grid */}
        {players.length === 0 ? (
          <p className="text-center text-muted-foreground">No players found. Check backend connection.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
