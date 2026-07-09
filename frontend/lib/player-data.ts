const DEFAULT_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

type RawPlayer = Record<string, any>

type PlayerRecord = {
  id: string
  name: string
  first_name?: string
  last_name?: string
  position: string
  university: string
  country: string
  verticalReach: number
  image?: string
  player_photo?: string
  school?: string
  division?: string
  university_team?: string
  school_team?: string
  college_team?: string
  current_team?: string
  bio?: string
  height_cm?: number
  weight_kg?: number
  jersey_number?: number
  is_active?: boolean
  performance_stats?: RawPlayer
}

const FALLBACK_PLAYERS: PlayerRecord[] = [
  {
    id: 'demo-1',
    name: 'Ava Martinez',
    first_name: 'Ava',
    last_name: 'Martinez',
    position: 'Outside Hitter',
    university: 'Stanford',
    country: 'USA',
    verticalReach: 92,
    image: 'https://images.unsplash.com/photo-1506844940695-41552b6f8b6c?auto=format&fit=crop&w=800&q=80',
    school: 'Pine Valley High',
    division: 'College',
    university_team: 'Stanford',
    school_team: 'Pine Valley High',
    current_team: 'Stanford Cardinal',
    bio: 'Dynamic wing attacker with elite explosiveness and court vision.',
    jersey_number: 12,
    is_active: true,
    performance_stats: { vertical_jump_cm: 92, hitting_rating: 9, serving_rating: 8 },
  },
  {
    id: 'demo-2',
    name: 'Mia Johnson',
    first_name: 'Mia',
    last_name: 'Johnson',
    position: 'Setter',
    university: 'Texas',
    country: 'USA',
    verticalReach: 84,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    school: 'Westlake High',
    division: 'College',
    university_team: 'Texas',
    school_team: 'Westlake High',
    current_team: 'Texas Longhorns',
    bio: 'Fast-tempo setter who runs a balanced offense and elevates teammates.',
    jersey_number: 9,
    is_active: true,
    performance_stats: { vertical_jump_cm: 84, setting_rating: 10, passing_rating: 9 },
  },
  {
    id: 'demo-3',
    name: 'Sofia Reyes',
    first_name: 'Sofia',
    last_name: 'Reyes',
    position: 'Libero',
    university: 'Baylor',
    country: 'Mexico',
    verticalReach: 76,
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80',
    school: 'Central Catholic',
    division: 'College',
    university_team: 'Baylor',
    school_team: 'Central Catholic',
    current_team: 'Baylor Bears',
    bio: 'Back-row specialist with strong reads and clean first contact.',
    jersey_number: 4,
    is_active: true,
    performance_stats: { vertical_jump_cm: 76, defense_rating: 10, passing_rating: 10 },
  },
  {
    id: 'demo-4',
    name: 'Nina Petrov',
    first_name: 'Nina',
    last_name: 'Petrov',
    position: 'Middle Blocker',
    university: 'UCLA',
    country: 'Canada',
    verticalReach: 95,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    school: 'River Heights',
    division: 'College',
    university_team: 'UCLA',
    school_team: 'River Heights',
    current_team: 'UCLA Bruins',
    bio: 'Physical middle with a fast first step and strong blocking timing.',
    jersey_number: 17,
    is_active: true,
    performance_stats: { vertical_jump_cm: 95, blocking_rating: 9, hitting_rating: 8 },
  },
]

function normalizePlayer(player: RawPlayer, index: number): PlayerRecord {
  const firstName = player.first_name || player.name?.split(' ')[0] || `Player ${index + 1}`
  const lastName = player.last_name || player.name?.split(' ').slice(1).join(' ') || ''
  const performanceStats = player.performance_stats || {}
  const verticalReach =
    Number(player.verticalReach ?? performanceStats.vertical_jump_cm ?? 0) || 0

  return {
    id: String(player.id ?? `player-${index + 1}`),
    name: player.name || `${firstName} ${lastName}`.trim(),
    first_name: firstName,
    last_name: lastName,
    position: player.position || 'Outside Hitter',
    university: player.university || player.university_team || player.current_team || 'Unknown',
    country: player.country || 'Unknown',
    verticalReach,
    image: player.image || player.player_photo,
    player_photo: player.player_photo,
    school: player.school || player.school_team || 'N/A',
    division: player.division || 'College',
    university_team: player.university_team,
    school_team: player.school_team,
    college_team: player.college_team,
    current_team: player.current_team,
    bio: player.bio,
    height_cm: player.height_cm,
    weight_kg: player.weight_kg,
    jersey_number: player.jersey_number,
    is_active: player.is_active,
    performance_stats: performanceStats,
  }
}

// Fetch all players from the backend API.
// If the backend is unavailable, surface the error so the UI only shows real data.
export async function fetchPlayers() {
  try {
    const response = await fetch(`${DEFAULT_API_BASE}/athletes/`)
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`)
    }

    const data = await response.json()
    if (!Array.isArray(data)) {
      throw new Error('Unexpected players response shape')
    }

    return data.map((player: RawPlayer, index: number) => normalizePlayer(player, index))
  } catch (error) {
    console.error('Failed to load players from backend:', error)
    throw new Error('Failed to fetch players')
  }
}

// Fetch players filtered by university
export async function fetchPlayersByUniversity(university: string) {
  const allPlayers = await fetchPlayers()
  return allPlayers.filter((player) => player.university === university)
}

// Fetch players filtered by country
export async function fetchPlayersByCountry(country: string) {
  const allPlayers = await fetchPlayers()
  return allPlayers.filter((player) => player.country === country)
}