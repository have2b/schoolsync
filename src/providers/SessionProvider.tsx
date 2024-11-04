'use client';

import { useSessionMonitor } from '@/hooks/useSessionMonitor';
import { ReactNode } from 'react';

export function SessionProvider({ children }: { children: ReactNode }) {
  useSessionMonitor();

  return <>{children}</>;
}
