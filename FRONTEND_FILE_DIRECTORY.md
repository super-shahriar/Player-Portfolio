# 📁 Frontend File Directory & Purpose Guide

## Complete Frontend Architecture with Data Flow

This guide explains every file in the frontend and how to connect them to fetch real data from the backend API.

---

## 🎯 Quick Data Flow

```
Backend API (http://localhost:8000/api/v1/)
        ↓
lib/player-data.ts (Fetch functions here)
        ↓
Components (Use the data)
        ↓
Display on Pages
```

---

## 📂 Root Configuration Files

### Core Config Files

| File | Purpose | What to Modify |
|------|---------|----------------|
| `package.json` | Dependencies & scripts | Add API endpoints config here |
| `tsconfig.json` | TypeScript configuration | Type checking rules |
| `next.config.mjs` | Next.js settings | API rewrites/redirects |
| `tailwind.config.ts` | Tailwind CSS customization | Theme colors, spacing |
| `postcss.config.mjs` | PostCSS settings | CSS processing |
| `components.json` | shadcn/ui config | Component paths & aliases |
| `Dockerfile` | Docker containerization | Production build settings |

### Git & Env Files

| File | Purpose | Action |
|------|---------|--------|
| `.gitignore` | Files to ignore in Git | Add `.env.local` here |
| `.dockerignore` | Files to ignore in Docker | Docker build optimization |
| `.env.example` | Template for environment variables | Copy → `.env.local` |
| `.vscode/settings.json` | VS Code workspace settings | IDE configuration |

---

## 🎨 App Directory (Pages & Entry Points)

The `app/` folder contains all pages using Next.js App Router.

### Main Page Files

#### `app/layout.tsx` 
**What it does:** 
- Root layout wrapper for entire app
- Wraps all pages
- Sets up common layout structure
- Applies theme provider

**To Fetch Backend Data:**
```tsx
// Add this to fetch global data (user, theme settings, etc)
async function getGlobalData() {
  const res = await fetch('http://localhost:8000/api/v1/config', {
    cache: 'revalidate',
    next: { revalidate: 3600 }
  })
  return res.json()
}
```

#### `app/page.tsx`
**What it does:**
- Home page (/)
- Landing page with hero section
- Call-to-action buttons
- Feature highlights

**Current Data:** Mock data  
**To Fetch Backend Data:**
```tsx
// Add featured players from backend
const res = await fetch('http://localhost:8000/api/v1/athletes?featured=true')
const featuredPlayers = await res.json()
```

#### `app/globals.css`
**What it does:**
- Global CSS styles
- Tailwind imports
- Root CSS variables
- Animation keyframes

---

## 📄 Players Listing Pages

### `app/players/page.tsx`
**What it does:**
- Main players directory
- Shows all players (paginated)
- Search and basic filters
- Player cards grid

**Current Data:** Static mock data from `lib/player-data.ts`  
**To Fetch Backend Data:**
```tsx
// Fetch all athletes
const res = await fetch('http://localhost:8000/api/v1/athletes')
const players = await res.json()
// Then render player cards
```

### `app/players/country/page.tsx`
**What it does:**
- Filter players by country
- Shows country-grouped players

**To Fetch Backend Data:**
```tsx
// Get query param for country
const country = searchParams.country
const res = await fetch(`http://localhost:8000/api/v1/athletes?country=${country}`)
const players = await res.json()
```

### `app/players/division/page.tsx`
**What it does:**
- Filter players by competition division
- Shows division-grouped players

**To Fetch Backend Data:**
```tsx
const division = searchParams.division
const res = await fetch(`http://localhost:8000/api/v1/athletes?division=${division}`)
```

### `app/players/school/page.tsx`
**What it does:**
- Filter players by school

**To Fetch Backend Data:**
```tsx
const school = searchParams.school
const res = await fetch(`http://localhost:8000/api/v1/athletes?school=${school}`)
```

### `app/players/university/page.tsx`
**What it does:**
- Filter players by university

**To Fetch Backend Data:**
```tsx
const university = searchParams.university
const res = await fetch(`http://localhost:8000/api/v1/athletes?university=${university}`)
```

### `app/players/highlights/page.tsx`
**What it does:**
- Show featured highlights/stories
- Curated video/image collection

**To Fetch Backend Data:**
```tsx
// Fetch stories/highlights
const res = await fetch('http://localhost:8000/api/v1/stories/highlights')
const highlights = await res.json()
```

---

## 👤 Individual Player Pages

### `app/player/[id]/page.tsx`
**What it does:**
- Individual player detail page
- Dynamic route based on player ID
- Shows full profile, stats, stories
- Biography and performance data

**Current Data:** Mock data  
**To Fetch Backend Data:**
```tsx
// Get player ID from params
const { id } = params

// Fetch specific athlete
const playerRes = await fetch(`http://localhost:8000/api/v1/athletes/${id}`)
const player = await playerRes.json()

// Fetch player stats
const statsRes = await fetch(`http://localhost:8000/api/v1/stats/${id}`)
const stats = await statsRes.json()

// Fetch player stories
const storiesRes = await fetch(`http://localhost:8000/api/v1/stories?athlete_id=${id}`)
const stories = await storiesRes.json()
```

---

## 🧩 Components Directory

All reusable React components.

### Layout Components

#### `components/sidebar-navbar.tsx`
**What it does:**
- Main navigation sidebar
- Links to all pages
- Logo/branding
- User menu (if auth added)

**Data Needed:** None (static navigation)  
**Modification:** Add logout button for auth

#### `components/theme-provider.tsx`
**What it does:**
- Wraps app with theme context
- Provides dark/light mode toggle
- Handles theme persistence

**Data Needed:** Current theme preference  
**Already Connected:** ✅ Uses next-themes

---

### Player Display Components

#### `components/player-card.tsx`
**What it does:**
- Reusable card showing player preview
- Name, position, photo
- Key stats at a glance
- Click to navigate to detail page

**Props Needed:**
```tsx
interface PlayerCardProps {
  id: string
  name: string
  position: string
  country: string
  stats: {
    stamina: number
    power: number
    technique: number
    speed: number
    jump: number
  }
}
```

**Usage Example:**
```tsx
import PlayerCard from '@/components/player-card'

// In your page
{players.map(player => (
  <PlayerCard key={player.id} {...player} />
))}
```

#### `components/athlete-portrait.tsx`
**What it does:**
- Displays player profile image
- Optimized image loading
- Fallback for missing images

**Props:** `name`, `imageUrl`, `position`

#### `components/stats-cards.tsx`
**What it does:**
- Shows key player statistics
- Multiple card layout
- Icons and labels for each stat

**Props:** `stats` object with all metrics

#### `components/performance-radar.tsx`
**What it does:**
- Radar chart for player stats
- Visual comparison of abilities
- Uses Recharts library

**Props:** `stats` object

**Example Connection:**
```tsx
import PerformanceRadar from '@/components/performance-radar'

// In player detail page
<PerformanceRadar stats={player.stats} />
```

#### `components/bio-trivia.tsx`
**What it does:**
- Displays player biography
- Interesting facts/trivia
- Career highlights as text

**Props:** `bio` (string), `facts` (array)

---

### UI Components Directory

#### `components/ui/` - 40+ Pre-built Components

These are from **shadcn/ui** (built on Radix UI). Use in all your pages.

**Form Components:**
- `input.tsx` - Text input fields
- `textarea.tsx` - Multi-line text
- `select.tsx` - Dropdown selections
- `checkbox.tsx` - Checkbox inputs
- `radio-group.tsx` - Radio buttons
- `form.tsx` - Form wrapper with validation

**Display Components:**
- `card.tsx` - Card containers
- `badge.tsx` - Status/tag badges
- `avatar.tsx` - Profile images
- `progress.tsx` - Progress bars
- `skeleton.tsx` - Loading placeholders
- `table.tsx` - Data tables

**Navigation:**
- `breadcrumb.tsx` - Breadcrumb navigation
- `pagination.tsx` - Page navigation
- `sidebar.tsx` - Collapsible sidebar
- `dropdown-menu.tsx` - Dropdown menus
- `navigation-menu.tsx` - Top navigation

**Dialogs & Modals:**
- `dialog.tsx` - Modal dialogs
- `alert-dialog.tsx` - Confirmation dialogs
- `drawer.tsx` - Slide-out panels
- `popover.tsx` - Floating popover

**Other:**
- `button.tsx` - Button component
- `label.tsx` - Label component
- `Toast system` - Notifications
- `tooltip.tsx` - Hover tooltips
- `tabs.tsx` - Tab navigation

**Usage Example:**
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function PlayerCard({ player }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge>{player.position}</Badge>
        <p>{player.country}</p>
      </CardContent>
    </Card>
  )
}
```

---

## 🪝 Hooks Directory

Custom React hooks for reusable logic.

### `hooks/use-mobile.tsx`
**What it does:**
- Detects if viewport is mobile
- Returns boolean: `isMobile`
- Used for responsive design

**Usage:**
```tsx
import { useIsMobile } from '@/hooks/use-mobile'

export function MyComponent() {
  const isMobile = useIsMobile()
  
  return (
    <div className={isMobile ? 'flex flex-col' : 'flex flex-row'}>
      {/* Responsive layout */}
    </div>
  )
}
```

### `hooks/use-toast.ts`
**What it does:**
- Toast notification hook
- Show success/error/info messages
- Used throughout app

**Usage:**
```tsx
import { useToast } from '@/hooks/use-toast'

export function MyComponent() {
  const { toast } = useToast()
  
  const handleClick = () => {
    toast({
      title: "Success!",
      description: "Player added successfully",
      variant: "default"
    })
  }
}
```

---

## 🛠 Lib Directory

Utility functions and data.

### `lib/player-data.ts`
**What it does:**
- **MAIN DATA SOURCE** - This is where you fetch backend data
- Defines Player interface
- Mock player data (replace with backend calls)
- Data formatting functions

**Current Content:**
```tsx
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

export const PLAYERS: Player[] = [
  // Mock data here
]
```

**TO FETCH FROM BACKEND - Replace with:**
```tsx
// Add this function
export async function fetchPlayers(): Promise<Player[]> {
  try {
    const res = await fetch('http://localhost:8000/api/v1/athletes')
    if (!res.ok) throw new Error('Failed to fetch players')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching players:', error)
    return [] // Fallback to empty array
  }
}

export async function fetchPlayerById(id: string): Promise<Player | null> {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/athletes/${id}`)
    if (!res.ok) throw new Error('Player not found')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching player:', error)
    return null
  }
}
```

**Then use in pages:**
```tsx
// In app/players/page.tsx
import { fetchPlayers } from '@/lib/player-data'

export default async function PlayersPage() {
  const players = await fetchPlayers()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {players.map(player => (
        <PlayerCard key={player.id} {...player} />
      ))}
    </div>
  )
}
```

### `lib/utils.ts`
**What it does:**
- Utility functions
- cn() - Tailwind class merger
- Data formatting helpers
- Constants

**Usage:**
```tsx
import { cn } from '@/lib/utils'

// Merge Tailwind classes
const buttonClass = cn(
  'px-4 py-2 rounded',
  isPrimary && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
)
```

---

## 📦 Public Directory

### `public/`
**What it does:**
- Static files (images, icons, videos)
- Favicon
- Logos
- PDFs

**Usage:**
```tsx
import Image from 'next/image'

<Image 
  src="/player-photos/alexis.jpg" 
  alt="Alexis Rivera"
  width={300}
  height={400}
/>
```

---

## 🎨 Styles Directory

### `styles/globals.css`
**What it does:**
- Global CSS styles
- Tailwind CSS imports
- CSS variables for theme
- Global reset styles

**Content:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.6%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* ... more variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    /* ... dark theme variables */
  }
}
```

---

## 🔗 Complete Data Flow Example

### Example: Display Players with Backend Data

**Step 1: Create fetching function in `lib/player-data.ts`**
```typescript
export async function fetchPlayers(): Promise<Player[]> {
  const res = await fetch('http://localhost:8000/api/v1/athletes')
  return res.json()
}

export async function fetchPlayerStats(athleteId: string) {
  const res = await fetch(`http://localhost:8000/api/v1/stats/${athleteId}`)
  return res.json()
}

export async function fetchPlayerStories(athleteId: string) {
  const res = await fetch(`http://localhost:8000/api/v1/stories?athlete_id=${athleteId}`)
  return res.json()
}
```

**Step 2: Use in page `app/players/page.tsx`**
```tsx
import { fetchPlayers } from '@/lib/player-data'
import PlayerCard from '@/components/player-card'
import { Button } from '@/components/ui/button'

export default async function PlayersPage() {
  const players = await fetchPlayers()

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">All Players</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map(player => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>
    </div>
  )
}
```

**Step 3: Use in component `components/player-card.tsx`**
```tsx
'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PerformanceRadar from './performance-radar'

export default function PlayerCard({ id, name, position, country, stats }) {
  return (
    <Link href={`/player/${id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Badge>{position}</Badge>
            <Badge variant="outline">{country}</Badge>
          </div>
          
          <PerformanceRadar stats={stats} />
          
          <p className="text-sm text-muted-foreground">
            Click to view full profile →
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
```

---

## 🚀 Backend API Endpoints to Connect

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/athletes` | GET | Fetch all players |
| `/api/v1/athletes?country=USA` | GET | Filter by country |
| `/api/v1/athletes?division=Pro` | GET | Filter by division |
| `/api/v1/athletes/{id}` | GET | Get single player |
| `/api/v1/athletes/{id}` | POST | Create player (if you add admin) |
| `/api/v1/stats/{athlete_id}` | GET | Get player stats |
| `/api/v1/stories` | GET | Get all stories |
| `/api/v1/stories/highlights` | GET | Get featured highlights |
| `/api/v1/stories/{id}` | POST | Create story |
| `/api/v1/stories/{id}/like` | POST | Like a story |
| `/api/v1/stories/{id}/clap` | POST | Clap for story |

---

## 📝 Implementation Checklist

- [ ] Copy fetch functions from backend API docs
- [ ] Add fetch calls to `lib/player-data.ts`
- [ ] Import and use in page files
- [ ] Connect components to real data
- [ ] Test API calls in browser DevTools
- [ ] Add error handling
- [ ] Add loading states with Skeleton components
- [ ] Test filters (country, division, school, university)
- [ ] Test individual player pages
- [ ] Add to-do: Connect stats visualization
- [ ] Add to-do: Connect stories/highlights

---

## 💡 Pro Tips

1. **Use React Query or SWR** - For better data fetching
   ```bash
   npm install @tanstack/react-query
   ```

2. **Add Environment Variables** - For API URL
   ```env
   # .env.local
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Use Loading States**
   ```tsx
   import { Skeleton } from '@/components/ui/skeleton'
   
   {isLoading ? <Skeleton /> : <PlayerCard {...player} />}
   ```

4. **Error Handling**
   ```tsx
   {error && (
     <Alert variant="destructive">
       <AlertTitle>Error</AlertTitle>
       <AlertDescription>{error.message}</AlertDescription>
     </Alert>
   )}
   ```

---

**Ready to start connecting to real data? 🚀**
