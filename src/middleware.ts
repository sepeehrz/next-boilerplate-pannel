import {routeProtection} from './middlewares/route-protection';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {setLocaleCookie} from '@/middlewares/lang';

function isPublicAsset(pathname: string) {
  if (pathname.startsWith('/_next/')) return true;
  if (pathname === '/favicon.ico' || pathname === '/sw.js') return true;
  return /\.[^/]+$/.test(pathname);
}

export function middleware(req: NextRequest) {
  if (isPublicAsset(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const response = routeProtection(req);

  if (response instanceof NextResponse) {
    setLocaleCookie(req, response);
  }

  return response;
}
