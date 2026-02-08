'use client'

import { useState, useEffect } from 'react'
import PlayerCard from '@/components/player-card'
import { fetchPlayers, fetchPlayersByCountry } from '@/lib/player-data'
import { Skeleton } from '@/components/ui/skeleton'

export default function ByCountryPage() {
  const [players, setPlayers] = useState<any[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const allPlayers = await fetchPlayers()
        const uniqueCountries = Array.from(
          new Set(allPlayers.map((p: any) => p.country))
        ).sort() as string[]
        setCountries(uniqueCountries)
        setSelectedCountry(uniqueCountries[0] || null)
      } catch (error) {
        console.error('Error loading countries:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    async function loadPlayersForCountry() {
      if (selectedCountry) {
        try {
          const data = await fetchPlayersByCountry(selectedCountry)
          setPlayers(data)
        } catch (error) {
          console.error('Error loading players:', error)
        }
      }
    }
    loadPlayersForCountry()
  }, [selectedCountry])

  const filteredPlayers = players

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">By Country</h1>
          <p className="text-lg text-muted-foreground">
            Browse players filtered by their country
          </p>
        </div>

        {/* Country Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCountry === country
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                  : 'bg-secondary/40 text-foreground border border-border/50 hover:border-primary/30 hover:bg-secondary/60'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => <PlayerCard key={player.id} player={player} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No players found for this country</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
