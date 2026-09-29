import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body?.email || 'google.user@gmail.com';
    const name = body?.name || 'Google User';

    const token = `mock-google-jwt-${Buffer.from(email).toString('base64')}-${Date.now()}`;

    return NextResponse.json({
      message: 'Google sign-in successful',
      accessToken: token,
      user: {
        id: `google-user-${Date.now().toString(36)}`,
        email,
        name,
        role: 'USER',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Google authentication error.' }, { status: 500 });
  }
}
