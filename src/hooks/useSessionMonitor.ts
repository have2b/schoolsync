import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSessionMonitor = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hasSession, setHasSession] = useState(() => {
    return document.cookie.includes('AUTH_SESSION_TOKEN=');
  });

  useEffect(() => {
    const checkSession = () => {
      const sessionExists = document.cookie.includes('AUTH_SESSION_TOKEN=');

      // If session status changes, update state and handle redirect
      if (!sessionExists && !pathname.endsWith('/login')) {
        const targetLocale = pathname.split('/')[1] || 'en';
        router.push(`/${targetLocale}/login`);
      }

      setHasSession(sessionExists);
    };

    // Initial check
    checkSession();

    // Monitor session changes via BroadcastChannel
    const channel = new BroadcastChannel('session-monitor');
    channel.onmessage = (event) => {
      if (event.data === 'session-deleted') {
        checkSession();
      }
    };

    // Clean up on unmount
    return () => {
      channel.close();
    };
  }, [router, pathname]);

  return hasSession;
};
