import React from 'react'

export default function AthletePortrait() {
  return (
    <div className="relative w-full max-w-sm h-96 md:h-full md:max-h-96">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-3xl" />
      
      {/* Image container with stylized cut-out */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-border/30">
        {/* Placeholder image - replace with actual athlete image */}
        <div className="w-full h-full bg-gradient-to-b from-secondary to-secondary/50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-muted/50 mx-auto" />
            <p className="text-muted-foreground text-sm">Elite Volleyball Player</p>
          </div>
        </div>
      </div>

      {/* Subtle shadow overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent rounded-b-2xl pointer-events-none" />
    </div>
  )
}
