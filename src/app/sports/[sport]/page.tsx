import SportClientPage from './SportClientPage';
import { SPORTS_LIST } from '@/data/mockData';

export function generateStaticParams() {
  return SPORTS_LIST.map((sport) => ({
    sport: sport.id,
  }));
}

export default function Page({ params }: { params: { sport: string } }) {
  return <SportClientPage params={params} />;
}
