import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = [
  '/student/auth/login',
  '/teacher/auth/login',
  '/unauthorized',
  '/api/auth'
];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // ✅ Allow public routes
  if (PUBLIC_PATHS.some(path => pathname.includes(path))) {
    return NextResponse.next();
  }

  // ❌ Belum login
  if (!token) {
    if (pathname.includes('/teacher/')) {
      return NextResponse.redirect(new URL('/teacher/auth/login', req.url));
    } else if (pathname.includes('/student/')) {
      return NextResponse.redirect(new URL('/student/auth/login', req.url));
    } else {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // 🔒 Validasi role
  if (pathname.includes('/teacher/') && token.role !== 'teacher') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (pathname.includes('/student/') && token.role !== 'student') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/student/:path*',
    '/teacher/:path*',
  ],
};
