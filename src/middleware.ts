import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  const protectedPaths = [
    '/challenge/participant',
    '/mychallenge',
    '/verification',
    '/profile/',
    '/register',
  ];

  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (
    !token &&
    protectedPaths.some((protectedPath) => pathname.startsWith(protectedPath))
  ) {
    return NextResponse.redirect(new URL('/home?redirected=true', request.url));
  }

  return NextResponse.next();
}
