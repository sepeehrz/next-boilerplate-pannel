import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export async function routeProtection(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get('token')?.value;

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const publicAuthPages = ['/login', '/forgot-password', '/signup'];

  const isPublicAuthPage = publicAuthPages.some(page =>
    pathname.startsWith(page)
  );

  if (!token && !isPublicAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isPublicAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
