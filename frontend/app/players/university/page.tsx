'use client'

import { useState, useEffect } from 'react'
import PlayerCard from '@/components/player-card'
import { fetchPlayers, fetchPlayersByUniversity } from '@/lib/player-data'
import { Skeleton } from '@/components/ui/skeleton'

export default function ByUniversityPage() {
  const [players, setPlayers] = useState([])
  const [universities, setUniversities] = useState<string[]>([])
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const allPlayers = await fetchPlayers()
        const uniqueUniversities = Array.from(
          new Set(allPlayers.map((p: any) => p.university))
        ).sort() as string[]
        setUniversities(uniqueUniversities)
        setSelectedUniversity(uniqueUniversities[0] || null)
      } catch (error) {
        console.error('Error loading universities:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    async function loadPlayersForUniversity() {
      if (selectedUniversity) {
        try {
          const data = await fetchPlayersByUniversity(selectedUniversity)
          setPlayers(data)
        } catch (error) {
          console.error('Error loading players:', error)
        }
      }
    }
    loadPlayersForUniversity()
  }, [selectedUniversity])

  const filteredPlayers = players

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">By University</h1>
          <p className="text-lg text-muted-foreground">
            Browse players filtered by their university
          </p>
        </div>

        {/* University Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {universities.map((university) => (
            <button
              key={university}
              onClick={() => setSelectedUniversity(university)}
              className={`px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedUniversity === university
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                  : 'bg-secondary/40 text-foreground border border-border/50 hover:border-primary/30 hover:bg-secondary/60'
              }`}
            >
              {university}
            </button>
          ))}
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => <PlayerCard key={player.id} player={player} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No players found for this university</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
