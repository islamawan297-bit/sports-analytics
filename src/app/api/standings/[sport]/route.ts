import { NextRequest, NextResponse } from 'next/server';
import { getStandingsFromProvider } from '@/lib/sportsdata';

export const revalidate = 60;

export async function GET(req: NextRequest, { params }: { params: { sport: string } }) {
  const standings = await getStandingsFromProvider(params.sport);
  return NextResponse.json(standings);
}
