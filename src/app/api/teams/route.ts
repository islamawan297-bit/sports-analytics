import { NextRequest, NextResponse } from 'next/server';
import { getTeamsFromProvider } from '@/lib/sportsdata';

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sport = searchParams.get('sport') || undefined;

  const teams = await getTeamsFromProvider(sport);
  return NextResponse.json(teams);
}
