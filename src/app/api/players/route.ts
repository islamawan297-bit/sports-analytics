import { NextRequest, NextResponse } from 'next/server';
import { getPlayersFromProvider } from '@/lib/sportsdata';

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sport = searchParams.get('sport') || undefined;
  const teamId = searchParams.get('teamId') || undefined;

  const players = await getPlayersFromProvider(sport, teamId);
  return NextResponse.json(players);
}
