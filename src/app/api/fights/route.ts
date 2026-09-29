import { NextRequest, NextResponse } from 'next/server';
import { getFightsFromProvider } from '@/lib/sportsdata';

export const revalidate = 30; // 30-second Next.js cache revalidation

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sport = searchParams.get('sport') || undefined;

  const backendBase = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_API_URL;
  if (backendBase && !backendBase.includes('localhost')) {
    try {
      const backendUrl = sport ? `${backendBase}/fights?sport=${sport}` : `${backendBase}/fights`;
      const res = await fetch(backendUrl, { next: { revalidate: 30 } });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch (err) {
      console.warn('Backend fights API fetch warning, using direct ESPN provider fallback:', err);
    }
  }

  const fightsResult = await getFightsFromProvider(sport);
  return NextResponse.json(fightsResult);
}

