'use client'

import PlayerCard from '@/components/player-card'
import { PLAYERS } from '@/lib/player-data'

export default function BySchoolPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">By School</h1>
          <p className="text-lg text-muted-foreground">
            Browse players filtered by their school
          </p>
        </div>

        {/* Coming Soon */}
        <div className="text-center py-24 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Coming Soon</h2>
          <p className="text-muted-foreground">This section is under development.</p>
        </div>
      </div>
    </div>
  )
}
