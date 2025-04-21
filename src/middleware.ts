import { NextRequest, NextResponse } from 'next/server';
import { protectedRoutes } from './constants/protected-route';

const defaultProtectedUrl = '/'; 

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', 'https://tiny-olive.vercel.app')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token');
  const isAuthenticated = Boolean(token);

  const isProtectedRoute = protectedRoutes.some((routeRegex) => routeRegex.test(pathname));
  const isSignInPage = pathname === '/sign-in';
  const isSignUpPage = pathname === '/sign-up';

  // Login olan kullanıcı sign-in/sign-up sayfasına gitmeye çalışıyorsa engelle
  if ((isSignInPage || isSignUpPage) && isAuthenticated) {
    return NextResponse.redirect(new URL(defaultProtectedUrl, req.url));
  }

  // Login olmayan kullanıcı korumalı route'a gitmeye çalışıyorsa yönlendir
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|webp|css|js|ts|json|map|woff2?|ttf|eot|txt|csv|xlsx?|docx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
