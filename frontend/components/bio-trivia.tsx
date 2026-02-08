import React from 'react'

export default function BioTrivia() {
  const trivia = [
    { label: 'Position', value: 'Outside Hitter' },
    { label: 'Height', value: '6\'2" (188cm)' },
    { label: 'Weight', value: '165 lbs (75kg)' },
    { label: 'Play Style', value: 'Aggressive, High IQ' },
  ]

  return (
    <div className="space-y-8">
      {/* Player Name */}
      <div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
          Alexis Rivera
        </h1>
        <p className="text-lg text-muted-foreground mt-3">Professional Volleyball Player</p>
      </div>

      {/* Bio Paragraph */}
      <div className="space-y-4">
        <p className="text-foreground/80 leading-relaxed">
          An elite outside hitter with exceptional court vision and offensive versatility. Known for powerful spike attacks, strategic positioning, and consistent performance under pressure.
        </p>
        <p className="text-foreground/70 leading-relaxed text-sm">
          5+ years of professional experience across international competitions. Multi-awarded player with a track record of driving team success.
        </p>
      </div>

      {/* Trivia/Quick Facts */}
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Quick Facts</p>
        <div className="grid grid-cols-2 gap-3">
          {trivia.map((item) => (
            <div
              key={item.label}
              className="px-4 py-3 rounded-lg bg-secondary/40 border border-border/30 hover:border-primary/50 transition-colors"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                {item.label}
              </p>
              <p className="text-foreground font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
