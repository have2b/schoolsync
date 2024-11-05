import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useSessionMonitor = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = () => {
      const sessionCookie = document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('AUTH_SESSION_TOKEN='));

      // Only redirect to login if there's no session and we're not already on a login page
      if (!sessionCookie && !pathname.endsWith('/login')) {
        // Preserve the requested locale instead of deriving from current path
        const segments = pathname.split('/');
        const targetLocale = segments[1] || 'en'; // Default to 'en' if no locale
        router.push(`/${targetLocale}/login`);
      }
    };

    // Check immediately
    checkSession();

    // Set up cookie change monitoring
    const cookieMonitor = setInterval(checkSession, 2000);

    // Broadcast channel for cross-tab communication
    const channel = new BroadcastChannel('session-monitor');

    // Listen for session deletions from other tabs
    channel.onmessage = (event) => {
      if (event.data === 'session-deleted') {
        checkSession();
      }
    };

    return () => {
      clearInterval(cookieMonitor);
      channel.close();
    };
  }, [router, pathname]);
};
