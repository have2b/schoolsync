'use client';

import { useRouter } from '@/i18n/routing';
import { useAuth } from '@/store/auth';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { CircularSpinnerLoader } from '../common';

interface LayoutProtectedProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export function LayoutProtected({ children, allowedRoles = [] }: Readonly<LayoutProtectedProps>) {
  const router = useRouter();
  const params = useParams();
  const { account, loading, isAuthenticated } = useAuth();
  const locale = (params.locale as string) || 'vi';

  useEffect(() => {
    const handleAuth = async () => {
      if (loading) return;

      if (!isAuthenticated) {
        router.replace(`/${locale}/login`);
        return;
      }

      if (account && allowedRoles.length > 0 && !allowedRoles.includes(account.role)) {
        router.push(`/401`);
        return;
      }
    };

    handleAuth();
  }, [loading, isAuthenticated, account, allowedRoles, locale, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <CircularSpinnerLoader />
      </div>
    );
  }

  // Don't render children until authentication is confirmed
  if (
    !isAuthenticated ||
    (account && allowedRoles.length > 0 && !allowedRoles.includes(account.role))
  ) {
    return null;
  }

  return <div className="flex h-full w-full">{children}</div>;
}
