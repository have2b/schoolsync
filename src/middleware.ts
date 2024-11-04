import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const mainMiddleware = createMiddleware(routing);

const authMiddleware = ({ req }: { req: NextRequest }) => {
  const token = req.cookies.get('session')?.value;
  console.log(token);

  if (!token) {
    const locale = req.nextUrl.pathname.startsWith('/vi/') ? 'vi' : 'en';
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  return NextResponse.next();
};

export default function middleware(req: NextRequest) {
  // Check if path starts with /vi/ or /en/ but isn't a login page
  const isProtectedRoute =
    (req.nextUrl.pathname.startsWith('/vi/') ||
      req.nextUrl.pathname.startsWith('/en/') ||
      req.nextUrl.pathname === '/vi' ||
      req.nextUrl.pathname === '/en') &&
    !req.nextUrl.pathname.endsWith('/login');

  // Apply auth middleware first for protected routes
  if (isProtectedRoute) {
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
