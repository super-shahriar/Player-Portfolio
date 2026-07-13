// app/player/[id]/page.tsx
import PlayerHome from './player-home'

export async function generateStaticParams() {
  return ['demo-1', 'demo-2', 'demo-3', 'demo-4'].map((id) => ({ id }))
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <PlayerHome params={params} />
} 