import { NextRequest, NextResponse } from 'next/server';
import getSession from './libs/session';

const publicOnlyUrls: Record<string, boolean> = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicUrl = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id && !isPublicUrl) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session.id && isPublicUrl) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
