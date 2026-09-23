import { NextRequest, NextResponse } from 'next/server';
import { getLiveGamesFromProvider } from '@/lib/sportsdata';

export const revalidate = 60; // Cache revalidation 60s

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sport = searchParams.get('sport') || undefined;

  const games = await getLiveGamesFromProvider(sport);
  return NextResponse.json(games);
}
