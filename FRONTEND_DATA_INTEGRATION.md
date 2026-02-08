# 🚀 Frontend Data Integration Quick Reference

Complete code snippets to connect your frontend to the backend API.

---

## 🌳 Frontend Folder Tree

```
frontend/
│
├── 📄 Configuration Files
│   ├── package.json              ← Shows dependencies
│   ├── tsconfig.json             ← TypeScript settings
│   ├── next.config.mjs           ← Next.js config
│   ├── tailwind.config.ts        ← Tailwind theme
│   ├── components.json           ← shadcn/ui config
│   └── .env.example              ← Env template
│
├── 🎨 app/                       ← Pages (Next.js App Router)
│   ├── layout.tsx                ← Root wrapper (all pages)
│   ├── page.tsx                  ← Home page (/)
│   ├── globals.css               ← Global styles
│   │
│   ├── players/
│   │   ├── page.tsx              ← All players (/players)
│   │   │   ✨ TO CONNECT: fetchPlayers() → map with PlayerCard
│   │   │
│   │   ├── country/page.tsx      ← Filter by country
│   │   │   ✨ TO CONNECT: fetchPlayers(country=param)
│   │   │
│   │   ├── division/page.tsx     ← Filter by division
│   │   │   ✨ TO CONNECT: fetchPlayers(division=param)
│   │   │
│   │   ├── school/page.tsx       ← Filter by school
│   │   │   ✨ TO CONNECT: fetchPlayers(school=param)
│   │   │
│   │   ├── university/page.tsx   ← Filter by university
│   │   │   ✨ TO CONNECT: fetchPlayers(university=param)
│   │   │
│   │   └── highlights/page.tsx   ← Featured highlights
│   │       ✨ TO CONNECT: fetchStories/highlights
│   │
│   └── player/
│       └── [id]/page.tsx         ← Individual player detail (/player/1)
│           ✨ TO CONNECT: fetchPlayerById(id), fetchStats(id)
│
├── 🧩 components/               ← React Components
│   ├── player-card.tsx           ← Player preview card
│   │   Props: name, position, stats → displays Player Card
│   │
│   ├── athlete-portrait.tsx      ← Player photo display
│   │   Props: imageUrl, name → shows image
│   │
│   ├── performance-radar.tsx     ← Radar chart visualization
│   │   Props: stats → shows 5-point radar
│   │
│   ├── stats-cards.tsx           ← Stats grid display
│   │   Props: stats → shows cards for each stat
│   │
│   ├── bio-trivia.tsx            ← Biography text
│   │   Props: bio → displays player bio
│   │
│   ├── sidebar-navbar.tsx        ← Navigation sidebar
│   │   Static navigation, no data needed
│   │
│   ├── theme-provider.tsx        ← Dark mode provider
│   │   Already configured with next-themes ✅
│   │
│   └── ui/                       ← 40+ Reusable UI Components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       └── ... (40+ total)
│
├── 🪝 hooks/                    ← Custom React Hooks
│   ├── use-mobile.tsx            ← Mobile detection hook
│   └── use-toast.ts              ← Notifications hook
│
├── 🛠 lib/                      ← Utility Functions
│   ├── player-data.ts            ← 🔴 MAIN DATA FILE - Add fetch functions here
│   └── utils.ts                  ← Helper utilities
│
├── 📦 public/                   ← Static Files (images, icons)
│
└── 🎨 styles/
    └── globals.css              ← Global CSS & theme variables
```

---

## 🔴 STEP 1: Update `lib/player-data.ts`

This is the MAIN FILE where you fetch data from backend.

### Current File (Mock Data)
```typescript
// Current export - defined statically
export const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Alexis Rivera',
    // ... static data
  }
]
```

### Replace With (Backend Fetch)
```typescript
// lib/player-data.ts

export interface Player {
  id: string
  name: string
  position: string
  height: string
  weight: string
  playStyle: string
  university: string
  country: string
  verticalReach: number
  serviceAcePercent: number
  matchWins: number
  bio: string
  stats: {
    stamina: number
    power: number
    technique: number
    speed: number
    jump: number
  }
}

export interface Stats {
  athlete_id: string
  season: string
  games_played: number
  kills: number
  blocks: number
  digs: number
  aces: number
}

export interface Story {
  id: string
  athlete_id: string
  title: string
  description: string
  media_url: string
  likes: number
  claps: number
}

// 🔴 API BASE URL - Change this!
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

// ✅ FETCH FUNCTION 1: Get All Players
export async function fetchPlayers(filters?: {
  country?: string
  division?: string
  school?: string
  university?: string
}): Promise<Player[]> {
  try {
    let url = `${API_URL}/athletes`
    
    // Add filters as query params
    if (filters) {
      const params = new URLSearchParams()
      if (filters.country) params.append('country', filters.country)
      if (filters.division) params.append('division', filters.division)
      if (filters.school) params.append('school', filters.school)
      if (filters.university) params.append('university', filters.university)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
    }

    const res = await fetch(url, {
      cache: 'revalidate',
      next: { revalidate: 60 } // Revalidate every 60 seconds
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch players: ${res.status}`)
    }
    
    const data = await res.json()
    return Array.isArray(data) ? data : data.data || []
  } catch (error) {
    console.error('Error fetching players:', error)
    return []
  }
}

// ✅ FETCH FUNCTION 2: Get Single Player by ID
export async function fetchPlayerById(id: string): Promise<Player | null> {
  try {
    const res = await fetch(`${API_URL}/athletes/${id}`, {
      cache: 'revalidate',
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error(`Player not found: ${res.status}`)
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching player ${id}:`, error)
    return null
  }
}

// ✅ FETCH FUNCTION 3: Get Player Stats
export async function fetchPlayerStats(athleteId: string): Promise<Stats | null> {
  try {
    const res = await fetch(`${API_URL}/stats/${athleteId}`, {
      cache: 'revalidate',
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error(`Stats not found: ${res.status}`)
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching stats for ${athleteId}:`, error)
    return null
  }
}

// ✅ FETCH FUNCTION 4: Get Player Stories/Highlights
export async function fetchPlayerStories(athleteId?: string): Promise<Story[]> {
  try {
    let url = `${API_URL}/stories`
    if (athleteId) {
      url += `?athlete_id=${athleteId}`
    }
    
    const res = await fetch(url, {
      cache: 'revalidate',
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch stories: ${res.status}`)
    }
    
    const data = await res.json()
    return Array.isArray(data) ? data : data.data || []
  } catch (error) {
    console.error('Error fetching stories:', error)
    return []
  }
}

// ✅ FETCH FUNCTION 5: Get Highlights
export async function fetchHighlights(): Promise<Story[]> {
  try {
    const res = await fetch(`${API_URL}/stories/highlights`, {
      cache: 'revalidate',
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch highlights: ${res.status}`)
    }
    
    const data = await res.json()
    return Array.isArray(data) ? data : data.data || []
  } catch (error) {
    console.error('Error fetching highlights:', error)
    return []
  }
}

// ✅ FETCH FUNCTION 6: Get Players by Country
export async function fetchPlayersByCountry(country: string): Promise<Player[]> {
  return fetchPlayers({ country })
}

// ✅ FETCH FUNCTION 7: Get Players by Division
export async function fetchPlayersByDivision(division: string): Promise<Player[]> {
  return fetchPlayers({ division })
}

// ✅ FETCH FUNCTION 8: Get Players by School
export async function fetchPlayersBySchool(school: string): Promise<Player[]> {
  return fetchPlayers({ school })
}

// ✅ FETCH FUNCTION 9: Get Players by University
export async function fetchPlayersByUniversity(university: string): Promise<Player[]> {
  return fetchPlayers({ university })
}

// ✅ FETCH FUNCTION 10: Add Like to Story
export async function addLikeToStory(storyId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/stories/${storyId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    return res.ok
  } catch (error) {
    console.error(`Error liking story ${storyId}:`, error)
    return false
  }
}

// ✅ FETCH FUNCTION 11: Add Clap to Story
export async function addClapToStory(storyId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/stories/${storyId}/clap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    return res.ok
  } catch (error) {
    console.error(`Error clapping story ${storyId}:`, error)
    return false
  }
}

// 🔴 Keep old mock data as fallback (optional)
export const PLAYERS_MOCK: Player[] = [
  {
    id: '1',
    name: 'Alexis Rivera',
    position: 'Outside Hitter',
    // ... mock data
  }
]
```

---

## 🔴 STEP 2: Add `.env.local` File

Create at project root:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# For production, change to:
# NEXT_PUBLIC_API_URL=https://api.yoursite.com/api/v1
```

---

## 🔴 STEP 3: Update Page Files

### Update `app/players/page.tsx`
```tsx
'use client'

import { useState, useEffect } from 'react'
import { fetchPlayers } from '@/lib/player-data'
import PlayerCard from '@/components/player-card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function PlayersPage() {
  const [players, setPlayers] = useState([])
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
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">All Players</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error: {error}</h1>
        <p className="text-muted-foreground mt-2">
          Make sure backend is running on http://localhost:8000
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">All Players ({players.length})</h1>
        <Link href="/players">
          <button className="px-4 py-2 bg-primary text-white rounded">
            Refresh
          </button>
        </Link>
      </div>

      {players.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No players found. Check backend connection.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map(player => (
            <PlayerCard key={player.id} {...player} />
          ))}
        </div>
      )}
    </div>
  )
}
```

### Update `app/player/[id]/page.tsx`
```tsx
'use client'

import { useState, useEffect } from 'react'
import { fetchPlayerById, fetchPlayerStats, fetchPlayerStories } from '@/lib/player-data'
import { Skeleton } from '@/components/ui/skeleton'
import AthletPortrait from '@/components/athlete-portrait'
import StatsCards from '@/components/stats-cards'
import PerformanceRadar from '@/components/performance-radar'
import BioTrivia from '@/components/bio-trivia'

export default function PlayerDetail({ params }: { params: { id: string } }) {
  const [player, setPlayer] = useState(null)
  const [stats, setStats] = useState(null)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [playerData, statsData, storiesData] = await Promise.all([
          fetchPlayerById(params.id),
          fetchPlayerStats(params.id),
          fetchPlayerStories(params.id)
        ])
        
        setPlayer(playerData)
        setStats(statsData)
        setStories(storiesData)
      } catch (error) {
        console.error('Error loading player details:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id])

  if (loading) {
    return <div className="container mx-auto py-12"><Skeleton className="h-96" /></div>
  }

  if (!player) {
    return <div className="container mx-auto py-12 text-center">Player not found</div>
  }

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AthletPortrait name={player.name} />
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">{player.name}</h1>
          <p className="text-xl text-muted-foreground">{player.position}</p>
          <p>{player.country}</p>
        </div>
      </div>

      {player.stats && <PerformanceRadar stats={player.stats} />}
      
      {stats && <StatsCards stats={stats} />}
      
      {player.bio && <BioTrivia bio={player.bio} />}

      {stories.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Stories & Highlights</h2>
          <div className="grid gap-4">
            {stories.map(story => (
              <div key={story.id} className="p-4 border rounded">
                <h3 className="font-bold">{story.title}</h3>
                <p>{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

### Update `app/players/country/page.tsx`
```tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchPlayersByCountry } from '@/lib/player-data'
import PlayerCard from '@/components/player-card'

export default function CountryPlayers() {
  const searchParams = useSearchParams()
  const country = searchParams.get('country') || 'USA'
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await fetchPlayersByCountry(country)
      setPlayers(data)
      setLoading(false)
    }
    load()
  }, [country])

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Players from {country}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {players.map(player => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>
    </div>
  )
}
```

---

## 🎯 Summary: What Connects Where

| File | Connects To | Fetches |
|------|-------------|---------|
| `lib/player-data.ts` | Backend API | All data functions |
| `app/players/page.tsx` | `fetchPlayers()` | All players |
| `app/player/[id]/page.tsx` | `fetchPlayerById()`, `fetchPlayerStats()` | Single player + stats |
| `app/players/country/page.tsx` | `fetchPlayersByCountry()` | Players by country |
| `app/players/division/page.tsx` | `fetchPlayersByDivision()` | Players by division |
| `app/players/school/page.tsx` | `fetchPlayersBySchool()` | Players by school |
| `app/players/university/page.tsx` | `fetchPlayersByUniversity()` | Players by university |
| `app/players/highlights/page.tsx` | `fetchHighlights()` | Featured stories |
| `components/player-card.tsx` | Receives props | Displays player card |

---

## ✅ Quick Checklist

- [ ] Copy the new `lib/player-data.ts` code
- [ ] Create `.env.local` file
- [ ] Update `app/players/page.tsx`
- [ ] Update `app/player/[id]/page.tsx`
- [ ] Update filter pages (country, division, school, university)
- [ ] Update `app/players/highlights/page.tsx`
- [ ] Test by running `npm run dev`
- [ ] Check backend is running: `http://localhost:8000/docs`
- [ ] Open frontend: `http://localhost:3000`
- [ ] Verify data loads

---

**You're ready to connect! 🚀**
