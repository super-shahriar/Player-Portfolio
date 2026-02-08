'use client'

import Link from 'next/link'

export interface Player {
  id: string
  name: string
  position: string
  university: string
  country: string
  verticalReach: number
  image?: string
}

interface PlayerCardProps {
  player: Player
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link href={`/player/${player.id}`}>
      <div className="group relative overflow-hidden rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
        {/* Image Container */}
        <div className="relative h-48 bg-gradient-to-b from-secondary to-secondary/50 overflow-hidden">
          {player.image ? (
            <img src={player.image || "/placeholder.svg"} alt={player.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-muted/50" />
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Name */}
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {player.name}
            </h3>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
              {player.position}
            </p>
          </div>

          {/* University & Country */}
          <div className="flex items-center justify-between text-xs text-foreground/70 space-y-1">
            <div className="space-y-1 flex-1">
              <p className="line-clamp-1">{player.university}</p>
              <p className="font-semibold text-accent">{player.country}</p>
            </div>
          </div>

          {/* Standout Stat */}
          <div className="pt-3 border-t border-border/30">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Vertical Reach
            </p>
            <p className="text-xl font-bold text-primary">{player.verticalReach} cm</p>
          </div>
        </div>

        {/* Accent Bar on Hover */}
        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-xl transition-all pointer-events-none" />
      </div>
    </Link>
  )
}
