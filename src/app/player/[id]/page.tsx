import PlayerClientPage from './PlayerClientPage';
import { MOCK_PLAYERS, MOCK_FIGHTERS } from '@/data/mockData';

export function generateStaticParams() {
  const playerIds = MOCK_PLAYERS.map((p) => ({ id: p.id }));
  const fighterIds = MOCK_FIGHTERS.map((f) => ({ id: f.id }));
  return [...playerIds, ...fighterIds];
}

export default function Page({ params }: { params: { id: string } }) {
  return <PlayerClientPage params={params} />;
}
