import { NextRequest, NextResponse } from 'next/server';
import { getLiveGamesFromProvider } from '@/lib/sportsdata';

export const revalidate = 60;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const games = await getLiveGamesFromProvider();
  const game = games.find((g) => g.id === params.id);

  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  }

  return NextResponse.json(game);
}
