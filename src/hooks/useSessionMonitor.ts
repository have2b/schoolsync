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

      if (!sessionCookie && !pathname.endsWith('/login')) {
        const locale = pathname.startsWith('/vi/') ? 'vi' : 'en';
        router.push(`/${locale}/login`);
      }
    };

    // Check immediately
    checkSession();

    // Set up cookie change monitoring
    const cookieMonitor = setInterval(checkSession, 1000);

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
