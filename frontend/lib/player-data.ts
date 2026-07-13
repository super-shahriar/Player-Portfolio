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
    id: 'shahriar-ratul',
    name: 'Shahriar Ratul',
    first_name: 'Shahriar',
    last_name: 'Ratul',
    position: 'Middle Blocker',
    university: 'NSU',
    country: 'Bangladesh',
    verticalReach: 0,
    image: 'https://i.postimg.cc/9Q4kgTmS/517588198-1150277593801250-6808240156253269263-n.jpg',
    school: 'SPSC',
    division: 'University',
    university_team: 'NSU',
    school_team: 'SPSC',
    college_team: 'SPSC',
    current_team: 'NSU',
    bio: 'Trying to find that "moment" Bokuto talked about, when the game gets intense, I just think how I got hooked on to volleyball.',
    height_cm: 182,
    weight_kg: 76,
    jersey_number: 46,
    is_active: true,
    performance_stats: {},
  },
  {
    id: 'menon-pranto',
    name: 'Menon Pranto',
    first_name: 'Menon',
    last_name: 'Pranto',
    position: 'Middle Blocker',
    university: 'SRU',
    country: 'Bangladesh',
    verticalReach: 0,
    image: 'https://i.postimg.cc/0Q5dFRG7/Screenshot-2026-02-12-073112.png',
    school: 'SRU',
    division: 'University',
    university_team: 'SRU',
    school_team: 'SRU',
    current_team: 'NSU',
    bio: 'Khela Pare na. Meyeder moto mare',
    height_cm: 181,
    weight_kg: 79,
    jersey_number: 9,
    is_active: true,
    performance_stats: {},
  },
  {
    id: 'haikyuu-hinata',
    name: 'Shoyo Hinata',
    first_name: 'Shoyo',
    last_name: 'Hinata',
    position: 'Wing Spiker',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 90,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: "Small but explosive decoy whose freak jump and relentless drive make up for his height.",
    height_cm: 164,
    jersey_number: 10,
    is_active: true,
    performance_stats: { vertical_jump_cm: 90, hitting_rating: 9, serving_rating: 5 },
  },
  {
    id: 'haikyuu-kageyama',
    name: 'Tobio Kageyama',
    first_name: 'Tobio',
    last_name: 'Kageyama',
    position: 'Setter',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: '"The King of the Court" — a genius setter with pinpoint tosses and a wicked jump serve.',
    height_cm: 180,
    jersey_number: 9,
    is_active: true,
    performance_stats: { setting_rating: 10, serving_rating: 9, passing_rating: 7 },
  },
  {
    id: 'haikyuu-tanaka',
    name: 'Ryunosuke Tanaka',
    first_name: 'Ryunosuke',
    last_name: 'Tanaka',
    position: 'Wing Spiker',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: 'Loud, fiery wing spiker who hits harder the more the crowd gets behind him.',
    height_cm: 180,
    jersey_number: 5,
    is_active: true,
    performance_stats: { hitting_rating: 8, serving_rating: 6 },
  },
  {
    id: 'haikyuu-nishinoya',
    name: 'Yu Nishinoya',
    first_name: 'Yu',
    last_name: 'Nishinoya',
    position: 'Libero',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: '"The Guardian Deity" — a libero whose reflexes turn any spike into a clean pass.',
    height_cm: 159,
    jersey_number: 4,
    is_active: true,
    performance_stats: { defense_rating: 10, passing_rating: 10 },
  },
  {
    id: 'haikyuu-daichi',
    name: 'Daichi Sawamura',
    first_name: 'Daichi',
    last_name: 'Sawamura',
    position: 'Wing Spiker',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: 'Steady, dependable team captain who keeps Karasuno grounded under pressure.',
    height_cm: 182,
    jersey_number: 1,
    is_active: true,
    performance_stats: { hitting_rating: 7, passing_rating: 8 },
  },
  {
    id: 'haikyuu-sugawara',
    name: 'Koshi Sugawara',
    first_name: 'Koshi',
    last_name: 'Sugawara',
    position: 'Setter',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: 'Karasuno\'s calm and supportive vice-captain, known for his precise serves.',
    height_cm: 175,
    jersey_number: 2,
    is_active: true,
    performance_stats: { setting_rating: 8, serving_rating: 9 },
  },
  {
    id: 'haikyuu-asahi',
    name: 'Asahi Azumane',
    first_name: 'Asahi',
    last_name: 'Azumane',
    position: 'Wing Spiker',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: "\"The Ace\" — a towering spiker who found his confidence again after a hard loss.",
    height_cm: 185,
    jersey_number: 3,
    is_active: true,
    performance_stats: { hitting_rating: 9, blocking_rating: 6 },
  },
  {
    id: 'haikyuu-tsukishima',
    name: 'Kei Tsukishima',
    first_name: 'Kei',
    last_name: 'Tsukishima',
    position: 'Middle Blocker',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: 'Sharp-tongued blocker who reads opposing hitters better than almost anyone.',
    height_cm: 188,
    jersey_number: 11,
    is_active: true,
    performance_stats: { blocking_rating: 9, hitting_rating: 6 },
  },
  {
    id: 'haikyuu-yamaguchi',
    name: 'Tadashi Yamaguchi',
    first_name: 'Tadashi',
    last_name: 'Yamaguchi',
    position: 'Middle Blocker',
    university: 'Karasuno High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Karasuno High',
    division: 'High School',
    university_team: 'Karasuno High',
    school_team: 'Karasuno High',
    current_team: 'Karasuno High Volleyball Club',
    bio: 'Practiced a jump float serve until it became a genuine game-changing weapon.',
    height_cm: 172,
    jersey_number: 6,
    is_active: true,
    performance_stats: { serving_rating: 8, passing_rating: 6 },
  },
  {
    id: 'haikyuu-kenma',
    name: 'Kenma Kozume',
    first_name: 'Kenma',
    last_name: 'Kozume',
    position: 'Setter',
    university: 'Nekoma High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Nekoma High',
    division: 'High School',
    university_team: 'Nekoma High',
    school_team: 'Nekoma High',
    current_team: 'Nekoma High Volleyball Club',
    bio: '"The Brain" — an analytical setter who plays volleyball like a puzzle to solve.',
    height_cm: 169,
    jersey_number: 5,
    is_active: true,
    performance_stats: { setting_rating: 9, passing_rating: 7 },
  },
  {
    id: 'haikyuu-kuroo',
    name: 'Tetsuro Kuroo',
    first_name: 'Tetsuro',
    last_name: 'Kuroo',
    position: 'Middle Blocker',
    university: 'Nekoma High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Nekoma High',
    division: 'High School',
    university_team: 'Nekoma High',
    school_team: 'Nekoma High',
    current_team: 'Nekoma High Volleyball Club',
    bio: '"Scheming Captain" — a crafty middle blocker who reads and disrupts the opposing offense.',
    height_cm: 188,
    jersey_number: 1,
    is_active: true,
    performance_stats: { blocking_rating: 9, hitting_rating: 7 },
  },
  {
    id: 'haikyuu-oikawa',
    name: 'Toru Oikawa',
    first_name: 'Toru',
    last_name: 'Oikawa',
    position: 'Setter',
    university: 'Aoba Johsai High',
    country: 'Japan',
    verticalReach: 0,
    school: 'Aoba Johsai High',
    division: 'High School',
    university_team: 'Aoba Johsai High',
    school_team: 'Aoba Johsai High',
    current_team: 'Aoba Johsai High Volleyball Club',
    bio: '"The Grand King" — a fan-favorite captain whose setting and serving are second to none.',
    height_cm: 185,
    jersey_number: 1,
    is_active: true,
    performance_stats: { setting_rating: 10, serving_rating: 10 },
  },
  {
    id: 'haikyuu-ushijima',
    name: 'Wakatoshi Ushijima',
    first_name: 'Wakatoshi',
    last_name: 'Ushijima',
    position: 'Wing Spiker',
    university: 'Shiratorizawa Academy',
    country: 'Japan',
    verticalReach: 0,
    school: 'Shiratorizawa Academy',
    division: 'High School',
    university_team: 'Shiratorizawa Academy',
    school_team: 'Shiratorizawa Academy',
    current_team: 'Shiratorizawa Academy Volleyball Club',
    bio: '"Ushiwaka" — a world-class ace whose spikes are considered among the strongest in Japan.',
    height_cm: 189,
    jersey_number: 1,
    is_active: true,
    performance_stats: { hitting_rating: 10, blocking_rating: 8 },
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
// Falls back to demo data when no backend is available (e.g. the static GitHub Pages deploy).
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
    console.error('Failed to load players from backend, using demo data:', error)
    return FALLBACK_PLAYERS.map((player, index) => normalizePlayer(player, index))
  }
}

export async function fetchPlayerById(id: string) {
  const allPlayers = await fetchPlayers()
  return allPlayers.find((player) => player.id === id) ?? null
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