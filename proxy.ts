import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/sign-in') ||
    request.nextUrl.pathname.startsWith('/sign-up');

  const isPrivatePage =
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/notes');


  if (!accessToken && isPrivatePage) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }


  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}