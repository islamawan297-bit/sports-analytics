import GameClientPage from './GameClientPage';
import { MOCK_GAMES, MOCK_FIGHTS } from '@/data/mockData';

export function generateStaticParams() {
  const gameIds = MOCK_GAMES.map((g) => ({ id: g.id }));
  const fightIds = MOCK_FIGHTS.map((f) => ({ id: f.id }));
  return [...gameIds, ...fightIds];
}

export default function Page({ params }: { params: { id: string } }) {
  return <GameClientPage params={params} />;
}
