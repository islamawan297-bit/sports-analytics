import TeamClientPage from './TeamClientPage';
import { MOCK_TEAMS } from '@/data/mockData';

export function generateStaticParams() {
  return MOCK_TEAMS.map((t) => ({ id: t.id }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <TeamClientPage params={params} />;
}
