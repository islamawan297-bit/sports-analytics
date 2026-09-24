import { NextResponse } from 'next/server';
import { getProviderDiagnostics } from '@/lib/sportsdata';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics = getProviderDiagnostics();
  return NextResponse.json({
    providers: diagnostics,
    activeDriver: 'SportsDataIO v3 Integration Layer (Primary) -> MockEnrichedProvider (Fallback)',
    lastSyncTimestamp: new Date().toLocaleString(),
  });
}
