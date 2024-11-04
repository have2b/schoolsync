import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const mainMiddleware = createMiddleware(routing);

const authMiddleware = ({ req }: { req: NextRequest }) => {
  const token = req.cookies.get('AUTH_SESSION_TOKEN')?.value;
  const locale = req.nextUrl.pathname.startsWith('/vi/') ? 'vi' : 'en';
  const isLoginPage = req.nextUrl.pathname.endsWith('/login');

  // If on login page and already logged in, redirect to home
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // If on a protected route and not logged in, redirect to login
  if (!isLoginPage && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  return NextResponse.next();
};

export default function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname.endsWith('/login');
  const isProtectedRoute =
    (req.nextUrl.pathname.startsWith('/vi/') ||
      req.nextUrl.pathname.startsWith('/en/') ||
      req.nextUrl.pathname === '/vi' ||
      req.nextUrl.pathname === '/en') &&
    !isLoginPage;

  // Run authMiddleware on login page and protected routes
  if (isLoginPage || isProtectedRoute) {
    const authResponse = authMiddleware({ req });
    if (authResponse.status === 307) {
      return authResponse;
    }
  }

  // Apply i18n middleware to handle routing
  return mainMiddleware(req);
}

export const config = {
  matcher: ['/', '/(vi|en)/:path*'],
};
