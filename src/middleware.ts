import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const mainMiddleware = createMiddleware(routing);

const authMiddleware = ({ req }: { req: NextRequest }) => {
  const token = req.cookies.get('AUTH_SESSION_TOKEN')?.value;
  const locale = req.nextUrl.pathname.startsWith('/vi/') ? 'vi' : 'en';

  // If on login page and already logged in, redirect to home
  if (req.nextUrl.pathname.endsWith('/login') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If not on login page and not logged in, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  return NextResponse.next();
};

export default function middleware(req: NextRequest) {
  // Check if it's a login page
  const isLoginPage = req.nextUrl.pathname.endsWith('/login');

  // Check if path starts with /vi/ or /en/ (including root locale paths)
  const isProtectedRoute =
    (req.nextUrl.pathname.startsWith('/vi/') ||
      req.nextUrl.pathname.startsWith('/en/') ||
      req.nextUrl.pathname === '/vi' ||
      req.nextUrl.pathname === '/en') &&
    !isLoginPage;

  // For login pages and protected routes, check authentication first
  if (isLoginPage || isProtectedRoute) {
    const authResponse = authMiddleware({ req });
    if (authResponse.status === 307) {
      return authResponse;
    }
  }

  // Apply i18n middleware for all routes
  return mainMiddleware(req);
}

export const config = {
  // Match both internationalized pathnames and protected routes
  matcher: ['/', '/(vi|en)/:path*'],
};
