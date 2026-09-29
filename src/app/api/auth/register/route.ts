import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body || {};

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_API_URL || (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.startsWith('/') ? process.env.NEXT_PUBLIC_API_URL : null);

    if (backendUrl) {
      try {
        const res = await fetch(`${backendUrl}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
      } catch (err: any) {
        console.warn('Backend server register proxy error:', err.message);
      }
    }

    const userRole = role === 'ADMIN' ? 'ADMIN' : 'USER';
    const userName = name || email.split('@')[0];
    const token = `mock-jwt-token-${Buffer.from(email).toString('base64')}-${Date.now()}`;

    return NextResponse.json({
      message: 'Registration successful',
      accessToken: token,
      user: {
        id: `user-${Date.now().toString(36)}`,
        email,
        name: userName,
        role: userRole,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server registration error.' }, { status: 500 });
  }
}
