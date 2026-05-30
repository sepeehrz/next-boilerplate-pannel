import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
export async function POST(
  request: Request,
  context: {
    params: Promise<{
      endpoint: string;
    }>;
  }
) {
  try {
    const {endpoint} = await context.params;

    const payload = await request.json();
    const cookieStore = await cookies();

    const response = await fetch(
      process.env.NEXT_PUBLIC_API + `/User/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString()
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const res = await response.text();
      return NextResponse.json(
        {error: 'Upstream API error', details: res},
        {status: response.status}
      );
    }
    const data = await response.json();
    const accessToken = data.token;

    cookieStore.set('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return NextResponse.json(
      {message: 'Login successful', ok: response.ok, details: data},
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}
