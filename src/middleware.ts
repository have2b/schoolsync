// middleware.ts
import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const mainMiddleware = createMiddleware(routing);

const authMiddleware = ({ req }: { req: NextRequest }) => {
  const token = req.cookies.get('AUTH_SESSION_TOKEN')?.value;

  // Extract the requested locale from the URL
  const requestedLocale = req.nextUrl.pathname.split('/')[1] || 'en';
  const isLoginPage = req.nextUrl.pathname.endsWith('/login');

  // Redirect to home if logged in and on the login page
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL(`/${requestedLocale}`, req.url));
  }

  // Redirect to login if on a protected route and not logged in
  if (!isLoginPage && !token) {
    return NextResponse.redirect(new URL(`/${requestedLocale}/login`, req.url));
  }

  return NextResponse.next();
};

export default function middleware(req: NextRequest) {
  // Let the i18n middleware handle locale routing first
  const i18nResponse = mainMiddleware(req);

  // Define login and protected route checks
  const isLoginPage = req.nextUrl.pathname.endsWith('/login');
  const isProtectedRoute = /^\/(vi|en)(\/|$)/.test(req.nextUrl.pathname) && !isLoginPage;

  // Apply auth middleware for protected routes and login page
  if (isLoginPage || isProtectedRoute) {
    const authResponse = authMiddleware({ req });
    // Return auth response if it's a redirect (307), otherwise continue
    if (authResponse.status === 307) {
      return authResponse;
    }
  }

  return i18nResponse;
}

export const config = {
  matcher: ['/', '/(vi|en)/:path*'],
};
