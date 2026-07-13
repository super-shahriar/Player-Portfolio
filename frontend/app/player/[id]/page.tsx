// app/player/[id]/page.tsx
import PlayerHome from './player-home'

export async function generateStaticParams() {
  return [
    'shahriar-ratul',
    'menon-pranto',
    'haikyuu-hinata', 'haikyuu-kageyama', 'haikyuu-tanaka', 'haikyuu-nishinoya',
    'haikyuu-daichi', 'haikyuu-sugawara', 'haikyuu-asahi', 'haikyuu-tsukishima',
    'haikyuu-yamaguchi', 'haikyuu-kenma', 'haikyuu-kuroo', 'haikyuu-oikawa',
    'haikyuu-ushijima',
  ].map((id) => ({ id }))
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <PlayerHome params={params} />
} 