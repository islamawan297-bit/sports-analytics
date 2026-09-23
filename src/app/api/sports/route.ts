import { NextResponse } from 'next/server';
import { SPORTS_LIST } from '@/data/mockData';

export const revalidate = 60; // Cache revalidation 60s

export async function GET() {
  return NextResponse.json(SPORTS_LIST);
}
