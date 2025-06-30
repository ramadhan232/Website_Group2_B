import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // ✅ Lewatkan path public tanpa auth
  if (
    pathname.startsWith('/api') ||
    pathname === '/' ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/unauthorized') ||
    pathname.startsWith('/student/auth') ||
    pathname.startsWith('/teacher/auth')
  ) {
    return NextResponse.next();
  }

  const isStudentRoute = pathname.startsWith('/student');
  const isTeacherRoute = pathname.startsWith('/teacher');

  // 🔐 Belum login, redirect ke login masing-masing
  if (!token) {
    const loginPage = isStudentRoute ? '/student/auth/login' : '/teacher/auth/login';
    return NextResponse.redirect(new URL(loginPage, req.url));
  }

  // 🔐 Sudah login tapi role tidak sesuai
  if (isStudentRoute && token.role !== 'student') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (isTeacherRoute && token.role !== 'teacher') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*'],
};
