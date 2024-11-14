'use client';

import { Provider } from 'jotai';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
