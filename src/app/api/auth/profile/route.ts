import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized session' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    return NextResponse.json({
      id: 'profile-user-1',
      email: 'user@statsedge.pro',
      name: 'StatsEdge User',
      role: 'USER',
      createdAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Profile fetch error.' }, { status: 500 });
  }
}
