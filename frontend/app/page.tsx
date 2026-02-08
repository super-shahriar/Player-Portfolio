import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-20 md:py-12">
      <div className="text-center space-y-8 max-w-3xl">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance">
            Elite Volleyball Scouting Platform
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Discover top-tier athletes, analyze performance metrics, and find the next generation of volleyball stars.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Link href="/players">
            <button className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95">
              Browse All Players
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          {[
            {
              title: 'Scout Players',
              description: 'Browse comprehensive player profiles with detailed performance analytics.',
            },
            {
              title: 'Filter by Category',
              description: 'Search by university, country, school, or division to find your target athletes.',
            },
            {
              title: 'Performance Metrics',
              description: 'Analyze 5-metric performance profiles with radar charts and career statistics.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all space-y-3 hover:scale-105"
            >
              <h3 className="font-bold text-lg text-foreground">{feature.title}</h3>
              <p className="text-foreground/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
