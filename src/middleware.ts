import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const mainMiddleware = createMiddleware(routing);

const authMiddleware = ({ req }: { req: NextRequest }) => {
  const token = req.cookies.get('AUTH_SESSION_TOKEN')?.value;

  // Extract the requested locale from the URL
  const requestedLocale = req.nextUrl.pathname.split('/')[1] || 'en';
  const isLoginPage = req.nextUrl.pathname.endsWith('/login');

  // If on login page and already logged in, redirect to home
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL(`/${requestedLocale}`, req.url));
  }

  // If on a protected route and not logged in, redirect to login
  if (!isLoginPage && !token) {
    return NextResponse.redirect(new URL(`/${requestedLocale}/login`, req.url));
  }

  return NextResponse.next();
};

export default function middleware(req: NextRequest) {
  // First, let the i18n middleware handle locale routing
  const i18nResponse = mainMiddleware(req);

  const isLoginPage = req.nextUrl.pathname.endsWith('/login');
  const isProtectedRoute =
    (req.nextUrl.pathname.startsWith('/vi/') ||
      req.nextUrl.pathname.startsWith('/en/') ||
      req.nextUrl.pathname === '/vi' ||
      req.nextUrl.pathname === '/en') &&
    !isLoginPage;

  // Then apply auth middleware if needed
  if (isLoginPage || isProtectedRoute) {
    const authResponse = authMiddleware({ req });
    if (authResponse.status === 307) {
      return authResponse;
    }
  }

  return i18nResponse;
}

export const config = {
  matcher: ['/', '/(vi|en)/:path*'],
};
