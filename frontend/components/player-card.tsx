'use client'

import Link from 'next/link'

export interface Player {
  id: string
  name: string
  first_name?: string
  last_name?: string
  position: string
  university: string
  country: string
  verticalReach: number
  image?: string
  school_team?: string;
  college_team?: string;
  university_team?: string;
  current_team?: string;
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
            <h2 className="text-2xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
              {player.name ?? `${player.first_name ?? ''} ${player.last_name ?? ''}`.trim()}
            </h2>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
              {player.position}
            </p>
          </div>

          {/* Player Name Only */}
          <div className="flex flex-col gap-1 text-xl md:text-2xl font-extrabold text-primary">
            {player.name}
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
